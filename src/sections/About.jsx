import React, { useEffect, useRef, useState } from "react";
import "../styles/About.css";

const stats = [
  {
    icon: "⚡",
    num: "4+",
    label: "Projects Live",
    sub: "Deployed & production-ready",
  },
  {
    icon: "🏅",
    num: "4",
    label: "Certifications",
    sub: "Oracle, Microsoft, Cisco",
  },
  {
    icon: "📅",
    num: "2026",
    label: "Graduated",
    sub: "VIT Vellore — B.Tech CS",
  },
  {
    icon: "🧠",
    num: "87%",
    label: "ML Accuracy",
    sub: "CNN model — Sachi app",
  },
];

const About = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="grid-bg" />
      <div className="orb orb-purple about-orb" />

      <div className="container">
        <h2 className="section-heading">About Me</h2>
        <p className="section-subtext">
          A passionate engineer who turns complex problems into elegant
          solutions
        </p>

        <div className={`about-grid ${visible ? "visible" : ""}`}>
          {/* Left: bio */}
          <div className="about-bio">
            <div className="about-bio-card card">
              <div className="bio-tag">
                <span className="badge">
                  <span className="badge-dot" />
                  Software Engineer
                </span>
              </div>

              <p className="bio-text">
                  Hi, I'm <strong>Asjad Iftakhar</strong>, a full-stack software engineer
                  based in Bengaluru. I graduated in Computer Science from{" "}
                  <strong>VIT Vellore</strong> in 2026 and I focus on backend systems:
                  REST APIs, secure authentication and databases, with React on the front end.
              </p>

              <p className="bio-text">
                  I've completed two internships. At <strong>NepByte Technologies</strong> I
                  built 14 REST API endpoints and cut response time by about 100 ms. At{" "}
                  <strong>Ethnus</strong> I delivered 5 MERN modules in 6 Agile sprints.
                  Right now I'm building <em>Asjad Bank</em>, an idempotent, ledger-based
                  banking backend with atomic transfers, and <em>Interview Practice AI</em>,
                  a Gemini-powered tool that turns a resume and job description into an
                  interview report.
                </p>

              <p className="bio-text">
                  Two of my projects earned <strong>published patents</strong>.{" "}
                  <em>Sachi</em> is an on-device sound recognition app for the
                  hearing-impaired, with 87% accuracy and sub-50 ms inference. My cloud
                  computing project automatically selects between servers and VMs to reduce
                  the total energy consumed by the entire cloud platform.
              </p>

              <p className="bio-text">
                I'm looking for a Software Engineer / SDE role where I can build reliable,
                scalable products with a strong engineering team.
              </p>

              <div className="bio-links">
                <a
                  href="mailto:asjadiftakhar8834@gmail.com"
                  className="btn-primary"
                >
                  <span>Get in Touch</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/Asjad Iftakhar Resume.pdf"
                  download
                  className="btn-primary"
                >
                  <span>Download CV</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/asjadiftakhar/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          {/* Right: stats + education */}
          <div className="about-right">
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="stat-card card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="stat-icon">{s.icon}</span>
                  <span className="stat-number">{s.num}</span>
                  <span className="stat-name">{s.label}</span>
                  <span className="stat-desc">{s.sub}</span>
                </div>
              ))}
            </div>

            <div className="education-card card">
              <div className="edu-header">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span>Education</span>
              </div>
              <div className="edu-item">
                <div className="edu-dot" />
                <div className="edu-info">
                  <span className="edu-school">
                    Vellore Institute of Technology, Vellore
                  </span>
                  <span className="edu-degree">
                    B.Tech — Computer Science & Engineering
                  </span>
                  <span className="edu-year">Expected 2026</span>
                </div>
              </div>
              <div className="edu-item">
                <div className="edu-dot secondary" />
                <div className="edu-info">
                  <span className="edu-school">DPS MIS, Doha, Qatar</span>
                  <span className="edu-degree">Higher Secondary Education</span>
                  <span className="edu-year">Graduated 2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
