"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { IMAGES } from "@/constants/images";
import { AriviyaIcon } from "@/components/AriviyaIcon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CommonHeroProps {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  subtitle?: string;
  /** Page-specific banner image; defaults to the MammaryO product banner */
  image?: string;
  /** CSS object-position for the banner, e.g. "center" or "right" */
  imagePosition?: string;
  className?: string;
}

export function CommonHero({
  title,
  breadcrumb = [{ label: "Home", href: "/" }, { label: title }],
  subtitle,
  image = IMAGES.commonHeroBanner,
  imagePosition = "center",
  className = "",
}: CommonHeroProps) {
  return (
    <section
      className={`relative w-full bg-[#EEF1F9] border-b border-[#D9DFF0] overflow-hidden font-sans ${className}`}
    >
      {/* Banner Image: full background on mobile, right half bleeding to the edge on desktop */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[55%] lg:w-1/2 pointer-events-none select-none">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        {/* Mobile: soft wash so text stays readable over the photo */}
        <div className="absolute inset-0 bg-[#EEF1F9]/85 md:hidden" />
        {/* Desktop: fade the photo into the background colour instead of a hard edge */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#EEF1F9] via-[#EEF1F9]/60 to-transparent hidden md:block" />
      </div>

      {/* Decorative glow */}
      <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-[#5160a3]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-14 lg:py-16 max-w-xl space-y-3 sm:space-y-4">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-[#D9DFF0] text-[11px] sm:text-xs font-semibold text-slate-500 shadow-2xs">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={index} className="flex items-center gap-1">
                      {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                      {item.href && !isLast ? (
                        <Link href={item.href} className="hover:text-[#5160a3] transition-colors">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-[#5160a3] font-bold" aria-current="page">
                          {item.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            {title}
          </h1>

          <div className="flex items-center gap-2">
            <span className="h-1 w-10 rounded-full bg-[#5160a3]" />
            <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
          </div>

          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CommonHero;
