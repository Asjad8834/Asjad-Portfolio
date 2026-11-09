import React, { useEffect, useRef, useState } from "react";
import "./ReactiveCompanion.css";

const SECTION_MESSAGES = {
  hero: [
    "// welcome",
    "// nice to meet you",
    "// feel free to explore",
  ],

  about: [
    "// that's me",
    "// here's the short version",
    "// getting to know the developer",
  ],

  skills: [
    "// tools of the trade",
    "// yes, there's Java",
    "// quite a few technologies here",
  ],

  portfolio: [
    "// now we're talking",
    "// things I've actually built",
    "// pick something interesting",
  ],

  projects: [
    "// now we're talking",
    "// things I've actually built",
    "// pick something interesting",
  ],

  experience: [
    "// where the work happened",
    "// experience > tutorials",
    "// here's the professional side",
  ],

  contact: [
    "// you've made it this far",
    "// might as well say hi",
    "// looking for someone to build with?",
  ],
};

const DEFAULT_MESSAGES = [
  "// still here?",
  "// explore freely",
  "// interesting...",
  "// I'm watching 👀",
];

function ReactiveCompanion({ chatbotOpen = false }) {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [mood, setMood] = useState("idle");
  const [activeSection, setActiveSection] = useState("hero");

  const messageTimeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const scrollTimeoutRef = useRef(null);

  /*
   * Show a temporary message.
   */
  const showCompanionMessage = (text, duration = 2800) => {
    clearTimeout(messageTimeoutRef.current);
    clearTimeout(hideTimeoutRef.current);

    setMessage(text);
    setShowMessage(true);

    hideTimeoutRef.current = setTimeout(() => {
      setShowMessage(false);
    }, duration);
  };

  /*
   * Initial welcome.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      showCompanionMessage("// welcome", 3000);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(messageTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  /*
   * Detect the section currently visible on screen.
   */
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("section[id]")
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (!visibleEntries.length) return;

        const sectionId = visibleEntries[0].target.id;

        if (sectionId === activeSection) return;

        setActiveSection(sectionId);

        const messages =
          SECTION_MESSAGES[sectionId] ||
          DEFAULT_MESSAGES;

        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];

        setMood("excited");

        showCompanionMessage(randomMessage, 2600);

        setTimeout(() => {
          setMood("idle");
        }, 900);
      },
      {
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  /*
   * Detect scrolling behavior.
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference =
        Math.abs(currentScrollY - lastScrollY.current);

      lastScrollY.current = currentScrollY;

      if (difference > 80) {
        setMood("thinking");
      }

      clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setMood("idle");
      }, 500);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  /*
   * React to project / skill / technology hover.
   */
  useEffect(() => {
    const interactiveElements =
      document.querySelectorAll(
        "[data-companion-message]"
      );

    if (!interactiveElements.length) return;

    const handlers = [];

    interactiveElements.forEach((element) => {
      const handleEnter = () => {
        const customMessage =
          element.getAttribute(
            "data-companion-message"
          );

        if (!customMessage) return;

        setMood("excited");
        showCompanionMessage(
          customMessage,
          2200
        );

        setTimeout(() => {
          setMood("idle");
        }, 700);
      };

      element.addEventListener(
        "mouseenter",
        handleEnter
      );

      handlers.push({
        element,
        handleEnter,
      });
    });

    return () => {
      handlers.forEach(
        ({ element, handleEnter }) => {
          element.removeEventListener(
            "mouseenter",
            handleEnter
          );
        }
      );
    };
  }, []);

  /*
   * Don't allow the companion to visually compete
   * with the chatbot.
   */
  if (chatbotOpen) {
    return null;
  }

  return (
    <div
      className={`reactive-companion companion-${mood}`}
      aria-hidden="true"
    >
      {showMessage && (
        <div className="companion-message">
          <span className="message-prefix">&gt;</span>
          <span>{message}</span>
        </div>
      )}

      <div className="companion-core">
        <div className="companion-screen">
          <span className="companion-code">
            &gt;_
          </span>
        </div>

        <span className="companion-status" />
      </div>
    </div>
  );
}

export default ReactiveCompanion;