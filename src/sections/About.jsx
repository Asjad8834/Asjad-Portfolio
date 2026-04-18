import React, { useEffect, useRef, useState } from "react";
import "../styles/About.css";

const stats = [
  {
    icon: "⚡",
    num: "2+",
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
    label: "Graduating",
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
                Hello! I'm <strong>Asjad Iftakhar</strong>, a Computer Science
                student at VIT Vellore (graduating 2026), passionate about
                building smart, scalable web & mobile applications.
              </p>

              <p className="bio-text">
                I've gained hands-on experience as a{" "}
                <strong>MERN Stack Developer Intern at Ethnus</strong>, building
                responsive full-stack apps and integrating RESTful APIs. My
                project <em>Sachi</em> — an AI-powered sound recognition app for
                the hearing-impaired — even earned a{" "}
                <strong>published patent</strong>.
                <p>And So did another Project of mine for Cloud Computing---Objective to automatically select between servers and Vms and reduce the total energy consumed by the entire cloud platform</p>
              </p>

              <p className="bio-text">
                My goal is to transition into a software engineering role
                focused on building efficient, real-world products, eventually
                moving toward AI and data science.
              </p>

              <div className="bio-links">
                <a
                  href="mailto:ammarzain8834@gmail.com"
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
                  href="/Asjad Iftakhar Resume_3.pdf"
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
                  href="https://linkedin.com/in/asjadiftakhar"
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
