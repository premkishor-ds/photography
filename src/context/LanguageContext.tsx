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
    "nav.locations": "Locations",

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
    "contact.form.privacyNote": "We treat your details with absolute privacy. No spam guaranteed.",
    "contact.form.thankYou": "Thank You",
    "contact.form.received": "Your inquiry for {service} has been received. Julian will review your preferred date ({date}) and reply to {email} within 24 hours.",
    "contact.form.followUp": "Follow up on WhatsApp",
    "contact.form.sendAnother": "Send Another Message",

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
    "nav.locations": "स्थान",

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
    "contact.form.privacyNote": "हम आपके विवरण को पूर्ण गोपनीयता के साथ रखते हैं। स्पैम मुक्त गारंटी।",
    "contact.form.thankYou": "धन्यवाद",
    "contact.form.received": "आपकी पूछताछ प्राप्त हो गई है। जूलियन आपकी पसंदीदा तिथि की समीक्षा करेंगे और 24 घंटे के भीतर ईमेल पर जवाब देंगे।",
    "contact.form.followUp": "व्हाट्सएप पर संपर्क जारी रखें",
    "contact.form.sendAnother": "एक और संदेश भेजें",

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
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, defaultText?: string) => defaultText || key,
});

function clearGoogleTranslateCookies() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  const domains = ["", hostname, `.${hostname}`];
  if (domainParts.length > 1) {
    domains.push(`.${domainParts.slice(-2).join(".")}`);
  }

  const paths = ["/", window.location.pathname];
  domains.forEach((dom) => {
    paths.forEach((p) => {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}; ${dom ? `domain=${dom};` : ""}`;
    });
  });
}

function setGoogleTranslateCookie(lang: Language) {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const cookieVal = lang === "hi" ? "/en/hi" : "/en/en";
  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");

  document.cookie = `googtrans=${cookieVal}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
  if (domainParts.length > 1) {
    document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domainParts.slice(-2).join(".")};`;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // STRICT DEFAULT: Always start as English ("en")
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check user preference in localStorage
    const saved = localStorage.getItem("site_lang");
    if (saved === "hi") {
      setLanguageState("hi");
      setGoogleTranslateCookie("hi");
    } else {
      // Default to English strictly
      setLanguageState("en");
      localStorage.setItem("site_lang", "en");
      clearGoogleTranslateCookies();
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("site_lang", lang);

      if (lang === "hi") {
        setGoogleTranslateCookie("hi");
        // Trigger Google Translate combo if available
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (select) {
          select.value = "hi";
          select.dispatchEvent(new Event("change"));
        } else {
          // If select isn't ready, reload with cookie to activate Google Translate
          window.location.reload();
        }
      } else {
        // Switching to English
        clearGoogleTranslateCookies();
        const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
        if (select) {
          select.value = "en";
          select.dispatchEvent(new Event("change"));
        }
        // Always clean reload to ensure all Google Translate DOM modifications revert to pristine English
        window.location.reload();
      }
    }
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
