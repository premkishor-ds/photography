export interface FAQItem {
  id: string;
  category: "General" | "Booking & Pricing" | "Styles & Sessions" | "Delivery & Rights";
  question: string;
  answer: string;
  relatedServiceSlug?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-services-offered",
    category: "General",
    question: "What photography services do you offer?",
    answer:
      "We offer six specialized photography services: Portrait Photography (personal branding, editorial, executive), Wedding Photography (destination, elopements, full-day celebrations), Event Photography (corporate summits, galas, brand activations), Sports Photography (high-speed athletic coverage, marathons, tournaments), Commercial Photography (advertising, architecture, products), and Travel & Wildlife Photography (fine-art prints, expedition features).",
  },
  {
    id: "faq-booking-process",
    category: "Booking & Pricing",
    question: "How do I book a photography session?",
    answer:
      "You can book by submitting our online booking enquiry form or messaging us directly via WhatsApp. We will verify our calendar availability, arrange a brief consultation to discuss your vision, and secure your date upon receipt of a signed agreement and retainer deposit.",
  },
  {
    id: "faq-pricing-structure",
    category: "Booking & Pricing",
    question: "How much does a photography session cost?",
    answer:
      "Pricing varies depending on session type, hours of coverage, production scale, and licensing requirements. Portrait sessions begin with bespoke half-day packages, while weddings and commercial shoots are quoted with transparent custom scopes. We provide itemized quotes with no hidden fees.",
  },
  {
    id: "faq-session-duration",
    category: "Styles & Sessions",
    question: "How long does a photoshoot typically take?",
    answer:
      "Portrait sessions generally last between 1.5 and 2.5 hours. Weddings range from 8 to 12 hours of comprehensive coverage. Sports and corporate events can range from half-day coverage to multi-day tournament or conference assignments.",
  },
  {
    id: "faq-delivery-timeline",
    category: "Delivery & Rights",
    question: "When will I receive my completed photographs?",
    answer:
      "Turnaround times depend on the service: portrait sessions are delivered within 7 business days; wedding clients receive a 48-hour sneak peek and complete gallery within 3 to 4 weeks; corporate events receive express press selects within hours and full files in 48–72 hours; sports captures receive expedited 24-hour highlights.",
  },
  {
    id: "faq-travel-availability",
    category: "General",
    question: "Do you travel for destination photoshoots and events?",
    answer:
      "Yes, we regularly travel across the United States and internationally for destination weddings, commercial productions, and landscape expeditions. Travel logistics and accommodations are coordinated transparently as part of your custom proposal.",
  },
  {
    id: "faq-photoshoot-preparation",
    category: "Styles & Sessions",
    question: "How should I prepare for my upcoming photoshoot?",
    answer:
      "Upon booking, we provide a dedicated preparation guide covering wardrobe coordination, flattering color palettes, hair and makeup recommendations, and tips for feeling relaxed in front of the lens.",
  },
  {
    id: "faq-image-rights",
    category: "Delivery & Rights",
    question: "Do I receive full digital rights to print and share my photos?",
    answer:
      "Yes. Portrait, wedding, and event clients receive personal reproduction and digital sharing rights for all delivered high-resolution images. Commercial clients receive formal licensing contracts tailored to their advertising, digital, and print campaign requirements.",
  },
  {
    id: "faq-specific-style",
    category: "Styles & Sessions",
    question: "Can I request a specific photography style or shot list?",
    answer:
      "Absolutely. While our signature style emphasizes natural light, authentic emotion, and cinematic editorial framing, we collaborate closely with moodboards and shot lists to honor your personal aesthetic and creative vision.",
  },
  {
    id: "faq-rain-bad-weather",
    category: "Styles & Sessions",
    question: "What happens if there is bad weather on our shoot date?",
    answer:
      "For outdoor portrait and landscape sessions affected by severe weather, we either transition to an indoor studio location or reschedule to the earliest mutually available date at no additional fee.",
  },
];
