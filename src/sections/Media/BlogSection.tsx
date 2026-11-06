"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/constants/blog";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";

export function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = BLOG_CATEGORIES;

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full section-y bg-white font-sans border-b border-[#D9DFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F5F7FC] p-3 sm:p-4 rounded-2xl border border-[#D9DFF0]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#5160a3] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#5160a3] hover:bg-white"
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
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#D9DFF0] rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5160a3]"
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
                <h2 className="h-block text-slate-900 hover:text-[#5160a3] transition-colors">
                  <Link href={`/blog/${filteredPosts[0].slug}`}>{filteredPosts[0].title}</Link>
                </h2>
                <p className="t-lead text-slate-600">
                  {filteredPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D9DFF0] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{filteredPosts[0].author}</div>
                  <div className="text-xs text-slate-500">{filteredPosts[0].authorRole}</div>
                </div>
                <Link
                  href={`/blog/${filteredPosts[0].slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5160a3] hover:text-[#43518a]"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#5160a3] text-xs font-bold shadow-2xs">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="h-card text-slate-900 group-hover:text-[#5160a3] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="t-body text-slate-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D9DFF0] flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">{post.author}</span>
                    <span className="text-xs text-slate-500 block">{post.authorRole}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="p-2 rounded-lg bg-[#F5F7FC] group-hover:bg-[#5160a3] group-hover:text-white text-slate-700 transition-colors"
                    aria-label={`Read ${post.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
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
