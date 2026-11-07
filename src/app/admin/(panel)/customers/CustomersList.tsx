"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Users, Building2, Repeat, X, Phone, Mail, MessageCircle, Newspaper } from "lucide-react";
import { formatPrice } from "@/constants/products";
import { orderTotals } from "@/constants/demo";
import type { AdminCustomerRef, AdminOrder } from "@/constants/adminData";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminPageHeader,
  OrderStatusPill,
  Pill,
  panelClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/ui";
import { loadLocalSubscribers, type NewsletterSubscriber } from "@/lib/newsletterSubscribers";

interface Customer extends AdminCustomerRef {
  orders: AdminOrder[];
  totalSpent: number;
  lastOrder: string;
}

const dateValue = (d: string) => {
  const t = Date.parse(d);
  return Number.isNaN(t) ? 0 : t;
};

function groupCustomers(orders: AdminOrder[]): Customer[] {
  const map = new Map<string, Customer>();
  for (const order of orders) {
    const key = order.customer.email.toLowerCase();
    const existing = map.get(key);
    const total = orderTotals(order).total;
    if (existing) {
      existing.orders.push(order);
      existing.totalSpent += total;
      if (dateValue(order.date) > dateValue(existing.lastOrder)) existing.lastOrder = order.date;
    } else {
      map.set(key, { ...order.customer, orders: [order], totalSpent: total, lastOrder: order.date });
    }
  }
  return [...map.values()]
    .map((c) => ({ ...c, orders: [...c.orders].sort((a, b) => dateValue(b.date) - dateValue(a.date)) }))
    .sort((a, b) => dateValue(b.lastOrder) - dateValue(a.lastOrder));
}

const digits = (phone: string) => phone.replace(/\D/g, "");

function CustomerDetail({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div className={`${panelClass} p-5 space-y-5 xl:sticky xl:top-24`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-bold text-slate-900 truncate">{customer.businessName ?? customer.name}</p>
          {customer.businessName && <p className="text-sm text-slate-500">{customer.name}</p>}
          <div className="mt-1.5">
            <Pill tone={customer.type === "Business" ? "brand" : "slate"}>{customer.type}</Pill>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close customer" className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <dl className="text-sm divide-y divide-slate-100">
        {[
          ["Email", customer.email],
          ["Mobile", customer.phone],
          ...(customer.gstin ? [["GSTIN", customer.gstin]] : []),
          ["Orders", String(customer.orders.length)],
          ["Total spent", formatPrice(customer.totalSpent)],
        ].map(([term, value]) => (
          <div key={term} className="py-2 flex items-start justify-between gap-4">
            <dt className="text-slate-500">{term}</dt>
            <dd className="font-semibold text-slate-900 text-right break-all">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap gap-2">
        <a
          href={`tel:${digits(customer.phone)}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D9DFF0] text-xs font-bold text-slate-700 hover:border-[#5160a3] hover:text-[#5160a3]"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>
        <a
          href={`https://wa.me/${digits(customer.phone)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D9DFF0] text-xs font-bold text-emerald-700 hover:border-emerald-300"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>
        <a
          href={`mailto:${customer.email}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D9DFF0] text-xs font-bold text-slate-700 hover:border-[#5160a3] hover:text-[#5160a3]"
        >
          <Mail className="w-3.5 h-3.5" />
          Email
        </a>
      </div>

      <div>
        <p className={adminLabelClass}>Orders</p>
        <ul className="divide-y divide-slate-100 border border-[#D9DFF0] rounded-xl">
          {customer.orders.map((o) => (
            <li key={o.id} className="px-3 py-2.5 flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0">
                <Link href={`/admin/orders/${o.id}`} className="font-bold text-[#5160a3] hover:underline">
                  {o.id}
                </Link>
                <p className="text-xs text-slate-500">{o.date}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-bold text-slate-900">{formatPrice(orderTotals(o).total)}</p>
                <OrderStatusPill status={o.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CustomersList() {
  const { orders } = useAdmin();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | "Retail" | "Business">("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  // Fetch newsletter subscribers from API (persisted in data/newsletter-subscribers.json)
  useEffect(() => {
    fetch("/api/newsletter")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.subscribers)) {
          setSubscribers(data.subscribers);
        }
      })
      .catch(() => {
        setSubscribers(loadLocalSubscribers());
      });
  }, []);

  // Opening /admin/customers?email=… (e.g. from an order) preselects that customer
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (email) setSelected(email.toLowerCase());
  }, []);

  const customers = groupCustomers(orders);
  const q = query.trim().toLowerCase();
  const visible = customers.filter(
    (c) =>
      (type === "all" || c.type === type) &&
      [c.name, c.businessName ?? "", c.email, c.phone].some((v) => v.toLowerCase().includes(q))
  );
  const current = customers.find((c) => c.email.toLowerCase() === selected);

  const tiles = [
    { label: "Total customers", value: customers.length, Icon: Users },
    { label: "Business accounts", value: customers.filter((c) => c.type === "Business").length, Icon: Building2 },
    { label: "Repeat customers", value: customers.filter((c) => c.orders.length > 1).length, Icon: Repeat },
    { label: "Newsletter Subscribers", value: subscribers.length, Icon: Newspaper },
  ];

  return (
    <>
      <AdminPageHeader title="Customers" subtitle="Everyone who has ordered, with their order history" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map(({ label, value, Icon }) => (
          <div key={label} className={`${panelClass} p-4 flex items-center gap-3`}>
            <span className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-2xl font-black text-slate-900">{value}</p>
              <p className="text-xs font-semibold text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`${panelClass} p-3 sm:p-4 flex flex-col md:flex-row md:items-center gap-3`}>
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, business, email or phone"
            aria-label="Search customers"
            className={`${adminInputClass} pl-9`}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex gap-1.5">
          {(["all", "Retail", "Business"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                type === t ? "bg-[#5160a3] text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-6 ${current ? "xl:grid-cols-[minmax(0,1fr)_360px]" : ""} items-start`}>
        <div className={`${panelClass} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-[#F5F7FC] text-left text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Customer</th>
                  <th className="px-4 py-3 font-bold">Type</th>
                  <th className="px-4 py-3 font-bold">Phone</th>
                  <th className="px-4 py-3 font-bold text-right">Orders</th>
                  <th className="px-4 py-3 font-bold text-right">Total spent</th>
                  <th className="px-4 py-3 font-bold">Last order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                      No customers match.
                    </td>
                  </tr>
                )}
                {visible.map((c) => {
                  const key = c.email.toLowerCase();
                  return (
                    <tr
                      key={key}
                      onClick={() => setSelected(key)}
                      className={`cursor-pointer transition-colors ${selected === key ? "bg-[#EFF3FC]" : "hover:bg-[#F5F7FC]/60"}`}
                    >
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(key);
                          }}
                          className="font-bold text-slate-900 hover:text-[#5160a3] text-left cursor-pointer"
                        >
                          {c.businessName ?? c.name}
                        </button>
                        <p className="text-xs text-slate-500">{c.businessName ? c.name : c.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Pill tone={c.type === "Business" ? "brand" : "slate"}>{c.type}</Pill>
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.phone}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">{c.orders.length}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">{formatPrice(c.totalSpent)}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{c.lastOrder}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {current && <CustomerDetail customer={current} onClose={() => setSelected(null)} />}
      </div>

      {/* ========================================================================= */}
      {/* Newsletter Subscribers Section */}
      {/* ========================================================================= */}
      <div className={`${panelClass} p-5 space-y-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#5160a3]" />
              <h3 className="text-base font-bold text-slate-900">Newsletter Subscribers</h3>
              <Pill tone="brand">{subscribers.length} total</Pill>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visitors who subscribed via the footer newsletter input across the website.
            </p>
          </div>

          {subscribers.length > 0 && (
            <button
              type="button"
              onClick={() => {
                const emails = subscribers.map((s) => s.email).join("\n");
                navigator.clipboard.writeText(emails);
                alert("Copied all subscriber emails to clipboard!");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9DFF0] text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Copy All Emails</span>
            </button>
          )}
        </div>

        {subscribers.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            No newsletter subscribers yet. Submissions from the website footer will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto border border-[#D9DFF0] rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FC] text-xs uppercase font-bold text-slate-600 border-b border-[#D9DFF0]">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Subscribed Date</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-slate-500 font-mono">{sub.id}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{sub.email}</td>
                    <td className="px-4 py-2.5 text-xs text-slate-500">
                      {new Date(sub.subscribedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {sub.source}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <a
                        href={`mailto:${sub.email}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#5160a3] hover:underline"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Send Email</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
