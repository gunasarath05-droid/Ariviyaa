import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, ArrowRight } from "lucide-react";
import { CommonHero } from "@/components/CommonHero";
import { AccountShell } from "@/components/AccountShell";
import { cardClass } from "@/components/ui/form";
import { OrderHistory } from "../orders/OrderHistory";

export const metadata: Metadata = {
  title: "Returns",
  description: "Track return requests and return delivered Ariviyaa orders with free reverse pickup.",
  robots: { index: false },
};

export default function AccountReturnsPage() {
  return (
    <>
      <CommonHero
        title="Returns"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Returns" },
        ]}
      />
      <AccountShell>
        <div className={`${cardClass} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </span>
            <div>
              <h2 className="h-card text-slate-900">Returns within 7 days of delivery</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Free reverse pickup through Shiprocket. Refund in 5–7 working days after quality check.
              </p>
            </div>
          </div>
          <Link
            href="/refund-policy"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline shrink-0"
          >
            Return policy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <OrderHistory view="returns" />
      </AccountShell>
    </>
  );
}
