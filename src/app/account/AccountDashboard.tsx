"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Heart,
  MapPin,
  Building2,
  RefreshCw,
  RotateCcw,
  MessageCircle,
  ArrowRight,
  Pencil,
  Plus,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/constants/products";
import {
  DEMO_CUSTOMER,
  DEMO_ORDERS,
  SHIPPING_METHODS,
  orderProducts,
  orderTotals,
} from "@/constants/demo";
import { cardClass } from "@/components/ui/form";
import { OrderProgress, StatusPill } from "./OrderProgress";

const IN_TRANSIT = ["placed", "packed", "shipped", "out-for-delivery"];

export function AccountDashboard() {
  const { wishlist, addToCart, openWhatsAppInquiry } = useApp();
  // Wishlist is restored from the browser after mount; avoid a hydration mismatch on the count
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHydrated(true), []);

  const latest = DEMO_ORDERS[0];
  const latestItems = orderProducts(latest);
  const firstName = DEMO_CUSTOMER.name.split(" ")[0];

  const stats = [
    { label: "Total orders", value: DEMO_ORDERS.length, Icon: Package },
    { label: "In transit", value: DEMO_ORDERS.filter((o) => IN_TRANSIT.includes(o.status)).length, Icon: Truck },
    { label: "Delivered", value: DEMO_ORDERS.filter((o) => o.status === "delivered").length, Icon: CheckCircle2 },
    { label: "Saved items", value: hydrated ? wishlist.length : 0, Icon: Heart },
  ];

  const reorder = () => latestItems.forEach(({ product, quantity }) => addToCart(product, quantity));

  return (
    <>
      {/* Greeting */}
      <div className={`${cardClass} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Hello, {firstName}</h2>
          <p className="text-sm text-slate-500 mt-1">
            Member since {DEMO_CUSTOMER.memberSince} · {DEMO_CUSTOMER.email}
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-bold transition-colors self-start sm:self-auto"
        >
          Continue shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className={`${cardClass} p-4 sm:p-5`}>
            <span className="w-9 h-9 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
              <Icon className="w-4.5 h-4.5" />
            </span>
            <p className="mt-3 text-2xl font-black text-slate-900">{value}</p>
            <p className="text-xs font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Latest order */}
      <div className={`${cardClass} overflow-hidden`}>
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest order</p>
            <p className="text-base font-black text-slate-900">
              {latest.id} <span className="font-medium text-slate-500 text-sm">· {latest.date}</span>
            </p>
          </div>
          <StatusPill status={latest.status} />
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <OrderProgress order={latest} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {latestItems.map(({ product }) => (
                  <div
                    key={product.id}
                    className="w-14 h-14 rounded-xl bg-[#F5F7FC] border-2 border-white p-1.5 flex items-center justify-center"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={44}
                      height={44}
                      style={{ width: "auto", height: "auto" }}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">
                  {latestItems.map(({ product, quantity }) => `${product.name} × ${quantity}`).join(", ")}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {formatPrice(orderTotals(latest).total)} ·{" "}
                  {SHIPPING_METHODS.find((m) => m.id === latest.shippingId)?.label} via{" "}
                  {SHIPPING_METHODS.find((m) => m.id === latest.shippingId)?.carrier}
                </p>
              </div>
            </div>
            <Link
              href="/account/orders"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline shrink-0"
            >
              View all orders
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={reorder}
          className={`${cardClass} p-4 flex items-center gap-3 text-left hover:border-[#5160a3] transition-colors cursor-pointer`}
        >
          <span className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
            <RefreshCw className="w-4.5 h-4.5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-slate-900">Reorder last purchase</span>
            <span className="block text-xs text-slate-500">Adds {latest.id} items to your cart</span>
          </span>
        </button>
        <Link
          href="/return-order"
          className={`${cardClass} p-4 flex items-center gap-3 hover:border-[#5160a3] transition-colors`}
        >
          <span className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
            <RotateCcw className="w-4.5 h-4.5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-slate-900">Return an item</span>
            <span className="block text-xs text-slate-500">Free reverse pickup</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => openWhatsAppInquiry()}
          className={`${cardClass} p-4 flex items-center gap-3 text-left hover:border-[#5160a3] transition-colors cursor-pointer`}
        >
          <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4.5 h-4.5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-slate-900">Support on WhatsApp</span>
            <span className="block text-xs text-slate-500">Mon–Sat, 9 AM – 6 PM</span>
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Addresses */}
        <div className={`${cardClass} p-5 sm:p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-[#5160a3]" />
              Saved addresses
            </h3>
            <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-[#5160a3] hover:underline cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              Add new
            </button>
          </div>
          <div className="space-y-3">
            {DEMO_CUSTOMER.addresses.map(({ label, isDefault, address }) => (
              <div key={label} className="p-4 rounded-xl border border-[#D9DFF0] bg-[#F5F7FC]/60 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{label}</span>
                    {isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-[#5160a3] text-white text-[10px] font-bold">Default</span>
                    )}
                  </span>
                  <button type="button" aria-label={`Edit ${label} address`} className="p-1 text-slate-400 hover:text-[#5160a3] cursor-pointer">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="mt-1.5 text-slate-600 leading-relaxed">
                  {address.name}, {address.line1}
                  {address.line2 && `, ${address.line2}`}, {address.city}, {address.state} – {address.pincode}
                </p>
                <p className="text-xs text-slate-500 mt-1">{address.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business profile */}
        <div className={`${cardClass} p-5 sm:p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4.5 h-4.5 text-[#5160a3]" />
              Business profile
            </h3>
            <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-[#5160a3] hover:underline cursor-pointer">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          </div>
          <dl className="divide-y divide-slate-100 text-sm">
            {[
              ["Business name", DEMO_CUSTOMER.businessName],
              ["GSTIN", DEMO_CUSTOMER.gstin],
              ["Account type", `${DEMO_CUSTOMER.accountType} — GST invoice on every order`],
              ["Contact person", DEMO_CUSTOMER.name],
              ["Mobile", DEMO_CUSTOMER.phone],
              ["Email", DEMO_CUSTOMER.email],
            ].map(([term, value]) => (
              <div key={term} className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-slate-500">{term}</dt>
                <dd className="font-semibold text-slate-900 text-right break-all">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="p-4 rounded-xl bg-[#EFF3FC] border border-[#D9DFF0] text-sm text-slate-700">
            Buying regularly for a cooperative or clinic?{" "}
            <Link href="/contact?type=distributor" className="font-bold text-[#5160a3] hover:underline">
              Ask about dealer pricing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
