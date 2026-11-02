"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants/company";
import {
  MapPin,
  Building2,
  Clock,
  Compass,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";

export function OfficeLocations() {
  return (
    <section className="w-full bg-[#F5F7FC] py-16 sm:py-20 font-sans border-b border-[#D9DFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5160a3]">
            <Building2 className="w-4 h-4" />
            <span>Facility & Lab Headquarters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Our Research & Operations Base
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Headquartered in Thanjavur&apos;s biotechnology incubation ecosystem.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#D9DFF0] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Ariviya Deep Tech Pvt. Ltd.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {COMPANY_INFO.address.line1} <br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} — {COMPANY_INFO.address.pincode}, India.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Working Hours: Mon – Sat: 9:00 AM – 6:30 PM IST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#5160a3] shrink-0" />
                <span>Incubated at Periyar TBI • TANSEED 3.0 Grantee</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent("Periyar TBI, Vallam, Thanjavur, Tamil Nadu 613403")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#D9DFF0] shadow-sm min-h-[350px] relative">
            <iframe
              title="Ariviya Deep Tech Location"
              src="https://maps.google.com/maps?q=Periyar%20TBI,%20Vallam,%20Thanjavur,%20Tamil%20Nadu%20613403&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[350px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

        </div>

      </div>
    </section>
  );
}
