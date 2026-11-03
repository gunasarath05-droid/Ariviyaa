import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { RotateCcw, ArrowRight } from "lucide-react";
import { PolicyPage, PolicySection } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Refund, Returns & Cancellation Policy",
  description:
    "How returns, refunds and order cancellations work for Ariviya products bought online — return window, refund timelines and how to raise a request.",
  alternates: { canonical: "https://www.ariviyaa.com/refund-policy" },
};

const listClass = "list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-sm";

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund & Returns"
      subtitle="Returns, refunds and cancellations for orders placed on ariviyaa.com"
      badge="Orders & Payments"
      BadgeIcon={RotateCcw}
      href="/refund-policy"
      intro={
        <p>
          We want every order from <strong>Ariviya</strong> to reach you in perfect condition. If something
          goes wrong — a damaged bottle, a wrong product or a missing item — this policy explains how we make it
          right.
        </p>
      }
    >
      <PolicySection title="1. Return Window">
        <p>
          You can request a return within <strong>7 days of delivery</strong> for the following reasons:
        </p>
        <ul className={listClass}>
          <li>Product received damaged, leaking or with a broken seal.</li>
          <li>Wrong product or wrong pack size delivered.</li>
          <li>Item missing from the parcel.</li>
          <li>Product expired or delivered with less than 3 months of shelf life.</li>
        </ul>
        <p className="text-sm text-slate-600">
          Please record a short unboxing video or take photos of the parcel and product — this helps us approve your
          request quickly.
        </p>
      </PolicySection>

      <PolicySection title="2. Non-Returnable Items">
        <p>For hygiene and safety reasons, the following cannot be returned:</p>
        <ul className={listClass}>
          <li>Opened or partially used products, unless they were defective on arrival.</li>
          <li>Products damaged due to improper storage or use after delivery.</li>
          <li>Bulk and custom B2B orders, which are governed by the terms in the purchase order.</li>
        </ul>
      </PolicySection>

      <PolicySection title="3. How to Raise a Return">
        <ol className="list-decimal list-inside space-y-1.5 pl-2 text-slate-600 text-sm">
          <li>Go to the Return Order page and enter your order number and registered phone number.</li>
          <li>Select the items and the reason, and upload photos.</li>
          <li>Our team reviews the request within 2 working days.</li>
          <li>Once approved, a reverse pickup is scheduled through our courier partner.</li>
        </ol>
        <Link
          href="/return-order"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline"
        >
          Request a return <ArrowRight className="w-4 h-4" />
        </Link>
      </PolicySection>

      <PolicySection title="4. Refunds">
        <ul className={listClass}>
          <li>
            <strong>Online payments (Razorpay — UPI, cards, net banking, wallets):</strong> refunded to the original
            payment method within <strong>5–7 working days</strong> after the returned item passes our quality check.
          </li>
          <li>
            <strong>Cash on Delivery:</strong> refunded to your bank account or UPI ID within 5–7 working days. We will
            ask for these details when approving your return.
          </li>
          <li>Shipping and COD charges are refunded only when the return is due to our error.</li>
          <li>Where possible, we may offer a free replacement instead of a refund.</li>
        </ul>
      </PolicySection>

      <PolicySection title="5. Order Cancellation">
        <ul className={listClass}>
          <li>Orders can be cancelled free of charge before they are packed. Use your account or contact us.</li>
          <li>Once shipped, an order cannot be cancelled — you can refuse delivery or raise a return after delivery.</li>
          <li>Refunds for cancelled prepaid orders are processed within 5–7 working days.</li>
        </ul>
      </PolicySection>
    </PolicyPage>
  );
}
