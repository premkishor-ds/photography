"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import FaqAccordion, { FaqItemProp } from "@/components/FaqAccordion";
import { useLanguage } from "@/context/LanguageContext";
import { ServiceDetail, getLocalizedServicesData } from "@/data/servicesData";
import { FAQItem } from "@/data/faqData";

interface ServicesPageClientProps {
  initialServices?: ServiceDetail[];
  initialFaqs: FAQItem[];
}

export default function ServicesPageClient({
  initialFaqs,
}: ServicesPageClientProps) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const services = getLocalizedServicesData(language);

  const localizedFaqs: FaqItemProp[] = initialFaqs.map((f) => ({
    question: isHindi && f.questionHindi ? f.questionHindi : f.question,
    answer: isHindi && f.answerHindi ? f.answerHindi : f.answer,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <Breadcrumbs items={[{ name: isHindi ? "सेवाएँ" : "Services", url: "/services" }]} />

      {/* Page Hero */}
      <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
          {isHindi ? "हमारी सेवाएँ" : "What We Offer"}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#121212]">
          {isHindi ? "फोटोग्राफी सेवाएँ और विशेषज्ञताएँ" : "Photography Services & Specializations"}
        </h1>
        <p className="text-base sm:text-lg text-[#554837] font-light max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? "प्रत्येक प्रोजेक्ट को गहन रचनात्मक दिशा, प्रकाश पर पकड़ और समर्पित संपादन के साथ पूरा किया जाता है। संपूर्ण पैकेज, कार्यप्रणाली और गैलरी देखने के लिए नीचे दी गई सेवाओं में से चुनें।"
            : "Every assignment is approached with rigorous creative direction, mastery of light, and dedicated post-production. Select a service below to explore complete inclusions, workflows, and galleries."}
        </p>
      </div>

      {/* Services Grid (6 Symmetrical Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {services.map((service, index) => (
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
                    {isHindi ? "विशेष आकर्षण" : "Session Highlights"}
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
                <span>{isHindi ? "पैकेज विवरण देखें" : "View Package Details"}</span>
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
            {isHindi ? "सेवा पूछताछ" : "Service Inquiries"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#121212] mt-2">
            {isHindi ? "अक्सर पूछे जाने वाले सेवा प्रश्न" : "Frequently Asked Service Questions"}
          </h2>
        </div>
        <FaqAccordion items={localizedFaqs} idPrefix="services-faq" />
      </div>

      {/* Global Booking CTA */}
      <BookingCtaBanner
        title={isHindi ? "अपने विशेष फोटोग्राफी अनुभव को बुक करें" : "Book Your Bespoke Photography Experience"}
        subtitle={
          isHindi
            ? "आइए मिलकर आपके आगामी प्रोजेक्ट, समारोह या अभियान के लिए यादगार तस्वीरें तैयार करें।"
            : "Let's align our calendar and craft unforgettable imagery for your upcoming project, ceremony, or campaign."
        }
      />
    </div>
  );
}
