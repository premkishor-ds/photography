import { siteConfig, getMergedSiteConfig, StudioSettingsInput } from "@/config/siteConfig";
import { ServiceDetail } from "@/data/servicesData";
import { BlogPost } from "@/data/blogData";
import { DetailedPortfolioItem } from "@/data/portfolioData";

/**
 * Returns canonical absolute URL for any path
 */
export function getAbsoluteUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.baseUrl}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * PhotographyBusiness / LocalBusiness structured data
 */
export function generatePhotographyBusinessSchema(customSettings?: StudioSettingsInput) {
  const config = getMergedSiteConfig(customSettings);
  return {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "@id": `${config.baseUrl}/#business`,
    name: config.business.tradingName,
    legalName: config.business.legalName,
    url: config.baseUrl,
    logo: getAbsoluteUrl("/logo.png"),
    image: config.defaultOgImage,
    description: config.brandSubtitle,
    telephone: config.business.phone,
    email: config.business.email,
    priceRange: config.business.priceRange,
    currenciesAccepted: config.business.currenciesAccepted,
    paymentAccepted: config.business.paymentAccepted,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.business.address.streetAddress,
      addressLocality: config.business.address.addressLocality,
      addressRegion: config.business.address.addressRegion,
      postalCode: config.business.address.postalCode,
      addressCountry: config.business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.business.geo.latitude,
      longitude: config.business.geo.longitude,
    },
    areaServed: config.business.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    openingHoursSpecification: config.business.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: Object.values(config.socialProfiles).filter(Boolean),
  };
}

/**
 * WebSite structured data
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.baseUrl}/#website`,
    url: siteConfig.baseUrl,
    name: siteConfig.siteName,
    description: siteConfig.brandSubtitle,
    publisher: {
      "@id": `${siteConfig.baseUrl}/#business`,
    },
    inLanguage: siteConfig.defaultLocale,
  };
}

/**
 * WebPage structured data
 */
export function generateWebPageSchema(
  path: string,
  title: string,
  description: string
) {
  const url = getAbsoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url: url,
    name: title,
    description: description,
    isPartOf: {
      "@id": `${siteConfig.baseUrl}/#website`,
    },
    about: {
      "@id": `${siteConfig.baseUrl}/#business`,
    },
    inLanguage: siteConfig.defaultLocale,
  };
}

/**
 * Service structured data
 */
export function generateServiceSchema(service: ServiceDetail) {
  const serviceUrl = getAbsoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}/#service`,
    name: service.title,
    serviceType: service.title,
    description: service.shortDescription,
    url: serviceUrl,
    provider: {
      "@id": `${siteConfig.baseUrl}/#business`,
    },
    areaServed: siteConfig.business.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: service.deliverables.map((item, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
        position: index + 1,
      })),
    },
  };
}

/**
 * Person (Photographer) structured data
 */
export function generatePersonSchema(customSettings?: StudioSettingsInput) {
  const config = getMergedSiteConfig(customSettings);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${config.baseUrl}/#photographer`,
    name: config.photographer.name,
    jobTitle: config.photographer.role,
    description: config.photographer.biography,
    image: config.photographer.portraitUrl,
    worksFor: {
      "@id": `${config.baseUrl}/#business`,
    },
    url: getAbsoluteUrl("/about"),
    sameAs: Object.values(config.socialProfiles).filter(Boolean),
  };
}

/**
 * FAQPage structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : getAbsoluteUrl(item.url),
    })),
  };
}

/**
 * BlogPosting / Article structured data
 */
export function generateArticleSchema(post: BlogPost) {
  const articleUrl = getAbsoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}/#article`,
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      url: getAbsoluteUrl("/about"),
    },
    publisher: {
      "@id": `${siteConfig.baseUrl}/#business`,
    },
    image: post.heroImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    inLanguage: siteConfig.defaultLocale,
  };
}

/**
 * ImageGallery / ImageObject structured data
 */
export function generateImageGallerySchema(images: DetailedPortfolioItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Photography Portfolio Gallery",
    url: getAbsoluteUrl("/portfolio"),
    hasPart: images.slice(0, 12).map((img) => ({
      "@type": "ImageObject",
      name: img.title,
      description: img.description,
      contentUrl: img.imageUrl,
      thumbnailUrl: img.imageUrl,
      caption: img.description,
      creator: {
        "@id": `${siteConfig.baseUrl}/#photographer`,
      },
    })),
  };
}
