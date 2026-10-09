"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/data/photographyData";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section spy
      const sections = ["home", "portfolio", "services", "about", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DED0]/70 py-4"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-3 transition-opacity duration-200"
          aria-label="Your Photography - Home"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isScrolled
                ? "bg-[#121212] text-[#FAF7F2]"
                : "bg-white/90 text-[#121212] backdrop-blur-sm"
            }`}
          >
            <Camera className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                isScrolled ? "text-[#121212]" : "text-white"
              }`}
            >
              Your Photography
            </span>
            <span
              className={`text-[9px] tracking-[0.3em] uppercase -mt-1 font-sans transition-colors duration-300 ${
                isScrolled ? "text-[#7B6955]" : "text-white/80"
              }`}
            >
              Fine Art & Editorial
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm tracking-widest uppercase transition-all duration-200 relative py-1 ${
                  isScrolled
                    ? isActive
                      ? "text-[#121212] font-semibold"
                      : "text-[#554837] hover:text-[#121212]"
                    : isActive
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-colors duration-300 ${
                      isScrolled ? "bg-[#121212]" : "bg-white"
                    }`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none border flex items-center gap-2 group ${
              isScrolled
                ? "bg-[#121212] text-[#FAF7F2] border-[#121212] hover:bg-transparent hover:text-[#121212]"
                : "bg-white text-[#121212] border-white hover:bg-transparent hover:text-white hover:border-white"
            }`}
          >
            <span>Book a Session</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-200 focus:outline-none`}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                isScrolled ? "text-[#121212]" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isScrolled ? "text-[#121212]" : "text-white"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-full bg-[#FAF7F2] border-b border-[#E8DED0] shadow-xl transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[420px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-8 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base tracking-[0.15em] uppercase text-[#121212] py-2 border-b border-[#F3ECE1] hover:text-[#7B6955] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full text-center block py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] transition-colors"
            >
              Book a Session
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
