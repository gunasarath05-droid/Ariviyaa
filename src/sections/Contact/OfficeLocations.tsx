"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants/company";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { MapPin, Clock, Building2, Navigation } from "lucide-react";

const MAP_QUERY = "Periyar TBI, Vallam, Thanjavur, Tamil Nadu 613403";

export function OfficeLocations() {
  return (
    <section className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]" id="office-location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Visit Our Office</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Our Research &amp; <span className="text-[#5160a3]">Operations Base</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Headquartered in Thanjavur&apos;s biotechnology incubation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Address & hours */}
          <div className="lg:col-span-4 bg-white rounded-[20px] border border-[#D9DFF0] p-6 sm:p-7 flex flex-col gap-6">
            <div className="space-y-3">
              <span className="w-11 h-11 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">Ariviya Deep Tech Pvt. Ltd.</h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                {COMPANY_INFO.address.line1}
                <br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} —{" "}
                {COMPANY_INFO.address.pincode}, India
              </p>
            </div>

            <ul className="space-y-3 pt-5 border-t border-[#D9DFF0] text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
                <span>Mon – Sat, 9:00 AM – 6:30 PM IST</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
                <span>Incubated at Periyar TBI, Thanjavur</span>
              </li>
            </ul>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(MAP_QUERY)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-8 rounded-[20px] overflow-hidden border border-[#D9DFF0] bg-white min-h-[320px] sm:min-h-[400px]">
            <iframe
              title="Ariviya Deep Tech office location on Google Maps"
              // Place-name embed; swap for Google Maps "Share → Embed a map" code for an exact pin
              src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full min-h-[320px] sm:min-h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
