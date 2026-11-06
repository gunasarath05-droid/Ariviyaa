import React from "react";
import { ShieldAlert } from "lucide-react";
import { ORDER_STATUS_LABEL, ORDER_STATUS_STYLE, type OrderStatus } from "@/constants/demo";

// Shared building blocks for the admin panel pages

export const panelClass = "bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs";

export const adminButtonClass =
  "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export const adminSecondaryButtonClass =
  "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D9DFF0] bg-white text-xs sm:text-sm font-bold text-slate-700 hover:border-[#5160a3] hover:text-[#5160a3] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export const adminInputClass =
  "w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5160a3] focus:ring-2 focus:ring-[#5160a3]/15";

export const adminLabelClass = "block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5";

export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PanelHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
      <h2 className="text-sm sm:text-base font-bold text-slate-900">{title}</h2>
      {action}
    </div>
  );
}

export function OrderStatusPill({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-[11px] font-bold whitespace-nowrap ${ORDER_STATUS_STYLE[status]}`}>
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

const TONES = {
  brand: "bg-[#EFF3FC] text-[#5160a3] border-[#D9DFF0]",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-600 border-rose-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
} as const;

export type PillTone = keyof typeof TONES;

export function Pill({ tone = "brand", children }: { tone?: PillTone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-[11px] font-bold whitespace-nowrap ${TONES[tone]}`}>
      {children}
    </span>
  );
}

export function AccessDenied({ section }: { section: string }) {
  return (
    <div className={`${panelClass} py-20 px-6 text-center space-y-3`}>
      <span className="mx-auto w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
        <ShieldAlert className="w-6 h-6" />
      </span>
      <p className="text-lg font-bold text-slate-900">No access to {section}</p>
      <p className="text-sm text-slate-500 max-w-md mx-auto">
        Your admin role can&apos;t open this section. Ask the store owner to change your role in Settings.
      </p>
    </div>
  );
}
