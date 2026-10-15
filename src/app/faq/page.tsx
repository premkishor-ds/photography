import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqClient from "@/components/FaqClient";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generateFAQSchema } from "@/lib/schema";
import { fetchFaqItems } from "@/lib/supabase";

export const metadata = constructMetadata({
  title: "Frequently Asked Questions & Answers",
  description:
    "Answers to common client questions regarding booking workflows, session preparation, delivery turnaround, weather rescheduling, and personal/commercial image rights.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqItems = await fetchFaqItems();
  const webPageSchema = generateWebPageSchema(
    "/faq",
    "Frequently Asked Photography Questions",
    "Answers to common client questions regarding booking workflows, turnaround, and session preparation."
  );

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <FaqClient faqItems={faqItems} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
