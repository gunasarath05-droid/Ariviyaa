import React from "react";
import { HeroSection } from "@/sections/Home/HeroSection";
import { CategoriesSection } from "@/sections/Home/CategoriesSection";
import { PopularPicksSection } from "@/sections/Home/PopularPicksSection";
import { WhyChooseUsSection } from "@/sections/Home/WhyChooseUsSection";
import { FilteredCatalogSection } from "@/sections/Home/FilteredCatalogSection";
import { PetCareBannerSection } from "@/sections/Home/PetCareBannerSection";
import { FaqSection } from "@/sections/Home/FaqSection";
import { ContactSection } from "@/sections/Home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <PopularPicksSection />
      <WhyChooseUsSection />
      <FilteredCatalogSection />
      <PetCareBannerSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
