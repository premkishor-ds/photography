import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AboutPageContent from "@/components/AboutPageContent";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema, generatePersonSchema } from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";

export const metadata = constructMetadata({
  title: `About ${siteConfig.photographer.name} | Lead Photographer`,
  description:
    `Meet lead photographer ${siteConfig.photographer.name}: 12+ years of editorial experience, artistic vision, and dedication to capturing authentic moments.`,
  path: "/about",
});

export default function AboutPage() {
  const webPageSchema = generateWebPageSchema(
    "/about",
    `About ${siteConfig.photographer.name} & ${siteConfig.siteName}`,
    `Biographical overview, artistic philosophy, and technical qualifications of lead photographer ${siteConfig.photographer.name}.`
  );

  const personSchema = generatePersonSchema();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={personSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "About", url: "/about" }]} />
          <AboutPageContent />
        </div>
      </main>

      <Footer />
    </div>
  );
}
