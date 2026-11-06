"use client";

import { usePathname } from "next/navigation";
import { ScrollAnimations } from "@/components/ScrollAnimations";

/**
 * Wraps every storefront page (re-mounted on each navigation) so pages fade in and the
 * scroll-driven motion in globals.css (.page-motion …) applies. The admin panel stays static.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <div className="page-motion animate-page-in">
      {children}
      <ScrollAnimations />
    </div>
  );
}
