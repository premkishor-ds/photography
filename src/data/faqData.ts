export interface FAQItem {
  id: string;
  category: "General" | "Booking & Pricing" | "Styles & Sessions" | "Delivery & Rights";
  question: string;
  answer: string;
  questionHindi?: string;
  answerHindi?: string;
  relatedServiceSlug?: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-services-offered",
    category: "General",
    question: "What photography services do you offer?",
    answer:
      "We offer six specialized photography services: Portrait Photography (personal branding, editorial, executive), Wedding Photography (destination, elopements, full-day celebrations), Event Photography (corporate summits, galas, brand activations), Sports Photography (high-speed athletic coverage, marathons, tournaments), Commercial Photography (advertising, architecture, products), and Travel & Wildlife Photography (fine-art prints, expedition features).",
    questionHindi: "आप कौन-सी फोटोग्राफी सेवाएं प्रदान करते हैं?",
    answerHindi:
      "हम छह विशेष फोटोग्राफी सेवाएं प्रदान करते हैं: पोर्ट्रेट फोटोग्राफी (व्यक्तिगत ब्रांडिंग, संपादकीय, कार्यकारी), विवाह फोटोग्राफी (डेस्टिनेशन विवाह, पूर्ण-दिवसीय उत्सव), कार्यक्रम फोटोग्राफी (कॉर्पोरेट शिखर सम्मेलन, गाला, ब्रांड लॉन्च), खेल फोटोग्राफी (तीव्र गति एथलेटिक कवरेज, मैराथन, टूर्नामेंट), कमर्शियल फोटोग्राफी (विज्ञापन, वास्तुकला, उत्पाद), और यात्रा एवं वन्यजीव फोटोग्राफी (फाइन-आर्ट प्रिंट्स, अभियान चित्रण)।",
  },
  {
    id: "faq-booking-process",
    category: "Booking & Pricing",
    question: "How do I book a photography session?",
    answer:
      "You can book by submitting our online booking enquiry form or messaging us directly via WhatsApp (+91 98290 12345). We will verify our calendar availability, arrange a brief creative consultation, and secure your date upon receipt of a signed agreement and booking advance. We accept UPI (Google Pay, PhonePe, Paytm), Net Banking / NEFT, and major credit/debit cards.",
    questionHindi: "मैं फोटोग्राफी सत्र कैसे बुक कर सकता हूँ?",
    answerHindi:
      "आप हमारे ऑनलाइन बुकिंग पूछताछ फॉर्म को भरकर या हमें व्हाट्सएप (+91 98290 12345) पर सीधा संदेश भेजकर बुक कर सकते हैं। हम अपने कैलेंडर की उपलब्धता जांचेंगे, एक संक्षिप्त रचनात्मक परामर्श आयोजित करेंगे, और हस्ताक्षरित समझौते और बुकिंग अग्रिम प्राप्त होने पर आपकी तिथि सुरक्षित करेंगे। हम यूपीआई (Google Pay, PhonePe, Paytm), नेट बैंकिंग / NEFT, और प्रमुख क्रेडिट/डेबिट कार्ड स्वीकार करते हैं।",
  },
  {
    id: "faq-pricing-structure",
    category: "Booking & Pricing",
    question: "How much does a photography session cost in India?",
    answer:
      "All pricing is clearly denominated in Indian Rupee (INR / ₹) with GST compliance and zero hidden fees. Portrait and pre-wedding sessions start from ₹25,000; corporate event & literature summit coverage starts from ₹20,000; high-speed sports & match coverage starts from ₹35,000; commercial and brand campaigns start from ₹50,000; and royal destination wedding collections start from ₹1,50,000.",
    questionHindi: "भारत में फोटोग्राफी सत्र की लागत कितनी होती है?",
    answerHindi:
      "सभी मूल्य निर्धारण स्पष्ट रूप से भारतीय रुपये (INR / ₹) में जीएसटी अनुपालन और शून्य छिपे हुए शुल्क के साथ है। पोर्ट्रेट और प्री-वेडिंग सत्र ₹25,000 से शुरू होते हैं; कॉर्पोरेट कार्यक्रम एवं साहित्य शिखर सम्मेलन कवरेज ₹20,000 से शुरू होता है; हाई-स्पीड खेल एवं मैच कवरेज ₹35,000 से शुरू होता है; कमर्शियल और ब्रांड अभियान ₹50,000 से शुरू होते हैं; और शाही डेस्टिनेशन वेडिंग संग्रह ₹1,50,000 से शुरू होते हैं।",
  },
  {
    id: "faq-session-duration",
    category: "Styles & Sessions",
    question: "How long does a photoshoot typically take?",
    answer:
      "Portrait and studio sessions at our Jaipur studio (Room 215, Karolan Ka Barh, Shri Kishanpura) or heritage locations generally last 1.5 to 2.5 hours. Royal weddings range from 8 hours to multi-day festivities (Mehendi, Sangeet, Pheras, Reception). Sports matches and corporate summits are covered on half-day or multi-day tournament schedules.",
    questionHindi: "एक फोटोशूट में सामान्यतः कितना समय लगता है?",
    answerHindi:
      "हमारे जयपुर स्टूडियो (कमरा 215, करोलां का बास, श्री किशनपुरा) या हेरिटेज स्थानों पर पोर्ट्रेट और स्टूडियो सत्र सामान्यतः 1.5 से 2.5 घंटे तक चलते हैं। शाही शादियों का समय 8 घंटे से लेकर बहु-दिवसीय उत्सवों (मेहंदी, संगीत, फेरे, रिसेप्शन) तक होता है। खेल मैचों और कॉर्पोरेट सम्मेलनों को आधे दिन या बहु-दिवसीय टूर्नामेंट कार्यक्रम के अनुसार कवर किया जाता है।",
  },
  {
    id: "faq-delivery-timeline",
    category: "Delivery & Rights",
    question: "When will I receive my completed photographs?",
    answer:
      "Turnaround times depend on the service: portrait sessions are delivered within 7 business days; wedding clients receive a 48-hour sneak peek and complete gallery within 3 to 4 weeks; corporate events receive express press selects within hours and full files in 48–72 hours; sports captures receive expedited 24-hour highlights.",
    questionHindi: "मुझे मेरी पूरी तस्वीरें कब प्राप्त होंगी?",
    answerHindi:
      "डिलीवरी का समय सेवा पर निर्भर करता है: पोर्ट्रेट सत्र 7 कार्य दिवसों के भीतर डिलीवर किए जाते हैं; विवाह ग्राहकों को 48 घंटे में स्नीक पीक और 3 से 4 सप्ताह में पूर्ण गैलरी मिलती है; कॉर्पोरेट आयोजनों को कुछ ही घंटों में प्रेस चयन और 48-72 घंटों में पूरी फाइलें मिलती हैं; खेल आयोजनों को त्वरित 24 घंटे में मुख्य अंश प्राप्त होते हैं।",
  },
  {
    id: "faq-travel-availability",
    category: "General",
    question: "Do you travel for destination photoshoots and weddings across India?",
    answer:
      "Yes! While based in Jaipur, Rajasthan, we regularly travel across Udaipur, Jodhpur, Jaisalmer, Pushkar, Delhi NCR, Mumbai, Goa, and worldwide destinations for royal weddings, commercial campaigns, and wildlife expeditions. Travel logistics and accommodations are coordinated transparently as part of your custom quote.",
    questionHindi: "क्या आप पूरे भारत में डेस्टिनेशन फोटोशूट और शादियों के लिए यात्रा करते हैं?",
    answerHindi:
      "हाँ! जयपुर, राजस्थान में स्थित होने के बावजूद, हम नियमित रूप से उदयपुर, जोधपुर, जैसलमेर, पुष्कर, दिल्ली एनसीआर, मुंबई, गोवा और दुनिया भर के स्थानों पर शाही शादियों, कमर्शियल अभियानों और वन्यजीव अन्वेषण के लिए यात्रा करते हैं। यात्रा और आवास की व्यवस्था आपके कस्टम कोटेशन में पारदर्शी रूप से शामिल की जाती है।",
  },
  {
    id: "faq-photoshoot-preparation",
    category: "Styles & Sessions",
    question: "How should I prepare for my upcoming photoshoot?",
    answer:
      "Upon booking, we provide a dedicated preparation guide covering wardrobe coordination (ethnic wear, pastel lehengas, sherwanis, or modern western neutrals), flattering color palettes against heritage stone backdrops, hair and makeup recommendations, and tips for feeling relaxed in front of the lens.",
    questionHindi: "मुझे अपने आगामी फोटोशूट के लिए कैसे तैयारी करनी चाहिए?",
    answerHindi:
      "बुकिंग के बाद, हम एक समर्पित तैयारी गाइड प्रदान करते हैं जिसमें पोशाक समन्वय (पारंपरिक परिधान, पेस्टल लहंगे, शेरवानी, या आधुनिक न्यूट्रल रंग), हेरिटेज पृष्ठभूमि के अनुकूल रंग पैलेट, हेयर और मेकअप सुझाव, और कैमरे के सामने सहज महसूस करने के तरीके शामिल हैं।",
  },
  {
    id: "faq-image-rights",
    category: "Delivery & Rights",
    question: "Do I receive full digital rights to print and share my photos?",
    answer:
      "Yes. Portrait, wedding, and event clients receive personal reproduction and digital sharing rights for all delivered high-resolution images. Commercial clients receive formal licensing contracts tailored to their advertising, digital, and print campaign requirements.",
    questionHindi: "क्या मुझे तस्वीरों को प्रिंट और साझा करने के पूर्ण डिजिटल अधिकार मिलते हैं?",
    answerHindi:
      "हाँ। पोर्ट्रेट, विवाह और इवेंट ग्राहकों को सभी वितरित उच्च-रिज़ॉल्यूशन छवियों के लिए व्यक्तिगत पुनरुत्पादन और डिजिटल साझाकरण अधिकार प्राप्त होते हैं। कमर्शियल ग्राहकों को उनके विज्ञापन, डिजिटल और प्रिंट अभियानों के अनुसार औपचारिक लाइसेंसिंग अनुबंध दिए जाते हैं।",
  },
  {
    id: "faq-specific-style",
    category: "Styles & Sessions",
    question: "Can I request a specific photography style or shot list?",
    answer:
      "Absolutely. While our signature style emphasizes natural light, authentic emotion, and cinematic editorial framing, we collaborate closely with moodboards and shot lists to honor your personal aesthetic and family traditions.",
    questionHindi: "क्या मैं किसी विशिष्ट फोटोग्राफी शैली या शॉट सूची का अनुरोध कर सकता हूँ?",
    answerHindi:
      "बिल्कुल। हालांकि हमारी विशिष्ट शैली प्राकृतिक प्रकाश, प्रामाणिक भावनाओं और सिनेमैटिक संपादकीय फ्रेमिंग पर जोर देती है, हम आपके व्यक्तिगत सौंदर्य और पारिवारिक परंपराओं का सम्मान करने के लिए मूडबोर्ड और शॉट सूचियों के साथ मिलकर काम करते हैं।",
  },
  {
    id: "faq-rain-bad-weather",
    category: "Styles & Sessions",
    question: "What happens if there is extreme summer heat or monsoon rain on our shoot date?",
    answer:
      "For outdoor Jaipur sessions scheduled during peak summer or monsoon showers, we plan early morning golden hour timings (6:00 AM – 8:30 AM), utilize indoor heritage pavilions / our air-conditioned Jaipur studio, or reschedule to the earliest mutually available date at no additional fee.",
    questionHindi: "यदि हमारे शूट की तिथि पर अत्यधिक गर्मी या मानसूनी बारिश हो तो क्या होगा?",
    answerHindi:
      "गर्मियों के चरम या मानसूनी बारिश के दौरान निर्धारित आउटडोर जयपुर सत्रों के लिए, हम सुबह के गोल्डन ऑवर (6:00 AM – 8:30 AM) की योजना बनाते हैं, इनडोर हेरिटेज मंडपों या हमारे वातानुकूलित जयपुर स्टूडियो का उपयोग करते हैं, या बिना किसी अतिरिक्त शुल्क के जल्द से जल्द उपलब्ध नई तिथि पर पुनर्निर्धारित करते हैं।",
  },
];

export function getLocalizedFaqItem(item: FAQItem, lang: "en" | "hi"): { question: string; answer: string; category: string } {
  if (lang === "hi") {
    return {
      question: item.questionHindi || item.question,
      answer: item.answerHindi || item.answer,
      category: item.category,
    };
  }
  return {
    question: item.question,
    answer: item.answer,
    category: item.category,
  };
}

export function getLocalizedFaqItems(items: FAQItem[], lang: "en" | "hi") {
  return items.map((item) => ({
    ...item,
    question: lang === "hi" && item.questionHindi ? item.questionHindi : item.question,
    answer: lang === "hi" && item.answerHindi ? item.answerHindi : item.answer,
  }));
}
