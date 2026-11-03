"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import Link from "next/link";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  CheckCircle2,
  Droplets,
  Milk,
  SprayCan,
  HeartPulse,
  Sprout,
  ShieldCheck,
  Package,
  FlaskConical,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const valuePoints = [
  "Instant film formation over the teat after every milking",
  "Improves teat score by clearing cracks, fissures and lesions",
  "Chemical-free and washable — safe for clean milk production",
  "No harm to the cow, calf, handler or farm environment",
  "Cost-effective protection against bovine mastitis",
];

const usps = [
  "Naturally extracted collagen",
  "Eco-friendly",
  "Biodegradable",
  "Biocompatible",
  "User friendly",
  "Easily washable",
  "Non-toxic",
];

const productLines = [
  { name: "MammaryO Teat Dip", Icon: Droplets },
  { name: "Teat Dip Cup", Icon: Milk },
  { name: "AnimaSpray Pet", Icon: SprayCan },
  { name: "Dermisward Skin Care", Icon: HeartPulse },
  { name: "Petsha Shampoo", Icon: Sprout },
  { name: "Tick & Flea Defense", Icon: ShieldCheck },
  { name: "Surface Disinfectant", Icon: Package },
  { name: "Cleanida Floor Cleaner", Icon: FlaskConical },
];

export function FlagshipSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className="w-full section-y px-4 sm:px-6 lg:px-8 font-sans scroll-mt-20 bg-[#F5F7FC] border-b border-[#D9DFF0]"
      id="flagship-products"
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Our Products</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Flagship Innovation:{" "}
            <span className="text-[#5160a3]">MammaryO</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            A nano-bio post-milking teat dip that helps prevent bovine mastitis
            and ensures clean milk production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Product Visual Poster */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
              {!imgError ? (
                <Image
                  src={IMAGES.products.mammaryoPoster}
                  alt="MammaryO post teat dip solution"
                  fill
                  className="object-contain select-none"
                  onError={() => setImgError(true)}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-100 text-slate-400">
                  <Droplets className="w-16 h-16 text-[#5160a3] mb-3" />
                  <span className="text-base font-bold text-slate-700">MammaryO Teat Dip</span>
                  <span className="text-xs text-slate-500 mt-1">Chemical-Free Mastitis Defense</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details & Value Points */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2.5">
              <span className="text-xs sm:text-sm font-semibold text-[#5160a3]">
                Invented with NaxPoly® nano-biotechnology
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Clean milk production, naturally.
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                MammaryO forms a protective physical and antimicrobial barrier
                rich in organic compounds and amino acids — mitigating pathogen
                invasion without contributing to antimicrobial resistance.
              </p>
            </div>

            {/* Checklist with Green Checkmarks matching diagram */}
            <ul className="space-y-3">
              {valuePoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </span>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA Action Button */}
            <div className="pt-2">
              <Link
                href="/#contact-section"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Inquire About MammaryO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FlagshipSection;
