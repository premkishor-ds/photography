import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "Services", url: "/services" }]} />

          {/* Page Hero */}
          <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
              What We Offer
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
              Photography Services & Specializations
            </h1>
            <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
              Every assignment is approached with rigorous creative direction, mastery of light, and dedicated post-production. Select a service below to explore complete inclusions, workflows, and galleries.
            </p>
          </div>

          {/* Services Grid (6 Symmetrical Services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {SERVICES_DATA.map((service, index) => (
              <article
                key={service.slug}
                className="bg-white border border-[#E8DED0] flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:border-[#BFAB93]"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121212]">
                    <Image
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-4 text-[10px] tracking-widest uppercase font-mono text-white/90 bg-black/40 px-2 py-0.5 backdrop-blur-xs">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7">
                    <h2 className="font-serif text-2xl font-normal text-[#121212] group-hover:text-[#7B6955] transition-colors">
                      <Link href={`/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#554837] leading-relaxed font-light line-clamp-3">
                      {service.shortDescription}
                    </p>

                    <div className="mt-5 pt-4 border-t border-[#F3ECE1] space-y-2">
                      <p className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                        Session Highlights
                      </p>
                      <ul className="space-y-1.5 text-xs text-[#2C2C2C]">
                        {service.deliverables.slice(0, 3).map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#BFAB93] mt-1.5 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-2 border-t border-[#F3ECE1] flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors flex items-center gap-1.5 group/btn"
                  >
                    <span>View Package Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[11px] font-mono text-[#7B6955]">
                    {service.deliveryTime}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Service Questions & Answers */}
          <div className="my-20 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans">
                Service Inquiries
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#121212] mt-2">
                Frequently Asked Service Questions
              </h2>
            </div>
            <FaqAccordion items={serviceFaqs} idPrefix="services-faq" />
          </div>

          {/* Global Booking CTA */}
          <BookingCtaBanner
            title="Book Your Bespoke Photography Experience"
            subtitle="Let's align our calendar and craft unforgettable imagery for your upcoming project, ceremony, or campaign."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
