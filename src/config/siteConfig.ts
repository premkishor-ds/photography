/**
 * Centralized Website & Business Configuration
 *
 * All canonical URLs, business identifiers, contact points, and
 * metadata defaults are defined here. Every key is dynamically configurable
 * via NEXT_PUBLIC_* environment variables or runtime database settings.
 */

const DAYS_LOOKUP: Record<string, string> = {
  mon: "Monday",
  monday: "Monday",
  tue: "Tuesday",
  tues: "Tuesday",
  tuesday: "Tuesday",
  wed: "Wednesday",
  wednesday: "Wednesday",
  thu: "Thursday",
  thur: "Thursday",
  thurs: "Thursday",
  thursday: "Thursday",
  fri: "Friday",
  friday: "Friday",
  sat: "Saturday",
  saturday: "Saturday",
  sun: "Sunday",
  sunday: "Sunday",
};

const ORDERED_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function normalizeTime24(timeStr?: string): string {
  if (!timeStr) return "09:30";
  const clean = timeStr.trim();
  const ampmMatch = clean.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (ampmMatch) {
    let h = parseInt(ampmMatch[1], 10);
    const m = ampmMatch[2];
    const ampm = ampmMatch[3]?.toUpperCase();
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${m}`;
  }
  return clean;
}

function expandDayRange(startDay: string, endDay: string): string[] {
  const startNorm = DAYS_LOOKUP[startDay.toLowerCase()];
  const endNorm = DAYS_LOOKUP[endDay.toLowerCase()];
  if (!startNorm || !endNorm) return [startNorm || endNorm].filter(Boolean);
  const sIdx = ORDERED_DAYS.indexOf(startNorm);
  const eIdx = ORDERED_DAYS.indexOf(endNorm);
  if (sIdx === -1 || eIdx === -1) return [startNorm];
  if (sIdx <= eIdx) {
    return ORDERED_DAYS.slice(sIdx, eIdx + 1);
  }
  return [startNorm, endNorm];
}

export interface OpeningHoursItem {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

/**
 * Dynamically parse any working hours summary string or JSON into Schema.org OpeningHours specification
 */
export function parseWorkingHoursToOpeningHours(rawString?: string): OpeningHoursItem[] {
  if (!rawString) {
    return [
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
    ];
  }

  // If user provided valid JSON array directly
  if (rawString.trim().startsWith("[") && rawString.trim().endsWith("]")) {
    try {
      const parsed = JSON.parse(rawString);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
  }

  // Remove parenthesis/bracket notes like (Sunday by Appointment) or [Holiday: ...]
  const cleaned = rawString.replace(/\(.*?\)/g, "").replace(/\[.*?\]/g, "").trim();

  // Split segments by comma, semicolon or pipe
  const segments = cleaned.split(/[,;|]/).map((s) => s.trim()).filter(Boolean);
  const results: OpeningHoursItem[] = [];

  for (const seg of segments) {
    if (/closed/i.test(seg)) continue;

    const colonIdx = seg.indexOf(":");
    if (colonIdx === -1) continue;

    const dayPart = seg.substring(0, colonIdx).trim();
    const timePart = seg.substring(colonIdx + 1).trim();

    const timeMatches = timePart.match(/(\d{1,2}:\d{2}(?:\s*[AP]M)?)/gi);
    if (!timeMatches || timeMatches.length < 2) continue;

    const opens = normalizeTime24(timeMatches[0]);
    const closes = normalizeTime24(timeMatches[1]);

    const rangeMatch = dayPart.match(/([a-z]+)\s*[–\-—to]+\s*([a-z]+)/i);
    let days: string[] = [];
    if (rangeMatch) {
      days = expandDayRange(rangeMatch[1], rangeMatch[2]);
    } else {
      const singleDay = DAYS_LOOKUP[dayPart.toLowerCase()];
      if (singleDay) days = [singleDay];
    }

    if (days.length > 0) {
      results.push({
        dayOfWeek: days,
        opens,
        closes,
      });
    }
  }

  if (results.length === 0) {
    return [
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
    ];
  }

  return results;
}

function getInitialOpeningHours(): OpeningHoursItem[] {
  // 1. Explicit JSON override
  if (process.env.NEXT_PUBLIC_OPENING_HOURS_JSON) {
    try {
      const parsed = JSON.parse(process.env.NEXT_PUBLIC_OPENING_HOURS_JSON);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
  }

  // 2. Custom comma-separated days override
  if (process.env.NEXT_PUBLIC_STUDIO_HOURS_DAYS) {
    const days = process.env.NEXT_PUBLIC_STUDIO_HOURS_DAYS.split(",")
      .map((d) => d.trim())
      .map((d) => DAYS_LOOKUP[d.toLowerCase()] || d)
      .filter(Boolean);
    if (days.length > 0) {
      return [
        {
          dayOfWeek: days,
          opens: process.env.NEXT_PUBLIC_STUDIO_HOURS_OPEN || "09:30",
          closes: process.env.NEXT_PUBLIC_STUDIO_HOURS_CLOSE || "19:00",
        },
      ];
    }
  }

  // 3. Dynamic parse from hours summary
  return parseWorkingHoursToOpeningHours(
    process.env.NEXT_PUBLIC_WORKING_HOURS_SUMMARY ||
      "Monday – Saturday: 9:30 AM – 7:00 PM IST (Sunday by Appointment)"
  );
}

export const siteConfig = {
  // Domain & Environment
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourphotography.com",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Your Photography",
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en-US",

  // Brand & Visual Identity
  brandTagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Capturing Moments, Creating Memories",
  brandTaglineHindi: process.env.NEXT_PUBLIC_BRAND_TAGLINE_HINDI || "क्षणों को कैद करना, यादें बनाना",
  brandSubtitle:
    process.env.NEXT_PUBLIC_BRAND_SUBTITLE ||
    "Professional fine-art, portrait, royal wedding, sports, and commercial photography across Jaipur, Rajasthan, and India.",
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || "/logo.svg",
  defaultOgImage:
    process.env.NEXT_PUBLIC_HERO_IMAGE_URL ||
    process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE ||
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&h=630&q=85",

  // Business Entity Details (LocalBusiness / PhotographyBusiness Schema)
  business: {
    legalName:
      process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME ||
      (process.env.NEXT_PUBLIC_SITE_NAME
        ? `${process.env.NEXT_PUBLIC_SITE_NAME} Studio`
        : "Your Photography Studio"),
    tradingName:
      process.env.NEXT_PUBLIC_BUSINESS_TRADING_NAME ||
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "Your Photography",
    foundingYear: process.env.NEXT_PUBLIC_FOUNDING_YEAR || "2014",
    priceRange: process.env.NEXT_PUBLIC_PRICE_RANGE || "₹₹₹",
    currenciesAccepted: process.env.NEXT_PUBLIC_CURRENCY || "INR",
    currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹",
    paymentAccepted:
      process.env.NEXT_PUBLIC_PAYMENT_ACCEPTED ||
      "UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit Card, Cash",

    // Contact Information
    email: process.env.NEXT_PUBLIC_STUDIO_EMAIL || "hello@yourphotography.com",
    phone: process.env.NEXT_PUBLIC_STUDIO_PHONE || "+91 98290 12345",
    phoneRaw: (process.env.NEXT_PUBLIC_STUDIO_PHONE || "+91 98290 12345").replace(/[^0-9+]/g, ""),
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919829012345",
    whatsappDisplay:
      process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ||
      process.env.NEXT_PUBLIC_STUDIO_PHONE ||
      "+91 98290 12345",

    // Physical Location (Jaipur, Rajasthan, India)
    address: {
      roomNo: process.env.NEXT_PUBLIC_ADDRESS_ROOM_NO || "Second Floor, Room No. 215",
      plusCode: process.env.NEXT_PUBLIC_ADDRESS_PLUS_CODE || "RV2J+5PQ",
      streetAddress:
        process.env.NEXT_PUBLIC_STUDIO_ADDRESS ||
        "Second Floor, Room No. 215, RV2J+5PQ, Karolan Ka Barh, Shri Kishanpura",
      addressLocality: process.env.NEXT_PUBLIC_ADDRESS_CITY || "Jaipur",
      addressRegion: process.env.NEXT_PUBLIC_ADDRESS_REGION || "Rajasthan",
      postalCode: process.env.NEXT_PUBLIC_ADDRESS_PINCODE || "302017",
      addressCountry: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || "IN",
      hindiAddress:
        process.env.NEXT_PUBLIC_STUDIO_HINDI_ADDRESS ||
        "कमरा नं. 215, द्वितीय तल, कैरोलन का बाड़, श्री किशनपुरा, जयपुर, राजस्थान 302017",
    },
    geo: {
      latitude: Number(process.env.NEXT_PUBLIC_GEO_LATITUDE) || 26.8285,
      longitude: Number(process.env.NEXT_PUBLIC_GEO_LONGITUDE) || 75.8654,
    },
    // Service Areas (Verified coverage)
    serviceAreas: process.env.NEXT_PUBLIC_SERVICE_AREAS
      ? process.env.NEXT_PUBLIC_SERVICE_AREAS.split(",").map((s) => s.trim())
      : [
          "Jaipur & Pink City Heritage Districts",
          "Jagatpura, Malviya Nagar, Tonk Road & C-Scheme, Jaipur",
          "Rajasthan Destination Weddings (Udaipur, Jodhpur, Jaisalmer, Pushkar)",
          "Delhi NCR & Pan-India Commissions",
        ],
    // Studio Operating Hours (Dynamic)
    openingHours: getInitialOpeningHours(),
    hoursSummary:
      process.env.NEXT_PUBLIC_WORKING_HOURS_SUMMARY ||
      "Monday – Saturday: 9:30 AM – 7:00 PM IST (Sunday by Appointment)",
  },

  // Photographer Lead Identity (Person Schema)
  photographer: {
    name: process.env.NEXT_PUBLIC_PHOTOGRAPHER_NAME || "Kishor Prem",
    role:
      process.env.NEXT_PUBLIC_PHOTOGRAPHER_ROLE ||
      "Principal Photographer & Creative Director",
    biography:
      process.env.NEXT_PUBLIC_PHOTOGRAPHER_BIO ||
      "Trained in classical fine-art and documentary photography with over 12 years of experience documenting royal palace weddings in Rajasthan, high-speed sports, editorial portraits, and cultural heritage across India.",
    portraitUrl:
      process.env.NEXT_PUBLIC_PHOTOGRAPHER_PORTRAIT ||
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80",
    experienceYears: process.env.NEXT_PUBLIC_EXPERIENCE_YEARS || "12+",
    awardsNote:
      process.env.NEXT_PUBLIC_AWARDS_NOTE ||
      "Published in international design and lifestyle editorials.",
  },

  // Social Profile URLs (Configurable via env or dynamic admin)
  socialProfiles: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/yourphotography",
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || "https://pinterest.com/yourphotography",
    fiveHundredPx: process.env.NEXT_PUBLIC_500PX_URL || "https://500px.com/p/yourphotography",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/yourphotography",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/@yourphotography",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/yourphotography",
  },

  // Search Engine Verification Placeholders
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || "",
  },

  // Analytics Placeholders (Only loaded when valid ID provided in environment)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
  },
};

export type SiteConfig = typeof siteConfig;

export type StudioSettingsInput = Partial<{
  studio_name: string;
  tagline: string;
  subtagline: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  address: string;
  hindi_address: string;
  working_hours: string;
  hero_image_url: string;
  photographer_name: string;
  photographer_role: string;
  photographer_portrait_url: string;
  photographer_bio_1: string;
  photographer_bio_2: string;
  stats_experience: string;
  instagram_url: string;
  facebook_url: string;
  pinterest_url: string;
  five_hundred_px_url: string;
  youtube_url: string;
}>;

/**
 * Utility to merge dynamic Supabase studio settings into siteConfig at runtime
 */
export function getMergedSiteConfig(settings?: StudioSettingsInput) {
  if (!settings) return siteConfig;
  return {
    ...siteConfig,
    siteName: settings.studio_name || siteConfig.siteName,
    brandTagline: settings.tagline || siteConfig.brandTagline,
    brandSubtitle: settings.subtagline || siteConfig.brandSubtitle,
    defaultOgImage: settings.hero_image_url || siteConfig.defaultOgImage,
    business: {
      ...siteConfig.business,
      tradingName: settings.studio_name || siteConfig.business.tradingName,
      legalName: settings.studio_name ? `${settings.studio_name} Studio` : siteConfig.business.legalName,
      email: settings.email || siteConfig.business.email,
      phone: settings.phone || siteConfig.business.phone,
      phoneRaw: (settings.phone || siteConfig.business.phone).replace(/[^0-9+]/g, ""),
      whatsappNumber: settings.whatsapp_number || siteConfig.business.whatsappNumber,
      whatsappDisplay: settings.phone || siteConfig.business.whatsappDisplay,
      address: {
        ...siteConfig.business.address,
        streetAddress: settings.address || siteConfig.business.address.streetAddress,
        hindiAddress: settings.hindi_address || siteConfig.business.address.hindiAddress,
      },
      hoursSummary: settings.working_hours || siteConfig.business.hoursSummary,
      openingHours: settings.working_hours
        ? parseWorkingHoursToOpeningHours(settings.working_hours)
        : siteConfig.business.openingHours,
    },
    photographer: {
      ...siteConfig.photographer,
      name: settings.photographer_name || siteConfig.photographer.name,
      role: settings.photographer_role || siteConfig.photographer.role,
      portraitUrl: settings.photographer_portrait_url || siteConfig.photographer.portraitUrl,
      biography: settings.photographer_bio_1 || siteConfig.photographer.biography,
      experienceYears: settings.stats_experience || siteConfig.photographer.experienceYears,
    },
    socialProfiles: {
      ...siteConfig.socialProfiles,
      instagram: settings.instagram_url || siteConfig.socialProfiles.instagram,
      facebook: settings.facebook_url || siteConfig.socialProfiles.facebook,
      pinterest: settings.pinterest_url || siteConfig.socialProfiles.pinterest,
      fiveHundredPx: settings.five_hundred_px_url || siteConfig.socialProfiles.fiveHundredPx,
      youtube: settings.youtube_url || siteConfig.socialProfiles.youtube,
    },
  };
}
