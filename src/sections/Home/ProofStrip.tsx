"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/images";

const proofs = [
  { value: "Patented", label: "Indian Patent Granted 2024", image: IMAGES.badges.patented },
  { value: "TANUVAS", label: "Tested with TRPVB", image: IMAGES.badges.tanuvas },
  { value: "1 of 31", label: "StartupTN TANSEED 3.0", image: IMAGES.badges.startupTN },
  { value: "DPIIT", label: "Recognised Startup", image: IMAGES.badges.dpiit },
  { value: "₹49L+", label: "Grants & Funding", image: IMAGES.badges.grants },
];

export function ProofStripSection() {
  return (
    <section className="w-full bg-white border-b border-[#D9DFF0] font-sans" id="proof-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {proofs.map(({ value, label, image }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-white border border-[#D9DFF0] overflow-hidden flex items-center justify-center shrink-0">
                <Image src={image} alt={`${label} badge`} fill sizes="48px" className="object-contain p-1" />
              </div>
              <div>
                <strong className="block text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  {value}
                </strong>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProofStripSection;
