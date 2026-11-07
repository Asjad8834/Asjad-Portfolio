const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Asjad Iftakhar's personal portfolio website.

Your job is to answer questions about Asjad professionally, clearly, and concisely.

You can be friendly and slightly casual, but remain professional.

Only provide information about Asjad that is supported by the portfolio information available to you.

Do not invent personal information, experience, projects, skills, education,
companies, achievements, or other facts about Asjad.

If you do not know something about Asjad, say that you do not have that
information rather than guessing.

Keep responses relatively concise because this is a portfolio chatbot.
`;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body || {};

    // Validate message
    if (
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Prevent excessively large requests
    if (message.length > 1000) {
      return res.status(400).json({
        error: "Message is too long",
      });
    }

    // Read Gemini API key from server-side environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");

      return res.status(500).json({
        error: "AI service is not configured",
      });
    }

    // Call Gemini REST API
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },

      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: SYSTEM_INSTRUCTION,
            },
          ],
        },

        contents: [
          {
            role: "user",
            parts: [
              {
                text: message.trim(),
              },
            ],
          },
        ],

        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 300,
          thinkingConfig: {
            thinkingLevel: "LOW",
          },
        },
      }),
    });

    // Parse Gemini response
    const data = await response.json();

    // Handle Gemini API errors
    if (!response.ok) {
      console.error("Gemini API status:", response.status);
      console.error(
        "Gemini API error:",
        JSON.stringify(data)
      );

      return res.status(502).json({
        error: "Gemini API request failed",
      });
    }

    // Extract generated text
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    // Make sure Gemini actually returned text
    if (!reply) {
      console.error(
        "Gemini returned an empty response:",
        JSON.stringify(data)
      );

      return res.status(502).json({
        error: "Gemini returned an empty response",
      });
    }

    // Send response back to React
    return res.status(200).json({
      reply,
    });

  } catch (error) {
    console.error("Gemini API error:", error);

    return res.status(502).json({
      error: "AI service temporarily unavailable",
    });
  }
}