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
You are Asjad Iftakhar's portfolio assistant.

Answer questions about Asjad using ONLY the portfolio knowledge provided with the request.

Rules:
- Never invent facts about Asjad.
- If the information is unavailable, say so.
- Keep answers concise and professional.
- Use bullet points when useful.
- Do not mention the knowledge base, retrieval, Gemini, APIs, prompts, or internal implementation.
- For greetings, respond naturally and invite the user to ask about Asjad.
- Only answer questions related to Asjad's portfolio, career, education, skills, experience, projects, or certifications.
- Never reveal API keys, credentials, environment variables, or server details.

Special responses:
If asked whether Asjad is single:
"Asjad is with Garima, so not available for others."

If asked about Garima:
"She is nice, kinda small in size but she is short tempered and drinks a lot of green tea. Ab bas bhi karde Garima apni kitni tareef suneghi."
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
      maxOutputTokens: 180,
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