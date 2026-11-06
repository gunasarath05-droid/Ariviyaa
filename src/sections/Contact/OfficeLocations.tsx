"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants/company";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { MapPin, Clock, Building2, Navigation } from "lucide-react";

const MAP_QUERY = "Periyar TBI, Vallam, Thanjavur, Tamil Nadu 613403";

/** Pages alternate white and light sections; Contact uses light, Store Locations white */
export function OfficeLocations({ tone = "light" }: { tone?: "white" | "light" }) {
  return (
    <section
      className={`w-full section-y ${tone === "white" ? "bg-white" : "bg-[#F5F7FC]"} font-sans border-b border-[#D9DFF0]`}
      id="office-location"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Visit Our Office</span>
          </div>
          <h2 className="h-section text-slate-900">
            Our Research &amp; <span className="text-[#5160a3]">Operations Base</span>
          </h2>
          <p className="t-lead text-slate-600">
            Headquartered in Thanjavur&apos;s biotechnology incubation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Address & hours */}
          <div className="bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs p-6 sm:p-8 flex flex-col gap-6">
            <div className="space-y-3">
              <span className="w-11 h-11 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </span>
              <h3 className="h-card text-slate-900">Ariviyaa Deep Tech Pvt. Ltd.</h3>
              <p className="t-body text-slate-600">
                {COMPANY_INFO.address.line1}
                <br />
                {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} —{" "}
                {COMPANY_INFO.address.pincode}, India
              </p>
            </div>

            <ul className="space-y-3 pt-5 border-t border-[#D9DFF0] t-body text-slate-600">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
                <span>Every day, {COMPANY_INFO.supportHours} IST</span>
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
          <div className="rounded-2xl overflow-hidden border border-[#D9DFF0] bg-white shadow-2xs min-h-[320px] sm:min-h-[400px]">
            <iframe
              title="Ariviyaa Deep Tech office location on Google Maps"
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
