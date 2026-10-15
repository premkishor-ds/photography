import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import PortfolioCategoryClient from "@/components/PortfolioCategoryClient";
import { constructMetadata } from "@/lib/metadata";
import {
  generateWebPageSchema,
  generateImageGallerySchema,
} from "@/lib/schema";
import {
  PORTFOLIO_CATEGORIES_META,
  ALL_PORTFOLIO_ITEMS,
} from "@/data/portfolioData";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_CATEGORIES_META.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const catMeta = PORTFOLIO_CATEGORIES_META.find((c) => c.slug === category);

  if (!catMeta) {
    return constructMetadata({
      title: "Portfolio Category Not Found",
      description: "The requested photography collection could not be found.",
      path: "/portfolio",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${catMeta.name} Portfolio`,
    description: catMeta.description,
    path: `/portfolio/${catMeta.slug}`,
    image: catMeta.heroImage,
    imageAlt: catMeta.heroAlt,
  });
}

export default async function PortfolioCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const catMeta = PORTFOLIO_CATEGORIES_META.find((c) => c.slug === category);

  if (!catMeta) {
    notFound();
  }

  const categoryItems = ALL_PORTFOLIO_ITEMS.filter(
    (item) => item.categorySlug === category
  );

  const webPageSchema = generateWebPageSchema(
    `/portfolio/${catMeta.slug}`,
    catMeta.title,
    catMeta.description
  );

  const gallerySchema = generateImageGallerySchema(categoryItems);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <JsonLd data={gallerySchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <PortfolioCategoryClient
          initialCategory={catMeta}
          initialItems={categoryItems}
          allCategories={PORTFOLIO_CATEGORIES_META}
        />
      </main>

      <Footer />
    </div>
  );
}
