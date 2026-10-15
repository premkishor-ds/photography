import React, { cache } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GearDetailClient from "@/components/GearDetailClient";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/siteConfig";
import { GEAR_ITEMS } from "@/data/gearData";
import {
  generateFAQSchema,
  getAbsoluteUrl,
} from "@/lib/schema";
import { fetchGearItems, fetchGearItemBySlug } from "@/lib/supabase";

export const revalidate = 3600;

const getCachedGearItem = cache(async (slug: string) => {
  return await fetchGearItemBySlug(slug);
});

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const items = await fetchGearItems();
  const paths: { slug: string }[] = [];

  items.forEach((item) => {
    paths.push({ slug: item.slug });
    if (item.aliases && item.aliases.length > 0) {
      item.aliases.forEach((alias) => {
        paths.push({ slug: alias });
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = await getCachedGearItem(slug);

  if (!item) {
    return constructMetadata({
      title: "Equipment Not Found",
      description: "The requested equipment record could not be found in our studio inventory.",
      path: `/photography-gear/${slug}`,
      noIndex: true,
    });
  }

  const title = `${item.name} | Equipment Record`;
  const rawDesc =
    item.description ||
    item.overview ||
    `Technical specifications, operational applications, and verified compatibility for the ${item.name}.`;
  const description =
    rawDesc.length > 160
      ? rawDesc.slice(0, 157).replace(/\s+\S*$/, "") + "..."
      : rawDesc;

  return constructMetadata({
    title,
    description,
    path: `/photography-gear/${item.slug}`,
    image: item.imageUrl,
    imageAlt: item.imageAlt || item.name,
    type: "article",
  });
}

export default async function PhotographyGearItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getCachedGearItem(slug);

  if (!item) {
    notFound();
  }

  const faqSchema =
    item.faqs && item.faqs.length > 0
      ? generateFAQSchema(item.faqs)
      : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${item.name}: Specifications & Field Review`,
    description: item.description || item.overview || item.tagline,
    image: item.imageUrl,
    datePublished: "2026-02-01T08:00:00Z",
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
      "@id": getAbsoluteUrl(`/photography-gear/${item.slug}`),
    },
  };

  const relatedGear = GEAR_ITEMS.filter((g) => g.id !== item.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <GearDetailClient item={item} relatedGear={relatedGear} />
      </main>

      <Footer />
    </div>
  );
}
