"use client";

import React from "react";
import Link from "next/link";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Globe2,
  FileText,
  Mail,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  Building,
  Target,
  ArrowRight,
} from "lucide-react";

export function InvestorHighlights() {
  return (
    <section className="w-full section-y bg-white font-sans border-b border-[#D9DFF0]" id="investor-highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="eyebrow">
            <TrendingUp className="w-4 h-4 text-[#5160a3]" />
            <span>Investment & Institutional Backing</span>
          </div>
          <h2 className="h-section text-slate-900">
            Bridging Deep-Tech Nanotechnology with a{" "}
            <span className="text-[#5160a3]">Multi-Billion Dollar Market</span>
          </h2>
          <p className="t-lead text-slate-600">
            Ariviyaa is solving one of animal agriculture’s greatest economic and safety challenges: antibiotic-free antimicrobial protection for dairy, companion animals, and poultry.
          </p>
        </div>

        {/* 4 Pillars of Investor Moat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="bg-[#F5F7FC] p-6 rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="h-card text-slate-900">₹7,000+ Cr Market Loss</h3>
              <p className="t-body text-slate-500">
                Bovine mastitis costs Indian dairy farmers over ₹7,000 Crores every year in discarded milk and cow loss. Our patented non-antibiotic dip prevents infection at origin.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80 mt-4 text-xs font-bold text-[#5160a3] uppercase tracking-wider">
              Massive TAM & Farmer ROI
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#F5F7FC] p-6 rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="h-card text-slate-900">Patented NaxPoly® IP</h3>
              <p className="t-body text-slate-500">
                Indian Patent Granted (2024) for our green-synthesis bio-polymer matrix. Zero chemical residue, 100% biodegradable, and leaves no antibiotic footprint in commercial milk.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80 mt-4 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Strong Defensible IP Moat
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#F5F7FC] p-6 rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="h-card text-slate-900">StartupTN & TANUVAS Backed</h3>
              <p className="t-body text-slate-500">
                Funded by StartupTN TANSEED 3.0 seed grant from Govt of Tamil Nadu. Field efficacy tested and validated by veterinary doctors at TANUVAS TRPVB.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80 mt-4 text-xs font-bold text-blue-600 uppercase tracking-wider">
              Govt & Institutional Trust
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-[#F5F7FC] p-6 rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="h-card text-slate-900">B2B + D2C Scalability</h3>
              <p className="t-body text-slate-500">
                Omnichannel expansion strategy covering dairy farmer federations, retail veterinary clinics, poultry integrators, and pet parent e-commerce.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200/80 mt-4 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              High Margin Recurring Model
            </div>
          </div>
        </div>

        {/* Investor Card CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1E2538] via-[#2A334E] to-[#1E2538] text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-slate-700">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Investment & Partnership Desk</span>
            </div>
            <h3 className="h-block">
              Partner with Ariviyaa to Build the Future of Sustainable Animal Health
            </h3>
            <p className="t-lead text-slate-300">
              We welcome dialogues with venture capital firms, impact investors, agri-business funds, and strategic corporate partners who share our mission of eradicating antibiotic resistance in food animals.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact?role=investor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-[#5160a3] hover:bg-[#43518a] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Investor Relations</span>
              </Link>
              <a
                href="mailto:ariviyalabs@gmail.com?subject=Investor%20Inquiry%20-%20Ariviya%20Deep%20Tech"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 transition-all"
              >
                <span>Email Founder / CTO Directly</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Decorative watermarks */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-40 pointer-events-none hidden lg:flex items-center justify-center">
            <AriviyaIcon className="w-72 h-72 text-white" />
          </div>
        </div>

      </div>
    </section>
  );
}
