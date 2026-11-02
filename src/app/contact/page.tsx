import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ContactHero, ContactFormSection } from "@/sections/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Customer Care, Dealership & Investor Desk",
  description:
    "Get in touch with Ariviya Deep Tech Pvt. Ltd. Contact our veterinary experts, wholesale distributor desk, or investor relations team in Thanjavur, Tamil Nadu.",
  keywords: [
    "Contact Ariviya",
    "Ariviya Deep Tech Phone Number",
    "Thanjavur Veterinary Biotech Office",
    "MammaryO Teat Dip Dealership",
    "Veterinary Product Distributor Tamil Nadu",
    "Ariviya Investor Relations",
  ],
};

export default function ContactPage() {
  return (
    <>
      {/* Contact uses its own dark hero with an overlapping contact-info card */}
      <ContactHero />
      {/* Suspense is required because the form reads ?type= / ?role= from the URL */}
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <ContactFormSection />
      </Suspense>
    </>
  );
}
