"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Leaf, FlaskConical, Award } from "lucide-react";

export function SpecializedSolutionsSection() {
  const { setActiveCategory } = useApp();

  const categories = [
    {
      id: "farm",
      title: "Farm & Dairy",
      sub: "Cattle Care",
      image: "/assets/solutions/farm.png",
      glow: "hover:border-emerald-400 hover:shadow-[0_20px_45px_rgba(16,185,129,0.45)]",
      textColor: "group-hover:text-emerald-300",
    },
    {
      id: "pet",
      title: "Pets",
      sub: "Dogs & Cats",
      image: "/assets/solutions/pets.png",
      glow: "hover:border-amber-400 hover:shadow-[0_20px_45px_rgba(245,158,11,0.45)]",
      textColor: "group-hover:text-amber-300",
    },
    {
      id: "poultry",
      title: "Poultry",
      sub: "Flock Defense",
      image: "/assets/solutions/birds.png",
      glow: "hover:border-sky-400 hover:shadow-[0_20px_45px_rgba(56,189,248,0.45)]",
      textColor: "group-hover:text-sky-300",
    },
    {
      id: "hygiene",
      title: "Biosecurity",
      sub: "Hygiene & Floors",
      image: "/assets/solutions/public_health.png",
      glow: "hover:border-purple-400 hover:shadow-[0_20px_45px_rgba(192,132,252,0.45)]",
      textColor: "group-hover:text-purple-300",
    },
  ];

  return (
    <section
      id="specialized-solutions"
      className="w-full m-0 p-0 relative overflow-hidden bg-[#0A343D] text-white"
    >
      {/* 1. FULL-WIDTH BACKGROUND IMAGE LAYER */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-left md:bg-center"
        style={{ backgroundImage: `url('/assets/farm_landscape_banner.jpg')` }}
      />

      {/* Semi-Transparent Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/85 lg:from-slate-950/90 lg:via-slate-900/50 lg:to-slate-950/85 pointer-events-none" />

      {/* 2. FULL-WIDTH CONTENT GRID */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 py-14 sm:py-18 lg:py-24">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT SIDE (4 Cols): Headline, Description & Badges */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-4 sm:space-y-5 text-left">
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-white leading-[1.18] tracking-tight drop-shadow-md">
              Innovative Science for <br className="hidden sm:inline" />
              <span className="text-emerald-300">Healthier Animals</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-[15px] text-slate-100/90 leading-relaxed font-normal max-w-md">
              Powered by patented nano-bio-polymer technology and green biotechnology, Ariviya
              creates safe, chemical-free solutions for healthier animals and a cleaner tomorrow.
            </p>

            {/* 3 Feature Highlights Tags */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-emerald-200">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> 100% Biodegradable
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-sky-400" /> TANUVAS & JSS Tested
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Supported by StartupTN
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="#ariviya-technology"
                className="px-7 py-3 rounded-full bg-[#10B981] hover:bg-[#0D9488] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#about-ariviya"
                className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/30 backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                About Us
              </a>
            </div>
          </div>

          {/* RIGHT SIDE (8 Cols): 4 Large Circular Category Avatars */}
          <div className="lg:col-span-8 xl:col-span-8 pr-2 sm:pr-6 md:pr-10 lg:pr-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-start justify-center">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href="#ariviya-technology"
                  onClick={() => setActiveCategory(cat.id)}
                  className="group flex flex-col items-center text-center transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={`relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-full overflow-hidden shadow-2xl border-4 lg:border-[6px] border-white/95 transition-all duration-300 group-hover:scale-110 bg-white/10 backdrop-blur-sm ${cat.glow}`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      width={240}
                      height={240}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 sm:mt-5">
                    <h3
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white transition-colors ${cat.textColor}`}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-200/90 mt-1">
                      {cat.sub}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
