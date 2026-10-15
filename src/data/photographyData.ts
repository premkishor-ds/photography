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

// =========================================================================
// HINDI LOCALIZATION DICTIONARIES & HELPERS FOR SERVICES & PORTFOLIO
// =========================================================================

export const SERVICES_HINDI: Record<string, Partial<ServiceItem>> = {
  "portrait-service": {
    title: "पोर्ट्रेट फोटोग्राफी",
    tagline: "आपकी प्रामाणिक गरिमा को दर्शाने वाले आत्मीय, अभिव्यक्तिपूर्ण पोर्ट्रेट।",
    description: "कलाकारों, अधिकारियों, युगलों और कालातीत दृश्य उपस्थिति चाहने वाले व्यक्तियों के लिए विशेष रूप से तैयार पोर्ट्रेट सत्र।",
    duration: "1.5 – 2.5 घंटे",
    deliveryTime: "7 कार्य दिवस",
    deliverables: [
      "25+ क्यूरेटेड हाई-रिज़ॉल्यूशन एडिट्स",
      "निजी ऑनलाइन प्रूफिंग गैलरी",
      "पूर्ण व्यक्तिगत पुनरुत्पादन अधिकार",
      "स्टूडियो या आउटडोर प्राकृतिक प्रकाश",
      "स्टाइलिंग एवं परिधान मार्गदर्शन",
    ],
    detailedDescription: "हमारे पोर्ट्रेट सत्र शांत, तनावमुक्त और गहरे सहयोगात्मक होते हैं। चाहे आपको संपादकीय हेडशॉट, व्यक्तिगत ब्रांडिंग छवियों या विरासत पारिवारिक चित्र की आवश्यकता हो, हम वास्तविक भावों, अनुकूल प्राकृतिक रोशनी और सहज सौंदर्य पर ध्यान केंद्रित करते हैं।",
    idealFor: "कलाकार, संस्थापक, युगल, अभिनेता और व्यक्तिगत ब्रांडिंग।",
  },
  "wedding-service": {
    title: "विवाह फोटोग्राफी",
    tagline: "प्रेम के आपके उत्सव का वृत्तचित्र फाइन-आर्ट कवरेज।",
    description: "अविस्मरणीय वचनों और क्षणिक, अनकहे हार्दिक भावों दोनों को कैद करने वाली सहज, सिनेमाई कहानी।",
    duration: "8 – 12 घंटे कवरेज",
    deliveryTime: "3 – 4 सप्ताह (48 घंटे में स्नीक पीक)",
    deliverables: [
      "400+ कलर-ग्रेडेड मास्टर छवियां",
      "निःशुल्क सगाई पोर्ट्रेट सत्र",
      "दूसरा मुख्य फोटोग्राफर शामिल",
      "हस्तनिर्मित हेयरलूम फोटो बॉक्स एवं यूएसबी",
      "5-वर्षीय बैकअप के साथ अभिलेखीय ऑनलाइन गैलरी",
    ],
    detailedDescription: "हमारा मानना है कि शादियां जीवंत उत्सव हैं, कोई मंचित फोटो शूट नहीं। हमारा दस्तावेजी दृष्टिकोण उच्च-फैशन पोर्ट्रेट के साथ सहज वास्तविक कहानी को जोड़ता है, जिससे हर आंसू, हंसी और नृत्य चाल को गरिमा के साथ सहेजा जाता है।",
    idealFor: "शाही डेस्टिनेशन विवाह, पारंपरिक विवाह और भव्य उत्सव की योजना बनाने वाले युगल।",
  },
  "event-service": {
    title: "कार्यक्रम फोटोग्राफी",
    tagline: "गाला, भव्य शुभारंभ और निजी सभाओं के लिए गतिशील, परिष्कृत दस्तावेजीकरण।",
    description: "कॉर्पोरेट सम्मेलनों, लक्जरी गाला, कला प्रदर्शनियों और ऐतिहासिक वर्षगांठों के लिए व्यापक कवरेज।",
    duration: "आधा दिन से बहु-दिवसीय",
    deliveryTime: "48 – 72 घंटे एक्सप्रेस डिलीवरी",
    deliverables: [
      "व्यापक कार्यक्रम स्टोरीलाइन",
      "हाई-रेस और सोशल-अनुकूलित वेब निर्यात",
      "मेहमानों और मुख्य वक्ताओं का स्पष्ट दस्तावेजीकरण",
      "वीआईपी स्टेप-एंड-रिपीट कवरेज",
      "उसी दिन प्रेस मुख्य अंश उपलब्ध",
    ],
    detailedDescription: "प्रतिष्ठित मुख्य भाषणों से लेकर जीवंत निजी डिनर पार्टियों तक, हम माहौल, प्रमुख हस्तियों और जटिल विवरणों को कैद करते हैं जो आपके अवसर की प्रतिष्ठा का प्रतिनिधित्व करते हैं।",
    idealFor: "कॉर्पोरेट गाला, सांस्कृतिक शिखर सम्मेलन, लक्जरी ब्रांड लॉन्च और निजी समारोह।",
  },
  "sports-service": {
    title: "खेल फोटोग्राफी",
    tagline: "तीव्र एथलेटिक ऊर्जा और विजय का हाई-स्पीड, सिनेमाई दस्तावेजीकरण।",
    description: "पेशेवर हाई-स्पीड ऑप्टिक्स और गतिशील कोणों के साथ क्षणिक खेल कौशल, भावना और रोमांच को स्थिर करें।",
    duration: "आधा दिन / मैच कवरेज",
    deliveryTime: "24 – 48 घंटे त्वरित",
    deliverables: [
      "निरंतर बर्स्ट हाई-स्पीड एक्शन कैप्चर",
      "साइट पर तत्काल सोशल मीडिया हाइलाइट्स",
      "उच्च-रिज़ॉल्यूशन डिजिटल एथलीट गैलरी",
      "कमर्शियल एवं संपादकीय मीडिया अधिकार",
      "पीक-एक्शन कलर करेक्शन एवं शार्पनिंग",
    ],
    detailedDescription: "खेल फोटोग्राफी में तत्परता, त्वरित सजगता और टेलीफोटो सटीकता की आवश्यकता होती है। हम निर्णायक क्षणों को कैद करते हैं - सीम रोटेशन, एथलीट की आंखों में संकल्प, और विजयी टीम का जश्न।",
    idealFor: "स्पोर्ट्स क्लब, टूर्नामेंट, मैराथन कार्यक्रम, फिटनेस ब्रांड और एथलीट।",
  },
  "commercial-service": {
    title: "कमर्शियल फोटोग्राफी",
    tagline: "परिष्कृत दृश्य जो आपके ब्रांड की कहानी और उत्पाद आकर्षण को बढ़ाते हैं।",
    description: "सटीक कला निर्देशन के साथ लक्जरी ब्रांडों, वास्तुकारों, पाक कला विशेषज्ञों और विज्ञापन अभियानों के लिए रणनीतिक दृश्य सामग्री।",
    duration: "कस्टम प्रोजेक्ट आधार",
    deliveryTime: "उत्पादन समयसीमा के अनुसार",
    deliverables: [
      "कमर्शियल विज्ञापन लाइसेंस अधिकार",
      "स्टूडियो एवं ऑन-लोकेशन लाइटिंग सेटअप",
      "रचनात्मक निर्देशन एवं मूडबोर्ड विकास",
      "रीटचिंग एवं कम्पोजिट एडिटिंग",
      "रंग-सटीक प्रिंट तैयार CMYK और RGB फाइलें",
    ],
    detailedDescription: "हम ऐसी छवियां बनाने के लिए रचनात्मक निर्देशकों के साथ मिलकर काम करते हैं जो ध्यान आकर्षित करती हैं, ब्रांड के सौंदर्य का सम्मान करती हैं और दर्शकों को आकर्षित करती हैं।",
    idealFor: "वास्तुशिल्प फर्म, डिजाइनर परिधान, बुटीक होटल और प्रीमियम उत्पाद।",
  },
  "travel-wildlife-service": {
    title: "यात्रा एवं वन्यजीव फोटोग्राफी",
    tagline: "विस्मयकारी प्राकृतिक दुनिया को कैद करने वाली अभियान फोटोग्राफी।",
    description: "फाइन-आर्ट लैंडस्केप प्रिंट्स, संपादकीय यात्रा सुविधाएं, और दूरदराज के इलाकों में संरक्षण कहानी आयोग।",
    duration: "अभियान एवं असाइनमेंट",
    deliveryTime: "कस्टम डिलीवरी",
    deliverables: [
      "संपादकीय प्रिंट एवं प्रकाशन लाइसेंस",
      "संग्रहालय-ग्रेड फाइन आर्ट गैलरी प्रिंट्स",
      "फील्ड कहानियां और दस्तावेजी निबंध",
      "ड्रोन / हवाई परिप्रेक्ष्य विकल्प",
      "अभिलेखीय रॉ मेटाडेटा प्रमाणीकरण",
    ],
    detailedDescription: "प्राकृतिक आवासों के प्रति सम्मान और धैर्य के साथ, हम नाजुक पारिस्थितिकी तंत्र, लुभावने भूवैज्ञानिक चमत्कारों और सांस्कृतिक विरासत को संग्रहालय-ग्रेड सटीकता के साथ चित्रित करते हैं।",
    idealFor: "प्रकाशन, इको-टूरिज्म लॉज, संरक्षण एनजीओ और निजी कला संग्रहकर्ता।",
  },
};

export const PORTFOLIO_ITEMS_HINDI: Record<string, Partial<PortfolioItem>> = {
  "port-1": {
    title: "शाही धरोहर पोर्ट्रेट",
    location: "आमेर किला, जयपुर",
    description: "ऐतिहासिक पत्थर की बनावट के बीच प्राकृतिक गर्म प्रतिबिंबों और प्रामाणिक चरित्र पर जोर देने वाला संपादकीय चित्र।",
  },
  "wed-1": {
    title: "शाही महल में फेरे एवं वचन",
    location: "सिटी पैलेस, जयपुर",
    description: "ऐतिहासिक नक्काशीदार पत्थर के मेहराबों और महल की रोशनी के बीच भावुक फेरे और शाम के वचन।",
  },
  "spo-1": {
    title: "निर्णायक कवर ड्राइव",
    location: "सवाई मानसिंह स्टेडियम, जयपुर",
    description: "स्टेडियम की रोशनी में तेज सीम रोटेशन, बल्ले की गति और गहन एथलेटिक फोकस को स्थिर करता हाई-शटर कैप्चर।",
  },
  "eve-1": {
    title: "जयपुर सांस्कृतिक साहित्य समारोह",
    location: "डिग्गी पैलेस, जयपुर",
    description: "गर्म मोमबत्ती की रोशनी और नक्काशीदार मेहराबों के नीचे सांस्कृतिक विचारकों की शाम का दस्तावेजीकरण।",
  },
  "nat-1": {
    title: "रणथंभौर का अधिपति",
    location: "रणथंभौर टाइगर रिजर्व, राजस्थान",
    description: "रणथंभौर के प्राचीन जंगलों से गुजरते एक प्रमुख रॉयल बंगाल टाइगर का शांत, राजसी टेलीफोटो पोर्ट्रेट।",
  },
  "tra-1": {
    title: "हवा महल - झरोखों की नगरी",
    location: "बड़ी चौपड़, परकोटा, जयपुर",
    description: "सुबह की कोमल धूप में नहाए जयपुर के 953 झरोखों की जटिल स्थापत्य कला, जो राजस्थान की आत्मा को दर्शाती है।",
  },
  "spo-2": {
    title: "रॉयल पोलो चक्कर रोमांच",
    location: "जयपुर पोलो क्लब, जयपुर",
    description: "उड़ती धूल और हवा में लहराते मैलेट के साथ प्रतिस्पर्धी चक्कर एक्शन को दर्शाता गतिशील शॉट।",
  },
  "port-2": {
    title: "मोनोक्रोम स्टूडियो रूपरेखा",
    location: "स्टूडियो 215, श्री किशनपुरा, जयपुर",
    description: "हमारे जयपुर स्टूडियो में प्रामाणिक चरित्र और शांत शक्ति को उजागर करती हाई-कंट्रास्ट स्टूडियो लाइटिंग।",
  },
  "wed-2": {
    title: "पारंपरिक दुल्हन का वैभव",
    location: "जगमंदिर द्वीप पैलेस, उदयपुर",
    description: "राजस्थान के एक एकांत महल की छत पर शाम की झील की ठंडी हवा में कैद नाजुक जरदोजी कढ़ाई।",
  },
  "nat-2": {
    title: "थार मरुस्थल मरीचिका एवं कारवां",
    location: "सैम सैंड ड्यून्स, जैसलमेर",
    description: "थार रेगिस्तान में शाम की हवा के साथ अंतहीन लहरदार रेत के टीलों पर ढलती सुनहरी छाया।",
  },
  "tra-2": {
    title: "आमेर दुर्ग एवं मावठा सरोवर",
    location: "आमेर किला, जयपुर",
    description: "सूर्योदय के समय मावठा झील के शांत पानी के ऊपर चमकते 16वीं सदी के प्राचीर और सुनहरे बलुआ पत्थर के बुर्ज।",
  },
  "eve-2": {
    title: "अल्बर्ट हॉल पर शाम की सिम्फनी",
    location: "अल्बर्ट हॉल म्यूजियम, जयपुर",
    description: "खुले आसमान के नीचे शास्त्रीय संलयन प्रदर्शन के दौरान मंच की रोशनी और जीवंत बैकस्टेज ऊर्जा।",
  },
};

export function getLocalizedService(service: ServiceItem, lang: "en" | "hi"): ServiceItem {
  if (lang !== "hi") return service;
  // Match by id or title
  const match = SERVICES_HINDI[service.id] ||
    Object.values(SERVICES_HINDI).find((s) => s.title === service.title) ||
    SERVICES_HINDI[`${service.id}-service`];
  if (!match) return service;
  return {
    ...service,
    title: match.title || service.title,
    tagline: match.tagline || service.tagline,
    description: match.description || service.description,
    duration: match.duration || service.duration,
    deliveryTime: match.deliveryTime || service.deliveryTime,
    deliverables: match.deliverables || service.deliverables,
    detailedDescription: match.detailedDescription || service.detailedDescription,
    idealFor: match.idealFor || service.idealFor,
  };
}

export function getLocalizedPortfolioItem(item: PortfolioItem, lang: "en" | "hi"): PortfolioItem {
  if (lang !== "hi") return item;
  const match = PORTFOLIO_ITEMS_HINDI[item.id];
  if (!match) return item;
  return {
    ...item,
    title: match.title || item.title,
    location: match.location || item.location,
    description: match.description || item.description,
  };
}
