"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Card-like children of grids that fade in one after another inside a revealed section
const CARD_SELECTOR =
  ':scope .grid > [class*="rounded-2xl"], :scope .grid > [class*="rounded-3xl"], :scope .grid > [class*="rounded-[20px]"], :scope .grid > li, :scope .grid > article';

/**
 * Fades page sections (and the cards inside them) up into view as they are scrolled to.
 * Sections already on screen when a page opens are left alone, so nothing flickers on load.
 * Styles live in globals.css (.reveal / .reveal-child); reduced-motion visitors and the admin
 * panel get no animation.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    // Wait a frame so the new page has laid out before measuring
    const frame = requestAnimationFrame(() => {
      const sections = document.querySelectorAll<HTMLElement>("main > section, main > article");
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        section.classList.add("reveal");
        section.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((card, i) => {
          card.classList.add("reveal-child");
          card.style.setProperty("--reveal-delay", `${Math.min(i, 8) * 70}ms`);
        });
        observer.observe(section);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
