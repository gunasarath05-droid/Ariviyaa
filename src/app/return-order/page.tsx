import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { ReturnOrderForm } from "./ReturnOrderForm";

export const metadata: Metadata = {
  title: "Return an Order",
  description:
    "Request a return or replacement for a damaged, wrong or missing Ariviyaa product. Free reverse pickup and refund to your original payment method.",
  alternates: { canonical: "https://www.ariviyaa.com/return-order" },
};

export default function ReturnOrderPage() {
  return (
    <>
      <CommonHero
        title="Return an Order"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Return an Order" }]}
        subtitle="Damaged, wrong or missing item? Raise a return in three quick steps"
      />
      {/* useSearchParams (?order=) needs a Suspense boundary */}
      <Suspense fallback={<div className="min-h-[60vh] bg-[#F5F7FC]" />}>
        <ReturnOrderForm />
      </Suspense>
    </>
  );
}
