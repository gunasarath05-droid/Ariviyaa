import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { AccountShell } from "@/components/AccountShell";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = {
  title: "Account Details",
  description: "Update your name, mobile number, business details and password.",
  robots: { index: false },
};

export default function AccountProfilePage() {
  return (
    <>
      <CommonHero
        title="Account Details"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Account Details" },
        ]}
      />
      <AccountShell>
        <ProfileForm />
      </AccountShell>
    </>
  );
}
