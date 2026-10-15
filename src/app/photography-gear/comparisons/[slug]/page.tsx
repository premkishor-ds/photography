import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GearComparisonClient from "@/components/GearComparisonClient";
import { constructMetadata } from "@/lib/metadata";
import {
  generateFAQSchema,
  getAbsoluteUrl,
} from "@/lib/schema";
import { GEAR_COMPARISONS } from "@/data/gearData";
import { siteConfig } from "@/config/siteConfig";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  return GEAR_COMPARISONS.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const comp = GEAR_COMPARISONS.find((c) => c.slug === slug);

  if (!comp) {
    return constructMetadata({
      title: "Comparison Not Found",
      description: "The requested photography equipment comparison could not be found.",
      path: "/photography-gear",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: comp.title,
    description: comp.description,
    path: `/photography-gear/comparisons/${comp.slug}`,
    image: comp.heroImage,
    imageAlt: comp.heroAlt,
    type: "article",
  });
}

export default async function GearComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comp = GEAR_COMPARISONS.find((c) => c.slug === slug);

  if (!comp) {
    notFound();
  }

  const faqSchema = comp.faqs.length > 0 ? generateFAQSchema(comp.faqs) : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comp.title,
    description: comp.description,
    image: comp.heroImage,
    datePublished: "2026-02-15T08:00:00Z",
    dateModified: "2026-03-01T12:00:00Z",
    author: {
      "@type": "Person",
      name: siteConfig.photographer.name,
      jobTitle: siteConfig.photographer.role,
      url: getAbsoluteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.baseUrl,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl(siteConfig.logoUrl),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getAbsoluteUrl(`/photography-gear/comparisons/${comp.slug}`),
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <GearComparisonClient comp={comp} />
      </main>

      <Footer />
    </div>
  );
}
