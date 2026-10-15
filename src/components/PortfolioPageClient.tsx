"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import PortfolioGallery from "@/components/PortfolioGallery";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedPortfolioCategories } from "@/data/portfolioData";

export default function PortfolioPageClient() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const categories = getLocalizedPortfolioCategories(language);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <Breadcrumbs items={[{ name: isHindi ? "पोर्टफोलियो" : "Portfolio", url: "/portfolio" }]} />

      {/* Portfolio Hero */}
      <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
          {isHindi ? "क्यूरेटेड संग्रह" : "Curated Collections"}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
          {isHindi ? "फोटोग्राफी पोर्टफोलियो गैलरी" : "Photography Portfolio Gallery"}
        </h1>
        <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? "नीचे विशेषज्ञता के आधार पर आयोजित हमारे व्यापक संग्रह देखें। समर्पित प्रोजेक्ट सीरीज, कैमरा विवरण और हाई-रेज़ोल्यूशन गैलरी देखने के लिए किसी भी श्रेणी पर क्लिक करें।"
            : "Explore our comprehensive collections below, organized by specialization. Click any category to view dedicated project series, camera specifications, and high-resolution galleries."}
        </p>
      </div>

      {/* Crawlable Category Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/portfolio/${cat.slug}`}
            className="group relative aspect-[3/4] overflow-hidden bg-[#121212] border border-[#E8DED0] block"
          >
            <Image
              src={cat.heroImage}
              alt={cat.heroAlt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover object-center filter brightness-[0.75] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
              <h2 className="font-serif text-sm sm:text-base font-normal leading-tight group-hover:text-[#E8DED0] transition-colors">
                {cat.name}
              </h2>
              <span className="text-[10px] uppercase tracking-wider text-white/70 font-sans mt-1">
                {isHindi ? "देखें →" : "Explore →"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Interactive Filterable Gallery Component */}
      <PortfolioGallery />

      {/* Booking CTA */}
      <BookingCtaBanner
        title={isHindi ? "क्या आप हमारे विजुअल दृष्टिकोण से प्रेरित हैं?" : "Inspired by Our Visual Direction?"}
        subtitle={
          isHindi
            ? "आइए चर्चा करें कि हम आपके प्रोजेक्ट या उत्सव के लिए कालातीत, प्रभावशाली तस्वीरें कैसे बना सकते हैं।"
            : "Let's discuss how we can create timeless, high-impact imagery for your project or celebration."
        }
      />
    </div>
  );
}
