"use client";

import React, { useState } from "react";
import { PawPrint, Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface FaqItem {
  id: string;
  qNumber: string;
  question: string;
  answer: string;
}

export function FaqSection() {
  const { openWhatsAppInquiry } = useApp();

  // Set the first item open by default to mirror the reference image design
  const [openId, setOpenId] = useState<string>("faq-1");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      qNumber: "Q1",
      question: "What products do you offer for farm animals and pets?",
      answer:
        "We provide clinically validated, 100% lick-safe, antibiotic-free formulations. This includes bovine mastitis teat barrier dips (MammaryO) for dairy cattle and goats, rapid pet wound healing sprays (Anima Spray), antifungal & antibacterial dermis care (Dermisward), aloe vera pet shampoos, poultry respiratory flock defense, and chemical-free probiotic floor cleaners.",
    },
    {
      id: "faq-2",
      qNumber: "Q2",
      question: "Are your animal healthcare products safe to use and lick-safe?",
      answer:
        "Yes, 100% safe! All Ariviya solutions are formulated using patented green synthesis nanobio-polymer technology. They are completely non-toxic, chemical-free, non-stinging, and safe if ingested by curious puppies, kittens, or dairy cattle.",
    },
    {
      id: "faq-3",
      qNumber: "Q3",
      question: "Does MammaryO teat barrier require any milk withholding period?",
      answer:
        "Zero milk withholding period! Because MammaryO is a non-antibiotic bio-shield tested with TANUVAS-TRPVB, dairy farmers can safely sell clean, pathogen-free milk immediately with zero antibiotic residue penalties or dumping losses.",
    },
    {
      id: "faq-4",
      qNumber: "Q4",
      question: "Can I find grooming and dermatology essentials here?",
      answer:
        "Yes! We offer a dedicated companion pet range (10 formulations) including PetSha natural conditioning shampoo, Dermisward antifungal mist for itchy skin, OtoSpray ear hygiene rinse, and herbal tick & flea protection sprays.",
    },
    {
      id: "faq-5",
      qNumber: "Q5",
      question: "Do you provide pan-India delivery and direct WhatsApp ordering?",
      answer:
        "Yes, we provide express pan-India dispatch and delivery. You can conveniently order directly via WhatsApp or browse our catalog, and our veterinary care team will guide you on correct dosage and application methods.",
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="faq-section" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white font-sans border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Section Header & Direct Inquiry Button       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* Paw Icon Badge */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#5160a3]">
              <PawPrint className="w-4 h-4 fill-[#5160a3]" />
              <span>Frequently Asked Questions</span>
            </div>

            {/* Bold Headline matching reference */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Helpful Answers For Pet & Farm Animal Owners
            </h2>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md font-normal">
              Find answers to common questions about pet care, dairy livestock health, lick-safe formulations, shipping, and usage—everything you need to keep your animals happy and healthy.
            </p>

            
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Interactive FAQ Accordion List              */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-[#F5F5F7] rounded-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Question Header Row */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors leading-snug">
                      <span className="font-black mr-1.5">{faq.qNumber}.</span>
                      {faq.question}
                    </span>

                    {/* Circular Dark Plus/Minus Toggle Icon (Reference Style) */}
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#5160a3] transition-colors">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {/* Expanded Answer Content */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-200/50 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
