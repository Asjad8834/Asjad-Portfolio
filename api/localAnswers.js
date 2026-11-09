import knowledgeBase from "./knowledge.js";

/*
 * Generate answers locally for common factual portfolio questions.
 *
 * These questions do NOT need Gemini.
 * This makes the chatbot faster and also saves Gemini quota.
 */
export function getLocalAnswer(query) {
  if (!query || typeof query !== "string") {
    return null;
  }

  const q = query.toLowerCase().trim();

  // =========================================================
  // SKILLS / TECHNOLOGIES
  // =========================================================

  if (
    q.includes("technologies") ||
    q.includes("technology") ||
    q.includes("skills") ||
    q.includes("tech stack") ||
    q.includes("what does asjad know") ||
    q.includes("what technologies does asjad know")
  ) {
    const skills = knowledgeBase.skills;

    return `Asjad works with a range of technologies across software engineering.

**Programming Languages:** ${skills.languages.join(", ")}

**Backend:** ${skills.backend.join(", ")}

**Frontend:** ${skills.frontend.join(", ")}

**Databases:** ${skills.databases.join(", ")}

**AI:** ${skills.ai.join(", ")}

**Cloud:** ${skills.cloud.join(", ")}

**Tools:** ${skills.tools.join(", ")}`;
  }

  // =========================================================
  // EDUCATION
  // =========================================================

  if (
    q.includes("education") ||
    q.includes("university") ||
    q.includes("college") ||
    q.includes("where did asjad study") ||
    q.includes("where has asjad studied")
  ) {
    const university = knowledgeBase.education.university;
    const school = knowledgeBase.education.school;

    return `Asjad studied **Computer Science and Engineering** at **${university.name}**.

- **Degree:** ${university.degree}
- **CGPA:** ${university.cgpa}
- **Graduation:** ${university.graduation}

He completed his schooling at **${school.name}** in ${school.location}, graduating in ${school.graduation}.`;
  }

  // =========================================================
  // VAULTPAY
  // =========================================================

  if (
    q.includes("vaultpay") ||
    q.includes("vault pay")
  ) {
    const project = knowledgeBase.projects.find(
      (project) => project.id === "vaultpay"
    );

    return `**VaultPay** is a secure banking backend designed around ledger-based transaction recording and reliable fund transfers.

**Technologies:** ${project.technologies.join(", ")}

**Key features:**

- Ledger-based transaction recording
- Atomic fund transfers
- MongoDB transactions
- Idempotency keys
- JWT authentication
- OTP email verification
- Password hashing
- Token blacklisting
- Role-based access control
- Rate limiting
- Email alerts

The project also includes **unit testing, idempotency testing, and concurrency testing** for reliability.`;
  }

  // =========================================================
  // INTERVIEW PRACTICE AI
  // =========================================================

  if (
    q.includes("interview practice") ||
    q.includes("interview practice ai") ||
    q.includes("interview prep") ||
    q.includes("interview preparation")
  ) {
    const project = knowledgeBase.projects.find(
      (project) => project.id === "interview-practice-ai"
    );

    return `**Interview Practice AI** is a full-stack AI-powered interview preparation platform that analyzes resumes against job descriptions and generates interview reports.

**Technologies:** ${project.technologies.join(", ")}

**Key features:**

- Resume analysis
- Job description analysis
- AI-generated interview reports
- PDF parsing
- AI orchestration
- Report persistence

**Highlights:**

- 8 REST endpoints
- Zod validation across 6+ Gemini response fields
- Approximately 40% reduction in manual interview preparation time across 43 test scenarios
- 30% reduction in invalid AI-response errors`;
  }

  // =========================================================
  // SACHI
  // =========================================================

  if (
    q === "sachi" ||
    q.includes("tell me about sachi") ||
    q.includes("sachi project") ||
    q.includes("sound recognition")
  ) {
    const project = knowledgeBase.projects.find(
      (project) => project.id === "sachi"
    );

    return `**Sachi** is an AI-powered assistive application designed for hearing-impaired users. It recognizes environmental sounds and provides visual and vibration alerts.

**Technologies:** ${project.technologies.join(", ")}

**Highlights:**

- **87%** classification accuracy
- **Sub-50 ms** inference latency
- On-device TensorFlow Lite CNN model
- Offline operation
- Visual and vibration alerts across 5 sound categories
- Patent Published`;
  }

  // =========================================================
  // NEPBYTE EXPERIENCE
  // =========================================================

  if (
    q.includes("nepbyte") ||
    q.includes("nepbyte technologies") ||
    q.includes("software engineer intern")
  ) {
    const experience = knowledgeBase.experience.find(
      (item) => item.id === "nepbyte-technologies"
    );

    return `At **${experience.company}**, Asjad worked as a **${experience.role}** from **${experience.duration.start} to ${experience.duration.end}**.

He worked on backend development involving **Python, Node.js, Express.js, MongoDB, and SQL**.

**Key work:**

- Built 14 REST API endpoints covering CRUD, authentication, analysis, and recommendations
- Optimized API performance using database indexing and asynchronous processing
- Worked on testing, builds, and deployments using GitHub Actions CI/CD
- Debugged more than 12 issues involving authentication, repeated database execution, and resource usage
- Reduced API response time by approximately **100 ms**`;
  }

  // =========================================================
  // ETHNUS EXPERIENCE
  // =========================================================

  if (
    q.includes("ethnus") ||
    q.includes("mern internship") ||
    q.includes("mern stack developer intern")
  ) {
    const experience = knowledgeBase.experience.find(
      (item) => item.id === "ethnus"
    );

    return `At **${experience.company}**, Asjad worked as a **${experience.role}** from **${experience.duration.start} to ${experience.duration.end}**.

He worked with **MongoDB, Express.js, React.js, Node.js, REST APIs, Git, and Agile**.

**Highlights:**

- Delivered 5 modules across 6 Agile sprints
- Integrated 8+ React interfaces with REST APIs
- Reduced post-review rework by **20%**
- Reduced recurring bug reports by **25%**
- Participated in code reviews across 15+ pull requests`;
  }

  // =========================================================
  // CERTIFICATIONS
  // =========================================================

  if (
    q.includes("certifications") ||
    q.includes("certificates") ||
    q.includes("certification")
  ) {
    return `Asjad has the following certifications:

- **Oracle Generative AI Professional** — Oracle
- **Oracle SQL HeatWave Associate** — Oracle
- **Microsoft Power BI Data Analytics** — Microsoft
- **Cisco Cybersecurity** — Cisco`;
  }

  // =========================================================
  // CAREER / TARGET ROLE
  // =========================================================

  if (
    q.includes("looking for") ||
    q.includes("target role") ||
    q.includes("career") ||
    q.includes("what job") ||
    q.includes("which roles")
  ) {
    const career = knowledgeBase.career;

    return `Asjad is targeting roles such as:

- **Software Engineer**
- **Backend Developer**
- **Full-Stack Developer**

His areas of interest include **Software Engineering, Backend Development, Full-Stack Development, REST API Development, and AI-integrated applications**.

His preferred location is **${career.preferredLocation}**.`;
  }

  // =========================================================
  // NAME / INTRODUCTION
  // =========================================================

  if (
    q === "who is asjad" ||
    q === "tell me about asjad" ||
    q === "who is asjad iftakhar"
  ) {
    const personal = knowledgeBase.personal;

    return `**${personal.name}** is a **${personal.title}**.

${personal.summary}

He has experience across backend development, full-stack development, REST APIs, authentication, databases, and AI-integrated applications.`;
  }

  // =========================================================
  // NO LOCAL ANSWER
  // =========================================================

  return null;
}

// Default export
export default getLocalAnswer;