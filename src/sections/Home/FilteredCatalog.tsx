"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  PRODUCTS,
  CategoryGroup,
  priceLabel,
} from "@/constants/products";
import {
  ShoppingBag,
  Heart,
  MessageCircle,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";
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
    openWhatsAppInquiry,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

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
      id: "home",
      title: "HOME CARE",
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
    } else if (activeCategory === "home") {
      matchesCategory = item.categoryGroup === "home";
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

  // "featured" keeps the catalogue order from constants/products.ts
  if (sortBy === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === "name") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  const activeTabDetails =
    categoryTabs.find((t) => t.id === activeCategory) || categoryTabs[0];

  return (
    <section
      id="catalog-section"
      className="w-full section-y px-4 sm:px-6 lg:px-8 bg-white font-sans scroll-mt-20 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center space-y-2">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Shop Online</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight font-serif sm:font-sans">
            Shop Pet &amp; Farm Care
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-normal">
            Add products to your cart, pay securely online and we dispatch across India.
          </p>
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
            <div>
              {/* Results bar: count + sort */}
              {filteredProducts.length > 0 && (
                <div className="mb-5 sm:mb-6 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">
                    Showing <strong className="text-slate-900">{filteredProducts.length}</strong>{" "}
                    {filteredProducts.length === 1 ? "product" : "products"}
                    {activeCategory !== "all" && (
                      <>
                        {" "}in <span className="capitalize">{activeTabDetails.title.toLowerCase()}</span>
                      </>
                    )}
                  </p>
                  <label className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="hidden sm:inline">Sort by</span>
                    <select
                      aria-label="Sort products"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="px-3 py-2 rounded-[10px] border border-[#D9DFF0] bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#5160a3] cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                  </label>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {displayedProducts.map((product) => {
                  const isSaved = wishlist.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="bg-[#F5F7FC] rounded-[20px] p-2.5 sm:p-3 flex flex-col group"
                    >
                      {/* Product image — click opens quick view */}
                      <div className="relative">
                        <Link
                          href={`/shop/${product.slug}`}
                          aria-label={`View details of ${product.name}`}
                          className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white p-4 sm:p-5 flex items-center justify-center cursor-pointer"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={220}
                            height={220}
                            style={{ width: "auto", height: "auto" }}
                            className="max-h-full max-w-full object-contain select-none group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {product.comingSoon && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#5160a3] text-white text-[11px] font-semibold">
                            Coming soon
                          </span>
                        )}

                        {/* Wishlist */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white border border-[#D9DFF0] flex items-center justify-center transition-colors cursor-pointer ${
                            isSaved ? "text-rose-500" : "text-slate-500 hover:text-rose-500"
                          }`}
                          title={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                          aria-label={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500" : ""}`} />
                        </button>
                      </div>

                      {/* Name, category, price */}
                      <div className="px-1.5 pt-3 pb-1 flex-1 flex flex-col text-center">
                        <span className="text-[11px] font-semibold text-slate-400 line-clamp-1">
                          {product.categoryLabel}
                        </span>
                        <h3 className="mt-1 text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors line-clamp-2 leading-snug min-h-[2.5rem] sm:min-h-[2.75rem]">
                          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                        </h3>
                        <div className="mt-1.5 flex items-baseline justify-center gap-2">
                          <span className="text-base sm:text-lg font-bold text-slate-900">
                            {priceLabel(product)}
                          </span>
                          <span className="text-xs text-slate-400">{product.packs[0].size}</span>
                        </div>

                        {/* Purchase actions */}
                        <div className="mt-3 flex items-center gap-2">
                          {product.comingSoon ? (
                            <button
                              type="button"
                              onClick={() => openWhatsAppInquiry(`${product.name} (coming soon)`)}
                              className="flex-1 min-w-0 py-2.5 px-3 rounded-[10px] bg-white border border-[#5160a3] text-[#5160a3] hover:bg-[#EFF3FC] text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>Notify Me</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addToCart(product, 1)}
                              className="flex-1 min-w-0 py-2.5 px-3 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] active:scale-95 text-white text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                              <span>Add to Cart</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => openWhatsAppInquiry(product.name)}
                            className="hidden sm:flex p-2.5 rounded-[10px] bg-white border border-[#D9DFF0] text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer shrink-0"
                            title="Ask on WhatsApp"
                            aria-label={`Ask about ${product.name} on WhatsApp`}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
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
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] text-white font-semibold text-sm shadow-md hover:shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer"
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
            </div>
          );
        })()}

        {/* Poultry range is under development: show a coming-soon note instead of "no results" */}
        {filteredProducts.length === 0 && activeCategory === "poultry" && !searchTerm.trim() && (
          <div className="text-center py-14 px-6 bg-[#F5F7FC] rounded-3xl border border-[#D9DFF0] max-w-2xl mx-auto space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
              <GiRooster className="w-7 h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Poultry Care Products — Coming Soon
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              We are developing NaxPoly® biosecurity solutions for poultry farms. Message us to
              get notified at launch or to discuss requirements for your farm.
            </p>
            <button
              onClick={() => openWhatsAppInquiry("your upcoming poultry care products")}
              className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold rounded-[10px] cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Notify Me on WhatsApp</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && !(activeCategory === "poultry" && !searchTerm.trim()) && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/80">
            <p className="text-slate-500 text-sm">
              No formulations match your search criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchTerm("");
              }}
              className="mt-3 px-5 py-2.5 bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold rounded-[10px] cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
