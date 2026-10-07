import React from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles, Award, ArrowRight, Dna, Activity, HeartPulse } from "lucide-react";

export function ScienceTechSection() {
  const pillars = [
    {
      icon: Dna,
      title: "Green Synthesis Naxpoly®",
      desc: "Patented biopolymer network stabilized with noble nanoparticles, providing powerful antimicrobial defense without toxic chemicals.",
    },
    {
      icon: ShieldCheck,
      title: "100% Lick & Food Safe",
      desc: "Completely non-toxic to companion pets and food-producing animals. Zero withholding period for dairy milk and poultry.",
    },
    {
      icon: Activity,
      title: "TRPVB-TANUVAS Validated",
      desc: "Clinically proven by Tamil Nadu Veterinary and Animal Sciences University against bovine mastitis and skin pathogens.",
    },
    {
      icon: HeartPulse,
      title: "Combats Antibiotic Resistance",
      desc: "Physical and biological membrane disruption ensures bacteria cannot evolve resistance, protecting the future of livestock health.",
    },
  ];

  return (
    <section
      id="science-tech"
      className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black tracking-wide">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Deep-Tech Research & Innovation</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#0A343D] leading-tight">
              Pioneering Nanobio-Polymers for Sustainable Animal Welfare
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              Traditional veterinary pharmaceuticals rely heavily on synthetic antibiotics and
              harsh chemicals that accumulate in milk, meat, and surrounding soil. Ariviya delivers
              nature-derived polymers that form breathable protective bio-films, keeping animals
              free from infections naturally.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#ariviya-technology"
                className="px-7 py-3 rounded-full bg-[#495384] hover:bg-[#363E63] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/917010105831?text=Hello%20Ariviya,%20I%20would%20like%20to%20know%20more%20about%20your%20clinical%20validations"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
              >
                Request Research Whitepaper
              </a>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-gradient-to-br from-slate-900 to-[#0A343D] p-8 text-white">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    StartupTN DeepTech
                  </span>
                  <span className="text-xs text-slate-400 font-mono">TN-BIO-2026</span>
                </div>

                <div className="py-4">
                  <Image
                    src="/assets/ariviya_lineup.png"
                    alt="Ariviya Lineup"
                    width={400}
                    height={200}
                    style={{ width: "100%", height: "auto" }}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Antibiotic Reduction</span>
                    <span className="font-bold text-emerald-400">&gt; 65% in Pilot Herds</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Bovine Mastitis Defense</span>
                    <span className="font-bold text-emerald-400">TRPVB TANUVAS Certified</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Chemical Toxic Residues</span>
                    <span className="font-bold text-amber-300">0% (Zero Residues)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
