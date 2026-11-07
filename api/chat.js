const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Asjad Iftakhar's personal portfolio website.

Answer questions about Asjad professionally, clearly, and concisely.

You can be slightly casual and playful, but remain professional.

Only provide information that is actually available about Asjad.
Do not invent personal information.

If you don't know something, say that you don't have that information.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    if (
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");

      return res.status(500).json({
        error: "AI service is not configured",
      });
    }

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_INSTRUCTION}

User question:
${message}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(502).json({
        error: "Gemini API request failed",
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("Unexpected Gemini response:", data);

      return res.status(502).json({
        error: "Gemini returned an empty response",
      });
    }

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