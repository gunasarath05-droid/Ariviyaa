"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { PRODUCTS, ProductItem } from "@/constants/products";
import { CATEGORY_FILTERS } from "@/constants/navigation";
import {
  Check,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  Eye,
  Heart,
  MessageSquare,
} from "lucide-react";

export function ProductCatalogSection() {
  const { setSelectedProduct, wishlist, toggleWishlist, openWhatsAppInquiry } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesFilter =
      activeFilter === "all" ||
      item.category === activeFilter ||
      item.tags.includes(activeFilter);
    const matchesSearch =
      searchTerm.trim() === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <section
      id="ariviya-technology"
      className="w-full bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden font-sans border-t border-slate-200/70 scroll-mt-20"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* 1. TOP HEADER (Clean Title, Subtitle & Interactive Controls) */}
        <div className="pb-8 sm:pb-10 border-b border-slate-200/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Title & Subtitle */}
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-black tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Patented Natural Care</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A343D] tracking-tight leading-tight">
              Complete Care for Every Animal
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              From companion pets to dairy herds and poultry, we provide natural, science-backed
              solutions for pathogen defense, wound healing, and optimal health.
            </p>
          </div>

          {/* Search Box on Catalog */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products & solutions..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:border-[#495384] focus:ring-2 focus:ring-[#495384]/20 text-slate-800 placeholder-slate-400 shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* 2. CATEGORY FILTER PILLS */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? "bg-[#495384] text-white shadow-md shadow-[#495384]/25 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* 3. PRODUCT CARDS GRID (12 Luxury Cards) */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => {
            const isSaved = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white hover:bg-gradient-to-b hover:from-white hover:to-sky-50/50 rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Tag & Save Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${product.badgeBg} ${product.badgeText}`}
                    >
                      {product.badge}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Naxpoly®
                      </span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        title={isSaved ? "Saved" : "Save for inquiry"}
                        className={`p-1 rounded-full hover:bg-slate-100 transition ${
                          isSaved ? "text-rose-500" : "text-slate-300 hover:text-slate-500"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-500" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Product Image Container */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="w-full h-52 bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-slate-100/80 shadow-inner group-hover:bg-white group-hover:scale-105 transition-all duration-300 cursor-pointer relative"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="max-h-full max-w-full object-contain drop-shadow-md select-none"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-800 text-[11px] font-bold shadow-md flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#495384]" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="text-lg font-black text-[#0A343D] group-hover:text-emerald-700 transition-colors mt-4 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3.5 line-clamp-1">
                    {product.subtitle}
                  </p>

                  {/* 3 Bullet Points */}
                  <ul className="space-y-2 pt-1">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Link / WhatsApp Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => openWhatsAppInquiry(product.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#10B981] hover:text-[#0D9488] group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-400">
                    {product.targetAnimals.split(",")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-base font-bold text-slate-700">No products match your filter.</p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchTerm("");
              }}
              className="mt-3 px-5 py-2 rounded-full bg-[#495384] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
