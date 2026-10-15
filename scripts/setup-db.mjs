import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.qvzvnblosedrqktisdsz',
  password: 'jYzfeQKv2jqIStoX',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
});

const PORTFOLIO_ITEMS = [
  {
    id: "port-1",
    title: "Golden Hour Solitude",
    category: "Portrait Photography",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Studio Minimalist, Jaipur",
    year: "2026",
    description: "An intimate editorial portrait emphasizing natural warm reflections and raw expression.",
    orderIndex: 1
  },
  {
    id: "wed-1",
    title: "Royal Rajputana Vows",
    category: "Wedding Photography",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "City Palace Heritage Courtyard, Jaipur",
    year: "2026",
    description: "Tender golden hour moments surrounded by historic sandstone arches and royal courtyards.",
    orderIndex: 2
  },
  {
    id: "spo-1",
    title: "Velocity & Grit",
    category: "Sports Photography",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "SMS Stadium, Jaipur",
    year: "2026",
    description: "High-shutter capture freezing peak athletic propulsion and raw competitive focus.",
    orderIndex: 3
  },
  {
    id: "eve-1",
    title: "The Grand Heritage Gala",
    category: "Event Photography",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Rambagh Palace Pavilion, Jaipur",
    year: "2026",
    description: "Atmospheric evening celebrating cultural excellence under warm ambient candlelight.",
    orderIndex: 4
  },
  {
    id: "nat-1",
    title: "Misty Alpine Dawn",
    category: "Nature & Wildlife",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Dolomites & Western Ghats",
    year: "2026",
    description: "First light piercing morning fog cascades across jagged limestone peaks.",
    orderIndex: 5
  },
  {
    id: "tra-1",
    title: "Golden Fort of Jaisalmer",
    category: "Travel Photography",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Thar Desert & Jaisalmer, Rajasthan",
    year: "2026",
    description: "Reflections in the emerald waters beneath monumental granite cliffs.",
    orderIndex: 6
  },
  {
    id: "spo-2",
    title: "Ocean Wave Precision",
    category: "Sports Photography",
    imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Goa Coastal Regatta",
    year: "2026",
    description: "Dynamic telephoto capture carving through the barrel of a sunset swell.",
    orderIndex: 7
  },
  {
    id: "port-2",
    title: "Monochrome Contours",
    category: "Portrait Photography",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Studio 215, Shri Kishanpura, Jaipur",
    year: "2026",
    description: "High-contrast studio lighting capturing authentic character and quiet strength.",
    orderIndex: 8
  },
  {
    id: "wed-2",
    title: "Imperial Sheesh Mahal Celebration",
    category: "Wedding Photography",
    imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Amer Fort Palace, Jaipur",
    year: "2026",
    description: "Delicate bridal veil reflecting thousands of convex mirror inlays in regal amber light.",
    orderIndex: 9
  },
  {
    id: "nat-2",
    title: "Ranthambore Royal Bengal Tigress",
    category: "Nature & Wildlife",
    imageUrl: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Ranthambore National Park, Rajasthan",
    year: "2026",
    description: "A silent encounter with a majestic Bengal tigress emerging from morning mist.",
    orderIndex: 10
  },
  {
    id: "tra-2",
    title: "Blue City Sunrise Reverie",
    category: "Travel Photography",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Mehrangarh Fort Overlook, Jodhpur",
    year: "2026",
    description: "Indigo facades, winding medieval alleys, and waking temples beneath fortress walls.",
    orderIndex: 11
  },
  {
    id: "spo-3",
    title: "The Decisive Dunk",
    category: "Sports Photography",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "National Games Arena",
    year: "2026",
    description: "Airborne mid-shot suspended against twilight arena floodlights.",
    orderIndex: 12
  },
  {
    id: "port-3",
    title: "Luminous Reverie",
    category: "Portrait Photography",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "portrait",
    location: "Jaipur Flagship Studio",
    year: "2026",
    description: "Soft natural window light creating a timeless, painterly portrait with warm tonal balance.",
    orderIndex: 13
  },
  {
    id: "wed-3",
    title: "Royal Mandap at Lake Palace",
    category: "Wedding Photography",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Lake Pichola, Udaipur",
    year: "2026",
    description: "Unscripted joy and spontaneous motion under fairy lights and starry skies.",
    orderIndex: 14
  },
  {
    id: "eve-2",
    title: "Jaipur Literature Festival Moments",
    category: "Event Photography",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    aspectRatio: "landscape",
    location: "Diggi Palace, Jaipur",
    year: "2026",
    description: "Dynamic stage illumination and candid backstage energy captured during live cultural gathering.",
    orderIndex: 15
  }
];

const SERVICES = [
  {
    id: "portrait-service",
    title: "Portrait Photography",
    tagline: "Intimate, expressive portraits reflecting your authentic essence.",
    description: "Carefully tailored portrait sessions for artists, executives, couples, and individuals looking for timeless visual presence.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    duration: "1.5 – 2.5 Hours",
    deliveryTime: "7 business days",
    deliverables: [
      "25+ Curated high-resolution edits",
      "Private online proofing gallery",
      "Full personal reproduction rights",
      "Studio or outdoor natural lighting",
      "Styling & wardrobe guidance"
    ],
    detailedDescription: "Our portrait sessions are relaxed, unhurried, and deeply collaborative. Whether you need an editorial headshot, personal branding images, or a legacy family portrait, we focus on genuine gestures, flattering natural illumination, and an effortless aesthetic.",
    idealFor: "Artists, founders, couples, actors, and personal branding.",
    startingPriceInr: 25000,
    orderIndex: 1
  },
  {
    id: "wedding-service",
    title: "Wedding Photography",
    tagline: "Documentary fine-art coverage of your celebration of love.",
    description: "Unobtrusive, cinematic storytelling capturing both monumental vows and fleeting, heartfelt unscripted glances.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    duration: "8 – 12 Hours Coverage",
    deliveryTime: "3 – 4 weeks (48h Sneak Peek)",
    deliverables: [
      "400+ Color-graded master images",
      "Complimentary engagement portrait session",
      "Second lead photographer included",
      "Handcrafted heirloom photo box & USB",
      "Archival online gallery with 5-year backup"
    ],
    detailedDescription: "We believe weddings are living celebrations, not staged photo shoots. Our documentary approach blends organic candid storytelling with high-fashion portraits, ensuring every tear, laugh, and dance move is preserved with warmth and timeless grace.",
    idealFor: "Couples planning intimate elopements, destination weddings, and grand celebrations.",
    startingPriceInr: 85000,
    orderIndex: 2
  },
  {
    id: "event-service",
    title: "Event Photography",
    tagline: "Dynamic, polished documentation for galas, launches, and private gatherings.",
    description: "Discreet and comprehensive coverage for corporate conferences, luxury galas, art exhibitions, and milestone anniversaries.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    duration: "Half-Day to Multi-Day",
    deliveryTime: "48 – 72 hours express delivery",
    deliverables: [
      "Comprehensive event storyline",
      "High-res and social-optimized web exports",
      "Candid guest & keynote documentation",
      "VIP step-and-repeat coverage",
      "Same-day press highlights available"
    ],
    detailedDescription: "From high-profile keynote addresses to lively private dinner parties, we capture the ambiance, key personalities, and intricate details that represent the success and prestige of your occasion.",
    idealFor: "Corporate galas, cultural summits, luxury brand activations, and private dinners.",
    startingPriceInr: 45000,
    orderIndex: 3
  },
  {
    id: "sports-service",
    title: "Sports Photography",
    tagline: "High-speed, cinematic documentation of raw athletic intensity and triumph.",
    description: "Freeze split-second athleticism, emotion, and tournament adrenaline with pro-grade high-speed optics and dynamic angles.",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
    duration: "Half-Day / Match Coverage",
    deliveryTime: "24 – 48 hours expedited",
    deliverables: [
      "Continuous burst high-speed action captures",
      "On-site immediate social highlight selects",
      "High-resolution digital athlete gallery",
      "Commercial & editorial media rights",
      "Peak-action color correction & sharpening"
    ],
    detailedDescription: "Sports photography requires anticipation, lightning reflexes, and telephoto precision. We capture the decisive moments — the buzzer-beating leap, the grit in an athlete's eyes, and the roaring team celebration — with unmatched clarity and cinematic drama.",
    idealFor: "Athletic clubs, sporting tournaments, marathon events, fitness brands, and individual athletes.",
    startingPriceInr: 40000,
    orderIndex: 4
  },
  {
    id: "commercial-service",
    title: "Commercial Photography",
    tagline: "Sophisticated visuals that elevate your brand story and product appeal.",
    description: "Strategic visual content for luxury brands, architects, culinary masters, and advertising campaigns with meticulous art direction.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    duration: "Custom Project Basis",
    deliveryTime: "Per production timeline",
    deliverables: [
      "Commercial advertising license rights",
      "Studio & on-location lighting setups",
      "Creative direction & moodboard development",
      "Retouching & composite editing",
      "Color-accurate print ready CMYK and RGB files"
    ],
    detailedDescription: "We work closely with creative directors and marketing teams to produce imagery that commands attention, honors brand aesthetics, and converts viewers into loyal patrons across digital and print mediums.",
    idealFor: "Architectural firms, designer apparel, boutique hotels, and consumer goods.",
    startingPriceInr: 60000,
    orderIndex: 5
  },
  {
    id: "travel-wildlife-service",
    title: "Travel & Wildlife Photography",
    tagline: "Expedition photography capturing the awe-inspiring raw natural world.",
    description: "Fine-art landscape prints, editorial travel features, and conservation storytelling commissions across remote terrains.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    duration: "Expedition & Assignment",
    deliveryTime: "Custom delivery",
    deliverables: [
      "Editorial print and publishing licensing",
      "Museum-grade fine art gallery prints",
      "Field stories and documentary essays",
      "Drone / Aerial perspective options",
      "Archival raw metadata certification"
    ],
    detailedDescription: "With respect for wild habitats and keen patience, we document fragile ecosystems, breathtaking geological wonders, and cultural heritage across all continents with museum-grade precision.",
    idealFor: "Publications, eco-tourism lodges, conservation NGO organizations, and private art collectors.",
    startingPriceInr: 75000,
    orderIndex: 6
  }
];

const INITIAL_INQUIRIES = [
  {
    name: "Private Wedding Client",
    email: "wedding.client@example.com",
    phone: "+91 98290 12345",
    service: "Wedding Photography",
    preferred_date: "2026-11-20",
    message: "Planning a 3-day royal destination wedding celebration at Rambagh Palace Jaipur. Looking for full candid documentary coverage.",
    status: "new",
    notes: "VIP inquiry received via website contact portal."
  },
  {
    name: "Executive Portrait Client",
    email: "editorial.client@example.com",
    phone: "+91 98201 54321",
    service: "Portrait Photography",
    preferred_date: "2026-10-28",
    message: "Looking for an editorial leadership portrait session for my venture capital firm publication.",
    status: "contacted",
    notes: "Discussed wardrobe recommendations over WhatsApp."
  },
  {
    name: "Rajasthan Polo Club",
    email: "tournaments@rajasthanpolo.com",
    phone: "+91 141 2385500",
    service: "Sports Photography",
    preferred_date: "2026-12-05",
    message: "Invitation to cover the Jaipur Polo Season championship match and rider portraits.",
    status: "confirmed",
    notes: "Confirmed schedule for SMS Stadium Polo Ground."
  }
];

async function setupDatabase() {
  console.log('Connecting to Supabase PostgreSQL...');
  await client.connect();
  console.log('Connected! Creating database schema...');

  // 1. Create tables
  await client.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS portfolio_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      aspect_ratio TEXT DEFAULT 'landscape',
      location TEXT,
      year TEXT,
      description TEXT,
      featured BOOLEAN DEFAULT true,
      order_index INT DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      tagline TEXT,
      description TEXT,
      image_url TEXT NOT NULL,
      duration TEXT,
      delivery_time TEXT,
      deliverables JSONB DEFAULT '[]'::jsonb,
      detailed_description TEXT,
      ideal_for TEXT,
      starting_price_inr INT DEFAULT 25000,
      order_index INT DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS studio_settings (
      id TEXT PRIMARY KEY DEFAULT 'default',
      studio_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      whatsapp_number TEXT NOT NULL,
      address TEXT NOT NULL,
      hindi_address TEXT,
      working_hours TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log('Tables created successfully!');

  // 2. Setup RLS
  await client.query(`
    ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
    ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
    ALTER TABLE services ENABLE ROW LEVEL SECURITY;
    ALTER TABLE studio_settings ENABLE ROW LEVEL SECURITY;

    DO $$
    BEGIN
      DROP POLICY IF EXISTS "Public read portfolio" ON portfolio_items;
      DROP POLICY IF EXISTS "Public all portfolio" ON portfolio_items;
      DROP POLICY IF EXISTS "Public read services" ON services;
      DROP POLICY IF EXISTS "Public all services" ON services;
      DROP POLICY IF EXISTS "Public read studio_settings" ON studio_settings;
      DROP POLICY IF EXISTS "Public all studio_settings" ON studio_settings;
      DROP POLICY IF EXISTS "Public insert inquiries" ON inquiries;
      DROP POLICY IF EXISTS "Public read inquiries" ON inquiries;
      DROP POLICY IF EXISTS "Public update inquiries" ON inquiries;
      DROP POLICY IF EXISTS "Public all inquiries" ON inquiries;
    END $$;

    CREATE POLICY "Public all portfolio" ON portfolio_items FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Public all services" ON services FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Public all studio_settings" ON studio_settings FOR ALL USING (true) WITH CHECK (true);
    CREATE POLICY "Public all inquiries" ON inquiries FOR ALL USING (true) WITH CHECK (true);
  `);
  console.log('Row Level Security & policies configured!');

  // 3. Seed portfolio items
  console.log('Seeding portfolio items...');
  for (const item of PORTFOLIO_ITEMS) {
    await client.query(`
      INSERT INTO portfolio_items (id, title, category, image_url, aspect_ratio, location, year, description, order_index)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        image_url = EXCLUDED.image_url,
        aspect_ratio = EXCLUDED.aspect_ratio,
        location = EXCLUDED.location,
        year = EXCLUDED.year,
        description = EXCLUDED.description,
        order_index = EXCLUDED.order_index;
    `, [
      item.id,
      item.title,
      item.category,
      item.imageUrl,
      item.aspectRatio,
      item.location,
      item.year,
      item.description,
      item.orderIndex
    ]);
  }

  // 4. Seed services
  console.log('Seeding services...');
  for (const s of SERVICES) {
    await client.query(`
      INSERT INTO services (id, title, tagline, description, image_url, duration, delivery_time, deliverables, detailed_description, ideal_for, starting_price_inr, order_index)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        image_url = EXCLUDED.image_url,
        duration = EXCLUDED.duration,
        delivery_time = EXCLUDED.delivery_time,
        deliverables = EXCLUDED.deliverables,
        detailed_description = EXCLUDED.detailed_description,
        ideal_for = EXCLUDED.ideal_for,
        starting_price_inr = EXCLUDED.starting_price_inr,
        order_index = EXCLUDED.order_index;
    `, [
      s.id,
      s.title,
      s.tagline,
      s.description,
      s.imageUrl,
      s.duration,
      s.deliveryTime,
      JSON.stringify(s.deliverables),
      s.detailedDescription,
      s.idealFor,
      s.startingPriceInr,
      s.orderIndex
    ]);
  }

  // 5. Seed studio settings
  console.log('Seeding studio settings...');
  await client.query(`
    INSERT INTO studio_settings (id, studio_name, email, phone, whatsapp_number, address, hindi_address, working_hours)
    VALUES (
      'default',
      'Your Photography',
      'contact@yourphotography.com',
      '+91 98765 43210',
      '919876543210',
      'Second Floor, Room No. 215, RV2J+5PQ, Karolan Ka Barh, Shri Kishanpura, Jaipur, Rajasthan 302017',
      'कमरा नं. 215, द्वितीय तल, RV2J+5PQ, करोलां का बाड़, श्री किशनपुरा, जयपुर, राजस्थान 302017',
      'Monday – Saturday: 9:30 AM – 7:00 PM IST (Sunday by Appointment)'
    )
    ON CONFLICT (id) DO UPDATE SET
      studio_name = EXCLUDED.studio_name,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      whatsapp_number = EXCLUDED.whatsapp_number,
      address = EXCLUDED.address,
      hindi_address = EXCLUDED.hindi_address,
      working_hours = EXCLUDED.working_hours,
      updated_at = NOW();
  `);

  // 6. Seed sample inquiries if table is empty
  const inqCount = await client.query('SELECT COUNT(*) FROM inquiries;');
  if (parseInt(inqCount.rows[0].count, 10) === 0) {
    console.log('Seeding sample inquiries...');
    for (const inq of INITIAL_INQUIRIES) {
      await client.query(`
        INSERT INTO inquiries (name, email, phone, service, preferred_date, message, status, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
      `, [inq.name, inq.email, inq.phone, inq.service, inq.preferred_date, inq.message, inq.status, inq.notes]);
    }
  }

  // Check counts
  const pCount = await client.query('SELECT COUNT(*) FROM portfolio_items;');
  const sCount = await client.query('SELECT COUNT(*) FROM services;');
  const iCount = await client.query('SELECT COUNT(*) FROM inquiries;');
  console.log(`\n========================================`);
  console.log(`DATABASE SETUP COMPLETE:`);
  console.log(`Portfolio items: ${pCount.rows[0].count}`);
  console.log(`Services:        ${sCount.rows[0].count}`);
  console.log(`Inquiries:       ${iCount.rows[0].count}`);
  console.log(`========================================\n`);

  await client.end();
}

setupDatabase().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
