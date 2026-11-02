"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  Image as ImageIcon,
  Award,
  Maximize2,
  X,
  Sparkles,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Awards & Honors" | "Research & Demos" | "Pitch & Events";
  date: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "StartupTN TANSEED 3.0 Seed Grant Award",
    subtitle: "Government of Tamil Nadu",
    category: "Awards & Honors",
    date: "2023",
    image: IMAGES.site.awardTanseed,
    description: "Official award received from StartupTN (Govt. of Tamil Nadu) supporting Ariviya Deep Tech for pioneering green biopolymer animal healthcare formulations.",
  },
  {
    id: "g2",
    title: "Dettol Innovate With Purpose Winner",
    subtitle: "Reckitt Benckiser National Challenge",
    category: "Awards & Honors",
    date: "2023",
    image: IMAGES.site.certDettolWinner,
    description: "Certificate of Achievement awarded to Ariviya for innovative antiseptic and hygiene solutions in the prestigious nationwide challenge.",
  },
  {
    id: "g3",
    title: "Kuberan's House Top 50 Finalist",
    subtitle: "National Startup Pitch Stage",
    category: "Awards & Honors",
    date: "2022",
    image: IMAGES.site.certKuberansHouse,
    description: "Recognized among the Top 50 innovative Indian startups out of over 20,000 applicants at the Kuberan's House entrepreneurship conclave.",
  },
  {
    id: "g4",
    title: "Dettol Innovate with Purpose Pitch Stage",
    subtitle: "Reckitt Global Innovation Forum",
    category: "Pitch & Events",
    date: "2023",
    image: IMAGES.site.eventDettolPitch,
    description: "Presenting Ariviya's NaxPoly® non-antibiotic polymer teat dip technology before global leaders and biotechnology juries.",
  },
  {
    id: "g5",
    title: "Vanakkam Startups Regional Showcase",
    subtitle: "Tamil Nadu Biotech Ecosystem",
    category: "Pitch & Events",
    date: "2023",
    image: IMAGES.site.eventVanakkamStartups,
    description: "Showcasing clinical efficacy results from TANUVAS field trials to agricultural innovators and dairy cooperative heads.",
  },
  {
    id: "g6",
    title: "Yi CII Innovation Conclave Award",
    subtitle: "Young Indians & Confederation of Indian Industry",
    category: "Awards & Honors",
    date: "2024",
    image: IMAGES.site.eventYiCiiAward,
    description: "Felicitation for high-impact deep-tech innovation born out of Thanjavur's biotechnology incubation corridor.",
  },
  {
    id: "g7",
    title: "MammaryO Clinical Invention & Teat Application",
    subtitle: "Field Trials in Thanjavur & Erode",
    category: "Research & Demos",
    date: "2024",
    image: IMAGES.site.mammaryoInvented,
    description: "Field demonstrations of MammaryO post-milking dip showing uniform physical barrier formation and teat canal closure.",
  },
  {
    id: "g8",
    title: "Complete Formulations Portfolio Range",
    subtitle: "NaxPoly® Chemical-Free Products",
    category: "Research & Demos",
    date: "2024",
    image: IMAGES.site.productsRange,
    description: "The full veterinary and companion animal lineup developed at Periyar TBI incubator, Thanjavur.",
  },
];

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Awards & Honors", "Research & Demos", "Pitch & Events"];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5160a3]/10 text-[#5160a3] text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" />
            <span>Visual Milestones & Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Awards, Lab Breakthroughs & <br />
            <span className="text-[#5160a3]">Field Demonstrations</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            A visual documentation of our journey from research at Periyar TBI, Thanjavur to national startup stages and dairy farm trials.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-2xl border border-[#D9DFF0] shadow-2xs max-w-xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#5160a3] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="bg-white rounded-2xl overflow-hidden border border-[#D9DFF0] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#5160a3] text-[10px] font-bold shadow-2xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#5160a3] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{item.date}</span>
                  <span className="font-bold text-[#5160a3] group-hover:underline">View details</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Box */}
            <div className="relative aspect-16/10 w-full bg-slate-950 flex items-center justify-center">
              <Image
                src={activeModalItem.image}
                alt={activeModalItem.title}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-3 bg-white">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5160a3] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeModalItem.category}</span>
                <span>•</span>
                <span className="text-slate-500">{activeModalItem.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeModalItem.title}
              </h3>
              <p className="text-sm font-semibold text-slate-700">
                {activeModalItem.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1 border-t border-slate-100">
                {activeModalItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
