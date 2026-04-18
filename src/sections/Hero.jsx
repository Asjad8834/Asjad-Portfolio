import React, { useEffect, useRef, useState } from 'react';
import "../styles/Hero.css";

const ROLES = ['Software Engineer', 'Full Stack Developer', 'MERN Stack Developer', 'Java Developer'];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 45);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex(r => (r + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const skills = ['React.js', 'Node.js', 'Java', 'MongoDB', 'DSA', 'Express.js'];

  return (
    <section id="home" className="hero">
      <div className="grid-bg" />
      <div className="orb orb-purple hero-orb-1" />
      <div className="orb orb-cyan hero-orb-2" />

      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge hero-badge">
            <span className="badge-dot" />
            Ready to build · Open to opportunities
          </div>

          <h1 className="hero-title">
            <span className="hero-greeting">Hi, I'm</span>
            <span className="hero-name">Asjad Iftakhar</span>
          </h1>

          <div className="hero-role-wrapper">
            <span className="hero-role-text">{displayed}</span>
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-desc">
            Software Engineer specializing in building scalable MERN applications and AI-powered solutions.
            Strong foundation in DSA with a passion for creating efficient, real-world products.
          </p>

          <div className="hero-skills">
            {skills.map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('portfolio')}>
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Me
            </button>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/Asjad8834" target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/asjadiftakhar" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:ammarzain8834@gmail.com" className="social-icon" title="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="floating-card card-main animate-float">
              <div className="card-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <div className="card-info">
                <span className="card-label">Full Stack Engineer</span>
                <span className="card-sub">MERN · Java · REST APIs</span>
              </div>
            </div>

            <div className="floating-card card-secondary" style={{ animationDelay: '0.8s' }}>
              <div className="card-stat">
                <span className="stat-num">2+</span>
                <span className="stat-label">Projects Live</span>
              </div>
              <div className="card-stat">
                <span className="stat-num">4</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>

            <div className="floating-card card-patent" style={{ animationDelay: '1.4s' }}>
              <div className="patent-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Patent Published
              </div>
              <span className="patent-project">Sachi – AI Sound Recognition</span>
            </div>

            <div className="hero-tech-ring">
              {['JS', 'TS', 'RE', 'ND', 'MG', 'JV'].map((t, i) => (
                <div key={t} className="tech-orb" style={{ '--i': i }}>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
};

export default Hero;
