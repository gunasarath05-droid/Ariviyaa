"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants/company";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 font-sans items-end pointer-events-auto">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(
          COMPANY_INFO.whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (+91 70101 05831)"
        className="group flex items-center bg-[#25D366] text-white rounded-l-full shadow-lg hover:shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-all duration-300 ease-in-out overflow-hidden h-12 p-1.5 cursor-pointer border-y border-l border-white/20"
      >
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0 group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
          <MessageCircle className="w-5 h-5 fill-white" />
        </div>
        <span className="max-w-0 group-hover:max-w-[120px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-extrabold uppercase tracking-wider pl-0 group-hover:pl-2.5 group-hover:pr-3">
          WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        aria-label="Call Us Now"
        title={`Call Us (${COMPANY_INFO.displayPhone})`}
        className="group flex items-center bg-[#0284C7] text-white rounded-l-full shadow-lg hover:shadow-[0_4px_20px_rgba(2,132,199,0.5)] transition-all duration-300 ease-in-out overflow-hidden h-12 p-1.5 cursor-pointer border-y border-l border-white/20"
      >
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
          <Phone className="w-4 h-4 text-white" />
        </div>
        <span className="max-w-0 group-hover:max-w-[120px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-extrabold uppercase tracking-wider pl-0 group-hover:pl-2.5 group-hover:pr-3">
          Call Now
        </span>
      </a>
    </div>
  );
}
