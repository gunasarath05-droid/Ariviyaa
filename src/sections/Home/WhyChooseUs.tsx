"use client";

import React from "react";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  FlaskConical,
  ShieldCheck,
  Sprout,
  Coins,
  TestTube2,
  Trophy,
  Check,
} from "lucide-react";

const reasons = [
  {
    title: "Deep-Tech NaxPoly™ Platform",
    tag: "Core Technology",
    description:
      "Proprietary bio-nanotechnology platform delivering targeted hygiene, microbial barrier formation, and biosecurity across dairy, companion pets, and poultry.",
    Icon: FlaskConical,
  },
  {
    title: "Non-Antibiotic & AMR-Safe",
    tag: "Clean Animal Health",
    description:
      "Fights broad-spectrum bacterial and fungal pathogens without driving Antimicrobial Resistance (AMR) or leaving harmful chemical residues in milk and meat.",
    Icon: ShieldCheck,
  },
  {
    title: "Eco-Friendly & Biodegradable",
    tag: "Green Formulation",
    description:
      "Formulated with plant-derived, bio-based biopolymers that break down naturally without polluting groundwater, pasture soils, or farm ecosystems.",
    Icon: Sprout,
  },
  {
    title: "Cost-Effective Prevention",
    tag: "Farmer Economics",
    description:
      "Substantially reduces financial losses caused by bovine mastitis, flock infections, and recurring skin ailments by focusing on prevention rather than costly treatments.",
    Icon: Coins,
  },
  {
    title: "Tested Safe on OECD Protocols",
    tag: "Laboratory Proven",
    description:
      "Non-irritating, non-stinging, and non-corrosive — 100% free of chlorhexidine, harsh chemical parabens, and hazardous heavy metal compounds.",
    Icon: TestTube2,
  },
  {
    title: "Proven Institutional Backing",
    tag: "Recognised & Funded",
    description:
      "Backed and funded by TANSEED (Govt. of Tamil Nadu), SBI Foundation–C-CAMP, and incubated at the prestigious Periyar TBI.",
    Icon: Trophy,
  },
];

const trustPoints = [
  {
    title: "Batch-to-Batch Consistency",
    description:
      "Every production run undergoes strict stability and analytical assays for identical antimicrobial potency.",
  },
  {
    title: "Direct Technical & Field Support",
    description:
      "On-ground farmer guidance, vet clinical advisory, and dedicated customer care for maximum efficacy.",
  },
  {
    title: "Field-Driven Animal Science",
    description:
      "Formulations continuously refined through direct dairy farm feedback, poultry sheds, and veterinary clinics.",
  },
  {
    title: "Zero Antibiotic Withholding",
    description:
      "Lick-safe, food-chain-friendly products that prevent milk dumping and protect livestock livelihoods.",
  },
];

const recognitions = [
  {
    id: "nabl",
    title: "NABL Accredited",
    authority: "ISO/IEC 17025 Compliant",
    image: IMAGES.badges.nabl,
  },
  {
    id: "gmp",
    title: "GMP Certified",
    authority: "Good Manufacturing Practice",
    image: IMAGES.badges.gmp,
  },
  {
    id: "patented",
    title: "Patented Innovation",
    authority: "Govt. of India Granted (2024)",
    image: IMAGES.badges.patented,
  },
  {
    id: "tanuvas",
    title: "TANUVAS Validated",
    authority: "Vet Science University",
    image: IMAGES.badges.tanuvas,
  },
  {
    id: "glp",
    title: "GLP Certified",
    authority: "Good Laboratory Practice",
    image: IMAGES.badges.glp,
  },
];

export function WhyChooseUsSection() {
  return (
    <section
      id="why-ariviyaa"
      className="w-full py-16 sm:py-20 lg:py-24 bg-[#F5F7FC] font-sans border-b border-[#D9DFF0] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (Centered matching layout diagram)                      */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5160a3]/10 text-xs sm:text-sm font-black uppercase tracking-wider text-[#5160a3]">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Why Choose Ariviyaa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Built on Deep Science,{" "}
            <span className="text-[#5160a3]">Trusted Across Farms &amp; Pets</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Advanced bio-nanotechnology, zero-antibiotic formulations, and institutional validation delivering reliable biosecurity for livestock and companions.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. 6 CORE REASONS GRID (3 COLS X 2 ROWS)                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ title, tag, description, Icon }) => (
            <article
              key={title}
              className="bg-white rounded-2xl border border-[#D9DFF0] p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#5160a3]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#5160a3]/10 text-[#5160a3] group-hover:bg-[#5160a3] group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#5160a3]/10 group-hover:text-[#5160a3] transition-colors">
                    {tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#5160a3] transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. WHY PARTNERS & CUSTOMERS TRUST US (Vertical Checkmark List)            */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Partners &amp; Customers <span className="text-[#5160a3]">Trust Us</span>
            </h3>
            <p className="text-sm text-slate-600 font-normal">
              Field-tested biosecurity delivering measurable health and financial benefits.
            </p>
          </div>

          {/* List matching mockup layout with green checkmark circles */}
          <div className="space-y-3.5 bg-white/70 rounded-3xl border border-[#D9DFF0] p-6 sm:p-8">
            {trustPoints.map(({ title, description }) => (
              <div key={title} className="flex items-start gap-3.5 group">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <div className="text-sm leading-relaxed text-slate-700">
                  <strong className="font-bold text-slate-900">{title} : </strong>
                  <span className="text-slate-600">{description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. RECOGNITIONS & STANDARDS (4 Large Clean Circles)                       */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Recognitions &amp; <span className="text-[#5160a3]">Standards</span>
            </h3>
            <p className="text-sm text-slate-600 font-normal">
              Audited and validated by statutory bodies and veterinary universities.
            </p>
          </div>

          {/* 4 Large Clean Circular Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-2">
            {recognitions.map(({ id, title, authority, image }) => (
              <div
                key={id}
                className="flex flex-col items-center text-center space-y-3 group"
              >
                {/* Large Circle Frame */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-white border-2 border-[#D9DFF0] group-hover:border-[#5160a3] p-6 shadow-sm group-hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-105">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply select-none"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                </div>

                {/* Authority & Title Labels under the circle */}
                <div className="space-y-0.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {authority}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUsSection;
