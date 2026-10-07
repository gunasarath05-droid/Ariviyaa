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

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: selectedProduct.description,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-2.5 sm:p-4 md:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Control Bar (Fixed above content, guaranteed z-index) */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            title={isSaved ? "Remove from saved" : "Save formula"}
            className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border shadow-xs transition active:scale-95 cursor-pointer ${
              isSaved
                ? "bg-rose-50 border-rose-200 text-rose-500"
                : "bg-white/95 backdrop-blur-md border-slate-200/90 text-slate-500 hover:text-rose-500 hover:border-rose-200"
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500" : ""}`} />
          </button>
          <button
            onClick={() => setSelectedProduct(null)}
            title="Close"
            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 shadow-xs transition active:scale-95 cursor-pointer"
          >
            <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] sm:max-h-[85vh] overflow-y-auto overscroll-contain">
          {/* Left Column: Enhanced Product Image Showcase */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-50 via-slate-50/90 to-slate-100/70 p-5 sm:p-7 md:p-8 flex flex-col justify-center items-center gap-4 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[300px] md:max-w-[320px] flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-slate-100/90 group">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={360}
                height={360}
                priority
                className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] bg-white/90 backdrop-blur-sm rounded-xl py-2 px-3 border border-slate-200/60 text-center shadow-2xs">
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-600 flex items-center justify-center gap-1.5">
                <PawPrint className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Target: {selectedProduct.targetAnimals}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Details & Inquiry */}
          <div className="md:col-span-7 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-3.5 sm:space-y-4">
              {/* Product Header with safe right-padding so title never overlaps close button */}
              <div className="pr-16 sm:pr-20 md:pr-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0A343D] tracking-tight leading-snug">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#10B981] mt-1">
                  {selectedProduct.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {selectedProduct.description}
              </p>

              {/* Key Benefit Highlight Box */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
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
                <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Key Formulation Features
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-100 flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => openWhatsAppInquiry(selectedProduct.name)}
                className="flex-1 py-3 px-4 sm:px-6 rounded-full bg-[#10B981] hover:bg-[#0D9488] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="truncate">Inquire on WhatsApp</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
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
