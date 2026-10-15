"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll back to top"
      className="fixed bottom-6 left-6 z-30 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E8DED0] text-[#121212] shadow-md hover:bg-[#121212] hover:text-[#FAF7F2] hover:border-[#121212] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 cursor-pointer group"
    >
      <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
