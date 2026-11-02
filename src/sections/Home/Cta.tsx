"use client";

import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AriviyaIcon } from "@/components/AriviyaIcon";

export function CtaSection() {
  return (
    <section className="w-full py-16 font-sans border-b border-[#D9DFF0] bg-gradient-to-br from-[#5160a3] via-[#434f8a] to-[#2c345b]" id="partner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="relative text-white">
        
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-6">
          
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-xs text-xs font-black uppercase tracking-wider text-white border border-white/20">
              <AriviyaIcon className="w-4 h-4 text-white shrink-0" />
              <span>Partner With Ariviyaa</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Prevention Is Better Than Cure
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-3xl mx-auto">
              Partner with Ariviyaa to bring non-antibiotic, eco-friendly mastitis prevention and
              clean milk production to more dairy farms, cooperatives, and veterinary clinics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/#contact-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#5160a3] hover:bg-slate-50 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Become A Partner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+917010105831"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-black uppercase tracking-wider border border-white/25 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Our Team: +91 70101 05831</span>
              </a>
            </div>

            

          </div>
        </div>

      </div>
    </section>
  );
}

export default CtaSection;
