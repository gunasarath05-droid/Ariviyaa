"use client";

import React from "react";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  ShieldCheck,
  Truck,
  Leaf,
  FlaskConical,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { GiCow, GiRooster } from "react-icons/gi";
import { FaPaw, FaSprayCan } from "react-icons/fa";
import { useApp } from "@/context/AppContext";

export function ShopHero() {
  const { setActiveCategory } = useApp();

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const catalogEl = document.getElementById("shop-catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#EFF3FC] via-white to-[#F5F7FC] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#D9DFF0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Banner Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5160a3]/10 text-[#5160a3] text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" />
            <span>Official Formulations Store</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Safe, Chemical-Free Healthcare for{" "}
            <span className="text-[#5160a3]">Every Animal</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Browse our full catalog of patented bio-polymer healthcare essentials for dairy cattle, livestock, companion pets, and poultry. Direct from our Thanjavur research facility to your doorstep.
          </p>
        </div>

        {/* Quick Category Jump Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => handleCategoryClick("farm")}
            className="p-4 bg-white rounded-2xl border border-[#D9DFF0] hover:border-[#5160a3] shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <GiCow className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dairy & Cattle</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors">
                Mastitis & Udder Care
              </div>
            </div>
          </button>

          <button
            onClick={() => handleCategoryClick("pet")}
            className="p-4 bg-white rounded-2xl border border-[#D9DFF0] hover:border-[#5160a3] shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FaPaw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Companion Pets</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors">
                Grooming & Skin Care
              </div>
            </div>
          </button>

          <button
            onClick={() => handleCategoryClick("poultry")}
            className="p-4 bg-white rounded-2xl border border-[#D9DFF0] hover:border-[#5160a3] shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <GiRooster className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Poultry Biosecurity</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors">
                Sanitizer & Disinfectants
              </div>
            </div>
          </button>

          <button
            onClick={() => handleCategoryClick("cleaner")}
            className="p-4 bg-white rounded-2xl border border-[#D9DFF0] hover:border-[#5160a3] shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FaSprayCan className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shed & Clinic</div>
              <div className="text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors">
                Floor & Surface Cleaners
              </div>
            </div>
          </button>
        </div>

        {/* E-Commerce Trust Badges */}
        <div className="pt-4 border-t border-slate-200/80 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2.5">
            <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Bio-Polymer Formulations</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Zero Antibiotic Milk Residue</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FlaskConical className="w-4 h-4 text-blue-600 shrink-0" />
            <span>TANUVAS Field Validated</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Direct Farm & Clinic Dispatch</span>
          </div>
        </div>

      </div>
    </section>
  );
}
