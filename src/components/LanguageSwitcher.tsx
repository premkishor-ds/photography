"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "header" | "footer" | "mobile";
  isScrolled?: boolean;
  isHomepage?: boolean;
}

export default function LanguageSwitcher({
  variant = "header",
  isScrolled = false,
  isHomepage = true,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
    }
    setIsOpen(false);
  };

  const isDarkHeader = isScrolled || !isHomepage;

  if (variant === "footer") {
    return (
      <div className="flex items-center gap-2">
        <Globe className="w-3.5 h-3.5 text-[#BFA076]" />
        <span className="text-xs uppercase tracking-wider text-[#FAF7F2]/75 font-sans">
          Language / भाषा:
        </span>
        <div className="inline-flex items-center rounded border border-white/20 bg-black/40 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => handleSelect("en")}
            className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${
              language === "en"
                ? "bg-[#FAF7F2] text-[#121212] font-semibold shadow-sm"
                : "text-[#FAF7F2]/70 hover:text-white"
            }`}
            aria-label="Switch to English"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => handleSelect("hi")}
            className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${
              language === "hi"
                ? "bg-[#FAF7F2] text-[#121212] font-semibold shadow-sm"
                : "text-[#FAF7F2]/70 hover:text-white"
            }`}
            aria-label="हिन्दी में अनुवाद करें (Translate to Hindi)"
          >
            हिन्दी
          </button>
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="pt-3 pb-2 border-t border-[#E8DED0]">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-[#7B6955] flex items-center gap-2 font-medium">
            <Globe className="w-4 h-4 text-[#BFA076]" />
            Language / भाषा
          </span>
          <div className="inline-flex items-center rounded border border-[#E8DED0] bg-[#FAF7F2] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => handleSelect("en")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                language === "en"
                  ? "bg-[#121212] text-white font-medium"
                  : "text-[#554837] hover:text-[#121212]"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleSelect("hi")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                language === "hi"
                  ? "bg-[#121212] text-white font-medium"
                  : "text-[#554837] hover:text-[#121212]"
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Desktop Header variant - aligned with CTA button height & baseline
  return (
    <div ref={dropdownRef} className="relative inline-block text-left shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-9 px-3 text-[11px] xl:text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer border flex items-center gap-1.5 xl:gap-2 shrink-0 whitespace-nowrap ${
          isDarkHeader
            ? "border-[#D8CFC4] text-[#121212] bg-[#FAF7F2]/80 hover:bg-[#FAF7F2] hover:border-[#121212]"
            : "border-white/30 text-white bg-black/30 hover:bg-black/50 hover:border-white/60 backdrop-blur-sm"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Language selection / भाषा चुनें"
      >
        <Globe className="w-3.5 h-3.5 text-[#BFA076] shrink-0" />
        <span className="font-sans font-medium tracking-wider">
          <span className="hidden xl:inline">{language === "hi" ? "हिन्दी" : "English"}</span>
          <span className="xl:hidden">{language === "hi" ? "HI" : "EN"}</span>
        </span>
        <ChevronDown
          className={`w-3 h-3 opacity-60 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-[#FAF7F2] border border-[#E8DED0] shadow-2xl py-1 z-50 focus:outline-none backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
          <button
            type="button"
            onClick={() => handleSelect("en")}
            className="w-full text-left px-3.5 py-2 text-xs uppercase tracking-wider flex items-center justify-between text-[#121212] hover:bg-[#F3ECE1] cursor-pointer transition-colors"
          >
            <span className={language === "en" ? "font-semibold text-[#121212]" : "text-[#554837]"}>
              English (EN)
            </span>
            {language === "en" && <Check className="w-3.5 h-3.5 text-[#7B6955]" />}
          </button>
          <button
            type="button"
            onClick={() => handleSelect("hi")}
            className="w-full text-left px-3.5 py-2 text-xs tracking-wider flex items-center justify-between text-[#121212] hover:bg-[#F3ECE1] cursor-pointer transition-colors"
          >
            <span className={language === "hi" ? "font-semibold text-[#121212]" : "text-[#554837]"}>
              हिन्दी (Hindi)
            </span>
            {language === "hi" && <Check className="w-3.5 h-3.5 text-[#7B6955]" />}
          </button>
        </div>
      )}
    </div>
  );
}
