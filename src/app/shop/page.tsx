import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { ShopCatalogSection, HowToOrderSection } from "@/sections/Shop";
import { CategoriesSection } from "@/sections/Home/Categories";

export const metadata: Metadata = {
  title: "Shop Formulations | Safe Bio-Polymer Pet & Livestock Care",
  description:
    "Buy patented MammaryO teat dip, non-toxic pet sanitizers, cattle wound sprays, and floor hygiene solutions online directly from Ariviya Deep Tech.",
  keywords: [
    "Ariviya Shop",
    "Buy MammaryO",
    "Bovine Teat Dip Online",
    "Pet Safe Sanitizer India",
    "Organic Animal Healthcare",
    "Chemical Free Cattle Spray",
    "Dairy Farm Hygiene Products",
  ],
};

// Shop page is the B2C storefront: browse by animal, see prices, add to cart.
// Company story and B2B content live on Home and About; bulk buyers get a one-line link.
export default function ShopPage() {
  return (
    <>
      <CommonHero
        title="Our Products"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        subtitle="Patented green bio-polymer healthcare essentials for pets, dairy herds, and poultry"
      />
      <CategoriesSection />
      <ShopCatalogSection />
      <HowToOrderSection />
    </>
  );
}
