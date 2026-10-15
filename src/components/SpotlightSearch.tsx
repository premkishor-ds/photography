"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Camera,
  Layers,
  Sparkles,
  BookOpen,
  MapPin,
  ArrowRight,
  HelpCircle,
  Scale,
  Globe,
  Lock,
} from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/data/photographyData";
import { SERVICES_DATA } from "@/data/servicesData";
import { GEAR_ITEMS, GEAR_COMPARISONS } from "@/data/gearData";
import { BLOG_POSTS } from "@/data/blogData";
import { useLanguage } from "@/context/LanguageContext";

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "Portfolio" | "Gear" | "Services" | "Journal" | "Locations" | "FAQ" | "Pages";
  badge?: string;
  keywords?: string[];
}

export default function SpotlightSearch({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
      setActiveCategoryFilter("All");
    }
  }, [isOpen]);

  // Index all content statically
  const searchableItems: SearchResultItem[] = useMemo(() => {
    const list: SearchResultItem[] = [];

    // 1. Core Studio Pages & Portals
    list.push({
      id: "page-client-portal",
      title: "Private Client Proofing Portal",
      description: "Exclusive access for couples and private patrons to review, curate, and request retouches.",
      url: "/client-portal",
      category: "Pages",
      badge: "Private",
      keywords: ["client", "portal", "proofing", "photos", "login", "access", "क्लाइंट", "पोर्टल", "गैलरी", "प्रूफिंग", "डाउनलोड", "royal2026", "jaipur101"],
    });

    list.push({
      id: "page-about",
      title: "About The Photographer & Studio Heritage",
      description: "Learn about our fine-art philosophy, international acclaim, and 14+ years of heritage documentation.",
      url: "/about",
      category: "Pages",
      badge: "Artist Bio",
      keywords: ["about", "photographer", "lead photographer", "artist", "bio", "heritage", "philosophy", "हमारे बारे में", "प्रोफ़ाइल", "कलाकार", "जीवनी", "इतिहास"],
    });

    list.push({
      id: "page-contact",
      title: "Consultation & Booking Concierge",
      description: "Inquire about bespoke commissions, destination weddings, and studio availability.",
      url: "/contact",
      category: "Pages",
      badge: "Inquiries",
      keywords: ["contact", "book", "inquiry", "commission", "consultation", "rates", "संपर्क", "बुकिंग", "अपॉइंटमेंट", "परामर्श", "फीस"],
    });

    list.push({
      id: "page-services-hub",
      title: "Complete Services & Bespoke Packages",
      description: "Explore our royal wedding cinematography, fine-art portraiture, and commercial campaigns.",
      url: "/services",
      category: "Services",
      badge: "Services Hub",
      keywords: ["services", "packages", "pricing", "wedding", "portrait", "commercial", "सेवाएं", "पैकेज", "दरें", "शादी", "विवाह"],
    });

    list.push({
      id: "page-comparisons-hub",
      title: "Camera & Lens Comparison Hub",
      description: "Side-by-side technical benchmarks: Sony vs Canon vs Hasselblad in real-world shooting.",
      url: "/photography-gear/comparisons",
      category: "Gear",
      badge: "Benchmarks",
      keywords: ["compare", "comparisons", "versus", "vs", "benchmark", "तुलना", "मुकाबला", "कैमरा"],
    });

    // 2. Portfolio items
    PORTFOLIO_ITEMS.forEach((p) => {
      const isWedding = p.category.toLowerCase().includes("wedding");
      const isPortrait = p.category.toLowerCase().includes("portrait");
      const hindiKeywords = [
        "फोटोग्राफी",
        "तस्वीर",
        isWedding ? "शादी" : "",
        isWedding ? "विवाह" : "",
        isPortrait ? "पोर्ट्रेट" : "",
        isPortrait ? "व्यक्तिचित्र" : "",
      ].filter(Boolean);

      list.push({
        id: `port-${p.id}`,
        title: p.title,
        description: `${p.category} • ${p.location} (${p.year}) - ${p.description}`,
        url: "/portfolio",
        category: "Portfolio",
        badge: p.category,
        keywords: [p.category.toLowerCase(), p.location.toLowerCase(), ...hindiKeywords],
      });
    });

    // 3. Services
    SERVICES_DATA.forEach((s) => {
      const isWedding = s.slug.includes("wedding");
      const isPortrait = s.slug.includes("portrait");
      const isCommercial = s.slug.includes("commercial");
      const hindiKeywords = [
        "सेवा",
        "पैकेज",
        isWedding ? "शादी" : "",
        isWedding ? "विवाह" : "",
        isPortrait ? "पोर्ट्रेट" : "",
        isCommercial ? "वाणिज्यिक" : "",
      ].filter(Boolean);

      list.push({
        id: `srv-${s.slug}`,
        title: s.title,
        description: s.shortDescription || s.heroDescription,
        url: `/services/${s.slug}`,
        category: "Services",
        badge: "Service",
        keywords: [s.slug, "service", "booking", ...hindiKeywords],
      });
    });

    // 4. Gear items
    GEAR_ITEMS.forEach((g) => {
      list.push({
        id: `gear-${g.id}`,
        title: g.name,
        description: `${g.manufacturer} ${g.categoryLabel} • ${g.description || g.overview}`,
        url: `/photography-gear/${g.slug}`,
        category: "Gear",
        badge: g.categoryLabel,
        keywords: [
          g.manufacturer.toLowerCase(),
          g.categoryLabel.toLowerCase(),
          "camera",
          "lens",
          "gear",
          "कैमरा",
          "उपकरण",
          "लेंस",
        ],
      });
    });

    // 5. Gear comparisons
    GEAR_COMPARISONS.forEach((c) => {
      list.push({
        id: `comp-${c.slug}`,
        title: c.title,
        description: c.description,
        url: `/photography-gear/comparisons/${c.slug}`,
        category: "Gear",
        badge: "Comparison",
        keywords: ["compare", "vs", "versus", "तुलना", "कैमरा"],
      });
    });

    // 6. Blog posts
    BLOG_POSTS.forEach((b) => {
      list.push({
        id: `blog-${b.slug}`,
        title: b.title,
        description: `${b.category} • ${b.excerpt}`,
        url: `/blog/${b.slug}`,
        category: "Journal",
        badge: b.category,
        keywords: [b.category.toLowerCase(), "journal", "guide", "लेख", "गाइड"],
      });
    });

    // 7. Locations & Hubs
    list.push({
      id: "loc-jaipur",
      title: "Jaipur Flagship Studio & Coverage Areas",
      description: "Room 215, Karolan Ka Barh, 302017. Amer Fort, City Palace, Jal Mahal destination shoots.",
      url: "/locations/jaipur",
      category: "Locations",
      badge: "Flagship Base",
      keywords: ["jaipur", "rajasthan", "amer fort", "city palace", "जयपुर", "राजस्थान"],
    });
    list.push({
      id: "loc-ny",
      title: "New York Destination Portfolio",
      description: "Editorial fashion, Central Park portraits, and Manhattan destination weddings.",
      url: "/locations/new-york",
      category: "Locations",
      badge: "International",
      keywords: ["new york", "nyc", "manhattan", "usa", "न्यूयॉर्क"],
    });
    list.push({
      id: "faq-hub",
      title: "Studio FAQ & Answers",
      description: "Frequently asked questions regarding turnaround time, equipment, booking retainers, and travel.",
      url: "/faq",
      category: "FAQ",
      badge: "Support",
      keywords: ["faq", "help", "questions", "answers", "turnaround", "pricing", "प्रश्न", "उत्तर", "सहायता"],
    });

    return list;
  }, []);

  // Filter items by query and active category filter
  const filteredResults = useMemo(() => {
    let results = searchableItems;
    if (activeCategoryFilter !== "All") {
      results = results.filter((item) => item.category === activeCategoryFilter);
    }
    if (!query.trim()) {
      return results.slice(0, 8); // Top featured suggestions
    }
    const cleanQ = query.toLowerCase().trim();
    return results
      .filter((item) => {
        if (item.title.toLowerCase().includes(cleanQ)) return true;
        if (item.description.toLowerCase().includes(cleanQ)) return true;
        if (item.badge && item.badge.toLowerCase().includes(cleanQ)) return true;
        if (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(cleanQ))) return true;
        return false;
      })
      .slice(0, 10);
  }, [searchableItems, query, activeCategoryFilter]);

  // Keyboard navigation inside search results
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? Math.max(0, filteredResults.length - 1) : prev - 1
        );
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault();
        navigateToResult(filteredResults[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  const navigateToResult = (item: SearchResultItem) => {
    onClose();
    router.push(item.url);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Portfolio":
        return <Camera className="w-4 h-4 text-[#BFA076]" />;
      case "Services":
        return <Layers className="w-4 h-4 text-[#BFA076]" />;
      case "Gear":
        return <Scale className="w-4 h-4 text-[#BFA076]" />;
      case "Pages":
        return <Globe className="w-4 h-4 text-[#BFA076]" />;
      case "Journal":
        return <BookOpen className="w-4 h-4 text-[#BFA076]" />;
      case "Locations":
        return <MapPin className="w-4 h-4 text-[#BFA076]" />;
      default:
        return <HelpCircle className="w-4 h-4 text-[#BFA076]" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-[#E8DED0] shadow-2xl rounded-xs overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#E8DED0] flex items-center gap-3 bg-[#FCFAF6]">
          <Search className="w-5 h-5 text-[#7B6955] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              language === "hi"
                ? "पोर्टफोलियो, उपकरण, क्लाइंट पोर्टल, शादी पैकेज..."
                : "Search portfolio, gear, client portal, wedding packages..."
            }
            className="w-full bg-transparent text-sm sm:text-base text-[#121212] placeholder-[#9E8870] focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#9E8870] hover:text-[#121212] rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-[#F3ECE1] text-[#7B6955] border border-[#E8DED0] rounded-xs">
            ESC
          </span>
        </div>

        {/* Category Pill Filters */}
        <div className="px-4 py-2.5 bg-white border-b border-[#F0E8DC] flex items-center gap-1.5 overflow-x-auto">
          {["All", "Portfolio", "Gear", "Services", "Pages", "Journal", "Locations"].map((cat) => {
            const isActive = activeCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategoryFilter(cat);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1 text-xs uppercase tracking-wider font-sans whitespace-nowrap transition-colors rounded-xs cursor-pointer ${
                  isActive
                    ? "bg-[#121212] text-[#FAF7F2] font-medium"
                    : "text-[#7B6955] hover:bg-[#F4EFE6]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F3ECE1] p-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => navigateToResult(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 sm:p-3.5 rounded-xs flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected ? "bg-[#F4EFE6]" : "hover:bg-[#FCFAF6]"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 p-1.5 bg-white border border-[#E8DED0] rounded-xs shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-[#121212] truncate">
                          {item.title}
                        </h4>
                        {item.badge && (
                          <span className="text-[10px] px-2 py-0.2 bg-[#FAF7F2] border border-[#E8DED0] text-[#7B6955] uppercase font-mono shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#554837] font-light truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 text-[#BFA076] shrink-0 transition-transform ${
                      isSelected ? "translate-x-1 opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-[#7B6955]">
              <p className="text-sm font-light">No matching records found for "{query}".</p>
              <p className="text-xs text-[#9E8870] mt-1">
                Try searching for "portrait", "A7 V", "weddings", "Amer Fort", or "lenses".
              </p>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#E8DED0] flex items-center justify-between text-[11px] text-[#7B6955] font-sans">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to close</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#BFA076]">
            Studio Archive Index
          </span>
        </div>
      </div>
    </div>
  );
}
