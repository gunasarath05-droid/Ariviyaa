"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { PRODUCTS, ProductItem, CategoryGroup } from "@/constants/products";
import {
  Star,
  ShoppingBag,
  Heart,
  Eye,
  MessageCircle,
  Search,
  ArrowRight,
  Sparkles,
  PawPrint,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { BiGridAlt } from "react-icons/bi";
import { GiCow, GiRooster } from "react-icons/gi";
import { FaPaw, FaSprayCan, FaFlask } from "react-icons/fa";

export function FilteredCatalogSection() {
  const {
    activeCategory,
    setActiveCategory,
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    openWhatsAppInquiry,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 8; // 2 rows in 4-column layout

  // Categories with React Icons
  // - "all" product tab has icons mattum (only icon) for both mobile and desktop
  // - other categories have icons mattum on mobile view, and icon + text on desktop view
  const categoryTabs = [
    {
      id: "all",
      title: "ALL PRODUCTS",
      icon: <BiGridAlt className="w-5 h-5 shrink-0" />,
      iconOnly: true,
    },
    {
      id: "farm",
      title: "FARM ANIMALS",
      icon: <GiCow className="w-5 h-5 shrink-0" />,
      iconOnly: false,
    },
    {
      id: "pet",
      title: "PET ANIMALS",
      icon: <FaPaw className="w-4.5 h-4.5 shrink-0" />,
      iconOnly: false,
    },
    {
      id: "poultry",
      title: "POULTRY CARE",
      icon: <GiRooster className="w-5 h-5 shrink-0" />,
      iconOnly: false,
    },
    {
      id: "floor",
      title: "FLOOR CLEANER",
      icon: <FaSprayCan className="w-4.5 h-4.5 shrink-0" />,
      iconOnly: false,
    },
    {
      id: "general",
      title: "GENERAL CARE",
      icon: <FaFlask className="w-4.5 h-4.5 shrink-0" />,
      iconOnly: false,
    },
  ];

  // Filtering products according to the clicked tab
  const filteredProducts = PRODUCTS.filter((item) => {
    let matchesCategory = true;
    if (activeCategory === "all") {
      matchesCategory = true;
    } else if (activeCategory === "farm") {
      matchesCategory = item.categoryGroup === "farm";
    } else if (activeCategory === "pet") {
      matchesCategory = item.categoryGroup === "pet";
    } else if (activeCategory === "poultry") {
      matchesCategory = item.categoryGroup === "poultry";
    } else if (activeCategory === "floor") {
      matchesCategory = item.categoryGroup === "floor";
    } else if (activeCategory === "general") {
      matchesCategory = item.categoryGroup === "general";
    } else {
      matchesCategory =
        item.category === activeCategory ||
        item.categoryGroup === (activeCategory as CategoryGroup);
    }

    const matchesSearch =
      searchTerm.trim() === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetAnimals.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const activeTabDetails =
    categoryTabs.find((t) => t.id === activeCategory) || categoryTabs[0];

  return (
    <section
      id="catalog-section"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white font-sans scroll-mt-20 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#5160a3]">
            <PawPrint className="w-4 h-4 fill-[#5160a3]" />
            <span>Shop By Product</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif sm:font-sans">
            Best Products For Happy Animals
          </h2>
        </div>

        {/* Section Sub-bar: Active Category Summary + Search Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-2 sm:gap-2.5 pb-2 w-full sm:flex-wrap justify-start sm:justify-center">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setSearchTerm("");
                    setShowAll(false);
                  }}
                  title={tab.title}
                  aria-label={tab.title}
                  className={`flex items-center justify-center gap-2 px-2 sm:px-4 py-2 sm:py-2 rounded-2xl transition-all duration-200 cursor-pointer select-none shrink-0 ${
                    isActive
                      ? "bg-[#5160a3] text-white shadow-md shadow-[#5160a3]/25 ring-1 ring-[#5160a3]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-100"
                  }`}
                >
                  {/* React Icon */}
                  <div
                    className={`shrink-0 transition-colors ${
                      isActive ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {tab.icon}
                  </div>

                  {!tab.iconOnly && (
                    <span
                      className={`hidden sm:inline text-xs font-bold tracking-wider leading-tight ${
                        isActive ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {tab.title}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search within Category */}
          <div className="relative w-full sm:w-62 hidden md:block">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowAll(false);
              }}
              placeholder="Search formulations..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#495384] text-slate-800 font-medium"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {(() => {
          const displayedProducts = showAll
            ? filteredProducts
            : filteredProducts.slice(0, INITIAL_DISPLAY_COUNT);

          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {displayedProducts.map((product) => {
                  const isSaved = wishlist.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                    >
                      {/* Product Image Container with Light Grey Backdrop */}
                      <div
                        onClick={() => setSelectedProduct(product)}
                        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F4F4F6] p-5 flex items-center justify-center group/img"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={220}
                          height={220}
                          style={{ width: "auto", height: "auto" }}
                          className="max-h-full max-w-full object-contain drop-shadow-md select-none group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Floating Action Buttons Appearing on Hover */}
                        <div className="absolute inset-0 bg-black/15 rounded-2xl flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                          {/* Add to Cart */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-2xl flex items-center justify-center text-slate-700 hover:text-[#5160a3] hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>

                          {/* Quick View */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-2xl flex items-center justify-center text-slate-700 hover:text-[#5160a3] hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Wishlist */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className={`w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer ${
                              isSaved
                                ? "text-rose-500"
                                : "text-slate-700 hover:text-rose-500"
                            }`}
                            title={
                              isSaved ? "Remove from Wishlist" : "Add to Wishlist"
                            }
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isSaved ? "fill-rose-500 text-rose-500" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Card Info Below Image: 5 Stars + Category + Name (No Price) */}
                      <div className="pt-4 pb-2 text-center space-y-1.5 flex flex-col items-center">
                        {/* 5 Coral / Terracotta Stars */}
                        <div className="flex items-center justify-center gap-1 text-[#5160a3]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#5160a3]" />
                          ))}
                        </div>

                        {/* Category Label */}
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block pt-0.5">
                          {product.categoryLabel}
                        </span>

                        {/* Product Name */}
                        <h3
                          onClick={() => setSelectedProduct(product)}
                          className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#5160a3] transition-colors cursor-pointer line-clamp-1 leading-snug"
                        >
                          {product.name}
                        </h3>

                        {/* Inquiry Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openWhatsAppInquiry(product.name);
                          }}
                          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex items-center justify-center gap-2"
                        >
                          <span>Inquire Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* "View More / Show Less" Button */}
              {filteredProducts.length > INITIAL_DISPLAY_COUNT && (
                <div className="flex justify-center pt-4 sm:pt-6">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#5160a3] hover:bg-[#434f8a] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <span>
                      {showAll
                        ? "Show Less"
                        : `View More (${filteredProducts.length - INITIAL_DISPLAY_COUNT} More)`}
                    </span>
                    {showAll ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </>
          );
        })()}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/80">
            <p className="text-slate-500 text-sm">
              No formulations match your search criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchTerm("");
              }}
              className="mt-3 px-5 py-2.5 bg-[#5160a3] hover:bg-[#434f8a] text-white text-xs font-bold rounded-full cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
