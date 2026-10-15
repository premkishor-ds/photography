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
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80",
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
    client: "Private Wedding Patron",
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
    client: "Destination Wedding Couple",
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
    client: "Heritage Palace Couple",
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
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
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

export const PORTFOLIO_CATEGORIES_META_HINDI: Record<string, Partial<PortfolioCategoryMeta>> = {
  portraits: {
    name: "पोर्ट्रेट फोटोग्राफी",
    title: "पोर्ट्रेट फोटोग्राफी संग्रह",
    description:
      "प्रामाणिक भावनाओं, पिंक सिटी हेरिटेज और प्राकृतिक प्रकाश में खींचे गए संपादकीय, फाइन-आर्ट और व्यक्तिगत ब्रांडिंग पोर्ट्रेट देखें।",
  },
  weddings: {
    name: "वेडिंग फोटोग्राफी",
    title: "वेडिंग फोटोग्राफी संग्रह",
    description:
      "राजस्थान भर में सच्ची प्रेम कहानियों, महल के फेरों और उत्सव के पलों को सहेजने वाली कालातीत डॉक्यूमेंट्री शाही विवाह फोटोग्राफी।",
  },
  events: {
    name: "इवेंट फोटोग्राफी",
    title: "इवेंट एवं गाला फोटोग्राफी संग्रह",
    description:
      "सांस्कृतिक उत्सवों, जयपुर साहित्य शिखर सम्मेलन, कॉर्पोरेट सम्मेलनों और निजी शाही महल समारोहों का व्यापक विजुअल डॉक्यूमेंटेशन।",
  },
  sports: {
    name: "स्पोर्ट्स फोटोग्राफी",
    title: "स्पोर्ट्स एवं एथलेटिक फोटोग्राफी संग्रह",
    description:
      "क्षणिक एथलेटिक तीव्रता, क्रिकेट टूर्नामेंट, पोलो मैच और चैंपियनशिप जीत के पलों को कैद करने वाली हाई-स्पीड एक्शन फोटोग्राफी।",
  },
  "nature-wildlife": {
    name: "नेचर एवं वन्यजीव",
    title: "नेचर एवं वन्यजीव फोटोग्राफी संग्रह",
    description:
      "रणथंभौर के बाघों और भारत के प्राकृतिक अभयारण्यों की भव्यता को संरक्षित करने वाले फाइन-आर्ट वन्यजीव लैंडस्केप्स।",
  },
  travel: {
    name: "ट्रैवल फोटोग्राफी",
    title: "ट्रैवल एवं हेरिटेज फोटोग्राफी संग्रह",
    description:
      "वास्तुकला विरासत, हवा महल, आमेर किला और भारत के पवित्र सांस्कृतिक चमत्कारों को दर्शाने वाले अभियान विजुअल निबंध।",
  },
};

export const ALL_PORTFOLIO_ITEMS_HINDI: Record<string, Partial<DetailedPortfolioItem>> = {
  "port-1": {
    title: "शाही हेरिटेज पोर्ट्रेट",
    category: "पोर्ट्रेट फोटोग्राफी",
    location: "आमेर किला, जयपुर",
    client: "संपादकीय पोर्टफोलियो",
    description:
      "ऐतिहासिक पत्थरों की बनावट के बीच प्राकृतिक गर्म परावर्तन और शांत, विचारशील अभिव्यक्ति पर जोर देने वाला एक अंतरंग संपादकीय पोर्ट्रेट।",
  },
  "port-2": {
    title: "मोनोक्रोम स्टूडियो रूपरेखा",
    category: "पोर्ट्रेट फोटोग्राफी",
    location: "स्टूडियो 215, श्री किशनपुरा, जयपुर",
    client: "एग्जीक्यूटिव ब्रांडिंग",
    description:
      "हमारे जयपुर स्टूडियो में प्रामाणिक व्यक्तित्व, मूर्तिकला जैसी बनावट और शांत आत्मविश्वास को कैद करने वाली हाई-कंट्रास्ट स्टूडियो लाइटिंग।",
  },
  "port-3": {
    title: "पत्रिका गेट विहंगम पोर्ट्रेट",
    category: "पोर्ट्रेट फोटोग्राफी",
    location: "पत्रिका गेट, जयपुर",
    client: "फाइन आर्ट सीरीज",
    description:
      "जयपुर के प्रतिष्ठित जीवंत स्थापत्य रूपांकनों के साथ सामंजस्य बिठाने वाला एक कालातीत, चित्रकारी जैसा पोर्ट्रेट।",
  },
  "wed-1": {
    title: "शाही महल फेरे एवं वचन",
    category: "वेडिंग फोटोग्राफी",
    location: "सिटी पैलेस, जयपुर",
    client: "निजी वैवाहिक युगल",
    description:
      "ऐतिहासिक नक्काशीदार पत्थर के मेहराबों, गेंदे के फूलों और महल की रोशनी के बीच सुनहरी शाम के भावुक फेरे।",
  },
  "wed-2": {
    title: "हेरिटेज ब्राइडल वैभव",
    category: "वेडिंग फोटोग्राफी",
    location: "जगमंदिर आइलैंड पैलेस, उदयपुर",
    client: "डेस्टिनेशन वेडिंग युगल",
    description:
      "राजस्थान में एक शांत महल की छत पर शाम की हल्की झील की हवा में लहराती हाथ से बनी जरदोजी कढ़ाई।",
  },
  "wed-3": {
    title: "हवेली प्रांगण में पहला नृत्य",
    category: "वेडिंग फोटोग्राफी",
    location: "समोद पैलेस, जयपुर",
    client: "हेरिटेज पैलेस युगल",
    description:
      "झिलमिलाती फेयरी लाइट्स और तारों भरे राजस्थानी आसमान के नीचे सहज आनंद और उत्सव।",
  },
  "eve-1": {
    title: "जयपुर सांस्कृतिक साहित्य उत्सव",
    category: "इवेंट फोटोग्राफी",
    location: "डिग्गी पैलेस, जयपुर",
    client: "साहित्य एवं कला फाउंडेशन",
    description:
      "जयपुर में विचारशील साहित्यिक संवाद और शाम के बौद्धिक आदान-प्रदान का शानदार माहौल।",
  },
  "eve-2": {
    title: "विरासत महल प्रांगण रात्रिभोज",
    category: "इवेंट फोटोग्राफी",
    location: "रामबाग पैलेस, जयपुर",
    client: "लक्जरी लाइफस्टाइल गाला",
    description:
      "गुलाबी बलुआ पत्थर के प्रांगण में मोमबत्ती की रोशनी और लाइव राजस्थानी लोक वाद्यों के बीच सजावट।",
  },
  "eve-3": {
    title: "आधुनिक कॉर्पोरेट की-नोट सम्मेलन",
    category: "इवेंट फोटोग्राफी",
    location: "जेईसीसी कन्वेंशन सेंटर, जयपुर",
    client: "टेक लीडरशिप समिट",
    description:
      "गतिशील प्रकाश व्यवस्था के साथ राष्ट्रीय सम्मेलन में मुख्य वक्ता का प्रभावी भाषण।",
  },
  "spo-1": {
    title: "क्रिकेट चैंपियनशिप कवर ड्राइव",
    category: "स्पोर्ट्स फोटोग्राफी",
    location: "सवाई मानसिंह स्टेडियम, जयपुर",
    client: "प्रीमियर लीग कवरेज",
    description:
      "फ्लडलाइट्स के नीचे क्रिकेट मैच के अंतिम क्षणों में बल्लेबाज का शक्तिशाली शॉट।",
  },
  "spo-2": {
    title: "पोलो मैच गति और मैदान",
    category: "स्पोर्ट्स फोटोग्राफी",
    location: "राजस्थान पोलो क्लब, जयपुर",
    client: "शाही पोलो कप",
    description:
      "तीव्र गति से दौड़ते घोड़े और निर्णायक गोल की ओर बढ़ती गेंद।",
  },
  "spo-3": {
    title: "जयपुर मैराथन विजय स्प्रिंट",
    category: "स्पोर्ट्स फोटोग्राफी",
    location: "राम निवास बाग, जयपुर",
    client: "एथलेटिक एसोसिएशन",
    description:
      "सुबह की ठंडी हवा में अल्बर्ट हॉल के सामने फिनिश लाइन पार करते धावक की ऊर्जा।",
  },
  "nat-1": {
    title: "रणथंभौर का रॉयल बंगाल टाइगर",
    category: "नेचर एवं वन्यजीव",
    location: "रणथंभौर राष्ट्रीय उद्यान, सवाई माधोपुर",
    client: "वन्यजीव संरक्षण प्रोजेक्ट",
    description:
      "प्राचीन बरगद के पेड़ों के नीचे घने जंगल में शांतिपूर्वक विचरण करता राजसी बंगाल टाइगर।",
  },
  "nat-2": {
    title: "सरिस्का वन्यजीव छतरी",
    category: "नेचर एवं वन्यजीव",
    location: "सरिस्का टाइगर रिजर्व, अलवर",
    client: "भारतीय पर्यावरण ट्रस्ट",
    description:
      "अरावली पर्वत श्रृंखला के घने जंगल में सुबह के कोहरे से छनती सूरज की पहली किरणें।",
  },
  "nat-3": {
    title: "सूर्यास्त पर थार मरुस्थल के सुनहरे टीले",
    category: "नेचर एवं वन्यजीव",
    location: "सैम सैंड ड्यून्स, जैसलमेर",
    client: "वाइल्डरनेस हेरिटेज प्रोजेक्ट",
    description:
      "शाम की हवाओं के साथ थार रेगिस्तान के अंतहीन सुनहरे रेत के टीलों पर ढलते सूरज की छाया।",
  },
  "tra-1": {
    title: "हवा महल पैलेस ऑफ विंड्स",
    category: "ट्रैवल फोटोग्राफी",
    location: "बड़ी चौपड़, पिंक सिटी, जयपुर",
    client: "अतुल्य भारत हेरिटेज सीरीज",
    description:
      "सुबह की सुनहरी धूप में चमकती हवा महल की 953 खिड़कियां, जो गुलाबी शहर की आत्मा को दर्शाती हैं।",
  },
  "tra-2": {
    title: "आमेर किला और मावठा झील",
    category: "ट्रैवल फोटोग्राफी",
    location: "आमेर किला, जयपुर, राजस्थान",
    client: "स्थापत्य विरासत फीचर",
    description:
      "सूर्योदय के समय मावठा झील के शांत पानी पर चमकती 16वीं सदी की विशाल प्राचीर और सुनहरे बलुआ पत्थर के बुर्ज।",
  },
};

export function getLocalizedPortfolioCategory(
  cat: PortfolioCategoryMeta,
  language: "en" | "hi"
): PortfolioCategoryMeta {
  if (language !== "hi") return cat;
  const hi = PORTFOLIO_CATEGORIES_META_HINDI[cat.slug];
  if (!hi) return cat;

  return {
    ...cat,
    name: hi.name || cat.name,
    title: hi.title || cat.title,
    description: hi.description || cat.description,
  };
}

export function getLocalizedPortfolioCategories(
  language: "en" | "hi"
): PortfolioCategoryMeta[] {
  return PORTFOLIO_CATEGORIES_META.map((cat) =>
    getLocalizedPortfolioCategory(cat, language)
  );
}

export function getLocalizedDetailedPortfolioItem(
  item: DetailedPortfolioItem,
  language: "en" | "hi"
): DetailedPortfolioItem {
  if (language !== "hi") return item;
  const hi = ALL_PORTFOLIO_ITEMS_HINDI[item.id];
  if (!hi) return item;

  return {
    ...item,
    title: hi.title || item.title,
    category: hi.category || item.category,
    location: hi.location || item.location,
    client: hi.client || item.client,
    description: hi.description || item.description,
  };
}

export function getLocalizedDetailedPortfolioItems(
  items: DetailedPortfolioItem[],
  language: "en" | "hi"
): DetailedPortfolioItem[] {
  return items.map((item) => getLocalizedDetailedPortfolioItem(item, language));
}
