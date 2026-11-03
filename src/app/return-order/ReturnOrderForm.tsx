"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { formatPrice } from "@/constants/products";
import { COMPANY_INFO } from "@/constants/company";
import {
  DEMO_CUSTOMER,
  DEMO_ORDERS,
  PAYMENT_METHODS,
  RETURN_REASONS,
  orderProducts,
  type DemoOrder,
} from "@/constants/demo";
import {
  cardClass,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/ui/form";

type Step = 0 | 1 | 2;
const STEP_LABELS = ["Find order", "Select items", "Review"];

export function ReturnOrderForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(0);
  const [orderId, setOrderId] = useState(searchParams.get("order") ?? "");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [reason, setReason] = useState(RETURN_REASONS[0]);
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [refundTo, setRefundTo] = useState<"original" | "bank">("original");
  const [upiId, setUpiId] = useState("");
  const [addressIndex, setAddressIndex] = useState(0);
  const [returnId, setReturnId] = useState("");

  const eligibleOrders = DEMO_ORDERS.filter((o) => o.status === "delivered");
  const items = order ? orderProducts(order) : [];
  const selected = items.filter(({ product }) => (quantities[product.id] ?? 0) > 0);
  const refundAmount = selected.reduce(
    (sum, { product }) => sum + product.price * (quantities[product.id] ?? 0),
    0
  );
  const isCod = order?.paymentId === "cod";
  const paymentLabel = PAYMENT_METHODS.find((p) => p.id === order?.paymentId)?.label;
  const pickup = DEMO_CUSTOMER.addresses[addressIndex].address;

  const findOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const match = DEMO_ORDERS.find((o) => o.id.toLowerCase() === orderId.trim().toLowerCase());
    if (!match) {
      setError("We couldn't find that order. Check the order ID in your confirmation email or SMS.");
      return;
    }
    if (match.status !== "delivered") {
      setError(
        match.status === "return-requested"
          ? "A return is already in progress for this order."
          : "Returns open once the order is delivered. You can track it from Order History."
      );
      return;
    }
    setError("");
    setOrder(match);
    setQuantities({});
    setRefundTo(match.paymentId === "cod" ? "bank" : "original");
    setStep(1);
  };

  const changeQty = (productId: string, max: number, delta: number) =>
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.min(max, Math.max(0, (prev[productId] ?? 0) + delta)),
    }));

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files).map((f) => f.name)].slice(0, 4));
  };

  const submit = () => {
    setReturnId(`RET-${String(Math.floor(43 + Math.random() * 900)).padStart(4, "0")}`);
  };

  return (
    <section className="w-full bg-[#F5F7FC] py-10 sm:py-14 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 space-y-6">
          {returnId ? (
            /* Success */
            <div className={`${cardClass} p-6 sm:p-10 text-center space-y-6`}>
              <span className="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </span>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Return request received</h2>
                <p className="text-sm text-slate-600">
                  Return ID <strong className="text-slate-900">{returnId}</strong> for order{" "}
                  <strong className="text-slate-900">{order?.id}</strong>. We&apos;ve sent the details to your
                  mobile and email.
                </p>
              </div>
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                {[
                  { Icon: Clock, title: "Review", desc: "Our team checks your request within 24 hours." },
                  { Icon: Truck, title: "Free pickup", desc: "Shiprocket reverse pickup within 2–3 working days." },
                  { Icon: Wallet, title: "Refund", desc: "Credited 5–7 working days after quality check." },
                ].map(({ Icon, title, desc }, i) => (
                  <li key={title} className="p-4 rounded-xl border border-[#D9DFF0] bg-[#F5F7FC]/60">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span className="w-6 h-6 rounded-full bg-[#5160a3] text-white text-[11px] font-black flex items-center justify-center">
                        {i + 1}
                      </span>
                      <Icon className="w-4 h-4 text-[#5160a3]" />
                      {title}
                    </span>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{desc}</p>
                  </li>
                ))}
              </ol>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/account/orders" className={primaryButtonClass}>
                  Go to Order History
                </Link>
                <Link href="/shop" className={secondaryButtonClass}>
                  Continue shopping
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Stepper */}
              <ol className={`${cardClass} p-4 flex items-center justify-between gap-2`}>
                {STEP_LABELS.map((label, i) => (
                  <li key={label} className="flex-1 flex items-center gap-2 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        i <= step ? "bg-[#5160a3] text-white" : "bg-white border border-[#D9DFF0] text-slate-400"
                      }`}
                    >
                      {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold truncate ${i === step ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {label}
                    </span>
                    {i < STEP_LABELS.length - 1 && (
                      <span className={`hidden sm:block flex-1 h-0.5 rounded-full ${i < step ? "bg-[#5160a3]" : "bg-[#D9DFF0]"}`} />
                    )}
                  </li>
                ))}
              </ol>

              {step === 0 && (
                <form onSubmit={findOrder} className={`${cardClass} p-5 sm:p-8 space-y-6`}>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Find your order</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Enter the order ID from your confirmation email or SMS.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ro-order" className={labelClass}>
                        Order ID
                      </label>
                      <input
                        id="ro-order"
                        required
                        placeholder="e.g. ARV-10219"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="ro-contact" className={labelClass}>
                        Mobile or email used for the order
                      </label>
                      <input
                        id="ro-contact"
                        required
                        placeholder="+91 98765 43210"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  {error && (
                    <p role="alert" className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
                      {error}
                    </p>
                  )}

                  {eligibleOrders.length > 0 && (
                    <div className="space-y-2">
                      <p className={labelClass}>Or pick a recent delivered order</p>
                      <div className="flex flex-wrap gap-2">
                        {eligibleOrders.map((o) => (
                          <button
                            key={o.id}
                            type="button"
                            onClick={() => {
                              setOrderId(o.id);
                              setContact(DEMO_CUSTOMER.phone);
                            }}
                            className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                              orderId === o.id
                                ? "border-[#5160a3] bg-[#EFF3FC] text-[#5160a3]"
                                : "border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]"
                            }`}
                          >
                            {o.id} · Delivered {o.timeline.find((t) => t.status === "delivered")?.date.split(",")[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button type="submit" className={primaryButtonClass}>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {step === 1 && order && (
                <div className={`${cardClass} p-5 sm:p-8 space-y-8`}>
                  {/* Items */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="text-xl font-bold text-slate-900">Which items are you returning?</h2>
                      <span className="text-xs font-semibold text-slate-500">Order {order.id}</span>
                    </div>
                    <ul className="divide-y divide-slate-100 border border-[#D9DFF0] rounded-xl">
                      {items.map(({ product, quantity }) => {
                        const qty = quantities[product.id] ?? 0;
                        return (
                          <li key={product.id} className="p-3 sm:p-4 flex items-center gap-3">
                            <div className="w-14 h-14 rounded-lg bg-[#F5F7FC] p-1.5 flex items-center justify-center shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                style={{ width: "auto", height: "auto" }}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</p>
                              <p className="text-xs text-slate-500">
                                Bought {quantity} · {formatPrice(product.price)} each
                              </p>
                            </div>
                            <div className="flex items-center border border-[#D9DFF0] rounded-lg overflow-hidden text-sm">
                              <button
                                type="button"
                                onClick={() => changeQty(product.id, quantity, -1)}
                                aria-label={`Return one less ${product.name}`}
                                className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center font-bold text-slate-900">{qty}</span>
                              <button
                                type="button"
                                onClick={() => changeQty(product.id, quantity, 1)}
                                aria-label={`Return one more ${product.name}`}
                                className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Reason */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Reason for return</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {RETURN_REASONS.map((r) => (
                        <label
                          key={r}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                            reason === r ? "border-[#5160a3] bg-[#EFF3FC] font-semibold text-slate-900" : "border-[#D9DFF0] text-slate-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="reason"
                            checked={reason === r}
                            onChange={() => setReason(r)}
                            className="accent-[#5160a3]"
                          />
                          {r}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="ro-details" className={labelClass}>
                        Tell us more <span className="normal-case font-medium text-slate-400">(optional)</span>
                      </label>
                      <textarea
                        id="ro-details"
                        rows={3}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="e.g. One bottle arrived with a broken seal"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <span className={labelClass}>Photos of the product &amp; packaging</span>
                      <div className="flex flex-wrap gap-2">
                        {photos.map((name) => (
                          <span
                            key={name}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F7FC] border border-[#D9DFF0] text-xs font-semibold text-slate-700"
                          >
                            <Camera className="w-3.5 h-3.5 text-[#5160a3]" />
                            <span className="max-w-32 truncate">{name}</span>
                            <button
                              type="button"
                              aria-label={`Remove ${name}`}
                              onClick={() => setPhotos((prev) => prev.filter((p) => p !== name))}
                              className="text-slate-400 hover:text-rose-500 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                        {photos.length < 4 && (
                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[#5160a3]/50 text-xs font-bold text-[#5160a3] hover:bg-[#EFF3FC] cursor-pointer">
                            <Camera className="w-4 h-4" />
                            Add photos
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="sr-only"
                              onChange={(e) => addPhotos(e.target.files)}
                            />
                          </label>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400">Up to 4 images. Helps us approve faster.</p>
                    </div>
                  </div>

                  {/* Refund method */}
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900">Refund to</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {!isCod && (
                        <label
                          className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                            refundTo === "original" ? "border-[#5160a3] bg-[#EFF3FC]" : "border-[#D9DFF0]"
                          }`}
                        >
                          <span className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
                            <input
                              type="radio"
                              name="refund"
                              checked={refundTo === "original"}
                              onChange={() => setRefundTo("original")}
                              className="accent-[#5160a3]"
                            />
                            Original payment method
                          </span>
                          <span className="block mt-1 pl-6 text-xs text-slate-500">
                            {paymentLabel} via Razorpay
                          </span>
                        </label>
                      )}
                      <label
                        className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                          refundTo === "bank" ? "border-[#5160a3] bg-[#EFF3FC]" : "border-[#D9DFF0]"
                        }`}
                      >
                        <span className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
                          <input
                            type="radio"
                            name="refund"
                            checked={refundTo === "bank"}
                            onChange={() => setRefundTo("bank")}
                            className="accent-[#5160a3]"
                          />
                          UPI / bank account
                        </span>
                        <span className="block mt-1 pl-6 text-xs text-slate-500">
                          {isCod ? "For Cash on Delivery orders" : "Credited to your UPI ID"}
                        </span>
                      </label>
                    </div>
                    {refundTo === "bank" && (
                      <div className="max-w-sm">
                        <label htmlFor="ro-upi" className={labelClass}>
                          UPI ID
                        </label>
                        <input
                          id="ro-upi"
                          placeholder="name@okbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    )}
                  </div>

                  {/* Pickup address */}
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-slate-900">Pickup address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEMO_CUSTOMER.addresses.map(({ label, address }, i) => (
                        <label
                          key={label}
                          className={`p-4 rounded-xl border cursor-pointer text-sm transition-colors ${
                            addressIndex === i ? "border-[#5160a3] bg-[#EFF3FC]" : "border-[#D9DFF0]"
                          }`}
                        >
                          <span className="flex items-center gap-2.5 font-bold text-slate-900">
                            <input
                              type="radio"
                              name="pickup"
                              checked={addressIndex === i}
                              onChange={() => setAddressIndex(i)}
                              className="accent-[#5160a3]"
                            />
                            {label}
                          </span>
                          <span className="block mt-1 pl-6 text-xs text-slate-500 leading-relaxed">
                            {address.line1}, {address.city} – {address.pincode}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-between gap-3">
                    <button type="button" onClick={() => setStep(0)} className={secondaryButtonClass}>
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={selected.length === 0 || (refundTo === "bank" && !upiId.trim())}
                      onClick={() => setStep(2)}
                      className={primaryButtonClass}
                    >
                      Review request
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && order && (
                <div className={`${cardClass} p-5 sm:p-8 space-y-6`}>
                  <h2 className="text-xl font-bold text-slate-900">Review your return</h2>
                  <ul className="divide-y divide-slate-100 border border-[#D9DFF0] rounded-xl">
                    {selected.map(({ product }) => (
                      <li key={product.id} className="p-3 flex items-center justify-between gap-3 text-sm">
                        <span className="font-semibold text-slate-900">
                          {product.name} × {quantities[product.id]}
                        </span>
                        <span className="font-bold text-slate-900">
                          {formatPrice(product.price * (quantities[product.id] ?? 0))}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {[
                      ["Order", order.id],
                      ["Reason", reason],
                      ["Refund to", refundTo === "original" ? `${paymentLabel} (Razorpay)` : `UPI · ${upiId}`],
                      ["Photos", photos.length ? `${photos.length} attached` : "None"],
                    ].map(([term, value]) => (
                      <div key={term} className="p-3 rounded-xl bg-[#F5F7FC] border border-[#D9DFF0]">
                        <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{term}</dt>
                        <dd className="mt-0.5 font-semibold text-slate-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-[#5160a3] mt-0.5 shrink-0" />
                    Pickup from {pickup.name}, {pickup.line1}, {pickup.city}, {pickup.state} – {pickup.pincode}
                  </p>
                  <div className="p-4 rounded-xl bg-[#EFF3FC] border border-[#D9DFF0] flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">Estimated refund</span>
                    <span className="text-xl font-black text-slate-900">{formatPrice(refundAmount)}</span>
                  </div>
                  <div className="pt-5 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-between gap-3">
                    <button type="button" onClick={() => setStep(1)} className={secondaryButtonClass}>
                      <ArrowLeft className="w-4 h-4" />
                      Edit
                    </button>
                    <button type="button" onClick={submit} className={primaryButtonClass}>
                      Submit return request
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Policy summary */}
        <aside className="lg:col-span-4 space-y-4">
          <div className={`${cardClass} p-5 sm:p-6 space-y-4`}>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#5160a3]" />
              Our return promise
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                "Raise a return within 7 days of delivery",
                "Damaged, leaking, wrong or expired items are fully refunded",
                "Free reverse pickup through Shiprocket",
                "Refund in 5–7 working days after quality check",
                "Opened products can't be returned for hygiene reasons unless defective",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/refund-policy" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline">
              Read full Refund &amp; Returns policy
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className={`${cardClass} p-5 sm:p-6 text-sm text-slate-600 space-y-2`}>
            <p className="font-bold text-slate-900">Need help?</p>
            <p>
              Call <a href={`tel:${COMPANY_INFO.phone}`} className="font-semibold text-[#5160a3]">{COMPANY_INFO.displayPhone}</a> or{" "}
              <Link href="/contact" className="font-semibold text-[#5160a3] hover:underline">
                contact us
              </Link>
              . Mon–Sat, 9 AM – 6 PM.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
