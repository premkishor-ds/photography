"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import { useLanguage } from "@/context/LanguageContext";
import { BlogPost, getLocalizedBlogPost } from "@/data/blogData";
import { ServiceDetail, getLocalizedServiceDetail } from "@/data/servicesData";

interface BlogPostClientProps {
  initialPost: BlogPost;
  initialRelatedService?: ServiceDetail;
}

export default function BlogPostClient({
  initialPost,
  initialRelatedService,
}: BlogPostClientProps) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const post = getLocalizedBlogPost(initialPost, language);
  const relatedService = initialRelatedService
    ? getLocalizedServiceDetail(initialRelatedService, language)
    : undefined;

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8">
      <Breadcrumbs
        items={[
          { name: isHindi ? "जर्नल" : "Journal", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <article className="pt-6">
        {/* Category Pill */}
        <span className="inline-block px-3 py-1 bg-[#121212] text-white text-[11px] uppercase tracking-widest font-sans font-medium mb-4">
          {post.category}
        </span>

        {/* Main Article H1 */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#121212] leading-[1.15]">
          {post.title}
        </h1>

        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center gap-6 py-6 border-y border-[#E8DED0] my-8 text-xs text-[#7B6955] font-sans">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-[#121212]" />
            <span className="text-[#121212] font-medium">{post.author}</span>
            <span>({isHindi ? "प्रधान फोटोग्राफर" : post.authorRole})</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {isHindi ? "प्रकाशित: " : "Published: "}
              {post.publishedDate}
            </span>
            {post.modifiedDate && (
              <span className="hidden sm:inline">
                ({isHindi ? "अपडेटेड: " : "Updated: "}
                {post.modifiedDate})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] w-full bg-[#121212] shadow-xl overflow-hidden border border-[#E8DED0] mb-12">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-center"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="text-lg sm:text-xl text-[#121212] font-serif italic border-l-2 border-[#121212] pl-6 py-2 mb-10 leading-relaxed">
          {post.excerpt}
        </div>

        {/* Article Body Sections */}
        <div className="space-y-10 text-sm sm:text-base text-[#44382A] font-light leading-relaxed">
          {post.content.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              {sec.sectionTitle && (
                <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] pt-4 font-normal">
                  {sec.sectionTitle}
                </h2>
              )}

              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}

              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 my-4 bg-white p-6 border border-[#E8DED0]">
                  {sec.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2C2C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BFA076] mt-2 shrink-0" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Contextual Link to Related Service */}
        {relatedService && (
          <div className="my-10 p-6 sm:p-8 bg-white border border-[#E8DED0] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7B6955] font-sans">
                {isHindi ? "संबंधित विशेषज्ञता" : "Related Specialization"}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#121212] mt-1">
                {relatedService.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#554837] mt-1 max-w-lg">
                {relatedService.shortDescription}
              </p>
            </div>
            <Link
              href={`/services/${relatedService.slug}`}
              className="shrink-0 px-6 py-3 bg-[#121212] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#2C2C2C] transition-colors"
            >
              {isHindi ? "सेवा देखें" : "Explore Service"}
            </Link>
          </div>
        )}

        {/* Contextual Link to Gear Section */}
        <div className="my-8 p-6 bg-[#F4EFE6] border border-[#E8DED0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
              {isHindi ? "उपयोग एवं परीक्षित उपकरण" : "Equipment Used & Tested"}
            </span>
            <h3 className="font-serif text-lg text-[#121212]">
              {isHindi
                ? "जानना चाहते हैं कि हम किन कैमरों और लेंसों से शूट करते हैं?"
                : "Curious about the cameras and optics we shoot with?"}
            </h3>
            <p className="text-xs text-[#554837] mt-0.5">
              {isHindi
                ? "हमारे फोटोग्राफी गियर अनुभाग में फील्ड समीक्षाएं और तकनीकी तुलनाएं देखें।"
                : "Explore our hands-on field reviews and technical comparisons in My Photography Gear."}
            </p>
          </div>
          <Link
            href="/photography-gear"
            className="shrink-0 px-4 py-2.5 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#FAF7F2] text-xs uppercase tracking-wider transition-colors font-medium"
          >
            {isHindi ? "गियर शोकेस देखें" : "View Gear Showcase"}
          </Link>
        </div>

        {/* Back to Blog */}
        <div className="pt-6 border-t border-[#E8DED0]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#121212] hover:text-[#7B6955] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isHindi ? "सभी गाइड्स पर वापस जाएं" : "Return to All Guides"}</span>
          </Link>
        </div>
      </article>

      {/* Booking CTA */}
      <BookingCtaBanner
        title={isHindi ? "क्या आप अपने सत्र की योजना बनाने के लिए तैयार हैं?" : "Ready to Plan Your Session?"}
        subtitle={
          isHindi
            ? "आइए आपकी व्यक्तिगत दृष्टि के अनुरूप कालातीत, प्रामाणिक तस्वीरें बनाएं।"
            : "Let's capture timeless, authentic imagery tailored to your individual vision."
        }
      />
    </div>
  );
}
