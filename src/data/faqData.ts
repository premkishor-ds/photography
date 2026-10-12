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
      "You can book by submitting our online booking enquiry form or messaging us directly via WhatsApp (+91 98290 12345). We will verify our calendar availability, arrange a brief creative consultation, and secure your date upon receipt of a signed agreement and booking advance. We accept UPI (Google Pay, PhonePe, Paytm), Net Banking / NEFT, and major credit/debit cards.",
  },
  {
    id: "faq-pricing-structure",
    category: "Booking & Pricing",
    question: "How much does a photography session cost in India?",
    answer:
      "All pricing is clearly denominated in Indian Rupee (INR / ₹) with GST compliance and zero hidden fees. Portrait and pre-wedding sessions start from ₹25,000; corporate event & literature summit coverage starts from ₹20,000; high-speed sports & match coverage starts from ₹35,000; commercial and brand campaigns start from ₹50,000; and royal destination wedding collections start from ₹1,50,000.",
  },
  {
    id: "faq-session-duration",
    category: "Styles & Sessions",
    question: "How long does a photoshoot typically take?",
    answer:
      "Portrait and studio sessions at our Jaipur studio (Room 215, Karolan Ka Barh, Shri Kishanpura) or heritage locations generally last 1.5 to 2.5 hours. Royal weddings range from 8 hours to multi-day festivities (Mehendi, Sangeet, Pheras, Reception). Sports matches and corporate summits are covered on half-day or multi-day tournament schedules.",
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
    question: "Do you travel for destination photoshoots and weddings across India?",
    answer:
      "Yes! While based in Jaipur, Rajasthan, we regularly travel across Udaipur, Jodhpur, Jaisalmer, Pushkar, Delhi NCR, Mumbai, Goa, and worldwide destinations for royal weddings, commercial campaigns, and wildlife expeditions. Travel logistics and accommodations are coordinated transparently as part of your custom quote.",
  },
  {
    id: "faq-photoshoot-preparation",
    category: "Styles & Sessions",
    question: "How should I prepare for my upcoming photoshoot?",
    answer:
      "Upon booking, we provide a dedicated preparation guide covering wardrobe coordination (ethnic wear, pastel lehengas, sherwanis, or modern western neutrals), flattering color palettes against heritage stone backdrops, hair and makeup recommendations, and tips for feeling relaxed in front of the lens.",
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
      "Absolutely. While our signature style emphasizes natural light, authentic emotion, and cinematic editorial framing, we collaborate closely with moodboards and shot lists to honor your personal aesthetic and family traditions.",
  },
  {
    id: "faq-rain-bad-weather",
    category: "Styles & Sessions",
    question: "What happens if there is extreme summer heat or monsoon rain on our shoot date?",
    answer:
      "For outdoor Jaipur sessions scheduled during peak summer or monsoon showers, we plan early morning golden hour timings (6:00 AM – 8:30 AM), utilize indoor heritage pavilions / our air-conditioned Jaipur studio, or reschedule to the earliest mutually available date at no additional fee.",
  },
];
