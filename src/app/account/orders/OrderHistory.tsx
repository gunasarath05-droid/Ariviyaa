"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Truck,
  FileDown,
  RefreshCw,
  RotateCcw,
  MapPin,
  CreditCard,
  PackageSearch,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/constants/products";
import {
  DEMO_ORDERS,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  orderProducts,
  orderTotals,
  type DemoOrder,
} from "@/constants/demo";
import { cardClass } from "@/components/ui/form";
import { OrderProgress, OrderTimeline, StatusPill } from "../OrderProgress";

type Filter = "all" | "progress" | "delivered" | "returns";

const FILTERS: { id: Filter; label: string; match: (o: DemoOrder) => boolean }[] = [
  { id: "all", label: "All orders", match: () => true },
  {
    id: "progress",
    label: "In progress",
    match: (o) => ["placed", "packed", "shipped", "out-for-delivery"].includes(o.status),
  },
  { id: "delivered", label: "Delivered", match: (o) => o.status === "delivered" },
  { id: "returns", label: "Returns", match: (o) => o.status === "return-requested" || o.status === "returned" },
];

const actionClass =
  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D9DFF0] bg-white text-xs font-bold text-slate-700 hover:border-[#5160a3] hover:text-[#5160a3] transition-colors cursor-pointer";

export function OrderHistory() {
  const { addToCart } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(DEMO_ORDERS[0]?.id ?? null);
  const [notice, setNotice] = useState("");

  const activeFilter = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];
  const orders = DEMO_ORDERS.filter(
    (o) => activeFilter.match(o) && o.id.toLowerCase().includes(query.trim().toLowerCase())
  );

  const flash = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  };

  return (
    <>
      {/* Filters + search */}
      <div className={`${cardClass} p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3`}>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const count = DEMO_ORDERS.filter(f.match).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  filter === f.id ? "bg-[#5160a3] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {f.label} <span className={filter === f.id ? "text-white/75" : "text-slate-400"}>({count})</span>
              </button>
            );
          })}
        </div>
        <div className="relative w-full md:w-60">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order ID, e.g. ARV-10219"
            aria-label="Search orders by ID"
            className="w-full pl-9 pr-4 py-2 text-sm bg-[#F5F7FC] border border-[#D9DFF0] rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5160a3]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {notice && (
        <div role="status" className="px-4 py-3 rounded-xl bg-[#EFF3FC] border border-[#D9DFF0] text-sm font-semibold text-[#5160a3]">
          {notice}
        </div>
      )}

      {orders.length === 0 ? (
        <div className={`${cardClass} py-16 px-6 text-center space-y-3`}>
          <span className="mx-auto w-14 h-14 rounded-full bg-[#F5F7FC] text-slate-300 flex items-center justify-center">
            <PackageSearch className="w-7 h-7" />
          </span>
          <p className="text-base font-bold text-slate-800">No orders found</p>
          <p className="text-sm text-slate-500">Try another filter or check the order ID.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const items = orderProducts(order);
            const totals = orderTotals(order);
            const shipping = SHIPPING_METHODS.find((m) => m.id === order.shippingId);
            const payment = PAYMENT_METHODS.find((p) => p.id === order.paymentId);
            const isOpen = openId === order.id;

            return (
              <article key={order.id} className={`${cardClass} overflow-hidden`}>
                {/* Summary row */}
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : order.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 text-left cursor-pointer hover:bg-[#F5F7FC]/50 transition-colors"
                >
                  <div className="flex -space-x-3 shrink-0">
                    {items.slice(0, 3).map(({ product }) => (
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

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-slate-900">{order.id}</span>
                      <StatusPill status={order.status} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Placed {order.date} · {items.reduce((n, i) => n + i.quantity, 0)} items
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {order.courierPartner ?? shipping?.carrier}
                      {order.awb ? ` · AWB ${order.awb}` : " · AWB assigned at dispatch"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <span className="text-base font-black text-slate-900">{formatPrice(totals.total)}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 p-4 sm:p-6 space-y-6">
                    {order.status !== "cancelled" && <OrderProgress order={order} />}

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      {/* Items + totals */}
                      <div className="lg:col-span-3 space-y-4">
                        <ul className="divide-y divide-slate-100 border border-[#D9DFF0] rounded-xl">
                          {items.map(({ product, quantity }) => (
                            <li key={product.id} className="p-3 flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-[#F5F7FC] p-1 flex items-center justify-center shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  style={{ width: "auto", height: "auto" }}
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/shop/${product.slug}`}
                                  className="text-sm font-bold text-slate-900 hover:text-[#5160a3] line-clamp-1"
                                >
                                  {product.name}
                                </Link>
                                <p className="text-xs text-slate-500">
                                  {quantity} × {formatPrice(product.price)}
                                </p>
                              </div>
                              <span className="text-sm font-bold text-slate-900">
                                {formatPrice(product.price * quantity)}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <dl className="text-sm space-y-1.5 px-1">
                          <div className="flex justify-between text-slate-600">
                            <dt>Subtotal</dt>
                            <dd>{formatPrice(totals.subtotal)}</dd>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <dt>Shipping ({shipping?.label})</dt>
                            <dd>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
                          </div>
                          {totals.codFee > 0 && (
                            <div className="flex justify-between text-slate-600">
                              <dt>COD charge</dt>
                              <dd>{formatPrice(totals.codFee)}</dd>
                            </div>
                          )}
                          <div className="flex justify-between pt-2 border-t border-slate-100 font-black text-slate-900">
                            <dt>Total paid</dt>
                            <dd>{formatPrice(totals.total)}</dd>
                          </div>
                          <p className="text-xs text-slate-400">Includes GST of {formatPrice(totals.gstIncluded)}</p>
                        </dl>
                      </div>

                      {/* Timeline + address + payment */}
                      <div className="lg:col-span-2 space-y-5">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tracking</h4>
                          <OrderTimeline order={order} />
                        </div>
                        <div className="text-sm space-y-3">
                          <p className="flex items-start gap-2 text-slate-600">
                            <MapPin className="w-4 h-4 text-[#5160a3] mt-0.5 shrink-0" />
                            <span>
                              <strong className="text-slate-900">{order.address.name}</strong>, {order.address.line1},{" "}
                              {order.address.city}, {order.address.state} – {order.address.pincode}
                            </span>
                          </p>
                          <p className="flex items-center gap-2 text-slate-600">
                            <CreditCard className="w-4 h-4 text-[#5160a3] shrink-0" />
                            <span>
                              {payment?.label}
                              {order.paymentId !== "cod" && " via Razorpay"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                      {order.awb && (
                        <button
                          type="button"
                          className={actionClass}
                          onClick={() => flash(`Live tracking for AWB ${order.awb} opens on the courier site once connected.`)}
                        >
                          <Truck className="w-3.5 h-3.5" />
                          Track shipment
                        </button>
                      )}
                      <button
                        type="button"
                        className={actionClass}
                        onClick={() => flash(`Invoice for ${order.id} will download as a GST PDF.`)}
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        Download invoice
                      </button>
                      <button
                        type="button"
                        className={actionClass}
                        onClick={() => items.forEach(({ product, quantity }) => addToCart(product, quantity))}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reorder
                      </button>
                      {order.status === "delivered" && (
                        <Link href={`/return-order?order=${order.id}`} className={actionClass}>
                          <RotateCcw className="w-3.5 h-3.5" />
                          Return items
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
