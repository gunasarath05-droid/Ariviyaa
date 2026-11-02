"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { ArrowRight, Leaf, FlaskConical, Award, Sparkles, ShieldCheck } from "lucide-react";

export function SpecializedSolutionsSection() {
  const { setActiveCategory } = useApp();

  const categories = [
    {
      id: "farm",
      title: "Farm & Dairy",
      sub: "Bovine Mastitis & Teat Care",
      image: IMAGES.categories.cow,
      glow: "hover:border-emerald-400 hover:shadow-[0_20px_45px_rgba(16,185,129,0.35)]",
      textColor: "group-hover:text-emerald-300",
      accent: "from-emerald-600/30 to-emerald-900/40",
      tag: "Priority Care",
    },
    {
      id: "pet",
      title: "Companion Pets",
      sub: "Wounds, Skin & Shampoo",
      image: IMAGES.categories.dog,
      glow: "hover:border-amber-400 hover:shadow-[0_20px_45px_rgba(245,158,11,0.35)]",
      textColor: "group-hover:text-amber-300",
      accent: "from-amber-600/30 to-amber-900/40",
      tag: "100% Lick-Safe",
    },
    {
      id: "poultry",
      title: "Poultry Flocks",
      sub: "Respiratory & Biosecurity",
      image: IMAGES.categories.poultry,
      glow: "hover:border-sky-400 hover:shadow-[0_20px_45px_rgba(56,189,248,0.35)]",
      textColor: "group-hover:text-sky-300",
      accent: "from-sky-600/30 to-sky-900/40",
      tag: "Zero AMR",
    },
    {
      id: "floor",
      title: "Farm Hygiene",
      sub: "Chemical-Free Floor Cleaners",
      image: IMAGES.categories.floor,
      glow: "hover:border-indigo-400 hover:shadow-[0_20px_45px_rgba(99,102,241,0.35)]",
      textColor: "group-hover:text-indigo-300",
      accent: "from-indigo-600/30 to-indigo-900/40",
      tag: "Eco-Degradable",
    },
  ];

  return (
    <section
      id="specialized-solutions"
      className="w-full relative overflow-hidden bg-[#0A252C] text-white py-16 sm:py-24 font-sans border-b border-[#14424D]"
    >
      {/* Background Graphic Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
        style={{ backgroundImage: `url('${IMAGES.farmLandscape}')` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#061B20]/95 via-[#0A252C]/90 to-[#061B20]/95" />

      {/* Decorative Radial Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#5160a3]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-xs font-black uppercase tracking-wider text-emerald-300">
              <AriviyaIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Specialized Animal Solutions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Targeted Care for <br className="hidden sm:inline" />
              <span className="text-emerald-300">Every Animal Need</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              From commercial dairy cattle to beloved companion pets, Ariviya formulates non-antibiotic
              biopolymer solutions designed for maximum safety, rapid recovery, and zero chemical residues.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#popular-picks"
              className="px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Interactive Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative rounded-3xl p-6 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden ${cat.glow}`}
            >
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/15 text-white/90 border border-white/15">
                    {cat.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/20 transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Circular Avatar with Glowing Ring */}
                <div className="flex justify-center py-2">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white/25 shadow-xl group-hover:scale-105 transition-transform duration-500 bg-black/20">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      sizes="160px"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="text-center space-y-1">
                  <h3 className={`text-xl font-black text-white transition-colors ${cat.textColor}`}>
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {cat.sub}
                  </p>
                </div>
              </div>

              {/* Bottom Micro Pill */}
              <div className="mt-5 pt-3 border-t border-white/10 text-center">
                <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors flex items-center justify-center gap-1.5">
                  <span>View Solutions</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-slate-300">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <Leaf className="w-4 h-4 text-emerald-400" /> 100% Biodegradable &amp; Natural
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <FlaskConical className="w-4 h-4 text-sky-400" /> TANUVAS &amp; JSS Tested
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <Award className="w-4 h-4 text-amber-400" /> Supported by StartupTN
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-[#8b9cf0]" /> Indian Patent Granted 2024
          </span>
        </div>

      </div>
    </section>
  );
}

export default SpecializedSolutionsSection;
