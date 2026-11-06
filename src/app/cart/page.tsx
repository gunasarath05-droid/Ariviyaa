"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ShoppingBag,
  Truck,
  Tag,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CommonHero } from "@/components/CommonHero";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import { useApp, cartLineKey } from "@/context/AppContext";
import { useAccount } from "@/context/AccountContext";
import { formatPrice } from "@/constants/products";
import { computeTotals, FREE_SHIPPING_THRESHOLD } from "@/constants/demo";
import { cardClass, inputClass, primaryButtonClass } from "@/components/ui/form";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();
  const { user } = useAccount();

  // Cart restores from localStorage after mount; wait so the empty state doesn't flash
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const totals = computeTotals(cartSubtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const progress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "ARIVIYA10") {
      setCouponMessage({ ok: true, text: "ARIVIYA10 applied — 10% off will be confirmed at payment (demo)." });
    } else {
      setCouponMessage({ ok: false, text: "This coupon code is not valid." });
    }
  };

  const moveToWishlist = (productId: string, lineKey: string) => {
    if (!isInWishlist(productId)) toggleWishlist(productId);
    removeFromCart(lineKey);
  };

  return (
    <>
      <CommonHero
        title="Your Cart"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Cart" }]}
      />

      <section className="w-full bg-[#F5F7FC] py-10 sm:py-14 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <CheckoutSteps current={0} />

          {!mounted ? (
            <div className={`${cardClass} h-64 animate-pulse`} />
          ) : cart.length === 0 ? (
            <div className={`${cardClass} py-16 px-6 text-center flex flex-col items-center gap-3`}>
              <div className="w-16 h-16 rounded-full bg-[#EFF3FC] text-[#5160a3] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
              <p className="text-sm text-slate-500 max-w-sm">
                Browse mastitis care, pet health and farm hygiene products and add them here.
              </p>
              <Link href="/shop" className={`${primaryButtonClass} mt-2`}>
                Start shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Line items */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free shipping progress */}
                <div className={`${cardClass} p-4 sm:p-5 space-y-2.5`}>
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <Truck className="w-4 h-4 text-[#5160a3] shrink-0" />
                    {remaining > 0 ? (
                      <span>
                        Add <strong className="text-slate-900">{formatPrice(remaining)}</strong> more for free standard delivery
                      </span>
                    ) : (
                      <span className="font-semibold text-slate-900">You&apos;ve unlocked free standard delivery</span>
                    )}
                  </p>
                  <div className="h-2 rounded-full bg-[#EFF3FC] overflow-hidden">
                    <div className="h-full rounded-full bg-[#5160a3] transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className={`${cardClass} divide-y divide-slate-100`}>
                  <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <span className="col-span-6">Product</span>
                    <span className="col-span-3 text-center">Quantity</span>
                    <span className="col-span-3 text-right">Total</span>
                  </div>

                  {cart.map((item) => {
                    const { product, pack, quantity } = item;
                    const lineKey = cartLineKey(item);
                    return (
                    <div key={lineKey} className="p-4 sm:px-5 sm:py-4 grid grid-cols-12 gap-3 sm:gap-4 items-center">
                      <div className="col-span-12 sm:col-span-6 flex items-center gap-3.5 min-w-0">
                        <Link
                          href={`/shop/${product.slug}`}
                          className="w-20 h-20 rounded-xl bg-[#F5F7FC] p-2 flex items-center justify-center shrink-0"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={72}
                            height={72}
                            style={{ width: "auto", height: "auto" }}
                            className="max-h-full max-w-full object-contain"
                          />
                        </Link>
                        <div className="min-w-0 space-y-1">
                          <Link
                            href={`/shop/${product.slug}`}
                            className="block text-sm sm:text-base font-bold text-slate-900 hover:text-[#5160a3] line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-slate-500">Pack: {pack.size}</p>
                          <p className="text-sm font-semibold text-slate-700">{formatPrice(pack.price)}</p>
                          <div className="flex items-center gap-3 pt-0.5 text-xs font-semibold">
                            <button
                              type="button"
                              onClick={() => moveToWishlist(product.id, lineKey)}
                              className="inline-flex items-center gap-1 text-slate-500 hover:text-[#5160a3] cursor-pointer"
                            >
                              <Heart className="w-3.5 h-3.5" />
                              Save for later
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromCart(lineKey)}
                              className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-3 flex sm:justify-center">
                        <div className="inline-flex items-center border border-[#D9DFF0] rounded-xl overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(lineKey, quantity - 1)}
                            className="px-3 py-2 text-slate-600 hover:bg-[#F5F7FC] cursor-pointer"
                            aria-label={`Decrease quantity of ${product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-slate-900">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(lineKey, quantity + 1)}
                            className="px-3 py-2 text-slate-600 hover:bg-[#F5F7FC] cursor-pointer"
                            aria-label={`Increase quantity of ${product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-3 text-right text-base font-bold text-slate-900">
                        {formatPrice(pack.price * quantity)}
                      </div>
                    </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link href="/shop" className="text-sm font-bold text-[#5160a3] hover:underline">
                    ← Continue shopping
                  </Link>
                  <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 text-center">
                    <Building2 className="w-4 h-4 text-[#5160a3] shrink-0" />
                    <span>
                      Ordering in bulk for a cooperative or clinic?{" "}
                      <Link href="/contact?type=distributor" className="font-bold text-[#5160a3] hover:underline">
                        Request dealer pricing
                      </Link>
                    </span>
                  </p>
                </div>
              </div>

              {/* Summary */}
              <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                <div className={`${cardClass} p-5 sm:p-6 space-y-5`}>
                  <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

                  <form onSubmit={applyCoupon} className="space-y-2">
                    <label htmlFor="coupon" className="sr-only">
                      Coupon code
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="coupon"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="Coupon code"
                          className={`${inputClass} pl-9 py-2.5 uppercase`}
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 rounded-xl border border-[#D9DFF0] bg-white text-sm font-bold text-slate-800 hover:border-[#5160a3] hover:text-[#5160a3] cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-xs font-semibold ${couponMessage.ok ? "text-emerald-700" : "text-rose-600"}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </form>

                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <dt>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</dt>
                      <dd className="font-semibold text-slate-900">{formatPrice(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <dt>Shipping (standard)</dt>
                      <dd className="font-semibold text-slate-900">
                        {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <dt>GST included</dt>
                      <dd>{formatPrice(totals.gstIncluded)}</dd>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                      <dt className="font-bold text-slate-900">Total</dt>
                      <dd className="text-2xl font-black text-slate-900">{formatPrice(totals.total)}</dd>
                    </div>
                  </dl>

                  <Link
                    href={user ? "/checkout" : "/login?next=/checkout"}
                    className={`${primaryButtonClass} w-full`}
                  >
                    {user ? "Proceed to checkout" : "Sign in to checkout"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  {!user && (
                    <p className="text-center text-xs text-slate-500">
                      New here? You can create an account in a minute — your cart stays saved.
                    </p>
                  )}

                  <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5160a3]" />
                    Secure payments by Razorpay · Shipping via Shiprocket
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
