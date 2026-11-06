"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/constants/images";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

const RECENT_POSTS = [
  {
    id: "post-1",
    title: "Understanding Bovine Mastitis: Why Antibiotics Fail & How Natural Bio-Polymers Protect the Teat",
    excerpt: "Mastitis costs Indian dairy farmers over ₹7,000 crores annually. Discover how non-antibiotic polymer barrier technology stops environmental pathogens without milk withholding penalties.",
    category: "Dairy & Cattle",
    author: "Dr. Chinnadurai",
    date: "October 12, 2026",
    readTime: "5 min read",
    image: IMAGES.site.mammaryoInvented,
  },
  {
    id: "post-2",
    title: "Green Synthesis in Animal Health: Inside Ariviyaa's Patented NaxPoly® Technology",
    excerpt: "A deep dive into how biodegradable carbohydrate-based polymers are synthesized using eco-friendly green chemistry to create robust antimicrobial matrices with zero toxic residues.",
    category: "Biotech Science",
    author: "Dr. M. Sivakumar",
    date: "October 04, 2026",
    readTime: "7 min read",
    image: IMAGES.site.productsRange,
  },
  {
    id: "post-3",
    title: "Gentle Care for Sensitive Paws: Why Pets Suffer from Chemical Cleaner Residues",
    excerpt: "Commercial disinfectants often leave toxic residues that can cause dermatitis, respiratory distress, and licking poisoning in dogs and cats. Here is why natural bio-sanitization is critical.",
    category: "Pet Health",
    author: "Veterinary Team",
    date: "September 28, 2026",
    readTime: "4 min read",
    image: IMAGES.aboutPuppy,
  },
];

export function HomeBlogSection() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white font-sans border-b border-[#D9DFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5160a3]/10 text-[#5160a3] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Veterinary Science & Research</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Latest Insights & <span className="text-[#5160a3]">Field Knowledge</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Scientific articles, field trial guides, and biosecurity protocols authored by our research team and veterinary specialists.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5160a3] hover:bg-[#3f4b82] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all self-start md:self-auto group"
          >
            <span>View All Research Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RECENT_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-[#F8FAFC] rounded-2xl border border-[#D9DFF0] overflow-hidden hover:border-[#5160a3] hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image Thumbnail */}
              <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#5160a3]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    By {post.author}
                  </span>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#5160a3] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HomeBlogSection;
