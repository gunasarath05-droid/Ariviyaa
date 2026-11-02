"use client";

import React from "react";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { COMPANY_INFO } from "@/constants/company";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Building2,
  TrendingUp,
} from "lucide-react";

export function ContactHero() {
  return (
    <section className="w-full bg-[#F8FAFC] py-8 sm:py-10 border-b border-[#D9DFF0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Get in Touch with Our Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Direct veterinary support, commercial wholesale pricing, and investor assistance.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5160a3]/10 text-[#5160a3] text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
            <AriviyaIcon className="w-3.5 h-3.5 text-[#5160a3]" />
            <span>Thanjavur, Tamil Nadu</span>
          </div>
        </div>

        {/* 4 Quick Communication Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Customer Phone */}
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="p-5 bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md hover:border-[#5160a3] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Hotline</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors">
                {COMPANY_INFO.displayPhone}
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-3 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-500" />
              <span>Mon - Sat, 9:00 AM - 6:30 PM</span>
            </div>
          </a>

          {/* Card 2: WhatsApp Chat */}
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instant WhatsApp</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                Chat With Technical Team
              </div>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold pt-3 border-t border-slate-100 mt-3 flex items-center gap-1">
              <span>● Typically replies in 15 mins</span>
            </div>
          </a>

          {/* Card 3: Email Desk */}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="p-5 bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md hover:border-[#5160a3] transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Official Email</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors truncate">
                {COMPANY_INFO.email}
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-3">
              Inquiries, orders & proposals
            </div>
          </a>

          {/* Card 4: Location */}
          <div className="p-5 bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">R&D Lab Location</div>
              <div className="text-xs font-bold text-slate-800 leading-tight">
                Periyar TBI, Vallam, Thanjavur - 613403
              </div>
            </div>
            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-3">
              Tamil Nadu, India
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
