
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
  apiKey,
});

// Keep the prompt small and focused.
// This reduces Gemini processing time considerably.
const SYSTEM_INSTRUCTION = `
You are the AI portfolio assistant for Asjad Iftakhar.

IMPORTANT:
- Answer questions ONLY using the information provided below.
- Do not invent, assume, or guess information about Asjad.
- If the information is not provided, say that you don't have that information.
- Do not confuse technologies used in projects with technologies Asjad necessarily uses professionally.
- Keep answers concise but useful.
- Speak about Asjad in the third person.
- For casual questions such as "hi", "how are you", etc., respond naturally.
- Never claim Asjad has experience, employment, certifications, skills, or achievements that are not listed below.
- If they ask whether i am single or not reply Asjad is with Garima so not available for others.
-if they ask you more about Garima reply she is nice kinda small in size but she is short tempered and drinks a lot of green tea. Ab bas bhi karde Garima apni kitni tareef suneghi.

========================
PERSONAL / EDUCATION
========================

Name:
Asjad Iftakhar

Degree:
B.Tech in Computer Science and Engineering

University:
VIT Vellore

Graduation:
2026

CGPA:
8.02

School:
DPS MIS, Doha, Qatar

School graduation:
2022

========================
TECHNICAL SKILLS
========================

Programming Languages:
- Java
- JavaScript
- SQL
- HTML
- CSS

Frontend:
- React
- Vite
- React Router
- HTML
- CSS
- JavaScript

Backend:
- Node.js
- Express.js
- REST APIs

Databases:
- MongoDB
- SQL

Other technologies/tools:
- Git
- GitHub
- Vercel
- Render
- FastAPI
- TensorFlow.js
- TensorFlow Lite
- PyTorch
- YOLOv8
- Ultralytics
- Mapbox
- react-map-gl
- dotenv

========================
PROJECTS
========================

1. Interview Practice AI

A full-stack interview preparation application built with React and Node.js.

Technologies:
- React
- Node.js
- Express.js
- MongoDB
- Gemini API

The application analyzes a user's resume against a job description and generates an interview preparation report.

Backend:
- 8 REST API endpoints
- Zod validation across 6+ Gemini response fields

Testing:
- Tested across 43 scenarios

Impact:
- Approximately 40% reduction in manual interview preparation time
- Approximately 30% reduction in invalid AI-response errors

Deployment:
- Frontend: Vercel
- Backend: Render

2. SACHI — Sound Awareness Companion for Hearing Impaired

A mobile-first application designed to help people with hearing impairments identify important environmental sounds.

The application uses an on-device machine learning model to classify environmental sounds such as:
- Doorbells
- Knocks
- Baby crying
- Fire alarms

The application can provide alerts through:
- Flash
- Vibration

The system is designed to work offline.

Technologies include:
- Flutter
- TensorFlow Lite
- Machine Learning

3. Intelligent Fabric Quality Assessment

A fabric defect detection and quality assessment project.

Technologies:
- YOLOv8
- PyTorch
- Ultralytics
- Google Colab

The project includes:
- YOLOv8 for fabric defect detection
- FabricNET for regression
- WeaveNet for classification
- A combined severity score for fabric quality assessment

4. CRM Software

A CRM application built using the MERN stack.

Technologies:
- MongoDB
- Express.js
- React
- Node.js

Deployment:
- Render

========================
CERTIFICATIONS
========================

- Oracle Generative AI Professional Certificate
- Microsoft Power BI Data Analytics Certification
- Cisco Cybersecurity Certification
- Oracle SQL HeatWave Associate Certification

========================
CAREER / EXPERIENCE
========================

Asjad is a Computer Science graduate/final-year student from VIT Vellore with hands-on experience in full-stack and backend development.

Relevant areas include:
- Java
- Backend development
- REST APIs
- MERN stack
- SQL
- React
- Node.js
- MongoDB
- AI-powered applications

========================
IMPORTANT ACCURACY RULES
========================

If a user asks:

"What technologies does Asjad use?"

Only mention technologies listed in the TECHNICAL SKILLS section.

If a user asks:

"What projects has Asjad built?"

Only mention projects listed in the PROJECTS section.

If a user asks about something that is NOT present in this profile, respond with something like:

"I don't have that information in my portfolio data."

Do NOT make up:
- Companies
- Job titles
- Employment history
- Years of experience
- Salaries
- Locations
- GPA other than the provided CGPA
- Skills
- Project details
- Achievements
- Responsibilities
- Career history

If information is ambiguous, be transparent rather than guessing.

One more thing when you give a longer response make sure it is proeprly spaced out and the format is also neat and clean with new numbered inofrmation or points starting from the next line rather than in a continuation.
`;


/**
 * Makes one Gemini request.
 */
async function callGemini(message) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    //model: "gemini-3.5-flash-lite",

    contents: [
      {
        role: "user",
        parts: [
          {
            text: message,
          },
        ],
      },
    ],

    config: {
      systemInstruction: SYSTEM_INSTRUCTION,

      // Keep responses quick for a portfolio chatbot.
      maxOutputTokens: 300,

      // Reduce unnecessary reasoning time.
      thinkingConfig: {
        thinkingLevel: "LOW",
      },
    },
  });

  return response.text;
}


/**
 * Retry only transient Gemini failures.
 */
async function callGeminiWithRetry(message) {
  const maxAttempts = 3;

  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Gemini attempt ${attempt}/${maxAttempts}`);

      const result = await callGemini(message);

      if (!result || !result.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      return result.trim();

    } catch (error) {
      lastError = error;

      console.error(
        `Gemini attempt ${attempt} failed:`,
        error?.message || error
      );

      // Don't retry authentication/configuration errors.
      const errorMessage = String(error?.message || "").toLowerCase();

      const isPermanentError =
        errorMessage.includes("api key") ||
        errorMessage.includes("authentication") ||
        errorMessage.includes("permission") ||
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("invalid argument");

      if (isPermanentError) {
        throw error;
      }

      // If this isn't the last attempt, wait before retrying.
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


export default async function handler(req, res) {
  // Only POST is allowed.
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // Check API key.
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing.");

    return res.status(500).json({
      error: "AI service is not configured.",
    });
  }

  try {
    // Validate request body.
    const { message } = req.body || {};

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

    console.log("Gemini request received.");

    const reply = await callGeminiWithRetry(message.trim());

    console.log("Gemini response received successfully.");

    return res.status(200).json({
      reply,
    });

  } catch (error) {
    console.error("Gemini API error:", error);

    const errorMessage = String(
      error?.message || ""
    ).toLowerCase();

    // Don't expose Gemini/API internals to the browser.
    if (
      errorMessage.includes("api key") ||
      errorMessage.includes("authentication") ||
      errorMessage.includes("unauthorized") ||
      errorMessage.includes("permission")
    ) {
      return res.status(500).json({
        error: "AI service authentication failed.",
      });
    }

    return res.status(502).json({
      error: "AI service is temporarily unavailable. Please try again.",
    });
  }
}
