import React from "react";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PolicyPage, PolicySection, policyListClass } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Ariviyaa protects your personal information, inquiry records, and communications in accordance with applicable data privacy laws.",
  alternates: {
    canonical: "https://www.ariviyaa.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      subtitle="Learn how Ariviyaa protects your personal information, records, and inquiries"
      badge="Legal & Compliance"
      BadgeIcon={ShieldCheck}
      href="/privacy-policy"
      lastUpdated="October 2026"
      intro={
        <p>
          At <strong>Ariviyaa</strong> (Ariviyaa Bio-Innovations Hub), we respect your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how we collect, handle, and safeguard your
          details when you browse our catalog, submit product inquiries, or communicate with our technical desk.
        </p>
      }
      contact={{
        title: "5. Contact Us Regarding Privacy",
        intro: "If you have any questions or requests regarding your personal data or this policy, please reach out directly:",
        name: "Ariviyaa Bio-Innovations Hub",
      }}
    >
      <PolicySection title="1. Information We Collect">
        <p>
          When you interact with our website or contact our team via WhatsApp, phone, or email, we may collect the
          following information:
        </p>
        <ul className={policyListClass}>
          <li><strong>Contact Details:</strong> Your name, phone number, email address, and farm/clinic location.</li>
          <li><strong>Inquiry Specifics:</strong> Products of interest (e.g., MammaryO teat dip, Pet wound sprays, disinfectants), estimated livestock count, or specialized dosage requirements.</li>
          <li><strong>Technical Data:</strong> Standard browser session info, device type, and anonymous analytics to improve website usability.</li>
        </ul>
      </PolicySection>

      <PolicySection title="2. How We Use Your Information">
        <p>We strictly utilize the information collected for the following legitimate purposes:</p>
        <ul className={policyListClass}>
          <li>Providing customized product quotations, technical brochures, and application guidelines.</li>
          <li>Coordinating batch dispatch, logistics tracking, and delivery confirmation.</li>
          <li>Addressing veterinary practitioner questions and dairy farmer feedback.</li>
          <li>Complying with statutory regulations and scientific reporting mandates.</li>
        </ul>
        <p className="t-body text-slate-600">
          <strong>We never sell, rent, or trade your personal or farm data to any third-party advertisers or marketing agencies.</strong>
        </p>
      </PolicySection>

      <PolicySection title="3. Communication via WhatsApp & Direct Phone">
        <p>
          Our primary inquiry desk operates through WhatsApp and direct phone consultation. By clicking &quot;Proceed to
          WhatsApp Checkout&quot; or &quot;Inquire Now&quot;, you initiate a direct encrypted chat with our representatives.
          You may choose to stop receiving updates at any time by simply informing us in the chat.
        </p>
      </PolicySection>

      <PolicySection title="4. Data Security">
        <p>
          We implement industry-standard technical and organizational security measures to protect your inquiries and
          contact details from unauthorized access, alteration, or disclosure.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
