"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, Search, MessageCircle, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { FAQ_CATEGORIES } from "@/constants/faq";

export function FaqBrowser() {
  const { openWhatsAppInquiry } = useApp();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState("products-0");

  const term = query.trim().toLowerCase();
  const categories = FAQ_CATEGORIES.filter((c) => activeCategory === "all" || c.id === activeCategory)
    .map((c) => ({
      ...c,
      items: c.items
        .map((item, index) => ({ ...item, key: `${c.id}-${index}` }))
        .filter((item) => !term || `${item.question} ${item.answer}`.toLowerCase().includes(term)),
    }))
    .filter((c) => c.items.length > 0);

  return (
    <section className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Category list + help card */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              aria-label="Search FAQs"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5160a3] focus:ring-2 focus:ring-[#5160a3]/15"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <nav
            aria-label="FAQ categories"
            className="bg-white rounded-2xl border border-[#D9DFF0] p-2 flex lg:flex-col gap-1 overflow-x-auto no-scrollbar"
          >
            {[{ id: "all", title: "All questions" }, ...FAQ_CATEGORIES].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === c.id ? "bg-[#5160a3] text-white" : "text-slate-700 hover:bg-[#F5F7FC] hover:text-[#5160a3]"
                }`}
              >
                {c.title}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block bg-white rounded-2xl border border-[#D9DFF0] p-6 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Still have questions?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our animal health team replies within a few hours on working days.
            </p>
            <button
              type="button"
              onClick={() => openWhatsAppInquiry()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </button>
            <Link href="/contact" className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline">
              Send an enquiry <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </aside>

        {/* Questions */}
        <div className="lg:col-span-8 space-y-8">
          {categories.length === 0 && (
            <div className="bg-white rounded-2xl border border-[#D9DFF0] p-10 text-center text-sm text-slate-500">
              No questions match &ldquo;{query}&rdquo;. Try another word or contact us.
            </div>
          )}

          {categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{category.title}</h2>
              <ul className="space-y-3">
                {category.items.map((item) => {
                  const isOpen = openKey === item.key;
                  return (
                    <li key={item.key} className="bg-white rounded-2xl border border-[#D9DFF0] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? "" : item.key)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                      >
                        <span className={`text-sm sm:text-base font-bold ${isOpen ? "text-[#5160a3]" : "text-slate-900"}`}>
                          {item.question}
                        </span>
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            isOpen ? "bg-[#5160a3] text-white" : "bg-[#F5F7FC] text-slate-600"
                          }`}
                        >
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                      {isOpen && (
                        <p className="px-5 pb-5 -mt-1 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{item.answer}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
