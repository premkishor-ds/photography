import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqClient from "@/components/FaqClient";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generateFAQSchema } from "@/lib/schema";
import { FAQ_ITEMS } from "@/data/faqData";

export const metadata = constructMetadata({
  title: "Frequently Asked Questions & Answers",
  description:
    "Answers to common client questions regarding booking workflows, session preparation, delivery turnaround, weather rescheduling, and personal/commercial image rights.",
  path: "/faq",
});

export default function FaqPage() {
  const webPageSchema = generateWebPageSchema(
    "/faq",
    "Frequently Asked Photography Questions",
    "Answers to common client questions regarding booking workflows, turnaround, and session preparation."
  );

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "FAQ", url: "/faq" }]} />

          {/* Page Hero */}
          <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              Help Center & Answers
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
              Find transparent answers regarding our session workflows, turnaround timelines, licensing, and investment expectations.
            </p>
          </div>

          {/* Interactive Client Search & Filter */}
          <FaqClient faqItems={FAQ_ITEMS} />

          {/* Booking CTA */}
          <BookingCtaBanner
            title="Have an Unanswered Question?"
            subtitle="We are delighted to discuss bespoke project details or answer any specialized inquiries."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
