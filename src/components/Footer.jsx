import React from 'react';
import "../styles/Footer.css";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-inner">
        <div className="footer-logo" onClick={scrollToTop}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Asjad</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Asjad Iftakhar. Built with React.js.
        </p>

        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
