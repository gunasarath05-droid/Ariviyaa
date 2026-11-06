"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, RotateCcw, Heart, UserRound, MapPin, LogOut, BadgeCheck } from "lucide-react";
import { useAccount } from "@/context/AccountContext";

const ACCOUNT_LINKS = [
  { label: "Dashboard", href: "/account", Icon: LayoutDashboard },
  { label: "Order History", href: "/account/orders", Icon: Package },
  { label: "Returns", href: "/account/returns", Icon: RotateCcw },
  { label: "Wishlist", href: "/account/wishlist", Icon: Heart },
  { label: "Account details", href: "/account/profile", Icon: UserRound },
  { label: "Addresses", href: "/account/addresses", Icon: MapPin },
];

// Sidebar + content frame shared by the signed-in customer pages; signed-out visitors go to /login
export function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, user, signOut } = useAccount();
  // Set while signing out so the guard below doesn't add ?next= to the login URL
  const signingOut = useRef(false);

  useEffect(() => {
    if (ready && !user && !signingOut.current) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, user, pathname, router]);

  if (!ready || !user) {
    return (
      <div className="w-full bg-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 animate-pulse">
          <div className="lg:col-span-3 h-48 rounded-2xl bg-white border border-[#D9DFF0]" />
          <div className="lg:col-span-9 h-96 rounded-2xl bg-white border border-[#D9DFF0]" />
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSignOut = () => {
    signingOut.current = true;
    signOut();
    router.push("/login");
  };

  return (
    <div className="w-full bg-white py-10 sm:py-14 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Sidebar stays in view (below the sticky site header) while the content scrolls */}
        <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-40 lg:self-start">
          <div className="bg-white rounded-2xl border border-[#D9DFF0] shadow-2xs p-5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#5160a3] text-white flex items-center justify-center font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.businessName ?? user.email}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#5160a3]">
                <BadgeCheck className="w-3.5 h-3.5" />
                {user.accountType} account
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
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap text-slate-500 hover:bg-[#F5F7FC] hover:text-rose-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign out
            </button>
          </nav>
        </aside>

        <div className="lg:col-span-9 min-w-0 space-y-6">{children}</div>
      </div>
    </div>
  );
}
