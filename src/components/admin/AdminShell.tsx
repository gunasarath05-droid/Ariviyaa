"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Building2,
  RotateCcw,
  Truck,
  CreditCard,
  Settings,
  ExternalLink,
  Menu,
  X,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { IMAGES } from "@/constants/images";
import { ADMIN_IDLE_TIMEOUT_MINUTES, type AdminSection } from "@/constants/adminData";
import { useAdmin } from "@/context/AdminContext";
import { AccessDenied } from "./ui";

const NAV: { id: AdminSection; label: string; href: string; hint?: string; Icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { id: "orders", label: "Orders", href: "/admin/orders", Icon: ShoppingCart },
  { id: "returns", label: "Returns", href: "/admin/returns", Icon: RotateCcw },
  { id: "products", label: "Products & Stock", href: "/admin/products", Icon: Package },
  { id: "customers", label: "Customers", href: "/admin/customers", Icon: Users },
  { id: "enquiries", label: "B2B Enquiries", href: "/admin/enquiries", Icon: Building2 },
  { id: "shipping", label: "Shipping", href: "/admin/shipping", hint: "Shiprocket · ST Courier", Icon: Truck },
  { id: "payments", label: "Payments", href: "/admin/payments", hint: "Razorpay", Icon: CreditCard },
  { id: "settings", label: "Settings", href: "/admin/settings", Icon: Settings },
];

const sectionFor = (pathname: string) =>
  [...NAV].reverse().find((n) => (n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href))) ?? NAV[0];

// Frame for every signed-in admin page: sign-in guard, role-filtered menu, top bar
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, admin, canAccess, signOut } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (ready && !admin) router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, admin, pathname, router]);

  if (!ready || !admin) {
    return (
      <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-[#5160a3]" />
          Checking your admin session…
        </span>
      </div>
    );
  }

  const current = sectionFor(pathname);
  const initials = admin.name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSignOut = () => {
    signOut();
    router.replace("/admin/login");
  };

  const navList = (
    <nav aria-label="Admin" className="space-y-1">
      {NAV.filter((item) => canAccess(item.id)).map((item) => {
        const isActive = item.id === current.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={isActive ? "page" : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isActive ? "bg-[#5160a3] text-white" : "text-slate-600 hover:bg-[#F5F7FC] hover:text-[#5160a3]"
            }`}
          >
            <item.Icon className="w-4.5 h-4.5 shrink-0" />
            <span className="flex-1 min-w-0">
              <span className="block truncate">{item.label}</span>
              {item.hint && (
                <span className={`block text-[10px] font-medium ${isActive ? "text-white/75" : "text-slate-400"}`}>
                  {item.hint}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  const signOutButton = (
    <button
      type="button"
      onClick={handleSignOut}
      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-[#F5F7FC] hover:text-rose-600 transition-colors cursor-pointer"
    >
      <LogOut className="w-4.5 h-4.5 shrink-0" />
      Sign out
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FC] font-sans flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-[#D9DFF0] sticky top-0 h-screen">
        <div className="h-16 px-5 flex items-center border-b border-slate-100">
          <Image src={IMAGES.logo} alt="Ariviyaa" width={120} height={36} style={{ width: "auto", height: "auto" }} className="h-8 w-auto" />
          <span className="ml-2 px-2 py-0.5 rounded-md bg-[#EFF3FC] text-[#5160a3] text-[10px] font-bold">Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">{navList}</div>
        <div className="p-3 border-t border-slate-100 space-y-2">
          <p className="px-3.5 text-[11px] text-slate-400 leading-snug">
            Auto sign-out after {ADMIN_IDLE_TIMEOUT_MINUTES} min of inactivity
          </p>
          {signOutButton}
        </div>
      </aside>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] bg-white p-3 overflow-y-auto flex flex-col">
            <div className="h-12 px-2 mb-2 flex items-center justify-between">
              <Image src={IMAGES.logo} alt="Ariviyaa" width={110} height={32} style={{ width: "auto", height: "auto" }} className="h-7 w-auto" />
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="p-2 text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1">{navList}</div>
            <div className="pt-3 border-t border-slate-100">{signOutButton}</div>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-16 sticky top-0 z-30 bg-white border-b border-[#D9DFF0] px-4 sm:px-6 flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-700 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <p className="text-sm font-bold text-slate-900 truncate">{current.label}</p>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#5160a3] hover:underline"
            >
              View site
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#5160a3] text-white text-xs font-black flex items-center justify-center">
                {initials}
              </span>
              <span className="hidden md:block leading-tight">
                <span className="block text-sm font-bold text-slate-900">{admin.name}</span>
                <span className="block text-[11px] text-slate-500">
                  {admin.role} · {admin.email}
                </span>
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {canAccess(current.id) ? children : <AccessDenied section={current.label} />}
        </div>
      </div>
    </div>
  );
}
