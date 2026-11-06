"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";
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
      question: "What is MammaryO and how does it prevent mastitis?",
      answer:
        "MammaryO is a post-milking teat dip built on our patented NaxPoly® nano-bio-polymer technology. After every milking it forms a protective film over the teat that blocks mastitis-causing pathogens and helps heal cracks and lesions — without antibiotics.",
    },
    {
      id: "faq-2",
      qNumber: "Q2",
      question: "Does MammaryO require any milk withholding period?",
      answer:
        "No. MammaryO is a non-antibiotic teat dip tested with TANUVAS-TRPVB, so there is no withholding period and no antibiotic residue in the milk — farmers can sell their milk as usual.",
    },
    {
      id: "faq-3",
      qNumber: "Q3",
      question: "How does it fit into the daily milking routine?",
      answer:
        "Dip each teat with a teat dip cup right after milking and let the film dry. It is easily washable before the next milking and is safe for the cow, calf, handler and farm environment.",
    },
    {
      id: "faq-4",
      qNumber: "Q4",
      question: "What pack sizes are available for bulk buyers?",
      answer:
        "We supply 5-litre, 20-litre and drum packs for dairy cooperatives, large farms and distributors, along with teat dip cups, field demo kits and technical documentation.",
    },
    {
      id: "faq-5",
      qNumber: "Q5",
      question: "How can I become a distributor or institutional partner?",
      answer:
        "Send us an enquiry through the form below or call our team. We offer dealer pricing, GST invoicing and pan-India dispatch, and share the TANUVAS efficacy dossier with qualified partners.",
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="faq-section" className="w-full section-y bg-white font-sans border-b border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Section Header & Direct Inquiry Button       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* Paw Icon Badge */}
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
              <span>Frequently Asked Questions</span>
            </div>

            {/* Bold Headline matching reference */}
            <h2 className="h-section text-slate-900">
              MammaryO Answers For Dairy Businesses &amp; Partners
            </h2>

            {/* Subtitle / Description */}
            <p className="t-lead text-slate-600 max-w-md">
              Common questions from dairy cooperatives, farms, veterinarians and distributors about how MammaryO works, how it is used and how to buy in bulk.
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
                  className="bg-[#F5F7FC] rounded-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Question Header Row */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="h-card text-slate-900 group-hover:text-[#5160a3] transition-colors">
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
                    <div className="px-4 sm:px-5 pb-5 pt-1 t-body text-slate-500 border-t border-slate-200/50 mt-1">
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
