import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Cart", href: "/cart" },
  { label: "Details", href: "/checkout" },
  { label: "Payment", href: "/payment" },
  { label: "Confirmation", href: "/order-confirmation" },
];

// Progress bar across the purchase flow; earlier steps link back
export function CheckoutSteps({ current }: { current: 0 | 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold">
      {STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;
        const dot = (
          <span
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              done || active ? "bg-[#5160a3] text-white" : "bg-white border border-[#D9DFF0] text-slate-400"
            }`}
          >
            {done ? <Check className="w-3.5 h-3.5" /> : index + 1}
          </span>
        );
        return (
          <li key={step.label} className="flex items-center gap-2 sm:gap-3">
            {done && current < 3 ? (
              <Link href={step.href} className="flex items-center gap-2 text-slate-700 hover:text-[#5160a3]">
                {dot}
                <span className="hidden sm:inline">{step.label}</span>
              </Link>
            ) : (
              <span
                className={`flex items-center gap-2 ${active ? "text-slate-900" : "text-slate-400"}`}
                aria-current={active ? "step" : undefined}
              >
                {dot}
                <span className={active ? "inline" : "hidden sm:inline"}>{step.label}</span>
              </span>
            )}
            {index < STEPS.length - 1 && (
              <span className={`w-6 sm:w-12 h-0.5 rounded-full ${done ? "bg-[#5160a3]" : "bg-[#D9DFF0]"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
