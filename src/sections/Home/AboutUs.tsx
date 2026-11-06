"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  Target,
  Sprout,
  FlaskConical,
  ShieldCheck,
  Award,
  ArrowRight,
  User,
  CheckCircle2,
  Sparkles,
  Eye,
} from "lucide-react";

/** Pages alternate white and light sections; each page picks the tone that fits its order */
type SectionTone = "white" | "light";
const TONE_BG: Record<SectionTone, string> = { white: "bg-white", light: "bg-[#F5F7FC]" };

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const aboutFacts = [
  {
    label: "Founded",
    value: "2021, Thanjavur",
    Icon: Sprout,
  },
  {
    label: "Incubated at",
    value: "Periyar TBI",
    Icon: FlaskConical,
  },
  {
    label: "Indian Patent",
    value: "Granted 2024",
    Icon: ShieldCheck,
  },
  {
    label: "Recognised by",
    value: "DPIIT, Govt. of India",
    Icon: Award,
  },
];

const team: TeamMember[] = [
  {
    name: "Dr. M. Sivakumar",
    role: "Director / CTO",
    bio: "Ph.D in Polymer Technology. Worked in Singapore and Japan; 25 years in research and product development.",
    image: IMAGES.team.sivakumar,
  },
  {
    name: "Dr. Chinnadurai",
    role: "Director & VP",
    bio: "B.V.Sc, farm veterinarian. Worked in Singapore, Malaysia and Africa; 20 years in farm animal health care.",
    image: IMAGES.team.chinnadurai,
  },
  {
    name: "Swami",
    role: "Mentor",
    bio: "B.E Instrumentation, working in Silicon Valley (CISCO, California). Founder of several startups.",
    image: IMAGES.team.swami,
  },
];

/**
 * 7. SCIENCE FROM THANJAVUR SECTION
 */
export function ScienceFromThanjavurSection({ tone = "white" }: { tone?: SectionTone }) {
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className={`w-full section-y ${TONE_BG[tone]} font-sans border-b border-[#D9DFF0]`} id="science-from-thanjavur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-stretch">
          
          {/* Left Column: Story & Facts */}
          <div className="space-y-6 sm:space-y-8 lg:py-2">
            <div className="space-y-3">
              {/* Eyebrow */}
              <div className="eyebrow">
                <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
                <span>Science From Thanjavur</span>
              </div>

              {/* Main Heading */}
              <h2 className="h-section text-slate-900">
                Science From Thanjavur. <br className="hidden sm:inline" />
                <span className="text-[#5160a3]">Care For Every Farm.</span>
              </h2>

              {/* Sub-label */}
              <p className="t-kicker text-slate-500">
                Ariviyaa Deep Tech Pvt. Ltd. — A Deep-Tech Biotechnology Startup
              </p>
            </div>

            {/* Body Description */}
            <p className="t-lead text-slate-600">
              Founded in 2021 by scientists and entrepreneurs, Ariviyaa translates locally developed
              scientific innovation into affordable, sustainable animal healthcare. We integrate
              nanotechnology, biotechnology, and polymer science to build products for animal health,
              wound management, and antimicrobial protection.
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-[#5160a3] text-white flex items-center justify-center shrink-0">
                    <Target className="w-4.5 h-4.5" />
                  </span>
                  <h3 className="h-card text-slate-900">Our Mission</h3>
                </div>
                <p className="t-body text-slate-500">
                  Protect animals, improve farmers&apos; livelihoods and support clean milk production
                  through <span className="font-semibold text-[#5160a3]">NaxPoly®</span> green
                  nanotechnology.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-[#5160a3] text-white flex items-center justify-center shrink-0">
                    <Eye className="w-4.5 h-4.5" />
                  </span>
                  <h3 className="h-card text-slate-900">Our Vision</h3>
                </div>
                <p className="t-body text-slate-500">
                  Make antibiotic-free, eco-friendly animal healthcare the everyday standard for
                  India&apos;s dairy farms, veterinarians and pet parents.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Product Range Visual */}
          {/* Fills the full height of the text column on desktop */}
          <div className="relative">
            <div className="relative h-full rounded-3xl overflow-hidden bg-white border border-[#D9DFF0] shadow-sm">

              {/* Product Range Image Container */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px] w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {!imgError["product-range"] ? (
                  <Image
                    src={IMAGES.productShowcase}
                    alt="Ariviyaa product range"
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                    onError={() => handleImageError("product-range")}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-[#EFF3FC] text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center mb-3">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <span className="text-base font-bold text-slate-800">Ariviyaa Product Range</span>
                    <span className="text-xs text-slate-500 mt-1">NaxPoly® Chemical-Free Formulations</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Facts: one full-width row under both columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {aboutFacts.map(({ label, value, Icon }) => (
            <div
              key={label}
              className={`${tone === "white" ? "bg-[#F5F7FC]" : "bg-white"} p-4 sm:p-5 rounded-2xl border border-[#D9DFF0] shadow-2xs flex items-center gap-3 sm:gap-4`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
                <span className="block h-card text-slate-900 mt-0.5">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 10. TEAM BEHIND ARIVIYAA SECTION
 */
export function TeamBehindAriviyaaSection({ tone = "light" }: { tone?: SectionTone }) {
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className={`w-full section-y ${TONE_BG[tone]} font-sans border-b border-[#D9DFF0]`} id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Team Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Leadership</span>
          </div>
          <h2 className="h-section text-slate-900">
            The Team Behind Ariviyaa
          </h2>
          <p className="t-lead text-slate-600">
            Driven by dedicated scientists, veterinary specialists, and bio-innovators.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <article
              key={member.name}
              className="bg-white rounded-[20px] border border-[#D9DFF0] p-6 sm:p-7 flex flex-col items-center text-center"
            >
              {/* Photo — source files are ~120px, so keep it at a size that stays sharp */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-[#F5F7FC] border border-[#D9DFF0]">
                {!imgError[`team-${index}`] ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    onError={() => handleImageError(`team-${index}`)}
                    sizes="128px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#5160a3]">
                    <User className="w-10 h-10 opacity-70" />
                  </div>
                )}
              </div>

              <h4 className="mt-5 h-card text-slate-900">{member.name}</h4>
              <span className="mt-1.5 inline-block px-2.5 py-1 rounded-md bg-[#5160a3]/10 text-[#5160a3] text-xs font-semibold">
                {member.role}
              </span>
              <p className="mt-4 pt-4 border-t border-[#D9DFF0] w-full t-body text-slate-500">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Combined AboutUsSection for backward compatibility
 */
export function AboutUsSection() {
  return (
    <>
      <ScienceFromThanjavurSection />
      <TeamBehindAriviyaaSection />
    </>
  );
}

export default AboutUsSection;
