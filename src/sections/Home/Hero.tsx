"use client";

import React from "react";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { ArrowRight, ShieldCheck, Award, FileCheck } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full font-sans overflow-hidden border-b border-[#D9DFF0] bg-cover bg-right lg:bg-right bg-no-repeat lg:py-28 py-14 flex items-center max-h-[98vh]"
      style={{ backgroundImage: `url('${IMAGES.hero}')` }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#F5F7FC]/90 via-[#F5F7FC]/80 sm:via-[#F5F7FC]/65 to-transparent pointer-events-none block md:hidden" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN: Reference-styled Headline, Subtitle & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
              <span>Bovine Udder Care &amp; Mastitis Control</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.14]">
              Bovine Udder Care for <br className="hidden sm:inline" />
              <span className="text-[#5160a3]">Clean Milk Production (CMP)</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-xl">
              Advanced &amp; effective hygiene and care solutions designed for mastitis control, udder
              health and higher milk quality.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Primary CTA Button */}
              <a
                href="#contact-section"
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold shadow-md hover:shadow-md active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group text-center"
              >
                <span>Bulk &amp; Distributor Enquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Ghost / Product Button */}
              <a
                href="#flagship-products"
                className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-[10px] bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-[#D9DFF0] shadow-xs hover:shadow transition-all duration-200 cursor-pointer text-center"
              >
                Discover MammaryO
              </a>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-left max-w-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-[#D9DFF0] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#5160a3] shrink-0" />
                <p className="text-[10px] sm:text-xs text-slate-800 font-bold">Zero Antibiotic Residue</p>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-[#D9DFF0] shadow-2xs">
                <Award className="w-4 h-4 text-[#5160a3] shrink-0" />
                <p className="text-[10px] sm:text-xs text-slate-800 font-bold">TANUVAS Validated</p>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-[#D9DFF0] shadow-2xs">
                <FileCheck className="w-4 h-4 text-[#5160a3] shrink-0" />
                <p className="text-[10px] sm:text-xs text-slate-800 font-bold">Indian Patent 2024</p>
              </div>
            </div>

            {/* Retail shoppers go to the shop */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-[#D9DFF0] text-xs sm:text-sm font-bold text-[#5160a3] hover:bg-white transition-colors"
            >
              <span>Buying for your own farm or pet? Visit the shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* RIGHT COLUMN: Spacer to showcase the background cows & products visually */}
          <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
