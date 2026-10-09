import { siteConfig } from "@/config/siteConfig";

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroHeading: string;
  heroDescription: string;
  imageUrl: string;
  imageAlt: string;
  duration: string;
  deliveryTime: string;
  startingPriceNote: string;
  idealFor: string[];
  deliverables: string[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  overviewText: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedPortfolioCategory: string;
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "portrait-photography",
    slug: "portrait-photography",
    title: "Portrait Photography",
    shortDescription:
      "Carefully tailored portrait sessions for artists, executives, couples, and individuals looking for timeless visual presence.",
    heroHeading: "Editorial & Fine-Art Portrait Photography",
    heroDescription:
      "Intimate, expressive portraits captured with natural light, relaxed art direction, and meticulous attention to character.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Dramatic editorial studio portrait with soft warm lighting and artistic composition",
    duration: "1.5 – 2.5 Hours",
    deliveryTime: "7 business days",
    startingPriceNote: "Bespoke packages starting from ₹25,000 for studio & Pink City heritage sessions.",
    idealFor: [
      "Artists, writers, founders, and creative professionals",
      "Executive and corporate leadership personal branding",
      "Couples seeking timeless anniversary or pre-wedding portraits",
      "Creative headshots and magazine editorial features",
    ],
    deliverables: [
      "25+ Curated high-resolution master retouched images",
      "Private password-protected digital proofing gallery",
      "Full personal reproduction and digital publishing rights",
      "Studio or outdoor natural light location options",
      "Comprehensive wardrobe and creative direction guide",
    ],
    processSteps: [
      {
        step: "01",
        title: "Creative Consultation",
        description:
          "We align on moodboards, wardrobe palettes, location ambiance, and intended image usage.",
      },
      {
        step: "02",
        title: "The Photoshoot Experience",
        description:
          "An unhurried, comfortable session with gentle direction focused on authentic gestures and natural angles.",
      },
      {
        step: "03",
        title: "Curation & Retouching",
        description:
          "Hand-selected frame refinement preserving skin textures and color tonality without artificial over-processing.",
      },
      {
        step: "04",
        title: "Final Archival Delivery",
        description:
          "Immediate high-resolution digital download plus web-optimized social files with permanent backup.",
      },
    ],
    overviewText: [
      "A great portrait is not just a photographic likeness—it is an encounter. Whether you are building executive authority, documenting personal milestones, or creating fine-art imagery for personal archives, our portrait sessions prioritize ease, authenticity, and refined aesthetics.",
      "We work collaboratively in natural light studios, outdoor architectural settings, or private client environments. Every photograph is composed to stand the test of time, free from fleeting digital filters or stiff corporate poses.",
    ],
    faqs: [
      {
        question: "How long does a portrait photoshoot take?",
        answer:
          "Standard portrait sessions typically last between 1.5 and 2.5 hours. This allows sufficient time for 2–3 wardrobe changes, natural lighting shifts, and a relaxed environment without feeling rushed.",
      },
      {
        question: "What should I wear for my portrait session?",
        answer:
          "We recommend cohesive neutral tones, warm beige, ivory, deep navy, or charcoal with minimal heavy logos. Upon booking, we provide a complete wardrobe and styling guide tailored to your chosen backdrop.",
      },
      {
        question: "Where do portrait photoshoots take place?",
        answer:
          "Sessions are held at our studio in Jaipur (Room No. 215, Karolan Ka Barh, Shri Kishanpura, 302017), at iconic Pink City heritage locations (Amer Fort, Hawa Mahal, Patrika Gate, Nahargarh), or at your private residence / resort upon request.",
      },
    ],
    relatedPortfolioCategory: "Portrait Photography",
  },
  {
    id: "wedding-photography",
    slug: "wedding-photography",
    title: "Wedding Photography",
    shortDescription:
      "Unobtrusive, cinematic storytelling capturing monumental vows and heartfelt unscripted glances.",
    heroHeading: "Royal Rajasthan & Destination Wedding Photography",
    heroDescription:
      "Cinematic, heartfelt storytelling celebrating your pheras, grand sangeet, royal palace venues, and emotional family moments across Jaipur and Rajasthan.",
    imageUrl:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Royal Indian wedding couple celebration in traditional embroidered attire with palace illumination in Rajasthan",
    duration: "Full-Day to Multi-Day Celebrations",
    deliveryTime: "3 – 4 weeks (48h Sneak Peek Gallery)",
    startingPriceNote: "Royal wedding & destination packages starting from ₹1,50,000 for multi-day celebration coverage.",
    idealFor: [
      "Couples planning intimate destination weddings and elopements",
      "Celebrations valuing documentary candids alongside editorial portraits",
      "Multi-day wedding weekends and rehearsal dinners",
    ],
    deliverables: [
      "400+ Hand-edited color-graded master images",
      "Complimentary engagement portrait session",
      "Second lead photographer for comprehensive ceremony & reception coverage",
      "Handcrafted heirloom presentation box with archival USB",
      "Private online guest gallery with 5-year cloud backup",
    ],
    processSteps: [
      {
        step: "01",
        title: "Connection & Timeline Planning",
        description:
          "We meet in person or via video to understand your love story, family traditions, and wedding day run-of-show.",
      },
      {
        step: "02",
        title: "Engagement Session",
        description:
          "A relaxed pre-wedding shoot to get comfortable in front of the camera and create save-the-date imagery.",
      },
      {
        step: "03",
        title: "The Wedding Celebration",
        description:
          "Unobtrusive documentary coverage capturing candid tears, joyous laughter, and intimate couple moments.",
      },
      {
        step: "04",
        title: "Sneak Peek & Heirloom Album",
        description:
          "Curated 48-hour sneak peek gallery followed by full digital delivery and custom-bound fine-art photo albums.",
      },
    ],
    overviewText: [
      "We believe weddings are living celebrations, not extended photo shoots. Our documentary philosophy blends organic photojournalism with timeless editorial portraiture.",
      "From quiet morning preparations and tearful family glances to vibrant dance floor celebrations, we document the truth and beauty of your day without disrupting its emotional cadence.",
    ],
    faqs: [
      {
        question: "When will we receive our wedding photographs?",
        answer:
          "You will receive an extensive 48-hour sneak peek gallery containing 30–50 highlight images to share with friends and family. Your complete, fully color-graded collection of 400+ images is delivered within 3 to 4 weeks.",
      },
      {
        question: "Do you travel for destination weddings?",
        answer:
          "Yes, we regularly document weddings across the United States, Europe, and worldwide destinations. Travel logistics and accommodations are coordinated transparently as part of your custom quote.",
      },
      {
        question: "Is a second photographer included in wedding coverage?",
        answer:
          "Yes, all full-day wedding collections include a second professional photographer to ensure simultaneous coverage of both partners getting ready and multiple angles during ceremony vows.",
      },
    ],
    relatedPortfolioCategory: "Wedding Photography",
  },
  {
    id: "event-photography",
    slug: "event-photography",
    title: "Event Photography",
    shortDescription:
      "Discreet and comprehensive coverage for corporate conferences, luxury galas, art exhibitions, and milestone anniversaries.",
    heroHeading: "Corporate Galas & Cultural Event Photography",
    heroDescription:
      "Polished, dynamic visual documentation for prestigious galas, corporate summits, brand activations, and private gatherings.",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Elegant evening gala dining table with warm candlelight and guest conversations",
    duration: "Half-Day to Multi-Day",
    deliveryTime: "48 – 72 hours express delivery",
    startingPriceNote: "Tiered hourly and day rates for conferences and corporate summits.",
    idealFor: [
      "Annual charity galas and foundation fundraisers",
      "Corporate conferences, keynote addresses, and panel discussions",
      "Brand activations, product launches, and fashion week events",
      "Milestone birthday celebrations and private VIP dinners",
    ],
    deliverables: [
      "Comprehensive chronological event narrative",
      "Same-day express press & social media highlight selects",
      "Full high-res digital archive with commercial PR rights",
      "VIP step-and-repeat and keynote speaker closeups",
      "Online press gallery for effortless media distribution",
    ],
    processSteps: [
      {
        step: "01",
        title: "Briefing & Shot List Coordination",
        description:
          "Reviewing event itinerary, VIP attendees, sponsor activations, and press release requirements.",
      },
      {
        step: "02",
        title: "On-Site Production",
        description:
          "Professional, discreet coverage respecting attendee privacy while capturing pivotal speeches and spontaneous atmosphere.",
      },
      {
        step: "03",
        title: "Express Press Turnaround",
        description:
          "High-priority images delivered on-site or within hours for immediate press releases and social coverage.",
      },
      {
        step: "04",
        title: "Complete Master Archive",
        description:
          "Fully curated, organized archive categorized by session and chronological event timeline.",
      },
    ],
    overviewText: [
      "Successful events represent immense planning and prestige. We provide visual documentation that honors your investment, highlighting both the architectural ambiance and the human connections that defined the evening.",
      "Our team operates with absolute discretion, using low-light equipment and silent shutter technology to capture key moments without intrusive flashes or disruptions.",
    ],
    faqs: [
      {
        question: "Can we receive photos the same day for press releases?",
        answer:
          "Yes, we provide expedited same-day highlights for press releases, social media channels, and sponsor deliverables upon request.",
      },
      {
        question: "How do you handle low-light event environments?",
        answer:
          "We use flagship low-noise sensors and ultra-fast prime lenses capable of capturing rich atmospheric ambient light without harsh, unflattering flash bursts.",
      },
    ],
    relatedPortfolioCategory: "Event Photography",
  },
  {
    id: "sports-photography",
    slug: "sports-photography",
    title: "Sports Photography",
    shortDescription:
      "High-speed, cinematic documentation of raw athletic intensity, tournament adrenaline, and championship triumph.",
    heroHeading: "High-Speed Athletic & Sports Photography",
    heroDescription:
      "Freezing split-second human triumph, speed, and tournament emotion with pro-grade telephoto precision.",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Athletic runner in dramatic stadium lighting showing speed and competitive focus",
    duration: "Half-Day / Match / Tournament",
    deliveryTime: "24 – 48 hours expedited",
    startingPriceNote: "Match rates and tournament day passes available.",
    idealFor: [
      "Professional sports teams, athletic clubs, and collegiate programs",
      "Marathons, triathlons, and outdoor endurance competitions",
      "Fitness apparel campaigns and athlete sponsorship portfolios",
      "Action sports, surfing, motorsport, and combat athletics",
    ],
    deliverables: [
      "High-speed burst action captures preserving peak athletic form",
      "Expedited 24-hour social media selects for sports marketing",
      "Sharpened high-resolution athlete action gallery",
      "Full commercial marketing and editorial reproduction licensing",
      "On-field and locker-room documentary narrative",
    ],
    processSteps: [
      {
        step: "01",
        title: "Course & Arena Scouting",
        description:
          "Mapping sightlines, finish-line angles, lighting patterns, and athlete trajectories before competition begins.",
      },
      {
        step: "02",
        title: "High-Speed Capture",
        description:
          "Deploying high-speed burst equipment (1/2000s+ shutter speeds) to freeze decisive moments with surgical focus.",
      },
      {
        step: "03",
        title: "Rapid Ingestion & Curation",
        description:
          "Fast-track processing selecting peak action, emotional reactions, and team celebrations.",
      },
      {
        step: "04",
        title: "Delivery to Teams & Media",
        description:
          "Direct cloud distribution to athletes, team managers, and publication outlets.",
      },
    ],
    overviewText: [
      "Sports photography is defined by anticipation. A fraction of a second differentiates an ordinary picture from an iconic image of triumph.",
      "Combining professional high-speed telephoto lenses with deep understanding of game rhythm, we capture the grit, speed, and drama of athletics across competitive arenas and outdoor expeditions.",
    ],
    faqs: [
      {
        question: "What equipment do you use for sports photography?",
        answer:
          "We utilize high-speed mirrorless bodies shooting up to 30 frames per second paired with fast f/2.8 telephoto primes and zoom lenses (70-200mm, 300mm, 400mm) for tack-sharp subject isolation.",
      },
      {
        question: "Can athletes purchase individual digital downloads?",
        answer:
          "Yes, we can provide dedicated client galleries where individual athletes and participants can securely view and license high-resolution downloads.",
      },
    ],
    relatedPortfolioCategory: "Sports Photography",
  },
  {
    id: "commercial-photography",
    slug: "commercial-photography",
    title: "Commercial Photography",
    shortDescription:
      "Strategic visual content for luxury brands, architects, culinary masters, and advertising campaigns.",
    heroHeading: "Commercial & Advertising Brand Photography",
    heroDescription:
      "Meticulous art direction, color fidelity, and visual storytelling crafted to elevate products and architectural spaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Luxury designer boutique interior and fashion display with architectural illumination",
    duration: "Full-Day Production Basis",
    deliveryTime: "Per production agreement",
    startingPriceNote: "Custom project estimates based on licensing and production scope.",
    idealFor: [
      "Architectural firms, interior designers, and luxury real estate",
      "Apparel, jewelry, and artisanal consumer goods brands",
      "Hospitality, boutique hotels, and culinary destinations",
      "Multi-channel marketing and billboard advertising campaigns",
    ],
    deliverables: [
      "Full commercial advertising and multi-channel usage licensing",
      "Complete studio and location lighting production",
      "Pre-production moodboards, shot lists, and art direction",
      "High-end composite retouching, color-grading, and cleaning",
      "Deliveries calibrated in CMYK for print and sRGB/P3 for digital",
    ],
    processSteps: [
      {
        step: "01",
        title: "Creative Brief & Pre-Production",
        description:
          "Defining brand guidelines, key art goals, model casting, location scouting, and moodboard styling.",
      },
      {
        step: "02",
        title: "Studio or Location Shoot",
        description:
          "Tethered shooting to live monitors for real-time creative director review and precision lighting adjustments.",
      },
      {
        step: "03",
        title: "Master Post-Production",
        description:
          "Pixel-level frequency separation, color management, dust cleanup, and packaging for print and digital.",
      },
      {
        step: "04",
        title: "Licensed Asset Handoff",
        description:
          "Formatted image suites delivered according to your agency specifications with perpetual or term licenses.",
      },
    ],
    overviewText: [
      "Commercial photography requires strict alignment with brand identity. Every millimeter of lighting and color gradient must communicate quality, desirability, and trust.",
      "We partner with marketing directors, design agencies, and entrepreneurs to create campaign assets that cut through digital noise and drive tangible commercial engagement.",
    ],
    faqs: [
      {
        question: "Do commercial sessions include licensing for advertising?",
        answer:
          "Yes, our commercial contracts explicitly define usage rights, including digital marketing, print editorial, billboard, and social advertising as required by your campaign.",
      },
      {
        question: "Can we shoot tethered to view photos in real time?",
        answer:
          "Yes, we standardly shoot tethered to calibrated Apple Retina displays so creative directors and clients can review lighting, framing, and details instantaneously on set.",
      },
    ],
    relatedPortfolioCategory: "Commercial Photography",
  },
  {
    id: "travel-and-wildlife-photography",
    slug: "travel-and-wildlife-photography",
    title: "Travel & Wildlife Photography",
    shortDescription:
      "Expedition photography capturing the awe-inspiring raw natural world, remote landscapes, and conservation stories.",
    heroHeading: "Expedition, Landscape & Wildlife Photography",
    heroDescription:
      "Fine-art landscape prints, editorial travel features, and conservation storytelling commissions across remote terrains.",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Misty mountain peaks and alpine forest caught in early golden morning light",
    duration: "Assignment / Expedition Basis",
    deliveryTime: "Per project timeline",
    startingPriceNote: "Fine-art collector prints and editorial commission rates.",
    idealFor: [
      "Travel and lifestyle editorial publications",
      "Eco-tourism lodges, national parks, and expedition companies",
      "Conservation NGOs and environmental research foundations",
      "Private art collectors and corporate interior installations",
    ],
    deliverables: [
      "Museum-grade fine-art prints on archival Hahnemühle cotton rag",
      "Editorial publishing rights for feature stories and essays",
      "High-resolution geological, landscape, and animal documentary files",
      "Drone and aerial perspective options where legally permitted",
      "Archival raw metadata and certified provenance documentation",
    ],
    processSteps: [
      {
        step: "01",
        title: "Field Research & Permits",
        description:
          "Studying weather windows, migration cycles, park permits, and respectful ethical wildlife access.",
      },
      {
        step: "02",
        title: "The Wilderness Expedition",
        description:
          "Patient field work in challenging weather conditions to capture elusive natural phenomena and animal behavior.",
      },
      {
        step: "03",
        title: "Archival Raw Processing",
        description:
          "True-to-nature color grading preserving atmospheric realism and dynamic range without artificial HDR distortion.",
      },
      {
        step: "04",
        title: "Publishing & Print Exhibition",
        description:
          "Delivery of editorial suites or production of signed, numbered museum-grade gallery prints.",
      },
    ],
    overviewText: [
      "The wilderness demands patience and deep ethical reverence. We approach travel and wildlife photography as an act of witness, preserving fragile ecosystems and ancient terrains with documentary integrity.",
      "Our work has taken us from mist-shrouded alpine valleys to remote coastal cliffs, creating fine-art prints that bring the sublime serenity of nature into homes and institutions.",
    ],
    faqs: [
      {
        question: "Can I purchase fine-art prints for my home or office?",
        answer:
          "Yes, we offer limited-edition museum-quality prints produced on archival Hahnemühle cotton rag paper with custom conservation framing available.",
      },
      {
        question: "Do you follow ethical wildlife photography guidelines?",
        answer:
          "Strictly. We never bait, distress, or manipulate wild animals. We prioritize the wellbeing of wildlife and their natural habitats above every photograph.",
      },
    ],
    relatedPortfolioCategory: "Nature & Wildlife",
  },
];
