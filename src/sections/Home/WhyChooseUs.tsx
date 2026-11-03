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
      className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">

        {/* 1. Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Why Choose Ariviyaa</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Built on Deep Science,{" "}
            <span className="text-[#5160a3]">Trusted Across Farms &amp; Pets</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Advanced bio-nanotechnology, zero-antibiotic formulations, and institutional validation delivering reliable biosecurity for livestock and companions.
          </p>
        </div>

        {/* 2. Recognitions & Standards — compact trust strip */}
        <div className="bg-white rounded-3xl border border-[#D9DFF0] shadow-2xs p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
            <div className="lg:w-56 shrink-0 text-center lg:text-left space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Recognitions &amp; <span className="text-[#5160a3]">Standards</span>
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Audited and validated by statutory bodies and veterinary universities.
              </p>
            </div>

            <div className="flex-1 flex flex-wrap justify-center gap-y-4 sm:grid sm:grid-cols-5 sm:gap-3 lg:border-l lg:border-[#D9DFF0] lg:pl-8">
              {recognitions.map(({ id, title, authority, image }) => (
                <div key={id} className="w-1/3 sm:w-auto flex flex-col items-center text-center gap-2 group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-[#D9DFF0] group-hover:border-[#5160a3] p-2.5 shadow-2xs group-hover:shadow-md transition-all duration-300 flex items-center justify-center">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-contain mix-blend-multiply select-none"
                    />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">
                      {title}
                    </h4>
                    <p className="hidden sm:block text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                      {authority}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Six core reasons — numbered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map(({ title, tag, description, Icon }, index) => (
            <article
              key={title}
              className="relative bg-white rounded-2xl border border-[#D9DFF0] p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-[#5160a3]/50 transition-all duration-300 group overflow-hidden"
            >
              {/* Large faint index number */}
              <span className="absolute top-3 right-5 text-5xl font-black text-[#5160a3]/[0.07] group-hover:text-[#5160a3]/15 transition-colors select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5160a3]/10 text-[#5160a3] group-hover:bg-[#5160a3] group-hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                <div className="space-y-2">
                  <span className="block text-[11px] font-black uppercase tracking-wider text-[#5160a3]">
                    {tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Why partners trust us — branded panel */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#2B2D42] via-[#363b5e] to-[#5160a3] text-white p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <AriviyaIcon className="absolute right-8 top-8 w-24 h-24 text-white/5 pointer-events-none hidden md:block" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Why Partners &amp; Customers <span className="text-emerald-300">Trust Us</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Field-tested biosecurity delivering measurable health and financial benefits.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {trustPoints.map(({ title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-3.5 bg-white/[0.07] border border-white/10 rounded-2xl p-4 sm:p-5"
                >
                  <span className="w-7 h-7 rounded-full bg-emerald-400 text-[#2B2D42] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold leading-snug">{title}</h4>
                    <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUsSection;
