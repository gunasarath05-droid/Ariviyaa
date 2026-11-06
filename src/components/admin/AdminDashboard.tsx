"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  IndianRupee,
  PackageCheck,
  RotateCcw,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  Truck,
  Clock,
  Package,
} from "lucide-react";
import { PRODUCTS, formatPrice } from "@/constants/products";
import { ADMIN_MONTHLY_REVENUE, orderTotals } from "@/constants/demo";
import { useAdmin } from "@/context/AdminContext";
import { AdminPageHeader, OrderStatusPill, PanelHeader, Pill, panelClass } from "./ui";

const parseDate = (value: string) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

function RevenueChart() {
  const max = Math.max(...ADMIN_MONTHLY_REVENUE.map((m) => m.value));
  const ceiling = Math.ceil(max / 100000) * 100000;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(ceiling * f));
  const lakh = (v: number) => (v === 0 ? "0" : `₹${(v / 100000).toFixed(v % 100000 === 0 ? 0 : 1)}L`);

  return (
    <div className="p-5">
      <div className="flex gap-3 h-56">
        {/* Y axis */}
        <div className="flex flex-col-reverse justify-between text-[10px] font-semibold text-slate-400 pt-3 pb-4 w-9 text-right">
          {ticks.map((t) => (
            <span key={t}>{lakh(t)}</span>
          ))}
        </div>
        {/* Bars */}
        <div className="flex-1 relative">
          <div className="absolute inset-x-0 top-5 bottom-6 flex flex-col-reverse justify-between pointer-events-none">
            {ticks.map((t) => (
              <span key={t} className="border-t border-dashed border-slate-100" />
            ))}
          </div>
          <div className="relative h-full flex items-end justify-around gap-2 sm:gap-4">
            {ADMIN_MONTHLY_REVENUE.map((m, i) => {
              const latest = i === ADMIN_MONTHLY_REVENUE.length - 1;
              return (
                <div key={m.month} className="flex-1 h-full flex flex-col items-center justify-end">
                  <span className={`text-[10px] font-bold mb-1 ${latest ? "text-[#5160a3]" : "text-slate-500"}`}>
                    {lakh(m.value)}
                  </span>
                  <div
                    className={`w-full max-w-10 rounded-t-lg ${latest ? "bg-[#5160a3]" : "bg-[#5160a3]/35"}`}
                    style={{ height: `calc((100% - 2.75rem) * ${m.value / ceiling})` }}
                    title={`${m.month}: ${formatPrice(m.value)}`}
                  />
                  <span className="h-6 pt-1.5 text-[11px] font-semibold text-slate-500">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AttentionItem {
  key: string;
  Icon: React.ElementType;
  title: string;
  detail: string;
  href: string;
}

export function AdminDashboard() {
  const { admin, canAccess, orders, returns, enquiries, stock } = useAdmin();
  if (!admin) return null;

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayLabel = today.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const thisMonth = orders.filter((o) => {
    const d = parseDate(o.date);
    return d && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });
  const revenue = orders
    .filter((o) => o.paymentStatus === "paid" || o.paymentStatus === "cod-collected")
    .reduce((sum, o) => sum + orderTotals(o).total, 0);
  const awaitingDispatch = orders.filter((o) => o.status === "placed" || o.status === "packed");
  const openReturns = returns.filter((r) => r.status !== "Refunded" && r.status !== "Rejected");
  const newEnquiries = enquiries.filter((e) => e.status === "New");

  const kpis = [
    { label: "Orders this month", value: String(thisMonth.length), Icon: ShoppingCart, section: "orders" as const, href: "/admin/orders" },
    { label: "Revenue received", value: formatPrice(revenue), Icon: IndianRupee, section: "payments" as const, href: "/admin/payments" },
    { label: "Awaiting dispatch", value: String(awaitingDispatch.length), Icon: PackageCheck, section: "shipping" as const, href: "/admin/shipping" },
    { label: "Open returns", value: String(openReturns.length), Icon: RotateCcw, section: "returns" as const, href: "/admin/returns" },
    { label: "New B2B enquiries", value: String(newEnquiries.length), Icon: Building2, section: "enquiries" as const, href: "/admin/enquiries" },
  ].filter((k) => canAccess(k.section));

  const attention: AttentionItem[] = [];
  if (canAccess("orders")) {
    orders
      .filter((o) => o.shippingId === "st-courier" && o.status === "packed" && !o.awb)
      .forEach((o) =>
        attention.push({
          key: `st-${o.id}`,
          Icon: Truck,
          title: `${o.id} — book ST Courier`,
          detail: `${o.customer.businessName ?? o.customer.name} · packed, AWB not entered`,
          href: `/admin/orders/${o.id}`,
        })
      );
    orders
      .filter((o) => {
        const d = parseDate(o.date);
        return o.status === "placed" && d && d < startOfToday;
      })
      .forEach((o) =>
        attention.push({
          key: `placed-${o.id}`,
          Icon: Clock,
          title: `${o.id} — not packed yet`,
          detail: `Placed ${o.date} by ${o.customer.businessName ?? o.customer.name}`,
          href: `/admin/orders/${o.id}`,
        })
      );
  }
  if (canAccess("products")) {
    PRODUCTS.filter((p) => !p.comingSoon)
      .filter((p) => stock[p.id] && stock[p.id].stock <= stock[p.id].reorderAt)
      .forEach((p) =>
        attention.push({
          key: `stock-${p.id}`,
          Icon: AlertTriangle,
          title: `${p.name} — low stock`,
          detail: `${stock[p.id].stock} units left (reorder at ${stock[p.id].reorderAt})`,
          href: "/admin/products",
        })
      );
  }
  if (canAccess("enquiries")) {
    newEnquiries.forEach((e) =>
      attention.push({
        key: `enq-${e.id}`,
        Icon: Building2,
        title: `${e.organisation} — new enquiry`,
        detail: `${e.type} · ${e.product} · ${e.date}`,
        href: "/admin/enquiries",
      })
    );
  }

  const recent = [...orders]
    .sort((a, b) => (parseDate(b.date)?.getTime() ?? 0) - (parseDate(a.date)?.getTime() ?? 0))
    .slice(0, 6);

  return (
    <>
      <AdminPageHeader title={`Welcome, ${admin.name}`} subtitle={todayLabel} />

      {/* KPI tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {kpis.map(({ label, value, Icon, href }) => (
          <Link key={label} href={href} className={`${panelClass} p-4 sm:p-5 hover:border-[#5160a3] transition-colors`}>
            <span className="w-9 h-9 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
              <Icon className="w-4.5 h-4.5" />
            </span>
            <p className="mt-3 text-xl sm:text-2xl font-black text-slate-900 truncate">{value}</p>
            <p className="text-xs font-semibold text-slate-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Needs attention */}
        <div className={`${panelClass} xl:col-span-2 overflow-hidden`}>
          <PanelHeader title="Needs attention" action={<Pill tone={attention.length ? "amber" : "green"}>{attention.length}</Pill>} />
          {attention.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">All caught up — nothing waiting on you.</p>
          ) : (
            <ul className="divide-y divide-slate-100 max-h-[22rem] overflow-y-auto">
              {attention.map(({ key, Icon, title, detail, href }) => (
                <li key={key}>
                  <Link href={href} className="px-5 py-3.5 flex items-start gap-3 hover:bg-[#F5F7FC]/60 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-[#EFF3FC] text-[#5160a3] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-900 truncate">{title}</span>
                      <span className="block text-xs text-slate-500 truncate">{detail}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Revenue */}
        <div className={`${panelClass} xl:col-span-3`}>
          <PanelHeader title="Monthly revenue" action={<span className="text-xs font-semibold text-slate-400">Last 6 months</span>} />
          <RevenueChart />
        </div>
      </div>

      {/* Recent orders */}
      {canAccess("orders") && (
        <div className={`${panelClass} overflow-hidden`}>
          <PanelHeader
            title="Recent orders"
            action={
              <Link href="/admin/orders" className="inline-flex items-center gap-1 text-xs font-bold text-[#5160a3] hover:underline">
                All orders
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-[#F5F7FC]">
                  <th className="px-5 py-2.5 font-bold">Order</th>
                  <th className="px-5 py-2.5 font-bold">Customer</th>
                  <th className="px-5 py-2.5 font-bold">Courier</th>
                  <th className="px-5 py-2.5 font-bold">Status</th>
                  <th className="px-5 py-2.5 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((o) => (
                  <tr key={o.id} className="hover:bg-[#F5F7FC]/60">
                    <td className="px-5 py-3">
                      <Link href={`/admin/orders/${o.id}`} className="font-bold text-[#5160a3] hover:underline">
                        {o.id}
                      </Link>
                      <span className="block text-xs text-slate-400">{o.date}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-semibold text-slate-900">{o.customer.businessName ?? o.customer.name}</span>
                      <span className="ml-2">
                        <Pill tone={o.customer.type === "Business" ? "brand" : "slate"}>{o.customer.type}</Pill>
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {o.shippingId === "st-courier" ? "ST Courier" : "Shiprocket"}
                    </td>
                    <td className="px-5 py-3">
                      <OrderStatusPill status={o.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-bold text-slate-900">{formatPrice(orderTotals(o).total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {canAccess("products") && (
        <Link
          href="/admin/products"
          className={`${panelClass} p-4 flex items-center gap-3 hover:border-[#5160a3] transition-colors`}
        >
          <Package className="w-5 h-5 text-[#5160a3]" />
          <span className="text-sm font-semibold text-slate-700">Manage products, prices and stock</span>
          <ArrowUpRight className="w-4 h-4 text-slate-400 ml-auto" />
        </Link>
      )}
    </>
  );
}
