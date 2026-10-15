import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ServicesPageClient from "@/components/ServicesPageClient";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { SERVICES_DATA } from "@/data/servicesData";
import { fetchFaqItems } from "@/lib/supabase";

export const metadata = constructMetadata({
  title: "Photography Services & Offerings",
  description:
    "Comprehensive photography services including editorial portraits, documentary weddings, corporate galas, high-speed sports, commercial campaigns, and wilderness expeditions.",
  path: "/services",
});

export default async function ServicesPage() {
  const allFaqs = await fetchFaqItems();
  const serviceFaqs = allFaqs.filter(
    (f) => f.category === "General" || f.category === "Booking & Pricing"
  ).slice(0, 5);

  const webPageSchema = generateWebPageSchema(
    "/services",
    "Professional Photography Services",
    "Complete photography services offering editorial portraits, weddings, events, sports, and commercial photography."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <ServicesPageClient
          initialServices={SERVICES_DATA}
          initialFaqs={serviceFaqs}
        />
      </main>

      <Footer />
    </div>
  );
}
