import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Camera, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import JsonLd from "@/components/JsonLd";
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs
            items={[
              { name: "Portfolio", url: "/portfolio" },
              { name: catMeta.name, url: `/portfolio/${catMeta.slug}` },
            ]}
          />

          {/* Category Banner */}
          <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              Curated Series
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
              {catMeta.title}
            </h1>
            <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
              {catMeta.description}
            </p>
          </div>

          {/* Category Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryItems.map((item, index) => (
              <article
                key={item.id}
                className="bg-white border border-[#E8DED0] shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/5] w-full bg-[#121212] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white" />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#7B6955] font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#BFA076]" />
                      {item.location}
                    </span>
                    <span>{item.year}</span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl text-[#121212] font-medium">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#554837] leading-relaxed font-light">
                    {item.description}
                  </p>

                  {item.technicalDetails && (
                    <div className="pt-3 border-t border-[#F3ECE1] text-[11px] font-mono text-[#7B6955] flex items-center gap-2">
                      <Camera className="w-3 h-3" />
                      <span>{item.technicalDetails}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Other Categories Nav */}
          <div className="my-16 p-8 bg-white border border-[#E8DED0] space-y-4">
            <h3 className="font-serif text-xl text-[#121212]">
              Explore Other Photography Specializations
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {PORTFOLIO_CATEGORIES_META.filter((c) => c.slug !== category).map((c) => (
                <Link
                  key={c.slug}
                  href={`/portfolio/${c.slug}`}
                  className="px-4 py-2 text-xs uppercase tracking-wider bg-[#FAF7F2] border border-[#E8DED0] hover:border-[#121212] transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Booking CTA */}
          <BookingCtaBanner
            title={`Commission ${catMeta.name}`}
            subtitle="Let's create striking, museum-grade visual stories for your upcoming campaign or celebration."
            serviceName={catMeta.name}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
