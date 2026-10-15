"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.portfolio": "Portfolio",
    "nav.services": "Services",
    "nav.gear": "Gear",
    "nav.about": "About",
    "nav.journal": "Journal",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.book": "Book a Session",
    "nav.locations": "Locations & Studios",
    "nav.portal": "Client Access",
    "nav.proofing": "Client Proofing Portal",
    "nav.comparisons": "Gear Comparisons",
    "nav.admin": "Studio Admin",

    // Hero
    "hero.pill": "Fine Art • Portraiture • Weddings • Sports • Expeditions",
    "hero.title1": "Capturing Moments,",
    "hero.title2": "Creating Memories",
    "hero.desc": "Professional photography for life's most meaningful moments across Jaipur, Rajasthan, and India.",
    "hero.cta.portfolio": "View Portfolio",
    "hero.cta.book": "Book a Session",
    "hero.stat.years": "10+ Years",
    "hero.stat.yearsLabel": "Experience",
    "hero.stat.sessions": "600+ Sessions",
    "hero.stat.sessionsLabel": "Completed",
    "hero.stat.worldwide": "Pan-India",
    "hero.stat.worldwideLabel": "Available",
    "hero.stat.curated": "100% Curated",
    "hero.stat.curatedLabel": "Artistic Vision",
    "hero.scroll": "Scroll",

    // Portfolio
    "portfolio.badge": "Curated Archive",
    "portfolio.title": "Featured Portfolios",
    "portfolio.desc": "Explore selected works across editorial portraits, royal Rajasthan weddings, high-speed sports, and natural landscapes.",
    "portfolio.all": "All",
    "portfolio.portraits": "Portraits",
    "portfolio.weddings": "Weddings",
    "portfolio.events": "Events",
    "portfolio.sports": "Sports",
    "portfolio.nature": "Nature & Wildlife",
    "portfolio.travel": "Travel & Heritage",
    "portfolio.viewMore": "View Full Portfolio",

    // Services
    "services.badge": "Bespoke Offerings",
    "services.title": "Photography Services",
    "services.desc": "Meticulously crafted photography experiences tailored to fine-art portraits, royal destination weddings, corporate galas, and brand campaigns.",
    "services.startingAt": "Starting from",
    "services.viewDetails": "View Service Details",
    "services.allServices": "View All Services",

    // Contact
    "contact.badge": "Inquire & Reserve",
    "contact.title": "Let's Capture Your Story.",
    "contact.desc": "Whether you are planning an intimate wedding, commissioning commercial campaigns, or documenting life milestones, we would love to hear from you.",
    "contact.studioTitle": "Studio & Booking Inquiries",
    "contact.studioDesc": "We accept a limited number of commissions each year to give every client our undivided artistic dedication. Reach out below or message us directly via WhatsApp.",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.location": "Studio Location",
    "contact.hours": "Studio Hours",
    "contact.whatsappBtn": "Chat Directly on WhatsApp",
    "contact.whatsappResponse": "Quick responses typically within 1-2 hours during business hours.",
    "contact.formTitle": "Session Booking Form",
    "contact.formSubtitle": "Fill out the form below to secure your date or request a personalized consultation.",
    "contact.form.name": "Your Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.service": "Photography Service",
    "contact.form.selectService": "Select a service category",
    "contact.form.customProject": "Custom Project / Other",
    "contact.form.date": "Preferred Date",
    "contact.form.message": "Message / Project Details",
    "contact.form.messagePlaceholder": "Tell us about your event, location, creative vision, or any special requests...",
    "contact.form.submit": "Submit Booking Request",
    "contact.form.submitting": "Sending inquiry...",
    "contact.form.submitVerified": "Confirm Booking (Verified)",
    "contact.form.submitWithOtp": "Verify Email & Submit Booking",
    "contact.form.privacyNote": "We treat your details with absolute privacy. No spam guaranteed.",
    "contact.form.thankYou": "Thank You",
    "contact.form.received": "Your inquiry for {service} has been received. Our studio team will review your preferred date ({date}) and reply to {email} within 24 hours.",
    "contact.form.followUp": "Follow up on WhatsApp",
    "contact.form.sendAnother": "Send Another Message",
    "contact.mapHeader": "Studio Google Map & Location",

    // Retouching & Post-Processing
    "retouch.badge": "Artistic Mastery & Post-Processing",
    "retouch.title": "The Craft Behind Every Frame",
    "retouch.desc": "Photography doesn't end with the shutter click. Explore the meticulous color grading, dynamic range balancing, and fine-art skin retouching applied to every delivered photograph.",

    // Client Proofing
    "proofing.title": "Private Client Proofing Gallery",
    "proofing.desc": "Enter your studio access key to view your private shoot proofs, mark favorite selects for luxury album print design, and leave retouching notes.",

    // Testimonials
    "testimonials.badge": "Client Words & Recognition",
    "testimonials.title": "Stories Entrusted to Our Lens",
    "testimonials.desc": "Over a decade of documenting royal celebrations, artistic milestones, and intimate family legacies across Rajasthan and worldwide.",

    // About
    "about.badge": "Behind The Lens",
    "about.title": "Meet The Photographer",
    "about.cta": "Let's Work Together",

    // Banner CTA
    "cta.badge": "Inquire & Reserve",
    "cta.book": "Book a Consultation",
    "cta.whatsapp": "Chat on WhatsApp",

    // Footer
    "footer.tagline": "Capturing moments, creating memories. Timeless visual storytelling dedicated to fine-art portraits, royal Rajasthan weddings, authentic events, sports, and commercial commissions.",
    "footer.subtagline": "Fine Art & Editorial Studio • Jaipur, Rajasthan",
    "footer.navTitle": "Navigation",
    "footer.servicesTitle": "Services",
    "footer.studioTitle": "Studio Details",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "footer.backToTop": "Back to Top",
    "footer.lang": "Language / भाषा:",
    // Gear Hub & Reviews
    "gear.badge": "Equipment & Optics Inventory",
    "gear.title": "My Photography Gear",
    "gear.desc": "Explore the cameras, lenses, audio equipment, and accessories I use for wildlife, sports, portraits, travel, and video creation.",
    "gear.disclaimer": "Every equipment record clearly distinguishes verified manufacturer specifications from personal field applications. Unknown or unverified technical parameters are intentionally preserved as unconfirmed without fabrication.",
    "gear.jumpTo": "Jump to:",
    "gear.comparisons": "Comparisons",
    "gear.categoryPrefix": "Category",
    "gear.sideBySide": "Side-by-Side Analysis",
    "gear.compTitle": "Equipment Comparisons",
    "gear.compDesc": "Objective technical comparisons exploring real-world trade-offs, weight profiles, and optics decisions in the field.",
    "gear.faceOff": "Technical Face-Off",
    "gear.readComp": "Read Field Comparison",
    "gear.card.primaryUses": "Primary Use Cases",
    "gear.card.compatibility": "Compatibility & System",
    "gear.card.viewSpecs": "View Detailed Specs & Field Review",
    "gear.card.verified": "Verified Equipment Record",
    "gear.card.relevantWork": "Relevant Work:",
    "gear.card.pendingImage": "Image Pending Verification",
    "gear.card.pendingReview": "Review undergoing field verification",
    "gear.review.overviewTitle": "Product Overview & Intended Use",
    "gear.review.compatibilityTitle": "Compatibility & System Integration",
    "gear.review.excelsTitle": "Where This Equipment Excels",
    "gear.review.workflowTitle": "How I Use It in My Workflow",
    "gear.review.advantagesTitle": "Advantages & Operational Considerations",
    "gear.review.keyAdvantages": "Key Advantages",
    "gear.review.considerations": "Considerations",
    "gear.review.alternativesTitle": "Equipment Alternatives",
    "gear.review.faqTitle": "Frequently Asked Questions",
    "gear.review.specsTitle": "Technical Specifications",
    "gear.review.inPortfolio": "Demonstrated in Portfolio",
    "gear.review.retailerTitle": "Retailer Availability",
    "gear.review.moreGear": "More Equipment in Studio Inventory",
    "gear.review.viewSpecs": "View Specs",

    // FAQ Page
    "faq.badge": "Common Questions",
    "faq.title": "Frequently Asked Questions",
    "faq.desc": "Clear answers regarding session bookings, pricing, image rights, turnaround timelines, and travel availability.",
    "faq.searchPlaceholder": "Search questions (e.g. turnaround, pricing, weather, attire)...",
    "faq.catAll": "All",
    "faq.catGeneral": "General",
    "faq.catPricing": "Booking & Pricing",
    "faq.catStyles": "Styles & Sessions",
    "faq.catDelivery": "Delivery & Rights",
    "faq.noMatch": "No matching questions found for",
    "faq.contactNote": "Have a specific question? Reach out to us directly and we will respond promptly.",
    "faq.askBtn": "Ask a Question",
  },
  hi: {
    // Nav
    "nav.home": "होम",
    "nav.portfolio": "पोर्टफोलियो",
    "nav.services": "सेवाएं",
    "nav.gear": "उपकरण",
    "nav.about": "हमारे बारे में",
    "nav.journal": "जर्नल",
    "nav.faq": "सामान्य प्रश्न",
    "nav.contact": "संपर्क करें",
    "nav.book": "सत्र बुक करें",
    "nav.locations": "स्टूडियो एवं लोकेशन",
    "nav.portal": "क्लाइंट एक्सेस",
    "nav.proofing": "क्लाइंट प्रूफिंग पोर्टल",
    "nav.comparisons": "उपकरण तुलना",
    "nav.admin": "स्टूडियो एडमिन",

    // Hero
    "hero.pill": "फाइन आर्ट • पोर्ट्रेट • विवाह • खेल • यात्रा",
    "hero.title1": "क्षणों को कैद करना,",
    "hero.title2": "यादें बनाना",
    "hero.desc": "जयपुर, राजस्थान और पूरे भारत में जीवन के सबसे अनमोल पलों के लिए पेशेवर फोटोग्राफी।",
    "hero.cta.portfolio": "पोर्टफोलियो देखें",
    "hero.cta.book": "सत्र बुक करें",
    "hero.stat.years": "10+ वर्ष",
    "hero.stat.yearsLabel": "अनुभव",
    "hero.stat.sessions": "600+ सत्र",
    "hero.stat.sessionsLabel": "संपन्न",
    "hero.stat.worldwide": "अखिल भारतीय",
    "hero.stat.worldwideLabel": "उपलब्ध",
    "hero.stat.curated": "100% क्यूरेटेड",
    "hero.stat.curatedLabel": "कलात्मक दृष्टिकोण",
    "hero.scroll": "नीचे देखें",

    // Portfolio
    "portfolio.badge": "क्यूरेटेड संग्रह",
    "portfolio.title": "प्रमुख पोर्टफोलियो",
    "portfolio.desc": "एडिटोरियल पोर्ट्रेट, शाही राजस्थान विवाह, तीव्र गति खेल, और प्राकृतिक दृश्यों के चुनिंदा कार्यों का अन्वेषण करें।",
    "portfolio.all": "सभी",
    "portfolio.portraits": "पोर्ट्रेट",
    "portfolio.weddings": "विवाह",
    "portfolio.events": "कार्यक्रम",
    "portfolio.sports": "खेल",
    "portfolio.nature": "प्रकृति एवं वन्यजीव",
    "portfolio.travel": "यात्रा एवं धरोहर",
    "portfolio.viewMore": "संपूर्ण पोर्टफोलियो देखें",

    // Services
    "services.badge": "विशिष्ट सेवाएं",
    "services.title": "फोटोग्राफी सेवाएं",
    "services.desc": "फाइन-आर्ट पोर्ट्रेट, शाही डेस्टिनेशन विवाह, कॉर्पोरेट गाला और ब्रांड अभियानों के लिए विशेष रूप से तैयार फोटोग्राफी अनुभव।",
    "services.startingAt": "शुरुआती दर",
    "services.viewDetails": "सेवा विवरण देखें",
    "services.allServices": "सभी सेवाएं देखें",

    // Contact
    "contact.badge": "पूछताछ एवं आरक्षण",
    "contact.title": "आइए आपकी कहानी को संजोएं।",
    "contact.desc": "चाहे आप शाही शादी की योजना बना रहे हों, कमर्शियल विज्ञापन अभियान हो या जीवन के विशेष पलों को संजोना हो, हम आपसे जुड़ना चाहेंगे।",
    "contact.studioTitle": "स्टूडियो एवं बुकिंग पूछताछ",
    "contact.studioDesc": "हम प्रत्येक ग्राहक को अद्वितीय कलात्मक समर्पण देने के लिए सीमित संख्या में सत्र स्वीकार करते हैं। नीचे संपर्क करें या व्हाट्सएप पर सीधा संदेश भेजें।",
    "contact.email": "ईमेल पता",
    "contact.phone": "फ़ोन नंबर",
    "contact.location": "स्टूडियो का पता",
    "contact.hours": "स्टूडियो कार्य समय",
    "contact.whatsappBtn": "व्हाट्सएप पर सीधे चैट करें",
    "contact.whatsappResponse": "कार्य समय के दौरान सामान्यतः 1-2 घंटे में त्वरित उत्तर।",
    "contact.formTitle": "सत्र बुकिंग फॉर्म",
    "contact.formSubtitle": "अपनी तिथि सुरक्षित करने या व्यक्तिगत परामर्श के लिए नीचे दिया गया फॉर्म भरें।",
    "contact.form.name": "आपका पूरा नाम",
    "contact.form.email": "ईमेल पता",
    "contact.form.phone": "फ़ोन नंबर",
    "contact.form.service": "फोटोग्राफी सेवा",
    "contact.form.selectService": "सेवा श्रेणी चुनें",
    "contact.form.customProject": "कस्टम प्रोजेक्ट / अन्य",
    "contact.form.date": "पसंदीदा तिथि",
    "contact.form.message": "संदेश / प्रोजेक्ट विवरण",
    "contact.form.messagePlaceholder": "अपने कार्यक्रम, स्थान, रचनात्मक दृष्टिकोण या विशेष अनुरोधों के बारे में बताएं...",
    "contact.form.submit": "बुकिंग अनुरोध भेजें",
    "contact.form.submitting": "भेजा जा रहा है...",
    "contact.form.submitVerified": "बुकिंग की पुष्टि करें (सत्यापित)",
    "contact.form.submitWithOtp": "ईमेल सत्यापित करें एवं बुकिंग भेजें",
    "contact.form.privacyNote": "हम आपके विवरण को पूर्ण गोपनीयता के साथ रखते हैं। स्पैम मुक्त गारंटी।",
    "contact.form.thankYou": "धन्यवाद",
    "contact.form.received": "आपकी पूछताछ प्राप्त हो गई है। हमारी स्टूडियो टीम आपकी पसंदीदा तिथि की समीक्षा करेगी और 24 घंटे के भीतर ईमेल पर जवाब देगी।",
    "contact.form.followUp": "व्हाट्सएप पर संपर्क जारी रखें",
    "contact.form.sendAnother": "एक और संदेश भेजें",
    "contact.mapHeader": "स्टूडियो गूगल मैप एवं लोकेशन",

    // Retouching & Post-Processing (हिन्दी)
    "retouch.badge": "कलात्मक महारत एवं पोस्ट-प्रोसेसिंग",
    "retouch.title": "हर फ्रेम के पीछे की शिल्पकला",
    "retouch.desc": "फोटोग्राफी केवल शटर दबाने पर समाप्त नहीं होती। हमारी सिग्नेचर नॉन-डिस्ट्रक्टिव कलर-ग्रेडिंग, फिल्म इम्यूलेशन और सूक्ष्म हाई-एंड स्किन रीटचिंग देखें।",

    // Client Proofing (हिन्दी)
    "proofing.title": "निजी क्लाइंट प्रूफिंग गैलरी",
    "proofing.desc": "अपने निजी शूट प्रूफ देखने, एल्बम प्रिंट डिजाइन के लिए पसंदीदा फोटो चुनने और रीटचिंग नोट्स छोड़ने के लिए अपनी एक्सेस की दर्ज करें।",

    // Testimonials (हिन्दी)
    "testimonials.badge": "ग्राहकों के विचार एवं सम्मान",
    "testimonials.title": "हमारे लेंस को सौंपी गई कहानियां",
    "testimonials.desc": "राजस्थान और दुनिया भर में शाही समारोहों, कलात्मक उपलब्धियों और आत्मीय पारिवारिक धरोहरों के दस्तावेजीकरण का एक दशक।",

    // About
    "about.badge": "लेंस के पीछे",
    "about.title": "फोटोग्राफर से मिलें",
    "about.cta": "आइए मिलकर काम करें",

    // Banner CTA
    "cta.badge": "पूछताछ एवं आरक्षण",
    "cta.book": "परामर्श बुक करें",
    "cta.whatsapp": "व्हाट्सएप पर चैट करें",

    // Footer
    "footer.tagline": "क्षणों को कैद करना, यादें बनाना। फाइन-आर्ट पोर्ट्रेट, शाही राजस्थान विवाह, प्रामाणिक कार्यक्रम, खेल और वाणिज्यिक फोटोग्राफी के लिए समर्पित कालातीत दृश्य कला।",
    "footer.subtagline": "फाइन आर्ट एवं एडिटोरियल स्टूडियो • जयपुर, राजस्थान",
    "footer.navTitle": "नेविगेशन",
    "footer.servicesTitle": "सेवाएं",
    "footer.studioTitle": "स्टूडियो विवरण",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.privacy": "गोपनीयता नीति",
    "footer.terms": "नियम एवं शर्तें",
    "footer.backToTop": "शीर्ष पर जाएं",
    "footer.lang": "भाषा / Language:",

    // Gear Hub & Reviews (हिन्दी)
    "gear.badge": "उपकरण एवं ऑप्टिक्स सूची",
    "gear.title": "मेरा फोटोग्राफी गियर",
    "gear.desc": "वन्यजीव, खेल, पोर्ट्रेट, यात्रा और वीडियो निर्माण के लिए मेरे द्वारा उपयोग किए जाने वाले कैमरे, लेंस, ऑडियो उपकरण और एक्सेसरीज़ का अन्वेषण करें।",
    "gear.disclaimer": "प्रत्येक उपकरण रिकॉर्ड व्यक्तिगत फील्ड अनुभव और सत्यापित निर्माता विनिर्देशों को स्पष्ट रूप से अलग करता है। किसी भी अज्ञात पैरामीटर को बिना बनावट के सुरक्षित रखा गया है।",
    "gear.jumpTo": "सीधे जाएं:",
    "gear.comparisons": "तुलनाएं",
    "gear.categoryPrefix": "श्रेणी",
    "gear.sideBySide": "तुलनात्मक विश्लेषण",
    "gear.compTitle": "उपकरणों की तुलना",
    "gear.compDesc": "फील्ड में वास्तविक उपयोग, वजन और ऑप्टिक्स के आधार पर निष्पक्ष तकनीकी तुलना।",
    "gear.faceOff": "तकनीकी आमने-सामने",
    "gear.readComp": "फील्ड तुलना पढ़ें",
    "gear.card.primaryUses": "मुख्य उपयोग",
    "gear.card.compatibility": "अनुकूलता एवं सिस्टम",
    "gear.card.viewSpecs": "विस्तृत विवरण एवं फील्ड समीक्षा देखें",
    "gear.card.verified": "सत्यापित उपकरण रिकॉर्ड",
    "gear.card.relevantWork": "संबंधित कार्य:",
    "gear.card.pendingImage": "छवि सत्यापन लंबित",
    "gear.card.pendingReview": "समीक्षा फील्ड सत्यापन के अधीन",
    "gear.review.overviewTitle": "उत्पाद विवरण एवं उपयोग",
    "gear.review.compatibilityTitle": "अनुकूलता एवं सिस्टम एकीकरण",
    "gear.review.excelsTitle": "यह उपकरण कहाँ सर्वश्रेष्ठ है",
    "gear.review.workflowTitle": "मेरे वर्कफ़्लो में इसका उपयोग",
    "gear.review.advantagesTitle": "लाभ एवं परिचालन संबंधी बातें",
    "gear.review.keyAdvantages": "मुख्य लाभ",
    "gear.review.considerations": "ध्यान देने योग्य बातें",
    "gear.review.alternativesTitle": "उपकरण के विकल्प",
    "gear.review.faqTitle": "अक्सर पूछे जाने वाले प्रश्न",
    "gear.review.specsTitle": "तकनीकी विनिर्देश",
    "gear.review.inPortfolio": "पोर्टफोलियो में प्रदर्शन",
    "gear.review.retailerTitle": "खरीदने के लिए उपलब्धता",
    "gear.review.moreGear": "स्टूडियो के अन्य उपकरण",
    "gear.review.viewSpecs": "विवरण देखें",

    // FAQ Page (हिन्दी)
    "faq.badge": "सामान्य जिज्ञासाएं",
    "faq.title": "अक्सर पूछे जाने वाले प्रश्न",
    "faq.desc": "सत्र बुकिंग, मूल्य निर्धारण, छवि अधिकार, वितरण समयसीमा और यात्रा उपलब्धता के बारे में स्पष्ट उत्तर।",
    "faq.searchPlaceholder": "प्रश्न खोजें (उदा. डिलीवरी समय, मूल्य, पहनावा, मौसम)...",
    "faq.catAll": "सभी",
    "faq.catGeneral": "सामान्य",
    "faq.catPricing": "बुकिंग एवं दरें",
    "faq.catStyles": "शैलियां एवं सत्र",
    "faq.catDelivery": "डिलीवरी एवं अधिकार",
    "faq.noMatch": "के लिए कोई मेल खाता प्रश्न नहीं मिला",
    "faq.contactNote": "क्या आपका कोई विशिष्ट प्रश्न है? हमसे सीधे संपर्क करें और हम तुरंत उत्तर देंगे।",
    "faq.askBtn": "प्रश्न पूछें",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, defaultText?: string) => defaultText || key,
});

function clearLegacyCookies() {
  if (typeof document === "undefined") return;
  try {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } catch {}
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // STRICT DEFAULT: Always start as English ("en")
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("site_lang");
      if (saved === "hi") {
        setLanguageState("hi");
      } else {
        setLanguageState("en");
      }
      clearLegacyCookies();
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("site_lang", lang);
      }
    } catch {}
  };

  const t = (key: string, defaultText?: string): string => {
    const dict = DICTIONARY[language] || DICTIONARY.en;
    return dict[key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
