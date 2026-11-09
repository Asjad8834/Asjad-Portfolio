const knowledgeBase = {
  personal: {
    name: "Asjad Iftakhar",
    title: "Full-Stack Software Engineer",
    location: "Bangalore, India",
    summary:
      "Full-stack SDE with two internships, building REST APIs, secure authentication, and React interfaces using Java, JavaScript, Node.js, Express.js, MongoDB, and SQL. Built an idempotent banking backend and a full-stack AI interview-prep platform.",
    github: "https://github.com/Asjad8834",
    portfolio: "https://asjad-portfolio-inky.vercel.app",
    linkedin: "https://linkedin.com/in/asjadiftakhar",
  },

  education: {
    university: {
      name: "Vellore Institute of Technology",
      location: "Vellore, India",
      degree: "B.Tech in Computer Science and Engineering",
      cgpa: "8.02",
      graduation: "2026",
    },

    school: {
      name: "DPS MIS",
      location: "Doha, Qatar",
      graduation: "2022",
    },
  },

  skills: {
    languages: [
      "Java",
      "JavaScript",
      "SQL",
      "Python",
      "Go",
    ],

    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "Authentication",
      "Rate Limiting",
      "MVC",
      "Zod",
    ],

    frontend: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],

    databases: [
      "MongoDB",
      "SQL",
    ],

    ai: [
      "Google Gemini API",
    ],

    cloud: [
      "AWS",
      "AWS S3",
      "AWS EC2",
    ],

    tools: [
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Agile",
      "Postman",
      "Vercel",
      "Render",
    ],

    coreCS: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "SDLC",
    ],
  },

  experience: [
    {
      id: "nepbyte-technologies",

      company: "NepByte Technologies",

      role: "Software Engineer Intern",

      duration: {
        start: "November 2025",
        end: "March 2026",
      },

      technologies: [
        "Python",
        "Node.js",
        "Express.js",
        "MongoDB",
        "SQL",
        "GitHub Actions",
        "CI/CD",
      ],

      responsibilities: [
        "Built the backend of a fabric-condition analysis system recommending wash cycles based on material and wear level using Python.",
        "Developed 14 REST API endpoints covering CRUD, authentication, analysis, and recommendations.",
        "Worked with Node.js, Express.js, MongoDB, and SQL for backend development.",
        "Optimized API performance through database indexing and asynchronous processing.",
        "Debugged authentication flaws, repeated database executions, and resource inefficiencies.",
        "Handled testing, builds, and deployments using GitHub Actions CI/CD.",
      ],

      achievements: [
        "Reduced API response time by approximately 100 ms through database indexing and asynchronous processing.",
        "Debugged more than 12 issues involving authentication, repeated database execution, and resource usage.",
      ],
    },

    {
      id: "ethnus",

      company: "Ethnus",

      role: "MERN Stack Developer Intern",

      duration: {
        start: "May 2025",
        end: "July 2025",
      },

      technologies: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "REST APIs",
        "Git",
        "Agile",
      ],

      responsibilities: [
        "Delivered 5 modules across 6 Agile sprints using modular MERN-stack development.",
        "Implemented backend validation to block unauthenticated and unauthorized requests.",
        "Handled invalid tokens and expired sessions through backend authentication validation.",
        "Integrated React interfaces with REST APIs.",
        "Participated in Git code reviews.",
      ],

      achievements: [
        "Reduced post-review rework by 20%.",
        "Reduced recurring bug reports by 25%.",
        "Integrated 8+ React interfaces with REST APIs.",
        "Participated in code reviews across 15+ pull requests.",
      ],
    },
  ],

  projects: [
    {
      id: "interview-practice-ai",

      name: "Interview Practice AI",

      category: "AI-Powered Interview Preparation",

      date: "August 2026",

      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Gemini API",
        "Zod",
      ],

      description:
        "A full-stack AI-powered interview preparation platform that analyzes resumes against job descriptions and generates interview reports.",

      features: [
        "Resume analysis",
        "Job description analysis",
        "AI-generated interview reports",
        "PDF parsing",
        "AI orchestration",
        "Report persistence",
      ],

      backend: {
        architecture: "Controller-service architecture",
        restEndpoints: 8,
      },

      validation: {
        technology: "Zod",
        fieldsValidated: "6+ Gemini response fields",
      },

      achievements: [
        "Reduced manual interview preparation time by approximately 40% across 43 test scenarios.",
        "Built 8 REST endpoints for PDF parsing, AI orchestration, and report persistence.",
        "Reduced invalid AI-response errors by 30% through Zod validation across 6+ Gemini response fields.",
      ],

      technologiesUsedForAI: [
        "Google Gemini API",
      ],
    },

    {
      id: "vaultpay",

      name: "VaultPay",

      category: "Secure Banking System Backend",

      date: "September 2026",

      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT",
      ],

      description:
        "A secure banking backend designed around ledger-based transaction recording and reliable fund transfers.",

      features: [
        "Ledger-based transaction recording",
        "Atomic fund transfers",
        "MongoDB transactions",
        "Idempotency keys",
        "JWT authentication",
        "OTP email verification",
        "Password hashing",
        "Token blacklisting",
        "Role-based access control",
        "Rate limiting",
        "Email alerts",
      ],

      security: [
        "JWT authentication",
        "OTP email verification",
        "Password hashing",
        "Token blacklisting",
        "Role-based access control",
        "Rate limiting",
      ],

      reliability: [
        "MongoDB transactions",
        "Idempotency keys",
        "Unit testing",
        "Idempotency testing",
        "Concurrency testing",
      ],

      descriptionDetails: [
        "Every balance change is recorded through a ledger-based system.",
        "Fund transfers run atomically using MongoDB transactions and sessions.",
        "Idempotency keys prevent duplicate debits.",
      ],
    },

    {
      id: "sachi",

      name: "Sachi",

      category: "Assistive Sound Recognition",

      date: "August 2025 - November 2025",

      technologies: [
        "Flutter",
        "TensorFlow Lite",
        "Python",
        "CNN",
      ],

      description:
        "An AI-powered assistive application designed for hearing-impaired users that recognizes environmental sounds and provides visual and vibration alerts.",

      features: [
        "Environmental sound classification",
        "On-device machine learning",
        "Offline operation",
        "Visual alerts",
        "Vibration alerts",
      ],

      machineLearning: {
        model: "CNN",
        deployment: "TensorFlow Lite",
        accuracy: "87%",
        inferenceLatency: "Sub-50 ms",
        dataset: "Custom self-recorded dataset",
      },

      soundCategories: 5,

      achievements: [
        "Achieved 87% classification accuracy.",
        "Achieved sub-50 ms inference latency using an on-device TensorFlow Lite CNN model.",
        "Enabled offline operation with no internet dependency.",
        "Implemented visual and vibration alerts across 5 sound categories.",
      ],

      recognition: [
        "Patent Published",
      ],
    },
  ],

  certifications: [
    {
      name: "Oracle Generative AI Professional",
      issuer: "Oracle",
    },

    {
      name: "Oracle SQL HeatWave Associate",
      issuer: "Oracle",
    },

    {
      name: "Microsoft Power BI Data Analytics",
      issuer: "Microsoft",
    },

    {
      name: "Cisco Cybersecurity",
      issuer: "Cisco",
    },
  ],

  career: {
    targetRoles: [
      "Software Engineer",
      "Backend Developer",
      "Full-Stack Developer",
    ],

    preferredLocation: "Bangalore, India",

    areasOfInterest: [
      "Software Engineering",
      "Backend Development",
      "Full-Stack Development",
      "REST API Development",
      "AI-integrated applications",
    ],
  },

  relationships: [
    {
      from: "Asjad Iftakhar",
      relation: "STUDIED_AT",
      to: "Vellore Institute of Technology",
    },

    {
      from: "Asjad Iftakhar",
      relation: "WORKED_AT",
      to: "NepByte Technologies",
    },

    {
      from: "Asjad Iftakhar",
      relation: "WORKED_AT",
      to: "Ethnus",
    },

    {
      from: "Asjad Iftakhar",
      relation: "BUILT",
      to: "Interview Practice AI",
    },

    {
      from: "Asjad Iftakhar",
      relation: "BUILT",
      to: "VaultPay",
    },

    {
      from: "Asjad Iftakhar",
      relation: "BUILT",
      to: "Sachi",
    },

    {
      from: "Interview Practice AI",
      relation: "USES",
      to: "React",
    },

    {
      from: "Interview Practice AI",
      relation: "USES",
      to: "Node.js",
    },

    {
      from: "Interview Practice AI",
      relation: "USES",
      to: "Express.js",
    },

    {
      from: "Interview Practice AI",
      relation: "USES",
      to: "MongoDB",
    },

    {
      from: "Interview Practice AI",
      relation: "USES",
      to: "Gemini API",
    },

    {
      from: "Interview Practice AI",
      relation: "USES",
      to: "Zod",
    },

    {
      from: "VaultPay",
      relation: "USES",
      to: "Node.js",
    },

    {
      from: "VaultPay",
      relation: "USES",
      to: "Express.js",
    },

    {
      from: "VaultPay",
      relation: "USES",
      to: "MongoDB",
    },

    {
      from: "VaultPay",
      relation: "USES",
      to: "JWT",
    },

    {
      from: "Sachi",
      relation: "USES",
      to: "Flutter",
    },

    {
      from: "Sachi",
      relation: "USES",
      to: "TensorFlow Lite",
    },

    {
      from: "Sachi",
      relation: "USES",
      to: "Python",
    },

    {
      from: "Sachi",
      relation: "USES",
      to: "CNN",
    },
  ],
};

export default knowledgeBase;