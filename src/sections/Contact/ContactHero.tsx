"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants/company";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { CommonHero } from "@/components/CommonHero";

const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(
  "Unit #103, Periyar TBI, Vallam, Thanjavur, Tamil Nadu 613403"
)}`;

const channels = [
  {
    label: "Call Directly",
    value: COMPANY_INFO.displayPhone,
    note: `Every day, ${COMPANY_INFO.supportHours}`,
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
    value: "Unit #103, Periyar TBI, Vallam",
    note: "Thanjavur, Tamil Nadu 613403 · Open in Maps",
    href: MAPS_URL,
    external: true,
    Icon: MapPin,
  },
];

export function ContactHero() {
  return (
    <>
      {/* Hero banner matching reference design: Title, Breadcrumbs & Product Lineup Cutout */}
      <CommonHero
        title="Contact Us"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        subtitle="Talk to our team about MammaryO bulk supply, distributor partnerships, veterinary support, or get help with your order"
      />

      {/* Contact info channels card strip */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 font-sans">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#D9DFF0] shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#D9DFF0] overflow-hidden">
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
              <span className="">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {label}
                </span>
                <span className="block text-sm font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors mt-0.5">
                  {value}
                </span>
                <span className="block text-sm text-slate-500 mt-1">{note}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
