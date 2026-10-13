import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  Check,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateServiceSchema, generateFAQSchema } from "@/lib/schema";
import { SERVICES_DATA } from "@/data/servicesData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return constructMetadata({
      title: "Service Not Found",
      description: "The requested photography service could not be found.",
      path: "/services",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    image: service.imageUrl,
    imageAlt: service.imageAlt,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service);
  const faqSchema = generateFAQSchema(service.faqs);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <Breadcrumbs
            items={[
              { name: "Services", url: "/services" },
              { name: service.title, url: `/services/${service.slug}` },
            ]}
          />

          {/* Service Hero Banner */}
          <section className="py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
                Photography Specialization
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212]">
                {service.heroHeading}
              </h1>
              <p className="text-base sm:text-xl text-[#554837] font-light leading-relaxed">
                {service.heroDescription}
              </p>

              {/* Meta Stats Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E8DED0]">
                <div className="bg-white p-3.5 border border-[#F3ECE1]">
                  <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </span>
                  <p className="text-sm font-medium text-[#121212] mt-1">
                    {service.duration}
                  </p>
                </div>

                <div className="bg-white p-3.5 border border-[#F3ECE1]">
                  <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Delivery
                  </span>
                  <p className="text-sm font-medium text-[#121212] mt-1">
                    {service.deliveryTime}
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-white p-3.5 border border-[#F3ECE1]">
                  <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Rights
                  </span>
                  <p className="text-sm font-medium text-[#121212] mt-1">
                    Full Digital Rights
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full sm:w-auto px-8 py-4 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2C2C] transition-colors text-center"
                >
                  Book This Experience
                </Link>
                <Link
                  href="/portfolio"
                  className="w-full sm:w-auto px-8 py-4 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#121212] hover:text-white transition-colors text-center"
                >
                  View Related Portfolio
                </Link>
              </div>
            </div>

            {/* Visual Feature Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full bg-[#121212] shadow-2xl overflow-hidden border border-[#E8DED0]">
                <Image
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </section>

          {/* Overview & Audience */}
          <section className="py-14 border-t border-[#E8DED0] grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#121212]">
                Our Creative Approach
              </h2>
              {service.overviewText.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-[#554837] font-light leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E8DED0] space-y-4">
              <h3 className="font-serif text-xl text-[#121212]">
                Who This Experience Is Designed For
              </h3>
              <ul className="space-y-3">
                {service.idealFor.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2C2C] font-sans"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#121212] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Deliverables Section */}
          <section className="py-14 border-t border-[#E8DED0]">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans">
                Package Contents
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] mt-2">
                What&apos;s Included In Every Commission
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.deliverables.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 border border-[#E8DED0] space-y-2"
                >
                  <span className="font-mono text-xs text-[#7B6955]">
                    0{index + 1}
                  </span>
                  <p className="font-serif text-base text-[#121212] font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow Process Steps (AEO Structured Information) */}
          <section className="py-14 border-t border-[#E8DED0]">
            <div className="max-w-3xl mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans">
                Methodology
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] mt-2">
                How Your Session Unfolds Step-by-Step
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white p-6 sm:p-7 border border-[#E8DED0] space-y-3 relative"
                >
                  <span className="font-mono text-2xl font-light text-[#BFA076]">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-lg text-[#121212] font-medium">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#554837] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Service FAQs */}
          <section className="py-14 border-t border-[#E8DED0] max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-[#7B6955] font-sans">
                Common Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] mt-2">
                {service.title} FAQs
              </h2>
            </div>
            <FaqAccordion items={service.faqs} idPrefix={`service-${service.slug}`} />
          </section>

          {/* Contextual CTA */}
          <BookingCtaBanner
            title={`Schedule Your ${service.title} Session`}
            subtitle="Dates are reserved in advance to guarantee dedicated creative attention. Inquire today to verify availability."
            serviceName={service.title}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
