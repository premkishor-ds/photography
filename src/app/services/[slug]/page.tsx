import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ServiceDetailClient from "@/components/ServiceDetailClient";
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
        <ServiceDetailClient initialService={service} />
      </main>

      <Footer />
    </div>
  );
}
