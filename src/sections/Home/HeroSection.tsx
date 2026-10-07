"use client";

import React from "react";
import Image from "next/image";
import heroImage from "@/assets/Hero.png";
import { useApp } from "@/context/AppContext";
import { ArrowRight, PawPrint, ShieldCheck, Award, Truck } from "lucide-react";

export function HeroSection() {
  const { setActiveCategory } = useApp();

  const handleExploreFarm = () => {
    setActiveCategory("farm");
    const element = document.getElementById("catalog-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewProducts = () => {
    const element = document.getElementById("popular-picks");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-[#FAF7F2] font-sans overflow-hidden border-b border-slate-200/60 lg:py-28 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* LEFT COLUMN: Reference-styled Headline, Subtitle & CTAs (6-7 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Paw Print Badge matching Reference Image */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#5160a3]">
              <PawPrint className="w-4 h-4 fill-[#5160a3]" />
              <span>Everything Your Animals Need Daily</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12] font-serif sm:font-sans">
              Better Animal Health Starts with Better Care
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-md text-slate-600 font-normal leading-relaxed max-w-xl">
              Advanced solutions for Farm Animals, Pet Health & Poultry Care. Powered by green synthesis nanopolymer technology — 100% lick-safe, antibiotic-free & zero chemical residues.
            </p>

            {/* CTAs (Matching Reference Button Style) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Secondary Button */}
              <button
                onClick={handleViewProducts}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold border border-slate-300 shadow-sm hover:shadow transition-all duration-200 cursor-pointer text-center"
              >
                View Products →
              </button>

              {/* Primary CTA Button */}
              <button
                onClick={handleExploreFarm}
                className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-xs sm:text-sm font-black tracking-wide shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group text-center"
              >
                <span>Explore Farm Animal Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-3 border-t border-slate-200/80 text-left max-w-lg">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-[#0D5C46] shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Zero Residues</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600 shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Clinically Validated</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-[#5160a3] shrink-0" />
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Fast Dispatch</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Hero.png Visual Container (Zoomed in & Prominent) */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end overflow-visible hidden md:block">
            <div className="relative w-full max-w-[650px] lg:max-w-none lg:scale-125 lg:origin-right flex items-center justify-center transition-transform duration-300 py-4 sm:py-6">
              <Image
                src={heroImage}
                alt="Better Animal Health Starts with Better Care - Ariviya Animals & Formulations"
                priority
                className="w-full h-auto object-contain object-center drop-shadow-2xl select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
