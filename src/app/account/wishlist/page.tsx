import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { AccountShell } from "@/components/AccountShell";
import { WishlistGrid } from "@/components/WishlistGrid";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Products you saved to your Ariviyaa account.",
  robots: { index: false },
};

export default function AccountWishlistPage() {
  return (
    <>
      <CommonHero
        title="Wishlist"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Wishlist" },
        ]}
      />
      <AccountShell>
        <WishlistGrid columns="lg:grid-cols-3" />
      </AccountShell>
    </>
  );
}
