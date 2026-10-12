import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.qvzvnblosedrqktisdsz',
  password: 'jYzfeQKv2jqIStoX',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
});

const ITEMS = [
  {
    id: "gear-sony-a7-v",
    slug: "sony-a7-v",
    name: "Sony A7 V",
    manufacturer: "Sony",
    category: "camera-bodies",
    categoryLabel: "Full-frame mirrorless camera",
    modelNumber: "ILCE-7M5 (Tentative / Unverified)",
    description: "Next-generation full-frame hybrid mirrorless camera body combining advanced subject recognition autofocus, wide dynamic exposure latitude, and high-speed continuous shooting across diverse lighting environments.",
    primaryUses: ["Wildlife Photography", "Sports Photography", "Portrait Photography", "Travel Photography"],
    compatibility: "Sony E-mount full-frame lenses (native), Sony E-mount APS-C lenses (auto crop mode), Dual CFexpress Type A / SD UHS-II hybrid memory slots.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony A7 V full-frame mirrorless camera body",
    specifications: [
      { label: "Sensor Format", value: "35mm Full-Frame BSI CMOS Sensor" },
      { label: "Autofocus Engine", value: "AI-Powered Real-Time Recognition (Human, Animal, Bird, Vehicle)" },
      { label: "Image Stabilization", value: "5-Axis In-Body Optical SteadyShot" },
      { label: "Card Slots", value: "Dual CFexpress Type A / SD UHS-II Hybrid" },
      { label: "Continuous Burst", value: "Up to 10+ fps with full continuous AF/AE tracking" },
      { label: "Video Recording", value: "4K 60p 10-bit 4:2:2 internal capture" },
      { label: "Weight", value: "Approx. 658g (with battery and memory card)" }
    ],
    reviewUrl: "/photography-gear/sony-a7-v",
    relatedPortfolioUrls: [
      { label: "Portraits", url: "/portfolio/portraits" },
      { label: "Sports & Action", url: "/portfolio/sports" }
    ],
    ownershipStatus: "Active Primary Body",
    published: true
  },
  {
    id: "gear-sony-a6000",
    slug: "sony-a6000",
    name: "Sony A6000",
    manufacturer: "Sony",
    category: "camera-bodies",
    categoryLabel: "APS-C mirrorless camera",
    modelNumber: "ILCE-6000",
    description: "Compact, proven APS-C mirrorless camera body delivering dependable Fast Hybrid autofocus, lightweight handling, and high-resolution APS-C image capture for everyday and secondary kit photography.",
    primaryUses: ["Photography with an APS-C camera system", "Lightweight Travel Documentation", "Secondary Backup Camera Body", "Street & Everyday Photography"],
    compatibility: "Sony E-mount APS-C lenses, Sony E-mount full-frame lenses (1.5x crop factor), SD / SDHC / SDXC memory cards.",
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony A6000 compact APS-C mirrorless camera body",
    specifications: [
      { label: "Sensor Format", value: "24.3 MP APS-C Exmor APS HD CMOS" },
      { label: "Autofocus Engine", value: "Fast Hybrid AF (179-point phase detection / 25-point contrast)" },
      { label: "Burst Rate", value: "Up to 11 fps with continuous AF tracking" },
      { label: "ISO Sensitivity Range", value: "ISO 100–25,600" },
      { label: "Viewfinder", value: "0.39-inch OLED Tru-Finder EVF (1.44M dots)" },
      { label: "Card Slots", value: "Single SD / Memory Stick PRO Duo slot" },
      { label: "Weight", value: "Approx. 344g (with battery and card)" }
    ],
    reviewUrl: "/photography-gear/sony-a6000",
    relatedPortfolioUrls: [
      { label: "Travel Photography", url: "/portfolio/travel" },
      { label: "Portraits", url: "/portfolio/portraits" }
    ],
    ownershipStatus: "In Rotation",
    published: true
  },
  {
    id: "gear-sony-50mm-full-frame",
    slug: "sony-50mm-full-frame",
    name: "Sony 50mm Prime Lens - Full Frame",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "Full-frame prime lens",
    modelNumber: "SEL50F18F / FE 50mm F1.8 (Subject to verification)",
    description: "Standard prime lens designed for Sony E-mount full-frame cameras. Delivers a natural 47° field of view matching human eye perspective, bright aperture subject isolation, and featherweight portability.",
    primaryUses: ["Environmental Portraiture", "Natural Perspective Storytelling", "Low-Light Ambient Sessions", "Everyday Editorial Documentation"],
    compatibility: "Sony E-mount full-frame cameras (native 35mm coverage); also compatible with Sony APS-C camera bodies (75mm full-frame equivalent field of view). Note: Model name and exact compatibility information can be updated as verified.",
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony 50mm prime lens full frame mounted on a mirrorless camera",
    specifications: [
      { label: "Focal Length", value: "50mm (Standard Prime)" },
      { label: "Lens Format", value: "35mm Full-Frame" },
      { label: "Lens Mount", value: "Sony E-mount" },
      { label: "Maximum Aperture", value: "f/1.8" },
      { label: "Minimum Aperture", value: "f/22" },
      { label: "Filter Thread", value: "49mm" },
      { label: "Weight", value: "Approx. 186g (6.6 oz)" }
    ],
    reviewUrl: "/photography-gear/sony-50mm-full-frame",
    relatedPortfolioUrls: [
      { label: "Editorial Portraits", url: "/portfolio/portraits" }
    ],
    ownershipStatus: "Active Kit",
    published: true
  },
  {
    id: "gear-sony-50mm-apsc",
    slug: "sony-50mm-apsc",
    name: "Sony 50mm Prime Lens - APS-C",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "APS-C prime lens",
    modelNumber: "SEL50F18 / E 50mm F1.8 OSS (Subject to verification)",
    description: "Prime lens configured for Sony E-mount APS-C camera systems. Offers an effective 75mm full-frame equivalent field of view, making it a specialized short-telephoto portrait optic with pleasing facial compression.",
    primaryUses: ["APS-C Portrait Photography", "Tight Headshots & Creative Framing", "Medium Telephoto Detail Stills", "Low-Light Indoor Sessions"],
    compatibility: "Sony E-mount APS-C cameras (e.g., Sony A6000, A6400, A6700); also mountable on full-frame Sony bodies in APS-C Crop Mode. Note: Verification of exact model number and optical characteristics is tracked and updateable.",
    imageUrl: "https://images.unsplash.com/photo-1589870485068-5669d2bf1714?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony 50mm APS-C prime portrait lens",
    specifications: [
      { label: "Focal Length", value: "50mm (75mm full-frame 35mm equivalent on APS-C)" },
      { label: "Lens Format", value: "APS-C format" },
      { label: "Lens Mount", value: "Sony E-mount" },
      { label: "Maximum Aperture", value: "f/1.8" },
      { label: "Optical Stabilization", value: "Optical SteadyShot (OSS) built-in" },
      { label: "Filter Diameter", value: "49mm" },
      { label: "Weight", value: "Approx. 202g (7.1 oz)" }
    ],
    reviewUrl: "/photography-gear/sony-50mm-apsc",
    relatedPortfolioUrls: [
      { label: "Portraits", url: "/portfolio/portraits" }
    ],
    ownershipStatus: "Active Kit",
    published: true
  },
  {
    id: "gear-sony-200-600mm",
    slug: "sony-200-600mm",
    name: "Sony 200–600mm Telephoto Zoom Lens",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "Full-frame telephoto zoom lens",
    modelNumber: "SEL200600G / FE 200–600mm F5.6–6.3 G OSS",
    description: "Internal-zoom super-telephoto lens engineered for wildlife, birds, field sports, and distant subjects. Features dual Direct Drive SSM autofocus motors, Optical SteadyShot with 3 mode switches, and a non-extending barrel that preserves physical balance.",
    primaryUses: ["Wildlife & Nature Photography", "Birds in Flight Tracking", "Field Sports & Athletics", "Distant Subjects & Compressed Horizons"],
    compatibility: "Sony E-mount full-frame cameras; compatible with Sony 1.4x and 2.0x teleconverters; compatible with Sony APS-C camera bodies (yielding 300–900mm equivalent reach).",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony 200-600mm super-telephoto zoom lens capturing wildlife and action",
    specifications: [
      { label: "Focal Length Range", value: "200mm to 600mm" },
      { label: "Maximum Aperture", value: "f/5.6–f/6.3" },
      { label: "Minimum Aperture", value: "f/32–f/36" },
      { label: "Zoom Mechanism", value: "Internal Zoom (physical barrel length does not extend)" },
      { label: "Optical Stabilization", value: "Optical SteadyShot (Mode 1, Mode 2 Panning, Mode 3 Action)" },
      { label: "Filter Thread", value: "95mm" },
      { label: "Weight", value: "Approx. 2,115g (without tripod collar)" }
    ],
    reviewUrl: "/photography-gear/sony-200-600mm",
    relatedPortfolioUrls: [
      { label: "Sports & Athletics", url: "/portfolio/sports" },
      { label: "Wildlife & Travel", url: "/portfolio/travel" }
    ],
    ownershipStatus: "Active Super-Telephoto",
    published: true
  },
  {
    id: "gear-dji-osmo-action-6",
    slug: "dji-osmo-action-6",
    name: "DJI Osmo Action 6",
    manufacturer: "DJI",
    category: "action-cameras",
    categoryLabel: "Action camera",
    modelNumber: "Osmo Action 6 Series",
    description: "Rugged waterproof action camera designed for high-vibration travel videos, outdoor activities, motorcycle travel footage, behind-the-scenes photography, and first-person POV recording.",
    primaryUses: ["Travel Videos", "Outdoor Activities", "Motorcycle Travel Footage", "Behind-the-Scenes Photography", "First-Person Recording"],
    compatibility: "DJI magnetic quick-release mounting ecosystem, standard 1/4\"-20 tripod adapters, high-speed microSD cards (V30 / UHS-I U3 or higher), USB-C fast charging.",
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "DJI Osmo Action 6 rugged waterproof action camera",
    specifications: [
      { label: "Camera Type", value: "Compact Waterproof Action Camera" },
      { label: "Lens Field of View", value: "155° Ultra-Wide Optics" },
      { label: "Stabilization Engine", value: "360° HorizonSteady & RockSteady electronic stabilization" },
      { label: "Waterproofing", value: "Native waterproof chassis without external case" },
      { label: "Displays", value: "Dual front and rear touchscreens for self-framing" },
      { label: "Operating Temperature", value: "Cold-resistant performance down to -20°C" },
      { label: "Weight", value: "Approx. 145g" }
    ],
    reviewUrl: "/photography-gear/dji-osmo-action-6",
    relatedPortfolioUrls: [
      { label: "Travel Expeditions", url: "/portfolio/travel" }
    ],
    ownershipStatus: "Active POV Rig",
    published: true
  },
  {
    id: "gear-dji-mic-mini",
    slug: "dji-mic-mini",
    name: "DJI Mic Mini",
    manufacturer: "DJI",
    category: "audio",
    categoryLabel: "Wireless microphone system",
    modelNumber: "DJI Mic Mini Wireless Audio System",
    description: "Ultra-compact wireless microphone system engineered for high-fidelity voice recording, photography behind-the-scenes video creation, travel vlogging, on-location interviews, and hybrid camera/smartphone audio capture.",
    primaryUses: ["Voice Recording", "Photography Behind-the-Scenes Videos", "Travel Vlogging", "On-Location Client Interviews", "Camera and Smartphone Audio Recording"],
    compatibility: "Supported connection methods verified per equipment configuration: 3.5mm TRS analog camera interface, USB-C and Lightning digital smartphone connectivity, and magnetic clip-on clothing attachments.",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "DJI Mic Mini wireless microphone system",
    specifications: [
      { label: "System Category", value: "Wireless Microphone System" },
      { label: "Wireless Transmission", value: "Digital 2.4 GHz low-latency transmission" },
      { label: "Form Factor", value: "Ultra-compact miniature transmitter with magnetic clip" },
      { label: "Supported Connections", value: "3.5mm TRS camera jack, USB-C digital interface, Lightning adapter" },
      { label: "Primary Recording Scope", value: "Voice, dialogue, vlogging, and ambient interview capture" },
      { label: "Battery & Charging", value: "Internal rechargeable battery with compact charging case" },
      { label: "Weight", value: "Approx. 10g per transmitter (ultra-lightweight)" }
    ],
    reviewUrl: "/photography-gear/dji-mic-mini",
    relatedPortfolioUrls: [
      { label: "Weddings & Ceremonies", url: "/portfolio/weddings" }
    ],
    ownershipStatus: "Active Audio Kit",
    published: true
  },
  {
    id: "gear-dijitek-520bh",
    slug: "dijitek-520bh",
    name: "Dijitek 520BH Tripod",
    manufacturer: "Dijitek",
    category: "tripods-and-support",
    categoryLabel: "Tripods and Support Equipment",
    modelNumber: "Dijitek 520BH / 130 Video Head Setup",
    description: "Heavy-duty support system featuring the Dijitek 520BH tripod legs configured with dual head options: the 130 video head for smooth fluid panning and the default ball head for rapid still framing. Displayed as one unified tripod and support system with independently editable head configurations.",
    primaryUses: ["Smooth Video Panning & Tilts", "Studio Staging & Stills", "Long-Exposure Landscape Photography", "Heavy Telephoto Lens Stability"],
    compatibility: "Standard 3/8\"-16 and 1/4\"-20 tripod base mounts; configured with 130 video head and default ball head. (Mounting compatibility, payload rating, and head specifications allow independent configuration and verification).",
    imageUrl: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dijitek 520BH heavy-duty tripod with video and ball head support",
    specifications: [
      { label: "Tripod Model", value: "Dijitek 520BH" },
      { label: "Reported Head Configuration", value: "130 Video Head + Included Default Ball Head" },
      { label: "System Structure", value: "Unified tripod legs with dual interchangeable head setup" },
      { label: "Mounting Thread", value: "Standard 3/8\"-16 base / 1/4\"-20 camera mounting plate" },
      { label: "Configuration Status", value: "Head model, compatibility, and specifications editable independently" },
      { label: "Maximum Load Capacity", value: "To be verified upon equipment confirmation" }
    ],
    reviewUrl: "/photography-gear/dijitek-520bh",
    relatedPortfolioUrls: [
      { label: "Commercial Photography", url: "/portfolio/commercial" }
    ],
    ownershipStatus: "Studio Support Rig",
    published: true
  }
];

async function seed() {
  await client.connect();
  console.log("Connected to Supabase.");

  for (const item of ITEMS) {
    console.log(`Upserting ${item.name}...`);
    await client.query(`
      INSERT INTO public.gear_items (
        id, slug, name, manufacturer, category, category_label,
        model_number, description, primary_uses, compatibility,
        image_url, image_alt, specifications, review_url,
        related_portfolio_urls, ownership_status, published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        name = EXCLUDED.name,
        manufacturer = EXCLUDED.manufacturer,
        category = EXCLUDED.category,
        category_label = EXCLUDED.category_label,
        model_number = EXCLUDED.model_number,
        description = EXCLUDED.description,
        primary_uses = EXCLUDED.primary_uses,
        compatibility = EXCLUDED.compatibility,
        image_url = EXCLUDED.image_url,
        image_alt = EXCLUDED.image_alt,
        specifications = EXCLUDED.specifications,
        review_url = EXCLUDED.review_url,
        related_portfolio_urls = EXCLUDED.related_portfolio_urls,
        ownership_status = EXCLUDED.ownership_status,
        published = EXCLUDED.published;
    `, [
      item.id,
      item.slug,
      item.name,
      item.manufacturer,
      item.category,
      item.categoryLabel,
      item.modelNumber || null,
      item.description,
      JSON.stringify(item.primaryUses),
      item.compatibility,
      item.imageUrl,
      item.imageAlt,
      JSON.stringify(item.specifications),
      item.reviewUrl,
      JSON.stringify(item.relatedPortfolioUrls),
      item.ownershipStatus,
      item.published,
    ]);
  }

  console.log("Successfully seeded 8 gear items into Supabase!");
  await client.end();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
