"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Building2,
  RotateCcw,
  Truck,
  CreditCard,
  Settings,
  Search,
  Bell,
  ExternalLink,
  Menu,
  X,
  ArrowUpRight,
  AlertTriangle,
  Hourglass,
} from "lucide-react";
import { IMAGES } from "@/constants/images";
import { PRODUCTS, formatPrice } from "@/constants/products";
import {
  ADMIN_ENQUIRIES,
  ADMIN_KPIS,
  ADMIN_MONTHLY_REVENUE,
  ADMIN_RECENT_ORDERS,
  ADMIN_RETURNS,
  ADMIN_STOCK,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STYLE,
} from "@/constants/demo";

const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "orders", label: "Orders", Icon: ShoppingCart },
  { id: "products", label: "Products", Icon: Package },
  { id: "customers", label: "Customers", Icon: Users },
  { id: "enquiries", label: "B2B Enquiries", Icon: Building2 },
  { id: "returns", label: "Returns", Icon: RotateCcw },
  { id: "shipping", label: "Shipping", hint: "Shiprocket · ST Courier", Icon: Truck },
  { id: "payments", label: "Payments", hint: "Razorpay", Icon: CreditCard },
  { id: "settings", label: "Settings", Icon: Settings },
] as const;

type Section = (typeof NAV)[number]["id"];

const panelClass = "bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs";

// Orders that ship by ST Courier are booked by hand at the branch; the AWB is entered here
const PENDING_ST_BOOKINGS = ADMIN_RECENT_ORDERS.filter(
  (o) => o.courier === "ST Courier" && (o.status === "placed" || o.status === "packed")
).concat([
  { id: "ARV-10304", customer: "Selvi M.", type: "Retail", amount: 1047, status: "packed", courier: "ST Courier" },
]);

function PanelHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
      <h2 className="text-sm sm:text-base font-bold text-slate-900">{title}</h2>
      {action && (
        <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-[#5160a3] hover:underline cursor-pointer">
          {action}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

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

function StatusPill({ status }: { status: keyof typeof ORDER_STATUS_LABEL }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-[11px] font-bold whitespace-nowrap ${ORDER_STATUS_STYLE[status]}`}>
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

function DashboardView() {
  const [awbFor, setAwbFor] = useState<string | null>(null);
  const [awbs, setAwbs] = useState<Record<string, string>>({});
  const [draftAwb, setDraftAwb] = useState("");

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {ADMIN_KPIS.map((kpi) => (
          <div key={kpi.label} className={`${panelClass} p-4 sm:p-5`}>
            <p className="text-xs font-semibold text-slate-500">{kpi.label}</p>
            <p className="mt-2 text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</p>
            <span
              className={`mt-2 inline-flex px-2 py-0.5 rounded-md text-[11px] font-bold ${
                kpi.change.startsWith("+") ? "bg-emerald-50 text-emerald-700" : "bg-[#EFF3FC] text-[#5160a3]"
              }`}
            >
              {kpi.change.startsWith("+") ? `${kpi.change} vs last month` : kpi.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className={`${panelClass} xl:col-span-2`}>
          <PanelHeader title="Monthly revenue" action="Reports" />
          <RevenueChart />
        </div>

        {/* ST Courier manual bookings */}
        <div className={panelClass}>
          <PanelHeader title="Pending ST Courier bookings" />
          <ul className="divide-y divide-slate-100">
            {PENDING_ST_BOOKINGS.map((o) => (
              <li key={o.id} className="px-5 py-3.5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{o.id}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {o.customer} · {formatPrice(o.amount)}
                    </p>
                  </div>
                  {awbs[o.id] ? (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                      AWB {awbs[o.id]}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setAwbFor(awbFor === o.id ? null : o.id);
                        setDraftAwb("");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#5160a3] hover:bg-[#434f8a] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Enter AWB
                    </button>
                  )}
                </div>
                {awbFor === o.id && (
                  <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!draftAwb.trim()) return;
                      setAwbs((prev) => ({ ...prev, [o.id]: draftAwb.trim() }));
                      setAwbFor(null);
                    }}
                  >
                    <input
                      autoFocus
                      value={draftAwb}
                      onChange={(e) => setDraftAwb(e.target.value)}
                      placeholder="ST Courier AWB no."
                      aria-label={`AWB number for ${o.id}`}
                      className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-[#D9DFF0] text-xs focus:outline-none focus:border-[#5160a3]"
                    />
                    <button type="submit" className="px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold cursor-pointer">
                      Save
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-slate-500 border-t border-slate-100">
            Saving an AWB marks the order shipped and sends tracking to the customer.
          </p>
        </div>
      </div>

      {/* Recent orders */}
      <div className={`${panelClass} overflow-hidden`}>
        <PanelHeader title="Recent orders" action="All orders" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-[#F5F7FC]">
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Courier</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ADMIN_RECENT_ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-[#F5F7FC]/60">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{o.id}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-800">{o.customer}</span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        o.type === "Business" ? "bg-[#5160a3] text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {o.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{o.courier}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={o.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right font-bold text-slate-900">{formatPrice(o.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low stock */}
        <div className={panelClass}>
          <PanelHeader title="Stock levels" action="Inventory" />
          <ul className="divide-y divide-slate-100">
            {ADMIN_STOCK.map((s) => {
              const product = PRODUCTS.find((p) => p.id === s.productId);
              const low = s.stock < s.reorderAt;
              return (
                <li key={s.productId} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F7FC] p-1 flex items-center justify-center shrink-0">
                    {product && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={32}
                        height={32}
                        style={{ width: "auto", height: "auto" }}
                        className="max-h-full max-w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{product?.name}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${low ? "bg-rose-500" : "bg-[#5160a3]"}`}
                        style={{ width: `${Math.min(100, (s.stock / (s.reorderAt * 3)) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap ${low ? "text-rose-600" : "text-slate-600"}`}>
                    {low && <AlertTriangle className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />}
                    {s.stock} units
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* B2B enquiries */}
        <div className={panelClass}>
          <PanelHeader title="B2B enquiries" action="View all" />
          <ul className="divide-y divide-slate-100">
            {ADMIN_ENQUIRIES.map((e) => (
              <li key={e.name} className="px-5 py-3.5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{e.name}</p>
                  <p className="text-xs text-slate-500">
                    {e.type} · {e.product}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">{e.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Returns */}
        <div className={panelClass}>
          <PanelHeader title="Returns queue" action="Manage" />
          <ul className="divide-y divide-slate-100">
            {ADMIN_RETURNS.map((r) => (
              <li key={r.id} className="px-5 py-3.5 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">
                    {r.id} <span className="font-medium text-slate-400">· {r.orderId}</span>
                  </p>
                  <span className="text-[11px] font-bold text-[#5160a3] bg-[#EFF3FC] px-2 py-0.5 rounded-md whitespace-nowrap">
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {r.customer} · {r.reason}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PlaceholderView({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className={`${panelClass} py-20 px-6 text-center space-y-3`}>
      <span className="mx-auto w-14 h-14 rounded-full bg-[#EFF3FC] text-[#5160a3] flex items-center justify-center">
        <Hourglass className="w-6 h-6" />
      </span>
      <p className="text-lg font-bold text-slate-900">{label}</p>
      <p className="text-sm text-slate-500 max-w-md mx-auto">
        {hint ? `${hint} integration — ` : ""}this module is designed in the next phase, once the backend is
        connected.
      </p>
    </div>
  );
}

export function AdminDashboard() {
  const [section, setSection] = useState<Section>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const active = NAV.find((n) => n.id === section) ?? NAV[0];

  const navList = (
    <nav aria-label="Admin" className="space-y-1">
      {NAV.map((item) => {
        const isActive = item.id === section;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSection(item.id);
              setMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
              isActive ? "bg-[#5160a3] text-white" : "text-slate-600 hover:bg-[#F5F7FC] hover:text-[#5160a3]"
            }`}
          >
            <item.Icon className="w-4.5 h-4.5 shrink-0" />
            <span className="flex-1 min-w-0">
              <span className="block truncate">{item.label}</span>
              {"hint" in item && (
                <span className={`block text-[10px] font-medium ${isActive ? "text-white/75" : "text-slate-400"}`}>
                  {item.hint}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FC] font-sans flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-[#D9DFF0] sticky top-0 h-screen">
        <div className="h-16 px-5 flex items-center border-b border-slate-100">
          <Image src={IMAGES.logo} alt="Ariviya" width={120} height={36} style={{ width: "auto", height: "auto" }} className="h-8 w-auto" />
          <span className="ml-2 px-2 py-0.5 rounded-md bg-[#EFF3FC] text-[#5160a3] text-[10px] font-bold">Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">{navList}</div>
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white p-3 overflow-y-auto">
            <div className="h-12 px-2 mb-2 flex items-center justify-between">
              <Image src={IMAGES.logo} alt="Ariviya" width={110} height={32} style={{ width: "auto", height: "auto" }} className="h-7 w-auto" />
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="p-2 text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            {navList}
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-16 sticky top-0 z-30 bg-white border-b border-[#D9DFF0] px-4 sm:px-6 flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-700 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <input
              type="search"
              placeholder="Search orders, customers, products…"
              aria-label="Search admin"
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#F5F7FC] border border-[#D9DFF0] rounded-xl focus:outline-none focus:border-[#5160a3]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#5160a3] hover:underline"
            >
              View site
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button type="button" aria-label="Notifications" className="relative p-2 text-slate-600 hover:text-[#5160a3] cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#5160a3] text-white text-xs font-black flex items-center justify-center">
                MS
              </span>
              <span className="hidden md:block leading-tight">
                <span className="block text-sm font-bold text-slate-900">Dr. M. Sivakumar</span>
                <span className="block text-[11px] text-slate-500">Administrator</span>
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{active.label}</h1>
              <p className="text-sm text-slate-500 mt-1">
                {section === "dashboard" ? "Overview for 3 November 2026" : "Ariviya store management"}
              </p>
            </div>
          </div>
          {section === "dashboard" ? (
            <DashboardView />
          ) : (
            <PlaceholderView label={active.label} hint={"hint" in active ? active.hint : undefined} />
          )}
        </main>
      </div>
    </div>
  );
}
