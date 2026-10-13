import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BookingCtaBanner from "@/components/BookingCtaBanner";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateArticleSchema } from "@/lib/schema";
import { fetchBlogPosts, fetchBlogPostBySlug } from "@/lib/supabase";
import { SERVICES_DATA } from "@/data/servicesData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return constructMetadata({
      title: "Article Not Found",
      description: "The requested photography guide could not be found.",
      path: "/blog",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.heroImage,
    imageAlt: post.heroAlt,
    type: "article",
    publishedTime: post.publishedDate,
    modifiedTime: post.modifiedDate,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedService = SERVICES_DATA.find(
    (s) => s.slug === post.relatedServiceSlug
  );

  const articleSchema = generateArticleSchema(post);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={articleSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <Breadcrumbs
            items={[
              { name: "Journal", url: "/blog" },
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
                <span>({post.authorRole})</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published: {post.publishedDate}</span>
                {post.modifiedDate && (
                  <span className="hidden sm:inline">
                    (Updated: {post.modifiedDate})
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
                    Related Specialization
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
                  Explore Service
                </Link>
              </div>
            )}

            {/* Contextual Link to Gear Section */}
            <div className="my-8 p-6 bg-[#F4EFE6] border border-[#E8DED0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7B6955] font-sans font-medium">
                  Equipment Used &amp; Tested
                </span>
                <h3 className="font-serif text-lg text-[#121212]">
                  Curious about the cameras and optics we shoot with?
                </h3>
                <p className="text-xs text-[#554837] mt-0.5">
                  Explore our hands-on field reviews and technical comparisons in My Photography Gear.
                </p>
              </div>
              <Link
                href="/photography-gear"
                className="shrink-0 px-4 py-2.5 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#FAF7F2] text-xs uppercase tracking-wider transition-colors font-medium"
              >
                View Gear Showcase
              </Link>
            </div>

            {/* Back to Blog */}
            <div className="pt-6 border-t border-[#E8DED0]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#121212] hover:text-[#7B6955] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to All Guides</span>
              </Link>
            </div>
          </article>

          {/* Booking CTA */}
          <BookingCtaBanner
            title="Ready to Plan Your Session?"
            subtitle="Let's capture timeless, authentic imagery tailored to your individual vision."
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
