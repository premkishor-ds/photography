"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/FaqAccordion";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import { FAQItem } from "@/data/faqData";
import { useLanguage } from "@/context/LanguageContext";

interface FaqClientProps {
  faqItems: FAQItem[];
}

export default function FaqClient({ faqItems }: FaqClientProps) {
  const { t, language } = useLanguage();
  const isHindi = language === "hi";

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: t("faq.catAll", "All") },
    { id: "General", label: t("faq.catGeneral", "General") },
    { id: "Booking & Pricing", label: t("faq.catPricing", "Booking & Pricing") },
    { id: "Styles & Sessions", label: t("faq.catStyles", "Styles & Sessions") },
    { id: "Delivery & Rights", label: t("faq.catDelivery", "Delivery & Rights") },
  ];

  const filteredFaqs = useMemo(() => {
    return faqItems
      .filter((item) => {
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const qEn = item.question.toLowerCase();
        const aEn = item.answer.toLowerCase();
        const qHi = (item.questionHindi || "").toLowerCase();
        const aHi = (item.answerHindi || "").toLowerCase();
        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
          query === "" ||
          qEn.includes(query) ||
          aEn.includes(query) ||
          qHi.includes(query) ||
          aHi.includes(query);

        return matchesCategory && matchesSearch;
      })
      .map((item) => ({
        question: isHindi && item.questionHindi ? item.questionHindi : item.question,
        answer: isHindi && item.answerHindi ? item.answerHindi : item.answer,
      }));
  }, [faqItems, selectedCategory, searchQuery, isHindi]);

  return (
    <div>
      <Breadcrumbs
        items={[
          {
            name: isHindi ? "सामान्य प्रश्न" : "FAQ",
            url: "/faq",
          },
        ]}
      />

      {/* Page Hero */}
      <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
          {t("faq.badge", "Help Center & Answers")}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
          {t("faq.title", "Frequently Asked Questions")}
        </h1>
        <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
          {t(
            "faq.desc",
            "Clear answers regarding session bookings, pricing, image rights, turnaround timelines, and travel availability."
          )}
        </p>
      </div>

      <div className="space-y-10">
        {/* Search & Category Filter */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(
                "faq.searchPlaceholder",
                "Search questions (e.g. turnaround, pricing, weather, attire)..."
              )}
              aria-label={isHindi ? "अक्सर पूछे जाने वाले प्रश्न खोजें" : "Search frequently asked questions"}
              className="w-full px-5 py-3.5 bg-white border border-[#D7C7B2] text-sm text-[#121212] placeholder-[#9E8870] focus:outline-none focus:border-[#121212] transition-colors"
            />
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label={isHindi ? "प्रश्न श्रेणियां फ़िल्टर करें" : "Filter FAQ categories"}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#121212] text-white"
                    : "bg-white border border-[#E8DED0] text-[#554837] hover:border-[#121212]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <FaqAccordion items={filteredFaqs} idPrefix="main-faq" />
          ) : (
            <div className="text-center py-12 bg-white border border-[#E8DED0] p-8 space-y-3">
              <p className="font-serif text-xl text-[#121212]">
                {t("faq.noMatch", "No matching questions found for")} &ldquo;{searchQuery}&rdquo;.
              </p>
              <p className="text-xs text-[#554837]">
                {t(
                  "faq.contactNote",
                  "Have a specific question? Reach out to us directly and we will respond promptly."
                )}
              </p>
              <Link
                href="/contact"
                className="inline-block mt-3 px-6 py-2.5 bg-[#121212] text-white text-xs uppercase tracking-wider"
              >
                {t("faq.askBtn", "Ask a Question")}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Booking CTA */}
      <div className="mt-20">
        <BookingCtaBanner
          title={isHindi ? "क्या आपका कोई अनुत्तरित प्रश्न है?" : "Have an Unanswered Question?"}
          subtitle={
            isHindi
              ? "हम कस्टम प्रोजेक्ट विवरण पर चर्चा करने या किसी भी विशिष्ट पूछताछ का उत्तर देने के लिए सदैव तत्पर हैं।"
              : "We are delighted to discuss bespoke project details or answer any specialized inquiries."
          }
        />
      </div>
    </div>
  );
}
