import pg from "pg";
const { Client } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.qvzvnblosedrqktisdsz:jYzfeQKv2jqIStoX@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";

const BLOG_POSTS = [
  {
    id: "blog-what-to-wear",
    slug: "what-to-wear-for-a-portrait-photoshoot",
    title: "What to Wear for a Portrait Photoshoot: Stylist Guide",
    excerpt:
      "Essential wardrobe advice, flattering color palettes, and texture combinations to ensure your portraits look timeless, authentic, and effortlessly elegant.",
    published_date: "2026-02-14",
    modified_date: "2026-03-01",
    author: "Prem Kishor",
    author_role: "Principal Editorial & Royal Wedding Photographer",
    read_time: "5 min read",
    category: "Portrait Tips",
    hero_image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80",
    hero_alt: "Portrait photoshoot model wearing neutral tones with soft natural lighting",
    related_service_slug: "portrait-photography",
    content: JSON.stringify([
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
    ]),
  },
  {
    id: "blog-wedding-photographer",
    slug: "how-to-choose-a-wedding-photographer",
    title: "How to Choose the Right Wedding Photographer",
    excerpt:
      "From documentary storytelling versus posed editorial styles to second shooters and backup workflows, here is how to find your ideal wedding visual storyteller.",
    published_date: "2026-01-20",
    modified_date: "2026-02-28",
    author: "Prem Kishor",
    author_role: "Principal Editorial & Royal Wedding Photographer",
    read_time: "6 min read",
    category: "Wedding Guides",
    hero_image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    hero_alt: "Newlywed couple enjoying outdoor golden hour ceremony sunset",
    related_service_slug: "wedding-photography",
    content: JSON.stringify([
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
    ]),
  },
  {
    id: "blog-commercial-licensing",
    slug: "understanding-commercial-photography-licensing",
    title: "Commercial Photography Licensing: Brand Guide",
    excerpt:
      "A clear breakdown of commercial usage rights, buyout contracts, digital advertising permissions, and why proper licensing protects your brand investment.",
    published_date: "2026-02-02",
    modified_date: "2026-03-05",
    author: "Prem Kishor",
    author_role: "Principal Editorial & Royal Wedding Photographer",
    read_time: "7 min read",
    category: "Commercial & Brand",
    hero_image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    hero_alt: "Luxury designer boutique architectural display with commercial illumination",
    related_service_slug: "commercial-photography",
    content: JSON.stringify([
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
    ]),
  },
  {
    id: "blog-sports-action",
    slug: "capturing-high-speed-sports-action-techniques",
    title: "High-Speed Sports Photography Techniques",
    excerpt:
      "How professional sports photographers utilize telephoto compression, predictive autofocus tracking, and high shutter speeds to capture raw athletic drama.",
    published_date: "2026-02-25",
    modified_date: "2026-03-08",
    author: "Prem Kishor",
    author_role: "Principal Editorial & Royal Wedding Photographer",
    read_time: "5 min read",
    category: "Action & Technique",
    hero_image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",
    hero_alt: "Sprinter accelerating forward on a stadium track",
    related_service_slug: "sports-photography",
    content: JSON.stringify([
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
    ]),
  },
];

const FAQ_ITEMS = [
  {
    id: "faq-services-offered",
    category: "General",
    question: "What photography services do you offer?",
    answer:
      "We offer six specialized photography services: Portrait Photography (personal branding, editorial, executive), Wedding Photography (destination, elopements, full-day celebrations), Event Photography (corporate summits, galas, brand activations), Sports Photography (high-speed athletic coverage, marathons, tournaments), Commercial Photography (advertising, architecture, products), and Travel & Wildlife Photography (fine-art prints, expedition features).",
    order_index: 0,
  },
  {
    id: "faq-booking-process",
    category: "Booking & Pricing",
    question: "How do I book a photography session?",
    answer:
      "You can book by submitting our online booking enquiry form or messaging us directly via WhatsApp (+91 98290 12345). We will verify our calendar availability, arrange a brief creative consultation, and secure your date upon receipt of a signed agreement and booking advance. We accept UPI (Google Pay, PhonePe, Paytm), Net Banking / NEFT, and major credit/debit cards.",
    order_index: 1,
  },
  {
    id: "faq-pricing-structure",
    category: "Booking & Pricing",
    question: "How much does a photography session cost in India?",
    answer:
      "All pricing is clearly denominated in Indian Rupee (INR / ₹) with GST compliance and zero hidden fees. Portrait and pre-wedding sessions start from ₹25,000; corporate event & literature summit coverage starts from ₹20,000; high-speed sports & match coverage starts from ₹35,000; commercial and brand campaigns start from ₹50,000; and royal destination wedding collections start from ₹1,50,000.",
    order_index: 2,
  },
  {
    id: "faq-session-duration",
    category: "Styles & Sessions",
    question: "How long does a photoshoot typically take?",
    answer:
      "Portrait and studio sessions at our Jaipur studio (Room 215, Karolan Ka Barh, Shri Kishanpura) or heritage locations generally last 1.5 to 2.5 hours. Royal weddings range from 8 hours to multi-day festivities (Mehendi, Sangeet, Pheras, Reception). Sports matches and corporate summits are covered on half-day or multi-day tournament schedules.",
    order_index: 3,
  },
  {
    id: "faq-delivery-timeline",
    category: "Delivery & Rights",
    question: "When will I receive my completed photographs?",
    answer:
      "Turnaround times depend on the service: portrait sessions are delivered within 7 business days; wedding clients receive a 48-hour sneak peek and complete gallery within 3 to 4 weeks; corporate events receive express press selects within hours and full files in 48–72 hours; sports captures receive expedited 24-hour highlights.",
    order_index: 4,
  },
  {
    id: "faq-travel-availability",
    category: "General",
    question: "Do you travel for destination photoshoots and weddings across India?",
    answer:
      "Yes! While based in Jaipur, Rajasthan, we regularly travel across Udaipur, Jodhpur, Jaisalmer, Pushkar, Delhi NCR, Mumbai, Goa, and worldwide destinations for royal weddings, commercial campaigns, and wildlife expeditions. Travel logistics and accommodations are coordinated transparently as part of your custom quote.",
    order_index: 5,
  },
  {
    id: "faq-photoshoot-preparation",
    category: "Styles & Sessions",
    question: "How should I prepare for my upcoming photoshoot?",
    answer:
      "Upon booking, we provide a dedicated preparation guide covering wardrobe coordination (ethnic wear, pastel lehengas, sherwanis, or modern western neutrals), flattering color palettes against heritage stone backdrops, hair and makeup recommendations, and tips for feeling relaxed in front of the lens.",
    order_index: 6,
  },
  {
    id: "faq-image-rights",
    category: "Delivery & Rights",
    question: "Do I receive full digital rights to print and share my photos?",
    answer:
      "Yes. Portrait, wedding, and event clients receive personal reproduction and digital sharing rights for all delivered high-resolution images. Commercial clients receive formal licensing contracts tailored to their advertising, digital, and print campaign requirements.",
    order_index: 7,
  },
  {
    id: "faq-specific-style",
    category: "Styles & Sessions",
    question: "Can I request a specific photography style or shot list?",
    answer:
      "Absolutely. While our signature style emphasizes natural light, authentic emotion, and cinematic editorial framing, we collaborate closely with moodboards and shot lists to honor your personal aesthetic and family traditions.",
    order_index: 8,
  },
  {
    id: "faq-rain-bad-weather",
    category: "Styles & Sessions",
    question: "What happens if there is extreme summer heat or monsoon rain on our shoot date?",
    answer:
      "For outdoor Jaipur sessions scheduled during peak summer or monsoon showers, we plan early morning golden hour timings (6:00 AM – 8:30 AM), utilize indoor heritage pavilions / our air-conditioned Jaipur studio, or reschedule to the earliest mutually available date at no additional fee.",
    order_index: 9,
  },
];

async function seed() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log("Connected to Supabase PostgreSQL.");

    // Seed blog posts
    console.log("Seeding blog_posts...");
    for (const post of BLOG_POSTS) {
      await client.query(
        `
        INSERT INTO public.blog_posts (
          id, slug, title, excerpt, category, author, author_role,
          read_time, hero_image, hero_alt, content, related_service_slug,
          published_date, modified_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          category = EXCLUDED.category,
          author = EXCLUDED.author,
          author_role = EXCLUDED.author_role,
          read_time = EXCLUDED.read_time,
          hero_image = EXCLUDED.hero_image,
          hero_alt = EXCLUDED.hero_alt,
          content = EXCLUDED.content,
          related_service_slug = EXCLUDED.related_service_slug,
          published_date = EXCLUDED.published_date,
          modified_date = EXCLUDED.modified_date;
      `,
        [
          post.id,
          post.slug,
          post.title,
          post.excerpt,
          post.category,
          post.author,
          post.author_role,
          post.read_time,
          post.hero_image,
          post.hero_alt,
          post.content,
          post.related_service_slug,
          post.published_date,
          post.modified_date,
        ]
      );
    }
    console.log("Successfully seeded", BLOG_POSTS.length, "blog posts.");

    // Seed FAQs
    console.log("Seeding faqs...");
    for (const faq of FAQ_ITEMS) {
      await client.query(
        `
        INSERT INTO public.faqs (
          id, category, question, answer, order_index
        ) VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          category = EXCLUDED.category,
          question = EXCLUDED.question,
          answer = EXCLUDED.answer,
          order_index = EXCLUDED.order_index;
      `,
        [faq.id, faq.category, faq.question, faq.answer, faq.order_index]
      );
    }
    console.log("Successfully seeded", FAQ_ITEMS.length, "FAQs.");

    // Verify row counts
    const bRes = await client.query(`SELECT count(*) FROM public.blog_posts;`);
    const fRes = await client.query(`SELECT count(*) FROM public.faqs;`);
    console.log("Final counts - Blog Posts:", bRes.rows[0].count, "| FAQs:", fRes.rows[0].count);

    await client.end();
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}

seed();
