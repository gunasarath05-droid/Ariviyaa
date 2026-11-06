"use client";

import Image from "next/image";
import { Trophy, Award, Coins } from "lucide-react";
import { IMAGES } from "@/constants/images";

// Badge image where we have the official mark; icon until the client sends the logo
const proofs = [
  { value: "Patented", label: "Indian Patent Granted 2024", image: IMAGES.badges.patented },
  { value: "TANUVAS", label: "Tested with TRPVB", image: IMAGES.badges.tanuvas },
  { value: "1 of 31", label: "StartupTN TANSEED 3.0", Icon: Trophy },
  { value: "DPIIT", label: "Recognised Startup", Icon: Award },
  { value: "₹49L+", label: "Grants & Funding", Icon: Coins },
];

export function ProofStripSection() {
  return (
    <section className="w-full bg-white border-b border-[#D9DFF0] font-sans" id="proof-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {proofs.map(({ value, label, image, Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-white border border-[#D9DFF0] overflow-hidden flex items-center justify-center shrink-0">
                {image ? (
                  <Image src={image} alt={`${value} badge`} fill sizes="48px" className="object-contain p-1" />
                ) : (
                  Icon && <Icon className="w-5 h-5 text-[#5160a3]" />
                )}
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
