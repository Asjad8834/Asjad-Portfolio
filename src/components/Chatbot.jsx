
import React, { useState } from "react";
import "../styles/Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi! 👋 I'm Asjad's portfolio assistant. Ask me anything about Asjad's skills, projects, experience, education, or background and I will answer right away.",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage = message.trim();

    // Don't send empty messages or another request while loading
    if (!userMessage || isLoading) {
      return;
    }

    // Add user's message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    // Clear input
    setMessage("");

    // Start loading
    setIsLoading(true);

    // Stop request after 20 seconds
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
        signal: controller.signal,
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "AI service temporarily unavailable."
        );
      }

      if (
        !data ||
        typeof data.reply !== "string" ||
        data.reply.trim() === ""
      ) {
        throw new Error("The AI returned an empty response.");
      }

      // Add AI response
      // IMPORTANT: keep role as "bot" because your existing
      // Chatbot.css styles the bot messages using .bot
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      let errorMessage =
        "Sorry, I couldn't process that request right now.";

      if (error.name === "AbortError") {
        errorMessage =
          "The AI service took too long to respond. Please try again.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: errorMessage,
        },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot">

      {/* Floating Button */}
      <button
        className="chatbot-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? "×" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">

          {/* Header */}
          <div className="chatbot-header">
            <div>
              <h3>Ask About Me</h3>
              <span>AI Portfolio Assistant</span>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.role}`}
              >
                {msg.content}
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="chatbot-message bot">
                Thinking...
              </div>
            )}

          </div>

          {/* Input */}
          <div className="chatbot-input-area">

            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about Asjad..."
              disabled={isLoading}
            />

            <button
              onClick={sendMessage}
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? "..." : "Send"}
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Chatbot;
