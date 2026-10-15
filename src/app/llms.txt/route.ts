import { NextResponse } from "next/server";
import { siteConfig } from "@/config/siteConfig";
import { SERVICES_DATA } from "@/data/servicesData";
import { GEAR_ITEMS, GEAR_COMPARISONS } from "@/data/gearData";

export async function GET() {
  const content = `# ${siteConfig.business.tradingName} - Photography Studio

> ${siteConfig.brandTagline}
> ${siteConfig.brandSubtitle}

## Business Overview
- Legal Entity: ${siteConfig.business.legalName}
- Principal Photographer: ${siteConfig.photographer.name} (${siteConfig.photographer.experienceYears} experience)
- Studio Location: ${siteConfig.business.address.streetAddress}, ${siteConfig.business.address.addressLocality}, ${siteConfig.business.address.addressRegion} ${siteConfig.business.address.postalCode}
- Primary Service Areas: ${siteConfig.business.serviceAreas.join(", ")}
- Official Website: ${siteConfig.baseUrl}
- Official Contact: ${siteConfig.business.email} | ${siteConfig.business.phone}
- Direct WhatsApp: https://wa.me/${siteConfig.business.whatsappNumber}

## Core Photography Services
${SERVICES_DATA.map(
  (s) => `- [${s.title}](${siteConfig.baseUrl}/services/${s.slug}): ${s.shortDescription}`
).join("\n")}

## Key Portfolio Collections
- Portraits: ${siteConfig.baseUrl}/portfolio/portraits
- Weddings: ${siteConfig.baseUrl}/portfolio/weddings
- Events: ${siteConfig.baseUrl}/portfolio/events
- Sports: ${siteConfig.baseUrl}/portfolio/sports
- Nature & Wildlife: ${siteConfig.baseUrl}/portfolio/nature-wildlife
- Travel: ${siteConfig.baseUrl}/portfolio/travel

## Educational Guides & Resources
- What to Wear for a Portrait Photoshoot: ${siteConfig.baseUrl}/blog/what-to-wear-for-a-portrait-photoshoot
- How to Choose a Wedding Photographer: ${siteConfig.baseUrl}/blog/how-to-choose-a-wedding-photographer
- Commercial Photography Licensing: ${siteConfig.baseUrl}/blog/understanding-commercial-photography-licensing
- High-Speed Sports Action Techniques: ${siteConfig.baseUrl}/blog/capturing-high-speed-sports-action-techniques

## Photography Equipment & Gear Guides
- Main Gear Showcase: ${siteConfig.baseUrl}/photography-gear
${GEAR_ITEMS.map((g) => `- [${g.name} Review](${siteConfig.baseUrl}/photography-gear/${g.slug}): ${g.tagline || g.description}`).join("\n")}
${GEAR_COMPARISONS.map((c) => `- [${c.title}](${siteConfig.baseUrl}/photography-gear/comparisons/${c.slug}): ${c.description}`).join("\n")}

## Studio Locations & Coverage
- Global Locations Directory: ${siteConfig.baseUrl}/locations
- Jaipur Flagship Studio (Rajasthan, India): ${siteConfig.baseUrl}/locations/jaipur
- New York Destination Base (USA): ${siteConfig.baseUrl}/locations/new-york

## Booking & Inquiries
Sessions are scheduled by advance consultation. To check calendar availability or obtain a tailored proposal, visit:
${siteConfig.baseUrl}/contact
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
