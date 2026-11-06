import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CommonHero } from "@/components/CommonHero";
import { PRODUCTS } from "@/constants/products";

export const metadata: Metadata = {
  title: "Page Index for Review",
  robots: { index: false, follow: false },
};

// Index of every designed page so the client can walk through the build in one place.
// Remove before go-live.
const GROUPS: { title: string; pages: { label: string; href: string; note?: string }[] }[] = [
  {
    title: "Company & content",
    pages: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Blog detail", href: "/blog/bovine-mastitis-prevention-natural-biopolymers" },
      { label: "Gallery", href: "/gallery" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Store locations", href: "/store-locations" },
    ],
  },
  {
    title: "Shopping",
    pages: [
      { label: "Shop", href: "/shop" },
      { label: "Product detail", href: `/shop/${PRODUCTS[0].slug}` },
      { label: "Wishlist", href: "/wishlist", note: "Save a few products first" },
      { label: "Cart", href: "/cart", note: "Add products first" },
      { label: "Checkout", href: "/checkout", note: "Razorpay + Shiprocket / ST Courier" },
      { label: "Payment", href: "/payment" },
      { label: "Order confirmation", href: "/order-confirmation" },
    ],
  },
  {
    title: "Customer account",
    pages: [
      { label: "Login / Sign up", href: "/login" },
      { label: "Account dashboard", href: "/account" },
      { label: "Order history", href: "/account/orders" },
      { label: "Return order", href: "/return-order" },
    ],
  },
  {
    title: "Policies",
    pages: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms & conditions", href: "/terms-and-conditions" },
      { label: "Refund & returns", href: "/refund-policy" },
      { label: "Shipping policy", href: "/shipping-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
  {
    title: "System & admin",
    pages: [
      { label: "404 page", href: "/this-page-does-not-exist" },
      { label: "Loading state", href: "/review/loading" },
      { label: "Admin sign in", href: "/admin/login", note: "Staff only; see README for demo access" },
      { label: "Admin dashboard", href: "/admin" },
    ],
  },
];

export default function ReviewIndexPage() {
  return (
    <>
      <CommonHero
        title="Page Index"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Page Index" }]}
        subtitle="Every page in this build, grouped for review"
      />
      <section className="w-full section-y bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GROUPS.map((group) => (
            <div key={group.title} className="bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs p-5 sm:p-6">
              <h2 className="h-card text-slate-900 mb-3">{group.title}</h2>
              <ul className="divide-y divide-slate-100">
                {group.pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="flex items-center justify-between gap-3 py-2.5 group"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-slate-800 group-hover:text-[#5160a3]">
                          {page.label}
                        </span>
                        {page.note && <span className="block text-xs text-slate-500">{page.note}</span>}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#5160a3] shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
