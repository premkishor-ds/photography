import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  getAbsoluteUrl,
} from "@/lib/schema";
import { GEAR_COMPARISONS } from "@/data/gearData";
import { siteConfig } from "@/config/siteConfig";
import {
  Scale,
  Check,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Compass,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Photography Gear", url: "/photography-gear" },
    { name: comp.title, url: `/photography-gear/comparisons/${comp.slug}` },
  ]);

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
      <JsonLd data={breadcrumbsSchema} />
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Photography Gear", url: "/photography-gear" },
              { name: "Comparison", url: `/photography-gear/comparisons/${comp.slug}` },
            ]}
          />

          {/* Article Header */}
          <header className="mb-10 sm:mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans font-medium flex items-center gap-1.5 mb-2">
              <Scale className="w-3.5 h-3.5 text-[#BFA076]" /> Equipment Comparison Guide
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212] leading-tight">
              {comp.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#554837] font-light leading-relaxed max-w-3xl">
              {comp.description}
            </p>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full bg-[#F3ECE1] overflow-hidden border border-[#E8DED0] mb-12 shadow-sm">
            <Image
              src={comp.heroImage}
              alt={comp.heroAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          {/* Affiliate Disclosure */}
          <div className="mb-12">
            <AffiliateDisclosure />
          </div>

          {/* Side-by-Side Contenders Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {/* Contender A */}
            <div className="p-7 bg-white border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                Option A ({comp.itemA.category})
              </span>
              <h2 className="font-serif text-2xl text-[#121212] font-normal">
                {comp.itemA.slug ? (
                  <Link href={`/photography-gear/${comp.itemA.slug}`} className="hover:text-[#7B6955] transition-colors">
                    {comp.itemA.name}
                  </Link>
                ) : (
                  comp.itemA.name
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                {comp.itemA.highlight}
              </p>
            </div>

            {/* Contender B */}
            <div className="p-7 bg-white border border-[#E8DED0] space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                Option B ({comp.itemB.category})
              </span>
              <h2 className="font-serif text-2xl text-[#121212] font-normal">
                {comp.itemB.slug ? (
                  <Link href={`/photography-gear/${comp.itemB.slug}`} className="hover:text-[#7B6955] transition-colors">
                    {comp.itemB.name}
                  </Link>
                ) : (
                  comp.itemB.name
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                {comp.itemB.highlight}
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mb-6">
              Side-by-Side Technical Specifications
            </h2>
            <div className="overflow-x-auto border border-[#E8DED0] bg-white">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8DED0] text-[#121212]">
                    <th className="p-4 font-serif text-sm sm:text-base font-normal w-1/3">
                      Specification / Feature
                    </th>
                    <th className="p-4 font-serif text-sm sm:text-base font-normal w-1/3 border-l border-[#E8DED0]">
                      {comp.itemA.name}
                    </th>
                    <th className="p-4 font-serif text-sm sm:text-base font-normal w-1/3 border-l border-[#E8DED0]">
                      {comp.itemB.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3ECE1]">
                  {comp.specComparison.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="p-4 font-medium text-[#121212]">
                        {row.feature}
                      </td>
                      <td className="p-4 text-[#554837] font-light border-l border-[#F3ECE1]">
                        {row.itemAValue}
                      </td>
                      <td className="p-4 text-[#554837] font-light border-l border-[#F3ECE1]">
                        {row.itemBValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Strengths & Limitations Matrix */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mb-6">
              Strengths &amp; Trade-Offs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contender A Pros/Cons */}
              <div className="bg-white border border-[#E8DED0] p-6 space-y-5">
                <h3 className="font-serif text-xl text-[#121212]">
                  {comp.itemA.name}
                </h3>
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-wider text-[#2E7D32] font-sans font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Advantages
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#554837] font-light">
                    {comp.prosAndCons.itemAPros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3 pt-3 border-t border-[#F3ECE1]">
                  <p className="text-[11px] uppercase tracking-wider text-[#C62828] font-sans font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Disadvantages
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#554837] font-light">
                    {comp.prosAndCons.itemACons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] mt-1.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contender B Pros/Cons */}
              <div className="bg-white border border-[#E8DED0] p-6 space-y-5">
                <h3 className="font-serif text-xl text-[#121212]">
                  {comp.itemB.name}
                </h3>
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-wider text-[#2E7D32] font-sans font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Advantages
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#554837] font-light">
                    {comp.prosAndCons.itemBPros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3 pt-3 border-t border-[#F3ECE1]">
                  <p className="text-[11px] uppercase tracking-wider text-[#C62828] font-sans font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Disadvantages
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#554837] font-light">
                    {comp.prosAndCons.itemBCons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] mt-1.5 shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Intended Use Cases */}
          <section className="mb-16 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212]">
              Intended Photographic Scenarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E8DED0] space-y-2">
                <h3 className="font-serif text-lg text-[#121212]">
                  When to Choose {comp.itemA.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                  {comp.intendedUseCases.itemAUse}
                </p>
              </div>
              <div className="p-6 bg-white border border-[#E8DED0] space-y-2">
                <h3 className="font-serif text-lg text-[#121212]">
                  When to Choose {comp.itemB.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                  {comp.intendedUseCases.itemBUse}
                </p>
              </div>
            </div>
          </section>

          {/* Trade-Off Analysis */}
          <section className="mb-16 p-8 bg-white border border-[#E8DED0] space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212]">
              Trade-Off Analysis
            </h2>
            <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed">
              {comp.tradeOffAnalysis}
            </p>
          </section>

          {/* Practical Recommendation */}
          <section className="mb-16 p-8 bg-[#F4EFE6] border border-[#E8DED0] space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#BFA076]" /> Practical Recommendation
            </h2>
            <p className="text-sm sm:text-base text-[#3E3427] font-light leading-relaxed">
              {comp.practicalRecommendation}
            </p>
          </section>

          {/* FAQs */}
          {comp.faqs.length > 0 && (
            <section className="mb-16 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#BFA076]" /> Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {comp.faqs.map((faq, i) => (
                  <div key={i} className="p-5 bg-white border border-[#E8DED0] space-y-2">
                    <h3 className="font-serif text-lg text-[#121212]">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back to Gear Hub */}
          <div className="pt-8 border-t border-[#E8DED0]">
            <Link
              href="/photography-gear"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to My Photography Gear
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
