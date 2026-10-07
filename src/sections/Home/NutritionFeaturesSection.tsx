import React from "react";
import { ShieldCheck, Leaf, FlaskConical, Award } from "lucide-react";

export function NutritionFeaturesSection() {
  return (
    <section
      id="about-ariviya"
      className="w-full bg-[#F4ECE1] text-slate-800 py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#EADBCC]/50 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* 1. MAIN SECTION HEADLINE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#0A343D] tracking-normal leading-tight max-w-3xl mx-auto">
          Experience Purity & Nanobio Protection
        </h2>

        {/* 2. SUBTITLE */}
        <p className="mt-3 text-sm sm:text-base md:text-lg font-semibold text-[#0E4E5C] tracking-wide">
          Discover Ariviya&apos;s Green Synthesis Naxpoly® Technology!
        </p>

        {/* 3. THREE-COLUMN CONTENT GRID */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center max-w-5xl mx-auto text-left">
          {/* LEFT PARAGRAPH */}
          <div className="md:col-span-5 text-xs sm:text-sm md:text-[14.5px] text-[#4E626B] leading-relaxed font-medium text-justify sm:text-left bg-white/40 p-5 rounded-2xl border border-white/60 shadow-sm">
            <p>
              At Ariviya, we believe in safeguarding animals and dairy herds without toxic
              chemicals.{" "}
              <strong className="font-bold text-[#0A343D]">
                That&apos;s why we have engineered fortified biopolymers stabilized by noble
                nanoparticles.
              </strong>{" "}
              By combining natural biopolymers with green nanotechnology, we deliver maximum
              pathogen defense with zero chemical residues.
            </p>
          </div>

          {/* CENTER 100% NATURAL FOOD STAMP */}
          <div className="md:col-span-2 flex flex-col items-center justify-center my-4 md:my-0 text-center select-none">
            <div className="inline-flex flex-col items-center justify-center text-[#388E3C] leading-none transition-transform hover:scale-105 group cursor-default p-4 rounded-3xl bg-white/70 shadow-sm border border-emerald-100">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#4CAF50] drop-shadow-sm -mb-1">
                Natural
              </span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#388E3C] my-1">
                Bio-Tech
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2E7D32] tracking-tighter">
                100%
              </span>
            </div>
          </div>

          {/* RIGHT PARAGRAPH */}
          <div className="md:col-span-5 text-xs sm:text-sm md:text-[14.5px] text-[#4E626B] leading-relaxed font-medium text-justify sm:text-left bg-white/40 p-5 rounded-2xl border border-white/60 shadow-sm">
            <p>
              Our formulations are crafted with deep respect for animal health, farmer livelihood,
              and ecological sustainability.{" "}
              <strong className="font-bold text-[#0A343D]">
                Clinically validated by TRPVB (TANUVAS) and JSS College of Pharmacy
              </strong>
              , Ariviya products protect dairy cows from mastitis, heal pet wounds faster, and keep
              farms safe from superbugs and antimicrobial resistance.
            </p>
          </div>
        </div>

        {/* Accreditations Strip */}
        <div className="mt-12 pt-8 border-t border-[#EADBCC]/70 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>100% Biodegradable</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <FlaskConical className="w-4 h-4 text-sky-600" />
            <span>TANUVAS Validated</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <Award className="w-4 h-4 text-amber-600" />
            <span>StartupTN Funded</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Toxic Residues</span>
          </div>
        </div>
      </div>
    </section>
  );
}
