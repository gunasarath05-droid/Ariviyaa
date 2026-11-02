import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { IMAGES } from "@/constants/images";
import {
  InvestorHighlights,
  ScienceFromThanjavurSection,
  AchievementsAwardsSection,
  WhereOurScienceRecognisedSection,
  TeamBehindAriviyaaSection,
  WhyChooseUsSection,
} from "@/sections/About";
import { FlagshipSection } from "@/sections/Home/Flagship";
import { FaqSection } from "@/sections/Home/Faq";
import { CtaSection } from "@/sections/Home/Cta";

export const metadata: Metadata = {
  title: "About Us | Deep-Tech Veterinary Nanotechnology & Investor Credentials",
  description:
    "Learn about Ariviya Deep Tech Pvt. Ltd. — founded in Thanjavur, supported by StartupTN TANSEED 3.0, developing patented chemical-free bio-polymer healthcare for dairy, poultry, and pets.",
  keywords: [
    "Ariviya Deep Tech",
    "Thanjavur Biotech Startup",
    "StartupTN TANSEED 3.0",
    "NaxPoly Technology",
    "Veterinary Nanotechnology",
    "TANUVAS Clinical Trials",
    "Bovine Mastitis Defense",
    "Animal Healthcare Investors",
  ],
};

export default function AboutPage() {
  return (
    <>
      <CommonHero
        image={IMAGES.events.vanakkamStartups}
        imagePosition="center top"
        title="About Us"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        subtitle="Pioneering Green Bio-Polymer Nanotechnology for Sustainable Animal Healthcare"
      />
      <ScienceFromThanjavurSection />
      <WhyChooseUsSection />
      <InvestorHighlights />
      <AchievementsAwardsSection />
      <WhereOurScienceRecognisedSection />
      <TeamBehindAriviyaaSection />
      <FlagshipSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
