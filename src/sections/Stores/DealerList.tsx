"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Store, Building2, ArrowRight, Navigation } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";

interface Dealer {
  name: string;
  type: "Distributor" | "Vet clinic" | "Pet store" | "Agri input dealer";
  city: string;
  address: string;
  phone: string;
}

// Sample stockists for client review — replace with the real dealer list from the backend
const DEALERS: Dealer[] = [
  { name: "Cauvery Agro Agencies", type: "Distributor", city: "Thanjavur", address: "South Main Street, Thanjavur 613009", phone: "+91 94430 00001" },
  { name: "Delta Vet Care Clinic", type: "Vet clinic", city: "Thanjavur", address: "Medical College Road, Thanjavur 613004", phone: "+91 94430 00002" },
  { name: "Trichy Livestock Supplies", type: "Agri input dealer", city: "Tiruchirappalli", address: "Thillai Nagar, Tiruchirappalli 620018", phone: "+91 94430 00003" },
  { name: "Happy Paws Pet Store", type: "Pet store", city: "Chennai", address: "Anna Nagar 2nd Avenue, Chennai 600040", phone: "+91 94430 00004" },
  { name: "Madras Veterinary Supplies", type: "Distributor", city: "Chennai", address: "Vepery High Road, Chennai 600007", phone: "+91 94430 00005" },
  { name: "Kongu Dairy Inputs", type: "Distributor", city: "Erode", address: "Perundurai Road, Erode 638011", phone: "+91 94430 00006" },
  { name: "Coimbatore Pet Clinic", type: "Vet clinic", city: "Coimbatore", address: "RS Puram, Coimbatore 641002", phone: "+91 94430 00007" },
  { name: "Madurai Farm Needs", type: "Agri input dealer", city: "Madurai", address: "Bypass Road, Madurai 625016", phone: "+91 94430 00008" },
];

const CITIES = ["All", ...Array.from(new Set(DEALERS.map((d) => d.city)))];

export function DealerList({ tone = "light" }: { tone?: "white" | "light" }) {
  const light = tone === "light";
  const [city, setCity] = useState("All");
  const shown = DEALERS.filter((d) => city === "All" || d.city === city);

  return (
    <section className={`w-full section-y ${light ? "bg-[#F5F7FC]" : "bg-white"} font-sans border-b border-[#D9DFF0]`} id="dealers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Where to Buy</span>
          </div>
          <h2 className="h-section text-slate-900">
            Authorised <span className="text-[#5160a3]">Dealers &amp; Stockists</span>
          </h2>
          <p className="t-lead text-slate-600">
            Buy Ariviyaa products over the counter from our partners near you.
          </p>
          <p className="text-xs text-slate-500">Sample listing for review — final dealer network to be added.</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center pb-1">
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                city === c
                  ? "bg-[#5160a3] border-[#5160a3] text-white"
                  : `${light ? "bg-white" : "bg-[#F5F7FC]"} border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]`
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {shown.map((d) => (
            <li key={d.name} className={`${light ? "bg-white shadow-2xs" : "bg-[#F5F7FC]"} rounded-2xl border border-[#D9DFF0] p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
                  {d.type === "Distributor" ? <Building2 className="w-5 h-5" /> : <Store className="w-5 h-5" />}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#EFF3FC] border border-[#D9DFF0] text-xs font-bold text-[#5160a3]">
                  {d.type}
                </span>
              </div>
              <h3 className="h-card text-slate-900">{d.name}</h3>
              <p className="t-body text-slate-600 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
                {d.address}
              </p>
              <div className="mt-auto pt-3 border-t border-[#D9DFF0] flex items-center justify-between gap-3 text-sm">
                <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#5160a3]">
                  <Phone className="w-4 h-4" />
                  {d.phone}
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${d.name}, ${d.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#5160a3] hover:underline"
                >
                  <Navigation className="w-4 h-4" />
                  Map
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Become a dealer */}
        <div className={`${light ? "bg-white shadow-2xs" : "bg-[#F5F7FC]"} rounded-3xl border border-[#D9DFF0] p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
          <div className="space-y-2 max-w-2xl">
            <h3 className="h-block text-slate-900">No dealer in your area yet?</h3>
            <p className="t-lead text-slate-600">
              Become an authorised Ariviyaa dealer — get dealer pricing, GST invoicing, marketing material and
              field-demo support from our animal health team.
            </p>
          </div>
          <Link
            href="/contact?type=distributor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-bold whitespace-nowrap transition-colors"
          >
            Become a Dealer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
