"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  Download,
  Package,
  MessageSquare,
  PackageCheck,
  Home,
  ArrowRight,
} from "lucide-react";
import { CommonHero } from "@/components/CommonHero";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import { OrderSummaryCard } from "@/components/OrderSummaryCard";
import { PRODUCTS } from "@/constants/products";
import { DEMO_CUSTOMER, DEMO_ORDERS, PAYMENT_METHODS, SHIPPING_METHODS, computeTotals } from "@/constants/demo";
import { loadPlacedOrder, type PlacedOrder } from "@/lib/checkoutSession";
import { cardClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/form";

// Shown when the page is opened directly (no order in this session) so it always renders for review
const SAMPLE_ORDER: PlacedOrder = {
  id: DEMO_ORDERS[0].id,
  placedAt: "2026-10-31T10:42:00+05:30",
  draft: {
    email: DEMO_CUSTOMER.email,
    address: DEMO_ORDERS[0].address,
    shippingId: DEMO_ORDERS[0].shippingId,
  },
  paymentId: DEMO_ORDERS[0].paymentId,
  items: DEMO_ORDERS[0].items,
};

export default function OrderConfirmationPage() {
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<PlacedOrder>(SAMPLE_ORDER);

  useEffect(() => {
    const placed = loadPlacedOrder();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (placed) setOrder(placed);
    setMounted(true);
  }, []);

  const items = order.items.flatMap(({ productId, size, quantity }) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const pack = product?.packs.find((p) => p.size === size) ?? product?.packs[0];
    return product && pack ? [{ product, pack, quantity }] : [];
  });
  const subtotal = items.reduce((sum, { pack, quantity }) => sum + pack.price * quantity, 0);
  const totals = computeTotals(subtotal, order.draft.shippingId, order.paymentId);
  const shipping = SHIPPING_METHODS.find((m) => m.id === order.draft.shippingId) ?? SHIPPING_METHODS[0];
  const payment = PAYMENT_METHODS.find((p) => p.id === order.paymentId) ?? PAYMENT_METHODS[0];
  const { address } = order.draft;
  const placedOn = new Date(order.placedAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const nextSteps = [
    {
      Icon: MessageSquare,
      title: "Confirmation sent",
      desc: `Order details sent to ${order.draft.email} and by SMS / WhatsApp to ${address.phone}.`,
    },
    {
      Icon: Package,
      title: "Packed at Thanjavur",
      desc: "Our team checks batch and expiry and packs your order within 1 working day.",
    },
    {
      Icon: Truck,
      title: `Handed to ${shipping.carrier}`,
      desc: "You receive the AWB tracking number as soon as the courier picks up the parcel.",
    },
    {
      Icon: PackageCheck,
      title: "Delivered",
      desc: `Expected in ${shipping.eta}. Track it anytime from your account.`,
    },
  ];

  return (
    <>
      <CommonHero
        title="Order Confirmed"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Order Confirmation" }]}
      />

      <section className="w-full bg-white py-10 sm:py-14 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <CheckoutSteps current={3} />

          {!mounted ? (
            <div className={`${cardClass} h-96 animate-pulse`} />
          ) : (
            <>
              {/* Success banner */}
              <div className={`${cardClass} p-6 sm:p-8 text-center flex flex-col items-center gap-3`}>
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="h-block text-slate-900">
                  Thank you, {address.name.split(" ")[0]}!
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                  Your order has been placed successfully. We&apos;ll keep you posted at every step until it reaches you.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm">
                  <span className="px-4 py-2 rounded-xl bg-[#EFF3FC] border border-[#D9DFF0] font-bold text-[#5160a3]">
                    Order {order.id}
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-[#F5F7FC] border border-[#D9DFF0] font-semibold text-slate-700">
                    {placedOn}
                  </span>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                  <Link href="/account/orders" className={`${primaryButtonClass} w-full sm:w-auto`}>
                    Track in my account
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/shop" className={`${secondaryButtonClass} w-full sm:w-auto`}>
                    Continue shopping
                  </Link>
                  <button
                    type="button"
                    disabled
                    title="Invoices are generated once the backend is connected"
                    className={`${secondaryButtonClass} w-full sm:w-auto opacity-60 cursor-not-allowed hover:border-[#D9DFF0] hover:text-slate-800`}
                  >
                    <Download className="w-4 h-4" />
                    Download invoice
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-8 space-y-5">
                  {/* Details */}
                  <div className={`${cardClass} p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-5`}>
                    <div className="space-y-1.5">
                      <h3 className="flex items-center gap-2 h-card text-slate-900">
                        <MapPin className="w-4 h-4 text-[#5160a3]" />
                        Delivery address
                      </h3>
                      <p className="text-sm font-semibold text-slate-800">{address.name}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {address.line1}
                        {address.line2 ? `, ${address.line2}` : ""}
                        <br />
                        {address.city}, {address.state} – {address.pincode}
                      </p>
                      <p className="text-xs text-slate-500">{address.phone}</p>
                    </div>
                    <div className="space-y-1.5 md:border-l md:border-slate-100 md:pl-5">
                      <h3 className="flex items-center gap-2 h-card text-slate-900">
                        <Truck className="w-4 h-4 text-[#5160a3]" />
                        Shipping
                      </h3>
                      <p className="text-sm font-semibold text-slate-800">{shipping.label}</p>
                      <p className="text-sm text-slate-600">via {shipping.carrier}</p>
                      <p className="text-xs text-slate-500">Estimated {shipping.eta}</p>
                    </div>
                    <div className="space-y-1.5 md:border-l md:border-slate-100 md:pl-5">
                      <h3 className="flex items-center gap-2 h-card text-slate-900">
                        <CreditCard className="w-4 h-4 text-[#5160a3]" />
                        Payment
                      </h3>
                      <p className="text-sm font-semibold text-slate-800">{payment.label}</p>
                      <p className="text-sm text-slate-600">
                        {payment.id === "cod" ? "Pay on delivery" : "Paid via Razorpay"}
                      </p>
                      {order.draft.gstin && (
                        <p className="text-xs text-slate-500">GST invoice · {order.draft.gstin}</p>
                      )}
                    </div>
                  </div>

                  {/* What happens next */}
                  <div className={`${cardClass} p-5 sm:p-6 space-y-5`}>
                    <h3 className="h-card text-slate-900">What happens next</h3>
                    <ol className="relative space-y-5">
                      {nextSteps.map(({ Icon, title, desc }, index) => (
                        <li key={title} className="relative flex items-start gap-4">
                          {index < nextSteps.length - 1 && (
                            <span className="absolute left-5 top-11 bottom-[-1.25rem] w-0.5 bg-[#D9DFF0]" aria-hidden />
                          )}
                          <span
                            className={`relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              index === 0 ? "bg-[#5160a3] text-white" : "bg-[#EFF3FC] text-[#5160a3]"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="pt-1">
                            <p className="text-sm font-bold text-slate-900">{title}</p>
                            <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <p className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-sm text-slate-600 text-center">
                    <Home className="w-4 h-4 text-[#5160a3]" />
                    Need help with this order?{" "}
                    <Link href="/contact" className="font-bold text-[#5160a3] hover:underline">
                      Contact support
                    </Link>
                    or see our{" "}
                    <Link href="/shipping-policy" className="font-bold text-[#5160a3] hover:underline">
                      shipping policy
                    </Link>
                  </p>
                </div>

                <aside className="lg:col-span-4 lg:sticky lg:top-40 lg:self-start">
                  <OrderSummaryCard items={items} totals={totals} shippingLabel={`Shipping (${shipping.carrier})`} />
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
