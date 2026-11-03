"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, RotateCcw, Heart, LogOut, BadgeCheck } from "lucide-react";
import { DEMO_CUSTOMER } from "@/constants/demo";

const ACCOUNT_LINKS = [
  { label: "Dashboard", href: "/account", Icon: LayoutDashboard },
  { label: "Order History", href: "/account/orders", Icon: Package },
  { label: "Returns", href: "/return-order", Icon: RotateCcw },
  { label: "Wishlist", href: "/wishlist", Icon: Heart },
];

// Sidebar + content frame shared by the signed-in customer pages
export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initials = DEMO_CUSTOMER.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="w-full bg-[#F5F7FC] py-10 sm:py-14 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs p-5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#5160a3] text-white flex items-center justify-center font-black shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{DEMO_CUSTOMER.name}</p>
              <p className="text-xs text-slate-500 truncate">{DEMO_CUSTOMER.businessName}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#5160a3]">
                <BadgeCheck className="w-3.5 h-3.5" />
                {DEMO_CUSTOMER.accountType} account
              </span>
            </div>
          </div>

          <nav
            aria-label="Account"
            className="bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs p-2 flex lg:flex-col gap-1 overflow-x-auto no-scrollbar"
          >
            {ACCOUNT_LINKS.map(({ label, href, Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                    active ? "bg-[#5160a3] text-white" : "text-slate-700 hover:bg-[#F5F7FC] hover:text-[#5160a3]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </Link>
              );
            })}
            <Link
              href="/login"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap text-slate-500 hover:bg-[#F5F7FC] hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign out
            </Link>
          </nav>
        </aside>

        <div className="lg:col-span-9 min-w-0 space-y-6">{children}</div>
      </div>
    </div>
  );
}
