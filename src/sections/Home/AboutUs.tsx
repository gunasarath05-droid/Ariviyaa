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
} from "lucide-react";

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
export function ScienceFromThanjavurSection() {
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full section-y bg-white font-sans border-b border-[#D9DFF0]" id="science-from-thanjavur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story & Facts */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              {/* Eyebrow */}
              <div className="eyebrow">
                <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
                <span>Science From Thanjavur</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                Science From Thanjavur. <br className="hidden sm:inline" />
                <span className="text-[#5160a3]">Care For Every Farm.</span>
              </h2>

              {/* Sub-label */}
              <p className="text-sm sm:text-base font-bold text-[#5160a3]/90 tracking-wide uppercase">
                Ariviya Deep Tech Pvt. Ltd. — A Deep-Tech Biotechnology Startup
              </p>
            </div>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Founded in 2021 by scientists and entrepreneurs, Ariviya translates locally developed
              scientific innovation into affordable, sustainable animal healthcare. We integrate
              nanotechnology, biotechnology, and polymer science to build products for animal health,
              wound management, and antimicrobial protection.
            </p>

            {/* Facts Row / Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
              {aboutFacts.map(({ label, value, Icon }) => (
                <div
                  key={label}
                  className="bg-[#F5F7FC] p-3.5 sm:p-4 rounded-2xl border border-[#D9DFF0] shadow-2xs hover:shadow-xs transition-shadow flex flex-col gap-2"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-800 leading-tight block mt-0.5">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual & Mission Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#D9DFF0] shadow-lg">
              
              {/* Product Range Image Container */}
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {!imgError["product-range"] ? (
                  <Image
                    src={IMAGES.productShowcase}
                    alt="Ariviya product range"
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
                    <span className="text-base font-bold text-slate-800">Ariviya Product Range</span>
                    <span className="text-xs text-slate-500 mt-1">NaxPoly® Chemical-Free Formulations</span>
                  </div>
                )}
              </div>

              {/* Mission Card Embedded at Bottom */}
              <div className="p-6 bg-white border-t border-[#D9DFF0] space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#5160a3] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-sm sm:text-base font-black text-slate-900">
                      Our Mission
                    </strong>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal">
                      Protect animals, improve farmers&apos; livelihoods and support clean milk production
                      through <span className="font-bold text-[#5160a3]">NaxPoly®</span> green nanotechnology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 10. TEAM BEHIND ARIVIYAA SECTION
 */
export function TeamBehindAriviyaaSection() {
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Team Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="eyebrow">
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
            <span>Leadership</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            The Team Behind Ariviyaa
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Driven by dedicated scientists, veterinary specialists, and bio-innovators.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <article
              key={member.name}
              className="bg-white rounded-2xl border border-[#D9DFF0] p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-center items-center group"
            >
              {/* Member Avatar / Image */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-slate-100 p-1 border-2 border-[#D9DFF0] group-hover:border-[#5160a3] transition-colors mb-4">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                  {!imgError[`team-${index}`] ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(`team-${index}`)}
                      sizes="120px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-[#EFF3FC] text-[#5160a3]">
                      <User className="w-10 h-10 opacity-70" />
                    </div>
                  )}
                </div>
              </div>

              {/* Member Details */}
              <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#5160a3] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-bold text-[#5160a3] mt-0.5">
                    {member.role}
                  </p>
                </div>
                <p className="text-sm sm:text-[13px] text-slate-600 leading-relaxed my-2 font-normal">
                  {member.bio}
                </p>
              </div>
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
