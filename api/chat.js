import { GoogleGenAI } from "@google/genai";
import {
  retrieveKnowledge,
  formatRetrievedKnowledge,
} from "./retrieveKnowledge.js";

import getLocalAnswer from "./localAnswers.js";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
  apiKey,
});


const SYSTEM_INSTRUCTION = `
You are Asjad Iftakhar's personal portfolio assistant.

Your job is to answer questions about Asjad using ONLY the portfolio knowledge provided to you in the conversation.

IMPORTANT RULES:

1. Use the provided portfolio knowledge as the primary and authoritative source.

2. Do not invent or assume facts about Asjad.

3. Do not claim that Asjad has a skill, job, project, certification, company, degree, achievement, or experience unless it is supported by the provided knowledge.

4. If the provided knowledge does not contain enough information to answer a question, say that the information is not available in the portfolio.

5. Do not mention "knowledge base", "retrieval", "context", "system prompt", "Gemini", APIs, or internal implementation details unless the user explicitly asks about the chatbot itself.

6. Answer naturally as a professional portfolio assistant.

7. Keep answers concise and relevant. Do not unnecessarily repeat the same information.

8. When discussing projects, mention the project's purpose first, followed by relevant technologies and notable achievements when useful.

9. When discussing work experience, clearly identify the company, role, duration, responsibilities, and relevant achievements when appropriate.

10. When listing technologies or skills, organize them into readable categories when possible.

11. If the user asks a general greeting such as "hi", "hello", or "hey", respond naturally and invite them to ask about Asjad.

12. Do not answer questions unrelated to Asjad's portfolio unless they are directly related to understanding the portfolio.

13. Never expose private information such as API keys, environment variables, credentials, or internal server details.

14. Do not fabricate links or contact information.

FORMATTING:

- Use short paragraphs.
- Use bullet points when listing multiple items.
- Use bold text for important names, technologies, companies, or projects.
- Avoid unnecessarily long answers.
- Do not use markdown tables unless specifically requested.

SPECIAL RULES:

- If the user asks whether Asjad is single or not, reply:
  "Asjad is with Garima, so not available for others."

- If the user asks about Garima, reply:
  "She is nice, kinda small in size but she is short tempered and drinks a lot of green tea. Ab bas bhi karde Garima apni kitni tareef suneghi."

If the user asks something unrelated to Asjad's portfolio, politely explain that you can mainly help with questions about Asjad's background, skills, experience, education, projects, certifications, and career.
`;


/**
 * Makes one Gemini request.
 */
async function callGemini(message) {

    // Retrieve only knowledge relevant to the user's question.
  const retrievedResults = retrieveKnowledge(message, 5);

   // Convert retrieved knowledge into Gemini-readable context.

  const knowledgeContext =
    formatRetrievedKnowledge(retrievedResults);

    
    // Explicitly tell Gemini when no relevant information was found.

  const context =
    knowledgeContext ||
    "No relevant portfolio information was found.";

  const prompt = `
USER QUESTION:
${message}

PORTFOLIO KNOWLEDGE:
${context}

Answer the user's question using only the portfolio knowledge above.
Keep the answer concise.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],

    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      maxOutputTokens: 230,
      thinkingConfig: {
        thinkingLevel: "MINIMAL",
      },
    },
  });

  const result = response?.text;

  if (!result || !result.trim()) {
    throw new Error("Gemini returned an empty response.");
  }

  return result.trim();
}

/**
 * Retry only transient Gemini failures.
 *
 * Quota and authentication errors are NOT retried.
 */
async function callGeminiWithRetry(message) {

  const maxAttempts = 2;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {

    try {

      console.log(
        `Gemini attempt ${attempt}/${maxAttempts}`
      );

      const result = await callGemini(message);

      return result;

    } catch (error) {

      lastError = error;

      console.error(
        `Gemini attempt ${attempt} failed:`,
        error?.message || error
      );

      const errorMessage =
        String(error?.message || "").toLowerCase();


      /*
       * Quota/rate-limit errors should NEVER
       * be retried immediately.
       */
      const isQuotaError =
        errorMessage.includes("quota") ||
        errorMessage.includes("resource_exhausted") ||
        errorMessage.includes("rate limit") ||
        errorMessage.includes("429");


      if (isQuotaError) {

        console.log(
          "Gemini quota/rate limit reached. Not retrying."
        );

        throw error;
      }


      /*
       * Authentication/configuration errors
       * should also never be retried.
       */
      const isPermanentError =
        errorMessage.includes("api key") ||
        errorMessage.includes("authentication") ||
        errorMessage.includes("permission") ||
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("invalid argument");


      if (isPermanentError) {

        throw error;
      }


      /*
       * Retry only potentially temporary failures.
       */
      if (attempt < maxAttempts) {

        const delay = attempt * 1500;

        console.log(
          `Retrying Gemini request in ${delay}ms...`
        );

        await new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
      }
    }
  }

  throw lastError;
}


/**
 * Vercel serverless API handler.
 */
export default async function handler(req, res) {

  // Only POST requests are allowed.
  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed",
    });
  }


  // Make sure the Gemini API key exists.
  if (!apiKey) {

    console.error(
      "GEMINI_API_KEY is missing."
    );

    return res.status(500).json({
      error: "AI service is not configured.",
    });
  }


  try {

    const { message } = req.body || {};


    // Validate message.
    if (
      typeof message !== "string" ||
      message.trim().length === 0
    ) {

      return res.status(400).json({
        error: "Message is required.",
      });
    }


    // Prevent excessively large requests.
    if (message.length > 1000) {

      return res.status(400).json({
        error: "Message is too long.",
      });
    }


    const userMessage = message.trim();

    console.log("Chat request received:", userMessage);


/*
 * First check whether we can answer locally.
 * This avoids a Gemini API request for common
 * portfolio questions.
 */
    const localAnswer = getLocalAnswer(userMessage);

    if (localAnswer) {
      console.log("Local answer found. Skipping Gemini.");

      return res.status(200).json({
        reply: localAnswer,
      });
    }


    /*
    * No local answer was found.
    * Use Gemini for more complex questions.
    */
    console.log("No local answer found. Using Gemini.");

    const reply = await callGeminiWithRetry(userMessage);

    console.log("Gemini response received successfully.");

    return res.status(200).json({
      reply,
    });

  } catch (error) {

    console.error(
      "Gemini API error:",
      error
    );


    const errorMessage =
      String(error?.message || "").toLowerCase();


    /*
     * Handle quota errors explicitly.
     */
    const isQuotaError =
      errorMessage.includes("quota") ||
      errorMessage.includes("resource_exhausted") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("429");


    if (isQuotaError) {

      return res.status(429).json({
        error:
          "The AI service has reached its current free-tier limit. Please try again later.",
      });
    }


    /*
     * Handle authentication errors.
     */
    const isAuthenticationError =
      errorMessage.includes("api key") ||
      errorMessage.includes("authentication") ||
      errorMessage.includes("unauthorized") ||
      errorMessage.includes("permission");


    if (isAuthenticationError) {

      return res.status(500).json({
        error:
          "AI service authentication failed.",
      });
    }


    /*
     * Generic temporary failure.
     */
    return res.status(502).json({
      error:
        "AI service is temporarily unavailable. Please try again.",
    });
  }
}