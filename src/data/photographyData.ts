import { siteConfig } from "@/config/siteConfig";

export interface PortfolioItem {
  id: string;
  title: string;
  category:
    | "Portrait Photography"
    | "Wedding Photography"
    | "Event Photography"
    | "Sports Photography"
    | "Nature & Wildlife"
    | "Travel Photography";
  imageUrl: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  location: string;
  year: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  duration: string;
  deliveryTime: string;
  deliverables: string[];
  detailedDescription: string;
  idealFor: string;
}

export interface PhotographerInfo {
  name: string;
  role: string;
  bioParagraph1: string;
  bioParagraph2: string;
  quote: string;
  portraitUrl: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const PORTFOLIO_CATEGORIES = [
  "All Works",
  "Portrait Photography",
  "Wedding Photography",
  "Event Photography",
  "Sports Photography",
  "Nature & Wildlife",
  "Travel Photography",
] as const;

/**
 * INITIAL SEED & OFFLINE BUILD FALLBACK
 * Active portfolio items are loaded dynamically from Supabase at runtime (/api/admin/portfolio)
 * and can be added, updated, or deleted live from the /admin portal.
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Royal Heritage Portrait",
    category: "Portrait Photography",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Amer Fort, Jaipur",
    year: "2026",
    description: "An intimate editorial portrait emphasizing natural warm reflections and authentic character amid historic stone textures.",
  },
  {
    id: "wed-1",
    title: "Royal Palace Vows & Pheras",
    category: "Wedding Photography",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "City Palace, Jaipur",
    year: "2026",
    description: "Tender golden hour vows and emotional pheras surrounded by historic carved stone arches and palace illumination.",
  },
  {
    id: "spo-1",
    title: "The Decisive Cover Drive",
    category: "Sports Photography",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Sawai Mansingh Stadium, Jaipur",
    year: "2026",
    description: "High-shutter capture freezing crisp seam rotation, bat speed, and intense athletic focus under stadium floodlights.",
  },
  {
    id: "eve-1",
    title: "Jaipur Cultural Literature Gala",
    category: "Event Photography",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Diggi Palace, Jaipur",
    year: "2026",
    description: "Atmospheric evening celebrating cultural thought leaders under warm ambient candlelight and historic carved arches.",
  },
  {
    id: "nat-1",
    title: "Monarch of Ranthambore",
    category: "Nature & Wildlife",
    imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Ranthambore Tiger Reserve, Rajasthan",
    year: "2026",
    description: "A breathtaking, respectful telephoto portrait of a dominant Royal Bengal tiger moving through the ancient forests of Ranthambore.",
  },
  {
    id: "tra-1",
    title: "Hawa Mahal Palace of Winds",
    category: "Travel Photography",
    imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Badi Choupad, Pink City, Jaipur",
    year: "2026",
    description: "Intricate honeycomb architecture of Jaipur's 953 jharokhas bathed in soft morning light, capturing the soul of Rajasthan.",
  },
  {
    id: "spo-2",
    title: "Royal Polo Chukker Adrenaline",
    category: "Sports Photography",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Jaipur Polo Club, Jaipur",
    year: "2026",
    description: "Dynamic telephoto capture carving through competitive chukker action with turf flying and mallets swung in synchronized precision.",
  },
  {
    id: "port-2",
    title: "Monochrome Studio Contours",
    category: "Portrait Photography",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Studio 215, Shri Kishanpura, Jaipur",
    year: "2026",
    description: "High-contrast studio lighting capturing authentic character and quiet strength in our flagship Jaipur studio.",
  },
  {
    id: "wed-2",
    title: "Heritage Bridal Splendor",
    category: "Wedding Photography",
    imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Jagmandir Island Palace, Udaipur",
    year: "2026",
    description: "Delicate handcrafted zardozi embroidery caught in the gentle evening lake breeze on a secluded palace terrace in Rajasthan.",
  },
  {
    id: "nat-2",
    title: "Thar Desert Mirage & Caravan",
    category: "Nature & Wildlife",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Sam Sand Dunes, Jaisalmer, Rajasthan",
    year: "2026",
    description: "Golden hour shadows rolling across infinite rippling sand dunes as evening winds sweep through the Thar Desert.",
  },
  {
    id: "tra-2",
    title: "Amer Fort Sentry & Maota Lake",
    category: "Travel Photography",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Amer Fort, Jaipur, Rajasthan",
    year: "2026",
    description: "Towering 16th-century ramparts and golden sandstone bastions glowing above the calm waters of Maota Lake at sunrise.",
  },
  {
    id: "eve-2",
    title: "Twilight Symphony at Albert Hall",
    category: "Event Photography",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Albert Hall Museum, Jaipur",
    year: "2026",
    description: "Dynamic stage illumination and candid backstage energy captured during an open-air classical fusion performance in Jaipur.",
  },
];

/**
 * INITIAL SEED & OFFLINE BUILD FALLBACK
 * Active services and pricing are loaded dynamically from Supabase at runtime (/api/admin/services)
 * and can be added, updated, or deleted live from the /admin portal ("Services & Pricing Management").
 */
export const SERVICES: ServiceItem[] = [
  {
    id: "portrait-service",
    title: "Portrait Photography",
    tagline: "Intimate, expressive portraits reflecting your authentic essence.",
    description:
      "Carefully tailored portrait sessions for artists, executives, couples, and individuals looking for timeless visual presence.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    duration: "1.5 – 2.5 Hours",
    deliveryTime: "7 business days",
    deliverables: [
      "25+ Curated high-resolution edits",
      "Private online proofing gallery",
      "Full personal reproduction rights",
      "Studio or outdoor natural lighting",
      "Styling & wardrobe guidance",
    ],
    detailedDescription:
      "Our portrait sessions are relaxed, unhurried, and deeply collaborative. Whether you need an editorial headshot, personal branding images, or a legacy family portrait, we focus on genuine gestures, flattering natural illumination, and an effortless aesthetic.",
    idealFor: "Artists, founders, couples, actors, and personal branding.",
  },
  {
    id: "wedding-service",
    title: "Wedding Photography",
    tagline: "Documentary fine-art coverage of your celebration of love.",
    description:
      "Unobtrusive, cinematic storytelling capturing both monumental vows and fleeting, heartfelt unscripted glances.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    duration: "8 – 12 Hours Coverage",
    deliveryTime: "3 – 4 weeks (48h Sneak Peek)",
    deliverables: [
      "400+ Color-graded master images",
      "Complimentary engagement portrait session",
      "Second lead photographer included",
      "Handcrafted heirloom photo box & USB",
      "Archival online gallery with 5-year backup",
    ],
    detailedDescription:
      "We believe weddings are living celebrations, not staged photo shoots. Our documentary approach blends organic candid storytelling with high-fashion portraits, ensuring every tear, laugh, and dance move is preserved with warmth and timeless grace.",
    idealFor: "Couples planning intimate elopements, destination weddings, and grand celebrations.",
  },
  {
    id: "event-service",
    title: "Event Photography",
    tagline: "Dynamic, polished documentation for galas, launches, and private gatherings.",
    description:
      "Discreet and comprehensive coverage for corporate conferences, luxury galas, art exhibitions, and milestone anniversaries.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    duration: "Half-Day to Multi-Day",
    deliveryTime: "48 – 72 hours express delivery",
    deliverables: [
      "Comprehensive event storyline",
      "High-res and social-optimized web exports",
      "Candid guest & keynote documentation",
      "VIP step-and-repeat coverage",
      "Same-day press highlights available",
    ],
    detailedDescription:
      "From high-profile keynote addresses to lively private dinner parties, we capture the ambiance, key personalities, and intricate details that represent the success and prestige of your occasion.",
    idealFor: "Corporate galas, cultural summits, luxury brand activations, and private dinners.",
  },
  {
    id: "sports-service",
    title: "Sports Photography",
    tagline: "High-speed, cinematic documentation of raw athletic intensity and triumph.",
    description:
      "Freeze split-second athleticism, emotion, and tournament adrenaline with pro-grade high-speed optics and dynamic angles.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    duration: "Half-Day / Match Coverage",
    deliveryTime: "24 – 48 hours expedited",
    deliverables: [
      "Continuous burst high-speed action captures",
      "On-site immediate social highlight selects",
      "High-resolution digital athlete gallery",
      "Commercial & editorial media rights",
      "Peak-action color correction & sharpening",
    ],
    detailedDescription:
      "Sports photography requires anticipation, lightning reflexes, and telephoto precision. We capture the decisive moments — the buzzer-beating leap, the grit in an athlete's eyes, and the roaring team celebration — with unmatched clarity and cinematic drama.",
    idealFor: "Athletic clubs, sporting tournaments, marathon events, fitness brands, and individual athletes.",
  },
  {
    id: "commercial-service",
    title: "Commercial Photography",
    tagline: "Sophisticated visuals that elevate your brand story and product appeal.",
    description:
      "Strategic visual content for luxury brands, architects, culinary masters, and advertising campaigns with meticulous art direction.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    duration: "Custom Project Basis",
    deliveryTime: "Per production timeline",
    deliverables: [
      "Commercial advertising license rights",
      "Studio & on-location lighting setups",
      "Creative direction & moodboard development",
      "Retouching & composite editing",
      "Color-accurate print ready CMYK and RGB files",
    ],
    detailedDescription:
      "We work closely with creative directors and marketing teams to produce imagery that commands attention, honors brand aesthetics, and converts viewers into loyal patrons across digital and print mediums.",
    idealFor: "Architectural firms, designer apparel, boutique hotels, and consumer goods.",
  },
  {
    id: "travel-wildlife-service",
    title: "Travel & Wildlife Photography",
    tagline: "Expedition photography capturing the awe-inspiring raw natural world.",
    description:
      "Fine-art landscape prints, editorial travel features, and conservation storytelling commissions across remote terrains.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    duration: "Expedition & Assignment",
    deliveryTime: "Custom delivery",
    deliverables: [
      "Editorial print and publishing licensing",
      "Museum-grade fine art gallery prints",
      "Field stories and documentary essays",
      "Drone / Aerial perspective options",
      "Archival raw metadata certification",
    ],
    detailedDescription:
      "With respect for wild habitats and keen patience, we document fragile ecosystems, breathtaking geological wonders, and cultural heritage across all continents with museum-grade precision.",
    idealFor: "Publications, eco-tourism lodges, conservation NGO organizations, and private art collectors.",
  },
];

export const PHOTOGRAPHER_INFO: PhotographerInfo = {
  name: siteConfig.photographer.name,
  role: siteConfig.photographer.role,
  bioParagraph1:
    "For over twelve years, I have dedicated my life to the delicate art of seeing. Photography, to me, is not merely capturing what is before the lens, but feeling the heartbeat of a fleeting moment and preserving it before it disappears into memory.",
  bioParagraph2:
    "Trained in classical fine-art, documentary, and dynamic action photography, my style blends soft, warm natural light with subtle editorial composition. I look for the unscripted pauses: the quiet touch of hands before vows, the fleeting glint in an eye, or the explosive energy of an athlete in mid-air.",
  quote:
    "“Light reveals what exists; emotion reveals what truly matters.”",
  portraitUrl: siteConfig.photographer.portraitUrl,
  stats: [
    { label: "Years of Craft", value: siteConfig.photographer.experienceYears },
    { label: "Sessions Completed", value: "650+" },
    { label: "Weddings Documented", value: "180+" },
    { label: "Editorial Features", value: "24+" },
  ],
};

export const CONTACT_DETAILS = {
  email: siteConfig.business.email,
  phone: siteConfig.business.phone,
  whatsappNumber: siteConfig.business.whatsappNumber,
  whatsappDisplay: siteConfig.business.whatsappDisplay,
  address: `${siteConfig.business.address.streetAddress}, ${siteConfig.business.address.addressLocality}, ${siteConfig.business.address.addressRegion} ${siteConfig.business.address.postalCode}`,
  hindiAddress: siteConfig.business.address.hindiAddress,
  workingHours: siteConfig.business.hoursSummary || "Monday – Saturday: 9:30 AM – 7:00 PM IST (Sunday by Appointment)",
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@yourphotography",
  instagramUrl: siteConfig.socialProfiles.instagram,
  pinterestUrl: siteConfig.socialProfiles.pinterest,
  fiveHundredPxUrl: siteConfig.socialProfiles.fiveHundredPx,
  facebookUrl: siteConfig.socialProfiles.facebook,
  youtubeUrl: siteConfig.socialProfiles.youtube,
};
