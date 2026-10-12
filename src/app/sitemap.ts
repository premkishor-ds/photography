import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAbsoluteUrl } from "@/lib/schema";
import { SERVICES_DATA } from "@/data/servicesData";
import { PORTFOLIO_CATEGORIES_META } from "@/data/portfolioData";
import { fetchBlogPosts, fetchGearItems } from "@/lib/supabase";
import { GEAR_ITEMS, GEAR_COMPARISONS } from "@/data/gearData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split("T")[0];
  const [dynamicBlogPosts, dynamicGearItems] = await Promise.all([
    fetchBlogPosts(),
    fetchGearItems(),
  ]);

  // Core Static Landing Pages (Exact 1:1 match with canonical tags)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: getAbsoluteUrl("/services"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/portfolio"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/photography-gear"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/about"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/contact"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/faq"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/blog"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/locations"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/locations/jaipur"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/locations/new-york"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: getAbsoluteUrl("/privacy-policy"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl("/terms-and-conditions"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dedicated Service Pages
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: getAbsoluteUrl(`/services/${service.slug}`),
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Dedicated Portfolio Category Pages
  const portfolioCategoryRoutes: MetadataRoute.Sitemap = PORTFOLIO_CATEGORIES_META.map(
    (cat) => ({
      url: getAbsoluteUrl(`/portfolio/${cat.slug}`),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Dedicated Blog / Photography Guides
  const blogRoutes: MetadataRoute.Sitemap = dynamicBlogPosts.map((post) => ({
    url: getAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: post.modifiedDate || post.publishedDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dedicated Photography Gear Reviews
  const gearRoutes: MetadataRoute.Sitemap = dynamicGearItems.map((gear) => ({
    url: getAbsoluteUrl(`/photography-gear/${gear.slug}`),
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dedicated Photography Gear Comparisons
  const gearComparisonRoutes: MetadataRoute.Sitemap = GEAR_COMPARISONS.map((comp) => ({
    url: getAbsoluteUrl(`/photography-gear/comparisons/${comp.slug}`),
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...portfolioCategoryRoutes,
    ...blogRoutes,
    ...gearRoutes,
    ...gearComparisonRoutes,
  ];
}
