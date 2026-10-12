import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";

export const metadata = constructMetadata({
  title: "Terms and Conditions | Your Photography Studio",
  description:
    "Booking policies, retainer agreements, cancellation rules, copyright ownership, and client image usage rights.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  const webPageSchema = generateWebPageSchema(
    "/terms-and-conditions",
    "Terms and Conditions",
    "Commercial and private booking terms, copyright policies, and client usage licensing terms."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <Breadcrumbs
            items={[{ name: "Terms & Conditions", url: "/terms-and-conditions" }]}
          />

          <article className="py-10 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
                Legal & Governance
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#121212]">
                Terms & Conditions
              </h1>
              <p className="text-xs text-[#7B6955] font-sans">
                Last Updated: March 2026 • Governing Law: Jaipur, Rajasthan, India
              </p>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[#44382A] font-light leading-relaxed">
              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  1. Booking Reservations & Retainers
                </h2>
                <p>
                  To secure a specific calendar date, a signed client photography agreement and a non-refundable retainer deposit (typically 30–50% of the commission total) are required. Dates cannot be held provisionally without a deposit.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  2. Copyright & Image Usage Rights
                </h2>
                <p>
                  In accordance with the Indian Copyright Act, 1957 and international copyright conventions, {siteConfig.business.legalName} and {siteConfig.photographer.name} retain moral and intellectual property copyright to all photographic works created.
                </p>
                <p>
                  <strong>Private & Wedding Clients:</strong> Receive full personal reproduction rights for non-commercial printing, social media sharing, and family archiving.
                </p>
                <p>
                  <strong>Commercial Clients:</strong> Receive a contractual commercial usage license specifying allowable media distribution channels, geographic territory, and timeframes as outlined in their individual proposal.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  3. Rescheduling & Weather Contingencies
                </h2>
                <p>
                  For outdoor portrait and landscape shoots affected by severe adverse weather (heavy rain, extreme storms), sessions will be rescheduled to the earliest mutually agreed date at zero fee.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  4. Archival Storage & Delivery
                </h2>
                <p>
                  Digital files are delivered via high-resolution cloud download. Client galleries remain active online for a minimum of 24 months, with master backups maintained in redundant cold storage. Clients are advised to download and maintain local duplicates of their full delivered archive.
                </p>
              </section>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
