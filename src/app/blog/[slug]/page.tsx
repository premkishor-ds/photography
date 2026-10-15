import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BlogPostClient from "@/components/BlogPostClient";
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
        <BlogPostClient
          initialPost={post}
          initialRelatedService={relatedService}
        />
      </main>

      <Footer />
    </div>
  );
}
