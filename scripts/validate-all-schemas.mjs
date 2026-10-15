import http from "node:http";

const BASE_URL = process.env.TEST_URL || "http://localhost:3002";

const ROUTES_TO_TEST = [
  { name: "Homepage", path: "/" },
  { name: "About Page", path: "/about" },
  { name: "Contact Page", path: "/contact" },
  { name: "FAQ Page", path: "/faq" },
  { name: "Services Index", path: "/services" },
  { name: "Service: Portrait", path: "/services/portrait-photography" },
  { name: "Service: Wedding", path: "/services/wedding-photography" },
  { name: "Portfolio Index", path: "/portfolio" },
  { name: "Portfolio: Portraits", path: "/portfolio/portraits" },
  { name: "Locations Index", path: "/locations" },
  { name: "Location: Jaipur", path: "/locations/jaipur" },
  { name: "Location: New York", path: "/locations/new-york" },
  { name: "Blog Index", path: "/blog" },
  { name: "Blog Article", path: "/blog/what-to-wear-for-a-portrait-photoshoot" },
  { name: "Gear Hub", path: "/photography-gear" },
  { name: "Gear Detail: Sony A7 V", path: "/photography-gear/sony-a7-v" },
  { name: "Gear Detail: DJI Action 6", path: "/photography-gear/dji-osmo-action-6" },
  { name: "Gear Comparison", path: "/photography-gear/comparisons/sony-200-600mm-vs-sony-100-400mm" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms-and-conditions" },
];

async function fetchPageHtml(urlPath) {
  const res = await fetch(`${BASE_URL}${urlPath}`);
  if (res.status !== 200) {
    throw new Error(`HTTP ${res.status}`);
  }
  return await res.text();
}

function extractJsonLdSchemas(html) {
  const matches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const results = [];
  for (const m of matches) {
    try {
      const parsed = JSON.parse(m[1].trim());
      results.push({ raw: m[1], data: parsed, validJson: true });
    } catch (e) {
      results.push({ raw: m[1], error: e.message, validJson: false });
    }
  }
  return results;
}

function validateSchema(schema) {
  const issues = [];
  const warnings = [];

  if (!schema["@context"]) {
    issues.push("Missing '@context'");
  } else if (!schema["@context"].includes("schema.org")) {
    issues.push(`Invalid '@context': ${schema["@context"]}`);
  }

  const type = schema["@type"];
  if (!type) {
    issues.push("Missing '@type'");
    return { type: "Unknown", issues, warnings };
  }

  switch (type) {
    case "PhotographyBusiness":
    case "LocalBusiness": {
      if (!schema.name) issues.push("Missing 'name'");
      if (!schema.url) issues.push("Missing 'url'");
      if (!schema.address) issues.push("Missing 'address'");
      else {
        if (!schema.address.streetAddress) warnings.push("Missing address.streetAddress");
        if (!schema.address.addressLocality) warnings.push("Missing address.addressLocality");
        if (!schema.address.postalCode) warnings.push("Missing address.postalCode");
        if (!schema.address.addressCountry) warnings.push("Missing address.addressCountry");
      }
      if (!schema.geo) warnings.push("Missing 'geo' coordinates");
      if (!schema.telephone) warnings.push("Missing 'telephone'");
      if (!schema.openingHoursSpecification || schema.openingHoursSpecification.length === 0) {
        warnings.push("Missing 'openingHoursSpecification'");
      }
      break;
    }

    case "WebSite": {
      if (!schema.name) issues.push("Missing 'name'");
      if (!schema.url) issues.push("Missing 'url'");
      if (!schema.publisher) warnings.push("Missing 'publisher'");
      break;
    }

    case "WebPage": {
      if (!schema.name) issues.push("Missing 'name'");
      if (!schema.url) issues.push("Missing 'url'");
      if (!schema.description) warnings.push("Missing 'description'");
      break;
    }

    case "Service": {
      if (!schema.name) issues.push("Missing 'name'");
      if (!schema.provider) issues.push("Missing 'provider'");
      if (!schema.description) warnings.push("Missing 'description'");
      if (!schema.areaServed) warnings.push("Missing 'areaServed'");
      if (!schema.hasOfferCatalog) warnings.push("Missing 'hasOfferCatalog'");
      break;
    }

    case "Person": {
      if (!schema.name) issues.push("Missing 'name'");
      if (!schema.jobTitle) warnings.push("Missing 'jobTitle'");
      if (!schema.worksFor) warnings.push("Missing 'worksFor'");
      break;
    }

    case "FAQPage": {
      if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
        issues.push("FAQPage requires 'mainEntity' array");
      } else if (schema.mainEntity.length === 0) {
        issues.push("FAQPage 'mainEntity' array is empty");
      } else {
        schema.mainEntity.forEach((q, idx) => {
          if (q["@type"] !== "Question") issues.push(`FAQ #${idx + 1} type is not 'Question'`);
          if (!q.name) issues.push(`FAQ #${idx + 1} missing question 'name'`);
          if (!q.acceptedAnswer || q.acceptedAnswer["@type"] !== "Answer") {
            issues.push(`FAQ #${idx + 1} missing 'acceptedAnswer' of type 'Answer'`);
          } else if (!q.acceptedAnswer.text) {
            issues.push(`FAQ #${idx + 1} acceptedAnswer missing 'text'`);
          }
        });
      }
      break;
    }

    case "BreadcrumbList": {
      if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
        issues.push("BreadcrumbList requires 'itemListElement' array");
      } else if (schema.itemListElement.length === 0) {
        issues.push("BreadcrumbList 'itemListElement' is empty");
      } else {
        schema.itemListElement.forEach((item, idx) => {
          if (item["@type"] !== "ListItem") issues.push(`Breadcrumb #${idx + 1} type is not 'ListItem'`);
          if (typeof item.position !== "number") issues.push(`Breadcrumb #${idx + 1} missing numerical 'position'`);
          if (!item.name) issues.push(`Breadcrumb #${idx + 1} missing 'name'`);
          if (!item.item) issues.push(`Breadcrumb #${idx + 1} missing 'item' URL`);
        });
      }
      break;
    }

    case "BlogPosting":
    case "Article": {
      if (!schema.headline) issues.push("Missing 'headline'");
      if (!schema.author) issues.push("Missing 'author'");
      if (!schema.publisher) warnings.push("Missing 'publisher'");
      if (!schema.datePublished) warnings.push("Missing 'datePublished'");
      if (!schema.image) warnings.push("Missing 'image'");
      break;
    }

    case "ImageGallery": {
      if (!schema.name) issues.push("Missing 'name'");
      if (!schema.hasPart || !Array.isArray(schema.hasPart)) {
        issues.push("ImageGallery missing 'hasPart' array");
      } else {
        schema.hasPart.forEach((img, idx) => {
          if (img["@type"] !== "ImageObject") issues.push(`Image #${idx + 1} is not type 'ImageObject'`);
          if (!img.contentUrl) issues.push(`Image #${idx + 1} missing 'contentUrl'`);
        });
      }
      break;
    }

    default:
      warnings.push(`Unhandled schema type: '${type}'`);
  }

  return { type, issues, warnings };
}

async function runSchemaInspection() {
  console.log("==========================================================================");
  console.log(" COMPREHENSIVE SCHEMA.ORG & STRUCTURED DATA (JSON-LD) AUDIT");
  console.log(` Target Server: ${BASE_URL}`);
  console.log(` Routes Inspected: ${ROUTES_TO_TEST.length}`);
  console.log("==========================================================================\n");

  let totalSchemasChecked = 0;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (let i = 0; i < ROUTES_TO_TEST.length; i++) {
    const route = ROUTES_TO_TEST[i];
    const indexStr = `[${String(i + 1).padStart(2, "0")}/${ROUTES_TO_TEST.length}]`;

    try {
      const html = await fetchPageHtml(route.path);
      const extracted = extractJsonLdSchemas(html);

      if (extracted.length === 0) {
        console.log(`${indexStr} ❌ ${route.name.padEnd(25)} (${route.path}) -> No JSON-LD schemas found!`);
        totalErrors++;
        continue;
      }

      const typesList = [];
      let routeHasError = false;

      for (const item of extracted) {
        totalSchemasChecked++;
        if (!item.validJson) {
          console.log(`${indexStr} ❌ ${route.name} -> JSON Syntax Parse Error: ${item.error}`);
          totalErrors++;
          routeHasError = true;
          continue;
        }

        const validation = validateSchema(item.data);
        typesList.push(validation.type);

        if (validation.issues.length > 0) {
          routeHasError = true;
          totalErrors += validation.issues.length;
          console.log(`   ❌ Schema '${validation.type}' Issues:`);
          validation.issues.forEach((iss) => console.log(`      ↳ ${iss}`));
        }

        if (validation.warnings.length > 0) {
          totalWarnings += validation.warnings.length;
          // console.log(`   ⚠️ Schema '${validation.type}' Warnings:`, validation.warnings);
        }
      }

      if (!routeHasError) {
        console.log(
          `${indexStr} ✅ ${route.name.padEnd(25)} | Found ${extracted.length} Schema(s): [${typesList.join(", ")}]`
        );
      }
    } catch (err) {
      console.log(`${indexStr} ❌ ${route.name} (${route.path}) Fetch Error: ${err.message}`);
      totalErrors++;
    }
  }

  console.log("\n==========================================================================");
  console.log(" SCHEMA AUDIT SUMMARY");
  console.log("==========================================================================");
  console.log(` Total JSON-LD Schemas Verified : ${totalSchemasChecked}`);
  console.log(` Schema Errors Found            : ${totalErrors}`);
  console.log(` Schema Warnings / Optional     : ${totalWarnings}`);
  console.log(` Overall Compliance Status       : ${totalErrors === 0 ? "100% PERFECT SCHEMA COMPLIANCE" : "ATTENTION REQUIRED"}`);
  console.log("==========================================================================\n");
}

runSchemaInspection().catch(console.error);
