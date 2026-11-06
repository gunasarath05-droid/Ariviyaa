import React from "react";
import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { PolicyPage, PolicySection } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important veterinary guidance and scientific disclaimer regarding Ariviyaa nanobio-polymer veterinary formulations.",
  alternates: {
    canonical: "https://www.ariviyaa.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <PolicyPage
      title="Disclaimer"
      subtitle="Scientific and veterinary notice regarding Ariviyaa bio-polymer healthcare formulations"
      badge="Scientific & Veterinary Notice"
      BadgeIcon={AlertCircle}
      href="/disclaimer"
      lastUpdated="October 2026"
      intro={
        <p>
          Please carefully read this Disclaimer regarding the use of <strong>Ariviyaa</strong> veterinary products,
          scientific research summaries, and informational content provided on this platform.
        </p>
      }
      contact={{
        title: "5. Contact for Technical Clarification",
        intro: "For technical queries regarding laboratory trial reports or application instructions:",
        name: "Ariviyaa Technical Advisory Board",
      }}
    >
      <PolicySection title="1. Not a Substitute for Professional Veterinary Diagnosis">
        <p>
          Information published on this website — including descriptions of bovine mastitis prevention, wound healing
          polymers, bio-sanitizers, and tick repellents — is intended for educational, technical, and informational
          purposes only.
        </p>
        {/* Amber is kept here on purpose: it is a warning notice */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-950 t-body">
          <strong>Notice:</strong> This content is not intended to replace consultation, clinical examination, or
          specific treatment prescribed by a licensed veterinary practitioner. Always consult a qualified veterinary
          doctor for acute clinical emergencies or systemic infections.
        </div>
      </PolicySection>

      <PolicySection title="2. Clinical Validation & Academic Testing">
        <p>
          Product claims, laboratory efficacy metrics, and antimicrobial barrier percentages cited on this website are
          derived from controlled scientific evaluations, including testing conducted with <strong>TANUVAS-TRPVB</strong>{" "}
          and independent laboratories.
        </p>
        <p className="t-body text-slate-600">
          Actual on-farm results may vary depending on herd management hygiene, environmental pathogen load, application
          frequency, farm climate, and pre-existing animal health conditions.
        </p>
      </PolicySection>

      <PolicySection title="3. Topical & Lick-Safe Clarification">
        <p>
          Our companion animal and dairy cow bio-polymer formulations are certified non-toxic and engineered to be safe
          even if licked during normal grooming. However, our topical products (sprays, teat barriers, shampoos) are
          formulated for external physiological application and are not intended for internal dietary feeding or
          intravenous injection.
        </p>
      </PolicySection>

      <PolicySection title="4. External Links & Third-Party Mentions">
        <p>
          Any links to research portals, university announcements, or government startup grants are provided solely for
          user reference. Ariviyaa does not endorse or take responsibility for the continuous availability or accuracy of
          external third-party servers.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
