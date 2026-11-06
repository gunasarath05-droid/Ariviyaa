"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, CreditCard, Truck, Building2, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Add to cart",
    desc: "Pick your products and quantities — you see the price before you order.",
    Icon: ShoppingBag,
  },
  {
    title: "Pay securely online",
    desc: "Check out with UPI, cards, net banking or wallets through Razorpay.",
    Icon: CreditCard,
  },
  {
    title: "Pan-India dispatch",
    desc: "Packed at our Thanjavur facility and shipped to your doorstep, farm or clinic.",
    Icon: Truck,
  },
];

export function HowToOrderSection() {
  return (
    <section className="w-full section-y bg-white border-b border-[#D9DFF0] font-sans" id="how-to-order">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-center h-block text-slate-900">
          How Ordering Works
        </h2>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map(({ title, desc, Icon }, index) => (
            <li
              key={title}
              className="bg-[#F5F7FC] p-5 sm:p-6 rounded-2xl border border-[#D9DFF0] flex items-start gap-4"
            >
              <div className="relative w-11 h-11 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
                <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#5160a3] text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <div>
                <h3 className="h-card text-slate-900">{title}</h3>
                <p className="t-body text-slate-500 mt-1">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Bulk buyers are served by the B2B pages; one line is enough here */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-sm text-slate-600">
          <Building2 className="w-4 h-4 text-[#5160a3] shrink-0" />
          <span>Buying for a dairy cooperative, clinic or distribution network?</span>
          <Link
            href="/contact?type=distributor"
            className="inline-flex items-center gap-1 font-bold text-[#5160a3] hover:underline"
          >
            <span>Request a bulk quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowToOrderSection;
