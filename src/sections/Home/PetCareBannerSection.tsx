"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants";
import {
  ShieldCheck,
  Award,
  Leaf,
  Sparkles,
  ArrowRight,
  Phone,
  PawPrint,
  CheckCircle2,
} from "lucide-react";

export function PetCareBannerSection() {
  const trustFeatures = [
    {
      title: "StartupTN Supported",
      subtitle: "Government of Tamil Nadu",
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/20 border-emerald-500/35",
    },
    {
      title: "TANUVAS-TRPVB Validated",
      subtitle: "Bovine & Clinical Protocols",
      icon: Award,
      iconColor: "text-amber-400",
      badgeBg: "bg-amber-500/20 border-amber-500/35",
    },
    {
      title: "100% Non-Antibiotic",
      subtitle: "Non-Toxic & Residue-Free",
      icon: Leaf,
      iconColor: "text-teal-400",
      badgeBg: "bg-teal-500/20 border-teal-500/35",
    },
    {
      title: "Zero Chemical Residue",
      subtitle: "Green Synthesis Naxpoly®",
      icon: Sparkles,
      iconColor: "text-[#5160a3]",
      badgeBg: "bg-[#5160a3]/30 border-[#5160a3]/50",
    },
  ];

  return (
    <section
      id="clinical-validation-banner"
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-fixed bg-cover bg-center overflow-hidden font-sans"
      style={{
        backgroundImage: "url('/assets/pet_store_banner.jpg')",
      }}
    >
      {/* Dark Cinematic Gradient Overlay for high contrast text & showcasing the ambient shop on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 md:via-black/75 to-black/35" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 sm:space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 text-indigo-200 text-xs font-black uppercase tracking-wider">
            <PawPrint className="w-4 h-4 fill-[#5160a3] text-[#5160a3]" />
            <span>Government Supported &amp; Clinically Validated</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-serif sm:font-sans leading-tight drop-shadow-md">
            Scientifically Proven Care For Happy Animals
          </h2>

          {/* Subtitle / Description with highlighted accents */}
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal max-w-2xl">
            Ariviya is backed by{" "}
            <span className="text-[#F6DFC2] font-bold">StartupTN (Govt. of Tamil Nadu)</span>{" "}
            and clinically validated through rigorous veterinary protocols with{" "}
            <span className="text-[#F6DFC2] font-bold">TANUVAS-TRPVB</span> and{" "}
            <span className="text-[#F6DFC2] font-bold">JSS College of Pharmacy</span>, engineering
            100% non-antibiotic bio-polymers for livestock and companion pet wellness.
          </p>

          {/* 4 Feature Checklist Points with Distinct Themed Icons & Colors (WhyChooseUs Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
            {trustFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-all duration-200 group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${feat.badgeBg} border flex items-center justify-center shrink-0 ${feat.iconColor} shadow-inner group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                      {feat.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
      
        </div>
      </div>
    </section>
  );
}
