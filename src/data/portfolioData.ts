export interface PortfolioCategoryMeta {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
}

export interface DetailedPortfolioItem {
  id: string;
  title: string;
  category: string;
  categorySlug: string;
  imageUrl: string;
  imageAlt: string;
  location: string;
  year: string;
  client?: string;
  aspectRatio: "portrait" | "landscape" | "square";
  description: string;
  technicalDetails?: string;
}

export const PORTFOLIO_CATEGORIES_META: PortfolioCategoryMeta[] = [
  {
    slug: "portraits",
    name: "Portrait Photography",
    title: "Portrait Photography Portfolio",
    description:
      "Explore editorial, fine-art, and personal branding portraits captured with authentic emotion and natural illumination.",
    heroImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Warm editorial portrait showcasing authentic character and natural light",
  },
  {
    slug: "weddings",
    name: "Wedding Photography",
    title: "Wedding Photography Portfolio",
    description:
      "Timeless documentary wedding imagery documenting genuine love stories, emotional vows, and celebratory moments.",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Couple sharing an intimate sunset moment during an outdoor wedding ceremony",
  },
  {
    slug: "events",
    name: "Event Photography",
    title: "Event & Gala Photography Portfolio",
    description:
      "Comprehensive visual documentation for cultural galas, corporate conferences, and private celebrations.",
    heroImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Atmospheric evening gala celebration with glowing candlelight and elegant guests",
  },
  {
    slug: "sports",
    name: "Sports Photography",
    title: "Sports & Athletic Photography Portfolio",
    description:
      "High-speed action photographs freezing split-second athletic intensity, endurance, and championship triumph.",
    heroImage:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Sprinter accelerating forward on a stadium track in high-contrast light",
  },
  {
    slug: "nature-wildlife",
    name: "Nature & Wildlife",
    title: "Nature & Wildlife Photography Portfolio",
    description:
      "Fine-art wilderness landscapes and respectful animal encounters preserving the majesty of our natural world.",
    heroImage:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Misty mountain peaks and sunrise glow spreading across alpine valleys",
  },
  {
    slug: "travel",
    name: "Travel Photography",
    title: "Travel & Editorial Photography Portfolio",
    description:
      "Expedition visual essays capturing architectural heritage, cultural soul, and remote geographical wonders.",
    heroImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Majestic granite monoliths reflected across pristine glacial valley lake",
  },
];

export const ALL_PORTFOLIO_ITEMS: DetailedPortfolioItem[] = [
  // Portraits
  {
    id: "port-1",
    title: "Golden Hour Solitude",
    category: "Portrait Photography",
    categorySlug: "portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Editorial woman portrait bathed in warm late afternoon window light with delicate catchlights",
    location: "Studio Minimalist, Soho, NY",
    year: "2026",
    client: "Editorial Portfolio",
    aspectRatio: "portrait",
    description:
      "An intimate editorial portrait emphasizing natural warm reflections and authentic, contemplative expression.",
    technicalDetails: "85mm f/1.4 • 1/320s • ISO 100",
  },
  {
    id: "port-2",
    title: "Monochrome Contours",
    category: "Portrait Photography",
    categorySlug: "portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Black and white studio portrait of a man looking forward with subtle side lighting",
    location: "SOHO Loft, New York",
    year: "2026",
    client: "Executive Branding",
    aspectRatio: "portrait",
    description:
      "High-contrast studio lighting capturing authentic character, sculptural bone structure, and quiet confidence.",
    technicalDetails: "Sony FE 50mm F1.8 • 1/250s • f/2.8 • ISO 64",
  },
  {
    id: "port-3",
    title: "Luminous Reverie",
    category: "Portrait Photography",
    categorySlug: "portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Natural light outdoor portrait of a young woman with soft bokeh foliage background",
    location: "Hudson Valley, NY",
    year: "2026",
    client: "Fine Art Series",
    aspectRatio: "portrait",
    description:
      "Soft window light creating a timeless, painterly portrait with warm tonal balance and effortless elegance.",
    technicalDetails: "105mm f/1.4 • 1/500s • ISO 100",
  },

  // Weddings
  {
    id: "wed-1",
    title: "Tuscan Sunset Vows",
    category: "Wedding Photography",
    categorySlug: "weddings",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bride and groom standing together on a Tuscan hillside overlooking golden vineyard valley",
    location: "Val d'Orcia, Tuscany",
    year: "2026",
    client: "Elena & Marco",
    aspectRatio: "landscape",
    description:
      "Tender golden hour vows surrounded by centuries-old olive groves, cypress trees, and warm terracotta hills.",
    technicalDetails: "35mm f/1.4 • 1/1000s • ISO 200",
  },
  {
    id: "wed-2",
    title: "Ephemeral Veil",
    category: "Wedding Photography",
    categorySlug: "weddings",
    imageUrl:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Delicate sheer bridal veil floating in the wind against coastal sea backdrop",
    location: "Provence, France",
    year: "2026",
    client: "Claire & Thomas",
    aspectRatio: "portrait",
    description:
      "Delicate lace caught in gentle Mediterranean sea breeze on a secluded sunlit stone terrace.",
    technicalDetails: "50mm f/1.2 • 1/2000s • ISO 100",
  },
  {
    id: "wed-3",
    title: "First Dance in the Courtyard",
    category: "Wedding Photography",
    categorySlug: "weddings",
    imageUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Wedding couple slow dancing outdoors under festive evening fairy lights",
    location: "Amalfi Coast, Italy",
    year: "2026",
    client: "Sophia & Liam",
    aspectRatio: "landscape",
    description:
      "Unscripted joy and spontaneous motion under suspended fairy lights and starlit Mediterranean skies.",
    technicalDetails: "24-70mm f/2.8 • 1/160s • ISO 1600",
  },

  // Events
  {
    id: "eve-1",
    title: "The Grand Gala Celebration",
    category: "Event Photography",
    categorySlug: "events",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Long elegant banquet table with floral arrangements and glassware inside a grand hall",
    location: "Metropolitan Pavilion, NY",
    year: "2026",
    client: "Arts Philanthropy Gala",
    aspectRatio: "landscape",
    description:
      "Atmospheric evening celebrating cultural excellence under warm ambient candlelight and crystal chandeliers.",
    technicalDetails: "35mm f/1.4 • 1/200s • ISO 800",
  },
  {
    id: "eve-2",
    title: "Symphony in Motion",
    category: "Event Photography",
    categorySlug: "events",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Concert stage with dynamic purple and amber beam illumination over musicians",
    location: "Carnegie Hall, NY",
    year: "2026",
    client: "Global Music Festival",
    aspectRatio: "landscape",
    description:
      "Dynamic stage illumination and candid backstage energy captured during live orchestral performance.",
    technicalDetails: "70-200mm f/2.8 • 1/400s • ISO 3200",
  },

  // Sports
  {
    id: "spo-1",
    title: "Velocity & Grit",
    category: "Sports Photography",
    categorySlug: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sprinter starting burst forward out of starting blocks on outdoor track",
    location: "National Athletic Stadium",
    year: "2026",
    client: "Athletics Federation",
    aspectRatio: "landscape",
    description:
      "High-shutter capture freezing peak athletic propulsion and raw competitive focus in championship qualifiers.",
    technicalDetails: "300mm f/2.8 • 1/3200s • ISO 400",
  },
  {
    id: "spo-2",
    title: "Ocean Wave Precision",
    category: "Sports Photography",
    categorySlug: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Surfer inside a hollow crystal blue wave barrel with sea spray catching light",
    location: "North Shore, Hawaii",
    year: "2026",
    client: "Ocean Sports Magazine",
    aspectRatio: "portrait",
    description:
      "Dynamic telephoto capture carving through the barrel of a sunset swell with spray droplets frozen in air.",
    technicalDetails: "Sony FE 200–600mm G OSS at 420mm • 1/4000s • f/6.3 • ISO 250",
  },
  {
    id: "spo-3",
    title: "The Decisive Jump",
    category: "Sports Photography",
    categorySlug: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Basketball player airborne for a slam dunk against urban outdoor court skyline",
    location: "Rucker Park, New York",
    year: "2026",
    client: "Streetball Invitational",
    aspectRatio: "landscape",
    description:
      "Airborne mid-shot suspended against twilight urban court lighting, capturing athletic height and intensity.",
    technicalDetails: "70-200mm f/2.8 • 1/1600s • ISO 1250",
  },

  // Nature & Wildlife
  {
    id: "nat-1",
    title: "Misty Alpine Dawn",
    category: "Nature & Wildlife",
    categorySlug: "nature-wildlife",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Jagged alpine limestone peaks rising above thick clouds at dawn with golden summits",
    location: "Dolomites, Italy",
    year: "2026",
    client: "Fine Art Print Archive",
    aspectRatio: "landscape",
    description:
      "First light piercing morning fog cascades across jagged limestone peaks in the northern Italian Alps.",
    technicalDetails: "24-70mm f/2.8 • 1/80s • f/11 • ISO 64",
  },
  {
    id: "nat-2",
    title: "Majesty of the Forest Stag",
    category: "Nature & Wildlife",
    categorySlug: "nature-wildlife",
    imageUrl:
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Red deer stag with large antlers standing quietly in a misty pine forest",
    location: "Scottish Highlands",
    year: "2026",
    client: "Wilderness Heritage Project",
    aspectRatio: "landscape",
    description:
      "A silent encounter with a red stag emerging from dense autumn pine woodland in morning fog.",
    technicalDetails: "Sony FE 200–600mm G OSS at 580mm • 1/1000s • f/6.3 • ISO 800",
  },

  // Travel
  {
    id: "tra-1",
    title: "Sanctuary of the Valleys",
    category: "Travel Photography",
    categorySlug: "travel",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Yosemite Valley river reflecting towering granite cliffs surrounded by evergreen pine forests",
    location: "Yosemite Valley, California",
    year: "2026",
    client: "National Parks Expedition",
    aspectRatio: "landscape",
    description:
      "Reflections in the emerald waters beneath monumental granite cliffs on a crisp autumn sunrise.",
    technicalDetails: "16-35mm f/2.8 • 1/60s • f/8 • ISO 100",
  },
  {
    id: "tra-2",
    title: "Old World Echoes",
    category: "Travel Photography",
    categorySlug: "travel",
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Narrow European cobblestone street lined with warm yellow vintage townhouses",
    location: "Lisbon, Portugal",
    year: "2026",
    client: "Architectural Travel Feature",
    aspectRatio: "landscape",
    description:
      "Warm terracotta tiles, classic tram rails, and timeless cobblestone alleys basking in gentle morning light.",
    technicalDetails: "35mm f/1.4 • 1/400s • ISO 100",
  },
];
