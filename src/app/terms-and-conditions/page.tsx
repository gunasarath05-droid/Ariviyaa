import React from "react";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PolicyPage, PolicySection, policyListClass } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms, order inquiry guidelines, and conditions of use for Ariviyaa veterinary products and digital platforms.",
  alternates: {
    canonical: "https://www.ariviyaa.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      subtitle="Review the terms, order guidelines, and conditions of use for Ariviyaa platforms"
      badge="Agreement & Guidelines"
      BadgeIcon={FileText}
      href="/terms-and-conditions"
      lastUpdated="October 2026"
      intro={
        <p>
          Welcome to <strong>Ariviyaa</strong>. By browsing our website, submitting inquiries, or ordering our green
          nanobio-polymer veterinary formulations, you agree to comply with and be bound by the following terms and
          conditions.
        </p>
      }
      contact={{ title: "6. Queries & Support", name: "Ariviyaa Legal & Sales Desk" }}
    >
      <PolicySection title="1. Commercial Inquiries & Quotations">
        <p>
          Ariviyaa manufactures specialized biological veterinary solutions. Products listed on this website represent
          formulations developed for commercial dairy farms, veterinary clinics, pet parents, and institutional
          cooperatives.
        </p>
        <ul className={policyListClass}>
          <li>Product availability, bulk packaging tiers, and final quotations are confirmed directly through authorized representatives on WhatsApp, email, or telephone.</li>
          <li>Placing an inquiry through our shopping cart or contact forms does not create a binding sales contract until confirmed by our dispatch department.</li>
        </ul>
      </PolicySection>

      <PolicySection title="2. Intellectual Property Rights">
        <p>
          All trademarks, patents, proprietary formulation brands (including <strong>Naxpoly®</strong>,{" "}
          <strong>MammaryO</strong>, <strong>AnimSpray</strong>, and <strong>Tiksha</strong>), scientific literature,
          research validation summaries, graphics, and logos displayed on this site are the exclusive intellectual
          property of Ariviyaa. Unauthorized reproduction or reverse engineering is strictly prohibited.
        </p>
      </PolicySection>

      <PolicySection title="3. Dispatch & Delivery Terms">
        <p>
          Orders confirmed with our sales desk are dispatched directly from our certified manufacturing laboratories.
          Delivery transit timelines may vary based on carrier logistics, destination remoteness, and batch fresh
          synthesis schedules. Tracking details are provided upon courier handover.
        </p>
      </PolicySection>

      <PolicySection title="4. Product Handling & Storage">
        <p>
          Purchasers and handlers are responsible for following specified storage conditions (e.g., store in cool, dry
          areas away from direct sunlight, maintain sealed caps). Ariviyaa is not responsible for product degradation
          resulting from improper on-farm storage or contamination.
        </p>
      </PolicySection>

      <PolicySection title="5. Governing Law & Jurisdiction">
        <p>
          These Terms &amp; Conditions are governed by the laws of India. Any disputes arising from transactions or
          inquiries shall be subject to the exclusive jurisdiction of the competent courts in Tamil Nadu, India.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
