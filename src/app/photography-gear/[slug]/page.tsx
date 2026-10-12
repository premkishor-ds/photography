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
import { GEAR_ITEMS, GearItem } from "@/data/gearData";
import { siteConfig } from "@/config/siteConfig";
import {
  Check,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Camera,
  Layers,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return GEAR_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = GEAR_ITEMS.find((g) => g.slug === slug);

  if (!item) {
    return constructMetadata({
      title: "Equipment Review Not Found",
      description: "The requested photography gear review could not be found.",
      path: "/photography-gear",
      noIndex: true,
    });
  }

  const metaDescription = `${item.tagline} Hands-on field review, technical specifications, advantages, and real-world performance observations.`.slice(0, 155);

  return constructMetadata({
    title: `${item.name} Hands-On Review`,
    description: metaDescription,
    path: `/photography-gear/${item.slug}`,
    image: item.imageUrl,
    imageAlt: item.imageAlt,
    type: "article",
  });
}

export default async function GearReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const item = GEAR_ITEMS.find((g) => g.slug === slug);

  if (!item) {
    notFound();
  }

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Photography Gear", url: "/photography-gear" },
    { name: item.name, url: `/photography-gear/${item.slug}` },
  ]);

  const faqSchema = item.faqs.length > 0 ? generateFAQSchema(item.faqs) : null;

  // Editorial Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${item.name} Hands-On Field Review`,
    description: item.overview,
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
              { name: item.name, url: `/photography-gear/${item.slug}` },
            ]}
          />

          {/* Article Header */}
          <header className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 bg-[#121212] text-[#FAF7F2] font-medium font-sans">
                {item.categoryLabel}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                {item.manufacturer}
              </span>
              {item.isPersonallyVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 bg-[#F4EFE6] text-[#2E7D32] border border-[#C8E6C9] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Personally Owned & Tested
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212] leading-tight">
              {item.name}: Hands-On Field Review
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#554837] font-light leading-relaxed">
              {item.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#7B6955] pt-4 border-t border-[#E8DED0]">
              <span>By {siteConfig.photographer.name}</span>
              <span>•</span>
              <span>Editorial Equipment Review</span>
              <span>•</span>
              <span>Updated Spring 2026</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full bg-[#F3ECE1] overflow-hidden border border-[#E8DED0] mb-12 shadow-sm">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          {/* Affiliate Notice */}
          <div className="mb-12">
            <AffiliateDisclosure />
          </div>

          {/* Review Grid: Main Column & Sidebar Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Review Body (8 cols) */}
            <article className="lg:col-span-8 space-y-12">
              {/* 1. Overview */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                  Product Overview
                </h2>
                <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed">
                  {item.overview}
                </p>
              </section>

              {/* 2. Personal Usage in the Field */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#BFA076]" /> How I Use It in My Workflow
                </h2>
                <div className="p-6 bg-white border border-[#E8DED0] space-y-3">
                  <p className="text-sm text-[#3E3427] font-light leading-relaxed">
                    {item.personalUsage}
                  </p>
                  <p className="text-xs text-[#7B6955] italic font-light">
                    Note: Equipment observations are documented from our real studio and on-location client commissions in Jaipur, Rajasthan, and pan-India destination assignments.
                  </p>
                </div>
              </section>

              {/* 3. Image/Audio Quality Observations */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#BFA076]" /> Quality & Field Observations
                </h2>
                <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed">
                  {item.imageOrAudioQuality}
                </p>
                {item.autofocusAndPerformance && (
                  <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed pt-2">
                    <strong>Autofocus & Tracking:</strong> {item.autofocusAndPerformance}
                  </p>
                )}
                <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed pt-2">
                  <strong>Portability & Ergonomics:</strong> {item.portabilityAndHandling}
                </p>
              </section>

              {/* 4. Pros & Cons */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                  Advantages vs. Trade-Offs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Pros */}
                  <div className="p-6 bg-white border border-[#E8DED0] space-y-3">
                    <h3 className="text-xs uppercase tracking-wider text-[#2E7D32] font-sans font-medium flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> What We Appreciate
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#554837] font-light">
                      {item.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="p-6 bg-white border border-[#E8DED0] space-y-3">
                    <h3 className="text-xs uppercase tracking-wider text-[#C62828] font-sans font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Practical Limitations
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#554837] font-light">
                      {item.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] mt-1.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 5. Best Situations & Who Should Buy */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                  Who Should Consider This Equipment?
                </h2>
                <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed">
                  {item.whoShouldBuy}
                </p>

                <div className="pt-2">
                  <h3 className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-medium mb-3">
                    Recommended Photographic Situations:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.situationsWhereUseful.map((sit, i) => (
                      <div
                        key={i}
                        className="p-3 bg-white border border-[#E8DED0] text-xs text-[#554837] font-light flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BFA076] mt-1.5 shrink-0" />
                        <span>{sit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 6. Alternatives & Comparisons */}
              <section className="space-y-4 pt-4 border-t border-[#E8DED0]">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                  Viable Alternatives & Comparisons
                </h2>
                <p className="text-xs sm:text-sm text-[#554837] font-light">
                  If this item does not align with your specific budget or shooting style, here are tested alternatives:
                </p>
                <div className="space-y-3">
                  {item.alternatives.map((alt, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white border border-[#E8DED0] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <h3 className="font-serif text-lg text-[#121212]">{alt.name}</h3>
                        <p className="text-xs text-[#554837] font-light mt-0.5">{alt.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. FAQs */}
              {item.faqs.length > 0 && (
                <section className="space-y-4 pt-4 border-t border-[#E8DED0]">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#BFA076]" /> Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {item.faqs.map((faq, i) => (
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
            </article>

            {/* Sidebar Specifications & Quick Links (4 cols) */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Technical Specifications Card */}
              <div className="bg-white border border-[#E8DED0] p-6 space-y-4 sticky top-28">
                <div className="flex items-center gap-2 pb-3 border-b border-[#F3ECE1]">
                  <Layers className="w-4 h-4 text-[#BFA076]" />
                  <h2 className="font-serif text-xl text-[#121212]">Technical Specifications</h2>
                </div>

                <dl className="space-y-3 text-xs">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="pb-2 border-b border-[#FAF7F2] last:border-0">
                      <dt className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                        {spec.label}
                      </dt>
                      <dd className="text-xs text-[#121212] font-medium mt-0.5">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Retailer Link Options */}
                {item.retailerLinks && item.retailerLinks.length > 0 && (
                  <div className="pt-4 border-t border-[#F3ECE1] space-y-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      Check Retailer Availability
                    </p>
                    {item.retailerLinks.map((ret, i) => (
                      <a
                        key={i}
                        href={ret.url}
                        target="_blank"
                        rel={ret.isAffiliate ? "sponsored nofollow noopener" : "nofollow noopener"}
                        className="w-full inline-flex items-center justify-between px-4 py-3 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] transition-colors text-xs uppercase tracking-wider font-medium"
                      >
                        <span>{ret.retailer}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                    <p className="text-[10px] text-[#7B6955] font-sans leading-tight">
                      *We do not display unverified price estimates. Please check retailer directly for current promotions.
                    </p>
                  </div>
                )}

                {/* Portfolio Cross Link */}
                <div className="pt-4 border-t border-[#F3ECE1] space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                    Portfolio Demonstration
                  </p>
                  <Link
                    href={item.relatedPortfolioSlug}
                    className="inline-flex items-center gap-1.5 text-xs text-[#121212] hover:text-[#7B6955] font-medium transition-colors"
                  >
                    <span>View {item.relatedPortfolioCategory} Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Tutorial Cross Link */}
                {item.relatedTutorialSlug && (
                  <div className="pt-4 border-t border-[#F3ECE1] space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      Related Technique Guide
                    </p>
                    <Link
                      href={item.relatedTutorialSlug}
                      className="inline-flex items-center gap-1.5 text-xs text-[#121212] hover:text-[#7B6955] font-medium transition-colors"
                    >
                      <span>Read Photography Tutorial</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related Equipment Section */}
          <div className="mt-20 pt-12 border-t border-[#E8DED0]">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mb-6">
              More Equipment in My Bag
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGear.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/photography-gear/${rel.slug}`}
                  className="bg-white border border-[#E8DED0] p-5 hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      {rel.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg text-[#121212] group-hover:text-[#7B6955] transition-colors mt-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-[#554837] font-light mt-1.5 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#121212] font-medium pt-4 mt-2 border-t border-[#F3ECE1]">
                    Read Review <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
