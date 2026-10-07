"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Search, Heart, ShoppingBag, User, X } from "lucide-react";

export function Header() {
  const {
    openDrawerWithTab,
    wishlist,
    cartCount,
    setIsSearchOpen,
    setSearchQuery,
  } = useApp();

  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      setIsSearchOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* ========================================================================= */}
          {/* 1. BRAND LOGO */}
          {/* ========================================================================= */}
          <Link href="/" className="flex items-center shrink-0 py-1 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo/ariviya.png"
              alt="Ariviya Animal Health Logo"
              width={160}
              height={48}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </Link>

          {/* ========================================================================= */}
          {/* 2. RECTANGULAR SEARCH BAR (Centered with Search Icon on Right) */}
          {/* ========================================================================= */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onFocus={() => {
                  if (localSearch.trim()) setIsSearchOpen(true);
                }}
                placeholder="Search By Products..."
                className="w-full pl-4 sm:pl-5 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-lg focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]/30 text-slate-800 placeholder-slate-400 transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-[#5160a3] transition-colors cursor-pointer p-1"
                title="Search"
              >
                <Search className="w-4 sm:w-5 h-4 sm:h-5" strokeWidth={1.8} />
              </button>
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch("")}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* ========================================================================= */}
          {/* 3. RIGHT ICONS (Account, Wishlist, Cart with labels underneath) */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-3 sm:gap-8 shrink-0">

            {/* Account Button */}
            <button
              onClick={() => {
                const el = document.getElementById("contact-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "/#contact-section";
                }
              }}
              className="flex flex-col items-center justify-center text-slate-800 hover:text-[#5160a3] transition-colors cursor-pointer group"
              title="Account / Contact"
            >
              <User
                className="w-5 h-5 text-slate-800 group-hover:text-[#5160a3] transition-colors"
                strokeWidth={1.75}
              />
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-800 group-hover:text-[#5160a3] transition-colors mt-1 leading-none">
                Account
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => openDrawerWithTab("wishlist")}
              className="relative flex flex-col items-center justify-center text-slate-800 hover:text-[#5160a3] transition-colors cursor-pointer group"
              title="Saved Wishlist"
            >
              <div className="relative">
                <Heart
                  className="w-5 h-5 text-slate-800 group-hover:text-[#5160a3] transition-colors"
                  strokeWidth={1.75}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#5160a3] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-800 group-hover:text-[#5160a3] transition-colors mt-1 leading-none">
                Wishlist
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => openDrawerWithTab("cart")}
              className="relative flex flex-col items-center justify-center text-slate-800 hover:text-[#5160a3] transition-colors cursor-pointer group"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag
                  className="w-5 h-5 text-slate-800 group-hover:text-[#5160a3] transition-colors"
                  strokeWidth={1.75}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#5160a3] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-800 group-hover:text-[#5160a3] transition-colors mt-1 leading-none">
                Cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
