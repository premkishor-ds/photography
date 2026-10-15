"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ZoomIn, MapPin } from "lucide-react";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PortfolioItem,
  getLocalizedPortfolioItem,
} from "@/data/photographyData";
import Lightbox from "./Lightbox";
import { useLanguage } from "@/context/LanguageContext";

export default function PortfolioGallery() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Works");
  const [galleryItems, setGalleryItems] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dynamically load updated items from Supabase
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicPortfolio() {
      try {
        const res = await fetch("/api/admin/portfolio");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.items) && data.items.length > 0) {
          const mapped: PortfolioItem[] = data.items.map((it: any) => ({
            id: it.id,
            title: it.title,
            category: it.category,
            imageUrl: it.image_url,
            aspectRatio: it.aspect_ratio || "landscape",
            location: it.location || "Jaipur, India",
            year: it.year || "2026",
            description: it.description || "",
          }));
          setGalleryItems(mapped);
        }
      } catch {
        // Fallback to static items
      }
    }
    loadDynamicPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter items based on category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All Works") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, galleryItems]);

  const localizedItems = useMemo(() => {
    return filteredItems.map((item) => getLocalizedPortfolioItem(item, language));
  }, [filteredItems, language]);

  const handleOpenLightbox = (item: PortfolioItem) => {
    const index = localizedItems.findIndex((i) => i.id === item.id);
    setActiveImageIndex(index !== -1 ? index : 0);
    setLightboxOpen(true);
  };

  const getCategoryLabel = (category: string) => {
    if (language !== "hi") return category;
    switch (category) {
      case "All Works": return "सभी कार्य";
      case "Portrait Photography": return "पोर्ट्रेट";
      case "Wedding Photography": return "विवाह";
      case "Event Photography": return "कार्यक्रम";
      case "Sports Photography": return "खेल";
      case "Commercial Photography": return "कमर्शियल";
      case "Nature & Wildlife": return "प्रकृति एवं वन्यजीव";
      case "Travel Photography": return "यात्रा एवं धरोहर";
      case "Travel & Wildlife": return "यात्रा एवं वन्यजीव";
      default: return category;
    }
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#FAF7F2] text-[#121212]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium mb-3">
            {t("portfolio.badge", "Selected Works")}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#121212]">
            {t("portfolio.title", "Portfolio Gallery")}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#554837] font-light max-w-xl mx-auto leading-relaxed">
            {t("portfolio.desc", "A curated collection of captured light, raw emotion, and timeless storytelling spanning fine-art portraits, weddings, and natural landscapes.")}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 font-sans cursor-pointer ${
                  isActive
                    ? "bg-[#121212] text-[#FAF7F2] shadow-sm font-medium"
                    : "bg-[#F3ECE1]/80 text-[#554837] hover:bg-[#E8DED0] hover:text-[#121212]"
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {localizedItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="group relative cursor-pointer overflow-hidden bg-[#E8DED0] shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                {/* Image Container with responsive aspect ratio */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white" />

                  {/* Hover Floating Action */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <ZoomIn className="w-4 h-4 stroke-[1.5]" />
                  </div>

                  {/* Hover Caption Details */}
                  <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8DED0] font-sans block mb-1">
                      {getCategoryLabel(item.category)}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal leading-tight text-[#FAF7F2]">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/70 font-sans mt-2">
                      <MapPin className="w-3 h-3 text-[#E8DED0]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Subtle static label beneath for high visibility on touch devices */}
                <div className="p-4 sm:p-5 bg-white flex items-center justify-between border-t border-[#F3ECE1]">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg text-[#121212] font-medium group-hover:text-[#7B6955] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans mt-0.5">
                      {getCategoryLabel(item.category)}
                    </p>
                  </div>
                  <span className="text-xs text-[#9E8870] font-sans font-medium group-hover:translate-x-1 transition-transform">
                    {language === "hi" ? "देखें →" : "View →"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State Fallback (just in case) */}
        {localizedItems.length === 0 && (
          <div className="text-center py-20 bg-white border border-[#E8DED0]">
            <p className="font-serif text-xl text-[#554837]">
              {language === "hi" ? "इस श्रेणी में कोई कार्य नहीं मिला।" : "No works found in this category."}
            </p>
            <button
              onClick={() => setSelectedCategory("All Works")}
              className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest bg-[#121212] text-white cursor-pointer"
            >
              {language === "hi" ? "फ़िल्टर रीसेट करें" : "Reset Filter"}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={localizedItems}
        currentIndex={activeImageIndex}
        onNavigate={(newIndex) => setActiveImageIndex(newIndex)}
      />
    </section>
  );
}
