import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import {
  ContactHero,
  ContactFormSection,
  FaqSection,
} from "@/sections/Contact";

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
      <CommonHero
        title="Contact Us"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        subtitle="Customer Care, Dealership Inquiries & Institutional Investor Desk"
      />
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
