"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface FaqItemProp {
  question: string;
  answer: string;
  questionHindi?: string;
  answerHindi?: string;
}

interface FaqAccordionProps {
  items: FaqItemProp[];
  idPrefix?: string;
}

export default function FaqAccordion({
  items,
  idPrefix = "faq",
}: FaqAccordionProps) {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const headerId = `${idPrefix}-header-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;
        const question = isHindi && item.questionHindi ? item.questionHindi : item.question;
        const answer = isHindi && item.answerHindi ? item.answerHindi : item.answer;

        return (
          <div
            key={index}
            className="border border-[#E8DED0] bg-[#FAF7F2] transition-colors"
          >
            <h3>
              <button
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(index)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif text-lg sm:text-xl text-[#121212] hover:text-[#7B6955] transition-colors cursor-pointer"
              >
                <span>{question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#7B6955] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#554837] leading-relaxed font-sans border-t border-[#F3ECE1] pt-4">
                {answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
