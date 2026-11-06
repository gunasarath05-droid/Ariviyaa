"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info, Check } from "lucide-react";
import { formatPrice } from "@/constants/products";
import { PAYMENT_METHODS, orderTotals, type PaymentMethodId } from "@/constants/demo";
import { PAYMENT_STATUS_LABEL, type PaymentStatus } from "@/constants/adminData";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminPageHeader,
  PanelHeader,
  Pill,
  adminButtonClass,
  adminInputClass,
  panelClass,
  type PillTone,
} from "@/components/admin/ui";

const STATUS_TONE: Record<PaymentStatus, PillTone> = {
  paid: "green",
  "cod-pending": "amber",
  "cod-collected": "green",
  refunded: "slate",
  failed: "rose",
};

export function PaymentsLedger() {
  const { orders, updateOrder, settings } = useAdmin();
  const [status, setStatus] = useState<PaymentStatus | "all">("all");
  const [method, setMethod] = useState<PaymentMethodId | "all">("all");

  const total = (id: string) => {
    const o = orders.find((x) => x.id === id);
    return o ? orderTotals(o).total : 0;
  };
  const sum = (match: (s: PaymentStatus) => boolean) =>
    orders.filter((o) => match(o.paymentStatus)).reduce((s, o) => s + total(o.id), 0);

  const tiles = [
    { label: "Collected online", value: formatPrice(sum((s) => s === "paid")) },
    { label: "COD to collect", value: formatPrice(sum((s) => s === "cod-pending")) },
    { label: "Refunded", value: formatPrice(sum((s) => s === "refunded")) },
    { label: "Total orders", value: String(orders.length) },
  ];

  const filtered = orders.filter(
    (o) => (status === "all" || o.paymentStatus === status) && (method === "all" || o.paymentId === method)
  );
  const codPending = orders.filter((o) => o.paymentStatus === "cod-pending");

  return (
    <>
      <AdminPageHeader
        title="Payments"
        subtitle="Razorpay transactions, COD collection and refunds"
        actions={
          <Pill tone={settings.razorpayMode === "live" ? "green" : "amber"}>
            Razorpay {settings.razorpayMode === "live" ? "Live" : "Test"} mode
          </Pill>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((t) => (
          <div key={t.label} className={`${panelClass} p-4 sm:p-5`}>
            <p className="text-xl sm:text-2xl font-black text-slate-900 truncate">{t.value}</p>
            <p className="text-xs font-semibold text-slate-500">{t.label}</p>
          </div>
        ))}
      </div>

      <p className={`${panelClass} p-4 flex items-start gap-2.5 text-sm text-slate-600`}>
        <Info className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
        Payouts and settlements will load from the Razorpay dashboard API once the live account is connected. Figures
        here are calculated from store orders.
      </p>

      {/* Transactions */}
      <div className={`${panelClass} overflow-hidden`}>
        <PanelHeader
          title="Transactions"
          action={
            <div className="flex gap-2">
              <select
                aria-label="Filter by payment status"
                value={status}
                onChange={(e) => setStatus(e.target.value as PaymentStatus | "all")}
                className={`${adminInputClass} py-1.5 w-auto text-xs`}
              >
                <option value="all">All statuses</option>
                {(Object.keys(PAYMENT_STATUS_LABEL) as PaymentStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {PAYMENT_STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
              <select
                aria-label="Filter by payment method"
                value={method}
                onChange={(e) => setMethod(e.target.value as PaymentMethodId | "all")}
                className={`${adminInputClass} py-1.5 w-auto text-xs`}
              >
                <option value="all">All methods</option>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-[#F5F7FC]">
                <th className="px-5 py-2.5 font-bold">Date</th>
                <th className="px-5 py-2.5 font-bold">Order</th>
                <th className="px-5 py-2.5 font-bold">Customer</th>
                <th className="px-5 py-2.5 font-bold">Method</th>
                <th className="px-5 py-2.5 font-bold">Razorpay ID</th>
                <th className="px-5 py-2.5 font-bold">Status</th>
                <th className="px-5 py-2.5 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    No transactions match these filters.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id}>
                    <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{o.date}</td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/orders/${o.id}`} className="font-bold text-[#5160a3] hover:underline">
                        {o.id}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-900">{o.customer.businessName ?? o.customer.name}</td>
                    <td className="px-5 py-3 text-slate-600">
                      {PAYMENT_METHODS.find((m) => m.id === o.paymentId)?.label}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">{o.razorpayId ?? "—"}</td>
                    <td className="px-5 py-3">
                      <Pill tone={STATUS_TONE[o.paymentStatus]}>{PAYMENT_STATUS_LABEL[o.paymentStatus]}</Pill>
                    </td>
                    <td className="px-5 py-3 text-right font-bold text-slate-900">{formatPrice(orderTotals(o).total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COD */}
      <div className={`${panelClass} overflow-hidden`}>
        <PanelHeader title="Cash on Delivery to collect" action={<Pill tone="amber">{codPending.length}</Pill>} />
        {codPending.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">No COD payments pending.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {codPending.map((o) => (
              <li key={o.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <Link href={`/admin/orders/${o.id}`} className="font-bold text-[#5160a3] hover:underline">
                    {o.id}
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {o.customer.businessName ?? o.customer.name} · {o.courierPartner ?? "Not shipped yet"}
                  </p>
                </div>
                <span className="font-bold text-slate-900">{formatPrice(orderTotals(o).total)}</span>
                <button
                  type="button"
                  disabled={o.status !== "delivered"}
                  title={o.status !== "delivered" ? "Available once the order is delivered" : undefined}
                  onClick={() => updateOrder(o.id, { paymentStatus: "cod-collected" })}
                  className={adminButtonClass}
                >
                  <Check className="w-4 h-4" />
                  Mark collected
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
