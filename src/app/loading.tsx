import React from "react";
import { AriviyaIcon } from "@/components/AriviyaIcon";

// Route-level loading state: brand mark with a pulse, then a light page skeleton
export default function Loading() {
  return (
    <div className="w-full bg-[#F5F7FC] font-sans" role="status" aria-live="polite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <span className="absolute inset-0 rounded-2xl bg-[#5160a3]/15 animate-ping" />
            <span className="relative w-16 h-16 rounded-2xl bg-white border border-[#D9DFF0] shadow-2xs flex items-center justify-center">
              <AriviyaIcon className="w-8 h-8 text-[#5160a3]" />
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500">Loading…</p>
        </div>

        {/* Skeleton hints at the page shape while content streams in */}
        <div className="space-y-4 animate-pulse" aria-hidden="true">
          <div className="h-8 w-2/3 sm:w-1/3 rounded-lg bg-[#D9DFF0]/70" />
          <div className="h-4 w-full sm:w-1/2 rounded bg-[#D9DFF0]/50" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[20px] border border-[#D9DFF0] p-3 space-y-3">
                <div className="aspect-square rounded-2xl bg-[#F5F7FC]" />
                <div className="h-3 w-3/4 rounded bg-[#D9DFF0]/70" />
                <div className="h-3 w-1/2 rounded bg-[#D9DFF0]/50" />
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Loading page content</span>
      </div>
    </div>
  );
}
