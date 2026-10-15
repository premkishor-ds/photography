export type GearCategory =
  | "camera-bodies"
  | "lenses"
  | "action-cameras"
  | "audio"
  | "tripods-and-support"
  | "storage-and-memory"
  | "accessories";

export interface GearSpecification {
  label: string;
  value: string | null;
}

export interface RelatedPortfolioLink {
  label: string;
  url: string;
}

export interface GearItem {
  id: string;
  slug: string;
  aliases?: string[];
  name: string;
  manufacturer: string;
  category: GearCategory;
  categoryLabel: string;
  modelNumber: string | null;
  description: string;
  primaryUses: string[];
  compatibility: string;
  imageUrl: string;
  imageAlt: string;
  specifications: GearSpecification[];
  reviewUrl: string | null;
  relatedPortfolioUrls: RelatedPortfolioLink[];
  ownershipStatus: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;

  // Compatibility / optional fields for rich review template
  tagline?: string;
  overview?: string;
  personalUsage?: string;
  isPersonallyVerified?: boolean;
  specs?: { label: string; value: string }[];
  pros?: string[];
  cons?: string[];
  bestFor?: string[];
  situationsWhereUseful?: string[];
  imageOrAudioQuality?: string;
  autofocusAndPerformance?: string;
  portabilityAndHandling?: string;
  limitations?: string;
  whoShouldBuy?: string;
  alternatives?: { name: string; slug?: string; note: string }[];
  relatedPortfolioCategory?: string;
  relatedPortfolioSlug?: string;
  relatedTutorialSlug?: string;
  faqs?: { question: string; answer: string }[];
  retailerLinks?: {
    retailer: string;
    url: string;
    isAffiliate: boolean;
    note?: string;
  }[];
}

export interface GearComparison {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  itemA: {
    name: string;
    slug?: string;
    category: string;
    highlight: string;
  };
  itemB: {
    name: string;
    slug?: string;
    category: string;
    highlight: string;
  };
  summary: string;
  specComparison: {
    feature: string;
    itemAValue: string;
    itemBValue: string;
  }[];
  prosAndCons: {
    itemAPros: string[];
    itemACons: string[];
    itemBPros: string[];
    itemBCons: string[];
  };
  intendedUseCases: {
    itemAUse: string;
    itemBUse: string;
  };
  tradeOffAnalysis: string;
  practicalRecommendation: string;
  faqs: { question: string; answer: string }[];
}

export const GEAR_CATEGORIES: { id: GearCategory; label: string; description: string }[] = [
  {
    id: "camera-bodies",
    label: "Camera Bodies",
    description: "Full-frame and APS-C mirrorless sensors delivering dynamic range, fast burst rates, and reliable image capture.",
  },
  {
    id: "lenses",
    label: "Camera Lenses",
    description: "Prime and telephoto optics selected for edge-to-edge optical resolution, natural perspective, and long-range reach.",
  },
  {
    id: "action-cameras",
    label: "Action Cameras",
    description: "Rugged, stabilized POV camera systems for high-impact travel videos, motorcycle footage, and first-person perspectives.",
  },
  {
    id: "audio",
    label: "Audio Equipment",
    description: "Ultra-compact wireless microphone systems engineered for crisp vocal dialogue, client interviews, and video BTS.",
  },
  {
    id: "tripods-and-support",
    label: "Tripods and Support Equipment",
    description: "Heavy-duty stability platforms with interchangeable video and ball head configurations for smooth tracking and studio framing.",
  },
  {
    id: "storage-and-memory",
    label: "Storage & Memory Media",
    description: "High-speed CFexpress Type A cards and rugged portable solid-state drives for high-bitrate buffer clearing and field backups.",
  },
  {
    id: "accessories",
    label: "Camera Accessories & Filters",
    description: "Dedicated optical ND filters, waterproof dive housings, and protection gear for high-impact action shooting.",
  },
];

export const GEAR_ITEMS: GearItem[] = [
  // =========================================================================
  // 1. CAMERA BODIES
  // =========================================================================

  // 1.1 Sony A7 V
  {
    id: "gear-sony-a7-v",
    slug: "sony-a7-v",
    aliases: ["sony-a7v"],
    name: "Sony A7 V",
    manufacturer: "Sony",
    category: "camera-bodies",
    categoryLabel: "Full-frame mirrorless camera",
    modelNumber: "ILCE-7M5 (Tentative / Unverified)",
    description:
      "Next-generation full-frame hybrid mirrorless camera body combining advanced subject recognition autofocus, wide dynamic exposure latitude, and high-speed continuous shooting across diverse lighting environments.",
    primaryUses: [
      "Wildlife Photography",
      "Sports Photography",
      "Portrait Photography",
      "Travel Photography",
    ],
    compatibility:
      "Sony E-mount full-frame lenses (native), Sony E-mount APS-C lenses (auto crop mode), Dual CFexpress Type A / SD UHS-II hybrid memory slots.",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony A7 V full-frame mirrorless camera body",
    specifications: [
      { label: "Sensor Format", value: "35mm Full-Frame BSI CMOS Sensor" },
      { label: "Autofocus Engine", value: "AI-Powered Real-Time Recognition (Human, Animal, Bird, Vehicle)" },
      { label: "Image Stabilization", value: "5-Axis In-Body Optical SteadyShot" },
      { label: "Card Slots", value: "Dual CFexpress Type A / SD UHS-II Hybrid" },
      { label: "Continuous Burst", value: "Up to 10+ fps with full continuous AF/AE tracking" },
      { label: "Video Recording", value: "4K 60p 10-bit 4:2:2 internal capture" },
      { label: "Weight", value: "Approx. 658g (with battery and memory card)" },
    ],
    reviewUrl: "/photography-gear/sony-a7-v",
    relatedPortfolioUrls: [
      { label: "Portraits", url: "/portfolio/portraits" },
      { label: "Sports & Action", url: "/portfolio/sports" },
    ],
    ownershipStatus: "Active Primary Body",
    published: true,

    // Rich Template Extensions
    tagline: "Next-generation full-frame hybrid mirrorless camera body.",
    overview:
      "The Sony A7 V is engineered as a modern hybrid powerhouse, combining predictive subject recognition autofocus, wide exposure latitude, and rugged weather sealing for wildlife, sports, portraits, and travel photography.",
    personalUsage:
      "Serves as our primary camera body for editorial portraits, indoor wedding documentation, and fast-paced athletics where real-time eye tracking is essential.",
    isPersonallyVerified: true,
    specs: [
      { label: "Sensor Format", value: "35mm Full-Frame BSI CMOS" },
      { label: "Autofocus Engine", value: "AI-Powered Real-Time Recognition" },
      { label: "Image Stabilization", value: "5-Axis In-Body Optical SteadyShot" },
      { label: "Card Slots", value: "Dual CFexpress Type A / SD UHS-II Hybrid" },
      { label: "Continuous Burst", value: "Up to 10+ fps continuous tracking" },
      { label: "Video Recording", value: "4K 60p 10-bit 4:2:2 internal" },
      { label: "Weight", value: "Approx. 658g" },
    ],
    pros: [
      "Industry-leading subject acquisition and predictive autofocus tracking",
      "Exceptional highlight recovery and low-noise performance at high ISOs",
      "Dual hybrid card slots provide vital instant in-camera redundancy",
      "Ergonomic grip and tactile dial layout for all-day field assignments",
    ],
    cons: [
      "CFexpress Type A media cards carry premium pricing",
      "Menu system offers immense customization but requires deliberate setup",
      "Sustained high-framerate bursts generate large volume RAW files",
    ],
    bestFor: [
      "Wildlife, birds, and rapid animal action",
      "Indoor weddings and events in low-light ambient illumination",
      "Sports and athletics demanding rapid eye and motion tracking",
      "Editorial and commercial portraiture requiring rich color tonality",
    ],
    situationsWhereUseful: [
      "Studio portrait sessions with complex strobe configurations",
      "Field sports with rapid directional changes across stadium courts",
      "Remote travel expeditions where moisture and dust resistance matter",
    ],
    imageOrAudioQuality:
      "Delivers wide exposure latitude and clean shadow retrieval. Skin tones render with natural warmth and subtle tonal gradations.",
    autofocusAndPerformance:
      "The dedicated AI processing unit locks onto eyes and silhouettes instantly, even when subjects turn away or wear helmets, caps, or sunglasses.",
    portabilityAndHandling:
      "Weather-sealed magnesium alloy chassis balances securely with medium primes and heavier telephoto zooms.",
    limitations:
      "High-speed sports bursts produce substantial file volume requiring robust storage solutions and fast card readers.",
    whoShouldBuy:
      "Working photographers, wedding documentarians, and hybrid creators who need unwavering autofocus reliability across diverse lighting conditions.",
    alternatives: [
      { name: "Sony A7 IV", note: "Previous generation workhorse offering strong performance at a lower secondary market price." },
      { name: "Sony A1", note: "Flagship stacked sensor camera with blackout-free 30 fps bursts for commercial sports." },
    ],
    relatedPortfolioCategory: "Portraits & Sports",
    relatedPortfolioSlug: "/portfolio/portraits",
    relatedTutorialSlug: "/blog/what-to-wear-for-a-portrait-photoshoot",
    faqs: [
      {
        question: "Is the Sony A7 V suitable for high-speed sports photography?",
        answer: "Yes. With predictive autofocus tracking and continuous bursts, it tracks athletic movement across fields and courts with exceptional accuracy.",
      },
      {
        question: "What lens mount does the Sony A7 V use?",
        answer: "It uses the native Sony E-mount, supporting full-frame FE lenses as well as APS-C E lenses in automatic crop mode.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Authorized retailer; check current body-only availability.",
      },
    ],
  },

  // 1.2 Sony A6000
  {
    id: "gear-sony-a6000",
    slug: "sony-a6000",
    name: "Sony A6000",
    manufacturer: "Sony",
    category: "camera-bodies",
    categoryLabel: "APS-C mirrorless camera",
    modelNumber: "ILCE-6000",
    description:
      "Compact, proven APS-C mirrorless camera body delivering dependable Fast Hybrid autofocus, lightweight handling, and high-resolution APS-C image capture for everyday and secondary kit photography.",
    primaryUses: [
      "Photography with an APS-C camera system",
      "Lightweight Travel Documentation",
      "Secondary Backup Camera Body",
      "Street & Everyday Photography",
    ],
    compatibility:
      "Sony E-mount APS-C lenses, Sony E-mount full-frame lenses (1.5x crop factor), SD / SDHC / SDXC memory cards.",
    imageUrl:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony A6000 compact APS-C mirrorless camera body",
    specifications: [
      { label: "Sensor Format", value: "24.3 MP APS-C Exmor APS HD CMOS" },
      { label: "Autofocus Engine", value: "Fast Hybrid AF (179-point phase detection / 25-point contrast)" },
      { label: "Burst Rate", value: "Up to 11 fps with continuous AF tracking" },
      { label: "ISO Sensitivity Range", value: "ISO 100–25,600" },
      { label: "Viewfinder", value: "0.39-inch OLED Tru-Finder EVF (1.44M dots)" },
      { label: "Card Slots", value: "Single SD / Memory Stick PRO Duo slot" },
      { label: "Weight", value: "Approx. 344g (with battery and card)" },
    ],
    reviewUrl: "/photography-gear/sony-a6000",
    relatedPortfolioUrls: [
      { label: "Travel Photography", url: "/portfolio/travel" },
      { label: "Portraits", url: "/portfolio/portraits" },
    ],
    ownershipStatus: "In Rotation",
    published: true,

    // Rich Template Extensions
    tagline: "Ultra-compact APS-C mirrorless camera body with high-speed burst tracking.",
    overview:
      "The Sony A6000 remains one of the most accessible and capable APS-C mirrorless cameras ever produced. Its featherweight chassis, 11 fps continuous burst rate, and 24.3 MP sensor make it a dependable companion for everyday assignments, street documentation, and travel.",
    personalUsage:
      "Used as our ultra-portable secondary camera body for discreet street photography, behind-the-scenes travel snapshots, and lightweight personal outings.",
    isPersonallyVerified: true,
    specs: [
      { label: "Sensor Format", value: "24.3 MP APS-C CMOS" },
      { label: "Autofocus Engine", value: "Fast Hybrid AF (179 phase-detect points)" },
      { label: "Burst Rate", value: "Up to 11 fps continuous tracking" },
      { label: "Viewfinder", value: "0.39-inch OLED Tru-Finder (1.44M dots)" },
      { label: "LCD Screen", value: "3.0-inch tilting LCD monitor" },
      { label: "Card Slot", value: "Single SD / Memory Stick PRO Duo" },
      { label: "Weight", value: "Approx. 344g (body with battery)" },
    ],
    pros: [
      "Remarkably compact and lightweight (344g), easily fitting in small waist packs",
      "Fast 11 fps continuous burst shooting freezes candid movement reliably",
      "Extensive ecosystem of affordable, lightweight Sony and third-party APS-C lenses",
      "Intuitive physical control layout with dedicated mode dial and customizable buttons",
    ],
    cons: [
      "Lacks in-body image stabilization (IBIS), relying on stabilized lenses (OSS)",
      "Single memory card slot without instant duplicate backup capability",
      "Older menu interface compared to latest Sony mirrorless generations",
    ],
    bestFor: [
      "Everyday photography with an APS-C camera system",
      "Street and documentary photography requiring a discreet footprint",
      "Lightweight travel assignments where minimizing pack weight is vital",
    ],
    situationsWhereUseful: [
      "Spontaneous travel explorations through crowded bazaars and narrow lanes",
      "Candid family and lifestyle photography in natural daylight",
      "Back-up camera body in case of unforeseen equipment needs",
    ],
    imageOrAudioQuality:
      "Produces punchy, detailed 24 MP still images with good dynamic range at base ISOs. Colors render cleanly with sharp detail across APS-C sensors.",
    portabilityAndHandling:
      "Exceptionally light in hand. Can be carried comfortably on a wrist strap for an entire afternoon without fatigue.",
    limitations:
      "Low-light noise becomes evident at ISO 6400 and above; non-stabilized sensor requires steady shooting discipline or OSS lenses.",
    whoShouldBuy:
      "Photographers who want a reliable, featherweight APS-C camera body that accepts all Sony E-mount glass without breaking the bank.",
    alternatives: [
      { name: "Sony A6400", note: "Step-up APS-C model with weather sealing and 4K video recording." },
      { name: "Sony A6700", note: "Modern flagship APS-C body with AI autofocus and IBIS." },
    ],
    relatedPortfolioCategory: "Travel & Portraits",
    relatedPortfolioSlug: "/portfolio/travel",
    relatedTutorialSlug: "/blog/what-to-wear-for-a-portrait-photoshoot",
    faqs: [
      {
        question: "Can full-frame Sony lenses be used on the Sony A6000?",
        answer: "Yes. All Sony full-frame (FE) E-mount lenses attach natively to the A6000, with a 1.5x crop factor applied to the focal length.",
      },
      {
        question: "Does the Sony A6000 shoot 4K video?",
        answer: "The A6000 records Full HD 1080p video at up to 60 fps; 4K recording is available on later models like the A6400 and A6700.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Available pre-owned and refurbished.",
      },
    ],
  },

  // =========================================================================
  // 2. CAMERA LENSES
  // =========================================================================

  // 2.1 Sony 50mm Prime Lens - Full Frame
  {
    id: "gear-sony-50mm-full-frame",
    slug: "sony-50mm-full-frame",
    aliases: ["sony-fe-50mm-f18"],
    name: "Sony 50mm Prime Lens - Full Frame",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "Full-frame prime lens",
    modelNumber: "SEL50F18F / FE 50mm F1.8 (Subject to verification)",
    description:
      "Standard prime lens designed for Sony E-mount full-frame cameras. Delivers a natural 47° field of view matching human eye perspective, bright aperture subject isolation, and featherweight portability.",
    primaryUses: [
      "Environmental Portraiture",
      "Natural Perspective Storytelling",
      "Low-Light Ambient Sessions",
      "Everyday Editorial Documentation",
    ],
    compatibility:
      "Sony E-mount full-frame cameras (native 35mm coverage); also compatible with Sony APS-C camera bodies (75mm full-frame equivalent field of view). Note: Model name and exact compatibility information can be updated as verified.",
    imageUrl:
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony 50mm prime lens full frame mounted on a mirrorless camera",
    specifications: [
      { label: "Focal Length", value: "50mm (Standard Prime)" },
      { label: "Lens Format", value: "35mm Full-Frame" },
      { label: "Lens Mount", value: "Sony E-mount" },
      { label: "Maximum Aperture", value: "f/1.8" },
      { label: "Minimum Aperture", value: "f/22" },
      { label: "Optical Elements", value: "6 elements in 5 groups (1 aspherical element)" },
      { label: "Filter Thread", value: "49mm" },
      { label: "Weight", value: "Approx. 186g (6.6 oz)" },
    ],
    reviewUrl: "/photography-gear/sony-50mm-full-frame",
    relatedPortfolioUrls: [
      { label: "Editorial Portraits", url: "/portfolio/portraits" },
    ],
    ownershipStatus: "Active Kit",
    published: true,

    // Rich Template Extensions
    tagline: "Compact standard prime lens for natural perspective and shallow depth of field.",
    overview:
      "A classic standard prime lens offering an accessible focal length and bright f/1.8 aperture for full-frame Sony E-mount bodies. Ideal for clean subject separation and featherweight travel packing.",
    personalUsage:
      "Our go-to lightweight walkaround prime for street portraits, backstage details, and natural-light editorial portraits.",
    isPersonallyVerified: true,
    specs: [
      { label: "Focal Length", value: "50mm" },
      { label: "Maximum Aperture", value: "f/1.8" },
      { label: "Lens Mount", value: "Sony E-mount (Full-Frame)" },
      { label: "Filter Diameter", value: "49mm" },
      { label: "Weight", value: "Approx. 186g" },
    ],
    pros: [
      "Extremely lightweight (186g) and compact for effortless all-day carrying",
      "Bright aperture creates pleasing subject isolation and shallow depth of field",
      "Sharp optical rendering across center frame when stopped down to f/2.8–f/4",
      "Standard 49mm filter thread matches common travel filters",
    ],
    cons: [
      "Autofocus DC motor is audibly slower than modern XD Linear motor lenses",
      "Plastic composite exterior barrel lacks weather-sealing gaskets",
      "Slight chromatic aberration and corner softness when shot wide open at f/1.8",
    ],
    bestFor: [
      "Environmental portraiture and lifestyle sessions",
      "Low-profile street photography and travel assignments",
      "Natural perspective portraits without wide-angle facial distortion",
    ],
    situationsWhereUseful: [
      "Casual outdoor couple sessions where a large heavy lens would feel intimidating",
      "Intimate dining and indoor ambient light gatherings",
      "Travel days when minimizing backpack weight is the top priority",
    ],
    imageOrAudioQuality:
      "Center sharpness is respectable wide open and becomes very crisp by f/2.8. Highlights render with gentle circular bokeh thanks to the 7-blade iris.",
    portabilityAndHandling:
      "At under 200 grams, it can stay mounted on the camera all day without causing wrist fatigue or balance issues.",
    limitations:
      "Not recommended for high-speed sports or tracking erratic wildlife due to motor focus speed limitations.",
    whoShouldBuy:
      "Any photographer looking for an affordable, lightweight prime lens that delivers creamy background blur without carrying heavy glass.",
    alternatives: [
      { name: "Sony FE 50mm F1.4 GM", note: "High-end professional alternative with weather sealing and dual XD linear motors." },
      { name: "Sony FE 55mm F1.8 ZA Sonnar", note: "Zeiss collaboration prime offering sharper corners and metallic build." },
    ],
    relatedPortfolioCategory: "Portraits",
    relatedPortfolioSlug: "/portfolio/portraits",
    relatedTutorialSlug: "/blog/what-to-wear-for-a-portrait-photoshoot",
    faqs: [
      {
        question: "Can the Sony 50mm Full Frame lens be used on APS-C cameras like the A6000?",
        answer: "Yes, it mounts natively on Sony APS-C cameras, providing an effective 75mm portrait focal length.",
      },
      {
        question: "Is this model identical to the APS-C 50mm lens?",
        answer: "They are distinct optical designs: the full-frame model covers a 35mm image circle, whereas the dedicated APS-C version features built-in Optical SteadyShot (OSS) image stabilization.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Available standard retail.",
      },
    ],
  },

  // 2.2 Sony 50mm Prime Lens - APS-C
  {
    id: "gear-sony-50mm-apsc",
    slug: "sony-50mm-apsc",
    name: "Sony 50mm Prime Lens - APS-C",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "APS-C prime lens",
    modelNumber: "SEL50F18 / E 50mm F1.8 OSS (Subject to verification)",
    description:
      "Prime lens configured for Sony E-mount APS-C camera systems. Offers an effective 75mm full-frame equivalent field of view, making it a specialized short-telephoto portrait optic with pleasing facial compression.",
    primaryUses: [
      "APS-C Portrait Photography",
      "Tight Headshots & Creative Framing",
      "Medium Telephoto Detail Stills",
      "Low-Light Indoor Sessions",
    ],
    compatibility:
      "Sony E-mount APS-C cameras (e.g., Sony A6000, A6400, A6700); also mountable on full-frame Sony bodies in APS-C Crop Mode. Note: Verification of exact model number and optical characteristics is tracked and updateable.",
    imageUrl:
      "https://images.unsplash.com/photo-1589870485068-5669d2bf1714?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony 50mm APS-C prime portrait lens",
    specifications: [
      { label: "Focal Length", value: "50mm (75mm full-frame 35mm equivalent on APS-C)" },
      { label: "Lens Format", value: "APS-C format" },
      { label: "Lens Mount", value: "Sony E-mount" },
      { label: "Maximum Aperture", value: "f/1.8" },
      { label: "Optical Stabilization", value: "Optical SteadyShot (OSS) built-in" },
      { label: "Filter Diameter", value: "49mm" },
      { label: "Diaphragm Blades", value: "7 rounded blades" },
      { label: "Weight", value: "Approx. 202g (7.1 oz)" },
    ],
    reviewUrl: "/photography-gear/sony-50mm-apsc",
    relatedPortfolioUrls: [
      { label: "Portraits", url: "/portfolio/portraits" },
    ],
    ownershipStatus: "Active Kit",
    published: true,

    // Rich Template Extensions
    tagline: "Dedicated APS-C portrait prime with built-in Optical SteadyShot stabilization.",
    overview:
      "Designed specifically for Sony APS-C mirrorless cameras, this prime lens delivers a 75mm-equivalent portrait perspective. Integrated Optical SteadyShot compensates for hand shake even on non-stabilized camera bodies like the A6000.",
    personalUsage:
      "Paired with our Sony A6000 for compact client headshots, event details, and low-light ambient portraiture where carrying large full-frame rigs is impractical.",
    isPersonallyVerified: true,
    specs: [
      { label: "Focal Length", value: "50mm (75mm eq.)" },
      { label: "Maximum Aperture", value: "f/1.8" },
      { label: "Stabilization", value: "Optical SteadyShot (OSS)" },
      { label: "Filter Diameter", value: "49mm" },
      { label: "Weight", value: "Approx. 202g" },
    ],
    pros: [
      "Built-in Optical SteadyShot stabilizes handheld shooting on bodies without IBIS",
      "75mm equivalent angle provides flattering facial compression for portraits",
      "Bright f/1.8 aperture allows low ISO shooting in dim indoor light",
      "Quiet internal autofocus mechanism suitable for stills and video capture",
    ],
    cons: [
      "Image circle is optimized for APS-C; produces heavy vignetting on full-frame if crop mode is disabled",
      "Not weather-sealed for heavy rain or severe sandstorms",
      "Focus by wire manual focus ring lacks hard physical stops",
    ],
    bestFor: [
      "Portraiture with an APS-C camera system like the Sony A6000",
      "Creative headshots and isolating architectural details",
      "Low-light handheld shooting where optical stabilization is required",
    ],
    situationsWhereUseful: [
      "Indoor portrait shoots without heavy studio tripods",
      "Casual event guest documentation and candid expressions",
      "Travel portraits when paired with compact APS-C camera bodies",
    ],
    imageOrAudioQuality:
      "Renders sharp center detail wide open at f/1.8 with smooth, creamy bokeh. The 7-blade circular aperture produces attractive circular out-of-focus background highlights.",
    portabilityAndHandling:
      "Aluminum alloy exterior balances comfortably on compact bodies, adding virtually no bulk to small camera bags.",
    limitations:
      "Restricted to APS-C coverage; full-frame camera users should use the FE version to utilize the complete sensor area.",
    whoShouldBuy:
      "Sony APS-C camera owners who want a dedicated portrait lens with optical stabilization and creamy subject isolation.",
    alternatives: [
      { name: "Sigma 56mm F1.4 DC DN Contemporary", note: "Sharper, faster f/1.4 alternative without optical stabilization." },
      { name: "Sony FE 50mm F1.8", note: "Full-frame 50mm counterpart without OSS." },
    ],
    relatedPortfolioCategory: "Portraits",
    relatedPortfolioSlug: "/portfolio/portraits",
    relatedTutorialSlug: "/blog/what-to-wear-for-a-portrait-photoshoot",
    faqs: [
      {
        question: "Why choose the APS-C 50mm over the Full Frame 50mm for the A6000?",
        answer: "The APS-C version includes Optical SteadyShot (OSS) stabilization, which is invaluable on camera bodies like the A6000 that do not possess in-body sensor stabilization.",
      },
      {
        question: "What is the equivalent focal length on an APS-C camera?",
        answer: "50mm multiplied by the 1.5x Sony APS-C crop factor equals 75mm full-frame field of view.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Includes front and rear lens caps.",
      },
    ],
  },

  // 2.3 Sony 200–600mm Telephoto Zoom Lens
  {
    id: "gear-sony-200-600mm",
    slug: "sony-200-600mm",
    name: "Sony 200–600mm Telephoto Zoom Lens",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "Full-frame telephoto zoom lens",
    modelNumber: "SEL200600G / FE 200–600mm F5.6–6.3 G OSS",
    description:
      "Internal-zoom super-telephoto lens engineered for wildlife, birds, field sports, and distant subjects. Features dual Direct Drive SSM autofocus motors, Optical SteadyShot with 3 mode switches, and a non-extending barrel that preserves physical balance.",
    primaryUses: [
      "Wildlife & Nature Photography",
      "Birds in Flight Tracking",
      "Field Sports & Athletics",
      "Distant Subjects & Compressed Horizons",
    ],
    compatibility:
      "Sony E-mount full-frame cameras; compatible with Sony 1.4x and 2.0x teleconverters; compatible with Sony APS-C camera bodies (yielding 300–900mm equivalent reach).",
    imageUrl:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony 200-600mm super-telephoto zoom lens capturing wildlife and action",
    specifications: [
      { label: "Focal Length Range", value: "200mm to 600mm" },
      { label: "Maximum Aperture", value: "f/5.6–f/6.3" },
      { label: "Minimum Aperture", value: "f/32–f/36" },
      { label: "Zoom Mechanism", value: "Internal Zoom (physical barrel length does not extend)" },
      { label: "Optical Stabilization", value: "Optical SteadyShot (Mode 1, Mode 2 Panning, Mode 3 Action)" },
      { label: "Teleconverter Support", value: "Fully compatible with Sony 1.4x and 2.0x TCs" },
      { label: "Filter Thread", value: "95mm" },
      { label: "Weight", value: "Approx. 2,115g (without tripod collar)" },
    ],
    reviewUrl: "/photography-gear/sony-200-600mm",
    relatedPortfolioUrls: [
      { label: "Sports & Athletics", url: "/portfolio/sports" },
      { label: "Wildlife & Travel", url: "/portfolio/travel" },
    ],
    ownershipStatus: "Active Super-Telephoto",
    published: true,

    // Rich Template Extensions
    tagline: "Internal-zoom super-telephoto lens for wildlife and field sports.",
    overview:
      "A premier super-telephoto workhorse built for wildlife enthusiasts and sports photographers. Featuring an internal zoom mechanism that maintains constant physical balance on gimbals and monopods, fast autofocus motors, and optical stabilization.",
    personalUsage:
      "Primary telephoto workhorse for track and field athletics, distant ocean surfing sessions, and backcountry wildlife expeditions in national parks.",
    isPersonallyVerified: true,
    specs: [
      { label: "Focal Length Range", value: "200mm to 600mm (Full-Frame)" },
      { label: "Aperture Range", value: "f/5.6–f/6.3 to f/32–f/36" },
      { label: "Zoom Mechanism", value: "Internal Zoom (barrel does not extend)" },
      { label: "Optical Stabilization", value: "Optical SteadyShot with 3 mode switches" },
      { label: "Filter Thread", value: "95mm" },
      { label: "Weight", value: "Approx. 2,115g" },
    ],
    pros: [
      "Internal zoom design keeps center of gravity completely stable on gimbals and monopods",
      "Exceptional reach up to 600mm without needing teleconverters",
      "Short throw zoom ring allows rapid transitions from 200mm to 600mm with a quarter-turn",
      "Rugged weather-resistant build protects against field dust and moisture",
    ],
    cons: [
      "Substantial physical weight (2.1 kg) requires good arm strength or monopod support for multi-hour sessions",
      "Modest f/6.3 maximum aperture at 600mm requires higher ISO settings under dusk illumination",
      "Large 95mm front filter diameter makes polarizing filters costly",
    ],
    bestFor: [
      "Track, soccer, football, and outdoor field athletics",
      "Birding, safari, and shy wildlife encounters across open habitats",
      "Air shows and surf photography from sandy shorelines",
    ],
    situationsWhereUseful: [
      "Freezing sprinters breaking the finish tape from the media stand",
      "Documenting raptors and stags from ethical observation distances",
      "Capturing surfers in deep wave barrels from coastal headlands",
    ],
    imageOrAudioQuality:
      "Remarkably sharp across the entire zoom range, with clean contrast and minimal chromatic fringing thanks to five ED glass elements.",
    autofocusAndPerformance:
      "Dual DDSSM motors drive heavy internal elements with precision and silent tracking speed. Keeps up seamlessly with erratic birds and sprinting athletes.",
    portabilityAndHandling:
      "Because the lens does not expand during zooming, it operates smoothly on monopods and gimbal heads without shifting balance forwards.",
    limitations:
      "In indoor arena sports under poor sodium-vapor lighting, the f/6.3 aperture pushes camera ISO higher than an f/2.8 prime.",
    whoShouldBuy:
      "Outdoor sports photographers and wildlife specialists who demand serious telephoto reach and internal zoom balance.",
    alternatives: [
      { name: "Sony FE 100–400mm F4.5–5.6 GM OSS", note: "Lighter and closer focusing, but 200mm shorter at maximum reach." },
      { name: "Sigma 150–600mm F5–6.3 DG DN OS Sports", note: "External extending zoom alternative with similar reach." },
    ],
    relatedPortfolioCategory: "Sports & Wildlife",
    relatedPortfolioSlug: "/portfolio/sports",
    relatedTutorialSlug: "/blog/capturing-high-speed-sports-action-techniques",
    faqs: [
      {
        question: "Can the Sony 200-600mm be used handheld?",
        answer: "Yes, for short bursts. However, for full 90-minute matches or full-day wildlife watches, a sturdy monopod is strongly recommended.",
      },
      {
        question: "Does it work with Sony 1.4x teleconverters?",
        answer: "Yes, turning the lens into an 840mm f/9 optic on compatible Sony bodies while retaining phase-detect autofocus in daylight.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Includes tripod foot and reversible lens hood.",
      },
    ],
  },

  // =========================================================================
  // 3. ACTION CAMERA
  // =========================================================================

  // 3.1 DJI Osmo Action 6
  {
    id: "gear-dji-osmo-action-6",
    slug: "dji-osmo-action-6",
    name: "DJI Osmo Action 6",
    manufacturer: "DJI",
    category: "action-cameras",
    categoryLabel: "Action camera",
    modelNumber: "Osmo Action 6 Series",
    description:
      "Rugged waterproof action camera designed for high-vibration travel videos, outdoor activities, motorcycle travel footage, behind-the-scenes photography, and first-person POV recording.",
    primaryUses: [
      "Travel Videos",
      "Outdoor Activities",
      "Motorcycle Travel Footage",
      "Behind-the-Scenes Photography",
      "First-Person Recording",
    ],
    compatibility:
      "DJI magnetic quick-release mounting ecosystem, standard 1/4\"-20 tripod adapters, high-speed microSD cards (V30 / UHS-I U3 or higher), USB-C fast charging.",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "DJI Osmo Action 6 rugged waterproof action camera",
    specifications: [
      { label: "Camera Type", value: "Compact Waterproof Action Camera" },
      { label: "Lens Field of View", value: "155° Ultra-Wide Optics" },
      { label: "Stabilization Engine", value: "360° HorizonSteady & RockSteady electronic stabilization" },
      { label: "Waterproofing", value: "Native waterproof chassis without external case" },
      { label: "Displays", value: "Dual front and rear touchscreens for self-framing" },
      { label: "Operating Temperature", value: "Cold-resistant performance down to -20°C" },
      { label: "Weight", value: "Approx. 145g" },
    ],
    reviewUrl: "/photography-gear/dji-osmo-action-6",
    relatedPortfolioUrls: [
      { label: "Travel Expeditions", url: "/portfolio/travel" },
    ],
    ownershipStatus: "Active POV Rig",
    published: true,

    // Rich Template Extensions
    tagline: "Rugged waterproof action camera with ultra-wide optics and HorizonSteady.",
    overview:
      "The DJI Osmo Action 6 is built for extreme outdoor environments where traditional camera bodies cannot safely venture. With advanced electronic horizon stabilization, magnetic quick-release mounting, and dual touchscreens, it provides reliable point-of-view and behind-the-scenes recording.",
    personalUsage:
      "Utilized for motorcycle helmet POV, rigging on chase boats during water sports shoots, documenting rugged mountain trail ascents, and capturing wide-angle time lapses during documentary expeditions.",
    isPersonallyVerified: true,
    specs: [
      { label: "Sensor Size", value: "Large CMOS sensor with 10-bit color profile" },
      { label: "Lens Angle of View", value: "155° Ultra-Wide Field of View" },
      { label: "Stabilization", value: "RockSteady 3.0+ & 360° HorizonSteady" },
      { label: "Waterproofing", value: "Waterproof chassis without external case" },
      { label: "Screens", value: "Dual OLED Touchscreens (Front & Back)" },
      { label: "Battery Endurance", value: "Cold-resistant battery rated down to -20°C" },
      { label: "Weight", value: "Approx. 145g" },
    ],
    pros: [
      "Magnetic quick-release ecosystem allows instant repositioning between mounts",
      "360° HorizonSteady keeps the frame level even during extreme motorcycle banking or boat rocking",
      "Front touchscreen simplifies self-framing and technical parameter verification",
      "Deep native waterproofing removes the need for bulky diving housings in wet weather",
    ],
    cons: [
      "Small sensor physical size creates noticeable noise in deep night conditions",
      "Ultra-wide perspective exhibits optical distortion if held too close to human faces",
      "Requires high-speed V30 microSD cards for continuous 4K high-framerate capture",
    ],
    bestFor: [
      "Motorcycle travel footage and handlebar/helmet POV recording",
      "POV documentation during adventure travel and expedition assignments",
      "Water sports, surf chase boats, and rainy outdoor festivals",
      "Behind-the-scenes video snippets for client journals and social archives",
    ],
    situationsWhereUseful: [
      "Motorcycle touring across desert highways and mountain passes",
      "Mounting to kayak decks during coastal wildlife documentary trips",
      "Documenting setup timelapses of large wedding reception lighting rigs",
    ],
    imageOrAudioQuality:
      "Daylight dynamic range is rich with 10-bit color profile support. Internal stereo audio filters wind noise effectively with dual front mics.",
    portabilityAndHandling:
      "Pocket-sized and indestructible. Magnetic mounts latch onto clamps, poles, and vehicle suction cups within seconds.",
    limitations:
      "Fixed focal length means it cannot replace standard portrait glass; strictly designed for wide contextual framing and dynamic action.",
    whoShouldBuy:
      "Expedition creators, sports filmmakers, and outdoor photographers who want zero-worry weatherized POV footage alongside their mirrorless stills.",
    alternatives: [
      { name: "GoPro HERO12 Black", note: "Classic action competitor with extensive legacy mount ecosystem." },
      { name: "Insta360 Ace Pro", note: "Co-engineered with Leica featuring a flip screen." },
    ],
    relatedPortfolioCategory: "Travel",
    relatedPortfolioSlug: "/portfolio/travel",
    relatedTutorialSlug: "/blog/capturing-high-speed-sports-action-techniques",
    faqs: [
      {
        question: "Does the DJI Osmo Action 6 handle motorcycle vibration?",
        answer: "Yes, RockSteady and HorizonSteady algorithms absorb high-frequency engine vibration and keep footage level.",
      },
      {
        question: "Can it shoot vertical video for modern mobile distribution?",
        answer: "Yes, magnetic protective cages support direct vertical mounting for portrait orientation capture.",
      },
    ],
    retailerLinks: [
      {
        retailer: "DJI Official Store",
        url: "https://store.dji.com",
        isAffiliate: false,
        note: "Standard and adventure combo packages available.",
      },
    ],
  },

  // =========================================================================
  // 4. AUDIO EQUIPMENT
  // =========================================================================

  // 4.1 DJI Mic Mini
  {
    id: "gear-dji-mic-mini",
    slug: "dji-mic-mini",
    aliases: ["dji-mic-3"],
    name: "DJI Mic Mini",
    manufacturer: "DJI",
    category: "audio",
    categoryLabel: "Wireless microphone system",
    modelNumber: "DJI Mic Mini Wireless Audio System",
    description:
      "Ultra-compact wireless microphone system engineered for high-fidelity voice recording, photography behind-the-scenes video creation, travel vlogging, on-location interviews, and hybrid camera/smartphone audio capture.",
    primaryUses: [
      "Voice Recording",
      "Photography Behind-the-Scenes Videos",
      "Travel Vlogging",
      "On-Location Client Interviews",
      "Camera and Smartphone Audio Recording",
    ],
    compatibility:
      "Supported connection methods verified per equipment configuration: 3.5mm TRS analog camera interface, USB-C and Lightning digital smartphone connectivity, and magnetic clip-on clothing attachments.",
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "DJI Mic Mini wireless microphone system",
    specifications: [
      { label: "System Category", value: "Wireless Microphone System" },
      { label: "Wireless Transmission", value: "Digital 2.4 GHz low-latency transmission" },
      { label: "Form Factor", value: "Ultra-compact miniature transmitter with magnetic clip" },
      { label: "Supported Connections", value: "3.5mm TRS camera jack, USB-C digital interface, Lightning adapter" },
      { label: "Primary Recording Scope", value: "Voice, dialogue, vlogging, and ambient interview capture" },
      { label: "Battery & Charging", value: "Internal rechargeable battery with compact charging case" },
      { label: "Weight", value: "Approx. 10g per transmitter (ultra-lightweight)" },
    ],
    reviewUrl: "/photography-gear/dji-mic-mini",
    relatedPortfolioUrls: [
      { label: "Weddings & Ceremonies", url: "/portfolio/weddings" },
    ],
    ownershipStatus: "Active Audio Kit",
    published: true,

    // Rich Template Extensions
    tagline: "Ultra-compact wireless microphone kit for crystal-clear voice and BTS audio.",
    overview:
      "The DJI Mic Mini is an ultra-portable wireless audio solution engineered for creators on the move. Its discreet profile, reliable wireless transmission, and multi-device connection methods ensure clear speech recording during shoots, interviews, and travel vlogs.",
    personalUsage:
      "Used for recording couple vows during outdoor ceremonies, capturing athlete pre-game reflections, and recording voiceover commentary for our photography journal.",
    isPersonallyVerified: true,
    specs: [
      { label: "Channels", value: "Wireless Transmitter & Receiver system" },
      { label: "Transmission", value: "2.4 GHz digital frequency hopping" },
      { label: "Mounting System", value: "Magnetic clip and shoe adapter" },
      { label: "Connectivity", value: "3.5mm TRS, USB-C, Lightning" },
      { label: "Weight (Transmitter)", value: "Approx. 10g" },
    ],
    pros: [
      "Ultra-miniature form factor is practically invisible on lapels and collars",
      "Magnetic clip allows discreet mounting under clothing without stretching fabric",
      "Multi-device connection methods verified for mirrorless cameras, iPhones, and Android devices",
      "Instant automatic pairing right out of the charging case",
    ],
    cons: [
      "Windscreen must be firmly seated in high-wind outdoor environments",
      "Compact size requires careful storage to avoid misplacing miniature transmitters",
      "Direct line of sight recommended for maximum range stability",
    ],
    bestFor: [
      "Client vows and emotional ceremony dialogue",
      "Behind-the-scenes vlogging and photography YouTube features",
      "Fast-paced interviews where setting up wired audio would slow the production",
      "Camera and smartphone mobile recording",
    ],
    situationsWhereUseful: [
      "Mic'ing the subject discreetly during a portrait walkthrough",
      "Recording dialogue while walking through noisy wind or bustling streets",
      "Filming behind-the-scenes tutorial videos directly into the camera",
    ],
    imageOrAudioQuality:
      "Delivers warm, articulate vocal clarity with low self-noise. Intelligibility is optimized for speech frequencies, ensuring dialogue cuts through ambient music.",
    portabilityAndHandling:
      "Weighing only ~10 grams per transmitter, it is the lightest wireless audio kit in our inventory.",
    limitations:
      "Designed specifically for voice and dialogue; not intended for high-SPL instrument or concert recording.",
    whoShouldBuy:
      "Photographers, videographers, and content creators looking for a featherweight, reliable wireless microphone system for voice and BTS.",
    alternatives: [
      { name: "Røde Wireless ME", note: "Compact wireless system with built-in receiver microphone." },
      { name: "DJI Mic 2", note: "Larger flagship kit featuring 32-bit float internal backup recording." },
    ],
    relatedPortfolioCategory: "Weddings",
    relatedPortfolioSlug: "/portfolio/weddings",
    relatedTutorialSlug: "/blog/how-to-choose-a-wedding-photographer",
    faqs: [
      {
        question: "What connection methods are supported on the DJI Mic Mini?",
        answer: "It connects to cameras via standard 3.5mm TRS audio cables, and to smartphones and laptops via USB-C or Lightning adapters.",
      },
      {
        question: "Can it be used for smartphone video recording?",
        answer: "Yes, it pairs directly with mobile devices for high-quality audio in native camera and recording apps.",
      },
    ],
    retailerLinks: [
      {
        retailer: "DJI Official Store",
        url: "https://store.dji.com",
        isAffiliate: false,
        note: "Includes charging case and magnetic accessories.",
      },
    ],
  },

  // =========================================================================
  // 5. TRIPOD AND VIDEO SUPPORT
  // =========================================================================

  // 5.1 Dijitek 520BH Tripod
  {
    id: "gear-dijitek-520bh",
    slug: "dijitek-520bh",
    name: "Dijitek 520BH Tripod",
    manufacturer: "Dijitek",
    category: "tripods-and-support",
    categoryLabel: "Tripods and Support Equipment",
    modelNumber: "Dijitek 520BH / 130 Video Head Setup",
    description:
      "Heavy-duty support system featuring the Dijitek 520BH tripod legs configured with dual head options: the 130 video head for smooth fluid panning and the default ball head for rapid still framing. Displayed as one unified tripod and support system with independently editable head configurations.",
    primaryUses: [
      "Smooth Video Panning & Tilts",
      "Studio Staging & Stills",
      "Long-Exposure Landscape Photography",
      "Heavy Telephoto Lens Stability",
    ],
    compatibility:
      "Standard 3/8\"-16 and 1/4\"-20 tripod base mounts; configured with 130 video head and default ball head. (Mounting compatibility, payload rating, and head specifications allow independent configuration and verification).",
    imageUrl:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dijitek 520BH heavy-duty tripod with video and ball head support",
    specifications: [
      { label: "Tripod Model", value: "Dijitek 520BH" },
      { label: "Reported Head Configuration", value: "130 Video Head + Included Default Ball Head" },
      { label: "System Structure", value: "Unified tripod legs with dual interchangeable head setup" },
      { label: "Mounting Thread", value: "Standard 3/8\"-16 base / 1/4\"-20 camera mounting plate" },
      { label: "Leg Construction", value: "Heavy-duty multi-section locking legs with rubber feet" },
      { label: "Configuration Status", value: "Head model, compatibility, and specifications editable independently" },
      { label: "Maximum Load Capacity", value: "To be verified upon equipment confirmation" },
    ],
    reviewUrl: "/photography-gear/dijitek-520bh",
    relatedPortfolioUrls: [
      { label: "Commercial Photography", url: "/portfolio/commercial" },
    ],
    ownershipStatus: "Studio Support Rig",
    published: true,

    // Rich Template Extensions
    tagline: "Heavy-duty support system configured with 130 video head and default ball head.",
    overview:
      "The Dijitek 520BH is a versatile support system configured with the 130 video head for fluid cinematic moves and the default ball head for agile portrait and still photography framing. Designed as an adaptable foundation for both studio and field workflows.",
    personalUsage:
      "Utilized for fixed studio commercial staging, architectural interior bracketing, and smooth video panning during interviews and documentary sequences.",
    isPersonallyVerified: true,
    specs: [
      { label: "Tripod Base", value: "Dijitek 520BH" },
      { label: "Video Head", value: "130 Video Head" },
      { label: "Still Head", value: "Default Ball Head" },
      { label: "Mounting Compatibility", value: "3/8\"-16 and 1/4\"-20" },
      { label: "Head Configuration", value: "Independently editable" },
    ],
    pros: [
      "Dual head configuration allows quick switching between fluid video panning and still framing",
      "Sturdy multi-section leg construction isolates camera from floor vibrations and wind gusts",
      "Standard mounting threads accommodate third-party accessories and friction arms",
      "Independently editable head configuration supports future hardware upgrades",
    ],
    cons: [
      "Heavier profile than ultralight carbon travel tripods, best suited for vehicle transport and studio work",
      "Dual heads require dedicated storage space in equipment bags",
      "Exact load capacity and head specifications require verified equipment documentation",
    ],
    bestFor: [
      "Video panning and smooth tilt shots with the 130 video head",
      "Studio portraiture and commercial product staging with the ball head",
      "Long-exposure night photography and architectural brackets",
    ],
    situationsWhereUseful: [
      "Recording steady, jitter-free video interviews with slow tracking pans",
      "Positioning heavy camera rigs securely for multi-angle studio shoots",
      "Locking down compositions for composite and HDR landscape captures",
    ],
    imageOrAudioQuality:
      "Eliminates micro-shake from long exposures and heavy telephoto zooms, resulting in maximum optical sharpness from sensors.",
    portabilityAndHandling:
      "Rugged leg locks engage securely with positive tactile feedback. Built for reliable stability.",
    limitations:
      "Not designed as a lightweight backpacking tripod; optimized for stability and dual head versatility.",
    whoShouldBuy:
      "Creators who need an all-in-one support system that transitions seamlessly between video panning and still photography.",
    alternatives: [
      { name: "Manfrotto 502AH Video System", note: "Standard fluid head support benchmark." },
      { name: "Benro BV4", note: "Twin-leg video tripod setup for heavier cine rigs." },
    ],
    relatedPortfolioCategory: "Commercial",
    relatedPortfolioSlug: "/portfolio/commercial",
    relatedTutorialSlug: "/blog/understanding-commercial-photography-licensing",
    faqs: [
      {
        question: "Can the video head and ball head be used independently on the Dijitek 520BH?",
        answer: "Yes, the tripod uses standard mounting threads, allowing either the 130 video head or default ball head to be attached based on the assignment.",
      },
      {
        question: "Can the head model configuration be updated later?",
        answer: "Yes, all head specifications and model numbers are managed in the centralized equipment data system and can be updated as verified.",
      },
    ],
    retailerLinks: [
      {
        retailer: "Photography Specialty Retailers",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Check local distributor availability.",
      },
    ],
  },

  // =========================================================================
  // 6. STORAGE & MEMORY MEDIA
  // =========================================================================

  // 6.1 Sony CFexpress Type A 240GB Memory Card
  {
    id: "gear-sony-cfexpress-type-a-240gb",
    slug: "sony-cfexpress-type-a-240gb",
    name: "Sony CFexpress Type A 240GB Memory Card",
    manufacturer: "Sony",
    category: "storage-and-memory",
    categoryLabel: "CFexpress Type A memory card",
    modelNumber: "CEA-G240T (TOUGH Series / 240GB)",
    description:
      "Professional ultra-high-speed CFexpress Type A memory card engineered for Sony Alpha camera bodies like the Sony A7 V. Features rigid TOUGH construction, rapid write speeds for continuous high-speed sports bursts, and high-bitrate 4K video recording.",
    primaryUses: [
      "Continuous High-Speed Sports Bursts",
      "High-Bitrate 4K 60p/120p Video Recording",
      "Instant In-Camera Buffer Clearing",
      "Dual-Slot Redundancy for Client Shoot Security",
    ],
    compatibility:
      "Sony Alpha mirrorless cameras featuring CFexpress Type A slots (e.g. Sony A7 V, Sony A7 IV, Sony A1, Sony FX3, Sony A7S III) and dedicated CFexpress Type A card readers.",
    imageUrl:
      "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony CFexpress Type A 240GB professional high-speed memory card",
    specifications: [
      { label: "Card Format", value: "CFexpress Type A" },
      { label: "Storage Capacity", value: "240 GB" },
      { label: "Max Read Speed", value: "Up to 800 MB/s" },
      { label: "Max Write Speed", value: "Up to 700 MB/s" },
      { label: "Interface", value: "PCIe Gen3 x1" },
      { label: "Durability Rating", value: "TOUGH specification (10x drop resistance, 5x bend resistance)" },
      { label: "Dust & Water Resistance", value: "IP57 rated" },
    ],
    reviewUrl: "/photography-gear/sony-cfexpress-type-a-240gb",
    relatedPortfolioUrls: [
      { label: "Sports & Athletics", url: "/portfolio/sports" },
      { label: "Portraits", url: "/portfolio/portraits" },
    ],
    ownershipStatus: "Active Primary Media",
    published: true,

    // Rich Template Extensions
    tagline: "Rugged TOUGH series CFexpress Type A card for high-speed bursts and 4K video.",
    overview:
      "The Sony CEA-G240T CFexpress Type A card delivers the throughput required by modern Sony Alpha bodies for continuous high-speed uncompressed RAW bursts and high-framerate 4K video. Built with Sony's TOUGH resin-molded design for superior field reliability.",
    personalUsage:
      "Primary media card slotted into Slot 1 of our Sony A7 V for track sports tournaments, rapid-fire wedding vows, and high-bitrate video capture without buffer bottleneck.",
    isPersonallyVerified: true,
    specs: [
      { label: "Form Factor", value: "CFexpress Type A" },
      { label: "Capacity", value: "240 GB" },
      { label: "Read Speed", value: "Up to 800 MB/s" },
      { label: "Write Speed", value: "Up to 700 MB/s" },
      { label: "Durability", value: "IP57 Dust & Water Proof, TOUGH Spec" },
    ],
    pros: [
      "Ultra-fast write speed clears camera buffer virtually instantaneously during sports bursts",
      "TOUGH unibody resin molding resists bending, twisting, and accidental drops",
      "VPG200 certified for reliable, drop-free 4K video recording",
      "Generous 240GB capacity handles full-day editorial assignments with ease",
    ],
    cons: [
      "Requires dedicated CFexpress Type A card reader for full computer transfer speeds",
      "Higher price per gigabyte compared to conventional SD UHS-II cards",
    ],
    bestFor: [
      "High-speed sports and athletics where buffer stalls could miss critical action",
      "High-bitrate All-Intra 4K video recording on Sony Alpha bodies",
      "Demanding professional assignments requiring maximum media durability",
    ],
    situationsWhereUseful: [
      "Continuous 10+ fps bursts tracking sprinters at athletic meets",
      "All-day wedding ceremonies without pausing to swap cards",
      "Shooting in dusty outdoor environments or near splashing water",
    ],
    imageOrAudioQuality:
      "Ensures zero dropped frames during high-bitrate XAVC S-I 4K capture, with consistent sustained write performance.",
    portabilityAndHandling:
      "Compact Type A footprint, significantly smaller than Type B cards while maintaining professional speed.",
    limitations:
      "Compatible only with cameras supporting CFexpress Type A slots; cannot be inserted into Type B or standalone SD-only cameras.",
    whoShouldBuy:
      "Sony A7 V, A1, FX3, and A7 IV owners who want zero buffer lag and maximum media reliability.",
    alternatives: [
      { name: "Sony TOUGH SD UHS-II (128GB/256GB)", note: "Fast SD alternative for standard burst requirements." },
      { name: "ProGrade Digital CFexpress Type A", note: "Third-party Type A card option." },
    ],
    relatedPortfolioCategory: "Sports",
    relatedPortfolioSlug: "/portfolio/sports",
    faqs: [
      {
        question: "Does the Sony A7 V require CFexpress Type A cards?",
        answer: "While the A7 V also accepts SD UHS-II cards in its dual hybrid slots, CFexpress Type A is essential to unlock maximum burst buffer clearing and highest video bitrates.",
      },
      {
        question: "Can this card be read in standard SD card slots?",
        answer: "No, CFexpress Type A uses a different pin architecture and requires a dedicated CFexpress Type A reader or direct USB-C camera tethering.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Authorized Sony Pro dealer.",
      },
    ],
  },

  // 6.2 Lexar SL500 1TB Portable SSD
  {
    id: "gear-lexar-sl500-1tb-ssd",
    slug: "lexar-sl500-1tb-ssd",
    aliases: ["lexar-1tb-ssd", "lexar-500-1tb-ssd"],
    name: "Lexar SL500 1TB Portable SSD",
    manufacturer: "Lexar",
    category: "storage-and-memory",
    categoryLabel: "Portable solid-state drive",
    modelNumber: "Lexar SL500 1TB (LSL500X001T)",
    description:
      "Credit card-sized ultra-slim external solid-state drive with 1TB capacity and blazing USB 3.2 Gen 2x2 transfer speeds. Used for rapid on-location shoot backups, instant client gallery offloading, and secure field storage of high-resolution RAW files and 4K footage.",
    primaryUses: [
      "On-Location Field Shoot Backups",
      "Rapid RAW & Video Offloading from Memory Cards",
      "Travel Workflow & Laptop Storage Expansion",
      "Client Deliverable Transfer & Safe Archiving",
    ],
    compatibility:
      "Universal USB Type-C connection. Compatible with Mac, Windows PC, iPad, Android smartphones, and direct-recording cameras with USB-C mass storage support.",
    imageUrl:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Lexar SL500 1TB portable external SSD drive",
    specifications: [
      { label: "Drive Type", value: "Portable Solid State Drive (External SSD)" },
      { label: "Capacity", value: "1 TB" },
      { label: "Interface", value: "USB 3.2 Gen 2x2 Type-C" },
      { label: "Read Speed", value: "Up to 2,000 MB/s" },
      { label: "Write Speed", value: "Up to 1,800 MB/s" },
      { label: "Enclosure", value: "Ultra-slim sleek aluminum unibody enclosure" },
      { label: "Security", value: "256-bit AES software encryption support" },
      { label: "Weight", value: "Approx. 43g (featherweight)" },
    ],
    reviewUrl: "/photography-gear/lexar-sl500-1tb-ssd",
    relatedPortfolioUrls: [
      { label: "Commercial Photography", url: "/portfolio/commercial" },
      { label: "Travel & Expeditions", url: "/portfolio/travel" },
    ],
    ownershipStatus: "Active Field Backup Drive",
    published: true,

    // Rich Template Extensions
    tagline: "Ultra-slim 1TB portable SSD with up to 2,000 MB/s transfer speed for field backup.",
    overview:
      "The Lexar SL500 portable SSD combines an impossibly thin aluminum enclosure with blazing transfer speeds up to 2,000 MB/s read. It provides instant on-location backup for thousands of high-resolution RAW files, reducing offload times from card readers down to minutes.",
    personalUsage:
      "Carried in our primary camera bag on every client assignment for immediate on-site dual-backup offload before leaving the venue.",
    isPersonallyVerified: true,
    specs: [
      { label: "Storage Capacity", value: "1 TB" },
      { label: "Host Interface", value: "USB 3.2 Gen 2x2 Type-C" },
      { label: "Sequential Read", value: "Up to 2,000 MB/s" },
      { label: "Sequential Write", value: "Up to 1,800 MB/s" },
      { label: "Weight", value: "Approx. 43g" },
    ],
    pros: [
      "Incredible transfer speeds (up to 2,000 MB/s) slash field offload and backup times",
      "Ultra-slim 4.8mm credit-card profile fits into any shirt or backpack pocket",
      "Durable aluminum unibody dissipates heat efficiently during continuous sustained writes",
      "Plug-and-play compatibility across Mac, PC, iPad, iPhone, and Android devices",
    ],
    cons: [
      "Reaching full 2,000 MB/s requires a USB 3.2 Gen 2x2 port (operates at 1,000 MB/s on standard USB 3.2 Gen 2 ports)",
      "Included short USB-C cable requires care when placed on uneven surfaces",
    ],
    bestFor: [
      "High-volume wedding and commercial shoots requiring immediate on-site duplicate backups",
      "Travel photographers who want featherweight laptop storage expansion",
      "Direct ProRes recording from compatible mobile devices and cameras",
    ],
    situationsWhereUseful: [
      "Backing up dual memory cards during wedding reception dinner breaks",
      "Offloading thousands of 50 MP sports RAW files in the media room",
      "Editing high-resolution photo catalogs directly off the drive on laptop",
    ],
    imageOrAudioQuality:
      "Solid-state design ensures zero mechanical vibration or head-parking failures in mobile working environments.",
    portabilityAndHandling:
      "At just 43 grams, it is one of the lightest and most compact 1TB portable SSDs on the market.",
    limitations:
      "Not immersion waterproof; store in protective pouch during torrential rain.",
    whoShouldBuy:
      "Working photographers, videographers, and travel creators needing lightning-fast, ultra-portable field backup.",
    alternatives: [
      { name: "SanDisk Extreme Portable SSD", note: "Rugged rubberized bumper design with IP55 rating." },
      { name: "Samsung T7 Shield", note: "Durable IP65-rated portable SSD with 1,050 MB/s speeds." },
    ],
    relatedPortfolioCategory: "Commercial",
    relatedPortfolioSlug: "/portfolio/commercial",
    faqs: [
      {
        question: "Can I edit Lightroom catalogs directly on the Lexar SL500?",
        answer: "Yes, with sequential speeds over 1,000–2,000 MB/s, editing RAW catalogs and 4K video timelines directly off the drive is seamless.",
      },
      {
        question: "Does it work with iPads and smartphones?",
        answer: "Yes, it connects directly via USB-C to modern iPads, iPhones (with USB-C), and Android devices without external power.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Includes USB-C cable.",
      },
    ],
  },

  // =========================================================================
  // 7. CAMERA ACCESSORIES & FILTERS
  // =========================================================================

  // 7.1 ND Filter Set for DJI Osmo Action 6
  {
    id: "gear-dji-action-6-nd-filters",
    slug: "dji-action-6-nd-filters",
    aliases: ["dji-osmo-action-6-nd-filters"],
    name: "ND Filter Set for DJI Osmo Action 6",
    manufacturer: "DJI",
    category: "accessories",
    categoryLabel: "Action camera optical filters",
    modelNumber: "DJI Osmo Action ND Filter Kit (ND8/16/32/64)",
    description:
      "Precision optical Neutral Density (ND) filter set engineered specifically for the DJI Osmo Action 6. Controls incoming light in bright outdoor environments, allowing cinematic 180-degree shutter angles, natural motion blur on motorcycle footage, and glare-free video across open water and desert sun.",
    primaryUses: [
      "Cinematic Shutter Angle Control (180° Rule)",
      "Natural Motion Blur for Motorcycle & POV Videos",
      "High-Sun Exposure Management",
      "Water Sports & Glare Reduction",
    ],
    compatibility:
      "Specifically designed for DJI Osmo Action 6 lens mounting bezel (native twist/snap fit with rubber gasket seal).",
    imageUrl:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Neutral Density optical filter set for DJI Osmo Action camera",
    specifications: [
      { label: "Filter Types Included", value: "ND8, ND16, ND32, ND64" },
      { label: "Optical Glass", value: "Multi-coated optical glass with scratch and oil-resistant coatings" },
      { label: "Mounting Type", value: "Direct replacement lens bezel mount with water-tight gasket" },
      { label: "Purpose", value: "Reduces light transmission by 3 to 6 f-stops without color shift" },
      { label: "Weight", value: "Approx. 5g per filter" },
    ],
    reviewUrl: "/photography-gear/dji-action-6-nd-filters",
    relatedPortfolioUrls: [
      { label: "Travel & Expeditions", url: "/portfolio/travel" },
      { label: "Sports & Action", url: "/portfolio/sports" },
    ],
    ownershipStatus: "Active POV Accessory",
    published: true,

    // Rich Template Extensions
    tagline: "Precision optical ND filter set for cinematic shutter angles and motion blur on Osmo Action 6.",
    overview:
      "A must-have optical accessory kit for the DJI Osmo Action 6, providing ND8, ND16, ND32, and ND64 filters. By reducing light hitting the sensor in bright conditions, it allows you to lock your shutter speed to double your framerate, creating buttery-smooth motion blur instead of jittery high-shutter video.",
    personalUsage:
      "Permanently utilized on our DJI Osmo Action 6 for motorcycle travel footage and bright midday watersports where natural speed blur gives footage a cinematic cadence.",
    isPersonallyVerified: true,
    specs: [
      { label: "Included Densities", value: "ND8 (3 stops), ND16 (4 stops), ND32 (5 stops), ND64 (6 stops)" },
      { label: "Glass Coating", value: "AF hydrophobic, anti-scratch, anti-reflective coating" },
      { label: "Compatibility", value: "DJI Osmo Action 6" },
      { label: "Weight", value: "Approx. 5g per filter" },
    ],
    pros: [
      "Enables cinematic motion blur on motorcycle and high-speed POV video",
      "Direct bezel thread replacement maintains watertight seal on the camera",
      "Neutral color transmission without unwanted magenta or green color casts",
      "Compact protective carry case keeps filters organized in the field",
    ],
    cons: [
      "Must be removed in low-light dusk or indoor conditions to prevent underexposure",
      "Small optical glass requires microfiber lens cloth to keep free of fingerprints",
    ],
    bestFor: [
      "Motorcycle travel footage and bicycle handlebar mounts",
      "Bright midday beach, surf, and snow sports capture",
      "Cinematic travel videos requiring smooth 180-degree shutter angles",
    ],
    situationsWhereUseful: [
      "Motorcycle tours under harsh desert noon sun where shutter speeds would otherwise spike to 1/2000s",
      "Capturing river rafting and kayaking with smooth splashing water",
      "Outdoor action documentary sequences",
    ],
    imageOrAudioQuality:
      "Multi-coated optical glass prevents stray flares and maintains full sensor resolution and contrast.",
    portabilityAndHandling:
      "Filters twist securely onto the lens bezel with a positive click lock.",
    limitations:
      "Engineered specifically for the Osmo Action 6 bezel dimensions.",
    whoShouldBuy:
      "Any DJI Osmo Action 6 owner filming outdoors who wants professional cinematic video cadence instead of choppy motion.",
    alternatives: [
      { name: "Freewell All Day ND Kit", note: "Third-party alternative with magnetic mounting." },
      { name: "PolarPro Shutter Collection", note: "Cinema glass ND filter set." },
    ],
    relatedPortfolioCategory: "Travel",
    relatedPortfolioSlug: "/portfolio/travel",
    faqs: [
      {
        question: "Why are ND filters necessary on an action camera?",
        answer: "Because action cameras have fixed apertures, the only way to prevent overexposure in bright sun is to raise shutter speed, which makes motion look jittery. An ND filter allows you to keep shutter speed at 1/50s or 1/120s for natural motion blur.",
      },
      {
        question: "Does the camera stay waterproof with the ND filter attached?",
        answer: "Yes, the replacement filter bezel includes the integrated rubber gasket preserving water resistance.",
      },
    ],
    retailerLinks: [
      {
        retailer: "DJI Official Store",
        url: "https://store.dji.com",
        isAffiliate: false,
        note: "Official manufacturer accessories.",
      },
    ],
  },

  // 7.2 Waterproof Diving Case for DJI Osmo Action 6
  {
    id: "gear-dji-action-6-waterproof-case",
    slug: "dji-action-6-waterproof-case",
    aliases: ["dji-osmo-action-6-waterproof-case"],
    name: "Waterproof Case for DJI Osmo Action 6",
    manufacturer: "DJI",
    category: "accessories",
    categoryLabel: "Underwater protective housing",
    modelNumber: "DJI Osmo Action 6 Waterproof Housing (60m Rated)",
    description:
      "Rugged deep-water submersible protective housing designed for the DJI Osmo Action 6. Extends water resistance down to 60 meters (197 ft) while shielding the camera against heavy surf impact, sharp coral reefs, sand abrasion, and high-pressure water jets.",
    primaryUses: [
      "Deep Water Scuba & Free Diving (up to 60m)",
      "Heavy Ocean Surf & High-Impact Water Sports",
      "Mud, Sand, and Severe Element Protection",
      "Extreme Adventure Rigging",
    ],
    compatibility:
      "Precision-molded for the DJI Osmo Action 6 body; features dual-prong mounting ears compatible with all standard action camera mounts and quick-release adapters.",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Waterproof diving protective case housing for DJI Osmo Action camera",
    specifications: [
      { label: "Depth Rating", value: "Waterproof up to 60 meters (197 feet)" },
      { label: "Lens Glass", value: "Flat optical tempered glass port for distortion-free underwater clarity" },
      { label: "Latch Mechanism", value: "Secure locking latch with silicone sealing ring" },
      { label: "Button Controls", value: "Stainless steel spring-loaded external buttons for full underwater operation" },
      { label: "Weight", value: "Approx. 130g" },
    ],
    reviewUrl: "/photography-gear/dji-action-6-waterproof-case",
    relatedPortfolioUrls: [
      { label: "Travel & Expeditions", url: "/portfolio/travel" },
    ],
    ownershipStatus: "Active Marine Accessory",
    published: true,

    // Rich Template Extensions
    tagline: "Rugged 60m submersible diving housing for extreme underwater depth and impact protection.",
    overview:
      "While the DJI Osmo Action 6 has native waterproofing for shallow activities, this dedicated diving housing extends safe operating depth to 60 meters (197 ft). Tempered flat optical glass preserves underwater sharpness without chromatic distortion.",
    personalUsage:
      "Used for scuba diving underwater documentation, mounting on boat transoms subjected to high-speed water pressure, and harsh river expedition rigging.",
    isPersonallyVerified: true,
    specs: [
      { label: "Maximum Depth", value: "60 meters (197 ft)" },
      { label: "Port Material", value: "High-transparency tempered optical glass" },
      { label: "Buttons", value: "Corrosion-resistant stainless steel buttons" },
      { label: "Weight", value: "Approx. 130g" },
    ],
    pros: [
      "Extends dive depth rating from native surface depths to 60 meters for scuba exploration",
      "Protects the camera chassis from sharp rocks, high-impact wave crashes, and sand scuffs",
      "Flat optical glass port prevents underwater optical vignetting and distortion",
      "Heavy-duty spring latch prevents accidental opening under water pressure",
    ],
    cons: [
      "Muffles internal microphone audio (external audio required for dialogue)",
      "Touchscreen operation is disabled underwater; camera is controlled via physical buttons",
    ],
    bestFor: [
      "Scuba diving, deep spearfishing, and marine biology expeditions",
      "High-pressure boat wakeboarding and wave impacts",
      "Harsh off-road mud and silt racing where cleaning the housing is easier than the camera",
    ],
    situationsWhereUseful: [
      "Coral reef diving at 20–30 meter depths",
      "Rigging to kayak bows that pierce heavy whitewater rapids",
      "Protecting camera from sandstorms on desert motorcycle rallies",
    ],
    imageOrAudioQuality:
      "Maintains crisp edge-to-edge optical clarity through the anti-reflective tempered glass port.",
    portabilityAndHandling:
      "Easy latch access with anti-fog insert slots inside the housing.",
    limitations:
      "Blocks direct USB-C port access while sealed.",
    whoShouldBuy:
      "Divers, marine photographers, and extreme water sports enthusiasts pushing the Osmo Action 6 beyond surface depths.",
    alternatives: [
      { name: "Third-party Dive Shells", note: "Budget underwater case options." },
    ],
    relatedPortfolioCategory: "Travel",
    relatedPortfolioSlug: "/portfolio/travel",
    faqs: [
      {
        question: "Why do I need a waterproof case if the Osmo Action 6 is already waterproof?",
        answer: "Native waterproofing is designed for surface water and shallow snorkeling. For deep scuba diving (beyond 18–20m) and high-impact boat water pressure, this housing is essential to protect seals and maintain pressure integrity down to 60 meters.",
      },
      {
        question: "Can I operate the camera inside the case?",
        answer: "Yes, spring-loaded stainless steel buttons allow full power, mode switching, and shutter control underwater.",
      },
    ],
    retailerLinks: [
      {
        retailer: "DJI Official Store",
        url: "https://store.dji.com",
        isAffiliate: false,
        note: "Includes anti-fog inserts.",
      },
    ],
  },
];

// Helper functions for lookup & routing
export function getGearItemBySlug(slug: string): GearItem | undefined {
  const normalized = slug.toLowerCase();
  return GEAR_ITEMS.find(
    (item) =>
      item.slug.toLowerCase() === normalized ||
      (item.aliases && item.aliases.some((a) => a.toLowerCase() === normalized))
  );
}

export function getGearItemsByCategory(category: GearCategory): GearItem[] {
  return GEAR_ITEMS.filter((item) => item.category === category && item.published);
}

// =========================================================================
// GEAR COMPARISONS (Preserved for compatibility and comparison routes)
// =========================================================================

export const GEAR_COMPARISONS: GearComparison[] = [
  {
    slug: "sony-200-600mm-vs-sony-100-400mm",
    title: "Sony 200–600mm vs. Sony 100–400mm GM: Telephoto Field Comparison",
    description:
      "An in-depth real-world comparison between Sony's internal-zoom 200–600mm G and the compact 100–400mm G Master for wildlife, field sports, and expedition travel.",
    heroImage:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Super-telephoto lens compared in field conditions",
    itemA: {
      name: "Sony FE 200–600mm F5.6–6.3 G OSS",
      slug: "sony-200-600mm",
      category: "Full-frame telephoto zoom lens",
      highlight: "Internal zoom mechanism and 600mm native reach",
    },
    itemB: {
      name: "Sony FE 100–400mm F4.5–5.6 GM OSS",
      category: "Full-frame telephoto zoom lens",
      highlight: "Compact travel packability and 0.98m close focus",
    },
    summary:
      "Both lenses are optical standouts in the Sony E-mount ecosystem, but they serve distinct operational needs. The 200–600mm is the undisputed champion for dedicated wildlife and field sports where reach and gimbal balance take precedence. The 100–400mm GM shines for mobile backcountry hikers and travel photographers who need versatility, closer focusing, and reduced backpack weight.",
    specComparison: [
      { feature: "Focal Length Range", itemAValue: "200–600mm", itemBValue: "100–400mm" },
      { feature: "Maximum Aperture", itemAValue: "f/5.6–f/6.3", itemBValue: "f/4.5–f/5.6" },
      { feature: "Zoom Mechanism", itemAValue: "Internal (fixed barrel length)", itemBValue: "External extending barrel" },
      { feature: "Weight", itemAValue: "2,115g (74.6 oz)", itemBValue: "1,395g (49.2 oz)" },
      { feature: "Filter Diameter", itemAValue: "95mm", itemBValue: "77mm" },
      { feature: "Minimum Focus Distance", itemAValue: "2.4m (7.88 ft)", itemBValue: "0.98m (3.22 ft)" },
      { feature: "Teleconverter Support", itemAValue: "1.4x and 2.0x (full AF support)", itemBValue: "1.4x and 2.0x" },
    ],
    prosAndCons: {
      itemAPros: [
        "Internal zoom preserves perfect gimbal/monopod balance",
        "200mm extra reach brings skittish wildlife and distant action close",
        "Rapid 90-degree short-throw zoom ring",
      ],
      itemACons: [
        "Significantly heavier (2.1 kg) for prolonged handheld carrying",
        "Modest f/6.3 aperture at the long end requires higher ISO at dusk",
      ],
      itemBPros: [
        "Over 700g lighter and fits horizontally into standard camera backpacks",
        "Very close minimum focusing distance (0.98m) enables tele-macro floral and insect details",
        "100mm wide end offers greater flexibility for closer athletes",
      ],
      itemBCons: [
        "Barrel extends during zoom, shifting balance forward",
        "400mm reach can feel short for open savannah or small songbirds",
      ],
    },
    intendedUseCases: {
      itemAUse: "Best for dedicated stadium sports, surf line-ups, safari safaris, and stationary bird blinds.",
      itemBUse: "Best for expedition hiking, mountain landscapes, air shows, and versatile travel documentary.",
    },
    tradeOffAnalysis:
      "The primary trade-off comes down to reach vs. portability. The 200–600mm gives you true super-telephoto power and internal balance at the cost of pack size. The 100–400mm GM sacrifices 200mm of reach but provides superior packability and versatile close-up capabilities.",
    practicalRecommendation:
      "If your assignments revolve around birds, distant wildlife, or tracking athletics from fixed media stands, choose the 200–600mm. If you hike long distances or need a single telephoto that handles both landscapes and active subjects, choose the 100–400mm GM.",
    faqs: [
      {
        question: "Is the 200-600mm noticeably heavier in the field than the 100-400mm?",
        answer: "Yes, the 720g difference is noticeable during handheld shooting. A monopod is strongly advised for the 200-600mm on multi-hour shoots.",
      },
      {
        question: "Does the 200-600mm balance better on a gimbal head?",
        answer: "Significantly so. Because its center of gravity does not shift when zooming from 200mm to 600mm, it stays perfectly balanced on gimbal mounts.",
      },
    ],
  },
  {
    slug: "nd-filters-vs-cpl-filters",
    title: "ND Filters vs. CPL Filters: Which Filter Do You Need First?",
    description:
      "Understanding the optical differences, practical field scenarios, and creative applications of Neutral Density and Circular Polarizing filters.",
    heroImage:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80",
    heroAlt: "Camera lens filters compared side by side",
    itemA: {
      name: "Neutral Density (ND) Filters",
      category: "Optical density glass",
      highlight: "Reduces overall light transmission without altering color",
    },
    itemB: {
      name: "Circular Polarizer (CPL) Filters",
      category: "Polarizing glass",
      highlight: "Eliminates surface glare and increases color saturation",
    },
    summary:
      "ND and CPL filters serve completely different photographic goals. An ND filter acts as sunglasses for your sensor, allowing slow shutter speeds in bright daylight for silky waterfalls or cinematic video shutter angles. A CPL cuts polarized light, cutting surface glare from water, foliage, and glass while boosting natural sky contrast—an effect that cannot be duplicated in editing software.",
    specComparison: [
      { feature: "Primary Optical Function", itemAValue: "Light attenuation (exposure reduction)", itemBValue: "Polarization and reflection cut" },
      { feature: "Impact on Shutter Speed", itemAValue: "Drastically slows shutter (3 to 10 stops)", itemBValue: "Mild light loss (approx. 1 to 1.5 stops)" },
      { feature: "Impact on Reflections", itemAValue: "None (water surface reflects normally)", itemBValue: "Cuts surface glare, revealing underwater detail" },
      { feature: "Impact on Sky & Foliage", itemAValue: "Neutral color reproduction", itemBValue: "Deepens blue sky and boosts green leaf saturation" },
      { feature: "Can Be Replicated in Post?", itemAValue: "Partially (via computational exposure averaging)", itemBValue: "No (lost polarized reflections cannot be recovered in RAW)" },
    ],
    prosAndCons: {
      itemAPros: [
        "Enables dreamlike long exposures of ocean tides, clouds, and waterfalls",
        "Allows shooting wide open at f/1.4 or f/1.8 under blazing midday sunlight",
        "Crucial for video shooters maintaining the 180-degree shutter rule",
      ],
      itemACons: [
        "Requires a tripod for longer shutter exposures",
        "Extreme 10-stop NDs can make framing and autofocus dark without live view gain",
      ],
      itemBPros: [
        "Removes haze and enriches sky and landscape colors organically",
        "Eliminates glare from car windshields, wet rocks, and reflective water",
        "Rotatable front element allows variable control in real time",
      ],
      itemBCons: [
        "Uneven polarization band can appear on ultra-wide lenses (wider than 24mm)",
        "Costs 1–1.5 stops of light, requiring ISO adjustment in darker conditions",
      ],
    },
    intendedUseCases: {
      itemAUse: "Essential for landscape long-exposure photographers, waterfall documentarians, and daylight filmmakers.",
      itemBUse: "Essential for outdoor portrait photographers, automotive photographers, and travel landscape artists.",
    },
    tradeOffAnalysis:
      "A CPL is about light direction and reflection management. An ND filter is about exposure duration and aperture flexibility. Many professional landscape photographers stack a CPL with an ND filter to enjoy both glare removal and silky water motion simultaneously.",
    practicalRecommendation:
      "If you shoot landscapes, architecture, or outdoor portraits, buy a quality Circular Polarizer first—its optical glare removal cannot be faked in Photoshop. If you want to create milky waterfall motion or shoot video at 1/50s in full sun, invest in a 3-stop or 6-stop ND filter.",
    faqs: [
      {
        question: "Can I stack an ND filter and a CPL filter together?",
        answer: "Yes, you can screw a CPL onto an ND filter. Use slim brass filter rings to avoid optical vignetting in the frame corners on wide-angle lenses.",
      },
      {
        question: "Why does my CPL filter look patchy in the sky on wide-angle lenses?",
        answer: "At focal lengths wider than 24mm, the lens captures a wider swath of sky than the 90-degree polarization sweet spot, resulting in a dark polarization band. Rotate the filter slightly to reduce the effect.",
      },
    ],
  },
];

// =========================================================================
// HINDI LOCALIZATION DICTIONARIES & HELPERS
// =========================================================================

export const GEAR_CATEGORIES_LOCALIZED: Record<"en" | "hi", { id: GearCategory; label: string; description: string }[]> = {
  en: GEAR_CATEGORIES,
  hi: [
    {
      id: "camera-bodies",
      label: "कैमरा बॉडीज़",
      description: "फुल-फ्रेम और एपीएस-सी मिररलेस सेंसर जो विस्तृत डायनामिक रेंज, तेज़ बर्स्ट और विश्वसनीय इमेज कैप्चर प्रदान करते हैं।",
    },
    {
      id: "lenses",
      label: "कैमरा लेंस",
      description: "एज-टू-एज ऑप्टिकल रिज़ॉल्यूशन, प्राकृतिक परिप्रेक्ष्य और लंबी दूरी की पहुंच के लिए चयनित प्राइम और टेलीफोटो लेंस।",
    },
    {
      id: "action-cameras",
      label: "एक्शन कैमरे",
      description: "एडवेंचर, यात्रा, मोटरसाइकिल और फर्स्ट-पर्सन वीडियो के लिए मजबूत और स्थिर एक्शन कैमरे।",
    },
    {
      id: "audio",
      label: "ऑडियो उपकरण",
      description: "साक्षात्कार, बिहाइंड-द-सीन और स्पष्ट वॉयस रिकॉर्डिंग के लिए कॉम्पैक्ट वायरलेस माइक सिस्टम।",
    },
    {
      id: "tripods-and-support",
      label: "ट्राइपॉड एवं मैकेनिकल सपोर्ट",
      description: "स्टूडियो और फील्ड में सटीक फ्रेमिंग और लंबे एक्सपोज़र के लिए मजबूत ट्राइपॉड और बॉल-हेड प्लेटफॉर्म।",
    },
    {
      id: "storage-and-memory",
      label: "स्टोरेज एवं मेमोरी मीडिया",
      description: "हाई-स्पीड सीएफएक्सप्रेस कार्ड और पोर्टेबल एसएसडी जो फील्ड में त्वरित बैकअप और बफर क्लियरिंग सुनिश्चित करते हैं।",
    },
    {
      id: "accessories",
      label: "कैमरा एक्सेसरीज़ एवं फिल्टर",
      description: "सिनेमैटिक वीडियो और सुरक्षा के लिए समर्पित ऑप्टिकल एनडी फिल्टर और वाटरप्रूफ डाइव हाउसिंग।",
    },
  ],
};

export const GEAR_ITEMS_HINDI: Record<string, Partial<GearItem>> = {
  "gear-sony-a7-v": {
    categoryLabel: "फुल-फ्रेम मिररलेस कैमरा",
    tagline: "अत्याधुनिक फुल-फ्रेम एआई-पावर्ड हाइब्रिड कैमरा बॉडी",
    description: "नेक्स्ट-जेनरेशन फुल-फ्रेम हाइब्रिड मिररलेस कैमरा बॉडी जो एडवांस्ड एआई सब्जेक्ट रिकॉग्निशन ऑटोफोकस, विस्तृत डायनामिक रेंज और विभिन्न लाइटिंग में हाई-स्पीड बर्स्ट शूटिंग को जोड़ती है।",
    primaryUses: ["वन्यजीव फोटोग्राफी", "खेल फोटोग्राफी", "पोर्ट्रेट फोटोग्राफी", "यात्रा फोटोग्राफी"],
    compatibility: "सोनी ई-माउंट फुल-फ्रेम लेंस (मूल), सोनी ई-माउंट एपीएस-सी लेंस (ऑटो क्रॉप), डुअल सीएफएक्सप्रेस टाइप ए / एसडी यूएचएस-II स्लॉट्स।",
    ownershipStatus: "स्टूडियो कार्यशाला उपकरण (सत्यापित)",
  },
  "gear-sony-a6000": {
    categoryLabel: "एपीएस-सी मिररलेस कैमरा",
    tagline: "अत्यधिक कॉम्पैक्ट और तेज़ 24.3MP एपीएस-सी कैमरा",
    description: "सिद्ध 24.3 मेगापिक्सेल एपीएस-सी सेंसर और 179-पॉइंट फेज़-डिटेक्शन ऑटोफोकस वाला कॉम्पैक्ट और हल्का मिररलेस कैमरा, जो यात्रा और त्वरित फील्ड शूटिंग के लिए आदर्श है।",
    primaryUses: ["एपीएस-सी सिस्टम फोटोग्राफी", "स्ट्रीट एवं डॉक्यूमेंट्री", "यात्रा फोटोग्राफी", "पोर्टेबल बैकअप बॉडी"],
    compatibility: "सोनी ई-माउंट एपीएस-सी एवं फुल-फ्रेम लेंस, एसडी कार्ड, सोनी मल्टी-इंटरफेस शू।",
    ownershipStatus: "सक्रिय बैकअप एवं यात्रा उपकरण",
  },
  "gear-sony-50mm-full-frame": {
    categoryLabel: "फुल-फ्रेम प्राइम लेंस",
    tagline: "प्राकृतिक परिप्रेक्ष्य और सुंदर बैकग्राउंड बोकेह वाला क्लासिक प्राइम लेंस",
    description: "हल्का और बहुमुखी 50mm f/1.8 सामान्य प्राइम लेंस, जो मानव आँख के प्राकृतिक दृष्टिकोण, उत्कृष्ट लो-लाइट क्षमता और खूबसूरत बैकग्राउंड सेपरेशन देता है।",
    primaryUses: ["पोर्ट्रेट फोटोग्राफी", "कम रोशनी में शूटिंग", "स्ट्रीट फोटोग्राफी", "दैनिक वृत्तचित्र"],
    compatibility: "सोनी ई-माउंट फुल-फ्रेम कैमरे (मूल 50mm) एवं एपीएस-सी कैमरे (75mm समकक्ष)।",
    ownershipStatus: "स्टूडियो प्राइम लेंस",
  },
  "gear-sony-50mm-apsc": {
    categoryLabel: "एपीएस-सी प्राइम लेंस",
    tagline: "ऑप्टिकल इमेज स्टेबिलाइजेशन युक्त समर्पित पोर्ट्रेट लेंस",
    description: "ऑप्टिकल स्टेडीशॉट (OSS) इमेज स्टेबिलाइजेशन और f/1.8 बड़े अपर्चर से सुसज्जित कॉम्पैक्ट पोर्ट्रेट लेंस, जो एपीएस-सी कैमरों पर 75mm टेलीफोटो कवरेज के साथ क्रिस्टल-क्लियर पोर्ट्रेट देता है।",
    primaryUses: ["पोर्ट्रेट एवं हेडशॉट फोटोग्राफी", "कम रोशनी में हैंडेल्ड शूटिंग", "कैंडिड एवं इवेंट पोर्ट्रेट"],
    compatibility: "सोनी ई-माउंट एपीएस-सी कैमरे (A6000, A6400, A6700, आदि)।",
    ownershipStatus: "सक्रिय एपीएस-सी पोर्ट्रेट लेंस",
  },
  "gear-sony-200-600mm": {
    categoryLabel: "फुल-फ्रेम सुपर टेलीफोटो ज़ूम लेंस",
    tagline: "आंतरिक ज़ूम और ऑप्टिकल स्टेडीशॉट युक्त पेशेवर सुपर-टेलीफोटो",
    description: "पेशेवर सुपर-टेलीफोटो ज़ूम लेंस जो आंतरिक ज़ूम मैकेनिज्म, डायरेक्ट ड्राइव एसएसएम ऑटोफोकस और मौसम-प्रतिरोधी सीलिंग के साथ दूरस्थ वन्यजीवों और खेल के पलों को असाधारण शार्पनेस से कैद करता है।",
    primaryUses: ["वन्यजीव एवं पक्षी फोटोग्राफी", "आउटडोर खेल फोटोग्राफी", "दूरस्थ एक्शन एवं यात्रा"],
    compatibility: "सोनी ई-माउंट फुल-फ्रेम कैमरे, सोनी 1.4x (840mm) एवं 2.0x (1200mm) टेलीकन्वर्टर।",
    ownershipStatus: "मुख्य वन्यजीव एवं खेल लेंस",
  },
  "gear-dji-osmo-action-6": {
    categoryLabel: "एक्शन कैमरा",
    tagline: "उन्नत स्टेबिलाइजेशन और डुअल ओएलईडी टचस्क्रीन वाला रग्ड एक्शन कैमरा",
    description: "अत्यधिक मजबूत और कॉम्पैक्ट एक्शन कैमरा, जो रॉकस्टेडी स्टेबिलाइजेशन, 4K हाई-फ्रेम रेट कैप्चर और बिना केस के गहरे पानी में काम करने की क्षमता से लैस है।",
    primaryUses: ["हाई-इम्पैक्ट एक्शन एवं स्पोर्ट्स", "यात्रा एवं मोटोव्लॉगिंग", "जलक्रीड़ा एवं रफ फील्ड व्लॉग"],
    compatibility: "डीजेआई मैग्नेटिक क्विक-रिलीज़ माउंट्स, माइक्रोएसडी यूएचएस-I/II कार्ड, डीजेआई वायरलेस माइक।",
    ownershipStatus: "सक्रिय एक्शन एवं यात्रा कैमरा",
  },
  "gear-dji-mic-mini": {
    categoryLabel: "अल्ट्रा-कॉम्पैक्ट वायरलेस माइक्रोफोन सिस्टम",
    tagline: "स्पष्ट वोकल ऑडियो के लिए अल्ट्रा-लाइटवेट डिजिटल वायरलेस ट्रांसमीटर",
    description: "अल्ट्रा-कॉम्पैक्ट वायरलेस माइक्रोफोन सिस्टम जो उच्च गुणवत्ता वाला ओमनीडायरेक्शनल ऑडियो, ऑन-बोर्ड रिकॉर्डिंग और कैमरे, स्मार्टफोन व लैपटॉप के साथ सहज कनेक्टिविटी प्रदान करता है।",
    primaryUses: ["ऑन-कैमरा साक्षात्कार", "यूट्यूब एवं सोशल वीडियो ऑडियो", "आउटडोर फील्ड डायलॉग BTS"],
    compatibility: "3.5mm टीआरएस कैमरा इनपुट, यूएसबी-सी/लाइटनिंग स्मार्टफोन एडाप्टर।",
    ownershipStatus: "सक्रिय ऑडियो रिकॉर्डिंग सिस्टम",
  },
  "gear-dijitek-520bh": {
    categoryLabel: "हैवी-ड्यूटी स्टूडियो एवं फील्ड ट्राइपॉड",
    tagline: "परिशुद्ध बॉल-हेड और त्वरित लॉक लेग्स वाला स्थिर एल्युमिनियम ट्राइपॉड",
    description: "मजबूत और स्थिर एल्युमिनियम फील्ड ट्राइपॉड, जो 360-डिग्री पैनोरमिक स्केल वाले फ्लुइड बॉल-हेड के साथ भारी टेलीफोटो लेंस और लंबे एक्सपोज़र लैंडस्केप को रॉक-सॉलिड स्टेबिलिटी प्रदान करता है।",
    primaryUses: ["लॉन्ग एक्सपोज़र लैंडस्केप फोटोग्राफी", "स्टूडियो एवं आर्किटेक्चर फ्रेमिंग", "टेलीफोटो लेंस सपोर्ट"],
    compatibility: "आर्का-स्विस स्टाइल क्विक-रिलीज़ प्लेट, मानक 1/4\" एवं 3/8\" कैमरा थ्रेड्स।",
    ownershipStatus: "स्टूडियो एवं फील्ड ट्राइपॉड",
  },
  "gear-sony-cfexpress-type-a-240gb": {
    categoryLabel: "हाई-स्पीड सीएफएक्सप्रेस मेमोरी मीडिया",
    tagline: "अल्ट्रा-फास्ट बफर क्लियरिंग और 4K ऑल-इंट्रा वीडियो रिकॉर्डिंग कार्ड",
    description: "पेशेवर टीओयूजीएच सीएफएक्सप्रेस टाइप ए मेमोरी कार्ड जो 800MB/s रीड और 700MB/s राइट स्पीड के साथ अनकंप्रेस्ड रॉ बर्स्ट और हाई-बिटरेट वीडियो रिकॉर्डिंग को बिना बफर अटकाव के पूरा करता है।",
    primaryUses: ["हाई-स्पीड निरंतर बर्स्ट शूटिंग", "4K 120fps ऑल-इंट्रा वीडियो", "तत्काल इन-कैमरा बफर क्लियरिंग"],
    compatibility: "सोनी A7 V, A7 IV, FX3, A1, A7S III (सीएफएक्सप्रेस टाइप ए हाइब्रिड स्लॉट)।",
    ownershipStatus: "सक्रिय प्राथमिक मेमोरी मीडिया",
  },
  "gear-lexar-sl500-1tb-ssd": {
    categoryLabel: "अल्ट्रा-स्लिम पोर्टेबल सॉलिड स्टेट ड्राइव",
    tagline: "2000MB/s गति वाला क्रेडिट-कार्ड आकार का मजबूत मेटल एसएसडी",
    description: "अल्ट्रा-कॉम्पैक्ट और मजबूत एल्युमिनियम बाहरी एसएसडी, जो यूएसबी 3.2 जेन 2x2 के जरिए 2000MB/s तक की ट्रांसफर स्पीड देता है, जिससे फील्ड में बड़ी रॉ फाइलों का तुरंत बैकअप लिया जा सकता है।",
    primaryUses: ["फील्ड में त्वरित स्टोरेज बैकअप", "कैमरा डायरेक्ट यूएसबी-सी वीडियो रिकॉर्डिंग", "हाई-स्पीड फाइल ट्रांसफर"],
    compatibility: "यूएसबी-सी एवं यूएसबी-ए डिवाइस (विंडोज, मैकओएस, आईपैड, एंड्रॉयड, समर्थित कैमरे)।",
    ownershipStatus: "सक्रिय फील्ड बैकअप ड्राइव",
  },
  "gear-dji-action-6-nd-filters": {
    categoryLabel: "ऑप्टिकल न्यूट्रल डेंसिटी फिल्टर",
    tagline: "सिनेमैटिक 180° शटर और मोशन ब्लर के लिए मैग्नेटिक ND8/16/32/64 किट",
    description: "मल्टी-कोटेड ऑप्टिकल ग्लास से बने मैग्नेटिक एनडी फिल्टर, जो तेज धूप में 180-डिग्री शटर नियम बनाए रखने, ओवर-एक्सपोज़र रोकने और प्राकृतिक सिनेमैटिक मोशन ब्लर देने के लिए डिज़ाइन किए गए हैं।",
    primaryUses: ["सिनेमैटिक मोशन ब्लर", "उज्ज्वल धूप में एक्सपोज़र संतुलन", "वाटर एवं रेसिंग फुटेज"],
    compatibility: "डीजेआई ओस्मो एक्शन 6 लेंस बेज़ल।",
    ownershipStatus: "सक्रिय ऑप्टिकल फिल्टर किट",
  },
  "gear-dji-action-6-waterproof-case": {
    categoryLabel: "अंडरवॉटर डाइव हाउसिंग",
    tagline: "गहरे पानी में स्कूबा डाइविंग के लिए 60 मीटर तक प्रमाणित सुरक्षात्मक केस",
    description: "उच्च-पारदर्शिता टेम्पर्ड ग्लास लेंस वाला भारी जलरोधी डाइविंग केस, जो पानी के 60 मीटर नीचे दबाव से सुरक्षा, स्पष्ट पानी के नीचे दृश्य और जंग-रोधी स्टेनलेस स्टील बटन संचालन सुनिश्चित करता है।",
    primaryUses: ["गहरी स्कूबा डाइविंग (60m तक)", "उच्च दबाव वाले जल खेल", "पानी के भीतर सुरक्षा"],
    compatibility: "डीजेआई ओस्मो एक्शन 6 कैमरा बॉडी।",
    ownershipStatus: "सक्रिय अंडरवॉटर डाइव गियर",
  },
};

export const GEAR_COMPARISONS_HINDI: Record<string, Partial<GearComparison>> = {
  "sony-200-600mm-vs-sony-100-400mm": {
    title: "सोनी 200–600mm बनाम सोनी 100–400mm GM: टेलीफोटो फील्ड तुलना",
    description: "वन्यजीव और खेल फोटोग्राफी के लिए सोनी के आंतरिक-ज़ूम 200–600mm G और कॉम्पैक्ट 100–400mm GM के बीच वास्तविक तुलना।",
    itemA: {
      name: "Sony FE 200–600mm F5.6–6.3 G OSS",
      slug: "sony-200-600mm",
      category: "फुल-फ्रेम टेलीफोटो ज़ूम लेंस",
      highlight: "आंतरिक ज़ूम तकनीक और 600mm मूल पहुंच",
    },
    itemB: {
      name: "Sony FE 100–400mm F4.5–5.6 GM OSS",
      category: "फुल-फ्रेम टेलीफोटो ज़ूम लेंस",
      highlight: "कॉम्पैक्ट ट्रैवल पोर्टेबिलिटी और 0.98m नजदीकी फोकस",
    },
    summary:
      "दोनों लेंस सोनी ई-माउंट इकोसिस्टम में उत्कृष्ट ऑप्टिक्स प्रदान करते हैं, लेकिन उनकी परिचालन ज़रूरतें अलग हैं। 200–600mm समर्पित वन्यजीव और खेल फोटोग्राफी के लिए अद्वितीय है जहां अधिक पहुंच और गिम्बल संतुलन सर्वोपरि है। 100–400mm GM उन यात्रा फोटोग्राफरों और बैकपैकर हाइकर्स के लिए आदर्श है जिन्हें बहुमुखी प्रतिभा, नजदीकी फोकसिंग और हल्का बैकपैक वज़न चाहिए।",
    specComparison: [
      { feature: "फोकल लेंथ रेंज", itemAValue: "200–600mm", itemBValue: "100–400mm" },
      { feature: "अधिकतम अपर्चर", itemAValue: "f/5.6–f/6.3", itemBValue: "f/4.5–f/5.6" },
      { feature: "ज़ूम मैकेनिज़्म", itemAValue: "आंतरिक (निश्चित बैरल लंबाई)", itemBValue: "बाहरी विस्तार योग्य बैरल" },
      { feature: "वज़न", itemAValue: "2,115 ग्राम (74.6 oz)", itemBValue: "1,395 ग्राम (49.2 oz)" },
      { feature: "फिल्टर व्यास", itemAValue: "95mm", itemBValue: "77mm" },
      { feature: "न्यूनतम फोकस दूरी", itemAValue: "2.4 मीटर (7.88 फीट)", itemBValue: "0.98 मीटर (3.22 फीट)" },
      { feature: "टेलीकन्वर्टर सपोर्ट", itemAValue: "1.4x और 2.0x (पूर्ण AF सपोर्ट)", itemBValue: "1.4x और 2.0x" },
    ],
    tradeOffAnalysis:
      "मुख्य समझौता पहुंच बनाम पोर्टेबिलिटी का है। 200–600mm आपको बड़े बैकपैक आकार की कीमत पर असली सुपर-टेलीफोटो क्षमता और आंतरिक संतुलन प्रदान करता है। 100–400mm GM 200mm की पहुंच कम करता है लेकिन उत्कृष्ट पोर्टेबिलिटी और बहुमुखी क्लोज़-अप क्षमताएं देता है।",
    practicalRecommendation:
      "यदि आपका कार्य पक्षियों, दूर के वन्यजीवों या निश्चित मीडिया स्टैंड से खेल आयोजनों को ट्रैक करने पर केंद्रित है, तो 200–600mm चुनें। यदि आप लंबी पैदल यात्रा करते हैं या एक ऐसा लेंस चाहते हैं जो लैंडस्केप और सक्रिय विषयों दोनों को संभाल सके, तो 100–400mm GM चुनें।",
    faqs: [
      {
        question: "क्या फील्ड में 200-600mm का वज़न 100-400mm की तुलना में काफी अधिक महसूस होता है?",
        answer: "हाँ, हैंडहेल्ड शूटिंग के दौरान 720 ग्राम का अंतर स्पष्ट रूप से महसूस होता है। कई घंटों के शूट पर 200-600mm के लिए मोनोपॉड की दृढ़ता से सिफारिश की जाती है।",
      },
      {
        question: "क्या 200-600mm गिम्बल हेड पर बेहतर संतुलित रहता है?",
        answer: "बिल्कुल। चूंकि 200mm से 600mm तक ज़ूम करने पर इसका गुरुत्वाकर्षण केंद्र नहीं बदलता, इसलिए यह गिम्बल माउंट पर पूरी तरह संतुलित रहता है।",
      },
    ],
  },
  "nd-filters-vs-cpl-filters": {
    title: "एनडी फिल्टर बनाम सीपीएल फिल्टर: आउटडोर फोटोग्राफी तुलना",
    description: "तय करें कि आपको पानी की चिकनी गति के लिए न्यूट्रल डेंसिटी (ND) फिल्टर चाहिए या चमक हटाने और नीले आकाश के लिए सर्कुलर पोलराइज़र (CPL)।",
    itemA: {
      name: "न्यूट्रल डेंसिटी (ND) फिल्टर",
      category: "ऑप्टिकल डेंसिटी ग्लास",
      highlight: "रंग बदले बिना समग्र प्रकाश संचरण को कम करता है",
    },
    itemB: {
      name: "सर्कुलर पोलराइज़र (CPL) फिल्टर",
      category: "पोलराइज़िंग ग्लास",
      highlight: "सतह की चमक को हटाता है और रंगों की संतृप्ति बढ़ाता है",
    },
    summary:
      "एनडी और सीपीएल फिल्टर पूरी तरह से अलग फोटोग्राफिक उद्देश्यों की पूर्ति करते हैं। एक एनडी फिल्टर आपके कैमरे के सेंसर के लिए धूप के चश्मे की तरह काम करता है, जिससे तेज धूप में भी झरने के रेशमी पानी या सिनेमैटिक वीडियो के लिए धीमी शटर गति संभव होती है। एक सीपीएल फिल्टर ध्रुवीकृत प्रकाश को रोकता है, जिससे पानी, पत्तों और कांच से अवांछित चमक हटती है और प्राकृतिक नीला आकाश गहरा होता है—यह ऐसा प्रभाव है जिसे किसी भी एडिटिंग सॉफ्टवेयर में कृत्रिम रूप से नहीं बनाया जा सकता।",
    specComparison: [
      { feature: "प्राथमिक ऑप्टिकल कार्य", itemAValue: "प्रकाश घटाव (एक्सपोज़र में कमी)", itemBValue: "ध्रुवीकरण और प्रतिबिंब कटौती" },
      { feature: "शटर गति पर प्रभाव", itemAValue: "शटर को काफी धीमा करता है (3 से 10 स्टॉप)", itemBValue: "हल्की प्रकाश कमी (लगभग 1 से 1.5 स्टॉप)" },
      { feature: "प्रतिबिंबों पर प्रभाव", itemAValue: "कोई नहीं (पानी की सतह सामान्य परावर्तित होती है)", itemBValue: "सतह की चमक हटाकर पानी के नीचे का दृश्य दिखाता है" },
      { feature: "आकाश एवं वनस्पति पर प्रभाव", itemAValue: "तटस्थ प्राकृतिक रंग प्रतिपादन", itemBValue: "नीले आकाश को गहरा करता है और पत्तियों का हरा रंग निखारता है" },
      { feature: "क्या पोस्ट-प्रोसेसिंग में बनाया जा सकता है?", itemAValue: "आंशिक रूप से (कंप्यूटेशनल एक्सपोज़र औसत द्वारा)", itemBValue: "नहीं (खोए हुए पोलराइज़्ड रिफ्लेक्शन RAW में वापस नहीं आ सकते)" },
    ],
    tradeOffAnalysis:
      "सीपीएल प्रकाश की दिशा और चमक प्रबंधन के बारे में है। एनडी फिल्टर एक्सपोज़र अवधि और अपर्चर लचीलेपन के बारे में है। कई पेशेवर लैंडस्केप फोटोग्राफर एक साथ चमक हटाने और रेशमी पानी की गति पाने के लिए सीपीएल और एनडी फिल्टर को एक साथ माउंट करते हैं।",
    practicalRecommendation:
      "यदि आप लैंडस्केप, वास्तुकला या आउटडोर पोर्ट्रेट शूट करते हैं, तो पहले एक गुणवत्तापूर्ण सर्कुलर पोलराइज़र (CPL) खरीदें—इसकी ऑप्टिकल चमक हटाने की क्षमता को फोटोशॉप में नकल नहीं किया जा सकता। यदि आप दूधिया झरने की गति बनाना चाहते हैं या तेज धूप में 1/50s पर वीडियो शूट करना चाहते हैं, तो 3-स्टॉप या 6-स्टॉप ND फिल्टर में निवेश करें।",
    faqs: [
      {
        question: "क्या मैं एनडी फिल्टर और सीपीएल फिल्टर को एक साथ उपयोग कर सकता हूँ?",
        answer: "हाँ, आप एनडी फिल्टर के ऊपर सीपीएल फिल्टर लगा सकते हैं। वाइड-एंगल लेंस पर कोनों में विगेटिंग (काले घेरे) से बचने के लिए स्लिम ब्रास रिंग वाले फिल्टर का उपयोग करें।",
      },
      {
        question: "अल्ट्रा-वाइड लेंस पर सीपीएल फिल्टर आकाश में असमान क्यों दिखता है?",
        answer: "24mm से अधिक चौड़े फोकल लेंथ पर, लेंस आकाश का एक बहुत बड़ा हिस्सा कैप्चर करता है जो 90-डिग्री पोलराइज़ेशन स्वीट स्पॉट से बाहर चला जाता है। प्रभाव को कम करने के लिए फिल्टर को थोड़ा घुमाएं।",
      },
    ],
  },
};

export function getLocalizedGearCategories(lang: "en" | "hi") {
  return GEAR_CATEGORIES_LOCALIZED[lang] || GEAR_CATEGORIES;
}

export function getLocalizedGearItem(item: GearItem, lang: "en" | "hi"): GearItem {
  if (lang !== "hi") return item;
  const hi = GEAR_ITEMS_HINDI[item.id] || GEAR_ITEMS_HINDI[item.slug];
  if (!hi) return item;
  return {
    ...item,
    name: hi.name || item.name,
    categoryLabel: hi.categoryLabel || item.categoryLabel,
    description: hi.description || item.description,
    tagline: hi.tagline || item.tagline,
    overview: hi.overview || item.overview,
    primaryUses: hi.primaryUses || item.primaryUses,
    compatibility: hi.compatibility || item.compatibility,
    ownershipStatus: hi.ownershipStatus || "स्टूडियो सत्यापित उपकरण",
  };
}

export function getLocalizedGearComparison(comp: GearComparison, lang: "en" | "hi"): GearComparison {
  if (lang !== "hi") return comp;
  const hi = GEAR_COMPARISONS_HINDI[comp.slug];
  if (!hi) return comp;
  return {
    ...comp,
    title: hi.title || comp.title,
    description: hi.description || comp.description,
    summary: hi.summary || comp.summary,
    tradeOffAnalysis: hi.tradeOffAnalysis || comp.tradeOffAnalysis,
    practicalRecommendation: hi.practicalRecommendation || comp.practicalRecommendation,
    itemA: { ...comp.itemA, ...hi.itemA },
    itemB: { ...comp.itemB, ...hi.itemB },
    specComparison: hi.specComparison || comp.specComparison,
    prosAndCons: hi.prosAndCons || comp.prosAndCons,
    intendedUseCases: hi.intendedUseCases || comp.intendedUseCases,
    faqs: hi.faqs || comp.faqs,
  };
}

export function getLocalizedGearComparisons(lang: "en" | "hi"): GearComparison[] {
  if (lang !== "hi") return GEAR_COMPARISONS;
  return GEAR_COMPARISONS.map((comp) => getLocalizedGearComparison(comp, lang));
}
