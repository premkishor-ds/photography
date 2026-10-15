import { siteConfig } from "@/config/siteConfig";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  modifiedDate: string;
  author: string;
  authorRole: string;
  readTime: string;
  category: "Portrait Tips" | "Wedding Guides" | "Commercial & Brand" | "Action & Technique";
  heroImage: string;
  heroAlt: string;
  content: {
    sectionTitle?: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  relatedServiceSlug: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-to-wear-for-a-portrait-photoshoot",
    title: "What to Wear for a Portrait Photoshoot: Stylist Guide",
    excerpt:
      "Essential wardrobe advice, flattering color palettes, and texture combinations to ensure your portraits look timeless, authentic, and effortlessly elegant.",
    publishedDate: "2026-02-14",
    modifiedDate: "2026-03-01",
    author: siteConfig.photographer.name,
    authorRole: siteConfig.photographer.role,
    readTime: "5 min read",
    category: "Portrait Tips",
    heroImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Portrait photoshoot model wearing neutral tones with soft natural lighting",
    relatedServiceSlug: "portrait-photography",
    content: [
      {
        sectionTitle: "Prioritize Timeless Neutral Palettes",
        paragraphs: [
          "When selecting outfits for an editorial or executive portrait session, your clothing should frame and elevate your personality rather than distract from it.",
          "Warm beige, soft cream, charcoal, deep navy, olive, and terracotta work harmoniously across both indoor studio backdrops and outdoor natural light settings.",
        ],
        bulletPoints: [
          "Avoid dense, small-patterned moiré fabrics like tight micro-stripes or houndstooth.",
          "Limit prominent brand logos or loud graphic typography.",
          "Choose solid colors or subtle natural woven textures like linen, wool, and silk.",
        ],
      },
      {
        sectionTitle: "Layering Adds Visual Depth and Form",
        paragraphs: [
          "Layering structured garments—such as an unstructured blazer over a soft knit sweater or a tailored wool trench coat—instantly introduces silhouette definition and dimensional shadow.",
          "Bring 2 to 3 distinct outfits to your session: one classic formal option, one polished smart-casual look, and one expressive creative choice.",
        ],
      },
      {
        sectionTitle: "Comfort Translates Directly to Confidence",
        paragraphs: [
          "Above all rules of color theory, wearing clothing in which you feel completely comfortable and physically at ease is paramount.",
          "If an outfit feels restrictive or requires constant readjustment, that tension will reflect in your posture. Prioritize well-fitted garments that allow natural movement.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-wedding-photographer",
    title: "How to Choose the Right Wedding Photographer",
    excerpt:
      "From documentary storytelling versus posed editorial styles to second shooters and backup workflows, here is how to find your ideal wedding visual storyteller.",
    publishedDate: "2026-01-20",
    modifiedDate: "2026-02-28",
    author: siteConfig.photographer.name,
    authorRole: siteConfig.photographer.role,
    readTime: "6 min read",
    category: "Wedding Guides",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Newlywed couple enjoying outdoor golden hour ceremony sunset",
    relatedServiceSlug: "wedding-photography",
    content: [
      {
        sectionTitle: "Understanding Photography Philosophies",
        paragraphs: [
          "Wedding photography spans multiple distinct approaches: traditional posed photography, high-fashion editorial directing, and genuine candid documentary storytelling.",
          "Decide whether you want a photographer who directs every pose throughout the day or an artist who blends unobtrusively into the crowd, capturing emotional interactions as they organically occur.",
        ],
      },
      {
        sectionTitle: "Always Request Full Wedding Gallery Delivery Samples",
        paragraphs: [
          "Instagram feeds and website portfolios showcase the top 1% of a photographer's finest frames. To evaluate consistency, ask to view 1 or 2 full wedding galleries from start to finish.",
          "Review how the photographer handles unpredictable lighting: dim reception halls, bright noon ceremonies, candlelit speeches, and late-night dance floors.",
        ],
      },
      {
        sectionTitle: "Key Inquiries to Ask Before Signing",
        paragraphs: [
          "Clear communication upfront prevents surprises on your celebration day. Ensure your agreement covers essential technical and logistical safeguards.",
        ],
        bulletPoints: [
          "Do you shoot with dual memory card slots for instant in-camera redundancy?",
          "What is your emergency backup plan if you fall ill on the wedding date?",
          "How many hours of coverage are included, and what is the overtime rate?",
          "Is a second photographer included for comprehensive ceremony angles?",
        ],
      },
    ],
  },
  {
    slug: "understanding-commercial-photography-licensing",
    title: "Commercial Photography Licensing: Brand Guide",
    excerpt:
      "A clear breakdown of commercial usage rights, buyout contracts, digital advertising permissions, and why proper licensing protects your brand investment.",
    publishedDate: "2026-02-02",
    modifiedDate: "2026-03-05",
    author: siteConfig.photographer.name,
    authorRole: siteConfig.photographer.role,
    readTime: "7 min read",
    category: "Commercial & Brand",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Luxury designer boutique architectural display with commercial illumination",
    relatedServiceSlug: "commercial-photography",
    content: [
      {
        sectionTitle: "Copyright Ownership vs. Usage Licensing",
        paragraphs: [
          "In professional commercial photography, the creator retains intellectual property copyright, while the client receives a structured license outlining exact permissions.",
          "Understanding this distinction ensures your marketing campaigns remain legally sound across digital advertising, print publications, and global billboard distributions.",
        ],
      },
      {
        sectionTitle: "Core Parameters of Commercial Licenses",
        paragraphs: [
          "Every commercial estimate is calculated based on production complexity and the scale of the intended audience reach.",
        ],
        bulletPoints: [
          "Media channels: digital web, paid social ads, print editorial, point-of-sale retail, or out-of-home billboards.",
          "Geographic scope: regional, national, or worldwide distribution.",
          "Duration: term-limited (e.g., 1–3 years) or perpetual rights.",
          "Exclusivity: exclusive rights preventing the imagery from being licensed elsewhere.",
        ],
      },
    ],
  },
  {
    slug: "capturing-high-speed-sports-action-techniques",
    title: "High-Speed Sports Photography Techniques",
    excerpt:
      "How professional sports photographers utilize telephoto compression, predictive autofocus tracking, and high shutter speeds to capture raw athletic drama.",
    publishedDate: "2026-02-25",
    modifiedDate: "2026-03-08",
    author: siteConfig.photographer.name,
    authorRole: siteConfig.photographer.role,
    readTime: "5 min read",
    category: "Action & Technique",
    heroImage:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",
    heroAlt: "Sprinter accelerating forward on a stadium track",
    relatedServiceSlug: "sports-photography",
    content: [
      {
        sectionTitle: "Mastering Shutter Speeds Above 1/2000s",
        paragraphs: [
          "Freezing the blur of a baseball pitch, a water droplet off a surfer's board, or the flight of a runner requires shutter speeds reaching 1/2000s to 1/4000s.",
          "Balancing these ultra-fast shutters requires large-aperture lenses (such as 70-200mm f/2.8 or 400mm f/2.8) and clean high-ISO performance from professional sensor bodies.",
        ],
      },
      {
        sectionTitle: "Anticipation Over Reaction",
        paragraphs: [
          "If you press the shutter button when you see the play happen, you have already missed it. Sports photography demands thorough knowledge of player tendencies and game dynamics.",
          "By tracking the athlete's eyes and predicting where the ball or stride will land next, photographers lock focus on the split-second before peak impact.",
        ],
      },
      {
        sectionTitle: "Recommended Field Equipment Setup",
        paragraphs: [
          "For stadium and track action, we rely on high-speed mirrorless autofocus bodies paired with internal zoom telephoto glass to maintain balance and rapid tracking.",
          "Read our detailed field review of the Sony FE 200–600mm F5.6–6.3 G OSS lens and the Sony A7V camera body in our dedicated Photography Gear section.",
        ],
        bulletPoints: [
          "Camera body analysis: Sony A7V Real-Time Tracking Review",
          "Super-telephoto glass: Sony FE 200–600mm G OSS Field Test",
        ],
      },
    ],
  },
];

export const BLOG_POSTS_HINDI: Record<string, Partial<BlogPost>> = {
  "what-to-wear-for-a-portrait-photoshoot": {
    title: "पोर्ट्रेट फोटोशूट के लिए क्या पहनें: स्टाइलिस्ट गाइड",
    excerpt:
      "सटीक परिधान सलाह, आकर्षक रंग पैलेट और बनावट संयोजन ताकि आपके पोर्ट्रेट कालातीत, प्रामाणिक और सुरुचिपूर्ण दिखें।",
    readTime: "5 मिनट पढ़ें",
    category: "Portrait Tips",
    content: [
      {
        sectionTitle: "सदाबहार न्यूट्रल रंगों को प्राथमिकता दें",
        paragraphs: [
          "संपादकीय या कार्यकारी पोर्ट्रेट सत्र के लिए परिधान चुनते समय, आपके कपड़े आपके व्यक्तित्व को उभारने चाहिए, न कि ध्यान भटकाने वाले हों।",
          "वार्म बेज, सॉफ्ट क्रीम, चारकोल, नेवी ब्लू, ऑलिव और टेराकोटा इनडोर स्टूडियो और आउटडोर प्राकृतिक प्रकाश दोनों स्थानों पर बेहतरीन सामंजस्य बिठाते हैं।",
        ],
        bulletPoints: [
          "महीन धारियों या घने पैटर्न वाले कपड़ों से बचें जो कैमरे में मोइरे प्रभाव पैदा करते हैं।",
          "बड़े ब्रांड लोगो या लाउड ग्राफिक्स वाले परिधान न पहनें।",
          "ठोस रंग या प्राकृतिक बुनावट जैसे लिनन, ऊन और रेशम चुनें।",
        ],
      },
      {
        sectionTitle: "लेयरिंग से गहराई और स्वरूप मिलता है",
        paragraphs: [
          "सॉफ्ट बुने हुए स्वेटर पर अनस्ट्रक्चर्ड ब्लेज़र या ट्रेंच कोट पहनने से तुरंत एक प्रभावशाली सिल्हूट और त्रि-आयामी गहराई मिलती है।",
          "अपने सत्र के लिए 2 से 3 अलग-अलग परिधान लाएँ: एक क्लासिक औपचारिक विकल्प, एक स्मार्ट-कैजुअल लुक और एक रचनात्मक व्यक्तिगत पसंद।",
        ],
      },
      {
        sectionTitle: "सहजता ही आत्मविश्वास का प्रतीक है",
        paragraphs: [
          "रंग सिद्धांत के सभी नियमों से ऊपर, ऐसे कपड़े पहनना सबसे महत्वपूर्ण है जिनमें आप पूरी तरह से आरामदायक और सहज महसूस करें।",
          "यदि कोई पोशाक असुविधाजनक लगती है या बार-बार ठीक करने की आवश्यकता होती है, तो वह तनाव आपकी मुद्रा में दिखाई देगा। प्राकृतिक गति की अनुमति देने वाले सुव्यवस्थित परिधानों को प्राथमिकता दें।",
        ],
      },
    ],
  },
  "how-to-choose-a-wedding-photographer": {
    title: "सही वेडिंग फोटोग्राफर का चयन कैसे करें",
    excerpt:
      "डॉक्यूमेंट्री बनाम पोज्ड स्टाइल से लेकर द्वितीय फोटोग्राफर और बैकअप वर्कफ़्लो तक, जानिए अपने सपनों की शादी के लिए सही विजुअल स्टोरीटेलर कैसे चुनें।",
    readTime: "6 मिनट पढ़ें",
    category: "Wedding Guides",
    content: [
      {
        sectionTitle: "फोटोग्राफी दर्शन को समझें",
        paragraphs: [
          "वेडिंग फोटोग्राफी में कई अलग-अलग दृष्टिकोण शामिल हैं: पारंपरिक पोज्ड फोटोग्राफी, हाई-फैशन संपादकीय निर्देशन, और प्रामाणिक कैंडिड डॉक्यूमेंट्री स्टोरीटेलिंग।",
          "यह तय करें कि आप ऐसा फोटोग्राफर चाहते हैं जो दिन भर हर मुद्रा को निर्देशित करे या एक ऐसा कलाकार जो भीड़ में घुल-मिलकर प्राकृतिक भावनाओं को बिना रोके रिकॉर्ड करे।",
        ],
      },
      {
        sectionTitle: "हमेशा पूरी वेडिंग गैलरी के नमूने मांगें",
        paragraphs: [
          "इंस्टाग्राम फीड और वेबसाइट पोर्टफोलियो केवल सर्वश्रेष्ठ 1% तस्वीरों को दिखाते हैं। स्थिरता का मूल्यांकन करने के लिए शुरू से अंत तक 1 या 2 पूरी शादी की गैलरी देखने का अनुरोध करें।",
          "देखें कि फोटोग्राफर विभिन्न रोशनी की स्थितियों को कैसे संभालता है: मंद रिसेप्शन हॉल, दोपहर की तेज धूप, मोमबत्ती की रोशनी में भाषण और देर रात के डांस फ्लोर।",
        ],
      },
      {
        sectionTitle: "हस्ताक्षर करने से पहले पूछने योग्य मुख्य प्रश्न",
        paragraphs: [
          "शुरुआत में स्पष्ट संवाद शादी के दिन किसी भी अप्रत्याशित परेशानी से बचाता है। सुनिश्चित करें कि आपका समझौता आवश्यक तकनीकी और प्रबंधकीय सुरक्षा को कवर करता है।",
        ],
        bulletPoints: [
          "क्या आप इन-कैमरा बैकअप के लिए डुअल मेमोरी कार्ड स्लॉट के साथ शूट करते हैं?",
          "यदि आप शादी की तारीख पर अस्वस्थ हो जाते हैं तो आपकी आपातकालीन बैकअप योजना क्या है?",
          "कवरेज के कितने घंटे शामिल हैं, और ओवरटाइम शुल्क क्या है?",
          "क्या समारोह के विभिन्न कोणों के लिए दूसरा फोटोग्राफर शामिल है?",
        ],
      },
    ],
  },
  "understanding-commercial-photography-licensing": {
    title: "कमर्शियल फोटोग्राफी लाइसेंसिंग: ब्रांड गाइड",
    excerpt:
      "व्यावसायिक उपयोग अधिकारों, बायआउट समझौतों, डिजिटल विज्ञापन अनुमतियों और उचित लाइसेंसिंग द्वारा ब्रांड निवेश की सुरक्षा का स्पष्ट विवरण।",
    readTime: "7 मिनट पढ़ें",
    category: "Commercial & Brand",
    content: [
      {
        sectionTitle: "कॉपीराइट स्वामित्व बनाम उपयोग लाइसेंसिंग",
        paragraphs: [
          "पेशेवर कमर्शियल फोटोग्राफी में, निर्माता बौद्धिक संपदा कॉपीराइट बरकरार रखता है, जबकि क्लाइंट को सटीक अनुमतियों को रेखांकित करने वाला लाइसेंस प्राप्त होता है।",
          "इस अंतर को समझने से यह सुनिश्चित होता है कि आपके मार्केटिंग अभियान डिजिटल विज्ञापनों, प्रिंट प्रकाशनों और वैश्विक बिलबोर्ड वितरणों में कानूनी रूप से सुरक्षित रहें।",
        ],
      },
      {
        sectionTitle: "व्यावसायिक लाइसेंस के मुख्य मानदंड",
        paragraphs: [
          "प्रत्येक कमर्शियल अनुमान प्रोडक्शन की जटिलता और इच्छित दर्शक वर्ग के पैमाने के आधार पर तैयार किया जाता है।",
        ],
        bulletPoints: [
          "मीडिया चैनल: डिजिटल वेब, पेड सोशल विज्ञापन, प्रिंट मीडिया, रिटेल या आउटडोर होर्डिंग्स।",
          "भौगोलिक दायरा: क्षेत्रीय, राष्ट्रीय, या विश्वव्यापी वितरण।",
          "अवधि: सीमित अवधि (जैसे 1–3 वर्ष) या शाश्वत अधिकार।",
          "विशिष्टता: विशिष्ट अधिकार जो तस्वीरों को कहीं और लाइसेंस होने से रोकते हैं।",
        ],
      },
    ],
  },
  "capturing-high-speed-sports-action-techniques": {
    title: "हाई-स्पीड स्पोर्ट्स फोटोग्राफी की तकनीकें",
    excerpt:
      "पेशेवर स्पोर्ट्स फोटोग्राफर कैसे टेलीफोटो कम्प्रेशन, प्रेडिक्टिव ऑटोफोकस ट्रैकिंग और तेज शटर स्पीड का उपयोग करके खेल के रोमांच को कैद करते हैं।",
    readTime: "5 मिनट पढ़ें",
    category: "Action & Technique",
    content: [
      {
        sectionTitle: "1/2000 सेकंड से अधिक शटर स्पीड पर महारत",
        paragraphs: [
          "क्रिकेट की गेंद, तेज गति से दौड़ते धावक या उछलते पानी की बूंदों को फ्रीज करने के लिए 1/2000s से 1/4000s तक की शटर स्पीड की आवश्यकता होती है।",
          "इस अल्ट्रा-फास्ट शटर को संतुलित करने के लिए बड़े अपर्चर वाले लेंस (जैसे 70-200mm f/2.8) और पेशेवर सेंसर से साफ हाई-आईएसओ प्रदर्शन आवश्यक है।",
        ],
      },
      {
        sectionTitle: "प्रतिक्रिया से अधिक पूर्व-अनुमान",
        paragraphs: [
          "यदि आप खेल की गतिविधि को देखने के बाद शटर बटन दबाते हैं, तो आप पहले ही पल चूक चुके होते हैं। स्पोर्ट्स फोटोग्राफी में खिलाड़ियों और खेल की गतिशीलता की गहरी समझ की आवश्यकता होती है।",
          "एथलीट की आंखों पर ध्यान केंद्रित करके और गेंद या कदम कहाँ गिरेंगे इसका अनुमान लगाकर, फोटोग्राफर प्रभाव के ठीक एक क्षण पहले फोकस लॉक करते हैं।",
        ],
      },
      {
        sectionTitle: "अनुशंसित फील्ड उपकरण सेटअप",
        paragraphs: [
          "स्टेडियम और ट्रैक एक्शन के लिए, हम संतुलन और त्वरित ट्रैकिंग बनाए रखने के लिए आंतरिक ज़ूम टेलीफोटो लेंस के साथ हाई-स्पीड मिररलेस ऑटोफोकस बॉडी पर भरोसा करते हैं।",
          "हमारे समर्पित फोटोग्राफी गियर अनुभाग में Sony FE 200–600mm F5.6–6.3 G OSS लेंस और Sony A7V कैमरा बॉडी की विस्तृत समीक्षा पढ़ें।",
        ],
        bulletPoints: [
          "कैमरा बॉडी विश्लेषण: Sony A7V रियल-टाइम ट्रैकिंग समीक्षा",
          "सुपर-टेलीफोटो लेंस: Sony FE 200–600mm G OSS फील्ड टेस्ट",
        ],
      },
    ],
  },
};

export function getLocalizedBlogPost(
  post: BlogPost,
  language: "en" | "hi"
): BlogPost {
  if (language !== "hi") return post;
  const hi = BLOG_POSTS_HINDI[post.slug];
  if (!hi) return post;

  return {
    ...post,
    title: hi.title || post.title,
    excerpt: hi.excerpt || post.excerpt,
    readTime: hi.readTime || post.readTime,
    content: hi.content || post.content,
  };
}

export function getLocalizedBlogPosts(
  posts: BlogPost[],
  language: "en" | "hi"
): BlogPost[] {
  return posts.map((post) => getLocalizedBlogPost(post, language));
}
