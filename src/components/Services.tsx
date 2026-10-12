"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { SERVICES, ServiceItem } from "@/data/photographyData";
import ServiceModal from "./ServiceModal";
import { useLanguage } from "@/context/LanguageContext";

interface ServicesProps {
  onSelectServiceForBooking?: (serviceTitle: string) => void;
}

export default function Services({ onSelectServiceForBooking }: ServicesProps) {
  const { t, language } = useLanguage();
  const [servicesList, setServicesList] = useState<ServiceItem[]>(SERVICES);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadDynamicServices() {
      try {
        const res = await fetch("/api/admin/services");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.services) && data.services.length > 0) {
          const mapped: ServiceItem[] = data.services.map((it: any) => ({
            id: it.id,
            title: it.title,
            tagline: it.tagline || "",
            description: it.description || "",
            imageUrl: it.image_url,
            duration: it.duration || "2 Hours",
            deliveryTime: it.delivery_time || "7 business days",
            deliverables: Array.isArray(it.deliverables) ? it.deliverables : [],
            detailedDescription: it.detailed_description || "",
            idealFor: it.ideal_for || "",
          }));
          setServicesList(mapped);
        }
      } catch (err) {
        // Fallback to static services
      }
    }
    loadDynamicServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenLearnMore = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBookService = (serviceTitle: string) => {
    if (onSelectServiceForBooking) {
      onSelectServiceForBooking(serviceTitle);
    }
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F4EFE6] text-[#121212] border-y border-[#E8DED0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium mb-3">
            {t("services.badge", "What We Offer")}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#121212]">
            {t("services.title", "Photography Services")}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#554837] font-light max-w-xl mx-auto leading-relaxed">
            {t("services.desc", "Every assignment is crafted with meticulous attention to lighting, composition, and emotional resonance. Explore our dedicated specializations below.")}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const isWideCard = index === 3 || index === 4;
            return (
              <div
                key={service.id}
                className="bg-[#FAF7F2] border border-[#E8DED0] flex flex-col justify-between group transition-all duration-300 hover:shadow-lg hover:border-[#BFAB93]"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121212]">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-4 text-[10px] tracking-widest uppercase font-mono text-white/90 bg-black/40 px-2 py-0.5 backdrop-blur-xs">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#121212] group-hover:text-[#7B6955] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#554837] leading-relaxed font-light line-clamp-3">
                      {service.description}
                    </p>

                    {/* Deliverables snippet */}
                    <div className="mt-4 pt-4 border-t border-[#F3ECE1] space-y-1.5">
                      <p className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                        {language === "hi" ? "प्रमुख विवरण" : "Highlight Details"}
                      </p>
                      <p className="text-xs text-[#2C2C2C] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BFAB93]" />
                        {service.duration} • {service.deliveryTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-[#F3ECE1]">
                  <button
                    onClick={() => handleOpenLearnMore(service)}
                    className="text-xs uppercase tracking-widest font-medium text-[#121212] hover:text-[#7B6955] transition-colors py-2 flex items-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>{language === "hi" ? "और जानें" : "Learn More"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleBookService(service.title)}
                    className="text-[11px] uppercase tracking-wider px-3.5 py-1.5 bg-[#121212] text-[#FAF7F2] hover:bg-[#333] transition-colors cursor-pointer"
                  >
                    {language === "hi" ? "बुक करें" : "Book Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bespoke / Custom Project Callout */}
        <div className="mt-14 p-8 sm:p-10 bg-[#FAF7F2] border border-[#E8DED0] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl text-[#121212]">
              {language === "hi"
                ? "कस्टम प्रोजेक्ट या डेस्टिनेशन असाइनमेंट की आवश्यकता है?"
                : "Need a bespoke commission or destination assignment?"}
            </h4>
            <p className="text-xs sm:text-sm text-[#554837] font-light max-w-xl">
              {language === "hi"
                ? "अंतरराष्ट्रीय यात्रा असाइनमेंट से लेकर कस्टम बहु-दिवसीय कमर्शियल शूट तक, हम आपकी सटीक रचनात्मक आवश्यकताओं के अनुसार पैकेज तैयार करते हैं।"
                : "From international travel assignments to custom multi-day commercial shoots, we tailor custom packages to your exact creative requirements."}
            </p>
          </div>
          <button
            onClick={() => handleBookService("Custom Project")}
            className="shrink-0 px-6 py-3.5 text-xs uppercase tracking-widest bg-[#121212] text-white hover:bg-[#2C2C2C] transition-colors cursor-pointer font-medium"
          >
            {language === "hi" ? "कस्टम कोटेशन मांगें" : "Request Custom Quote"}
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookService={handleBookService}
      />
    </section>
  );
}
