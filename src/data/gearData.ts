import { siteConfig } from "@/config/siteConfig";

export type GearCategory =
  | "camera-bodies"
  | "lenses"
  | "action-cameras"
  | "audio"
  | "accessories";

export interface GearItem {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  category: GearCategory;
  categoryLabel: string;
  tagline: string;
  imageUrl: string;
  imageAlt: string;
  overview: string;
  personalUsage: string;
  isPersonallyVerified: boolean;
  specs: { label: string; value: string }[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  situationsWhereUseful: string[];
  imageOrAudioQuality: string;
  autofocusAndPerformance?: string;
  portabilityAndHandling: string;
  limitations: string;
  whoShouldBuy: string;
  alternatives: { name: string; slug?: string; note: string }[];
  relatedPortfolioCategory: string;
  relatedPortfolioSlug: string;
  relatedTutorialSlug?: string;
  faqs: { question: string; answer: string }[];
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
    description: "Full-frame mirrorless sensors delivering dynamic range, fast burst rates, and reliable low-light performance.",
  },
  {
    id: "lenses",
    label: "Camera Lenses",
    description: "Prime and telephoto glass selected for edge-to-edge optical resolution, bokeh character, and autofocus tracking.",
  },
  {
    id: "action-cameras",
    label: "Action Cameras",
    description: "Rugged, stabilized POV camera bodies for challenging weather, remote expeditions, and behind-the-scenes recording.",
  },
  {
    id: "audio",
    label: "Audio Equipment",
    description: "Wireless dual-channel microphone transmitters and directional recording kits for client interviews and documentary footage.",
  },
  {
    id: "accessories",
    label: "Camera Accessories",
    description: "Essential optical filters, carbon fiber supports, rugged field backpacks, and power management tools.",
  },
];

export const GEAR_ITEMS: GearItem[] = [
  // 1. Camera Bodies
  {
    id: "gear-sony-a7v",
    slug: "sony-a7v",
    name: "Sony A7V",
    manufacturer: "Sony",
    category: "camera-bodies",
    categoryLabel: "Camera Bodies",
    tagline: "Next-generation full-frame hybrid mirrorless camera body.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony professional mirrorless camera body with high-resolution lens mount",
    overview:
      "The Sony A7V is engineered as a modern hybrid powerhouse, combining advanced AI subject recognition autofocus, wide dynamic range, and dual-layer heat dissipation for continuous high-speed shooting across studio portraits and demanding outdoor sports.",
    personalUsage:
      "Serves as our primary camera body for editorial portrait assignments, indoor gala documentation, and fast-paced track and athletics events where real-time eye tracking is critical.",
    isPersonallyVerified: true,
    specs: [
      { label: "Sensor Format", value: "35mm Full-Frame BSI CMOS" },
      { label: "Autofocus Engine", value: "AI-Powered Real-Time Recognition (Human, Animal, Vehicle)" },
      { label: "Image Stabilization", value: "5-Axis In-Body Optical SteadyShot" },
      { label: "Card Slots", value: "Dual CFexpress Type A / SD UHS-II Hybrid" },
      { label: "Burst Rate", value: "Up to 10+ fps with full continuous AF/AE tracking" },
      { label: "Video Capabilities", value: "4K 60p 10-bit 4:2:2 internal recording" },
      { label: "Weight", value: "Approx. 658g (with battery and memory card)" },
    ],
    pros: [
      "Industry-leading subject acquisition and predictive autofocus tracking",
      "Exceptional highlight recovery and low-noise performance at high ISOs",
      "Dual hybrid card slots provide vital instant in-camera redundancy",
      "Deep grip ergonomics and responsive tactile dial controls",
    ],
    cons: [
      "CFexpress Type A media cards carry premium pricing",
      "Menu system offers immense customization but requires deliberate setup",
      "Noticeable battery drain during sustained high-framerate electronic shutter bursts",
    ],
    bestFor: [
      "Editorial and commercial portraiture requiring rich color tonality",
      "Indoor weddings and events in low-light ambient illumination",
      "Sports and athletics demanding rapid eye and motion tracking",
    ],
    situationsWhereUseful: [
      "Studio portrait sessions with complex multi-light strobe setups",
      "Fast-moving basketball, soccer, and track athletics from the sidelines",
      "Dimly lit wedding reception halls requiring ISO 6400+ capture",
    ],
    imageOrAudioQuality:
      "Delivers wide exposure latitude and clean shadow retrieval. Skin tones render with natural warmth and subtle tonal gradations when color-graded.",
    autofocusAndPerformance:
      "The dedicated AI processing unit locks onto eyes and silhouettes instantly, even when subjects turn away or wear helmets, caps, or sunglasses.",
    portabilityAndHandling:
      "Weather-sealed magnesium alloy chassis balances securely with medium primes and heavier telephoto zooms with an optional battery grip.",
    limitations:
      "High-speed sports bursts produce substantial RAW file volume requiring robust storage solutions and fast card readers.",
    whoShouldBuy:
      "Professional working photographers, wedding documentarians, and hybrid creators who need unwavering autofocus reliability across diverse lighting conditions.",
    alternatives: [
      { name: "Sony A7 IV", note: "Previous generation workhorse offering strong performance at a lower secondary market price." },
      { name: "Sony A1", note: "Flagship stacked sensor camera with blackout-free 30 fps bursts for high-budget commercial sports." },
      { name: "Canon EOS R6 Mark II", note: "Competitive hybrid alternative in the Canon RF ecosystem." },
    ],
    relatedPortfolioCategory: "Portraits & Sports",
    relatedPortfolioSlug: "/portfolio/portraits",
    relatedTutorialSlug: "/blog/what-to-wear-for-a-portrait-photoshoot",
    faqs: [
      {
        question: "Is the Sony A7V suitable for high-speed sports photography?",
        answer: "Yes. With predictive autofocus tracking and continuous bursts, it tracks athletic movement across fields and courts with exceptional accuracy.",
      },
      {
        question: "Does it overheat during long indoor event coverage?",
        answer: "Its integrated passive heat sink allows continuous still shooting and standard 4K documentary video recording without thermal cutoff under normal room temperatures.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Authorized retailer; check current body-only availability.",
      },
      {
        retailer: "Adorama",
        url: "https://www.adorama.com",
        isAffiliate: false,
        note: "Authorized photo equipment distributor.",
      },
    ],
  },

  // 2. Camera Lenses - 50mm Prime
  {
    id: "gear-sony-fe-50mm-f18",
    slug: "sony-fe-50mm-f18",
    name: "Sony FE 50mm F1.8",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "Camera Lenses",
    tagline: "Compact, featherweight 'nifty fifty' prime lens for natural perspective.",
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sony 50mm prime lens mounted on a mirrorless camera",
    overview:
      "The Sony FE 50mm F1.8 is an accessible, ultra-compact standard prime lens offering a classic 47° field of view. Its bright f/1.8 aperture produces soft background separation while maintaining an exceptionally light footprint in the bag.",
    personalUsage:
      "Our go-to lightweight walkaround lens for street-level travel documentation, quick backstage details at galas, and minimalist natural-light portraits.",
    isPersonallyVerified: true,
    specs: [
      { label: "Focal Length", value: "50mm (Standard Prime)" },
      { label: "Maximum Aperture", value: "f/1.8" },
      { label: "Minimum Aperture", value: "f/22" },
      { label: "Lens Mount", value: "Sony E-Mount (Full-Frame)" },
      { label: "Filter Thread", value: "49mm" },
      { label: "Aperture Blades", value: "7 Circular Blades" },
      { label: "Weight", value: "Approx. 186g (6.6 oz)" },
    ],
    pros: [
      "Extremely lightweight (186g) and compact for effortless all-day carrying",
      "Bright f/1.8 aperture creates pleasing subject isolation and shallow depth of field",
      "Sharp optical rendering across center frame when stopped down to f/2.8–f/4",
      "Exceptional value-to-performance ratio for full-frame glass",
    ],
    cons: [
      "Autofocus motor is audibly slower and noisier than modern XD Linear motor lenses",
      "Plastic composite exterior barrel lacks weather-sealing gaskets",
      "Slight chromatic aberration and corner softness when shot wide open at f/1.8",
    ],
    bestFor: [
      "Environmental portraiture and lifestyle sessions",
      "Low-profile street photography and travel assignments",
      "Beginner to intermediate photographers mastering prime lens composition",
    ],
    situationsWhereUseful: [
      "Casual outdoor couple sessions where a large heavy lens would feel intimidating",
      "Intimate dining and indoor ambient light gatherings",
      "Travel days when minimizing backpack weight is the top priority",
    ],
    imageOrAudioQuality:
      "Center sharpness is respectable wide open and becomes very crisp by f/2.8. Highlights render with gentle circular bokeh thanks to the 7-blade iris.",
    autofocusAndPerformance:
      "Sufficient for static and moderate-pace human subjects. Hunts occasionally in dim, contrast-deficient conditions compared to G Master equivalents.",
    portabilityAndHandling:
      "At under 200 grams, it can stay mounted on the camera all day without causing wrist fatigue or balance issues on small wrist straps.",
    limitations:
      "Not recommended for high-speed sports or tracking erratic wildlife due to DC motor focus speed limitations.",
    whoShouldBuy:
      "Any photographer looking for an affordable, lightweight prime lens that delivers creamy background blur without carrying heavy glass.",
    alternatives: [
      { name: "Sony FE 50mm F1.4 GM", note: "High-end professional alternative with weather sealing and dual XD linear motors." },
      { name: "Sony FE 55mm F1.8 ZA Sonnar", note: "Zeiss collaboration prime offering sharper corners and metallic build." },
    ],
    relatedPortfolioCategory: "Portraits & Travel",
    relatedPortfolioSlug: "/portfolio/portraits",
    relatedTutorialSlug: "/blog/what-to-wear-for-a-portrait-photoshoot",
    faqs: [
      {
        question: "Is the Sony 50mm f/1.8 sharp enough for professional client portraits?",
        answer: "When stopped down to f/2.2 or f/2.8, it produces crisp eye sharpness suitable for digital client deliverables and web publication.",
      },
      {
        question: "Can this lens be used for sports photography?",
        answer: "Its autofocus motor is too slow for erratic, fast-action sports. For athletics, telephoto lenses with linear motors are strongly recommended.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Available standard retail.",
      },
      {
        retailer: "Amazon",
        url: "https://www.amazon.com",
        isAffiliate: false,
        note: "Check verified manufacturer warranty.",
      },
    ],
  },

  // 3. Camera Lenses - 200-600mm Telephoto
  {
    id: "gear-sony-200-600mm",
    slug: "sony-200-600mm",
    name: "Sony FE 200–600mm F5.6–6.3 G OSS",
    manufacturer: "Sony",
    category: "lenses",
    categoryLabel: "Camera Lenses",
    tagline: "Internal-zoom super-telephoto lens for wildlife and field sports.",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Super-telephoto lens capturing action at a distance",
    overview:
      "The Sony FE 200–600mm F5.6–6.3 G OSS is a legendary super-telephoto optic prized by wildlife and sports photographers. Featuring an internal zoom mechanism that maintains physical balance, dual Direct Drive SSM autofocus motors, and optical image stabilization, it brings distant action within reach.",
    personalUsage:
      "Primary telephoto workhorse for track and field athletics, distant ocean surfing sessions, and backcountry wildlife expeditions in national parks.",
    isPersonallyVerified: true,
    specs: [
      { label: "Focal Length Range", value: "200mm to 600mm (Full-Frame)" },
      { label: "Aperture Range", value: "f/5.6–f/6.3 to f/32–f/36" },
      { label: "Zoom Mechanism", value: "Internal Zoom (barrel does not extend)" },
      { label: "Optical Stabilization", value: "Optical SteadyShot with 3 mode switches" },
      { label: "Teleconverter Support", value: "Compatible with Sony 1.4x and 2.0x TCs" },
      { label: "Filter Thread", value: "95mm" },
      { label: "Weight", value: "Approx. 2,115g (without tripod collar)" },
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
      "Remarkably sharp across the entire zoom range, with clean contrast and minimal chromatic fringing thanks to five ED (Extra-low Dispersion) glass elements.",
    autofocusAndPerformance:
      "Dual DDSSM motors drive heavy internal elements with precision and silent tracking speed. Keeps up seamlessly with erratic birds and sprinting athletes.",
    portabilityAndHandling:
      "Because the lens does not expand during zooming, it operates smoothly on monopods and gimbal heads without shifting balance forwards.",
    limitations:
      "In indoor arena sports under poor sodium-vapor lighting, the f/6.3 aperture pushes camera ISO higher than an f/2.8 or f/4 prime.",
    whoShouldBuy:
      "Outdoor sports photographers and wildlife specialists who demand serious telephoto reach and internal zoom balance without spending five figures on prime exotics.",
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

  // 4. Action Cameras
  {
    id: "gear-dji-osmo-action-6",
    slug: "dji-osmo-action-6",
    name: "DJI Osmo Action 6",
    manufacturer: "DJI",
    category: "action-cameras",
    categoryLabel: "Action Cameras",
    tagline: "Rugged waterproof action camera with ultra-wide optics and HorizonSteady.",
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Compact waterproof action camera ready for outdoor expeditions",
    overview:
      "The DJI Osmo Action 6 is built for extreme outdoor environments where traditional camera bodies cannot safely venture. With advanced electronic horizon stabilization, magnetic quick-release mounting, and dual touchscreens, it provides reliable point-of-view and behind-the-scenes recording.",
    personalUsage:
      "Utilized for rigging on chase boats during water sports shoots, documenting rugged mountain trail ascents, and capturing wide-angle time lapses during documentary expeditions.",
    isPersonallyVerified: true,
    specs: [
      { label: "Sensor Size", value: "Large CMOS sensor with 10-bit D-Log M color" },
      { label: "Lens Angle of View", value: "155° Ultra-Wide Field of View" },
      { label: "Stabilization", value: "RockSteady 3.0+ & 360° HorizonSteady" },
      { label: "Waterproofing", value: "Waterproof up to 18m without external case" },
      { label: "Screens", value: "Dual OLED Touchscreens (Front & Back)" },
      { label: "Battery Endurance", value: "Cold-resistant battery rated down to -20°C" },
      { label: "Weight", value: "Approx. 145g" },
    ],
    pros: [
      "Magnetic quick-release ecosystem allows instant repositioning between mounts",
      "360° HorizonSteady keeps the frame level even during extreme boat rocking or rolling",
      "Front OLED touchscreen simplifies self-framing and technical parameter verification",
      "Deep native waterproofing removes the need for bulky diving housings in wet weather",
    ],
    cons: [
      "Small sensor physical size creates noticeable noise in deep night conditions",
      "Ultra-wide perspective exhibits optical distortion if held too close to human faces",
      "Internal memory is limited, requiring high-speed V30 microSD cards for 4K 120p",
    ],
    bestFor: [
      "POV documentation during adventure travel and expedition assignments",
      "Water sports, surf chase boats, and rainy outdoor festivals",
      "Capturing behind-the-scenes video snippets for client journals and social archives",
    ],
    situationsWhereUseful: [
      "Mounting to kayak decks during coastal wildlife documentary trips",
      "Chest-mount POV while running alongside marathon athletes during prep runs",
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
    relatedPortfolioCategory: "Sports & Travel",
    relatedPortfolioSlug: "/portfolio/travel",
    relatedTutorialSlug: "/blog/capturing-high-speed-sports-action-techniques",
    faqs: [
      {
        question: "Does the DJI Osmo Action 6 work in sub-zero winter temperatures?",
        answer: "Yes, its cold-resistant battery cells remain operational in alpine and winter conditions down to -20°C (-4°F).",
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
        note: "Standard standard and adventure combo packages available.",
      },
    ],
  },

  // 5. Audio Equipment
  {
    id: "gear-dji-mic-3",
    slug: "dji-mic-3",
    name: "DJI Mic 3",
    manufacturer: "DJI",
    category: "audio",
    categoryLabel: "Audio Equipment",
    tagline: "Ultra-compact dual-channel wireless microphone kit with 32-bit float.",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Wireless microphone transmitter with magnetic clip for clean audio recording",
    overview:
      "The DJI Mic 3 is an ultra-portable wireless audio solution featuring two transmitters, a touchscreen receiver, and a magnetic charging case. With on-board 32-bit float backup recording, it prevents clipped audio during loud wedding speeches, emotional vows, and athletic interviews.",
    personalUsage:
      "Used for recording bride and groom vows during outdoor ceremonies, capturing athlete pre-game reflections, and recording clear voiceover tutorials for our educational photography journal.",
    isPersonallyVerified: true,
    specs: [
      { label: "Channels", value: "Dual-Channel (2 Transmitters + 1 Receiver)" },
      { label: "Transmission Range", value: "Up to 250m (820 ft) in line-of-sight" },
      { label: "Internal Recording", value: "32-bit float on-board backup recording per TX" },
      { label: "Mounting System", value: "Magnetic clip and cold shoe adapter" },
      { label: "Battery Life", value: "Up to 6 hours (expandable to 18 hours with charging case)" },
      { label: "Connectivity", value: "3.5mm TRS, Lightning, USB-C adapter direct to camera/phone" },
      { label: "Weight (Transmitter)", value: "Approx. 28g per unit" },
    ],
    pros: [
      "32-bit float internal recording eliminates audio distortion from sudden yells or laughter",
      "Magnetic clip allows discreet mounting under lapels and wedding dresses",
      "Charging case stores and charges both transmitters and receiver simultaneously",
      "Plug-and-play compatibility with mirrorless cameras, smartphones, and laptops",
    ],
    cons: [
      "Wind furries can dislodge if caught against heavy winter jacket zippers",
      "Receiver touchscreen is small, requiring deliberate finger taps for gain adjustments",
      "Limited EQ customization compared to bulky audio field mixers",
    ],
    bestFor: [
      "Wedding ceremonies where clean vow audio is non-negotiable",
      "Sideline athlete and coach interviews during tournament coverage",
      "Documentary video features and brand client presentations",
    ],
    situationsWhereUseful: [
      "Mic'ing the groom's jacket lapel to capture both vows clearly without a visible microphone",
      "Recording high-wind interviews with sports directors at outdoor stadiums",
      "Tutorial audio recorded directly into camera without complex external sync workflows",
    ],
    imageOrAudioQuality:
      "Captures warm, articulate vocal clarity with low self-noise. The 32-bit float file format allows recovery of whisper-quiet vows and roaring celebration cheers without clipping.",
    portabilityAndHandling:
      "The entire kit fits inside a palm-sized charging case, sliding into any camera backpack accessory pocket.",
    limitations:
      "Dense steel and concrete walls can attenuate wireless 2.4 GHz signal range if separated by multiple structural barriers.",
    whoShouldBuy:
      "Solo wedding filmmakers, commercial photographers recording client case studies, and sports creators who need foolproof broadcast-quality voice audio.",
    alternatives: [
      { name: "Røde Wireless PRO", note: "Competitor wireless kit with timecode generation and lavalier mic accessories." },
      { name: "Hollyland Lark Max", note: "Reliable wireless audio alternative with environmental noise cancellation." },
    ],
    relatedPortfolioCategory: "Weddings & Events",
    relatedPortfolioSlug: "/portfolio/weddings",
    relatedTutorialSlug: "/blog/how-to-choose-a-wedding-photographer",
    faqs: [
      {
        question: "Why is 32-bit float recording important for wedding ceremonies?",
        answer: "Because you cannot ask a couple to redo their vows if audio clips. 32-bit float preserves the full dynamic range, allowing clipped audio to be restored in post-production without distortion.",
      },
      {
        question: "Can it connect directly to Sony mirrorless cameras?",
        answer: "Yes, via the included 3.5mm TRS coiled cable or digital USB-C connection, matching camera gain levels seamlessly.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Includes charging case and magnetic accessories.",
      },
    ],
  },

  // 6. Camera Accessories - Filters & Field Gear
  {
    id: "gear-polarpro-quartzline-filters",
    slug: "polarpro-quartzline-filters",
    name: "PolarPro QuartzLine ND & CPL Filters",
    manufacturer: "PolarPro",
    category: "accessories",
    categoryLabel: "Camera Accessories",
    tagline: "Fused quartz glass optical filters for precise exposure and glare management.",
    imageUrl: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Circular glass optical photography filter mounted to camera lens",
    overview:
      "PolarPro QuartzLine filters feature 99.9% pure fused quartz glass elements set within brass frame rings. Combining Neutral Density (ND8, ND64) and Circular Polarizer (CPL) options, they eliminate water and foliage glare while allowing wide-aperture shooting in bright midday sun.",
    personalUsage:
      "Essential field accessories for ocean surf sessions, alpine landscape expeditions, and midday bridal party portraits in direct sunlight.",
    isPersonallyVerified: true,
    specs: [
      { label: "Glass Material", value: "99.9% Pure Fused Quartz Glass" },
      { label: "Frame Material", value: "Machined Solid Brass (anti-galling threads)" },
      { label: "Optical Coatings", value: "16-Layer Anti-Reflective, Scratch, Hydrophobic" },
      { label: "Filter Types Used", value: "CPL (Circular Polarizer) & ND8/PL, ND64" },
      { label: "Refractive Index", value: "1.46 (Extremely low optical dispersion)" },
    ],
    pros: [
      "Zero noticeable color casting or green/magenta tinting across shadows",
      "Brass frame threads screw smoothly onto lens barrels without binding or seizing",
      "Hydrophobic coating sheds ocean spray, raindrops, and fingerprints effortlessly",
      "Maintains razor-sharp resolution on high-megapixel sensors",
    ],
    cons: [
      "Significantly heavier and pricier than standard aluminum alloy filters",
      "Deep knurling on brass frame requires dedicated pouch space to avoid scratching nearby gear",
    ],
    bestFor: [
      "Landscape and wildlife photographers seeking maximum optical transparency",
      "Outdoor portrait shoots requiring f/1.4 or f/1.8 apertures under midday sunlight",
      "Coastal and marine photography where water reflection control is essential",
    ],
    situationsWhereUseful: [
      "Cutting through glare on coastal waves to reveal transparent water texture",
      "Slowing shutter speeds for silky alpine waterfall cascades in bright daylight",
      "Deepening blue sky contrast and separating white cloud formations in landscape panoramas",
    ],
    imageOrAudioQuality:
      "Fused quartz ensures complete color neutrality, preserving accurate skin tones and true-to-life greens without the yellow-brown shift common in cheaper resin filters.",
    portabilityAndHandling:
      "Includes a protective hard case with magnetic closure for fast field swaps.",
    limitations:
      "Stacking a CPL on top of an ND filter on lenses wider than 24mm can introduce mechanical corner vignetting.",
    whoShouldBuy:
      "Photographers working with high-resolution glass who refuse to degrade optical quality with inferior filter glass.",
    alternatives: [
      { name: "B+W Master HTC-POL", note: "Renowned German optical brass circular polarizer." },
      { name: "NiSi True Color ND/PL", note: "Competitive alternative with dedicated rotating rings." },
    ],
    relatedPortfolioCategory: "Travel & Wildlife",
    relatedPortfolioSlug: "/portfolio/nature-wildlife",
    relatedTutorialSlug: "/photography-gear/comparisons/nd-filters-vs-cpl-filters",
    faqs: [
      {
        question: "What is the difference between an ND filter and a CPL filter?",
        answer: "A Neutral Density (ND) filter acts like sunglasses, reducing overall light entering the lens to allow slower shutter speeds. A Circular Polarizer (CPL) cuts polarized reflections from water, glass, and leaves, boosting color saturation.",
      },
    ],
    retailerLinks: [
      {
        retailer: "B&H Photo Video",
        url: "https://www.bhphotovideo.com",
        isAffiliate: false,
        note: "Available across standard filter thread sizes (67mm, 77mm, 82mm, 95mm).",
      },
    ],
  },
];

export const GEAR_COMPARISONS: GearComparison[] = [
  // Comparison 1: Sony 200-600mm vs 100-400mm
  {
    slug: "sony-200-600mm-vs-sony-100-400mm",
    title: "Sony 200–600mm vs Sony 100–400mm Comparison",
    description:
      "An in-depth, hands-on comparison between Sony's two flagship telephoto zoom lenses. Weighing reach, internal zoom stability, portability, and autofocus tracking for sports and wildlife.",
    heroImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Super-telephoto lenses compared for outdoor sports and wildlife photography",
    itemA: {
      name: "Sony FE 200–600mm F5.6–6.3 G OSS",
      slug: "sony-200-600mm",
      category: "Super-Telephoto Zoom",
      highlight: "Unmatched 600mm reach with non-extending internal zoom balance.",
    },
    itemB: {
      name: "Sony FE 100–400mm F4.5–5.6 GM OSS",
      category: "Telephoto G Master Zoom",
      highlight: "Compact 1.4 kg chassis with 0.98m close focusing and G Master glass.",
    },
    summary:
      "Choosing between the Sony 200–600mm G and the Sony 100–400mm GM comes down to a direct trade-off between maximum reach and physical portability. While the 200–600mm offers superior reach for timid birds and distant athletic fields with an internal zoom barrel, the 100–400mm GM is easier to carry on multi-day mountain hikes and packs inside standard airline carry-ons.",
    specComparison: [
      { feature: "Focal Length Range", itemAValue: "200–600mm (3x zoom ratio)", itemBValue: "100–400mm (4x zoom ratio)" },
      { feature: "Maximum Aperture", itemAValue: "f/5.6 – f/6.3", itemBValue: "f/4.5 – f/5.6 (1/3 to 1/2 stop faster)" },
      { feature: "Physical Length", itemAValue: "318 mm (Fixed length, internal zoom)", itemBValue: "205 mm (Extends when zooming)" },
      { feature: "Weight", itemAValue: "2,115 g (4.66 lbs)", itemBValue: "1,395 g (3.07 lbs, ~34% lighter)" },
      { feature: "Filter Thread", itemAValue: "95 mm", itemBValue: "77 mm (Standard pro size)" },
      { feature: "Minimum Focus Distance", itemAValue: "2.4 m (7.88 ft)", itemBValue: "0.98 m (3.22 ft, pseudo-macro capability)" },
      { feature: "Teleconverter Support", itemAValue: "1.4x and 2.0x TC compatible", itemBValue: "1.4x and 2.0x TC compatible" },
    ],
    prosAndCons: {
      itemAPros: [
        "Extra 200mm of reach makes a dramatic difference for small birds and distant field sports",
        "Internal zoom mechanism means the lens never changes length or center of gravity",
        "Extremely short zoom throw (less than 90 degrees) enables instant focal adjustments",
        "Better dust sealing due to stationary external barrel",
      ],
      itemACons: [
        "Noticeably heavier at 2.1 kg; taxing on wrists for prolonged handheld work",
        "Difficult to pack vertically in standard daypacks due to 318mm fixed length",
        "2.4m minimum focus distance limits close-up floral or insect captures",
      ],
      itemBPros: [
        "Over 700g lighter and 11cm shorter when retracted, fitting standard camera bags",
        "Brilliant 0.98m close-focus distance enables stunning tele-macro floral and lizard photography",
        "Slightly faster aperture (f/5.6 at 400mm vs f/6.3 on the 200-600)",
        "G Master badge optical coating delivers marginally snappier micro-contrast",
      ],
      itemBCons: [
        "400mm can leave photographers wanting more reach when photographing small fauna",
        "External telescoping barrel can ingest fine dust over years of heavy desert use",
        "Zoom ring requires more rotational effort when barrel is pointed vertically upward",
      ],
    },
    intendedUseCases: {
      itemAUse:
        "Dedicated wildlife expeditions, bird photography from hides or blinds, surf photography from the beach, and large-field sports like soccer, football, and track where maximum reach is essential.",
      itemBUse:
        "Backcountry mountain trekking, travel photography, air shows, closer field sports (basketball, tennis), and versatile nature assignments where flowers, butterflies, and large mammals occur on the same trail.",
    },
    tradeOffAnalysis:
      "If 80% of your work involves birds, ocean action, or sideline field athletics, the 200–600mm is unequivocally the superior tool because cropping a 400mm frame sacrifices sensor resolution. Conversely, if you travel frequently on regional flights, hike steep mountain trails with heavy packs, or love close-up botanical details, the 100–400mm GM is far more versatile and practical.",
    practicalRecommendation:
      "For sports and wildlife specialists with a sturdy monopod: choose the Sony 200–600mm G OSS. For adventure travel, landscape, and versatile outdoor hybrid shooters: choose the Sony 100–400mm GM.",
    faqs: [
      {
        question: "Can I just use the Sony 100-400mm with a 1.4x teleconverter to get 560mm?",
        answer: "Yes, the 100-400mm GM paired with the 1.4x TC becomes a 140-560mm f/6.3-f/8 lens. While optical sharpness remains quite good, native autofocus acquisition on the bare 200-600mm is slightly snappier in low contrast lighting.",
      },
      {
        question: "Which lens balances better on a gimbal head?",
        answer: "The 200-600mm balances significantly better because its internal zoom never shifts weight forward as you zoom, preventing gimbal rebalancing during active shooting.",
      },
    ],
  },

  // Comparison 2: ND Filters vs CPL Filters
  {
    slug: "nd-filters-vs-cpl-filters",
    title: "ND Filters vs CPL Filters: Understanding Lens Filtration",
    description:
      "A comprehensive guide breaking down the optical mechanics, aesthetic differences, and practical field use cases between Neutral Density (ND) and Circular Polarizer (CPL) filters.",
    heroImage: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Camera lens filter glass demonstrating light reduction and reflection control",
    itemA: {
      name: "Neutral Density (ND) Filters",
      category: "Exposure Control Glass",
      highlight: "Reduces volume of light entering the lens without altering scene color or polarization.",
    },
    itemB: {
      name: "Circular Polarizer (CPL) Filters",
      category: "Reflection & Glare Control Glass",
      highlight: "Selectively filters polarized light rays to eliminate surface reflections and enrich saturation.",
    },
    summary:
      "Neutral Density (ND) filters and Circular Polarizers (CPL) serve entirely different photographic purposes, yet are frequently confused by emerging photographers. An ND filter functions like tinted sunglasses to control exposure and motion blur, whereas a CPL filter removes physical glare from water, foliage, and atmospheric haze.",
    specComparison: [
      { feature: "Primary Function", itemAValue: "Reduces light quantity uniformly across visible spectrum", itemBValue: "Filters reflected polarized light waves at specific angles" },
      { feature: "Aesthetic Effect", itemAValue: "Allows slower shutter speeds or wider apertures in bright sun", itemBValue: "Cuts reflections from water/glass, deepens blue skies and foliage green" },
      { feature: "Replicability in Post-Processing", itemAValue: "Partially simulated with multi-exposure stacking", itemBValue: "Impossible to replicate digitally (glare information is lost)" },
      { feature: "Light Loss (Typical)", itemAValue: "Fixed (e.g., 3 stops for ND8, 6 stops for ND64, 10 stops for ND1000)", itemBValue: "Approx. 1.0 to 1.5 stops of light loss when rotated" },
      { feature: "Moving Mechanics", itemAValue: "Fixed non-rotating frame", itemBValue: "Dual rotating ring adjusted manually while looking through viewfinder" },
      { feature: "Ultra-Wide Angle Compatibility", itemAValue: "Works cleanly across all focal lengths", itemBValue: "Can cause uneven gradient bands in skies on lenses wider than 24mm" },
    ],
    prosAndCons: {
      itemAPros: [
        "Enables silky smooth waterfall, ocean wave, and cloud motion blur during bright daylight",
        "Allows shooting wide open at f/1.4 or f/1.8 in midday sun without exceeding max shutter speed",
        "Essential for cinematographers matching 180-degree shutter angles in video",
      ],
      itemACons: [
        "Dense ND filters (10-stop) darken viewfinder, requiring composition before mounting",
        "Does not reduce surface glare or specular highlights on wet rocks and water",
      ],
      itemBPros: [
        "Unlocks clear transparency through riverbeds, ocean water, and display glass",
        "Restores rich natural pigment to rain-soaked leaves and autumn trees",
        "Significantly cuts atmospheric haze in distant mountain vistas",
      ],
      itemBCons: [
        "Produces uneven dark sky patches when used on ultra-wide lenses (16mm to 20mm)",
        "Must be readjusted every time you change orientation from landscape to portrait",
      ],
    },
    intendedUseCases: {
      itemAUse:
        "Long-exposure seascape and landscape photography, daytime portraiture with shallow depth of field, and video work maintaining shutter speed rules.",
      itemBUse:
        "Forest photography, coastal shoreline documentation, architecture shoots with glass facades, and autumn foliage road trips.",
    },
    tradeOffAnalysis:
      "You cannot use an ND filter to remove reflections, and you cannot use a standard CPL to achieve a 30-second silky exposure on a sunny beach. Both filters solve different optical constraints.",
    practicalRecommendation:
      "If you can only carry one filter into the wilderness: choose a Circular Polarizer (CPL) first, because its reflection-canceling optical physics cannot be faked in Lightroom or Photoshop. For long exposure enthusiasts, add an ND64 (6-stop) filter.",
    faqs: [
      {
        question: "Can I stack an ND filter and a CPL filter together?",
        answer: "Yes, many landscape photographers stack an ND filter with a CPL. However, ensure slim filter rings are used to prevent mechanical vignetting in the frame corners on wide-angle lenses.",
      },
      {
        question: "What is an ND/PL combo filter?",
        answer: "An ND/PL combo integrates neutral density coating directly onto polarizing glass, delivering both light reduction and glare cut in a single lightweight filter ring.",
      },
    ],
  },
];
