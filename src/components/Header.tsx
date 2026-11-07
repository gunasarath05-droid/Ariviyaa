"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useAccount } from "@/context/AccountContext";
import { IMAGES } from "@/constants/images";
import { COMPANY_INFO } from "@/constants/company";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  Phone,
  Mail,
  Menu,
  BookOpen,
  Image as ImageIcon,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const {
    openDrawerWithTab,
    wishlist,
    cartCount,
    setIsSearchOpen,
    setSearchQuery,
  } = useApp();
  const { user: sessionUser } = useAccount();

  // The header hydrates inside a Suspense boundary, after the saved cart/wishlist may
  // already be restored — render badge counts only once hydrated to match server HTML.
  const [isHydrated, setIsHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsHydrated(true), []);
  // Same for the signed-in name: the server always renders "Sign in"
  const user = isHydrated ? sessionUser : null;

  const [localSearch, setLocalSearch] = useState("");
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);

  // Close media dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mediaRef.current &&
        !mediaRef.current.contains(event.target as Node)
      ) {
        setIsMediaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on pathname change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMediaOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      setIsSearchOpen(true);
    }
  };

  interface NavLinkItem {
    name: string;
    href?: string;
    children?: { name: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
  }

  const navLinks: NavLinkItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    {
      name: "Media",
      children: [
        { name: "Blog", href: "/blog" },
        { name: "Gallery", href: "/gallery" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="site-header sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP BAR (White background: Logo, Search, User/Wishlist/Cart) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center shrink-0 py-1 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.logoPng}
              alt="Ariviyaa Animal Health Logo"
              width={160}
              height={48}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </Link>

          {/* RECTANGULAR SEARCH BAR (Centered with Search Icon on Right) */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onFocus={() => {
                  if (localSearch.trim()) setIsSearchOpen(true);
                }}
                placeholder="Search By Products..."
                className="w-full pl-4 sm:pl-5 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-lg focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]/30 text-slate-800 placeholder-slate-400 transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-[#5160a3] transition-colors cursor-pointer p-1"
                title="Search"
              >
                <Search className="w-4 sm:w-5 h-4 sm:h-5" strokeWidth={1.8} />
              </button>
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch("")}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>

          {/* RIGHT ICONS (Account, Wishlist, Cart with labels underneath) */}
          <div className="flex items-center gap-4 sm:gap-8 shrink-0">
            {/* Account Button */}
            <Link
              href={user ? "/account" : "/login"}
              className="flex flex-col items-center justify-center text-slate-800 hover:text-[#5160a3] transition-colors cursor-pointer group"
              title={user ? "My Account" : "Sign in"}
            >
              <User
                className="w-5 h-5 text-slate-800 group-hover:text-[#5160a3] transition-colors"
                strokeWidth={1.75}
              />
              <span className="text-xs font-medium text-slate-800 group-hover:text-[#5160a3] transition-colors mt-1 leading-none max-w-16 truncate">
                {user ? `Hi, ${user.name.split(" ")[0]}` : "Sign in"}
              </span>
            </Link>

            {/* Wishlist Button */}
            <button
              onClick={() => openDrawerWithTab("wishlist")}
              className="relative flex flex-col items-center justify-center text-slate-800 hover:text-[#5160a3] transition-colors cursor-pointer group"
              title="Saved Wishlist"
            >
              <div className="relative">
                <Heart
                  className="w-5 h-5 text-slate-800 group-hover:text-[#5160a3] transition-colors"
                  strokeWidth={1.75}
                />
                {isHydrated && wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#5160a3] text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-800 group-hover:text-[#5160a3] transition-colors mt-1 leading-none">
                Wishlist
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => openDrawerWithTab("cart")}
              className="relative flex flex-col items-center justify-center text-slate-800 hover:text-[#5160a3] transition-colors cursor-pointer group"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag
                  className="w-5 h-5 text-slate-800 group-hover:text-[#5160a3] transition-colors"
                  strokeWidth={1.75}
                />
                {isHydrated && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#5160a3] text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-slate-800 group-hover:text-[#5160a3] transition-colors mt-1 leading-none">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#5160a3] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (visible on small screens) */}
        {/* <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search By Products..."
              className="w-full pl-4 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div> */}
      </div>

      <nav className="bg-[#2B2D42] text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Link bar is desktop/tablet only; phones use the menu button above */}
          <div className="hidden md:flex items-center justify-between h-16">

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                if (link.children) {
                  const isAnyChildActive = link.children.some((child) => isActive(child.href));
                  return (
                    <div
                      key={link.name}
                      ref={mediaRef}
                      className="relative"
                      onMouseEnter={() => setIsMediaOpen(true)}
                      onMouseLeave={() => setIsMediaOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setIsMediaOpen(!isMediaOpen)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm lg:text-[15px] font-semibold transition-all duration-200 cursor-pointer ${isAnyChildActive
                            ? "bg-white/15 text-white font-bold shadow-xs border border-white/20"
                            : "text-slate-200 hover:text-white hover:bg-white/10"
                          }`}
                        aria-expanded={isMediaOpen}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isMediaOpen ? "rotate-180 text-white" : "text-slate-400"
                            }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isMediaOpen && (
                        <div className="absolute top-full left-0 w-60 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="bg-[#1F2233]/95 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-1.5 space-y-1">
                            {link.children.map((child) => {
                              const ChildIcon = child.icon;
                              const isChildActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${isChildActive
                                      ? "bg-[#5160A3] text-white font-bold shadow-xs"
                                      : "text-slate-200 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                  {ChildIcon && (
                                    <div
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isChildActive
                                          ? "bg-white/20 text-white"
                                          : "bg-white/5 text-slate-300 group-hover:bg-white/15 group-hover:text-white"
                                        }`}
                                    >
                                      <ChildIcon className="w-4 h-4" />
                                    </div>
                                  )}
                                  <div className="flex flex-col">
                                    <span className="font-semibold leading-tight">{child.name}</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const isCurrentActive =
                  link.href === "/" ? pathname === "/" : isActive(link.href || "");

                return (
                  <Link
                    key={link.name}
                    href={link.href || "/"}
                    className={`group relative px-3.5 text-sm lg:text-[15px] font-semibold
    transition-all duration-300 ease-out
    ${isCurrentActive
                        ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                        : "text-slate-200 hover:text-white"
                      }

    after:absolute after:left-1/2 after:-bottom-0.5
    after:h-[2px] after:-translate-x-1/2
    after:rounded-full after:bg-white
    after:transition-all after:duration-300 after:ease-out

    ${isCurrentActive
                        ? "after:w-[calc(100%-1.75rem)]"
                        : "after:w-0 group-hover:after:w-[calc(100%-1.75rem)]"
                      }
  `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Contact Hotline & Email */}
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4 text-xs lg:text-sm">
              {/* Phone Hotline */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 text-white transition-all group"
                title="Call Customer & Investor Desk"
              >
                <Phone className="w-4 h-4" />
                <span className="font-bold text-white">{COMPANY_INFO.displayPhone}</span>
              </a>

              <span className="text-slate-600 hidden lg:inline">|</span>

              {/* Email Desk */}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-white transition-all group"
                title="Email Desk"
              >
                <Mail className="w-5 h-5" />
                <span className="font-bold text-white">{COMPANY_INFO.email}</span>
              </a>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE NAVIGATION COLLAPSIBLE DRAWER                                      */}
        {/* ========================================================================= */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1F2233] border-t border-slate-700/80 px-4 py-3 space-y-1.5 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div key={link.name} className="pt-1 pb-1 space-y-1">
                    <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {link.name}
                    </span>
                    <div className="pl-2 border-l border-slate-700 space-y-1">
                      {link.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${isChildActive
                                ? "bg-[#5160A3] text-white"
                                : "text-slate-300 hover:bg-white/10"
                              }`}
                          >
                            {ChildIcon && <ChildIcon className="w-4 h-4 text-slate-400" />}
                            <span>{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isCurrentActive =
                link.href === "/" ? pathname === "/" : isActive(link.href || "");

              return (
                <Link
                  key={link.name}
                  href={link.href || "/"}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${isCurrentActive
                      ? "bg-[#5160A3] text-white"
                      : "text-slate-200 hover:bg-white/10"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Contact Quick Actions */}
            {/* <div className="pt-3 border-t border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-500/15 text-emerald-300 font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-500/15 text-blue-300 font-bold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Desk</span>
              </a>
            </div> */}
          </div>
        )}
      </nav>

    </header>
  );
}
