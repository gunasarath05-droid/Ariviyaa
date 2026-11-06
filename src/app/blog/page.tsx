import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { BlogSection } from "@/sections/Media";
import { CtaSection } from "@/sections/Home/Cta";

export const metadata: Metadata = {
  title: "Veterinary & Dairy Science Blog | Articles & Knowledge Base",
  description:
    "Read veterinary science guides on bovine mastitis control, safe pet grooming, natural biopolymers, and dairy farm management by Ariviyaa Deep Tech scientists.",
  keywords: [
    "Ariviyaa Blog",
    "Bovine Mastitis Guide",
    "Post Milking Teat Dip Importance",
    "Pet Safe Natural Cleaner",
    "Poultry Shed Disinfection",
    "Nanotechnology in Animal Health",
  ],
};

export default function BlogPage() {
  return (
    <>
      <CommonHero
        title="Science & Blog"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        subtitle="Articles and field guides by veterinary doctors, research scientists, and livestock healthcare experts"
      />
      <BlogSection />
      <CtaSection />
    </>
  );
}
