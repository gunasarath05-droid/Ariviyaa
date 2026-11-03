import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ShoppingBag, BookOpen, MessageCircle, HelpCircle } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { COMPANY_INFO } from "@/constants/company";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const SUGGESTIONS = [
  { label: "Shop products", desc: "MammaryO, pet care and hygiene range", href: "/shop", Icon: ShoppingBag },
  { label: "Read the blog", desc: "Field guides from our vets and scientists", href: "/blog", Icon: BookOpen },
  { label: "FAQ", desc: "Orders, shipping, returns and dosage", href: "/faq", Icon: HelpCircle },
];

export default function NotFound() {
  return (
    <section className="w-full section-y bg-[#F5F7FC] font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <div className="eyebrow justify-center">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Error 404</span>
          </div>
          <p className="text-7xl sm:text-8xl font-black tracking-tight text-[#5160a3] font-heading leading-none">
            404
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            We couldn&apos;t find that page
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            The link may be old or the page may have moved. Try one of these instead, or talk to our
            team on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#D9DFF0] hover:border-[#5160a3] text-slate-800 hover:text-[#5160a3] text-sm font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {SUGGESTIONS.map(({ label, desc, href, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="h-full bg-white p-5 rounded-2xl border border-[#D9DFF0] shadow-2xs hover:border-[#5160a3] transition-colors flex items-start gap-3 group"
              >
                <span className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900 group-hover:text-[#5160a3]">{label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{desc}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
