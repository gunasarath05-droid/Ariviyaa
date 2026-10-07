import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, AlertCircle, ShieldAlert, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important veterinary guidance and scientific disclaimer regarding Ariviya nanobio-polymer veterinary formulations.",
  alternates: {
    canonical: "https://www.ariviyaa.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5160a3] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs text-slate-400 font-medium">Last Updated: October 2026</span>
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Scientific &amp; Veterinary Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif sm:font-sans">
            Disclaimer
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Please carefully read this Disclaimer regarding the use of <strong>Ariviya</strong> veterinary products, scientific research summaries, and informational content provided on this platform.
          </p>

          {/* Policy Switcher Tabs */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            <Link
              href="/privacy-policy"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/disclaimer"
              className="px-4 py-2 rounded-xl bg-[#5160a3] text-white text-xs font-bold shadow-xs"
            >
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              1. Not a Substitute for Professional Veterinary Diagnosis
            </h2>
            <p>
              Information published on this website — including descriptions of bovine mastitis prevention, wound healing polymers, bio-sanitizers, and tick repellents — is intended for educational, technical, and informational purposes only.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-950 text-xs sm:text-sm leading-relaxed">
              <strong>Notice:</strong> This content is not intended to replace consultation, clinical examination, or specific treatment prescribed by a licensed veterinary practitioner. Always consult a qualified veterinary doctor for acute clinical emergencies or systemic infections.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              2. Clinical Validation &amp; Academic Testing
            </h2>
            <p>
              Product claims, laboratory efficacy metrics, and antimicrobial barrier percentages cited on this website are derived from controlled scientific evaluations, including testing conducted with <strong>TANUVAS-TRPVB</strong> and independent laboratories.
            </p>
            <p className="text-slate-600 text-sm">
              Actual on-farm results may vary depending on herd management hygiene, environmental pathogen load, application frequency, farm climate, and pre-existing animal health conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              3. Topical &amp; Lick-Safe Clarification
            </h2>
            <p>
              Our companion animal and dairy cow bio-polymer formulations are certified non-toxic and engineered to be safe even if licked during normal grooming. However, our topical products (sprays, teat barriers, shampoos) are formulated for external physiological application and are not intended for internal dietary feeding or intravenous injection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              4. External Links &amp; Third-Party Mentions
            </h2>
            <p>
              Any links to research portals, university announcements, or government startup grants are provided solely for user reference. Ariviya does not endorse or take responsibility for the continuous availability or accuracy of external third-party servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              5. Contact for Technical Clarification
            </h2>
            <p>
              For technical queries regarding laboratory trial reports or application instructions:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-sm">
              <p className="font-bold text-slate-900">Ariviya Technical Advisory Board</p>
              <p className="text-slate-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#5160a3]" />
                <span>{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}</span>
              </p>
              <p className="text-slate-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5160a3]" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#5160a3] hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </p>
              <p className="text-slate-600 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5160a3]" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#5160a3] hover:underline">
                  {COMPANY_INFO.displayPhone}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
