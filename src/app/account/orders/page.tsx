import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { AccountShell } from "@/components/AccountShell";
import { OrderHistory } from "./OrderHistory";

export const metadata: Metadata = {
  title: "Order History",
  description: "Track shipments, download invoices, reorder and request returns for your Ariviyaa orders.",
  robots: { index: false },
};

export default function OrderHistoryPage() {
  return (
    <>
      <CommonHero
        title="Order History"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Orders" },
        ]}
      />
      <AccountShell>
        <OrderHistory />
      </AccountShell>
    </>
  );
}
