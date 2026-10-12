import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { constructMetadata } from "@/lib/metadata";
import { generateWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/config/siteConfig";
import { fetchStudioSettings } from "@/lib/supabase";

export const metadata = constructMetadata({
  title: "Terms and Conditions | Photography Studio Policies",
  description:
    "Booking policies, retainer agreements, cancellation rules, copyright ownership, and client image usage rights.",
  path: "/terms-and-conditions",
});

export default async function TermsAndConditionsPage() {
  const settings = await fetchStudioSettings();

  const studioName = settings?.studio_name || siteConfig.business.legalName;
  const photographerName = settings?.photographer_name || siteConfig.photographer.name;
  const jurisdiction = settings?.governing_jurisdiction || "Jaipur, Rajasthan, India";
  const retainerPercent = settings?.booking_retainer_percent || "30–50%";
  const cancellationPolicy =
    settings?.cancellation_policy ||
    "For outdoor portrait and landscape shoots affected by severe adverse weather (heavy rain, extreme storms), sessions will be rescheduled to the earliest mutually agreed date at zero fee.";
  const customTerms = settings?.terms_conditions_custom?.trim() || "";

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
                Legal &amp; Governance
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#121212]">
                Terms &amp; Conditions
              </h1>
              <p className="text-xs text-[#7B6955] font-sans">
                Last Updated: March 2026 • Governing Law: {jurisdiction}
              </p>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[#44382A] font-light leading-relaxed">
              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  1. Booking Reservations &amp; Retainers
                </h2>
                <p>
                  To secure a specific calendar date, a signed client photography agreement and a non-refundable retainer deposit (typically {retainerPercent} of the commission total) are required. Dates cannot be held provisionally without a deposit.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  2. Copyright &amp; Image Usage Rights
                </h2>
                <p>
                  In accordance with the Indian Copyright Act, 1957 and international copyright conventions, {studioName} and {photographerName} retain moral and intellectual property copyright to all photographic works created.
                </p>
                <p>
                  <strong>Private &amp; Wedding Clients:</strong> Receive full personal reproduction rights for non-commercial printing, social media sharing, and family archiving.
                </p>
                <p>
                  <strong>Commercial Clients:</strong> Receive a contractual commercial usage license specifying allowable media distribution channels, geographic territory, and timeframes as outlined in their individual proposal.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  3. Rescheduling &amp; Weather Contingencies
                </h2>
                <p>{cancellationPolicy}</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  4. Archival Storage &amp; Delivery
                </h2>
                <p>
                  Digital files are delivered via high-resolution cloud download. Client galleries remain active online for a minimum of 24 months, with master backups maintained in redundant cold storage. Clients are advised to download and maintain local duplicates of their full delivered archive.
                </p>
              </section>

              {customTerms && (
                <section className="space-y-3 p-6 bg-white border border-[#E8DED0]">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                    5. Special Studio Clauses &amp; Policy Addenda
                  </h2>
                  <div className="text-xs sm:text-sm text-[#554837] whitespace-pre-line leading-relaxed">
                    {customTerms}
                  </div>
                </section>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
