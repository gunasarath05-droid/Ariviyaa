import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, FileText, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms, order inquiry guidelines, and conditions of use for Ariviya veterinary products and digital platforms.",
  alternates: {
    canonical: "https://www.ariviyaa.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-[#5160a3]">
            <FileText className="w-4 h-4" />
            <span>Agreement &amp; Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif sm:font-sans">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Welcome to <strong>Ariviya</strong>. By browsing our website, submitting inquiries, or ordering our green nanobio-polymer veterinary formulations, you agree to comply with and be bound by the following terms and conditions.
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
              className="px-4 py-2 rounded-xl bg-[#5160a3] text-white text-xs font-bold shadow-xs"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/disclaimer"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              1. Commercial Inquiries &amp; Quotations
            </h2>
            <p>
              Ariviya manufactures specialized biological veterinary solutions. Products listed on this website represent formulations developed for commercial dairy farms, veterinary clinics, pet parents, and institutional cooperatives.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-sm">
              <li>Product availability, bulk packaging tiers, and final quotations are confirmed directly through authorized representatives on WhatsApp, email, or telephone.</li>
              <li>Placing an inquiry through our shopping cart or contact forms does not create a binding sales contract until confirmed by our dispatch department.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              2. Intellectual Property Rights
            </h2>
            <p>
              All trademarks, patents, proprietary formulation brands (including <strong>Naxpoly®</strong>, <strong>MammaryO</strong>, <strong>AnimSpray</strong>, and <strong>Tiksha</strong>), scientific literature, research validation summaries, graphics, and logos displayed on this site are the exclusive intellectual property of Ariviya. Unauthorized reproduction or reverse engineering is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              3. Dispatch &amp; Delivery Terms
            </h2>
            <p>
              Orders confirmed with our sales desk are dispatched directly from our certified manufacturing laboratories. Delivery transit timelines may vary based on carrier logistics, destination remoteness, and batch fresh synthesis schedules. Tracking details are provided upon courier handover.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              4. Product Handling &amp; Storage
            </h2>
            <p>
              Purchasers and handlers are responsible for following specified storage conditions (e.g., store in cool, dry areas away from direct sunlight, maintain sealed caps). Ariviya is not responsible for product degradation resulting from improper on-farm storage or contamination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of India. Any disputes arising from transactions or inquiries shall be subject to the exclusive jurisdiction of the competent courts in Tamil Nadu, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              6. Queries &amp; Support
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-sm">
              <p className="font-bold text-slate-900">Ariviya Legal &amp; Sales Desk</p>
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
