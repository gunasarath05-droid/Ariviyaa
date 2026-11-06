"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, UserRound, Truck, Building2, ShoppingBag, ShieldCheck } from "lucide-react";
import { CommonHero } from "@/components/CommonHero";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import { OrderSummaryCard } from "@/components/OrderSummaryCard";
import { useApp } from "@/context/AppContext";
import { useAccount } from "@/context/AccountContext";
import { formatPrice } from "@/constants/products";
import {
  SHIPPING_METHODS,
  FREE_SHIPPING_THRESHOLD,
  computeTotals,
  type Address,
  type ShippingMethodId,
} from "@/constants/demo";
import { loadCheckoutDraft, saveCheckoutDraft } from "@/lib/checkoutSession";
import { cardClass, inputClass, labelClass, primaryButtonClass } from "@/components/ui/form";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

const EMPTY_ADDRESS: Address = {
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "Tamil Nadu",
  pincode: "",
};

type Errors = Partial<Record<"email" | "name" | "phone" | "line1" | "city" | "pincode" | "businessName" | "gstin", string>>;

function SectionTitle({ step, icon: Icon, title }: { step: number; icon: React.ElementType; title: string }) {
  return (
    <h2 className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900">
      <span className="w-8 h-8 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <span>
        <span className="text-[#5160a3]">{step}.</span> {title}
      </span>
    </h2>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs font-semibold text-rose-600">{message}</p> : null;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal } = useApp();
  const { ready, user } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [needsGst, setNeedsGst] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [gstin, setGstin] = useState("");
  const [shippingId, setShippingId] = useState<ShippingMethodId>("shiprocket-standard");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  // Restore a previous draft (e.g. coming back from the payment step), else prefill from the account
  useEffect(() => {
    if (!ready) return;
    const draft = loadCheckoutDraft();
    if (!draft && user) {
      const saved = user.addresses.find((a) => a.isDefault)?.address;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(user.email);
      setAddress(saved ?? { ...EMPTY_ADDRESS, name: user.name, phone: user.phone });
      if (user.accountType === "Business" && user.gstin) {
        setNeedsGst(true);
        setBusinessName(user.businessName ?? "");
        setGstin(user.gstin);
      }
    }
    if (draft) {
      // Restoring from sessionStorage (an external store) once on mount
      setEmail(draft.email);
      setAddress(draft.address);
      setShippingId(draft.shippingId);
      setNotes(draft.notes ?? "");
      if (draft.gstin) {
        setNeedsGst(true);
        setGstin(draft.gstin);
        setBusinessName(draft.businessName ?? "");
      }
    }
    setMounted(true);
    // Runs once the account session is known; later edits by the user are not overwritten
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const totals = computeTotals(cartSubtotal, shippingId);

  const updateAddress = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  const savedAddresses = user?.addresses ?? [];
  const hasBusinessDetails = Boolean(user?.businessName && user.gstin);

  const applySavedAddress = (index: number) => {
    setAddress(savedAddresses[index].address);
    setEmail((prev) => prev || user?.email || "");
    setErrors({});
  };

  const fillBusinessDetails = () => {
    setNeedsGst(true);
    setBusinessName(user?.businessName ?? "");
    setGstin(user?.gstin ?? "");
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address";
    if (!address.name.trim()) next.name = "Enter the receiver's name";
    if (address.phone.replace(/\D/g, "").slice(-10).length !== 10) next.phone = "Enter a 10-digit mobile number";
    if (!address.line1.trim()) next.line1 = "Enter the house / street address";
    if (!address.city.trim()) next.city = "Enter the city or town";
    if (!/^\d{6}$/.test(address.pincode)) next.pincode = "Enter a 6-digit pincode";
    if (needsGst) {
      if (!businessName.trim()) next.businessName = "Enter the registered business name";
      if (!/^[0-9A-Z]{15}$/.test(gstin.trim().toUpperCase())) next.gstin = "GSTIN must be 15 characters";
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`co-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    saveCheckoutDraft({
      email,
      address,
      shippingId,
      notes: notes.trim() || undefined,
      gstin: needsGst ? gstin.trim().toUpperCase() : undefined,
      businessName: needsGst ? businessName.trim() : undefined,
    });
    router.push("/payment");
  };

  return (
    <>
      <CommonHero
        title="Checkout"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />

      <section className="w-full bg-[#F5F7FC] py-10 sm:py-14 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <CheckoutSteps current={1} />

          {!mounted ? (
            <div className={`${cardClass} h-96 animate-pulse`} />
          ) : cart.length === 0 ? (
            <div className={`${cardClass} py-16 px-6 text-center flex flex-col items-center gap-3`}>
              <div className="w-16 h-16 rounded-full bg-[#EFF3FC] text-[#5160a3] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
              <p className="text-sm text-slate-500 max-w-sm">Add products to your cart before checking out.</p>
              <Link href="/shop" className={`${primaryButtonClass} mt-2`}>
                Go to shop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                {/* Login prompt (signed-in shoppers see who they are ordering as) */}
                {user ? (
                  <div className={`${cardClass} p-4 sm:p-5 text-sm text-slate-600`}>
                    Ordering as <strong className="text-slate-900">{user.name}</strong> ({user.email}). This order
                    will appear in your account.
                  </div>
                ) : (
                <div className={`${cardClass} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                  <p className="text-sm text-slate-600">
                    Already ordered with us? <strong className="text-slate-900">Sign in</strong> to use saved addresses and
                    track orders.
                  </p>
                  <Link
                    href="/login?next=/checkout"
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-[#D9DFF0] text-sm font-bold text-[#5160a3] hover:border-[#5160a3]"
                  >
                    Login for faster checkout
                  </Link>
                </div>
                )}

                {/* 1. Contact */}
                <div className={`${cardClass} p-5 sm:p-6 space-y-5`}>
                  <SectionTitle step={1} icon={UserRound} title="Contact details" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="co-email" className={labelClass}>
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="co-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                      />
                      <FieldError message={errors.email} />
                    </div>
                    <div>
                      <label htmlFor="co-phone" className={labelClass}>
                        Mobile number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="co-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="98765 43210"
                        value={address.phone}
                        onChange={updateAddress("phone")}
                        className={inputClass}
                      />
                      <FieldError message={errors.phone} />
                      <p className="mt-1.5 text-[11px] text-slate-500">Order and tracking updates are sent by SMS / WhatsApp.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Address */}
                <div className={`${cardClass} p-5 sm:p-6 space-y-5`}>
                  <SectionTitle step={2} icon={MapPin} title="Delivery address" />

                  {savedAddresses.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Saved addresses:</span>
                    {savedAddresses.map((saved, index) => (
                      <button
                        key={saved.label}
                        type="button"
                        onClick={() => applySavedAddress(index)}
                        className="px-3 py-1.5 rounded-full border border-[#D9DFF0] bg-[#F5F7FC] text-xs font-bold text-slate-700 hover:border-[#5160a3] hover:text-[#5160a3] cursor-pointer"
                      >
                        {saved.label} · {saved.address.city} {saved.address.pincode}
                      </button>
                    ))}
                  </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="co-name" className={labelClass}>
                        Full name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="co-name"
                        autoComplete="name"
                        placeholder="Receiver's name"
                        value={address.name}
                        onChange={updateAddress("name")}
                        className={inputClass}
                      />
                      <FieldError message={errors.name} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="co-line1" className={labelClass}>
                        House / street <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="co-line1"
                        autoComplete="address-line1"
                        placeholder="Door no., street, farm name"
                        value={address.line1}
                        onChange={updateAddress("line1")}
                        className={inputClass}
                      />
                      <FieldError message={errors.line1} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="co-line2" className={labelClass}>
                        Area / landmark
                      </label>
                      <input
                        id="co-line2"
                        autoComplete="address-line2"
                        placeholder="Village, area or landmark (optional)"
                        value={address.line2 ?? ""}
                        onChange={updateAddress("line2")}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="co-city" className={labelClass}>
                        City / town <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="co-city"
                        autoComplete="address-level2"
                        placeholder="e.g. Thanjavur"
                        value={address.city}
                        onChange={updateAddress("city")}
                        className={inputClass}
                      />
                      <FieldError message={errors.city} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="co-state" className={labelClass}>
                          State
                        </label>
                        <select
                          id="co-state"
                          autoComplete="address-level1"
                          value={address.state}
                          onChange={updateAddress("state")}
                          className={`${inputClass} px-3 cursor-pointer`}
                        >
                          {INDIAN_STATES.map((state) => (
                            <option key={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="co-pincode" className={labelClass}>
                          Pincode <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="co-pincode"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          maxLength={6}
                          placeholder="613403"
                          value={address.pincode}
                          onChange={(e) =>
                            setAddress((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "") }))
                          }
                          className={inputClass}
                        />
                        <FieldError message={errors.pincode} />
                      </div>
                    </div>
                  </div>

                  {/* GST invoice */}
                  <div className="rounded-xl border border-[#D9DFF0] bg-[#F5F7FC] p-4 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={needsGst}
                          onChange={(e) => setNeedsGst(e.target.checked)}
                          className="w-4 h-4 accent-[#5160a3]"
                        />
                        <Building2 className="w-4 h-4 text-[#5160a3]" />
                        I need a GST invoice for my business
                      </label>
                      {!needsGst && hasBusinessDetails && (
                        <button
                          type="button"
                          onClick={fillBusinessDetails}
                          className="text-xs font-bold text-[#5160a3] hover:underline cursor-pointer text-left"
                        >
                          Use saved business details
                        </button>
                      )}
                    </div>
                    {needsGst && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="co-businessName" className={labelClass}>
                            Business name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            id="co-businessName"
                            autoComplete="organization"
                            placeholder="Registered business name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className={inputClass}
                          />
                          <FieldError message={errors.businessName} />
                        </div>
                        <div>
                          <label htmlFor="co-gstin" className={labelClass}>
                            GSTIN <span className="text-rose-500">*</span>
                          </label>
                          <input
                            id="co-gstin"
                            maxLength={15}
                            placeholder="33ABCDE1234F1Z5"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value.toUpperCase())}
                            className={`${inputClass} uppercase`}
                          />
                          <FieldError message={errors.gstin} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Shipping method */}
                <div className={`${cardClass} p-5 sm:p-6 space-y-5`}>
                  <SectionTitle step={3} icon={Truck} title="Shipping method" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="radiogroup" aria-label="Shipping method">
                    {SHIPPING_METHODS.map((method) => {
                      const selected = method.id === shippingId;
                      const fee = computeTotals(cartSubtotal, method.id).shipping;
                      return (
                        <label
                          key={method.id}
                          className={`relative p-4 rounded-xl border cursor-pointer transition-colors flex flex-col gap-1.5 ${
                            selected
                              ? "border-[#5160a3] bg-[#EFF3FC] ring-2 ring-[#5160a3]/15"
                              : "border-[#D9DFF0] bg-white hover:border-[#5160a3]/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={selected}
                            onChange={() => setShippingId(method.id)}
                            className="sr-only"
                          />
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-slate-900">{method.label}</span>
                            <span className="text-sm font-bold text-slate-900">{fee === 0 ? "Free" : formatPrice(fee)}</span>
                          </span>
                          <span className="text-xs font-semibold text-[#5160a3]">via {method.carrier}</span>
                          <span className="text-xs text-slate-600">{method.eta}</span>
                          <span className="text-[11px] text-slate-500">{method.note}</span>
                        </label>
                      );
                    })}
                  </div>
                  {shippingId === "st-courier" && (
                    <p className="text-xs text-slate-600 bg-[#F5F7FC] border border-[#D9DFF0] rounded-xl px-4 py-3">
                      ST Courier parcels are booked by our dispatch team after the order is confirmed. You&apos;ll receive the
                      AWB number on SMS / WhatsApp within one working day.
                    </p>
                  )}
                  {cartSubtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-slate-500">
                      Standard delivery is free on orders above {formatPrice(FREE_SHIPPING_THRESHOLD)}.
                    </p>
                  )}

                  <div>
                    <label htmlFor="co-notes" className={labelClass}>
                      Order notes
                    </label>
                    <textarea
                      id="co-notes"
                      rows={3}
                      placeholder="Delivery instructions, preferred time, herd size for bulk orders… (optional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28">
                <OrderSummaryCard items={cart} totals={totals}>
                  <button type="submit" className={`${primaryButtonClass} w-full`}>
                    Continue to payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link href="/cart" className="block text-center text-sm font-bold text-[#5160a3] hover:underline">
                    ← Back to cart
                  </Link>
                  <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5160a3]" />
                    Payments secured by Razorpay
                  </p>
                </OrderSummaryCard>
              </aside>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
