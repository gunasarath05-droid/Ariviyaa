"use client";

import { ShieldCheck, FlaskConical, Trophy, Award, Coins } from "lucide-react";

const proofs = [
  { value: "Patented", label: "Indian Patent Granted 2024", Icon: ShieldCheck },
  { value: "TANUVAS", label: "Tested with TRPVB", Icon: FlaskConical },
  { value: "1 of 31", label: "StartupTN TANSEED 3.0", Icon: Trophy },
  { value: "DPIIT", label: "Recognised Startup", Icon: Award },
  { value: "₹49L+", label: "Grants & Funding", Icon: Coins },
];

export function ProofStripSection() {
  return (
    <section className="w-full bg-white border-b border-[#D9DFF0] font-sans" id="proof-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {proofs.map(({ value, label, Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-sm sm:text-base font-black text-slate-900 leading-tight">
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
