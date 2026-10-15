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
          "Yes, while based in Jaipur, we regularly document royal destination weddings across Rajasthan (Udaipur, Jodhpur, Jaisalmer), Goa, Kerala, Delhi NCR, and worldwide destinations. Travel logistics and accommodations are coordinated transparently as part of your custom quote.",
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
      "Discreet and comprehensive coverage for corporate summits, literature festivals, luxury palace galas, and milestone celebrations.",
    heroHeading: "Corporate Galas & Cultural Event Photography in Jaipur",
    heroDescription:
      "Polished, dynamic visual documentation for prestigious galas, corporate summits, brand activations, and cultural festivals across Jaipur and India.",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Atmospheric evening gala dining courtyard with glowing candlelight and elegant guests in Jaipur",
    duration: "Half-Day to Multi-Day",
    deliveryTime: "48 – 72 hours express delivery",
    startingPriceNote: "Bespoke packages starting from ₹20,000 for corporate summits, literature festivals, and luxury palace galas.",
    idealFor: [
      "Jaipur Literature Festival, cultural summits, and art exhibitions",
      "Corporate conferences, keynote addresses, and industry summits",
      "Brand activations, product launches, and fashion week events",
      "Milestone birthday celebrations and private royal palace dinners",
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
        question: "How do you handle low-light event environments in heritage venues?",
        answer:
          "We use flagship low-noise sensors and ultra-fast prime lenses capable of capturing rich atmospheric ambient light in palace courtyards without harsh flash bursts.",
      },
    ],
    relatedPortfolioCategory: "Event Photography",
  },
  {
    id: "sports-photography",
    slug: "sports-photography",
    title: "Sports Photography",
    shortDescription:
      "High-speed, cinematic documentation of raw athletic intensity, cricket tournaments, polo matches, and championship triumph.",
    heroHeading: "High-Speed Cricket, Polo & Athletic Sports Photography",
    heroDescription:
      "Freezing split-second human triumph, speed, and tournament emotion with pro-grade telephoto precision across Sawai Mansingh Stadium, polo grounds, and athletic arenas.",
    imageUrl:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "High-speed cricket batsman action during intense competitive match under stadium lights",
    duration: "Half-Day / Match / Tournament",
    deliveryTime: "24 – 48 hours expedited",
    startingPriceNote: "Match and tournament coverage packages starting from ₹35,000 across Jaipur and India.",
    idealFor: [
      "Cricket tournaments, premier leagues, and academy matches",
      "Jaipur Polo Club championships and equestrian competitions",
      "Jaipur Marathon, endurance triathlons, and athletic meets",
      "Fitness apparel campaigns and athlete sponsorship portfolios",
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
          "Mapping sightlines, boundary angles, lighting patterns, and athlete trajectories before competition begins.",
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
      "Combining professional high-speed telephoto lenses with deep understanding of sports rhythm, we capture the grit, speed, and drama of athletics across competitive arenas and outdoor expeditions.",
    ],
    faqs: [
      {
        question: "What equipment do you use for sports photography?",
        answer:
          "We utilize high-speed mirrorless bodies shooting up to 30 frames per second paired with fast f/2.8 telephoto primes and zoom lenses (70-200mm, 200-600mm) for tack-sharp subject isolation.",
      },
      {
        question: "Can athletes and academies purchase individual digital downloads?",
        answer:
          "Yes, we provide dedicated client galleries where sports academies, athletes, and participants can securely view and license high-resolution downloads.",
      },
    ],
    relatedPortfolioCategory: "Sports Photography",
  },
  {
    id: "commercial-photography",
    slug: "commercial-photography",
    title: "Commercial Photography",
    shortDescription:
      "Strategic visual content for luxury heritage hotels, jewellery brands, textile designers, and advertising campaigns.",
    heroHeading: "Commercial, Jewellery & Architecture Photography",
    heroDescription:
      "Meticulous art direction, color fidelity, and visual storytelling crafted to elevate handcrafted jewellery, luxury heritage properties, and brand campaigns.",
    imageUrl:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Intricate architectural details of Jaipur palace gateway with grand symmetry and golden illumination",
    duration: "Full-Day Production Basis",
    deliveryTime: "Per production agreement",
    startingPriceNote: "Commercial campaign packages starting from ₹50,000 for luxury heritage hotels, jewellery brands, and lifestyle advertising.",
    idealFor: [
      "Jaipur Kundan & Meenakari jewellery houses and gemstone designers",
      "Heritage palace hotels, luxury resorts, and architectural firms",
      "Handcrafted textile, block print, and luxury fashion exporters",
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
        question: "Do commercial sessions include licensing for advertising in India and globally?",
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
      "Expedition photography capturing the awe-inspiring raw natural world, Ranthambore tigers, desert sands, and conservation stories.",
    heroHeading: "Ranthambore, Thar Desert & Indian Wildlife Photography",
    heroDescription:
      "Fine-art landscape prints, Ranthambore Royal Bengal tiger documentation, Thar desert dunes, and conservation storytelling across Rajasthan and India.",
    imageUrl:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Majestic Royal Bengal Tiger roaming peacefully through dense forest foliage in Ranthambore",
    duration: "Assignment / Expedition Basis",
    deliveryTime: "Per project timeline",
    startingPriceNote: "Expedition commissions and limited-edition fine-art archival prints starting from ₹45,000.",
    idealFor: [
      "Travel and lifestyle editorial publications",
      "Ranthambore and Sariska luxury safari lodges and national parks",
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
      "From the tiger trails of Ranthambore to the golden sand dunes of Jaisalmer, we create fine-art imagery celebrating the sublime natural heritage of India.",
    ],
    faqs: [
      {
        question: "Can I purchase fine-art prints for my home or office in India?",
        answer:
          "Yes, we offer limited-edition museum-quality prints produced on archival Hahnemühle cotton rag paper with custom conservation framing shipped securely across India and globally.",
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

export const SERVICES_DATA_HINDI: Record<string, Partial<ServiceDetail>> = {
  "portrait-photography": {
    title: "पोर्ट्रेट फोटोग्राफी",
    shortDescription:
      "कलाकारों, अधिकारियों, युगलों और व्यक्तियों के लिए तैयार किए गए सुरुचिपूर्ण और सदाबहार पोर्ट्रेट सत्र।",
    heroHeading: "संपादकीय एवं फाइन-आर्ट पोर्ट्रेट फोटोग्राफी",
    heroDescription:
      "प्राकृतिक प्रकाश, सहज कला निर्देशन और व्यक्तिगत व्यक्तित्व पर सूक्ष्म ध्यान के साथ खींचे गए अंतरंग, भावपूर्ण पोर्ट्रेट।",
    duration: "1.5 – 2.5 घंटे",
    deliveryTime: "7 कार्य दिवस",
    startingPriceNote: "स्टूडियो और पिंक सिटी हेरिटेज सत्रों के लिए ₹25,000 से शुरू होने वाले विशेष पैकेज।",
    idealFor: [
      "कलाकार, लेखक, संस्थापक और रचनात्मक पेशेवर",
      "कॉर्पोरेट नेतृत्व और व्यक्तिगत ब्रांडिंग",
      "शादी की सालगिरह या प्री-वेडिंग पोर्ट्रेट चाहने वाले युगल",
      "रचनात्मक हेडशॉट्स और पत्रिका संपादकीय फीचर्स",
    ],
    deliverables: [
      "25+ क्यूरेटेड हाई-रेज़ोल्यूशन मास्टर री-टच की गई तस्वीरें",
      "निजी पासवर्ड-संरक्षित डिजिटल प्रूफिंग गैलरी",
      "पूर्ण व्यक्तिगत उपयोग और डिजिटल प्रकाशन अधिकार",
      "स्टूडियो या आउटडोर प्राकृतिक प्रकाश लोकेशन विकल्प",
      "विस्तृत वार्डरोब और क्रिएटिव दिशा-निर्देश गाइड",
    ],
    processSteps: [
      {
        step: "01",
        title: "रचनात्मक परामर्श",
        description: "हम मूडबोर्ड, परिधान पैलेट, स्थान के माहौल और इच्छित छवि उपयोग पर चर्चा करते हैं।",
      },
      {
        step: "02",
        title: "फोटोशूट का अनुभव",
        description: "एक आरामदायक, सहज सत्र जिसमें स्वाभाविक मुद्राओं और कोणों पर ध्यान केंद्रित किया जाता है।",
      },
      {
        step: "03",
        title: "चयन एवं संपादन",
        description: "प्राकृतिक त्वचा बनावट और रंग टोन को सुरक्षित रखते हुए हाथ से चुनी गई तस्वीरों का परिष्करण।",
      },
      {
        step: "04",
        title: "अंतिम डिलीवरी",
        description: "स्थायी क्लाउड बैकअप के साथ तत्काल हाई-रेज़ोल्यूशन डिजिटल डाउनलोड।",
      },
    ],
    overviewText: [
      "एक शानदार पोर्ट्रेट केवल एक तस्वीर नहीं है—यह एक सजीव अहसास है। चाहे आप पेशेवर पहचान बना रहे हों, जीवन के महत्वपूर्ण पड़ाव संजो रहे हों या कलात्मक संग्रह तैयार कर रहे हों, हमारे सत्र सहजता और प्रामाणिकता को प्राथमिकता देते हैं।",
      "हम प्राकृतिक प्रकाश स्टूडियो, ऐतिहासिक स्थापत्य स्थलों या आपके निजी परिवेश में काम करते हैं। प्रत्येक तस्वीर समय की कसौटी पर खरी उतरती है, किसी भी कृत्रिम डिजिटल फिल्टर या कठोर मुद्रा से मुक्त।",
    ],
    faqs: [
      {
        question: "पोर्ट्रेट फोटोशूट में कितना समय लगता है?",
        answer: "मानक पोर्ट्रेट सत्र आमतौर पर 1.5 से 2.5 घंटे तक चलते हैं। यह 2-3 परिधान परिवर्तनों, प्राकृतिक प्रकाश बदलावों और आरामदायक माहौल के लिए पर्याप्त समय देता है।",
      },
      {
        question: "मुझे अपने पोर्ट्रेट सत्र के लिए क्या पहनना चाहिए?",
        answer: "हम सौम्य न्यूट्रल टोन, वार्म बेज, आइवरी, गहरा नेवी ब्लू या चारकोल की सलाह देते हैं। बुकिंग के बाद, हम आपके चुने हुए स्थान के अनुरूप पूरी स्टाइलिंग गाइड प्रदान करते हैं।",
      },
      {
        question: "पोर्ट्रेट फोटोशूट कहाँ आयोजित किए जाते हैं?",
        answer: "सत्र जयपुर में हमारे स्टूडियो (कमरा नं. 215, करोलां का बाड़, श्री किशनपुरा, 302017), प्रतिष्ठित पिंक सिटी हेरिटेज स्थलों (आमेर किला, हवा महल, पत्रिका गेट), या अनुरोध पर आपके निजी रिसॉर्ट में आयोजित किए जाते हैं।",
      },
    ],
  },
  "wedding-photography": {
    title: "वेडिंग फोटोग्राफी",
    shortDescription:
      "पवित्र फेरों, राजसी महलों और दिल को छू लेने वाले अनकहे पलों को संजोने वाली सिनेमाई स्टोरीटेलिंग।",
    heroHeading: "रॉयल राजस्थान एवं डेस्टिनेशन वेडिंग फोटोग्राफी",
    heroDescription:
      "जयपुर और पूरे राजस्थान में आपके फेरों, भव्य संगीत, शाही महल वेन्यू और भावनात्मक पारिवारिक पलों को समर्पित सिनेमाई एवं भावपूर्ण फोटोग्राफी।",
    duration: "पूर्ण-दिवसीय से बहु-दिवसीय समारोह",
    deliveryTime: "3 – 4 सप्ताह (48 घंटे में स्नीक पीक गैलरी)",
    startingPriceNote: "बहु-दिवसीय शाही विवाह और डेस्टिनेशन आयोजनों के लिए ₹1,50,000 से शुरू होने वाले पैकेज।",
    idealFor: [
      "डेस्टिनेशन वेडिंग और निजी शाही समारोहों की योजना बनाने वाले युगल",
      "संपादकीय पोर्ट्रेट्स के साथ प्रामाणिक कैंडिड पलों को महत्व देने वाले उत्सव",
      "कई दिनों तक चलने वाले विवाह सप्ताहांत और रिहर्सल डिनर",
    ],
    deliverables: [
      "400+ हाथ से संपादित एवं कलर-ग्रेडेड मास्टर तस्वीरें",
      "मानार्थ प्री-वेडिंग / सगाई पोर्ट्रेट सत्र",
      "समारोह और रिसेप्शन के व्यापक कवरेज के लिए द्वितीय लीड फोटोग्राफर",
      "आर्काइवल यूएसबी के साथ हस्तनिर्मित हेरलूम प्रेजेंटेशन बॉक्स",
      "5 साल के क्लाउड बैकअप के साथ निजी ऑनलाइन अतिथि गैलरी",
    ],
    processSteps: [
      {
        step: "01",
        title: "सम्पर्क एवं समय सारणी योजना",
        description: "हम व्यक्तिगत रूप से या वीडियो कॉल पर आपकी प्रेम कहानी, पारिवारिक परंपराओं और विवाह दिवस की योजना को समझते हैं।",
      },
      {
        step: "02",
        title: "प्री-वेडिंग सत्र",
        description: "कैमरे के सामने सहज होने और सेव-द-डेट आमंत्रणों के लिए एक आरामदायक प्री-वेडिंग शूट।",
      },
      {
        step: "03",
        title: "विवाह समारोह कवरेज",
        description: "स्वाभाविक आंसुओं, आनंदमयी हंसी और युगल के अंतरंग पलों को बिना किसी व्यवधान के कैद करने वाली डॉक्यूमेंट्री फोटोग्राफी।",
      },
      {
        step: "04",
        title: "स्नीक पीक एवं हेरलूम एल्बम",
        description: "48 घंटे में क्यूरेटेड स्नीक पीक गैलरी, जिसके बाद पूर्ण डिजिटल डिलीवरी और कस्टम फाइन-आर्ट फोटो एल्बम।",
      },
    ],
    overviewText: [
      "हमारा मानना है कि विवाह जीवंत उत्सव हैं, कोई लंबा फोटो शूट नहीं। हमारा डॉक्यूमेंट्री दर्शन प्राकृतिक फोटोपत्रकारिता को सदाबहार संपादकीय पोर्ट्रेट के साथ जोड़ता है।",
      "सुबह की शांत तैयारियों और आंसुओं से भरी पारिवारिक नजरों से लेकर रात के उत्सव तक, हम आपके दिन की सच्चाई और सुंदरता को उसकी भावनात्मक लय तोड़े बिना दर्ज करते हैं।",
    ],
    faqs: [
      {
        question: "हमें अपनी शादी की तस्वीरें कब मिलेंगी?",
        answer: "आपको 48 घंटों के भीतर 30-50 मुख्य तस्वीरों वाली एक विस्तृत स्नीक पीक गैलरी मिलेगी। आपकी 400+ तस्वीरों का पूरा, कलर-ग्रेडेड संग्रह 3 से 4 सप्ताह में वितरित किया जाता है।",
      },
      {
        question: "क्या आप डेस्टिनेशन वेडिंग के लिए यात्रा करते हैं?",
        answer: "हाँ, जयपुर में स्थित होने के बावजूद हम राजस्थान (उदयपुर, जोधपुर, जैसलमेर), गोवा, केरल, दिल्ली एनसीआर और दुनिया भर में शाही डेस्टिनेशन शादियों को कवर करते हैं।",
      },
      {
        question: "क्या शादी के कवरेज में दूसरा फोटोग्राफर शामिल है?",
        answer: "हाँ, सभी पूर्ण-दिवसीय विवाह पैकेजों में एक द्वितीय पेशेवर फोटोग्राफर शामिल होता है ताकि दोनों पक्षों की तैयारी और समारोह के विभिन्न कोण एक साथ रिकॉर्ड हो सकें।",
      },
    ],
  },
  "event-photography": {
    title: "इवेंट फोटोग्राफी",
    shortDescription:
      "कॉर्पोरेट सम्मेलनों, साहित्य उत्सवों, लक्जरी पैलेस गाला और मील के पत्थर समारोहों के लिए विवेकपूर्ण और व्यापक कवरेज।",
    heroHeading: "जयपुर में कॉर्पोरेट गाला एवं सांस्कृतिक इवेंट फोटोग्राफी",
    heroDescription:
      "जयपुर और पूरे भारत में प्रतिष्ठित समारोहों, कॉर्पोरेट सम्मेलनों, ब्रांड एक्टिवेशन और सांस्कृतिक उत्सवों के लिए परिष्कृत विजुअल डॉक्यूमेंटेशन।",
    duration: "आधा-दिन से बहु-दिवसीय",
    deliveryTime: "48 – 72 घंटे एक्सप्रेस डिलीवरी",
    startingPriceNote: "कॉर्पोरेट सम्मेलनों, साहित्य उत्सवों और लक्जरी महलों के कार्यक्रमों के लिए ₹20,000 से शुरू।",
    idealFor: [
      "जयपुर लिटरेचर फेस्टिवल, सांस्कृतिक शिखर सम्मेलन और कला प्रदर्शनियाँ",
      "कॉर्पोरेट सम्मेलन, मुख्य भाषण और उद्योग बैठकें",
      "ब्रांड लॉन्च, उत्पाद अनावरण और फैशन वीक कार्यक्रम",
      "जन्मदिन के मील के पत्थर और निजी शाही महल रात्रिभोज",
    ],
    deliverables: [
      "कालानुक्रमिक घटनाक्रम के अनुसार व्यवस्थित संपूर्ण विजुअल आख्यान",
      "प्रेस और सोशल मीडिया के लिए उसी दिन एक्सप्रेस मुख्य चयन",
      "कमर्शियल पीआर अधिकारों के साथ पूर्ण हाई-रेज़ोल्यूशन डिजिटल संग्रह",
      "वीआईपी रेड कार्पेट और मुख्य वक्ताओं के सटीक क्लोज-अप्स",
      "सहज मीडिया वितरण के लिए ऑनलाइन प्रेस गैलरी",
    ],
    processSteps: [
      {
        step: "01",
        title: "ब्रीफिंग एवं शॉट लिस्ट समन्वय",
        description: "इवेंट शेड्यूल, वीआईपी अतिथियों, प्रायोजक गतिविधियों और प्रेस रिलीज आवश्यकताओं की समीक्षा।",
      },
      {
        step: "02",
        title: "ऑन-साइट प्रोडक्शन",
        description: "अतिथियों की निजता का सम्मान करते हुए महत्वपूर्ण भाषणों और सहज माहौल को कैद करने वाला शांत, पेशेवर कवरेज।",
      },
      {
        step: "03",
        title: "एक्सप्रेस प्रेस टर्नअराउंड",
        description: "तत्काल प्रेस रिलीज और सोशल मीडिया कवरेज के लिए कुछ ही घंटों में उच्च-प्राथमिकता वाली तस्वीरों की डिलीवरी।",
      },
      {
        step: "04",
        title: "संपूर्ण मास्टर आर्काइव",
        description: "सत्र और समयरेखा के अनुसार व्यवस्थित पूरी तरह से क्यूरेटेड डिजिटल संग्रह।",
      },
    ],
    overviewText: [
      "सफल आयोजन भारी योजना और प्रतिष्ठा का प्रतिनिधित्व करते हैं। हम ऐसा विजुअल डॉक्यूमेंटेशन प्रदान करते हैं जो आपके निवेश का सम्मान करता है।",
      "हमारी टीम साइलेंट शटर तकनीक और लो-लाइट उपकरणों का उपयोग करती है ताकि बिना किसी बाधा या चकाचौंध के हर महत्वपूर्ण क्षण को दर्ज किया जा सके।",
    ],
    faqs: [
      {
        question: "क्या हमें प्रेस रिलीज के लिए उसी दिन तस्वीरें मिल सकती हैं?",
        answer: "हाँ, हम अनुरोध पर प्रेस रिलीज, सोशल मीडिया और प्रायोजक वितरण के लिए उसी दिन त्वरित मुख्य तस्वीरें प्रदान करते हैं।",
      },
      {
        question: "आप विरासत स्थलों में कम रोशनी वाले वातावरण को कैसे संभालते हैं?",
        answer: "हम फ्लैगशिप लो-नॉइज़ सेंसर और अल्ट्रा-फास्ट प्राइम लेंस का उपयोग करते हैं, जो बिना किसी कठोर फ्लैश के महलों की प्राकृतिक रोशनी और माहौल को खूबसूरती से कैद करते हैं।",
      },
    ],
  },
  "sports-photography": {
    title: "स्पोर्ट्स फोटोग्राफी",
    shortDescription:
      "तीव्र एथलेटिक ऊर्जा, क्रिकेट टूर्नामेंट, पोलो मैच और चैंपियनशिप जीत की हाई-स्पीड सिनेमाई फोटोग्राफी।",
    heroHeading: "हाई-स्पीड क्रिकेट, पोलो एवं एथलेटिक स्पोर्ट्स फोटोग्राफी",
    heroDescription:
      "सवाई मानसिंह स्टेडियम, पोलो ग्राउंड्स और खेल परिसरों में प्रो-ग्रेड टेलीफोटो लेंस के साथ क्षणिक विजय और रोमांच को फ्रीज करना।",
    duration: "आधा-दिन / मैच / टूर्नामेंट",
    deliveryTime: "24 – 48 घंटे में त्वरित",
    startingPriceNote: "जयपुर और पूरे भारत में मैच और टूर्नामेंट कवरेज पैकेज ₹35,000 से शुरू।",
    idealFor: [
      "क्रिकेट टूर्नामेंट, प्रीमियर लीग और अकादमी मैच",
      "जयपुर पोलो क्लब चैंपियनशिप और घुड़सवारी प्रतियोगिताएं",
      "जयपुर मैराथन, ट्रायथलॉन और एथलेटिक मीट",
      "फिटनेस वियर अभियान और एथलीट प्रायोजन पोर्टफोलियो",
    ],
    deliverables: [
      "सर्वोच्च एथलेटिक फॉर्म को सुरक्षित रखने वाले हाई-स्पीड बर्स्ट एक्शन शॉट्स",
      "स्पोर्ट्स मार्केटिंग के लिए 24 घंटे में सोशल मीडिया चयन",
      "अत्यधिक शार्प हाई-रेज़ोल्यूशन एथलीट एक्शन गैलरी",
      "पूर्ण व्यावसायिक मार्केटिंग और संपादकीय लाइसेंसिंग",
      "मैदान और लॉकर-रूम की प्रामाणिक डॉक्यूमेंट्री तस्वीरें",
    ],
    processSteps: [
      {
        step: "01",
        title: "ट्रैक एवं एरेना रेकी",
        description: "प्रतियोगिता शुरू होने से पहले दृष्टि कोण, सीमा रेखाएं, प्रकाश व्यवस्था और एथलीट गतिविधियों का अध्ययन।",
      },
      {
        step: "02",
        title: "हाई-स्पीड कैप्चर",
        description: "1/2000 सेकंड से अधिक शटर स्पीड पर हाई-स्पीड बर्स्ट उपकरणों के साथ निर्णायक पलों को सटीक रूप से कैद करना।",
      },
      {
        step: "03",
        title: "त्वरित चयन एवं संपादन",
        description: "चरम एक्शन, भावुक प्रतिक्रियाओं और टीम के जश्न को तेजी से प्रोसेस और क्यूरेट करना।",
      },
      {
        step: "04",
        title: "टीमों और मीडिया को डिलीवरी",
        description: "एथलीटों, टीम प्रबंधकों और मीडिया आउटलेट्स को सीधे सुरक्षित क्लाउड वितरण।",
      },
    ],
    overviewText: [
      "स्पोर्ट्स फोटोग्राफी पूर्व-अनुमान पर निर्भर करती है। एक सेकंड का अंश एक सामान्य तस्वीर और विजय की ऐतिहासिक छवि के बीच का अंतर तय करता है।",
      "पेशेवर टेलीफोटो लेंस और खेल की गहरी समझ के साथ, हम खेल के मैदानों और रोमांचक अभियानों में एथलेटिक्स के उत्साह, गति और ड्रामा को कैद करते हैं।",
    ],
    faqs: [
      {
        question: "आप स्पोर्ट्स फोटोग्राफी के लिए कौन से उपकरण का उपयोग करते हैं?",
        answer: "हम 30 फ्रेम प्रति सेकंड तक शूट करने वाले हाई-स्पीड मिररलेस कैमरे और अल्ट्रा-शार्प फास्ट f/2.8 टेलीफोटो प्राइम व ज़ूम लेंस (70-200mm, 200-600mm) का उपयोग करते हैं।",
      },
      {
        question: "क्या एथलीट और अकादमियां व्यक्तिगत तस्वीरें खरीद सकते हैं?",
        answer: "हाँ, हम समर्पित क्लाइंट गैलरी प्रदान करते हैं जहाँ खेल अकादमियां, एथलीट और प्रतिभागी हाई-रेज़ोल्यूशन डाउनलोड सुरक्षित रूप से देख और खरीद सकते हैं।",
      },
    ],
  },
  "commercial-photography": {
    title: "कमर्शियल फोटोग्राफी",
    shortDescription:
      "लक्जरी हेरिटेज होटलों, आभूषण ब्रांडों, कपड़ा डिजाइनरों और विज्ञापन अभियानों के लिए रणनीतिक विजुअल सामग्री।",
    heroHeading: "कमर्शियल, आभूषण एवं वास्तुकला फोटोग्राफी",
    heroDescription:
      "हस्तनिर्मित आभूषणों, लक्जरी हेरिटेज संपत्तियों और ब्रांड अभियानों के लिए सूक्ष्म कला निर्देशन और रंगों की प्रामाणिकता।",
    duration: "पूर्ण-दिवसीय प्रोडक्शन आधार पर",
    deliveryTime: "प्रोडक्शन समझौते के अनुसार",
    startingPriceNote: "लक्जरी हेरिटेज होटलों, ज्वेलरी ब्रांडों और लाइफस्टाइल विज्ञापनों के लिए ₹50,000 से शुरू।",
    idealFor: [
      "जयपुर के कुंदन एवं मीनाकारी ज्वेलरी घराने और रत्न डिजाइनर",
      "हेरिटेज पैलेस होटल, लक्जरी रिसॉर्ट्स और आर्किटेक्चर फर्म",
      "हस्तनिर्मित टेक्सटाइल, ब्लॉक प्रिंट और लक्जरी फैशन निर्यातक",
      "मल्टी-चैनल मार्केटिंग और बिलबोर्ड विज्ञापन अभियान",
    ],
    deliverables: [
      "पूर्ण कमर्शियल विज्ञापन और मल्टी-चैनल उपयोग लाइसेंसिंग",
      "संपूर्ण स्टूडियो और लोकेशन लाइटिंग प्रोडक्शन",
      "प्री-प्रोडक्शन मूडबोर्ड, शॉट लिस्ट और आर्ट डायरेक्शन",
      "हाई-एंड कंपोजिट रीटचिंग, कलर-ग्रेडिंग और डस्ट क्लीनअप",
      "प्रिंट के लिए CMYK और डिजिटल के लिए sRGB/P3 में कैलिब्रेटेड डिलीवरी",
    ],
    processSteps: [
      {
        step: "01",
        title: "क्रिएटिव ब्रीफ एवं प्री-प्रोडक्शन",
        description: "ब्रांड दिशा-निर्देश, मुख्य कला लक्ष्य, मॉडल चयन, लोकेशन रेकी और मूडबोर्ड स्टाइलिंग तय करना।",
      },
      {
        step: "02",
        title: "स्टूडियो या लोकेशन शूट",
        description: "लाइव मॉनिटर पर टीथर्ड शूटिंग ताकि क्रिएटिव डायरेक्टर और क्लाइंट तुरंत फ्रेम और लाइटिंग की समीक्षा कर सकें।",
      },
      {
        step: "03",
        title: "मास्टर पोस्ट-प्रोडक्शन",
        description: "पिक्सेल-स्तरीय फ़्रीक्वेंसी सेपरेशन, कलर मैनेजमेंट, और प्रिंट व डिजिटल मीडिया के लिए पैकेजिंग।",
      },
      {
        step: "04",
        title: "लाइसेंस्ड एसेट डिलीवरी",
        description: "आपकी एजेंसी के विनिर्देशों के अनुसार शाश्वत या सीमित लाइसेंस के साथ इमेज सूट का वितरण।",
      },
    ],
    overviewText: [
      "कमर्शियल फोटोग्राफी में ब्रांड पहचान के साथ सटीक सामंजस्य आवश्यक है। प्रकाश और रंग का प्रत्येक विवरण गुणवत्ता, आकर्षण और विश्वास को व्यक्त करना चाहिए।",
      "हम मार्केटिंग निदेशकों, डिजाइन एजेंसियों और उद्यमियों के साथ साझेदारी करते हैं ताकि डिजिटल शोर से अलग दिखने वाले प्रभावी अभियान एसेट्स तैयार किए जा सकें।"
    ],
    faqs: [
      {
        question: "क्या कमर्शियल सत्रों में भारत और वैश्विक स्तर पर विज्ञापन का लाइसेंस शामिल है?",
        answer: "हाँ, हमारे कमर्शियल अनुबंध स्पष्ट रूप से डिजिटल मार्केटिंग, प्रिंट, बिलबोर्ड और सोशल विज्ञापन के उपयोग अधिकारों को परिभाषित करते हैं।",
      },
      {
        question: "क्या हम शूट के दौरान लाइव तस्वीरें देख सकते हैं?",
        answer: "हाँ, हम कैलिब्रेटेड एप्पल रेटिना डिस्प्ले से टीथर्ड शूट करते हैं ताकि सेट पर मौजूद टीम तुरंत फ्रेम और लाइटिंग का बारीकी से निरीक्षण कर सके।",
      },
    ],
  },
  "travel-and-wildlife-photography": {
    title: "ट्रैवल एवं वन्यजीव फोटोग्राफी",
    shortDescription:
      "विस्मयकारी प्राकृतिक दुनिया, रणथंभौर के बाघों, रेगिस्तानी टीलों और संरक्षण गाथाओं को कैद करने वाली अभियान फोटोग्राफी।",
    heroHeading: "रणथंभौर, थार मरुस्थल एवं भारतीय वन्यजीव फोटोग्राफी",
    heroDescription:
      "फाइन-आर्ट लैंडस्केप प्रिंट्स, रणथंभौर के रॉयल बंगाल टाइगर्स, थार के सुनहरे टीले और पूरे राजस्थान में संरक्षण की प्रामाणिक कहानियाँ।",
    duration: "असाइनमेंट / अभियान आधार पर",
    deliveryTime: "प्रोजेक्ट समयरेखा के अनुसार",
    startingPriceNote: "अभियान कमीशन और सीमित संस्करण वाले फाइन-आर्ट आर्काइवल प्रिंट्स ₹45,000 से शुरू।",
    idealFor: [
      "ट्रैवल और लाइफस्टाइल संपादकीय प्रकाशन",
      "रणथंभौर और सरिस्का के लक्जरी सफारी लॉज और राष्ट्रीय उद्यान",
      "पर्यावरण संरक्षण एनजीओ और वन्यजीव शोध फाउंडेशन",
      "निजी कला संग्राहक और कॉर्पोरेट इंटीरियर इंस्टॉलेशन",
    ],
    deliverables: [
      "आर्काइवल हानेमुहले कॉटन रैग पेपर पर म्यूजियम-ग्रेड फाइन-आर्ट प्रिंट्स",
      "फीचर स्टोरीज और निबंधों के लिए संपादकीय प्रकाशन अधिकार",
      "हाई-रेज़ोल्यूशन भूवैज्ञानिक, प्राकृतिक और वन्यजीव डॉक्यूमेंट्री फाइलें",
      "कानूनी रूप से अनुमत स्थानों पर ड्रोन और एरियल पर्सपेक्टिव विकल्प",
      "आर्काइवल रॉ मेटाडेटा और प्रमाणित प्रामाणिकता दस्तावेज",
    ],
    processSteps: [
      {
        step: "01",
        title: "फील्ड रिसर्च एवं परमिट",
        description: "मौसम, प्रवास चक्र, पार्क परमिट और सम्मानजनक नैतिक वन्यजीव पहुंच का अध्ययन।",
      },
      {
        step: "02",
        title: "जंगल अभियान",
        description: "प्राकृतिक घटनाओं और पशु व्यवहार को कैद करने के लिए चुनौतीपूर्ण परिस्थितियों में धैर्यपूर्वक फील्ड वर्क।",
      },
      {
        step: "03",
        title: "आर्काइवल रॉ प्रोसेसिंग",
        description: "बिना किसी कृत्रिम एचडीआर विकृति के वायुमंडलीय यथार्थवाद और डायनामिक रेंज को बनाए रखने वाली कलर ग्रेडिंग।",
      },
      {
        step: "04",
        title: "प्रकाशन एवं प्रिंट प्रदर्शनी",
        description: "संपादकीय सूट की डिलीवरी या हस्ताक्षरित, क्रमांकित म्यूजियम-ग्रेड गैलरी प्रिंट्स का निर्माण।",
      },
    ],
    overviewText: [
      "वन्यजीव धैर्य और गहरी नैतिक श्रद्धा की मांग करता है। हम यात्रा और वन्यजीव फोटोग्राफी को एक गवाही के रूप में देखते हैं, जो नाजुक पारिस्थितिक तंत्र को ईमानदारी से सहेजती है।",
      "रणथंभौर के बाघों के रास्तों से लेकर जैसलमेर के सुनहरे रेत के टीलों तक, हम भारत की उत्कृष्ट प्राकृतिक विरासत का उत्सव मनाने वाली फाइन-आर्ट छवियां बनाते हैं।"
    ],
    faqs: [
      {
        question: "क्या मैं अपने घर या कार्यालय के लिए फाइन-आर्ट प्रिंट खरीद सकता हूँ?",
        answer: "हाँ, हम आर्काइवल हानेमुहले कॉटन रैग पेपर पर बने सीमित संस्करण वाले म्यूजियम-गुणवत्ता प्रिंट कस्टम फ्रेमिंग के साथ भारत और दुनिया भर में सुरक्षित भेजते हैं।",
      },
      {
        question: "क्या आप नैतिक वन्यजीव फोटोग्राफी के नियमों का पालन करते हैं?",
        answer: "पूरी तरह से। हम कभी भी जंगली जानवरों को चारा नहीं डालते, परेशान नहीं करते या प्रभावित नहीं करते। हम हर तस्वीर से ऊपर जानवरों और उनके प्राकृतिक आवास की भलाई को रखते हैं।",
      },
    ],
  },
};

export function getLocalizedServiceDetail(
  service: ServiceDetail,
  language: "en" | "hi"
): ServiceDetail {
  if (language !== "hi") return service;
  const hi = SERVICES_DATA_HINDI[service.slug] || SERVICES_DATA_HINDI[service.id];
  if (!hi) return service;

  return {
    ...service,
    title: hi.title || service.title,
    shortDescription: hi.shortDescription || service.shortDescription,
    heroHeading: hi.heroHeading || service.heroHeading,
    heroDescription: hi.heroDescription || service.heroDescription,
    duration: hi.duration || service.duration,
    deliveryTime: hi.deliveryTime || service.deliveryTime,
    startingPriceNote: hi.startingPriceNote || service.startingPriceNote,
    idealFor: hi.idealFor || service.idealFor,
    deliverables: hi.deliverables || service.deliverables,
    processSteps: hi.processSteps || service.processSteps,
    overviewText: hi.overviewText || service.overviewText,
    faqs: hi.faqs || service.faqs,
  };
}

export function getLocalizedServicesData(
  language: "en" | "hi"
): ServiceDetail[] {
  return SERVICES_DATA.map((service) => getLocalizedServiceDetail(service, language));
}
