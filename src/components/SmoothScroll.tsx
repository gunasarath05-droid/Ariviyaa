"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Smooth (eased) page scrolling for mouse wheel and trackpad, plus "start at the top" on every
 * page change. Skipped for visitors who ask for reduced motion and on the admin panel.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      // In-page "#section" links glide to their target, clearing the sticky header
      anchors: { offset: -150 },
      // Drawers, modals and long lists keep their own scrolling
      allowNestedScroll: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAdmin]);

  // A new page always opens at the top, without animating up from the old position
  useEffect(() => {
    if (window.location.hash) return;
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
