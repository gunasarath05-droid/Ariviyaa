import React from "react";
import Link from "next/link";

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Returns", href: "/refund-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

// Switcher shown at the top of every legal / policy page
export function PolicyTabs({ active }: { active: string }) {
  return (
    <div className="pt-4 border-t border-[#D9DFF0] flex flex-wrap gap-2">
      {POLICY_LINKS.map((link) =>
        link.href === active ? (
          <span
            key={link.href}
            aria-current="page"
            className="px-4 py-2 rounded-xl bg-[#5160a3] text-white text-xs sm:text-sm font-bold shadow-xs"
          >
            {link.label}
          </span>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 rounded-xl bg-white border border-[#D9DFF0] hover:border-[#5160a3] text-slate-700 hover:text-[#5160a3] text-xs sm:text-sm font-bold transition-colors"
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}
