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
  title: "Privacy Policy | Client Data Protection",
  description:
    "Transparent explanation of how customer contact information and photoshoot booking data are protected and handled.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const settings = await fetchStudioSettings();

  const studioName = settings?.studio_name || siteConfig.business.legalName;
  const email = settings?.email || siteConfig.business.email;
  const customPrivacy = settings?.privacy_policy_custom?.trim() || "";

  const webPageSchema = generateWebPageSchema(
    "/privacy-policy",
    "Privacy Policy",
    "Client data protection policy and privacy commitments of Your Photography Studio."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#121212]">
      <JsonLd data={webPageSchema} />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy-policy" }]} />

          <article className="py-10 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#7B6955] font-sans font-medium">
                Legal &amp; Trust
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#121212]">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#7B6955] font-sans">
                Last Updated: March 2026 • Effective Date: January 1, 2026
              </p>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[#44382A] font-light leading-relaxed">
              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  1. Our Commitment to Your Privacy
                </h2>
                <p>
                  At {studioName}, we recognize that planning a photoshoot involves sharing personal details and memorable milestones. We treat your personal data with the same care and respect that we dedicate to your photographs.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  2. Information We Collect
                </h2>
                <p>
                  We only collect information directly provided by you through our website booking form, direct email, telephone, or WhatsApp inquiries. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Full name and contact details (email address and phone number).</li>
                  <li>Event or photoshoot dates, location details, and service preferences.</li>
                  <li>Creative project notes and visual preferences.</li>
                </ul>
                <p>
                  We do not collect sensitive biometric data, and we do not sell or trade personal information to third-party marketing companies.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  3. How Your Information Is Used
                </h2>
                <p>
                  Your information is utilized exclusively for legitimate business purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>To verify studio calendar availability and schedule consultations.</li>
                  <li>To prepare custom proposals, agreements, and invoices.</li>
                  <li>To deliver high-resolution digital proofing galleries and print orders.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  4. Image Privacy &amp; Model Releases
                </h2>
                <p>
                  We never publish images from private family sessions, portrait clients, or confidential corporate productions without explicit prior consent or an executed model release agreement.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                  5. Contacting Us
                </h2>
                <p>
                  For any questions regarding this Privacy Policy or to request the deletion of your contact information, please email us at{" "}
                  <a href={`mailto:${email}`} className="text-[#121212] underline font-medium">
                    {email}
                  </a>.
                </p>
              </section>

              {customPrivacy && (
                <section className="space-y-3 p-6 bg-white border border-[#E8DED0]">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#121212]">
                    6. Additional Privacy &amp; Data Protections
                  </h2>
                  <div className="text-xs sm:text-sm text-[#554837] whitespace-pre-line leading-relaxed">
                    {customPrivacy}
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
