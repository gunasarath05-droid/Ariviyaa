"use client";

import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import { IMAGES } from "@/constants/images";
import { COMPANY_INFO } from "@/constants/company";
import { AriviyaIcon } from "@/components/AriviyaIcon";

const points = [
  "No milk withholding period",
  "Chemical-free & easily washable",
  "Safe for cow, calf and handler",
  "Bulk 5 L, 20 L & drum packs",
];

export function PhotoBandSection() {
  return (
    <section className="parallax-scope relative w-full overflow-hidden bg-[#2B2D42] font-sans" id="mammaryo-band">
      {/* Photo: right half on desktop, full background on mobile */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none select-none">
        {/* Taller than the band so the parallax drift never shows an edge (styles in globals.css) */}
        <div className="parallax-layer absolute inset-x-0 -top-16 -bottom-16">
          <Image
            src={IMAGES.products.mammaryo}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_60%]"
          />
        </div>
        <div className="absolute inset-0 bg-[#2B2D42]/85 lg:hidden" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#2B2D42] to-transparent hidden lg:block" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-y">
        <div className="max-w-xl space-y-6 text-white">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
            <AriviyaIcon className="w-4 h-4 text-white/80 shrink-0" />
            <span>Made For The Daily Milking Routine</span>
          </div>

          <h2 className="h-section">
            Protect Every Teat, After Every Milking.
          </h2>

          <p className="t-lead text-slate-300">
            MammaryO and its teat dip cup fit straight into the routine your farm already
            follows — dip after milking, let the film form, and wash it off before the next one.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm sm:text-[15px] font-medium">
                <span className="w-5 h-5 rounded-full bg-emerald-400 text-[#2B2D42] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
            <a
              href="#contact-section"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] bg-white text-[#5160a3] hover:bg-slate-50 text-sm font-semibold transition-colors"
            >
              <span>Request Bulk Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-3 group">
              <span className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-4 h-4" />
              </span>
              <span>
                <span className="block text-xs text-slate-300">Talk to our team</span>
                <span className="block text-sm font-semibold">{COMPANY_INFO.displayPhone}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotoBandSection;
