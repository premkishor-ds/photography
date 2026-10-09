/**
 * Centralized Website & Business Configuration
 *
 * All canonical URLs, business identifiers, contact points, and
 * metadata defaults are defined here to eliminate hardcoded domains
 * and ensure single-source-of-truth accuracy across SEO, schema, and UI.
 */

export const siteConfig = {
  // Domain & Environment
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourphotography.com",
  siteName: "Your Photography",
  defaultLocale: "en-US",

  // Brand & Visual Identity
  brandTagline: "Capturing Moments, Creating Memories",
  brandSubtitle:
    "Professional fine-art, portrait, wedding, sports, and commercial photography for life's most meaningful moments.",
  logoUrl: "/logo.png",
  defaultOgImage:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&h=630&q=85",

  // Business Entity Details (LocalBusiness / PhotographyBusiness Schema)
  business: {
    legalName: "Your Photography Studio LLC",
    tradingName: "Your Photography",
    foundingYear: "2014",
    priceRange: "$$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, Bank Transfer, Check",

    // Contact Information (Configurable Placeholders)
    email: "hello@yourphotography.com",
    phone: "+1 (555) 234-5678",
    phoneRaw: "+15552345678",
    whatsappNumber: "1234567890",
    whatsappDisplay: "+1 (555) 234-5678",

    // Physical Location (Placeholder configured for business owner verification)
    address: {
      streetAddress: "Studio 18, 452 Artisan Way, Soho Arts District",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10013",
      addressCountry: "US",
    },
    geo: {
      latitude: 40.7223,
      longitude: -74.0001,
    },
    // Service Areas (Verified coverage)
    serviceAreas: [
      "New York City Metropolitan Area",
      "Hudson Valley, NY",
      "Long Island & The Hamptons, NY",
      "Worldwide Destination Inquiries",
    ],
    // Studio Operating Hours
    openingHours: [
      {
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:30",
      },
    ],
  },

  // Photographer Lead Identity (Person Schema)
  photographer: {
    name: "Julian Rivera",
    role: "Principal Photographer & Creative Director",
    biography:
      "Trained in classical fine-art and documentary photography with over 12 years of professional experience across editorial portraits, weddings, high-speed athletics, and commercial commissions.",
    portraitUrl:
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80",
    experienceYears: "12+",
    awardsNote: "Published in international design and lifestyle editorials.",
  },

  // Social Profile URLs (Verified placeholders for sameAs schema)
  socialProfiles: {
    instagram: "https://instagram.com/yourphotography",
    pinterest: "https://pinterest.com/yourphotography",
    fiveHundredPx: "https://500px.com/p/yourphotography",
    facebook: "https://facebook.com/yourphotography",
    linkedin: "https://linkedin.com/company/yourphotography",
  },

  // Search Engine Verification Placeholders
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    yandex: "",
  },

  // Analytics Placeholders (Only loaded when valid ID provided in environment)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
