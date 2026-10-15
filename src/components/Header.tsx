"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Menu, X, ArrowRight, Search } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import SpotlightSearch from "./SpotlightSearch";
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
  const { t, language } = useLanguage();
  const { settings } = useStudioSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Cmd+K or / search hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-4 xl:gap-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => handleLinkClick("/")}
          className="group flex items-center gap-3 shrink-0 transition-opacity duration-200"
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
              className={`font-serif text-lg xl:text-xl tracking-[0.18em] xl:tracking-[0.2em] uppercase font-medium transition-colors duration-300 leading-tight ${
                isScrolled || !isHomepage ? "text-[#121212]" : "text-white"
              }`}
            >
              {settings.studio_name || "Your Photography"}
            </span>
            <span
              className={`text-[8.5px] xl:text-[9px] tracking-[0.28em] xl:tracking-[0.3em] uppercase font-sans transition-colors duration-300 ${
                isScrolled || !isHomepage ? "text-[#7B6955]" : "text-white/80"
              }`}
            >
              {language === "hi" ? "फाइन आर्ट एवं एडिटोरियल" : "Fine Art & Editorial"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 shrink-0"
          aria-label="Main Navigation"
        >
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
                className={`text-[11px] xl:text-xs tracking-[0.16em] xl:tracking-[0.2em] uppercase transition-all duration-200 relative py-1.5 whitespace-nowrap ${
                  isDarkHeader
                    ? isActive
                      ? "text-[#121212] font-semibold"
                      : "text-[#554837] hover:text-[#121212]"
                    : isActive
                    ? "text-white font-semibold"
                    : "text-white/85 hover:text-white"
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

        {/* Right Action Bar: Search, Language Switcher, CTA & Menu Toggle */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0">
          {/* Spotlight Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`flex items-center gap-1.5 h-9 px-2.5 sm:px-3 text-xs uppercase tracking-wider transition-colors duration-200 border cursor-pointer ${
              isScrolled || !isHomepage
                ? "text-[#554837] hover:text-[#121212] border-[#E8DED0] hover:bg-[#F4EFE6]"
                : "text-white/90 hover:text-white border-white/20 hover:bg-white/10"
            }`}
            title="Search Archive (Shortcut: Cmd+K / Ctrl+K)"
            aria-label="Open search modal"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono text-[10px] opacity-75">⌘K</span>
          </button>

          <LanguageSwitcher
            variant="header"
            isScrolled={isScrolled}
            isHomepage={isHomepage}
          />
          <Link
            href="/contact"
            className={`hidden sm:flex h-9 px-3.5 xl:px-5 text-[11px] xl:text-xs uppercase tracking-[0.16em] xl:tracking-[0.18em] font-medium transition-all duration-300 rounded-none border items-center gap-1.5 xl:gap-2 shrink-0 whitespace-nowrap group ${
              isScrolled || !isHomepage
                ? "bg-[#121212] text-[#FAF7F2] border-[#121212] hover:bg-transparent hover:text-[#121212]"
                : "bg-white text-[#121212] border-white hover:bg-transparent hover:text-white hover:border-white shadow-sm"
            }`}
          >
            <span>{t("nav.book", "Book a Session")}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Mobile/Tablet Menu Toggle (Visible on < xl / when zoomed in) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 transition-colors duration-200 focus:outline-none cursor-pointer"
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
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`xl:hidden fixed inset-x-0 top-full bg-[#FAF7F2] border-b border-[#E8DED0] shadow-xl transition-all duration-300 overflow-hidden ${
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

      {/* Spotlight Search Modal */}
      <SpotlightSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
}
