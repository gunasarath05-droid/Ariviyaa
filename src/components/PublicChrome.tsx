"use client";

import { usePathname } from "next/navigation";

// Hides the storefront header, footer and floating widgets on the admin panel
export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
