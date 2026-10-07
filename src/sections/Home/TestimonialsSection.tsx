"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export { FaqSection as TestimonialsSection } from "./FaqSection";
export function TestimonialsSectionLegacy() {
  const reviews = [
    {
      name: "Senthilkumar P.",
      role: "Dairy Farm Owner (45 Crossbred Cows), Erode",
      text: "MammaryO Teat Barrier saved our farm from recurrent subclinical mastitis. Somatic cell counts dropped dramatically within 3 weeks, and we didn't have to discard milk due to antibiotic withholdings.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      product: "MammaryO Bovine Teat Barrier",
    },
    {
      name: "Dr. Ananya Sharma",
      role: "Veterinary Surgeon & Pet Parent, Chennai",
      text: "Anima Spray Pet is remarkably effective for surgical recovery and open bite lacerations. Because it's completely lick-safe and non-stinging, dogs don't fight during dressing.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      product: "Anima Spray Pet & Dermisward",
    },
    {
      name: "Venkatesan R.",
      role: "Broiler Farm Integrator, Namakkal",
      text: "FarmSward misting biosecurity helped our shed achieve strict antibiotic-free standards. Chick livability improved by over 3% and the birds stay active even during seasonal changes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      product: "FarmSward Poultry Defense",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full">
            Real Field Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Dairy Farmers & Pet Parents Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Trusted by progressive dairy cooperatives, veterinary practitioners, and loving pet owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                    <p className="text-[10px] text-slate-400">{rev.role}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified User
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
