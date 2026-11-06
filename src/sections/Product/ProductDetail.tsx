"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Building2,
  ArrowRight,
  CheckCircle2,
  Award,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  PRODUCTS,
  formatPrice,
  priceLabel,
  type ProductItem,
  type CategoryGroup,
} from "@/constants/products";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS } from "@/constants/demo";
import { COMPANY_INFO } from "@/constants/company";

// Application steps per product group — placeholder copy until the product team supplies labels
const HOW_TO_USE: Record<CategoryGroup, string[]> = {
  farm: [
    "Clean and dry the teats before milking.",
    "Right after milking, dip each teat fully using a teat dip cup.",
    "Let the film air-dry — do not wipe it off.",
    "Wash teats as usual before the next milking. No withholding period.",
  ],
  pet: [
    "Clean the affected area gently and pat dry.",
    "Shake well and spray from 10–15 cm until the area is covered.",
    "Repeat 2–3 times a day or as advised by your veterinarian.",
    "Safe if licked — no cone needed for most pets.",
  ],
  poultry: [
    "Dilute as directed on the label.",
    "Spray across sheds, feeders and drinkers after cleaning.",
    "Repeat between flock cycles and during disease alerts.",
  ],
  home: [
    "Follow the dilution or spray directions on the label.",
    "Use on floors, vessels or surfaces as directed.",
    "Store closed, away from children and direct sunlight.",
  ],
  general: [
    "Spray directly on the surface from 15–20 cm.",
    "Leave for 2 minutes, then wipe with a clean cloth.",
    "Use daily on tables, cages and high-touch surfaces.",
  ],
};

// Bulk slabs from the client (Nov 2026): 10% is about one or two bottles free, 20% three or four
const BULK_TIERS = [
  { range: "1 – 9 units", discount: 0 },
  { range: "10 – 49 units", discount: 10 },
  { range: "50 – 199 units", discount: 20 },
  { range: "200+ units", discount: null },
];

const TABS = ["Description", "How to use", "Specifications"] as const;

export function ProductDetail({ product }: { product: ProductItem }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, openWhatsAppInquiry, setIsSideDrawerOpen } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [pack, setPack] = useState(product.packs[0]);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");

  const saved = isInWishlist(product.id);
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categoryGroup === product.categoryGroup || p.division === product.division)
  ).slice(0, 4);

  const buyNow = () => {
    addToCart(product, quantity, pack);
    setIsSideDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      {/* Breadcrumb strip */}
      <div className="w-full bg-white border-b border-[#D9DFF0] font-sans">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 overflow-x-auto no-scrollbar whitespace-nowrap">
            <li><Link href="/" className="hover:text-[#5160a3]">Home</Link></li>
            <li className="text-slate-400">/</li>
            <li><Link href="/shop" className="hover:text-[#5160a3]">Shop</Link></li>
            <li className="text-slate-400">/</li>
            <li className="text-[#5160a3] font-bold truncate" aria-current="page">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Main product block */}
      <section className="w-full bg-[#F5F7FC] py-8 sm:py-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative bg-white rounded-3xl border border-[#D9DFF0] aspect-square flex items-center justify-center p-8 sm:p-12">
              {product.comingSoon && (
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#5160a3] text-white text-xs font-semibold">
                  Coming soon
                </span>
              )}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white border border-[#D9DFF0] flex items-center justify-center transition-colors cursor-pointer ${
                  saved ? "text-rose-500" : "text-slate-500 hover:text-rose-500"
                }`}
                aria-label={saved ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-5 h-5 ${saved ? "fill-rose-500" : ""}`} />
              </button>
              <Image
                src={product.image}
                alt={product.name}
                width={520}
                height={520}
                priority
                style={{ width: "auto", height: "auto" }}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`aspect-square bg-white rounded-2xl border p-2 flex items-center justify-center ${
                    i === 0 ? "border-[#5160a3]" : "border-[#D9DFF0] opacity-70"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt=""
                    width={96}
                    height={96}
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-semibold text-[#5160a3]">{product.categoryLabel}</span>
              <h1 className="h-section text-slate-900">
                {product.name}
              </h1>
              <p className="t-lead text-slate-600">{product.subtitle}</p>
              {product.rating && product.reviewsCount ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {product.rating}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{product.reviewsCount} reviews</span>
                </div>
              ) : null}
            </div>

            <div className="flex items-baseline gap-3 pb-5 border-b border-[#D9DFF0]">
              <span className="text-3xl font-bold text-slate-900">{formatPrice(pack.price)}</span>
              <span className="text-sm font-semibold text-slate-500">{pack.size}</span>
              <span className="ml-auto text-xs text-slate-500">Incl. of all taxes</span>
            </div>

            {/* Pack size */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Pack size</p>
              <div className="flex flex-wrap gap-2">
                {product.packs.map((option) => (
                  <button
                    key={option.size}
                    type="button"
                    onClick={() => setPack(option)}
                    aria-pressed={pack.size === option.size}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                      pack.size === option.size
                        ? "bg-[#5160a3] border-[#5160a3] text-white"
                        : "bg-white border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]"
                    }`}
                  >
                    {option.size}
                    <span className={`ml-1.5 font-normal ${pack.size === option.size ? "text-white/80" : "text-slate-400"}`}>
                      {formatPrice(option.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + actions (coming-soon products take enquiries only) */}
            {product.comingSoon ? (
              <div className="bg-white rounded-2xl border border-[#D9DFF0] p-4 sm:p-5 space-y-3">
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Launching soon.</strong> Message us to get notified or to
                  book an early bulk order.
                </p>
                <button
                  type="button"
                  onClick={() => openWhatsAppInquiry(`${product.name} (${pack.size}, coming soon)`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-bold transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Notify Me on WhatsApp
                </button>
              </div>
            ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center justify-between border border-[#D9DFF0] rounded-xl bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-slate-600 hover:text-[#5160a3] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-slate-900" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-slate-600 hover:text-[#5160a3] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => addToCart(product, quantity, pack)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-[#5160a3] text-[#5160a3] hover:bg-[#EFF3FC] text-sm font-bold transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={buyNow}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                Buy Now
              </button>
            </div>
            )}

            <button
              type="button"
              onClick={() => openWhatsAppInquiry(product.name)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Have a question? Ask us on WhatsApp
            </button>

            {/* Delivery & trust */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <li className="bg-white rounded-2xl border border-[#D9DFF0] p-4 flex gap-3">
                <Truck className="w-5 h-5 text-[#5160a3] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Free delivery</p>
                  <p className="text-xs text-slate-500">Above {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
                </div>
              </li>
              <li className="bg-white rounded-2xl border border-[#D9DFF0] p-4 flex gap-3">
                <RotateCcw className="w-5 h-5 text-[#5160a3] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900">7-day returns</p>
                  <p className="text-xs text-slate-500">Damaged or wrong items</p>
                </div>
              </li>
              <li className="bg-white rounded-2xl border border-[#D9DFF0] p-4 flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#5160a3] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Secure payment</p>
                  <p className="text-xs text-slate-500">Razorpay · UPI · Cards</p>
                </div>
              </li>
            </ul>

            <div className="bg-white rounded-2xl border border-[#D9DFF0] p-4 sm:p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Delivery options</p>
              <ul className="divide-y divide-slate-100">
                {SHIPPING_METHODS.map((m) => (
                  <li key={m.id} className="py-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-700">
                      <strong className="text-slate-900">{m.label}</strong> · {m.carrier}
                    </span>
                    <span className="text-slate-500 text-xs sm:text-sm whitespace-nowrap">{m.eta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Details tabs + B2B block */}
      <section className="w-full bg-white section-y border-y border-[#D9DFF0] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div role="tablist" className="flex gap-1 p-1 bg-[#F5F7FC] border border-[#D9DFF0] rounded-xl w-fit max-w-full overflow-x-auto no-scrollbar">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    tab === t ? "bg-[#5160a3] text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "Description" && (
              <div className="space-y-5 t-lead text-slate-600">
                <p>{product.description}</p>
                <p className="font-semibold text-slate-800">{product.keyBenefit}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 bg-[#F5F7FC] rounded-xl border border-[#D9DFF0] p-3 text-sm text-slate-800 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "How to use" && (
              <ol className="space-y-3">
                {HOW_TO_USE[product.categoryGroup].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <span className="w-7 h-7 rounded-full bg-[#5160a3] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {tab === "Specifications" && (
              <dl className="divide-y divide-[#D9DFF0] border border-[#D9DFF0] rounded-2xl overflow-hidden text-sm">
                {[
                  ["Suitable for", product.targetAnimals],
                  ["Technology", product.techTag],
                  ["Division", product.divisionLabel],
                  ["Category", product.categoryLabel],
                  ["Pack sizes", product.packs.map((p) => p.size).join(", ")],
                  ["Tested with", COMPANY_INFO.supportedBy.find((s) => s.includes("TANUVAS")) ?? ""],
                  ["Manufactured at", `${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state}`],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-3 gap-3 px-4 py-3 bg-white odd:bg-[#F5F7FC]">
                    <dt className="font-bold text-slate-700">{label}</dt>
                    <dd className="col-span-2 text-slate-600">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-2">
              {COMPANY_INFO.certifications.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF3FC] border border-[#D9DFF0] text-xs font-semibold text-[#5160a3]">
                  <Award className="w-3.5 h-3.5" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* B2B / bulk pricing */}
          <aside className="lg:col-span-4">
            <div className="bg-[#F5F7FC] rounded-2xl border border-[#D9DFF0] p-5 sm:p-6 space-y-4 lg:sticky lg:top-40">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#5160a3]" />
                <h2 className="h-card text-slate-900">Buying in bulk?</h2>
              </div>
              <p className="t-body text-slate-500">
                Dairy cooperatives, vet clinics, pet stores and distributors get tiered pricing and GST invoices.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="pb-2 font-bold">Quantity</th>
                    <th className="pb-2 font-bold text-right">Price / unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9DFF0]">
                  {BULK_TIERS.map((tier) => (
                    <tr key={tier.range}>
                      <td className="py-2 text-slate-700">{tier.range}</td>
                      <td className="py-2 text-right font-bold text-slate-900">
                        {tier.discount === null
                          ? "Get a quote"
                          : formatPrice(Math.round(pack.price * (1 - tier.discount / 100)))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-slate-500">Prices for the {pack.size} pack, GST included.</p>
              <button
                type="button"
                onClick={() => openWhatsAppInquiry(`${product.name} (bulk order, ${pack.size})`)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Request Bulk Quote
              </button>
              <Link
                href="/contact?type=distributor"
                className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline"
              >
                Become a distributor
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="eyebrow">
                  <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
                  <span>You may also need</span>
                </div>
                <h2 className="h-section text-slate-900">Related Products</h2>
              </div>
              <Link href="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-[#5160a3] hover:underline">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="bg-white rounded-[20px] border border-[#D9DFF0] p-3 flex flex-col group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square rounded-2xl bg-[#F5F7FC] p-4 flex items-center justify-center">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={200}
                      height={200}
                      style={{ width: "auto", height: "auto" }}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="pt-3 px-1 text-center space-y-1">
                    <span className="text-xs font-semibold text-slate-500 line-clamp-1">{p.categoryLabel}</span>
                    <h3 className="h-card text-slate-900 group-hover:text-[#5160a3] line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-base font-bold text-slate-900">{p.comingSoon ? "Coming soon" : priceLabel(p)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
