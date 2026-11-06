"use client";

import React from "react";
import Link from "next/link";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  Building2,
  PackageCheck,
  PhoneCall,
  Mail,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

export function B2BBanner() {
  return (
    <section className="w-full py-12 sm:py-16 bg-[#F5F7FC] border-t border-[#D9DFF0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#D9DFF0] p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5160a3]/10 text-[#5160a3] text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Commercial & Institutional Bulk Orders</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Are you a Dairy Cooperative, Veterinary Clinic, or Distributor?
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Ariviyaa supplies custom 5-liter, 20-liter, and drum formulations of MammaryO teat dip, teat spray, and livestock shed hygiene solutions with institutional pricing, field demo kits, and technical documentation.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom bulk volume packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official TANUVAS efficacy dossier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>GST invoicing & credit terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Priority nationwide transport dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 bg-[#F5F7FC] p-6 rounded-2xl border border-[#D9DFF0] space-y-4 text-center sm:text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Direct B2B Desk
              </div>
              <div className="text-lg font-black text-slate-900">
                Speak with our Commercial Head
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-2 hover:text-[#5160a3] font-bold transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>{COMPANY_INFO.displayPhone}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Bulk%20Distributor%20Inquiry`}
                  className="flex items-center gap-2 hover:text-[#5160a3] font-bold transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </div>
              <Link
                href="/contact?type=distributor"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5160a3] hover:bg-[#43518a] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all"
              >
                <span>Request Wholesale Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
