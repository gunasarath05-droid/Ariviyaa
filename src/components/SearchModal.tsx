"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/constants/products";
import Image from "next/image";
import { Search, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct } = useApp();
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 transition-all">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-[#5160a3] shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pet formulas, bovine teat dip, disinfectants..."
            autoFocus
            className="w-full text-base sm:text-lg text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none focus:ring-0"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              ESC
            </button>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Quick Search Suggestions</h4>
              <p className="text-xs text-slate-500 mt-1">Try searching for popular formulas below:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {["MammaryO", "PetEnviron", "Mastitis", "Anima Spray", "Floor Cleaner", "Tick Wash"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-[#495384] hover:text-white transition cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-700">No matching formulas found</p>
              <p className="text-xs text-slate-500 mt-1">
                Looking for a custom solution? Reach us directly on WhatsApp.
              </p>
              <a
                href="https://wa.me/917010105831?text=Hello%20Ariviya,%20I%20am%20looking%20for%20a%20custom%20formulation"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md hover:bg-emerald-600"
              >
                Inquire on WhatsApp
              </a>
            </div>
          ) : (
            <div>
              <h5 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Products ({filteredProducts.length})
              </h5>
              <div className="space-y-2">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsSearchOpen(false);
                    }}
                    className="group flex items-center gap-3.5 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 cursor-pointer transition"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-xl p-1 flex items-center justify-center shrink-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={40}
                        height={40}
                        style={{ width: "auto", height: "auto" }}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h6 className="text-sm font-bold text-slate-900 group-hover:text-[#495384] transition">
                          {p.name}
                        </h6>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{p.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#495384] group-hover:translate-x-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
