"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQItem } from "@/data/faqData";

interface FaqClientProps {
  faqItems: FAQItem[];
}

export default function FaqClient({ faqItems }: FaqClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "General",
    "Booking & Pricing",
    "Styles & Sessions",
    "Delivery & Rights",
  ];

  const filteredFaqs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqItems, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. turnaround, pricing, weather, attire)..."
            aria-label="Search frequently asked questions"
            className="w-full px-5 py-3.5 bg-white border border-[#D7C7B2] text-sm text-[#121212] placeholder-[#9E8870] focus:outline-none focus:border-[#121212] transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filter FAQ categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#121212] text-white"
                  : "bg-white border border-[#E8DED0] text-[#554837] hover:border-[#121212]"
              }`}
            >
              {cat}
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
              No matching questions found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="text-xs text-[#554837]">
              Have a specific question? Reach out to us directly and we will respond promptly.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-3 px-6 py-2.5 bg-[#121212] text-white text-xs uppercase tracking-wider"
            >
              Ask a Question
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
