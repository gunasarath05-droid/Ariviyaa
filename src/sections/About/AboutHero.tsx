"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Download,
  Building2,
  CheckCircle2,
} from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative w-full pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 bg-gradient-to-b from-[#EFF3FC] via-white to-[#F5F7FC] border-b border-[#D9DFF0] overflow-hidden font-sans">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#5160a3_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Mission & Investor Value */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5160a3]/10 border border-[#5160a3]/20 text-[#5160a3] text-xs font-bold uppercase tracking-wider">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3]" />
              <span>Deep-Tech Veterinary Biotech • Founded in Thanjavur</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Pioneering Green Bio-Polymer Nanotechnology for{" "}
              <span className="text-[#5160a3]">Animal Health.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Ariviya Deep Tech Pvt. Ltd. develops proprietary, chemical-free nanobio-polymer formulations that eliminate antibiotic residues, protect dairy herds against bovine mastitis, and provide safe healthcare for companion animals and poultry.
            </p>

            {/* Key Milestones Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-[#D9DFF0] shadow-2xs">
                <div className="flex items-center gap-2 text-[#5160a3] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Patent</span>
                </div>
                <div className="text-sm font-black text-slate-900">Indian Patent Granted</div>
                <div className="text-[11px] text-slate-500">2024 / Bio-Polymer IP</div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#D9DFF0] shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Govt Grant</span>
                </div>
                <div className="text-sm font-black text-slate-900">StartupTN TANSEED 3.0</div>
                <div className="text-[11px] text-slate-500">Govt of Tamil Nadu</div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#D9DFF0] shadow-2xs col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Building2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Validation</span>
                </div>
                <div className="text-sm font-black text-slate-900">TANUVAS TRPVB</div>
                <div className="text-[11px] text-slate-500">Clinical Field Trials</div>
              </div>
            </div>

            {/* CTAs: Commercial + Investor */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5160a3] hover:bg-[#43518a] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?type=investor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-300 shadow-2xs hover:shadow-xs transition-all"
              >
                <TrendingUp className="w-4 h-4 text-[#5160a3]" />
                <span>Investor Relations & Deck</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Lab & Technology Poster Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#D9DFF0] shadow-xl">
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={IMAGES.site.productsRange}
                  alt="Ariviya Research and Formulations"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>NaxPoly® Technology</span>
                  </div>
                  <h3 className="text-lg font-black leading-tight drop-shadow-sm">
                    Sustainable Biopolymer Science
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5">
                    100% natural, antibiotic-free & biodegradable formulations.
                  </p>
                </div>
              </div>

              {/* Traction Summary Bar */}
              <div className="p-5 bg-white border-t border-[#D9DFF0] grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xl font-black text-[#5160a3]">100%</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Chemical-Free</div>
                </div>
                <div className="border-x border-slate-200">
                  <div className="text-xl font-black text-slate-900">25+ Yrs</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">R&D Leadership</div>
                </div>
                <div>
                  <div className="text-xl font-black text-emerald-600">₹0</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Milk Withholding</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
