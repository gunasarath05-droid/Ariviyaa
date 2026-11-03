import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { GallerySection } from "@/sections/Media";
import { CtaSection } from "@/sections/Home/Cta";

export const metadata: Metadata = {
  title: "Media Gallery & Awards | Visual Milestones & Recognitions",
  description:
    "Explore photos and visual documentation of Ariviya Deep Tech's awards (StartupTN TANSEED 3.0, Dettol Innovate With Purpose, Kuberan's House), lab research, and field demonstrations.",
  keywords: [
    "Ariviya Gallery",
    "StartupTN TANSEED Awards Photos",
    "Dettol Innovate With Purpose Winner",
    "Thanjavur Biotech Lab Photos",
    "MammaryO Teat Dip Demonstration",
  ],
};

export default function GalleryPage() {
  return (
    <>
      <CommonHero
        title="Media & Gallery"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        subtitle="Visual documentation of our lab breakthroughs, awards, and field demonstrations"
      />
      <GallerySection />
      <CtaSection />
    </>
  );
}
