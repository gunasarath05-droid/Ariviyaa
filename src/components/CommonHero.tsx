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
  /** Page-specific banner image; defaults to the product hero lineup cutout */
  image?: string;
  className?: string;
}

export function CommonHero({
  title,
  breadcrumb = [{ label: "Home", href: "/" }, { label: title }],
  subtitle,
  image = IMAGES.productHeroBanner,
  className = "",
}: CommonHeroProps) {
  return (
    <section
      className={`relative w-full bg-gradient-to-r from-[#F5F7FC] via-[#EEF1F9] to-[#E9EEF8] border-b border-[#D9DFF0] overflow-hidden font-sans ${className}`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-10 md:pt-12 pb-0">
          {/* Left Column: Title, Breadcrumbs, Subtitle */}
          <div className="w-full md:max-w-xl lg:max-w-2xl pb-4 sm:pb-6 md:pb-10 space-y-2.5 sm:space-y-3 text-left animate-fade-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              {title}
            </h1>

            {/* Breadcrumb Navigation directly under title - matching reference pattern */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="pt-0.5">
                <ol className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
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


            {/* Subtle accent mark matching reference design */}
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              <span className="w-8 h-0.5 rounded-full bg-[#5160a3]/30" />
            </div>
          </div>

          {/* Right Column: Cutout Product Image sitting flush on bottom border */}
          <div className="w-full md:w-auto flex-1 flex justify-center md:justify-end items-end self-end pointer-events-none select-none animate-fade-in [animation-delay:150ms]">
            <div className="relative w-full w-auto h-[180px] sm:h-[220px] md:h-[250px] lg:h-[320px]">
              <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 560px"
                className="object-contain object-bottom drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommonHero;
