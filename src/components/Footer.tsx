"use client";

import React from "react";
import { Camera, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, PinterestIcon } from "@/components/Icons";
import { NAV_LINKS, CONTACT_DETAILS } from "@/data/photographyData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#121212] text-[#FAF7F2] pt-20 pb-12 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2A2A2A]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Camera className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light block">
                  Your Photography
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#BFA076] font-sans">
                  Fine Art & Editorial Studio
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FAF7F2]/70 font-light leading-relaxed max-w-md font-sans">
              Capturing moments, creating memories. Timeless visual storytelling dedicated to fine-art portraits, weddings, authentic events, and natural beauty.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONTACT_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_DETAILS.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_DETAILS.fiveHundredPxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="500px Portfolio"
              >
                <span className="font-bold text-[10px] font-mono">500px</span>
              </a>
              <a
                href={CONTACT_DETAILS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-[#FAF7F2]/75 hover:text-white transition-colors tracking-wide hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Contact Summary */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              Studio Details
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FAF7F2]/75 font-sans">
              <p className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#BFA076]" />
                <span>{CONTACT_DETAILS.email}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#BFA076]" />
                <span>{CONTACT_DETAILS.phone}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#BFA076] shrink-0 mt-0.5" />
                <span>{CONTACT_DETAILS.address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright 2026 & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60 font-sans">
          <p>© 2026 Your Photography. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#FAF7F2]/40 hidden sm:inline">
              Capturing moments, creating memories.
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
