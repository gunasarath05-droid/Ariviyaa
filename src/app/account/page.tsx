import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { AccountShell } from "@/components/AccountShell";
import { AccountDashboard } from "./AccountDashboard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your Ariviyaa orders, addresses, business details and saved products.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <>
      <CommonHero
        title="My Account"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account" }]}
      />
      <AccountShell>
        <AccountDashboard />
      </AccountShell>
    </>
  );
}
