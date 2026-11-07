"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CommonHeroProps {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  subtitle?: string;
  /** Full background banner image; defaults to Veterinary Care */
  image?: string;
  className?: string;
}

export function CommonHero({
  title,
  breadcrumb = [{ label: "Home", href: "/" }, { label: title }],
  subtitle,
  image = IMAGES.veterinaryCare,
  className = "",
}: CommonHeroProps) {
  return (
    <section
      className={`relative w-full bg-gradient-to-r from-[#C5E5FD] via-[#EFF6FD] to-[#DCEBFB] border-b border-[#C0DCF5] overflow-hidden font-sans flex items-center min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px] xl:min-h-[380px] ${className}`}
    >
      {/* Full Widescreen Background Banner Artwork */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center"
        />
        {/* Soft gradient shield on left side to guarantee text contrast without obscuring the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF5FD]/90 via-[#EEF5FD]/60 to-transparent w-full sm:w-3/5 lg:w-1/2 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 sm:py-10 md:py-12">
        {/* Left Column: Title, Breadcrumbs, Subtitle */}
        <div className="max-w-md sm:max-w-lg md:max-w-xl space-y-2.5 sm:space-y-3.5 text-left hero-stagger">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] drop-shadow-xs">
            {title}
          </h1>

          {/* Breadcrumb Navigation directly under title - matching Petmart pattern */}
          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="pt-0.5">
              <ol className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 bg-white/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#D0E0F4]/80 shadow-2xs">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={index} className="flex items-center gap-2">
                      {index > 0 && (
                        <span className="text-slate-400 select-none text-xs">/</span>
                      )}
                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="text-slate-600 hover:text-[#5160a3] transition-colors"
                        >
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

          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base text-slate-700 font-medium leading-relaxed max-w-lg pt-0.5">
              {subtitle}
            </p>
          )}

          {/* Subtle accent mark matching reference design */}
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5160a3]" />
            <span className="hero-accent-line w-8 h-0.5 rounded-full bg-[#5160a3]/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommonHero;
