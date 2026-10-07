"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import Image from "next/image";
import {
  X,
  CheckCircle2,
  Heart,
  MessageSquare,
  Shield,
  Sparkles,
  PawPrint,
  Share2,
} from "lucide-react";

export function ProductModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    openWhatsAppInquiry,
  } = useApp();

  if (!selectedProduct) return null;

  const isSaved = wishlist.includes(selectedProduct.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            title={isSaved ? "Remove from saved" : "Save formula"}
            className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-sm transition ${
              isSaved
                ? "bg-rose-50 border-rose-200 text-rose-500"
                : "bg-white/90 backdrop-blur-md border-slate-200 text-slate-500 hover:text-rose-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500" : ""}`} />
          </button>
          <button
            onClick={() => setSelectedProduct(null)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 p-6 sm:p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-slate-100">
            <div className="w-full flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${selectedProduct.badgeBg} ${selectedProduct.badgeText}`}
              >
                {selectedProduct.badge}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {selectedProduct.techTag}
              </span>
            </div>

            <div className="my-6 relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={220}
                height={220}
                style={{ width: "auto", height: "auto" }}
                className="max-h-full max-w-full object-contain drop-shadow-xl"
              />
            </div>

            <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-slate-200/60 text-center">
              <p className="text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1.5">
                <PawPrint className="w-3.5 h-3.5 text-emerald-600" />
                <span>Target: {selectedProduct.targetAnimals}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Details & Inquiry */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A343D] tracking-tight">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm font-semibold text-[#10B981] mt-0.5">
                  {selectedProduct.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {selectedProduct.description}
              </p>

              {/* Key Benefit Highlight Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-emerald-950 leading-snug">
                    <strong className="font-bold">Key Science Advantage:</strong>{" "}
                    {selectedProduct.keyBenefit}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Key Formulation Features
                </h4>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => openWhatsAppInquiry(selectedProduct.name)}
                className="w-full sm:flex-1 py-3 px-6 rounded-full bg-[#10B981] hover:bg-[#0D9488] text-white text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({
                      title: selectedProduct.name,
                      text: selectedProduct.description,
                      url: window.location.href,
                    });
                  } else if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="w-full sm:w-auto p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center justify-center cursor-pointer"
                title="Share formula"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
