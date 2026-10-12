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
      "Explore editorial, fine-art, and personal branding portraits captured with authentic emotion, Pink City heritage, and natural illumination.",
    heroImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Warm editorial portrait showcasing authentic character and natural light in Jaipur",
  },
  {
    slug: "weddings",
    name: "Wedding Photography",
    title: "Wedding Photography Portfolio",
    description:
      "Timeless documentary royal wedding imagery documenting genuine love stories, palace pheras, and celebratory moments across Rajasthan.",
    heroImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Royal Indian wedding couple celebrating in traditional embroidered attire with palace illumination in Rajasthan",
  },
  {
    slug: "events",
    name: "Event Photography",
    title: "Event & Gala Photography Portfolio",
    description:
      "Comprehensive visual documentation for cultural festivals, Jaipur literature summits, corporate conferences, and private royal celebrations.",
    heroImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Atmospheric evening gala celebration with glowing candlelight and elegant guests in Jaipur",
  },
  {
    slug: "sports",
    name: "Sports Photography",
    title: "Sports & Athletic Photography Portfolio",
    description:
      "High-speed action photographs freezing split-second athletic intensity, cricket tournaments, polo chukkers, and championship triumph.",
    heroImage:
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "High-speed cricket batsman action during intense competitive match under stadium lights",
  },
  {
    slug: "nature-wildlife",
    name: "Nature & Wildlife",
    title: "Nature & Wildlife Photography Portfolio",
    description:
      "Fine-art wilderness landscapes and respectful animal encounters preserving the majesty of Ranthambore tigers and India's natural sanctuaries.",
    heroImage:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Majestic Royal Bengal Tiger roaming peacefully through dense forest foliage in Ranthambore",
  },
  {
    slug: "travel",
    name: "Travel Photography",
    title: "Travel & Heritage Photography Portfolio",
    description:
      "Expedition visual essays capturing architectural heritage, Hawa Mahal, Amer Fort, and sacred cultural wonders across India.",
    heroImage:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Hawa Mahal Palace of Winds in Jaipur caught in warm golden sunrise light",
  },
];

export const ALL_PORTFOLIO_ITEMS: DetailedPortfolioItem[] = [
  // Portraits
  {
    id: "port-1",
    title: "Royal Heritage Portrait",
    category: "Portrait Photography",
    categorySlug: "portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Editorial woman portrait bathed in warm late afternoon light with delicate catchlights against heritage palace backdrop",
    location: "Amer Fort, Jaipur",
    year: "2026",
    client: "Editorial Portfolio",
    aspectRatio: "portrait",
    description:
      "An intimate editorial portrait emphasizing natural warm reflections and authentic, contemplative expression amid historic stone textures.",
    technicalDetails: "85mm f/1.4 • 1/320s • ISO 100",
  },
  {
    id: "port-2",
    title: "Monochrome Studio Contours",
    category: "Portrait Photography",
    categorySlug: "portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Black and white studio portrait of a man looking forward with subtle directional lighting",
    location: "Studio 215, Shri Kishanpura, Jaipur",
    year: "2026",
    client: "Executive Branding",
    aspectRatio: "portrait",
    description:
      "High-contrast studio lighting capturing authentic character, sculptural bone structure, and quiet confidence in our Jaipur studio.",
    technicalDetails: "Sony FE 50mm F1.8 • 1/250s • f/2.8 • ISO 64",
  },
  {
    id: "port-3",
    title: "Patrika Gate Reverie",
    category: "Portrait Photography",
    categorySlug: "portraits",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Natural light outdoor portrait of a young woman with soft floral and architectural arches",
    location: "Patrika Gate, Jaipur",
    year: "2026",
    client: "Fine Art Series",
    aspectRatio: "portrait",
    description:
      "Soft morning light creating a timeless, painterly portrait harmonizing with the iconic vibrant architectural motifs of Jaipur.",
    technicalDetails: "105mm f/1.4 • 1/500s • ISO 100",
  },

  // Weddings
  {
    id: "wed-1",
    title: "Royal Palace Vows & Pheras",
    category: "Wedding Photography",
    categorySlug: "weddings",
    imageUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Indian bride and groom in royal wedding attire with palace illumination in Jaipur",
    location: "City Palace, Jaipur",
    year: "2026",
    client: "Aanya & Kabir",
    aspectRatio: "landscape",
    description:
      "Tender golden hour vows and emotional pheras surrounded by historic carved stone arches, marigold garlands, and palace illumination.",
    technicalDetails: "35mm f/1.4 • 1/1000s • ISO 200",
  },
  {
    id: "wed-2",
    title: "Heritage Bridal Splendor",
    category: "Wedding Photography",
    categorySlug: "weddings",
    imageUrl:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Intricate bridal veil and traditional embroidered dupatta caught in the breeze on a palace terrace",
    location: "Jagmandir Island Palace, Udaipur",
    year: "2026",
    client: "Pooja & Rohan",
    aspectRatio: "portrait",
    description:
      "Delicate handcrafted zardozi embroidery caught in the gentle evening lake breeze on a secluded palace terrace in Rajasthan.",
    technicalDetails: "50mm f/1.2 • 1/2000s • ISO 100",
  },
  {
    id: "wed-3",
    title: "First Dance in the Haveli Courtyard",
    category: "Wedding Photography",
    categorySlug: "weddings",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Wedding couple slow dancing outdoors under festive evening fairy lights in Rajasthan palace courtyard",
    location: "Samode Palace, Jaipur",
    year: "2026",
    client: "Meera & Siddharth",
    aspectRatio: "landscape",
    description:
      "Unscripted joy and spontaneous celebration under suspended fairy lights and starlit Rajasthani skies.",
    technicalDetails: "24-70mm f/2.8 • 1/160s • ISO 1600",
  },

  // Events
  {
    id: "eve-1",
    title: "Jaipur Cultural Literature Gala",
    category: "Event Photography",
    categorySlug: "events",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Long elegant banquet table with floral arrangements and candlelight inside a royal heritage hall",
    location: "Diggi Palace, Jaipur",
    year: "2026",
    client: "Literature & Arts Foundation",
    aspectRatio: "landscape",
    description:
      "Atmospheric evening celebrating cultural thought leaders under warm ambient candlelight and historic carved stone arches.",
    technicalDetails: "35mm f/1.4 • 1/200s • ISO 800",
  },
  {
    id: "eve-2",
    title: "Twilight Symphony at Albert Hall",
    category: "Event Photography",
    categorySlug: "events",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Concert stage with dynamic warm beam illumination over musicians in front of illuminated architectural facade",
    location: "Albert Hall Museum, Jaipur",
    year: "2026",
    client: "Rajasthan Music & Arts Festival",
    aspectRatio: "landscape",
    description:
      "Dynamic stage illumination and candid backstage energy captured during an open-air classical fusion performance in Jaipur.",
    technicalDetails: "70-200mm f/2.8 • 1/400s • ISO 3200",
  },

  // Sports
  {
    id: "spo-1",
    title: "The Decisive Cover Drive",
    category: "Sports Photography",
    categorySlug: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cricket batsman playing an exquisite cover drive under floodlights at Sawai Mansingh Stadium",
    location: "Sawai Mansingh Stadium, Jaipur",
    year: "2026",
    client: "Rajasthan Cricket League",
    aspectRatio: "landscape",
    description:
      "High-shutter capture freezing crisp seam rotation, bat speed, and intense athletic focus under stadium floodlights.",
    technicalDetails: "300mm f/2.8 • 1/3200s • ISO 400",
  },
  {
    id: "spo-2",
    title: "Royal Polo Chukker Adrenaline",
    category: "Sports Photography",
    categorySlug: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "High-speed competitive polo action freezing horses and players at full gallop on turf",
    location: "Jaipur Polo Club, Jaipur",
    year: "2026",
    client: "Jaipur Polo Association",
    aspectRatio: "portrait",
    description:
      "Dynamic telephoto capture carving through competitive chukker action with turf flying and mallets swung in synchronized precision.",
    technicalDetails: "Sony FE 200–600mm G OSS at 420mm • 1/4000s • f/6.3 • ISO 250",
  },
  {
    id: "spo-3",
    title: "Jaipur Marathon Finish Line",
    category: "Sports Photography",
    categorySlug: "sports",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Long-distance runner crossing the finish line with triumphant expression at sunrise",
    location: "JLN Marg, Jaipur",
    year: "2026",
    client: "Jaipur Marathon",
    aspectRatio: "landscape",
    description:
      "Airborne stride suspended against dawn light on the wide tree-lined boulevards of Jaipur, capturing supreme athletic endurance.",
    technicalDetails: "70-200mm f/2.8 • 1/1600s • ISO 1250",
  },

  // Nature & Wildlife
  {
    id: "nat-1",
    title: "Monarch of Ranthambore",
    category: "Nature & Wildlife",
    categorySlug: "nature-wildlife",
    imageUrl:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Royal Bengal Tiger striding silently along a jungle track in Ranthambore National Park",
    location: "Ranthambore Tiger Reserve, Rajasthan",
    year: "2026",
    client: "Rajasthan Wildlife Archive",
    aspectRatio: "landscape",
    description:
      "A breathtaking, respectful telephoto portrait of a dominant Royal Bengal tiger moving through the ancient dry deciduous forests of Ranthambore.",
    technicalDetails: "Sony FE 200–600mm G OSS at 560mm • 1/1250s • f/6.3 • ISO 640",
  },
  {
    id: "nat-2",
    title: "Thar Desert Mirage & Caravan",
    category: "Nature & Wildlife",
    categorySlug: "nature-wildlife",
    imageUrl:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Silhouetted camels and desert dunes in golden ripples under sunset sky in Rajasthan",
    location: "Sam Sand Dunes, Jaisalmer, Rajasthan",
    year: "2026",
    client: "Wilderness Heritage Project",
    aspectRatio: "landscape",
    description:
      "Golden hour shadows rolling across infinite rippling sand dunes as evening winds sweep through the Thar Desert.",
    technicalDetails: "70-200mm f/2.8 • 1/800s • f/8 • ISO 200",
  },

  // Travel & Heritage
  {
    id: "tra-1",
    title: "Hawa Mahal Palace of Winds",
    category: "Travel Photography",
    categorySlug: "travel",
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "The iconic red and pink sandstone honeycomb facade of Hawa Mahal in Jaipur glowing in morning sunlight",
    location: "Badi Choupad, Pink City, Jaipur",
    year: "2026",
    client: "Incredible India Heritage Series",
    aspectRatio: "landscape",
    description:
      "Intricate honeycomb architecture of Jaipur's 953 jharokhas bathed in soft morning light, capturing the soul of Rajasthan's Pink City.",
    technicalDetails: "24-70mm f/2.8 • 1/250s • f/8 • ISO 100",
  },
  {
    id: "tra-2",
    title: "Amer Fort Sentry & Maota Lake",
    category: "Travel Photography",
    categorySlug: "travel",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Amer Fort towering ramparts and yellow sandstone walls overlooking Maota Lake at dawn",
    location: "Amer Fort, Jaipur, Rajasthan",
    year: "2026",
    client: "Architectural Heritage Feature",
    aspectRatio: "landscape",
    description:
      "Towering 16th-century ramparts and golden sandstone bastions glowing above the calm waters of Maota Lake at sunrise.",
    technicalDetails: "35mm f/1.4 • 1/400s • ISO 100",
  },
];
