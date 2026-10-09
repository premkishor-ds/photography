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
  brandTaglineHindi: "क्षणों को कैद करना, यादें बनाना",
  brandSubtitle:
    "Professional fine-art, portrait, royal wedding, sports, and commercial photography across Jaipur, Rajasthan, and India.",
  logoUrl: "/logo.png",
  defaultOgImage:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&h=630&q=85",

  // Business Entity Details (LocalBusiness / PhotographyBusiness Schema)
  business: {
    legalName: "Your Photography Studio",
    tradingName: "Your Photography",
    foundingYear: "2014",
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    currencySymbol: "₹",
    paymentAccepted: "UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit Card, Cash",

    // Contact Information
    email: "hello@yourphotography.com",
    phone: "+91 98290 12345",
    phoneRaw: "+919829012345",
    whatsappNumber: "919829012345",
    whatsappDisplay: "+91 98290 12345",

    // Physical Location (Jaipur, Rajasthan, India)
    address: {
      roomNo: "Second Floor, Room No. 215",
      plusCode: "RV2J+5PQ",
      streetAddress: "Second Floor, Room No. 215, RV2J+5PQ, Karolan Ka Barh, Shri Kishanpura",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302017",
      addressCountry: "IN",
      hindiAddress: "कमरा नं. 215, द्वितीय तल, कैरोलन का बाड़, श्री किशनपुरा, जयपुर, राजस्थान 302017",
    },
    geo: {
      latitude: 26.8285,
      longitude: 75.8654,
    },
    // Service Areas (Verified coverage)
    serviceAreas: [
      "Jaipur & Pink City Heritage Districts",
      "Jagatpura, Malviya Nagar, Tonk Road & C-Scheme, Jaipur",
      "Rajasthan Destination Weddings (Udaipur, Jodhpur, Jaisalmer, Pushkar)",
      "Delhi NCR & Pan-India Commissions",
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
        opens: "09:30",
        closes: "19:00",
      },
    ],
  },

  // Photographer Lead Identity (Person Schema)
  photographer: {
    name: "Julian Rivera",
    role: "Principal Photographer & Creative Director",
    biography:
      "Trained in classical fine-art and documentary photography with over 12 years of experience documenting royal palace weddings in Rajasthan, high-speed sports, editorial portraits, and cultural heritage across India.",
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
