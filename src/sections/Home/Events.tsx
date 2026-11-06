"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import Link from "next/link";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  Trophy,
  MapPin,
  Coins,
  TrendingUp,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Award,
  ArrowRight,
  ZoomIn,
  X,
  ExternalLink,
  Sparkles,
  FileCheck,
  ChevronRight,
} from "lucide-react";

const events = [
  {
    title: "Vanakkam Startups",
    place: "Tamil Nadu startup showcase",
    badge: "SHOWCASE",
    image: IMAGES.events.vanakkamStartups,
  },
  {
    title: "Startup India – Dettol Pitching Session",
    place: "Invest India & RB Health",
    badge: "WINNER",
    image: IMAGES.events.dettolPitch,
  },
  {
    title: "Young Indians (Yi) – CII Startup Award",
    place: "Confederation of Indian Industry",
    badge: "AWARD",
    image: IMAGES.events.yiCiiAward,
  },
];

const awardSummary = [
  { value: "₹49L+", label: "Funding & grants" },
  { value: "5", label: "National recognitions" },
  { value: "1 of 31", label: "TANSEED 3.0 winners" },
];

const awards = [
  {
    year: "2025",
    highlight: "₹19 Lakh",
    title: "SBI Foundation – C-CAMP AMR #2",
    detail: "Compulsory convertible debentures, Bengaluru",
    Icon: Coins,
    color: "from-blue-600 to-indigo-700",
  },
  {
    year: "2025",
    highlight: "₹20 Lakh",
    title: "Silverline Broilers",
    detail: "Equity-based fund for poultry biosecurity expansion",
    Icon: TrendingUp,
    color: "from-emerald-600 to-teal-700",
  },
  {
    year: "2022",
    highlight: "₹10 Lakh",
    title: "StartupTN TANSEED 3.0",
    detail: "Seed grant from Govt. of Tamil Nadu — 1 of 31 from 1,600+ applicants",
    Icon: Sprout,
    color: "from-[#5160a3] to-purple-800",
  },
  {
    year: "2021",
    highlight: "Top 500",
    title: "Kuberan's House",
    detail: "Recognised among India's top startups at India's biggest startup show",
    Icon: Trophy,
    color: "from-amber-500 to-orange-600",
  },
  {
    year: "2020",
    highlight: "Winner",
    title: "Dettol's Innovate With Purpose",
    detail: "Innovative disinfectant challenge — Invest India, £3,000",
    Icon: ShieldCheck,
    color: "from-[#5160a3] to-blue-800",
  },
];

const certificates = [
  {
    id: "tanseed",
    title: "StartupTN TANSEED 3.0",
    badge: "₹10 LAKH SEED GRANT",
    badgeColor: "bg-emerald-600 text-white",
    awardTitle: "Agribusiness Innovation Winner",
    authority: "Government of Tamil Nadu · StartupTN",
    year: "2022",
    image: IMAGES.awards.tanseed,
    highlight: "1 of 31 Winners from 1,600+ State-wide Innovators",
    description:
      "Awarded by StartupTN and the Government of Tamil Nadu for our proprietary bovine mastitis-prevention nano-polymer formulation.",
  },
  {
    id: "dettol",
    title: "Dettol Innovate With Purpose",
    badge: "NATIONAL WINNER · £3,000",
    badgeColor: "bg-[#5160a3] text-white",
    awardTitle: "Winner Certificate",
    authority: "Invest India · RB Health · #StartupIndia",
    year: "2020",
    image: IMAGES.awards.dettolWinner,
    highlight: "Signed by MD & CEO, Invest India & RB Leadership",
    description:
      "Honored in the nationwide innovation challenge for breakthrough plant-derived herbal germ-kill active hygiene formulations.",
  },
  {
    id: "kuberans",
    title: "Kuberan's House",
    badge: "TOP 500 STARTUPS",
    badgeColor: "bg-amber-600 text-white",
    awardTitle: "Certificate of Appreciation",
    authority: "India's Biggest Startup Show · AWS Activate",
    year: "2021",
    image: IMAGES.awards.kuberansHouse,
    highlight: "Selected from 20,000+ Pan-India Nominees",
    description:
      "Officially recognized among India's Top 500 promising deep-tech startups by marquee venture leaders and AWS.",
  },
  {
    id: "iitb-pitch-perfect",
    title: "Pitch Perfect 2021-22",
    badge: "WINNER",
    badgeColor: "bg-sky-600 text-white",
    awardTitle: "Certificate of Achievement",
    authority: "E-Club SJMSOM & SINE · IIT Bombay",
    year: "2021-22",
    image: IMAGES.awards.iitbPitchPerfect,
    highlight: "Awarded to Dr. Sivakumar & Team Ariviyaa",
    description:
      "Winners of Pitch Perfect 2021-22, organised by E-Club SJMSOM in collaboration with SINE business incubator, IIT Bombay.",
  },
];

/**
 * 8. WHERE OUR SCIENCE GETS RECOGNISED SECTION
 */
export function WhereOurScienceRecognisedSection() {
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]" id="expo-events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
              <span>Expo &amp; Events</span>
            </div>
            <h2 className="h-section text-slate-900">
              Where Our Science <br className="hidden sm:inline" />
              <span className="text-[#5160a3]">Gets Recognised</span>
            </h2>
            <p className="t-lead text-slate-600">
              From startup showcases to national innovation challenges, Ariviyaa has earned industry
              credibility as a deep-tech nano-biotechnology enterprise for veterinary hygiene and biosecurity.
            </p>
          </div>

          <div>
            <Link
              href="/#contact-section"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Meet Us At An Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Events 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, idx) => (
            <article
              key={event.title}
              className="group bg-white rounded-2xl border border-[#D9DFF0] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Event Image Container with Fallback */}
              <div className="relative aspect-16/10 w-full bg-slate-200 overflow-hidden">
                {!imgError[`event-${idx}`] ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(`event-${idx}`)}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-[#EFF3FC] text-slate-400">
                    <Award className="w-10 h-10 text-[#5160a3] mb-1 opacity-70" />
                    <span className="text-xs font-semibold text-slate-600">Event Showcase</span>
                  </div>
                )}

                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#5160a3] text-white shadow-xs">
                  {event.badge}
                </span>
              </div>

              {/* Event Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <h3 className="h-card text-slate-900 group-hover:text-[#5160a3] transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#5160a3] shrink-0" />
                  <span>{event.place}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 9. ACHIEVEMENTS & AWARDS SECTION — CERTIFICATES HERO FOCUS
 */
export function AchievementsAwardsSection() {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[0] | null>(null);

  return (
    <section className="w-full section-y bg-white font-sans border-b border-[#D9DFF0]" id="awards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* HEADER & QUICK STATS                                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-[#F5F7FC] p-6 sm:p-8 lg:p-10 rounded-3xl border border-[#D9DFF0]">
          <div className="space-y-3 max-w-2xl">
            <div className="eyebrow">
              <Trophy className="w-4 h-4 text-[#5160a3]" />
              <span>Verified Accreditations &amp; Awards</span>
            </div>
            <h2 className="h-block text-slate-900">
              National Honors &amp; <span className="text-[#5160a3]">Official Certificates</span>
            </h2>
            <p className="t-lead text-slate-600">
              Validated and awarded by Startup India, Invest India, Govt. of Tamil Nadu (StartupTN), and premier innovation challenges across India.
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            {awardSummary.map((stat) => (
              <div
                key={stat.label}
                className="bg-white px-4 sm:px-5 py-3 rounded-2xl border border-[#D9DFF0] shadow-2xs min-w-[110px]"
              >
                <strong className="block text-xl sm:text-2xl font-bold text-[#5160a3]">
                  {stat.value}
                </strong>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO SECTION: CERTIFICATES FRONT AND CENTER (PRIMARY FOCUS)               */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <p className="lg:hidden flex items-center justify-end gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Swipe to see all {certificates.length}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </p>

          {/* Certificate cards: swipeable row on mobile/tablet, 4-column grid on desktop */}
          <div className="flex lg:grid lg:grid-cols-4 gap-5 lg:gap-6 items-stretch overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 pt-2 pb-4">
            {certificates.map((cert) => (
              <article
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group shrink-0 w-[82%] sm:w-[46%] md:w-[40%] lg:w-auto snap-start bg-[#F8FAFC] hover:bg-white rounded-3xl border-2 border-[#D9DFF0] hover:border-[#5160a3] p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden"
              >
                {/* Certificate image only — badge, authority and description open in the viewer */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm group-hover:shadow-lg transition-all duration-300 flex items-center justify-center p-2">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain select-none group-hover:scale-[1.03] transition-transform duration-500"
                  />

                  {/* Interactive Zoom Hover Overlay */}
                  <div className="absolute inset-0 bg-[#5160a3]/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-4 h-4 text-[#5160a3]" />
                      <span>View Details</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-start justify-between gap-2">
                  <h4 className="h-card text-slate-900 group-hover:text-[#5160a3] transition-colors">
                    {cert.title}
                  </h4>
                  <span className="shrink-0 px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 font-bold text-xs">
                    {cert.year}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE GRANTS & VENTURE FUNDING ROW                                 */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-4 border-t border-[#D9DFF0]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Institutional Grants &amp; Growth Capital Milestones
            </span>
            <span className="text-xs font-bold text-[#5160a3]">Total ₹49L+ Non-Dilutive &amp; Equity Grants</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {awards.slice(0, 4).map((award) => {
              const AwardIcon = award.Icon;
              return (
                <div
                  key={award.title}
                  className="bg-[#F8FAFC] rounded-2xl border border-[#D9DFF0] p-4.5 space-y-2 hover:bg-white hover:shadow-md hover:border-[#5160a3]/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      {award.highlight}
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                      {award.year}
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug line-clamp-1">
                    {award.title}
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {award.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* HIGH-RES CERTIFICATE LIGHTBOX MODAL                                       */}
      {/* ========================================================================= */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 md:p-10 flex items-center justify-center animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedCert(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedCert.authority} · {selectedCert.year}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition active:scale-95 cursor-pointer"
                aria-label="Close certificate viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Large Certificate Image */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 bg-slate-100 flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[55vh] w-auto h-auto object-contain select-none bg-white rounded-2xl shadow-xl border border-slate-300/80 p-2 sm:p-3"
                />
              </div>

              {/* Certificate Details */}
              <div className="p-4 sm:p-6 bg-white space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider ${selectedCert.badgeColor}`}>
                    <Award className="w-3.5 h-3.5" />
                    <span>{selectedCert.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {selectedCert.awardTitle}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedCert.description}</p>
                <p className="text-xs font-semibold text-slate-500">{selectedCert.highlight}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex justify-end">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-6 py-2.5 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold transition active:scale-95 cursor-pointer"
              >
                Close Viewer
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Combined EventsSection for backward compatibility
 */
export function EventsSection() {
  return (
    <>
      <WhereOurScienceRecognisedSection />
      <AchievementsAwardsSection />
    </>
  );
}

export default EventsSection;
