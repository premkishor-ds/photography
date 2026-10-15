import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import NewYorkLocationClient from "@/components/NewYorkLocationClient";
import { constructMetadata } from "@/lib/metadata";
import {
  generateWebPageSchema,
  generatePhotographyBusinessSchema,
} from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";

export const metadata = constructMetadata({
  title: "New York Destination Photography & Commissions",
  description:
    `On-location photography commissions across Manhattan and Brooklyn by Jaipur-based lead photographer ${siteConfig.photographer.name}. Destination weddings, portraits, and galas.`,
  path: "/locations/new-york",
});

export default function NewYorkLocationPage() {
  const webPageSchema = generateWebPageSchema(
    "/locations/new-york",
    "New York Destination Photography & Commissions",
    "On-location destination sessions across New York City, Brooklyn, and Manhattan coordinated by our flagship Jaipur studio."
  );

  const businessSchema = generatePhotographyBusinessSchema();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={businessSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <NewYorkLocationClient />
      </main>

      <Footer />
    </div>
  );
}
