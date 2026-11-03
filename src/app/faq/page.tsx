import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { FaqBrowser } from "@/sections/Faq/FaqBrowser";
import { CtaSection } from "@/sections/Home/Cta";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Ariviya products, ordering and Razorpay payments, Shiprocket and ST Courier delivery, returns and refunds, and becoming a distributor.",
  alternates: { canonical: "https://www.ariviyaa.com/faq" },
};

export default function FaqPage() {
  return (
    <>
      <CommonHero
        title="Frequently Asked Questions"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        subtitle="Products, orders, delivery, returns and business enquiries — all in one place"
      />
      <FaqBrowser />
      <CtaSection />
    </>
  );
}
