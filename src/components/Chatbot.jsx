import React, { useState } from 'react';
import "../styles/Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content:
        "Hi! 👋 I'm Asjad's portfolio assistant. Ask me anything about Asjad's skills, projects, experience, education, or background and i will answer right away.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();

    // Add user's message to the chat
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
      },
    ]);

    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: data.reply,
        },
      ]);

    } catch (error) {
      console.error('Chat error:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            "Sorry, I couldn't process that request right now.",
        },
      ]);

    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot">

      {/* Floating Button */}
      <button
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chatbot"
      >
        {isOpen ? '×' : '💬'}
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
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about Asjad..."
              disabled={isLoading}
            />

            <button
              onClick={sendMessage}
              disabled={isLoading || !message.trim()}
            >
              Send
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Chatbot;