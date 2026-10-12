"use client";

import React, { useState } from "react";
import { Languages, Check, Globe } from "lucide-react";
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

  // Default Desktop Header variant
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer border ${
          isDarkHeader
            ? "border-[#E8DED0] text-[#121212] bg-[#FAF7F2]/80 hover:bg-white"
            : "border-white/30 text-white bg-black/30 hover:bg-black/50"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Language selection / भाषा चुनें"
      >
        <Languages className="w-3.5 h-3.5" />
        <span>{language === "hi" ? "हिन्दी (HI)" : "English (EN)"}</span>
        <span className="text-[9px] opacity-70">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#FAF7F2] border border-[#E8DED0] shadow-xl z-50 py-1 focus:outline-none">
          <button
            type="button"
            onClick={() => handleSelect("en")}
            className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider flex items-center justify-between text-[#121212] hover:bg-[#F3ECE1] cursor-pointer"
          >
            <span className={language === "en" ? "font-semibold text-[#121212]" : "text-[#554837]"}>
              English (Default)
            </span>
            {language === "en" && <Check className="w-3.5 h-3.5 text-[#7B6955]" />}
          </button>
          <button
            type="button"
            onClick={() => handleSelect("hi")}
            className="w-full text-left px-3 py-2 text-xs tracking-wider flex items-center justify-between text-[#121212] hover:bg-[#F3ECE1] cursor-pointer"
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
