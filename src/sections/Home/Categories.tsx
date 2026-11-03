"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { IMAGES } from "@/constants/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

export function CategoriesSection() {
  const { setActiveCategory } = useApp();
  const swiperRef = useRef<SwiperType | null>(null);

  const categories = [
    {
      id: "cow",
      filterId: "farm",
      title: "Cows",
      subLabel: "Mastitis & Teat Barrier",
      image: IMAGES.categories.cow,
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "Priority #1",
    },
    {
      id: "dog",
      filterId: "pet",
      title: "Dogs",
      subLabel: "Wound, Skin, Ear & Tick",
      image: IMAGES.categories.dog,
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "10 Products",
    },
    {
      id: "cat",
      filterId: "pet",
      title: "Cats",
      subLabel: "Wound & Coat Wellness",
      image: IMAGES.categories.cat,
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "Lick-Safe",
    },
    {
      id: "birds",
      filterId: "poultry",
      title: "Birds",
      subLabel: "Coming Soon",
      image: IMAGES.categories.poultry,
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "Coming Soon",
    },
    {
      id: "floor",
      filterId: "floor",
      title: "Floor Cleaner",
      subLabel: "Pet & Family Probiotic",
      image: IMAGES.categories.floor,
      bgTint: "bg-[#F3F4F6]",
      division: "General Care",
      tag: "Chemical-Free",
    },
    {
      id: "general",
      filterId: "general",
      title: "General Care",
      subLabel: "Surface Disinfectant",
      image: IMAGES.categories.general,
      bgTint: "bg-[#F3F4F6]",
      division: "General Care",
      tag: "1 Product",
    },
  ];

  const handleCategoryClick = (filterId: string) => {
    setActiveCategory(filterId);
    const element = document.getElementById("catalog-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderCategoryItem = (cat: (typeof categories)[number]) => (
    <div
      key={cat.id}
      onClick={() => handleCategoryClick(cat.filterId)}
      className="flex flex-col items-center justify-center text-center group cursor-pointer select-none transition-all duration-300 p-2 rounded-2xl hover:bg-slate-50/70"
    >
      {/* Circular Avatar Container */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-42 lg:h-42 rounded-full overflow-hidden bg-[#F3F4F6] p-1.5 shadow-sm group-hover:shadow-md transition-shadow">
        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
          <Image
            src={cat.image}
            alt={cat.title}
            width={160}
            height={160}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Category Title & Subtitle */}
      <div className="mt-3 space-y-0.5">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors leading-tight">
          {cat.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
          {cat.subLabel}
        </p>
      </div>
    </div>
  );

  return (
    <section className="w-full section-y px-4 sm:px-6 lg:px-8 bg-white font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="space-y-2">
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
              <span>Shop By Category</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-serif sm:font-sans">
              Best Products For Healthy Animals
            </h2>
          </div>
        </div>

        {/* Desktop & Tablet: Centered Row */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-8 flex-wrap max-w-7xl mx-auto">
          {categories.map((cat) => renderCategoryItem(cat))}
        </div>

        {/* Mobile: Swiper Carousel */}
        <div className="md:hidden relative">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={14}
            slidesPerView={2.3}
            centerInsufficientSlides={true}
            grabCursor={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              420: {
                slidesPerView: 2.8,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 3.8,
                spaceBetween: 18,
              },
            }}
            className="w-full !py-2"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.id} className="!flex !justify-center">
                {renderCategoryItem(cat)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
