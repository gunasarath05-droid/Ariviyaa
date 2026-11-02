"use client";

import { Building2, Milk, Stethoscope, Truck, ArrowRight } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";

const segments = [
  {
    title: "Dairy Cooperatives & Milk Unions",
    desc: "Cut mastitis cases across member farms and collect cleaner, residue-free milk at the chilling centre.",
    offer: "Bulk 5 L & 20 L packs · Farmer training",
    Icon: Building2,
  },
  {
    title: "Dairy Farms",
    desc: "A post-milking teat dip that fits the existing milking routine — no milk withholding, no discard losses.",
    offer: "MammaryO + Teat Dip Cups · Usage guidance",
    Icon: Milk,
  },
  {
    title: "Veterinary Doctors & Clinics",
    desc: "A non-antibiotic option for mastitis prevention that supports responsible antimicrobial use.",
    offer: "TANUVAS efficacy dossier · Field demo kits",
    Icon: Stethoscope,
  },
  {
    title: "Distributors & Dealers",
    desc: "A patented, differentiated product for your veterinary and dairy-input network.",
    offer: "Dealer pricing · GST invoicing · Pan-India dispatch",
    Icon: Truck,
  },
];

export function WhoWeServeSection() {
  return (
    <section
      className="w-full section-y px-4 sm:px-6 lg:px-8 font-sans scroll-mt-20 bg-[#F5F7FC] border-b border-[#D9DFF0]"
      id="who-we-serve"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Who We Work With</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            MammaryO For <span className="text-[#5160a3]">Every Link In The Dairy Chain</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We supply MammaryO directly to the businesses and professionals who keep India&apos;s
            milk clean.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {segments.map(({ title, desc, offer, Icon }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md hover:border-[#5160a3] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">{desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80 space-y-3">
                <p className="text-[11px] font-bold text-[#5160a3] uppercase tracking-wider">
                  {offer}
                </p>
                <a
                  href="#contact-section"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#5160a3] transition-colors"
                >
                  <span>Request a quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoWeServeSection;
