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
import {
  GEAR_ITEMS,
  GearItem,
  getGearItemBySlug,
} from "@/data/gearData";
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
  Info,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  GEAR_ITEMS.forEach((item) => {
    params.push({ slug: item.slug });
    if (item.aliases && item.aliases.length > 0) {
      item.aliases.forEach((alias) => params.push({ slug: alias }));
    }
  });
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getGearItemBySlug(slug);

  if (!item) {
    return constructMetadata({
      title: "Equipment Record Not Found",
      description: "The requested photography equipment record could not be found.",
      path: "/photography-gear",
      noIndex: true,
    });
  }

  const metaDescription = (
    item.description ||
    item.overview ||
    item.tagline ||
    `Verified technical specifications, compatibility, and intended field use for ${item.name}.`
  ).slice(0, 155);

  return constructMetadata({
    title: `${item.name} | Verified Specifications & Review`,
    description: metaDescription,
    path: `/photography-gear/${item.slug}`,
    image: item.imageUrl,
    imageAlt: item.imageAlt || item.name,
    type: "article",
  });
}

export default async function GearReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getGearItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Photography Gear", url: "/photography-gear" },
    { name: item.name, url: `/photography-gear/${item.slug}` },
  ]);

  const faqs = item.faqs || [];
  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

  // Editorial Review Schema
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

  const specsList = (item.specifications && item.specifications.length > 0)
    ? item.specifications
    : (item.specs ? item.specs.map(s => ({ label: s.label, value: s.value })) : []);

  const primaryUses = (item.primaryUses && item.primaryUses.length > 0)
    ? item.primaryUses
    : (item.bestFor || []);

  const portfolioLinks = (item.relatedPortfolioUrls && item.relatedPortfolioUrls.length > 0)
    ? item.relatedPortfolioUrls
    : (item.relatedPortfolioSlug
      ? [{ label: item.relatedPortfolioCategory || "Portfolio Gallery", url: item.relatedPortfolioSlug }]
      : []);

  const pros = item.pros || [];
  const cons = item.cons || [];
  const alternatives = item.alternatives || [];
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

          {/* Equipment Article Header */}
          <header className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 bg-[#121212] text-[#FAF7F2] font-medium font-sans">
                {item.categoryLabel}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                {item.manufacturer}
              </span>
              {item.modelNumber && (
                <span className="text-[11px] font-mono text-[#554837] px-2 py-0.5 bg-[#F3ECE1] border border-[#E8DED0]">
                  Model: {item.modelNumber}
                </span>
              )}
              {item.ownershipStatus && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 bg-[#FAF7F2] text-[#2E7D32] border border-[#C8E6C9] font-medium font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> {item.ownershipStatus}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212] leading-tight">
              {item.name}
            </h1>

            {item.tagline && (
              <p className="mt-4 text-base sm:text-lg text-[#554837] font-light leading-relaxed">
                {item.tagline}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#7B6955] pt-4 border-t border-[#E8DED0]">
              <span>Verified Equipment Record</span>
              <span>•</span>
              <span>Centralized Studio Inventory</span>
              <span>•</span>
              <span>Updated Spring 2026</span>
            </div>
          </header>

          {/* Main Product Image */}
          {item.imageUrl && (
            <div className="relative aspect-[16/9] w-full bg-[#121212] overflow-hidden border border-[#E8DED0] mb-12 shadow-sm">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Disclosure */}
          <div className="mb-12">
            <AffiliateDisclosure />
          </div>

          {/* Grid Layout: Main Review (8 cols) & Sidebar Specs (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column */}
            <article className="lg:col-span-8 space-y-12">
              {/* 1. Overview */}
              <section className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                  Product Overview & Intended Use
                </h2>
                <p className="text-sm sm:text-base text-[#554837] font-light leading-relaxed">
                  {item.description || item.overview}
                </p>
              </section>

              {/* 2. Compatibility Information */}
              {item.compatibility && (
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#BFA076]" /> Compatibility & System Integration
                  </h2>
                  <div className="p-6 bg-white border border-[#E8DED0] space-y-2">
                    <p className="text-sm text-[#3E3427] font-light leading-relaxed">
                      {item.compatibility}
                    </p>
                    <p className="text-xs text-[#7B6955] italic font-light">
                      Compatibility information is documented based on verified lens mounts, electronic interfaces, and accessory connections.
                    </p>
                  </div>
                </section>
              )}

              {/* 3. Primary Use Cases */}
              {primaryUses.length > 0 && (
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                    Where This Equipment Excels
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {primaryUses.map((use, i) => (
                      <div
                        key={i}
                        className="p-4 bg-white border border-[#E8DED0] flex items-center gap-3"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#BFA076] shrink-0" />
                        <span className="text-xs sm:text-sm text-[#2C2C2C] font-light">
                          {use}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. Personal Workflow Insight (if verified) */}
              {item.personalUsage && (
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#BFA076]" /> How I Use It in My Workflow
                  </h2>
                  <div className="p-6 bg-[#FAF7F2] border-l-2 border-[#121212] space-y-3">
                    <p className="text-sm text-[#3E3427] font-light leading-relaxed">
                      {item.personalUsage}
                    </p>
                    <p className="text-xs text-[#7B6955] italic font-light">
                      Distinct from manufacturer specifications: Personal observations reflect hands-on studio and assignment experience.
                    </p>
                  </div>
                </section>
              )}

              {/* 5. Advantages & Limitations (if available) */}
              {(pros.length > 0 || cons.length > 0) && (
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                    Advantages & Operational Considerations
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {pros.length > 0 && (
                      <div className="p-6 bg-white border border-[#E8DED0] space-y-3">
                        <h3 className="text-xs uppercase tracking-wider text-[#2E7D32] font-sans font-medium flex items-center gap-1.5">
                          <Check className="w-4 h-4" /> Key Advantages
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-[#554837] font-light">
                          {pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {cons.length > 0 && (
                      <div className="p-6 bg-white border border-[#E8DED0] space-y-3">
                        <h3 className="text-xs uppercase tracking-wider text-[#C62828] font-sans font-medium flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> Considerations
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-[#554837] font-light">
                          {cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C62828] mt-1.5 shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 6. Alternatives & Equipment Comparisons (if available) */}
              {alternatives.length > 0 && (
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal">
                    Equipment Alternatives
                  </h2>
                  <div className="space-y-3">
                    {alternatives.map((alt, i) => (
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
              )}

              {/* 7. FAQs */}
              {faqs.length > 0 && (
                <section className="space-y-4 pt-4 border-t border-[#E8DED0]">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#BFA076]" /> Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
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

            {/* Sidebar: Verified Specifications & Portfolio Cross-links */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-white border border-[#E8DED0] p-6 space-y-5 sticky top-28">
                <div className="flex items-center gap-2 pb-3 border-b border-[#F3ECE1]">
                  <Layers className="w-4 h-4 text-[#BFA076]" />
                  <h2 className="font-serif text-xl text-[#121212]">Technical Specifications</h2>
                </div>

                {specsList.length > 0 ? (
                  <dl className="space-y-3 text-xs">
                    {specsList.map((spec, i) => (
                      <div key={i} className="pb-2 border-b border-[#FAF7F2] last:border-0">
                        <dt className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                          {spec.label}
                        </dt>
                        <dd className="text-xs text-[#121212] font-medium mt-0.5">
                          {spec.value || "To be verified"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-xs text-[#7B6955] italic">
                    Specifications undergoing verification.
                  </p>
                )}

                {/* Relevant Portfolio Projects (Only when available) */}
                {portfolioLinks.length > 0 && (
                  <div className="pt-4 border-t border-[#F3ECE1] space-y-2.5">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      Demonstrated in Portfolio
                    </p>
                    <div className="space-y-2">
                      {portfolioLinks.map((p, idx) => (
                        <Link
                          key={idx}
                          href={p.url}
                          className="flex items-center justify-between text-xs text-[#121212] hover:text-[#BFA076] font-medium transition-colors p-2 bg-[#FAF7F2] border border-[#E8DED0]"
                        >
                          <span>{p.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Retailer Links (Only if populated) */}
                {item.retailerLinks && item.retailerLinks.length > 0 && (
                  <div className="pt-4 border-t border-[#F3ECE1] space-y-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      Retailer Availability
                    </p>
                    {item.retailerLinks.map((ret, i) => (
                      <a
                        key={i}
                        href={ret.url}
                        target="_blank"
                        rel={ret.isAffiliate ? "sponsored nofollow noopener" : "nofollow noopener"}
                        className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-[#121212] text-[#FAF7F2] hover:bg-[#2C2C2C] transition-colors text-xs uppercase tracking-wider font-medium"
                      >
                        <span>{ret.retailer}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related Equipment In Studio Inventory */}
          <div className="mt-20 pt-12 border-t border-[#E8DED0]">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mb-6">
              More Equipment in Studio Inventory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGear.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/photography-gear/${rel.slug}`}
                  className="bg-white border border-[#E8DED0] p-5 hover:shadow-md hover:border-[#BFAB93] transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                      {rel.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg text-[#121212] group-hover:text-[#7B6955] transition-colors mt-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-[#554837] font-light mt-1.5 line-clamp-2">
                      {rel.description || rel.tagline}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#121212] font-medium pt-4 mt-2 border-t border-[#F3ECE1]">
                    View Specs <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
