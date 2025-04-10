// src/components/buttons/ScrollToTopButton.tsx
import React from 'react';
import './ScrollToTopButton.css';

const ScrollToTopButton: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="scroll-to-top" onClick={handleClick} aria-label="Вернуться вверх">
      ↑
    </button>
  );
};

export default ScrollToTopButton;
