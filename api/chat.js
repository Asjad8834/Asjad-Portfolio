const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

const SYSTEM_INSTRUCTION = `
You are the AI assistant for Asjad Iftakhar's personal portfolio website.

Your job is to answer questions about Asjad professionally, clearly, and concisely.

You can be friendly and slightly casual, but remain professional.

Only provide information that is actually available from the portfolio context provided to you.
Do not invent personal information, experience, projects, skills, education, companies, achievements, or other facts about Asjad.

If you don't know something about Asjad, say that you don't have that information rather than guessing.
`;

export default async function handler(req, res) {
  // Only allow POST
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

    // Basic length protection
    if (message.length > 1000) {
      return res.status(400).json({
        error: "Message is too long",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");

      return res.status(500).json({
        error: "AI service is not configured",
      });
    }

    const controller = new AbortController();

    // Prevent requests from hanging indefinitely
    const timeout = setTimeout(() => {
      controller.abort();
    }, 15000);

    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
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
          }),

          signal: controller.signal,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Gemini API error:", {
          status: response.status,
          message: data?.error?.message,
        });

        return res.status(502).json({
          error: "AI service temporarily unavailable",
        });
      }

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!reply) {
        console.error("Gemini returned no text:", data);

        return res.status(502).json({
          error: "AI returned an empty response",
        });
      }

      return res.status(200).json({
        reply,
      });

    } finally {
      clearTimeout(timeout);
    }

  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Gemini request timed out");

      return res.status(504).json({
        error: "AI request timed out",
      });
    }

    console.error("Gemini API error:", error);

    return res.status(500).json({
      error: "Failed to generate a response",
    });
  }
}