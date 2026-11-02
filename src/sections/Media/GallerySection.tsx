"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { Maximize2, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

type GalleryCategory = "Awards & Certificates" | "Events & Pitches" | "Products & Research";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: GalleryCategory;
  date?: string;
  image: string;
  description: string;
  /** Documents and graphics are shown whole ("contain"); photos fill the frame ("cover") */
  fit: "cover" | "contain";
}

// Facts here must stay in sync with the awards data in sections/Home/Events.tsx
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "tanseed",
    title: "StartupTN TANSEED 3.0 — Agribusiness Innovation Winner",
    subtitle: "Government of Tamil Nadu · StartupTN",
    category: "Awards & Certificates",
    date: "2022",
    image: IMAGES.awards.tanseed,
    description:
      "₹10 Lakh seed grant for our bovine mastitis-prevention nano-polymer formulation — 1 of 31 winners from 1,600+ applicants across the state.",
    fit: "contain",
  },
  {
    id: "dettol-winner",
    title: "Dettol Innovate With Purpose — National Winner",
    subtitle: "Invest India · RB Health · #StartupIndia",
    category: "Awards & Certificates",
    date: "2020",
    image: IMAGES.awards.dettolWinner,
    description:
      "Winner certificate (£3,000) in the nationwide innovative disinfectant challenge, signed by Invest India and RB leadership.",
    fit: "contain",
  },
  {
    id: "kuberans",
    title: "Kuberan's House — Top 500 Startups",
    subtitle: "India's Biggest Startup Show · AWS Activate",
    category: "Awards & Certificates",
    date: "2021",
    image: IMAGES.awards.kuberansHouse,
    description:
      "Certificate of Appreciation — selected among India's top 500 promising startups from 20,000+ nominees.",
    fit: "contain",
  },
  {
    id: "iitb-pitch-perfect",
    title: "Pitch Perfect 2021-22 Winner — IIT Bombay",
    subtitle: "E-Club, SJMSOM & SINE, IIT Bombay",
    category: "Awards & Certificates",
    date: "2021-22",
    image: IMAGES.awards.iitbPitchPerfect,
    description:
      "Certificate of Achievement awarded to Dr. Sivakumar and Team Ariviya as winners of Pitch Perfect 2021-22, organised by E-Club SJMSOM with SINE business incubator, IIT Bombay.",
    fit: "contain",
  },
  {
    id: "dettol-pitch",
    title: "Startup India — Dettol Pitching Session",
    subtitle: "Invest India & RB Health",
    category: "Events & Pitches",
    date: "2020",
    image: IMAGES.events.dettolPitch,
    description:
      "Presenting Ariviya's NaxPoly® non-antibiotic hygiene technology to the Invest India and RB Health jury.",
    fit: "cover",
  },
  {
    id: "vanakkam",
    title: "Vanakkam Startups",
    subtitle: "Tamil Nadu startup showcase",
    category: "Events & Pitches",
    image: IMAGES.events.vanakkamStartups,
    description:
      "The Ariviya team at the Vanakkam Startups showcase, presenting our animal-health innovations to Tamil Nadu's startup ecosystem.",
    fit: "cover",
  },
  {
    id: "yi-cii",
    title: "Young Indians (Yi) – CII Startup Award",
    subtitle: "Confederation of Indian Industry",
    category: "Events & Pitches",
    image: IMAGES.events.yiCiiAward,
    description:
      "Receiving the Young Indians – CII startup award for deep-tech innovation from Thanjavur.",
    fit: "cover",
  },
  {
    id: "mammaryo-poster",
    title: "MammaryO Post-Milking Teat Dip",
    subtitle: "Flagship product · NaxPoly® nano-biotechnology",
    category: "Products & Research",
    image: IMAGES.products.mammaryoPoster,
    description:
      "Our flagship teat dip for bovine mastitis prevention and clean milk production.",
    fit: "contain",
  },
  {
    id: "mammaryo-invented",
    title: "Mastitis Prevention Formula Using Nanobiotechnology",
    subtitle: "MammaryO with teat dip cup",
    category: "Products & Research",
    image: IMAGES.products.mammaryoInvented,
    description:
      "MammaryO is applied with a teat dip cup after every milking, forming a protective film over the teat.",
    fit: "contain",
  },
  {
    id: "product-range",
    title: "Ariviya Product Range",
    subtitle: "NaxPoly® chemical-free formulations",
    category: "Products & Research",
    image: IMAGES.productShowcase,
    description:
      "The dairy, pet and hygiene range developed at Periyar TBI, Thanjavur — MammaryO, Animaspray, Dermisward, Otospray, Petsha, Cleanida and Surface Disinfectant.",
    fit: "cover",
  },
];

const CATEGORIES: ("All" | GalleryCategory)[] = [
  "All",
  "Awards & Certificates",
  "Events & Pitches",
  "Products & Research",
];

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeItem = activeIndex !== null ? filteredItems[activeIndex] : null;

  const showPrev = () =>
    setActiveIndex((i) => (i === null ? i : (i - 1 + filteredItems.length) % filteredItems.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % filteredItems.length));

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Toolbar: Category filter + result count */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((item) => item.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#5160a3] border-[#5160a3] text-white shadow-xs"
                      : "bg-white border-[#D9DFF0] text-slate-600 hover:text-slate-900 hover:border-[#5160a3]"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] leading-none ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Showing {filteredItems.length} of {GALLERY_ITEMS.length} items
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="text-left bg-white rounded-2xl overflow-hidden border border-[#D9DFF0] shadow-2xs hover:shadow-lg hover:border-[#5160a3] transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div
                className={`relative aspect-4/3 w-full overflow-hidden ${
                  item.fit === "contain" ? "bg-white" : "bg-slate-100"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    item.fit === "contain" ? "object-contain p-3" : "object-cover"
                  }`}
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 border border-[#D9DFF0] text-[#5160a3] text-[10px] font-bold shadow-2xs">
                  {item.category}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col gap-1.5 border-t border-[#D9DFF0]">
                <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#5160a3] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500">{item.subtitle}</p>
                {item.date && (
                  <p className="mt-auto pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 w-full bg-slate-950">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={showPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-900 hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={showNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-slate-900 hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-bold">
                {(activeIndex ?? 0) + 1} / {filteredItems.length}
              </span>
            </div>

            <div className="p-5 sm:p-7 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5160a3] uppercase tracking-wider">
                <span>{activeItem.category}</span>
                {activeItem.date && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{activeItem.date}</span>
                  </>
                )}
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900">{activeItem.title}</h3>
              <p className="text-sm font-semibold text-slate-700">{activeItem.subtitle}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
