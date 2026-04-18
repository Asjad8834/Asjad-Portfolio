import React, { useEffect, useState } from 'react';
import "../styles/CustomCursor.css";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);

    const animateTrail = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(animateTrail);
    };
    const id = requestAnimationFrame(animateTrail);

    const addHover = () => {
      document.querySelectorAll('a, button, .card, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };
    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div className={`cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ left: pos.x, top: pos.y }} />
      <div className={`cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ left: trail.x, top: trail.y }} />
    </>
  );
};

export default CustomCursor;
