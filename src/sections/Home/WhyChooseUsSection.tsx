"use client";

import React from "react";
import Image from "next/image";
import { PawPrint, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <section
      id="about-ariviya"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white font-sans scroll-mt-20 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================================= */}
          {/* LEFT: Full Bleed Showcase for MammaryO Nanobio Post Teat Dip */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-[1/1.15] rounded-[32px] bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/60 group overflow-hidden flex items-center justify-center">
              {/* Product Image filling the entire card */}
              <Image
                src="/assets/mammaryo_teat_dip.png"
                alt="MammaryO Nanobio Post Teat Dip by Ariviya"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 select-none"
                priority
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: About Us Details, Mission, Vision, Shop Now */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Paw Badge */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#5160a3]">
              <PawPrint className="w-4 h-4 fill-[#5160a3]" />
              <span>About Ariviya Innovation</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif sm:font-sans leading-tight">
              Dedicated To Caring For Every Beloved Animal
            </h2>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal max-w-2xl">
              We are dedicated to providing premium, chemical-free nanobio-polymer essentials
              that protect dairy farm cattle, companion pets, and poultry from bacterial infections
              while ensuring zero antibiotic residue.
            </p>

            {/* Subtle Divider */}
            <div className="border-t border-slate-100 pt-6" />

            {/* Two Columns: Our Mission & Our Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
              {/* Our Mission */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
                  <span>Our Mission</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  To provide high-efficacy formulations like <strong>MammaryO</strong> that prevent bovine
                  mastitis, support immunity, and eliminate milk discarding for dairy farmers.
                </p>
              </div>

              {/* Our Vision */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Our Vision</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  To become a trusted global destination for farmers and pet parents by delivering
                  exceptional, clinically proven, non-antibiotic green veterinary solutions.
                </p>
              </div>
            </div>

            {/* "Shop Now" Action Button */}
            <div className="pt-4">
              <a
                href="#catalog-section"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
