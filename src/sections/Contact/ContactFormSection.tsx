"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CheckCircle2 } from "lucide-react";

// Links elsewhere on the site pre-select the enquiry type, e.g. /contact?type=distributor
const QUERY_TO_TYPE: Record<string, string> = {
  distributor: "Distributor / Stockist / Retailer",
  investor: "Investor / VC / Strategic Partner",
  cooperative: "Dairy Cooperative / Milk Union",
  vet: "Veterinary Doctor / Clinic",
};

const assurances = [
  {
    title: "Bulk & Institutional Supply",
    desc: "5 L, 20 L and drum packs of MammaryO with GST invoicing for cooperatives and farms.",
  },
  {
    title: "Distributor & Dealer Partnerships",
    desc: "Dealer pricing and pan-India dispatch for veterinary and dairy-input networks.",
  },
  {
    title: "Veterinary & Technical Support",
    desc: "Usage guidance and the TANUVAS efficacy dossier for vets and qualified partners.",
  },
  {
    title: "Investor Relations",
    desc: "Company overview and investor information shared on request.",
  },
];

export function ContactFormSection() {
  const searchParams = useSearchParams();
  const presetType =
    QUERY_TO_TYPE[searchParams.get("type") ?? ""] ?? QUERY_TO_TYPE[searchParams.get("role") ?? ""] ?? "";

  return (
    <section className="w-full bg-white section-y font-sans border-b border-[#D9DFF0]" id="contact-form-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: intro & what we help with */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-40">
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3]" />
              <span>Get In Touch</span>
            </div>

            <h2 className="h-section text-slate-900">
              Send Us Your <span className="text-[#5160a3]">Enquiry</span>
            </h2>

            <p className="t-lead text-slate-600">
              Tell us who you are and what you need. Your enquiry goes straight to our team, and the right
              person will call or email you within one working day.
            </p>

            <ul className="space-y-4 pt-1">
              {assurances.map(({ title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="h-card text-slate-900">{title}</h3>
                    <p className="t-body text-slate-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form card */}
          <div className="lg:col-span-7">
            <EnquiryForm source="Website – Contact page" presetType={presetType} />
          </div>
        </div>
      </div>
    </section>
  );
}
