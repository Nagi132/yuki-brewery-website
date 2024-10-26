"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTopProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calculate scroll progress and visibility
  const handleScroll = () => {
    const winScroll = window.pageYOffset;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    setProgress(scrolled);
    setIsVisible(winScroll > 300);
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="group fixed bottom-8 right-8 z-50 h-12 w-12"
        >
          <div className="absolute inset-0">
            <svg className="h-12 w-12 transform -rotate-90">
              <circle
                className="text-zinc-200"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r="20"
                cx="24"
                cy="24"
              />
              <circle
                className="text-amber-500 transition-all duration-300"
                strokeWidth="2"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 * ((100 - progress) / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="20"
                cx="24"
                cy="24"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 rounded-full transition-transform duration-300 group-hover:scale-95">
            <FaArrowUp className="w-4 h-4 text-white" />
          </div>
        </button>
      )}
    </>
  );
}