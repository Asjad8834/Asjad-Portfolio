import knowledgeBase from "./knowledge.js";


/*
 * Normalize text so that comparisons are consistent.
 */
function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


/*
 * Common words that do not provide useful information
 * when calculating relevance.
 */
const STOP_WORDS = new Set([
  "what",
  "does",
  "do",
  "did",
  "is",
  "are",
  "was",
  "were",
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "to",
  "for",
  "in",
  "on",
  "at",
  "about",
  "tell",
  "me",
  "his",
  "her",
  "their",
  "this",
  "that",
  "how",
  "can",
  "could",
  "would",
  "has",
  "have",
  "had",
  "from",
  "with",
  "where",
  "when",
  "who",
  "which",
  "he",
  "she",
  "they",
  "him",
  "them",
]);


/*
 * Convert text into useful keywords.
 */
function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter(
      (word) =>
        word.length >= 2 &&
        !STOP_WORDS.has(word)
    );
}


/*
 * Convert a knowledge object into readable text.
 */
function objectToText(object) {
  const lines = [];

  function walk(value, prefix = "") {

    if (
      typeof value === "string" ||
      typeof value === "number"
    ) {
      lines.push(`${prefix}: ${value}`);
      return;
    }


    if (Array.isArray(value)) {
      value.forEach((item) => {
        walk(item, prefix);
      });

      return;
    }


    if (value && typeof value === "object") {
      Object.entries(value).forEach(
        ([key, childValue]) => {

          const newPrefix = prefix
            ? `${prefix} ${key}`
            : key;

          walk(childValue, newPrefix);
        }
      );
    }
  }


  walk(object);

  return lines.join("\n");
}


/*
 * Build meaningful knowledge chunks.
 *
 * Instead of retrieving individual values such as:
 *
 *   technologies: Node.js
 *
 * we retrieve complete logical sections such as:
 *
 *   Software Engineer Intern at NepByte Technologies
 *
 * or:
 *
 *   VaultPay
 */
function buildKnowledgeChunks() {
  const chunks = [];


  /*
   * -------------------------
   * PERSONAL
   * -------------------------
   */

  if (knowledgeBase.personal) {
    chunks.push({
      type: "personal",
      title: "Personal Information",
      text: objectToText(
        knowledgeBase.personal
      ),
    });
  }


  /*
   * -------------------------
   * EDUCATION
   * -------------------------
   */

  if (knowledgeBase.education) {

    Object.entries(
      knowledgeBase.education
    ).forEach(
      ([type, education]) => {

        chunks.push({
          type: "education",
          title: `${type} education`,
          text: objectToText(
            education
          ),
        });

      }
    );
  }


  /*
   * -------------------------
   * SKILLS
   * -------------------------
   */

  if (knowledgeBase.skills) {

    Object.entries(
      knowledgeBase.skills
    ).forEach(
      ([category, skills]) => {

        chunks.push({
          type: "skills",
          title: `${category} skills`,
          text:
            `${category}: ${
              Array.isArray(skills)
                ? skills.join(", ")
                : objectToText(skills)
            }`,
        });

      }
    );
  }


  /*
   * -------------------------
   * EXPERIENCE
   * -------------------------
   */

  if (
    Array.isArray(
      knowledgeBase.experience
    )
  ) {

    knowledgeBase.experience.forEach(
      (experience) => {

        chunks.push({
          type: "experience",

          title:
            `${experience.role} at ${experience.company}`,

          text:
            objectToText(experience),
        });

      }
    );
  }


  /*
   * -------------------------
   * PROJECTS
   * -------------------------
   */

  if (
    Array.isArray(
      knowledgeBase.projects
    )
  ) {

    knowledgeBase.projects.forEach(
      (project) => {

        chunks.push({
          type: "project",

          title:
            project.name,

          text:
            objectToText(project),
        });

      }
    );
  }


  /*
   * -------------------------
   * CERTIFICATIONS
   * -------------------------
   */

  if (
    Array.isArray(
      knowledgeBase.certifications
    )
  ) {

    knowledgeBase.certifications.forEach(
      (certification) => {

        chunks.push({
          type: "certification",

          title:
            certification.name,

          text:
            objectToText(
              certification
            ),
        });

      }
    );
  }


  /*
   * -------------------------
   * CAREER
   * -------------------------
   */

  if (knowledgeBase.career) {

    chunks.push({
      type: "career",

      title:
        "Career Information",

      text:
        objectToText(
          knowledgeBase.career
        ),
    });
  }


  return chunks;
}


/*
 * Detect what kind of information
 * the user is asking for.
 */
function detectIntent(query) {

  const normalizedQuery =
    normalizeText(query);


  const technologyIntent =
    /technolog|tech|skill|stack|program|language|framework|tool/
      .test(normalizedQuery);


  const educationIntent =
    /stud|educat|college|univers|school|degree|cgpa|graduat/
      .test(normalizedQuery);


  const experienceIntent =
    /intern|work|experien|compani|job|role|employ/
      .test(normalizedQuery);


  const projectIntent =
    /project|built|build|developed|develop|application|app|system/
      .test(normalizedQuery);


  return {
    technologyIntent,
    educationIntent,
    experienceIntent,
    projectIntent,
  };
}


/*
 * Score how relevant a knowledge chunk
 * is to the user's question.
 */
function calculateScore(query, chunk) {

  const normalizedQuery =
    normalizeText(query);

  const queryWords =
    tokenize(query);

  const normalizedTitle =
    normalizeText(chunk.title);

  const normalizedText =
    normalizeText(chunk.text);


  let score = 0;


  /*
   * Detect query intent.
   */
  const {
    technologyIntent,
    educationIntent,
    experienceIntent,
    projectIntent,
  } = detectIntent(query);


  /*
   * ------------------------------------------------
   * INTENT BOOST
   * ------------------------------------------------
   */

  if (
    technologyIntent &&
    chunk.type === "skills"
  ) {
    score += 50;
  }


  if (
    educationIntent &&
    chunk.type === "education"
  ) {
    score += 50;
  }


  if (
    experienceIntent &&
    chunk.type === "experience"
  ) {
    score += 50;
  }


  if (
    projectIntent &&
    chunk.type === "project"
  ) {
    score += 50;
  }


  /*
   * ------------------------------------------------
   * IRRELEVANT CATEGORY PENALTY
   * ------------------------------------------------
   *
   * Example:
   *
   * "What technologies does Asjad know?"
   *
   * should not prioritize an internship
   * simply because the internship contains
   * the word "technologies".
   */

  if (
    technologyIntent &&
    chunk.type !== "skills"
  ) {
    score -= 30;
  }


  if (
    educationIntent &&
    chunk.type !== "education"
  ) {
    score -= 30;
  }


  if (
    experienceIntent &&
    chunk.type !== "experience"
  ) {
    score -= 30;
  }


  if (
    projectIntent &&
    chunk.type !== "project"
  ) {
    score -= 30;
  }


  /*
   * ------------------------------------------------
   * EXACT PHRASE MATCH
   * ------------------------------------------------
   */

  if (
    normalizedTitle.includes(
      normalizedQuery
    )
  ) {
    score += 30;
  }


  if (
    normalizedText.includes(
      normalizedQuery
    )
  ) {
    score += 15;
  }


  /*
   * ------------------------------------------------
   * KEYWORD MATCHING
   * ------------------------------------------------
   */

  for (const word of queryWords) {

    /*
     * Title matches are very strong.
     */
    if (
      normalizedTitle.includes(word)
    ) {
      score += 10;
    }


    /*
     * Text matches are weaker.
     */
    if (
      normalizedText.includes(word)
    ) {
      score += 2;
    }
  }


  /*
   * ------------------------------------------------
   * ENTITY MATCHING
   * ------------------------------------------------
   *
   * Example:
   *
   * "Tell me about VaultPay"
   *
   * The project whose title is
   * "VaultPay" should receive a large boost.
   */

  const titleWords =
    tokenize(chunk.title);


  const titleMatchCount =
    titleWords.filter(
      (word) =>
        normalizedQuery.includes(word)
    ).length;


  if (
    titleMatchCount > 0
  ) {
    score +=
      titleMatchCount * 25;
  }


  /*
   * ------------------------------------------------
   * SPECIAL PROJECT MATCH
   * ------------------------------------------------
   */

  if (
    chunk.type === "project" &&
    normalizedQuery.includes(
      normalizedTitle
    )
  ) {
    score += 50;
  }


  /*
   * ------------------------------------------------
   * SPECIAL EXPERIENCE MATCH
   * ------------------------------------------------
   */

  if (
    chunk.type === "experience" &&
    normalizedQuery.includes(
      normalizedTitle
    )
  ) {
    score += 50;
  }


  return score;
}


/*
 * Retrieve the most relevant knowledge chunks.
 */
export function retrieveKnowledge(
  query,
  limit = 8
) {

  if (
    !query ||
    typeof query !== "string" ||
    query.trim().length === 0
  ) {
    return [];
  }


  const chunks =
    buildKnowledgeChunks();


  const results =
    chunks
      .map((chunk) => ({
        ...chunk,

        score:
          calculateScore(
            query,
            chunk
          ),
      }))

      .filter(
        (chunk) =>
          chunk.score > 0
      )

      .sort(
        (a, b) =>
          b.score - a.score
      );


  return results.slice(
    0,
    limit
  );
}


/*
 * Format retrieved knowledge into
 * context that can later be passed
 * to Gemini.
 */
export function formatRetrievedKnowledge(
  results
) {

  if (
    !results ||
    results.length === 0
  ) {
    return "";
  }


  return results
    .map(
      (item, index) =>

        `KNOWLEDGE ${index + 1}
TYPE: ${item.type}
TITLE: ${item.title}

${item.text}`
    )

    .join(
      "\n\n--------------------\n\n"
    );
}


export default retrieveKnowledge;