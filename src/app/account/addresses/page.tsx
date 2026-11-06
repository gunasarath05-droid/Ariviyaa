import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { AccountShell } from "@/components/AccountShell";
import { AddressBook } from "./AddressBook";

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage delivery and pickup addresses saved to your Ariviyaa account.",
  robots: { index: false },
};

export default function AccountAddressesPage() {
  return (
    <>
      <CommonHero
        title="Addresses"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Addresses" },
        ]}
      />
      <AccountShell>
        <AddressBook />
      </AccountShell>
    </>
  );
}
