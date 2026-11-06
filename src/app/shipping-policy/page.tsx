import React from "react";
import type { Metadata } from "next";
import { Truck } from "lucide-react";
import { PolicyPage, PolicySection, policyListClass } from "@/components/PolicyPage";
import { SHIPPING_METHODS, FREE_SHIPPING_THRESHOLD } from "@/constants/demo";
import { formatPrice } from "@/constants/products";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Delivery options, charges and timelines for Ariviyaa orders — Shiprocket courier partners, ST Courier for South India and bulk freight for business orders.",
  alternates: { canonical: "https://www.ariviyaa.com/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping Policy"
      subtitle="How and when your Ariviyaa order reaches you"
      badge="Delivery"
      BadgeIcon={Truck}
      href="/shipping-policy"
      intro={
        <p>
          Every order is packed at our Thanjavur facility and shipped across India through trusted courier partners.
          Here is what to expect after you place an order.
        </p>
      }
    >
      <PolicySection title="1. Dispatch Time">
        <p>
          Orders are packed and dispatched within <strong>1–2 working days</strong> (Monday to Saturday, excluding
          public holidays). Orders placed after 4 PM are processed the next working day.
        </p>
      </PolicySection>

      <PolicySection title="2. Delivery Options & Charges">
        <div className="overflow-x-auto rounded-2xl border border-[#D9DFF0]">
          <table className="w-full t-body">
            <thead className="bg-[#F5F7FC] text-left text-xs uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-4 py-3 font-bold">Option</th>
                <th className="px-4 py-3 font-bold">Partner</th>
                <th className="px-4 py-3 font-bold">Delivery time</th>
                <th className="px-4 py-3 font-bold text-right">Charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9DFF0]">
              {SHIPPING_METHODS.map((m) => (
                <tr key={m.id}>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-900 block">{m.label}</span>
                    <span className="text-xs text-slate-500">{m.note}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{m.carrier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{m.eta}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">{formatPrice(m.fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="t-body text-slate-600">
          Standard delivery is <strong>free on orders above {formatPrice(FREE_SHIPPING_THRESHOLD)}</strong>. A{" "}
          {formatPrice(40)} handling fee applies to Cash on Delivery orders.
        </p>
      </PolicySection>

      <PolicySection title="3. Courier Partners">
        <ul className={policyListClass}>
          <li>
            <strong>Shiprocket:</strong> we use Shiprocket to book the best available courier (Delhivery, Xpressbees,
            Blue Dart, DTDC and others) for your pin code.
          </li>
          <li>
            <strong>ST Courier:</strong> available for Tamil Nadu and South India. These shipments are booked manually
            by our team, and the tracking number is shared once the parcel is handed over.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="4. Order Tracking">
        <p>
          Once shipped, you will receive the courier name and AWB tracking number by SMS, WhatsApp and email. You can
          also track every order from <strong>My Account → Order History</strong>.
        </p>
      </PolicySection>

      <PolicySection title="5. Bulk & Business Orders">
        <ul className={policyListClass}>
          <li>Orders for dairy cooperatives, clinics and distributors are shipped by surface freight or transport.</li>
          <li>Freight charges and delivery dates are confirmed with the quotation.</li>
          <li>A GST invoice is provided with every business order.</li>
        </ul>
      </PolicySection>

      <PolicySection title="6. Delays & Undelivered Parcels">
        <ul className={policyListClass}>
          <li>Remote pin codes, weather or festival rush can add 2–4 days to delivery.</li>
          <li>If a parcel is returned to us because of a wrong address or refusal, re-shipping charges apply.</li>
          <li>Check the parcel at delivery and report damage within 48 hours so we can raise a claim.</li>
        </ul>
      </PolicySection>
    </PolicyPage>
  );
}
