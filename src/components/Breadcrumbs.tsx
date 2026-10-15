"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "./JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useLanguage } from "@/context/LanguageContext";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const BREADCRUMB_TRANSLATIONS: Record<string, string> = {
  "Home": "होम",
  "Portfolio": "पोर्टफोलियो",
  "Services": "सेवाएं",
  "Gear": "उपकरण",
  "Photography Gear": "फोटोग्राफी गियर",
  "About": "हमारे बारे में",
  "Journal": "जर्नल",
  "Blog": "ब्लॉग",
  "FAQ": "सामान्य प्रश्न",
  "Contact": "संपर्क करें",
  "Locations": "स्थान",
  "Jaipur": "जयपुर",
  "New York": "न्यूयॉर्क",
  "Portraits": "पोर्ट्रेट",
  "Weddings": "विवाह",
  "Events": "कार्यक्रम",
  "Sports": "खेल",
  "Commercial": "कमर्शियल",
  "Nature & Wildlife": "प्रकृति एवं वन्यजीव",
  "Travel Photography": "यात्रा एवं धरोहर",
  "Travel & Wildlife": "यात्रा एवं वन्यजीव",
  "Privacy Policy": "गोपनीयता नीति",
  "Terms & Conditions": "नियम एवं शर्तें",
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  // Guard against callers that already include Home to prevent duplicate breadcrumbs & keys
  const sanitizedItems = items.filter(
    (item, idx) =>
      !(
        idx === 0 &&
        (item.url === "/" ||
          item.name.toLowerCase() === "home" ||
          item.name === "होम")
      )
  );
  const homeName = isHindi ? "होम" : "Home";
  const allItems: BreadcrumbItem[] = [
    { name: homeName, url: "/" },
    ...sanitizedItems.map((item) => ({
      ...item,
      name: isHindi && BREADCRUMB_TRANSLATIONS[item.name] ? BREADCRUMB_TRANSLATIONS[item.name] : item.name,
    })),
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(allItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label={isHindi ? "नेविगेशन पथ" : "Breadcrumb"} className="py-4">
        <ol className="flex items-center flex-wrap gap-2 text-xs font-sans text-[#7B6955]">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={`${item.url}-${index}`} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 text-[#D7C7B2] shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-[#121212] tracking-wide"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-[#121212] transition-colors tracking-wide flex items-center gap-1"
                  >
                    {index === 0 && <Home className="w-3 h-3" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
