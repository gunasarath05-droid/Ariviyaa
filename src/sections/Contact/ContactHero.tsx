"use client";

import React from "react";
import Link from "next/link";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { COMPANY_INFO } from "@/constants/company";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(
  "Periyar TBI, Vallam, Thanjavur, Tamil Nadu 613403"
)}`;

const channels = [
  {
    label: "Call Directly",
    value: COMPANY_INFO.displayPhone,
    note: "Mon – Sat, 9:00 AM – 6:30 PM",
    href: `tel:${COMPANY_INFO.phone}`,
    external: false,
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "Chat with our team",
    note: "Orders, dosage & product queries",
    href: `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`,
    external: true,
    Icon: MessageSquare,
  },
  {
    label: "Official Email",
    // Allow the address to wrap after "@" rather than mid-domain
    value: (
      <>
        {COMPANY_INFO.email.split("@")[0]}@<wbr />
        {COMPANY_INFO.email.split("@")[1]}
      </>
    ),
    note: "Enquiries, quotes & proposals",
    href: `mailto:${COMPANY_INFO.email}`,
    external: false,
    Icon: Mail,
  },
  {
    label: "Office Location",
    value: "Periyar TBI, Vallam, Thanjavur",
    note: "Tamil Nadu 613403 · Open in Maps",
    href: MAPS_URL,
    external: true,
    Icon: MapPin,
  },
];

export function ContactHero() {
  return (
    <>
      {/* Dark hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1F2233] via-[#2B2D42] to-[#363f6e] font-sans">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#5160a3]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-[28rem] h-[28rem] rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <AriviyaIcon className="absolute right-10 top-10 w-40 h-40 text-white/[0.04] pointer-events-none hidden lg:block" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-28 sm:pb-32 text-center space-y-5">
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-slate-500">/</li>
              <li className="text-emerald-300 font-semibold" aria-current="page">
                Contact Us
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Let&apos;s Build Healthier Herds{" "}
            <span className="text-emerald-300">&amp; Cleaner Milk Together.</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Talk to our team about MammaryO bulk supply, distributor partnerships, veterinary
            support or investment — or get help with an order from our pet and farm care range.
          </p>
        </div>
      </section>

      {/* Contact info card overlapping the hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 font-sans">
        <div className="bg-white rounded-3xl border border-[#D9DFF0] shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#D9DFF0] overflow-hidden">
          {channels.map(({ label, value, note, href, external, Icon }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-start gap-3.5 p-5 sm:p-6 hover:bg-[#F5F7FC] transition-colors group"
            >
              <span className="w-11 h-11 rounded-xl bg-[#5160a3]/10 text-[#5160a3] group-hover:bg-[#5160a3] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {label}
                </span>
                <span className="block text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors mt-0.5">
                  {value}
                </span>
                <span className="block text-[11px] text-slate-500 mt-1">{note}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
