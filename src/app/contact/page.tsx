import React, { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactAndBooking from "@/components/ContactAndBooking";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import {
  generateWebPageSchema,
  generatePhotographyBusinessSchema,
} from "@/lib/schema";

export const metadata = constructMetadata({
  title: "Contact & Session Booking",
  description:
    "Reserve your photography session date or request a personalized proposal for portraits, weddings, events, sports, or commercial campaigns.",
  path: "/contact",
});

export default function ContactPage() {
  const webPageSchema = generateWebPageSchema(
    "/contact",
    "Contact & Booking Inquiries",
    "Direct contact channel, WhatsApp inquiry, and booking reservation form for Your Photography."
  );

  const businessSchema = generatePhotographyBusinessSchema();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={businessSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />
        </div>

        <Suspense fallback={<div className="py-20 text-center">Loading booking form...</div>}>
          <ContactAndBooking headingLevel="h1" />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
