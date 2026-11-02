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
  className?: string;
}

export function CommonHero({
  title,
  breadcrumb = [{ label: "Home", href: "/" }, { label: title }],
  subtitle,
  className = "",
}: CommonHeroProps) {
  return (
    <section
      className={`relative w-full bg-[#F4F1EA] border-b border-[#E7E2D6] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[190px] flex items-center justify-between">
          
          {/* Left Side: Title & Breadcrumbs */}
          <div className="z-10 py-6 sm:py-8 pr-4 max-w-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-[#2B2D42] leading-tight font-sans">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-[#5D647B] font-medium max-w-lg line-clamp-1">
                {subtitle}
              </p>
            )}

            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="mt-2 sm:mt-2.5">
                <ol className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-[#5D647B]">
                  {breadcrumb.map((item, index) => {
                    const isLast = index === breadcrumb.length - 1;
                    return (
                      <li key={index} className="flex items-center">
                        {index > 0 && (
                          <span className="mx-1.5 text-[#8D94AB] select-none font-normal">
                            /
                          </span>
                        )}
                        {item.href && !isLast ? (
                          <Link
                            href={item.href}
                            className="hover:text-[#5160A3] transition-colors"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className="text-[#5D647B] font-semibold">
                            {item.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
          </div>

          {/* Right Side: Pets Image Banner */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-[48%] md:w-[45%] lg:w-[42%] max-w-[520px] pointer-events-none flex items-center justify-end select-none">
            <div className="relative w-full h-full">
              <Image
                src={IMAGES.commonHeroBanner}
                alt={`${title} banner`}
                fill
                priority
                sizes="(max-width: 768px) 50vw, 42vw"
                className="object-cover object-right"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CommonHero;
