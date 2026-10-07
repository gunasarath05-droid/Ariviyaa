"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { PawPrint, ChevronLeft, ChevronRight } from "lucide-react";
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
      image: "/assets/categories/avatar_cow.jpg",
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "Priority #1",
    },
    {
      id: "goat",
      filterId: "farm",
      title: "Goats",
      subLabel: "Herd Wound & Ticks",
      image: "/assets/categories/avatar_goat.jpg",
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "Caprine Care",
    },
    {
      id: "dog",
      filterId: "pet",
      title: "Dogs",
      subLabel: "10 Dedicated Formulas",
      image: "/assets/categories/avatar_dog.jpg",
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "10 Products",
    },
    {
      id: "cat",
      filterId: "pet",
      title: "Cats",
      subLabel: "Wound & Coat Wellness",
      image: "/assets/categories/avatar_cat.jpg",
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "Lick-Safe",
    },
    {
      id: "birds",
      filterId: "poultry",
      title: "Birds",
      subLabel: "3 Flock Biosecurity",
      image: "/assets/categories/avatar_poultry.jpg",
      bgTint: "bg-[#F3F4F6]",
      division: "Animal Healthcare",
      tag: "3 Products",
    },
    {
      id: "floor",
      filterId: "floor",
      title: "Floor Cleaner",
      subLabel: "Pet & Family Probiotic",
      image: "/assets/categories/avatar_floor.jpg",
      bgTint: "bg-[#F3F4F6]",
      division: "General Care",
      tag: "Chemical-Free",
    },
    {
      id: "general",
      filterId: "general",
      title: "General Care",
      subLabel: "Disinfectant & Hands",
      image: "/assets/categories/avatar_general.jpg",
      bgTint: "bg-[#F3F4F6]",
      division: "General Care",
      tag: "3 Products",
    },
  ];

  const handleCategoryClick = (filterId: string) => {
    setActiveCategory(filterId);
    const element = document.getElementById("catalog-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#5160a3]">
              <PawPrint className="w-4 h-4 fill-[#5160a3]" />
              <span>Shop By Category</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-serif sm:font-sans">
              Best Products For Healthy Animals
            </h2>
          </div>
          
        </div>

        {/* Categories Swiper Carousel */}
        <div className="relative">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2.3}
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
                slidesPerView: 4,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 24,
              },
            }}
            className="w-full !py-2"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.id}>
                <div
                  onClick={() => handleCategoryClick(cat.filterId)}
                  className="flex flex-col items-center text-center group cursor-pointer select-none transition-all duration-300 p-2 rounded-2xl hover:bg-slate-50/70"
                >
                  {/* Circular Avatar Container */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-[#F3F4F6] p-1.5 shadow-sm group-hover:shadow-md transition-shadow">
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
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
                      {cat.subLabel}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
