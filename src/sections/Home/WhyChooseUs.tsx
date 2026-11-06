"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  FlaskConical,
  ShieldCheck,
  Sprout,
  Coins,
  TestTube2,
  Trophy,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const reasons = [
  {
    title: "Deep-Tech NaxPoly™ Platform",
    tag: "Core technology",
    description:
      "Proprietary bio-nanotechnology for hygiene, microbial barrier formation and biosecurity across dairy, pets and poultry.",
    Icon: FlaskConical,
  },
  {
    title: "Non-Antibiotic & AMR-Safe",
    tag: "Clean animal health",
    description:
      "Fights bacterial and fungal pathogens without driving antimicrobial resistance or leaving residues in milk and meat.",
    Icon: ShieldCheck,
  },
  {
    title: "Eco-Friendly & Biodegradable",
    tag: "Green formulation",
    description:
      "Plant-derived, bio-based polymers that break down naturally without polluting groundwater, pasture or farm soil.",
    Icon: Sprout,
  },
  {
    title: "Cost-Effective Prevention",
    tag: "Farmer economics",
    description:
      "Cuts losses from mastitis, flock infections and skin problems by preventing them instead of paying for treatment.",
    Icon: Coins,
  },
  {
    title: "Tested on OECD Protocols",
    tag: "Laboratory proven",
    description:
      "Non-irritating, non-stinging and non-corrosive — free of chlorhexidine, parabens and heavy metal compounds.",
    Icon: TestTube2,
  },
  {
    title: "Institutional Backing",
    tag: "Recognised & funded",
    description:
      "Funded by TANSEED (Govt. of Tamil Nadu) and SBI Foundation–C-CAMP, incubated at Periyar TBI.",
    Icon: Trophy,
  },
];

const trustPoints = [
  {
    title: "Batch-to-Batch Consistency",
    description: "Stability and analytical checks on every production run.",
  },
  {
    title: "Technical & Field Support",
    description: "Farmer guidance, vet advisory and dedicated customer care.",
  },
  {
    title: "Field-Driven Science",
    description: "Refined with feedback from dairy farms, poultry sheds and clinics.",
  },
  {
    title: "Zero Withholding Period",
    description: "Lick-safe and food-chain friendly, so no milk is dumped.",
  },
];

const recognitions = [
  { id: "patented", title: "Patented", note: "India, 2024", image: IMAGES.badges.patented },
  { id: "tanuvas", title: "TANUVAS", note: "Validated", image: IMAGES.badges.tanuvas },
  { id: "gmp", title: "GMP", note: "Certified", image: IMAGES.badges.gmp },
  { id: "nabl", title: "NABL", note: "ISO 17025", image: IMAGES.badges.nabl },
  { id: "glp", title: "GLP", note: "Certified", image: IMAGES.badges.glp },
];

// Left: why, with recognitions; right: six reasons; below: what partners rely on
export function WhyChooseUsSection() {
  return (
    <section
      id="why-ariviyaa"
      className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Intro + recognitions (stays in view while the reasons scroll) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-40 lg:self-start">
            <div className="space-y-4">
              <div className="eyebrow">
                <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
                <span>Why Choose Ariviyaa</span>
              </div>
              <h2 className="h-section text-slate-900">
                Built on Deep Science, <span className="text-[#5160a3]">Trusted Across Farms &amp; Pets</span>
              </h2>
              <p className="t-lead text-slate-600">
                Bio-nanotechnology, zero-antibiotic formulations and institutional validation — reliable biosecurity for
                livestock and companion animals.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs p-5 space-y-4">
              <h3 className="h-card text-slate-900">Recognitions &amp; standards</h3>
              <ul className="grid grid-cols-5 gap-2">
                {recognitions.map(({ id, title, note, image }) => (
                  <li key={id} className="flex flex-col items-center text-center gap-1.5">
                    <span className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-[#D9DFF0] overflow-hidden">
                      <Image src={image} alt={`${title} badge`} fill sizes="56px" className="object-contain p-1.5" />
                    </span>
                    <span className="text-xs font-bold text-slate-900 leading-tight">{title}</span>
                    <span className="hidden sm:block text-xs text-slate-500 leading-tight">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="#awards" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline">
              See our awards &amp; certificates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Six reasons */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {reasons.map(({ title, tag, description, Icon }) => (
              <article
                key={title}
                className="bg-white rounded-2xl border border-[#D9DFF0] p-5 sm:p-6 shadow-2xs hover:border-[#5160a3]/50 hover:shadow-md transition-all duration-300 group space-y-3"
              >
                <span className="w-11 h-11 rounded-xl bg-[#5160a3]/10 text-[#5160a3] group-hover:bg-[#5160a3] group-hover:text-white transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="space-y-1.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#5160a3]">{tag}</span>
                  <h3 className="h-card text-slate-900">{title}</h3>
                  <p className="t-body text-slate-500">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* What partners rely on: one full-width strip */}
        <div className="bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#D9DFF0]">
          {trustPoints.map(({ title, description }) => (
            <div key={title} className="p-5 sm:p-6 flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-[#5160a3] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="h-card text-slate-900">{title}</h3>
                <p className="t-body text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
