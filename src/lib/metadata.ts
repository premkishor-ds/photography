import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { getAbsoluteUrl } from "@/lib/schema";

export interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path,
  image = siteConfig.defaultOgImage,
  imageAlt = siteConfig.brandTagline,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetadataProps): Metadata {
  const canonicalUrl = getAbsoluteUrl(path);
  const isRoot = path === "/" || path === "";
  const fullTitle = isRoot ? `${siteConfig.siteName} | ${siteConfig.brandTagline}` : title;

  return {
    title: fullTitle,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: isRoot ? fullTitle : `${title} | ${siteConfig.siteName}`,
      description: description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      locale: siteConfig.defaultLocale,
      type: type,
      images: [
        {
          url: image.startsWith("http") ? image : getAbsoluteUrl(image),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: isRoot ? fullTitle : `${title} | ${siteConfig.siteName}`,
      description: description,
      images: [image.startsWith("http") ? image : getAbsoluteUrl(image)],
    },
  };
}
