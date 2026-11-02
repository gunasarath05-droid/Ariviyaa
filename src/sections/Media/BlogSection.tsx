"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  Search,
  Sparkles,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: "Dairy & Cattle" | "Pet Health" | "Biotech Science" | "Poultry Care";
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Understanding Bovine Mastitis: Why Antibiotics Fail & How Natural Bio-Polymers Protect the Teat",
    slug: "bovine-mastitis-prevention-natural-biopolymers",
    excerpt: "Mastitis costs Indian dairy farmers over ₹7,000 crores annually. Discover how non-antibiotic polymer barrier technology stops environmental pathogens without milk withholding penalties.",
    category: "Dairy & Cattle",
    author: "Dr. Chinnadurai",
    authorRole: "B.V.Sc, VP Animal Health",
    date: "October 12, 2026",
    readTime: "5 min read",
    image: IMAGES.site.mammaryoInvented,
  },
  {
    id: "post-2",
    title: "Green Synthesis in Animal Health: Inside Ariviya's Patented NaxPoly® Technology",
    slug: "green-synthesis-naxpoly-nanotechnology",
    excerpt: "A deep dive into how biodegradable carbohydrate-based polymers are synthesized using eco-friendly green chemistry to create robust antimicrobial matrices with zero toxic residues.",
    category: "Biotech Science",
    author: "Dr. M. Sivakumar",
    authorRole: "Ph.D, Director & CTO",
    date: "October 04, 2026",
    readTime: "7 min read",
    image: IMAGES.site.productsRange,
  },
  {
    id: "post-3",
    title: "Gentle Care for Sensitive Paws: Why Pets Suffer from Chemical Floor Cleaner Residues",
    slug: "pet-safe-natural-cleaners-allergy-prevention",
    excerpt: "Commercial bleach and pine floor cleaners leave corrosive residues that pets ingest while licking paws. Learn how bio-polymer plant sanitizers keep floors sterile and dogs allergy-free.",
    category: "Pet Health",
    author: "Dr. Chinnadurai",
    authorRole: "B.V.Sc, VP Animal Health",
    date: "September 28, 2026",
    readTime: "4 min read",
    image: IMAGES.friendlyPetsRow,
  },
  {
    id: "post-4",
    title: "The Clean Milk Revolution: Standard Operating Procedure for Post-Milking Teat Dips",
    slug: "clean-milk-standard-operating-procedure-teat-dip",
    excerpt: "Step-by-step veterinary guidelines on timing, dipping cups, coverage, and barrier drying that protect commercial crossbred cows against Streptococcus and E. coli infections.",
    category: "Dairy & Cattle",
    author: "Dr. M. Sivakumar",
    authorRole: "Ph.D, Director & CTO",
    date: "September 19, 2026",
    readTime: "6 min read",
    image: IMAGES.farmLandscape,
  },
  {
    id: "post-5",
    title: "Poultry Shed Biosecurity: Combating Ammonia & Viral Loads Without Harsh Chemicals",
    slug: "poultry-biosecurity-natural-disinfection",
    excerpt: "How natural antimicrobial formulations reduce flock mortality, eliminate foul odors, and prevent secondary respiratory infections in broiler and layer setups.",
    category: "Poultry Care",
    author: "Ariviya Research Desk",
    authorRole: "Biotech Advisory",
    date: "September 10, 2026",
    readTime: "5 min read",
    image: IMAGES.site.sproutHands,
  },
];

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Dairy & Cattle", "Pet Health", "Biotech Science", "Poultry Care"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="eyebrow">
            <BookOpen className="w-4 h-4" />
            <span>Ariviya Science & Field Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Veterinary Insights, Field Guides & <br />
            <span className="text-[#5160a3]">Biotech Breakthroughs</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Written by veterinary doctors, polymer research scientists, and livestock healthcare pioneers.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-[#D9DFF0] shadow-2xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#5160a3] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5160a3]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Featured Post (First item if All or matching) */}
        {filteredPosts.length > 0 && selectedCategory === "All" && !searchQuery && (
          <div className="bg-white rounded-3xl overflow-hidden border border-[#D9DFF0] shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative aspect-16/9 lg:aspect-auto min-h-[280px]">
              <Image
                src={filteredPosts[0].image}
                alt={filteredPosts[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#5160a3] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Featured Guide
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-bold text-[#5160a3] uppercase tracking-wider">{filteredPosts[0].category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {filteredPosts[0].date}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                  {filteredPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{filteredPosts[0].author}</div>
                  <div className="text-[11px] text-slate-500">{filteredPosts[0].authorRole}</div>
                </div>
                <button
                  onClick={() => {
                    alert(`Article: "${filteredPosts[0].title}"\n\nFull technical guide available soon. For clinical inquiries, contact ariviyalabs@gmail.com.`);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5160a3] hover:text-[#43518a] cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#D9DFF0] shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#5160a3] text-[11px] font-bold shadow-2xs">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">{post.author}</span>
                    <span className="text-[10px] text-slate-500 block">{post.authorRole}</span>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Article: "${post.title}"\n\nFull technical guide available soon. For clinical inquiries, contact ariviyalabs@gmail.com.`);
                    }}
                    className="p-2 rounded-lg bg-slate-50 group-hover:bg-[#5160a3] group-hover:text-white text-slate-700 transition-colors cursor-pointer"
                    title="Read article"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
