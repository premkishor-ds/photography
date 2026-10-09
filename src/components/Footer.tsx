"use client";

import React from "react";
import Link from "next/link";
import { Camera, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, PinterestIcon } from "@/components/Icons";
import { siteConfig } from "@/config/siteConfig";

export const FOOTER_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Photography Gear", href: "/photography-gear" },
  { name: "About", href: "/about" },
  { name: "Journal & Guides", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact & Booking", href: "/contact" },
];

export const FOOTER_SERVICE_LINKS = [
  { name: "Portrait Photography", href: "/services/portrait-photography" },
  { name: "Wedding Photography", href: "/services/wedding-photography" },
  { name: "Event Photography", href: "/services/event-photography" },
  { name: "Sports Photography", href: "/services/sports-photography" },
  { name: "Commercial Photography", href: "/services/commercial-photography" },
  { name: "Travel & Wildlife", href: "/services/travel-and-wildlife-photography" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#121212] text-[#FAF7F2] pt-20 pb-12 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#2A2A2A]">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Camera className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light block">
                  {siteConfig.siteName}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#BFA076] font-sans">
                  Fine Art & Editorial Studio
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FAF7F2]/70 font-light leading-relaxed max-w-md font-sans">
              Capturing moments, creating memories. Timeless visual storytelling dedicated to fine-art portraits, weddings, authentic events, sports, and commercial commissions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socialProfiles.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialProfiles.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Pinterest Boards"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialProfiles.fiveHundredPx}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="500px Portfolio"
              >
                <span className="font-bold text-[10px] font-mono">500px</span>
              </a>
              <a
                href={siteConfig.socialProfiles.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-[#FAF7F2]/75 hover:text-white transition-colors tracking-wide hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              Services
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_SERVICE_LINKS.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-xs sm:text-sm text-[#FAF7F2]/75 hover:text-white transition-colors tracking-wide hover:translate-x-1 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Contact Summary */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              Studio Details
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FAF7F2]/75 font-sans">
              <p className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#BFA076]" />
                <a
                  href={`mailto:${siteConfig.business.email}`}
                  className="hover:underline text-[#FAF7F2]"
                >
                  {siteConfig.business.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#BFA076]" />
                <a
                  href={`tel:${siteConfig.business.phoneRaw}`}
                  className="hover:underline text-[#FAF7F2]"
                >
                  {siteConfig.business.phone}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#BFA076] shrink-0 mt-0.5" />
                <span>{siteConfig.business.address.streetAddress}, {siteConfig.business.address.addressLocality}, {siteConfig.business.address.addressRegion}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal Links & Copyright 2026 */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60 font-sans">
          <p>© 2026 {siteConfig.siteName}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top of page"
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
