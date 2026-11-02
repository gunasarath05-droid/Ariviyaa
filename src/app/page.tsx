import React from "react";
import { HeroSection } from "@/sections/Home/Hero";
import { ProofStripSection } from "@/sections/Home/ProofStrip";
import { FlagshipSection } from "@/sections/Home/Flagship";
import { ProductVideoSection } from "@/sections/Home/ProductVideo";
import { WhoWeServeSection } from "@/sections/Home/WhoWeServe";
import { InvestorHighlights } from "@/sections/About/InvestorHighlights";
import {
  ScienceFromThanjavurSection,
  TeamBehindAriviyaaSection,
} from "@/sections/Home/AboutUs";
import { WhereOurScienceRecognisedSection } from "@/sections/Home/Events";
import { FaqSection } from "@/sections/Home/Faq";
import { CtaSection } from "@/sections/Home/Cta";
import { ContactSection } from "@/sections/Home/Contact";

// Home page targets B2B buyers and investors, with MammaryO as the hero product.
// Retail browsing (categories, product carousel, cart) lives on /shop.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofStripSection />
      <FlagshipSection />
      <ProductVideoSection />
      <WhoWeServeSection />
      <InvestorHighlights />
      <ScienceFromThanjavurSection />
      <WhereOurScienceRecognisedSection />
      <TeamBehindAriviyaaSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
