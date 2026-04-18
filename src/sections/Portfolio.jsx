import React, { useState, useRef, useEffect } from 'react';
import "../styles/Portfolio.css";

const projects = [
  {
    name: 'Sachi – Assistive Sound Recognition',
    desc: 'AI-powered mobile app to assist hearing-impaired users by detecting and classifying environmental sounds in real time with 87% CNN accuracy. Patent Published.',
    tags: ['Flutter', 'TensorFlow Lite', 'CNN', 'Machine Learning'],
    badge: '🏆 Patent Published',
    badgeColor: 'gold',
    period: 'Aug – Nov 2025',
    highlights: ['87% CNN accuracy', '<50ms inference time', 'Visual + vibration alerts'],
    link: null,
  },
  {
    name: 'CRM Software',
    desc: 'Full-stack CRM system to manage contacts, track interactions, and optimize lead workflows with a real-time analytics dashboard.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel', 'Render'],
    badge: '🚀 Live',
    badgeColor: 'cyan',
    period: 'Apr 2026',
    highlights: ['REST APIs', 'Analytics Dashboard', 'Deployed on Vercel'],
    link: "https://crm-software-plum.vercel.app/",
  },
];

const certs = [
  { name: 'Oracle Generative AI Professional', issuer: 'Oracle', icon: '🔶', color: 'orange' },
  { name: 'Oracle SQL HeatWave Associate', issuer: 'Oracle', icon: '🔶', color: 'orange' },
  { name: 'Microsoft Power BI Data Analytics', issuer: 'Microsoft', icon: '🟦', color: 'blue' },
  { name: 'Cisco Cybersecurity Certification', issuer: 'Cisco', icon: '🔵', color: 'cyan' },
];

const techStack = [
  { name: 'Java', icon: '☕', category: 'Language' },
  { name: 'JavaScript', icon: '🟡', category: 'Language' },
  { name: 'SQL', icon: '🗄️', category: 'Language' },
  { name: 'React.js', icon: '⚛️', category: 'Frontend' },
  { name: 'HTML / CSS', icon: '🎨', category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Express.js', icon: '🚂', category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', category: 'Database' },
  { name: 'Git / GitHub', icon: '🐙', category: 'Tools' },
  { name: 'Docker', icon: '🐳', category: 'Tools' },
  { name: 'Postman', icon: '📮', category: 'Tools' },
  { name: 'REST APIs', icon: '🔗', category: 'Concepts' },
  { name: 'CI/CD', icon: '🔄', category: 'Concepts' },
  { name: 'Agile', icon: '📋', category: 'Concepts' },
];

const TABS = ['Projects', 'Certifications', 'Tech Stack'];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="portfolio" ref={ref}>
      <div className="grid-bg" />
      <div className="orb orb-cyan portfolio-orb" />

      <div className="container">
        {/* Stats row */}
        <div className={`portfolio-stats ${visible ? 'visible' : ''}`}>
          {[
            { icon: '<>', label: 'Total Projects', num: '5', sub: 'Innovative solutions crafted' },
            { icon: '🏅', label: 'Certifications', num: '4', sub: 'Professional skills validated' },
            { icon: '📄', label: 'Patent', num: '2', sub: 'Published recognition' },
          ].map((s, i) => (
            <div key={i} className="pstat-card card">
              <div className="pstat-top">
                <div className="pstat-icon-wrap">
                  <span>{s.icon}</span>
                </div>
                <span className="pstat-num">{s.num}</span>
              </div>
              <div className="pstat-label">{s.label}</div>
              <div className="pstat-sub">
                {s.sub}
                <span className="pstat-arrow">↗</span>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-heading">Portfolio Showcase</h2>
        <p className="section-subtext">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>

        {/* Tabs */}
        <div className="tab-bar">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {i === 0 && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>}
              {i === 1 && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>}
              {i === 2 && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="6" height="6"/><rect x="9" y="3" width="6" height="6"/><rect x="16" y="3" width="6" height="6"/><rect x="2" y="10" width="6" height="6"/><rect x="9" y="10" width="6" height="6"/><rect x="16" y="10" width="6" height="6"/></svg>}
              {tab}
            </button>
          ))}
        </div>

        {/* Projects */}
        {activeTab === 0 && (
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={i} className="project-card card">
                <div className="project-header">
                  <div className={`project-badge badge-${p.badgeColor}`}>{p.badge}</div>
                  <span className="project-period">{p.period}</span>
                </div>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-highlights">
                  {p.highlights.map(h => (
                    <div key={h} className="highlight-item">
                      <span className="highlight-dot" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
                    Live Demo ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {activeTab === 1 && (
          <div className="certs-grid">
            {certs.map((c, i) => (
              <div key={i} className="cert-card card">
                <div className={`cert-icon-wrap cert-${c.color}`}>
                  <span>{c.icon}</span>
                </div>
                <div className="cert-info">
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-issuer">Issued by {c.issuer}</span>
                </div>
                <div className="cert-verified">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Verified
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {activeTab === 2 && (
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <div key={i} className="tech-card card" style={{ animationDelay: `${i * 0.04}s` }}>
                <span className="tech-icon">{t.icon}</span>
                <span className="tech-name">{t.name}</span>
                <span className="tech-category">{t.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
