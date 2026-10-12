"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Menu, X, ArrowRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

export const PRIMARY_NAV_LINKS = [
  { key: "nav.home", name: "Home", href: "/" },
  { key: "nav.portfolio", name: "Portfolio", href: "/portfolio" },
  { key: "nav.services", name: "Services", href: "/services" },
  { key: "nav.gear", name: "Gear", href: "/photography-gear" },
  { key: "nav.about", name: "About", href: "/about" },
  { key: "nav.journal", name: "Journal", href: "/blog" },
  { key: "nav.faq", name: "FAQ", href: "/faq" },
  { key: "nav.contact", name: "Contact", href: "/contact" },
];

export default function Header() {
  const { t } = useLanguage();
  const { settings } = useStudioSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    // If on homepage and linking to home, scroll to top
    if (isHomepage && href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || !isHomepage
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DED0]/70 py-4"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => handleLinkClick("/")}
          className="group flex items-center gap-3 transition-opacity duration-200"
          aria-label={`${settings.studio_name || "Your Photography"} - Home`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isScrolled || !isHomepage
                ? "bg-[#121212] text-[#FAF7F2]"
                : "bg-white/90 text-[#121212] backdrop-blur-sm"
            }`}
          >
            <Camera className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                isScrolled || !isHomepage ? "text-[#121212]" : "text-white"
              }`}
            >
              {settings.studio_name || "Your Photography"}
            </span>
            <span
              className={`text-[9px] tracking-[0.3em] uppercase -mt-1 font-sans transition-colors duration-300 ${
                isScrolled || !isHomepage ? "text-[#7B6955]" : "text-white/80"
              }`}
            >
              Fine Art & Editorial
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            const isDarkHeader = isScrolled || !isHomepage;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-widest uppercase transition-all duration-200 relative py-1 ${
                  isDarkHeader
                    ? isActive
                      ? "text-[#121212] font-semibold"
                      : "text-[#554837] hover:text-[#121212]"
                    : isActive
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(link.key, link.name)}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-colors duration-300 ${
                      isDarkHeader ? "bg-[#121212]" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher
            variant="header"
            isScrolled={isScrolled}
            isHomepage={isHomepage}
          />
          <Link
            href="/contact"
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none border flex items-center gap-2 group ${
              isScrolled || !isHomepage
                ? "bg-[#121212] text-[#FAF7F2] border-[#121212] hover:bg-transparent hover:text-[#121212]"
                : "bg-white text-[#121212] border-white hover:bg-transparent hover:text-white hover:border-white"
            }`}
          >
            <span>{t("nav.book", "Book a Session")}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 transition-colors duration-200 focus:outline-none`}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                isScrolled || !isHomepage ? "text-[#121212]" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                isScrolled || !isHomepage ? "text-[#121212]" : "text-white"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-full bg-[#FAF7F2] border-b border-[#E8DED0] shadow-xl transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[550px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-8 space-y-3">
          {PRIMARY_NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-sm tracking-[0.15em] uppercase text-[#121212] py-2 border-b border-[#F3ECE1] hover:text-[#7B6955] transition-colors"
            >
              {t(link.key, link.name)}
            </Link>
          ))}
          <LanguageSwitcher variant="mobile" />
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] transition-colors"
            >
              {t("nav.book", "Book a Session")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
