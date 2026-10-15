"use client";

import React from "react";
import Link from "next/link";
import { Camera, ArrowUp, Mail, Phone, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, PinterestIcon, YouTubeIcon } from "@/components/Icons";
import { siteConfig } from "@/config/siteConfig";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useStudioSettings } from "@/context/StudioContext";

export const FOOTER_NAV_LINKS = [
  { name: "Home", href: "/", key: "nav.home" },
  { name: "Portfolio", href: "/portfolio", key: "nav.portfolio" },
  { name: "Services", href: "/services", key: "nav.services" },
  { name: "Photography Gear", href: "/photography-gear", key: "nav.gear" },
  { name: "About", href: "/about", key: "nav.about" },
  { name: "Journal & Guides", href: "/blog", key: "nav.journal" },
  { name: "Client Proofing Portal", href: "/client-portal", key: "nav.proofing" },
  { name: "FAQ", href: "/faq", key: "nav.faq" },
  { name: "Contact & Booking", href: "/contact", key: "nav.contact" },
];

export const FOOTER_SERVICE_LINKS = [
  { name: "Portrait Photography", hindiName: "पोर्ट्रेट फोटोग्राफी", href: "/services/portrait-photography" },
  { name: "Wedding Photography", hindiName: "विवाह फोटोग्राफी", href: "/services/wedding-photography" },
  { name: "Event Photography", hindiName: "इवेंट फोटोग्राफी", href: "/services/event-photography" },
  { name: "Sports Photography", hindiName: "खेल फोटोग्राफी", href: "/services/sports-photography" },
  { name: "Commercial Photography", hindiName: "कमर्शियल फोटोग्राफी", href: "/services/commercial-photography" },
  { name: "Travel & Wildlife", hindiName: "यात्रा एवं वन्यजीव फोटोग्राफी", href: "/services/travel-and-wildlife-photography" },
];

export default function Footer() {
  const { t, language } = useLanguage();
  const { settings } = useStudioSettings();

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
                  {settings.studio_name || siteConfig.siteName}
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#BFA076] font-sans">
                  {language === "hi"
                    ? (settings.hindi_subtagline || t("footer.subtagline", "फाइन आर्ट एवं एडिटोरियल स्टूडियो • जयपुर, राजस्थान"))
                    : (settings.subtagline || t("footer.subtagline", "Fine Art & Editorial Studio • Jaipur, Rajasthan"))}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FAF7F2]/75 font-light leading-relaxed max-w-md font-sans">
              {language === "hi"
                ? (settings.hindi_tagline || t("footer.tagline", "क्षणों को कैद करना, यादें बनाना। फाइन-आर्ट पोर्ट्रेट, शाही राजस्थान विवाह, प्रामाणिक कार्यक्रम, खेल और वाणिज्यिक फोटोग्राफी के लिए समर्पित कालातीत दृश्य कला।"))
                : (settings.tagline || t("footer.tagline", "Capturing moments, creating memories. Timeless visual storytelling dedicated to fine-art portraits, royal Rajasthan weddings, authentic events, sports, and commercial commissions."))}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagram_url || siteConfig.socialProfiles.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.pinterest_url || siteConfig.socialProfiles.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Pinterest Boards"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
              <a
                href={settings.five_hundred_px_url || siteConfig.socialProfiles.fiveHundredPx}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="500px Portfolio"
              >
                <span className="font-bold text-[10px] font-mono">500px</span>
              </a>
              <a
                href={settings.facebook_url || siteConfig.socialProfiles.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              {(settings.youtube_url || siteConfig.socialProfiles.youtube) && (
                <a
                  href={settings.youtube_url || siteConfig.socialProfiles.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1F1F1F] hover:bg-[#BFA076] hover:text-[#121212] transition-colors flex items-center justify-center text-white/80"
                  aria-label="YouTube Channel"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              {t("footer.navTitle", "Navigation")}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-[#FAF7F2]/75 hover:text-white transition-colors tracking-wide hover:translate-x-1 inline-block"
                  >
                    {t(link.key, link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              {t("footer.servicesTitle", "Services")}
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_SERVICE_LINKS.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-xs sm:text-sm text-[#FAF7F2]/75 hover:text-white transition-colors tracking-wide hover:translate-x-1 inline-block"
                  >
                    {language === "hi" && service.hindiName ? service.hindiName : service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Contact Summary */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#BFA076] font-sans font-medium">
              {t("footer.studioTitle", "Studio Details")}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FAF7F2]/75 font-sans">
              <p className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#BFA076]" />
                <a
                  href={`mailto:${settings.email || siteConfig.business.email}`}
                  className="hover:underline text-[#FAF7F2]"
                >
                  {settings.email || siteConfig.business.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#BFA076]" />
                <a
                  href={`tel:${(settings.phone || siteConfig.business.phone).replace(/[^0-9+]/g, "")}`}
                  className="hover:underline text-[#FAF7F2]"
                >
                  {settings.phone || siteConfig.business.phone}
                </a>
              </p>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#BFA076] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>
                    {language === "hi" && (settings.hindi_address || siteConfig.business.address.hindiAddress)
                      ? (settings.hindi_address || siteConfig.business.address.hindiAddress)
                      : (settings.address || `${siteConfig.business.address.streetAddress}, ${siteConfig.business.address.addressLocality}, ${siteConfig.business.address.addressRegion} ${siteConfig.business.address.postalCode}`)}
                  </p>
                  {language !== "hi" && (settings.hindi_address || siteConfig.business.address.hindiAddress) && (
                    <p className="text-[11px] text-[#FAF7F2]/60 font-sans">
                      {settings.hindi_address || siteConfig.business.address.hindiAddress}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#BFA076] shrink-0 mt-0.5" />
                <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                  {language === "hi"
                    ? (settings.hindi_working_hours || "सोमवार – शनिवार: प्रातः 9:30 – सायं 7:00 IST (रविवार केवल पूर्व अपॉइंटमेंट द्वारा)")
                    : (settings.working_hours || "Monday – Saturday: 9:30 AM – 7:00 PM IST (Sunday by Appointment)")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Language Switcher, Legal Links & Copyright 2026 */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60 font-sans">
          <p>© 2026 {settings.studio_name || siteConfig.siteName}. {t("footer.rights", "All rights reserved.")}</p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <LanguageSwitcher variant="footer" />
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              {t("footer.privacy", "Privacy Policy")}
            </Link>
            <span>•</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              {t("footer.terms", "Terms & Conditions")}
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>{t("footer.backToTop", "Back to Top")}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
