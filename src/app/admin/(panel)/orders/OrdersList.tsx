"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, PackageSearch } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { formatPrice } from "@/constants/products";
import { PAYMENT_METHODS, SHIPPING_METHODS, orderTotals, type OrderStatus } from "@/constants/demo";
import { PAYMENT_STATUS_LABEL, type AdminOrder, type PaymentStatus } from "@/constants/adminData";
import { AdminPageHeader, OrderStatusPill, Pill, adminInputClass, panelClass, type PillTone } from "@/components/admin/ui";

type Tab = "all" | "new" | "to-ship" | "in-transit" | "delivered" | "returns" | "cancelled";

const TABS: { id: Tab; label: string; statuses?: OrderStatus[] }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New", statuses: ["placed"] },
  { id: "to-ship", label: "To ship", statuses: ["packed"] },
  { id: "in-transit", label: "In transit", statuses: ["shipped", "out-for-delivery"] },
  { id: "delivered", label: "Delivered", statuses: ["delivered"] },
  { id: "returns", label: "Returns", statuses: ["return-requested", "returned"] },
  { id: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

type CourierFilter = "all" | "shiprocket" | "st-courier";

export const PAYMENT_TONE: Record<PaymentStatus, PillTone> = {
  paid: "green",
  "cod-pending": "amber",
  "cod-collected": "green",
  refunded: "slate",
  failed: "rose",
};

const isStCourier = (o: AdminOrder) => o.shippingId === "st-courier";

/** Orders sorted newest first by their placed date */
const byNewest = (a: AdminOrder, b: AdminOrder) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0);

export function OrdersList() {
  const { orders } = useAdmin();
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [courier, setCourier] = useState<CourierFilter>("all");

  const inTab = (o: AdminOrder, t: (typeof TABS)[number]) => !t.statuses || t.statuses.includes(o.status);
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];
  const q = query.trim().toLowerCase();

  const visible = orders
    .filter((o) => inTab(o, active))
    .filter((o) => courier === "all" || (courier === "st-courier" ? isStCourier(o) : !isStCourier(o)))
    .filter(
      (o) =>
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        (o.customer.businessName ?? "").toLowerCase().includes(q) ||
        o.customer.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""))
    )
    .sort(byNewest);

  return (
    <>
      <AdminPageHeader title="Orders" subtitle={`${orders.length} orders · newest first`} />

      <div className={`${panelClass} p-3 sm:p-4 space-y-3`}>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const count = orders.filter((o) => inTab(o, t)).length;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  tab === t.id ? "bg-[#5160a3] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {t.label} <span className={tab === t.id ? "text-white/75" : "text-slate-400"}>({count})</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search order ID, customer or phone"
              aria-label="Search orders"
              className={`${adminInputClass} pl-9`}
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <select
            value={courier}
            onChange={(e) => setCourier(e.target.value as CourierFilter)}
            aria-label="Filter by courier"
            className={`${adminInputClass} sm:w-48`}
          >
            <option value="all">All couriers</option>
            <option value="shiprocket">Shiprocket</option>
            <option value="st-courier">ST Courier</option>
          </select>
        </div>
      </div>

      <div className={`${panelClass} overflow-hidden`}>
        {visible.length === 0 ? (
          <div className="py-16 px-6 text-center space-y-2">
            <PackageSearch className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-base font-bold text-slate-800">No orders match</p>
            <p className="text-sm text-slate-500">Try another tab, courier or search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[860px]">
              <thead className="bg-[#F5F7FC] text-left text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-bold">Order</th>
                  <th className="px-3 py-3 font-bold">Customer</th>
                  <th className="px-3 py-3 font-bold text-right">Items</th>
                  <th className="px-3 py-3 font-bold text-right">Total</th>
                  <th className="px-3 py-3 font-bold">Payment</th>
                  <th className="px-3 py-3 font-bold">Courier</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((o) => {
                  const payment = PAYMENT_METHODS.find((p) => p.id === o.paymentId);
                  const shipping = SHIPPING_METHODS.find((m) => m.id === o.shippingId);
                  return (
                    <tr key={o.id} className="hover:bg-[#F5F7FC]/60">
                      <td className="px-5 py-3">
                        <Link href={`/admin/orders/${o.id}`} className="font-bold text-[#5160a3] hover:underline">
                          {o.id}
                        </Link>
                        <span className="block text-xs text-slate-500">{o.date}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{o.customer.businessName ?? o.customer.name}</span>
                          {o.customer.type === "Business" && <Pill>Business</Pill>}
                        </span>
                        <span className="block text-xs text-slate-500">{o.customer.phone}</span>
                      </td>
                      <td className="px-3 py-3 text-right text-slate-700">
                        {o.items.reduce((n, i) => n + i.quantity, 0)}
                      </td>
                      <td className="px-3 py-3 text-right font-bold text-slate-900">{formatPrice(orderTotals(o).total)}</td>
                      <td className="px-3 py-3">
                        <span className="block text-xs text-slate-600 mb-1">{payment?.label}</span>
                        <Pill tone={PAYMENT_TONE[o.paymentStatus]}>{PAYMENT_STATUS_LABEL[o.paymentStatus]}</Pill>
                      </td>
                      <td className="px-3 py-3 text-slate-700">
                        {o.courierPartner ?? shipping?.carrier}
                        {o.awb && <span className="block text-xs text-slate-500">{o.awb}</span>}
                      </td>
                      <td className="px-5 py-3">
                        <OrderStatusPill status={o.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
