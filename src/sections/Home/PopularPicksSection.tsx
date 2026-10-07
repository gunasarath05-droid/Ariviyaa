"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/constants/products";
import { Star, ShoppingBag, Eye, Heart, PawPrint, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

export function PopularPicksSection() {
  const { addToCart, wishlist, toggleWishlist, setSelectedProduct } = useApp();
  const swiperRef = useRef<SwiperType | null>(null);

  // Top featured flagship products across Farm, Pet, Poultry, and Floor Cleaner
  const popularProducts = PRODUCTS.slice(0, 8);

  return (
    <section id="popular-picks" className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans scroll-mt-20 bg-[#FAF7F2]/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#5160a3]">
              <PawPrint className="w-4 h-4 fill-[#5160a3]" />
              <span>Shop By Product</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-serif sm:font-sans">
              Happy Pets &amp; Farm Animals
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl pt-0.5 font-normal">
              Clinically validated green nanobio-polymer essentials — 100% lick-safe, antibiotic-free &amp; zero chemical residues.
            </p>
          </div>
        </div>

        {/* Product Cards Swiper Slider */}
        <div className="relative">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            grabCursor={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.6,
                spaceBetween: 18,
              },
              640: {
                slidesPerView: 2.3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full !pb-12 !pt-2"
          >
            {popularProducts.map((product) => {
              const isSaved = wishlist.includes(product.id);

              return (
                <SwiperSlide key={product.id} className="h-auto">
                  <div className="h-full bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative">
                    {/* Product Image Container with Action Buttons */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F4F1EA]/70 p-4 flex items-center justify-center group/img"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={220}
                        height={220}
                        priority={product.id === popularProducts[0]?.id}
                        loading={product.id === popularProducts[0]?.id ? "eager" : "lazy"}
                        style={{ width: "auto", height: "auto" }}
                        className="max-h-full max-w-full object-contain drop-shadow-md select-none group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Floating Action Buttons Appearing on Hover */}
                      <div className="absolute inset-0 bg-black/15 rounded-2xl flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                        {/* 1. Add to Cart Button */}
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

                        {/* 2. Quick View Eye Button */}
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

                        {/* 3. Wishlist Heart Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer ${
                            isSaved ? "text-rose-500" : "text-slate-700 hover:text-rose-500"
                          }`}
                          title={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Card Info Below Image: 5 Stars + Category + Name (No Price) */}
                    <div className="pt-4 pb-2 text-center space-y-1.5 flex flex-col items-center">
                      {/* 5 Stars in #5160a3 theme */}
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

                      {/* Mobile Visible Quick Action Bar */}
                      <div className="sm:hidden flex items-center gap-2 pt-2 w-full">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-[#5160a3] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Inquire</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`p-2 rounded-xl border border-slate-200 ${
                            isSaved ? "bg-rose-50 text-rose-500" : "bg-white text-slate-600"
                          }`}
                          title="Save"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-500" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
