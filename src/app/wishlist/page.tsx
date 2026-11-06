"use client";

import React from "react";
import { CommonHero } from "@/components/CommonHero";
import { WishlistGrid } from "@/components/WishlistGrid";

export default function WishlistPage() {
  return (
    <>
      <CommonHero
        title="Wishlist"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Wishlist" }]}
        subtitle="Products you've saved to compare or order later"
      />

      <section className="w-full bg-white py-10 sm:py-14 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WishlistGrid />
        </div>
      </section>
    </>
  );
}
