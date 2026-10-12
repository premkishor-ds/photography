"use client";

import React, { useEffect, useState } from "react";
import { Languages, Check } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "header" | "footer" | "mobile";
  isScrolled?: boolean;
  isHomepage?: boolean;
}

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageSwitcher({
  variant = "header",
  isScrolled = false,
  isHomepage = true,
}: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<"en" | "hi">("en");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read active language from cookie or localStorage
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (match && match[1]) {
      if (match[1].includes("/hi")) {
        setCurrentLang("hi");
      } else {
        setCurrentLang("en");
      }
    } else {
      const stored = localStorage.getItem("site_lang");
      if (stored === "hi") {
        setCurrentLang("hi");
      }
    }
  }, []);

  const switchLanguage = (lang: "en" | "hi") => {
    setCurrentLang(lang);
    setIsOpen(false);
    localStorage.setItem("site_lang", lang);

    const googleTransValue = lang === "hi" ? "/en/hi" : "/en/en";
    
    // Set cookie on both domain and root path
    document.cookie = `googtrans=${googleTransValue}; path=/;`;
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      document.cookie = `googtrans=${googleTransValue}; path=/; domain=${hostname};`;
      if (hostname.includes(".")) {
        const domainParts = hostname.split(".");
        if (domainParts.length > 1) {
          const rootDomain = "." + domainParts.slice(-2).join(".");
          document.cookie = `googtrans=${googleTransValue}; path=/; domain=${rootDomain};`;
        }
      }

      // Check if Google translate combo element exists in DOM
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = lang === "hi" ? "hi" : "en";
        select.dispatchEvent(new Event("change"));
      } else {
        // Reload page to let Google Translate apply cookie
        window.location.reload();
      }
    }
  };

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs uppercase tracking-wider text-[#7B6955]">
        <Languages className="w-3.5 h-3.5" />
        <span>EN</span>
      </div>
    );
  }

  const isDarkHeader = isScrolled || !isHomepage;

  if (variant === "footer") {
    return (
      <div className="flex items-center gap-2">
        <Languages className="w-3.5 h-3.5 text-[#BFA076]" />
        <span className="text-xs uppercase tracking-wider text-[#FAF7F2]/70 font-sans">
          Language / भाषा:
        </span>
        <div className="inline-flex items-center rounded border border-white/20 bg-black/40 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => switchLanguage("en")}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              currentLang === "en"
                ? "bg-[#FAF7F2] text-[#121212] font-semibold"
                : "text-[#FAF7F2]/70 hover:text-white"
            }`}
            aria-label="Switch to English"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => switchLanguage("hi")}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              currentLang === "hi"
                ? "bg-[#FAF7F2] text-[#121212] font-semibold"
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
          <span className="text-xs uppercase tracking-widest text-[#7B6955] flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Language / भाषा
          </span>
          <div className="inline-flex items-center rounded border border-[#E8DED0] bg-[#FAF7F2] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                currentLang === "en"
                  ? "bg-[#121212] text-white font-medium"
                  : "text-[#554837] hover:text-[#121212]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLanguage("hi")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                currentLang === "hi"
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
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer border ${
          isDarkHeader
            ? "border-[#E8DED0] text-[#121212] bg-[#FAF7F2]/80 hover:bg-white"
            : "border-white/30 text-white bg-black/30 hover:bg-black/50"
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Language selection / भाषा चुनें"
      >
        <Languages className="w-3.5 h-3.5" />
        <span>{currentLang === "hi" ? "हिन्दी" : "EN"}</span>
        <span className="text-[10px] opacity-70">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-[#FAF7F2] border border-[#E8DED0] shadow-lg z-50 py-1 focus:outline-none">
          <button
            type="button"
            onClick={() => switchLanguage("en")}
            className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider flex items-center justify-between text-[#121212] hover:bg-[#F3ECE1] cursor-pointer"
          >
            <span>English (EN)</span>
            {currentLang === "en" && <Check className="w-3.5 h-3.5 text-[#7B6955]" />}
          </button>
          <button
            type="button"
            onClick={() => switchLanguage("hi")}
            className="w-full text-left px-3 py-2 text-xs tracking-wider flex items-center justify-between text-[#121212] hover:bg-[#F3ECE1] cursor-pointer font-medium"
          >
            <span>हिन्दी (HI)</span>
            {currentLang === "hi" && <Check className="w-3.5 h-3.5 text-[#7B6955]" />}
          </button>
        </div>
      )}
    </div>
  );
}
