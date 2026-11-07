"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/constants";
import { IMAGES } from "@/constants/images";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import {
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import { subscribeToNewsletter } from "@/lib/newsletterSubscribers";

const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(
  `${COMPANY_INFO.address.line1}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.pincode}`
)}`;

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: COMPANY_INFO.socials.linkedin || "https://linkedin.com/company/ariviya",
    Icon: FaLinkedinIn,
  },
  {
    name: "YouTube",
    href: COMPANY_INFO.socials.youtube || "https://youtube.com",
    Icon: FaYoutube,
  },
  {
    name: "Instagram",
    href: COMPANY_INFO.socials.instagram || "https://instagram.com/ariviya_deeptech/",
    Icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: COMPANY_INFO.socials.facebook || "https://facebook.com/AriviyaDeepTechTNJ",
    Icon: FaFacebookF,
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`,
    Icon: FaWhatsapp,
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await subscribeToNewsletter(email, "Petmart-Style Footer");
      if (res.success) {
        setStatus("success");
        setMessage(res.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.message);
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-[#1C2033] text-slate-300 font-sans border-t border-white/5 relative overflow-hidden">
      {/* Decorative brand ambient glows using our site's signature #5160a3 indigo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#5160a3]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5160a3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* TOP ROW: Brand Intro (Left) & Newsletter Subscription (Right) */}
        {/* ========================================================================= */}
        <div className="pt-12 sm:pt-16 pb-10 sm:pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Brand Logo & Tagline */}
          <div className="lg:col-span-6 space-y-3">
            <Link href="/" className="inline-block group">
              <img
                src={IMAGES.logoPng1}
                alt="Ariviyaa Animal Health Logo"
                width={160}
                height={48}
                className="h-10 sm:h-14 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              Your trusted destination for patented, chemical-free bio-polymer veterinary healthcare,
              dairy mastitis prevention, and safe pet essentials.
            </p>

            <div className="pt-1 text-[11px] font-bold text-[#7E8ED4] uppercase tracking-wider">
              Govt. of Tamil Nadu • StartupTN Grantee • TANUVAS Validated
            </div>
          </div>

          {/* Right: Subscribe to our newsletter */}
          <div className="lg:col-span-6 lg:max-w-md lg:ml-auto w-full">
            <h4 className="text-white font-semibold text-sm sm:text-base mb-3">
              Subscribe to our newsletter:
            </h4>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex items-center bg-[#282D45] border border-white/10 rounded-xl sm:rounded-2xl p-1.5 focus-within:border-[#5160a3] focus-within:ring-1 focus-within:ring-[#5160a3] transition-all shadow-inner">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Enter your e-mail"
                  required
                  disabled={status === "loading"}
                  className="bg-transparent border-0 text-white placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 focus:outline-none flex-1 min-w-0"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#5160a3] hover:bg-[#434f8a] active:scale-98 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-lg sm:rounded-xl transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </div>

              {/* Status Message */}
              {message && (
                <div
                  className={`flex items-center gap-1.5 text-xs mt-2 font-medium ${status === "success" ? "text-emerald-400" : "text-rose-400"
                    }`}
                >
                  {status === "success" && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MIDDLE SECTION: 4 COLUMNS */}
        {/* ========================================================================= */}
        <div className="py-10 sm:py-12 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 lg:gap-10">
          {/* Col 1: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base tracking-wide border-l-2 border-[#5160a3] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li>
                <Link href="/" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/shop#categories" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Product Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base tracking-wide border-l-2 border-[#5160a3] pl-2.5">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li>
                <Link href="/shop" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Dairy &amp; Cattle Care
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Pet Care Essentials
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Poultry Hygiene Range
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Wound &amp; Skin Care Spray
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Disinfectant &amp; Floor Cleaners
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base tracking-wide border-l-2 border-[#5160a3] pl-2.5">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li>
                <Link href="/refund-policy" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Terms And Conditions
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white hover:text-[#7E8ED4] transition-colors block">
                  Shipping Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base tracking-wide border-l-2 border-[#5160a3] pl-2.5">
              Contact Information
            </h4>

            <div className="space-y-4 pt-1">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full border border-[#5160a3]/40 bg-[#5160a3]/15 flex items-center justify-center text-[#7E8ED4] shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Phone Number</p>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-slate-300 hover:text-white text-xs sm:text-sm transition-colors mt-0.5 block font-medium"
                  >
                    {COMPANY_INFO.displayPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full border border-[#5160a3]/40 bg-[#5160a3]/15 flex items-center justify-center text-[#7E8ED4] shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Email Address</p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-slate-300 hover:text-white text-xs sm:text-sm transition-colors mt-0.5 block break-all font-medium"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Office Location */}
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full border border-[#5160a3]/40 bg-[#5160a3]/15 flex items-center justify-center text-[#7E8ED4] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold">Office Address</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white text-xs sm:text-sm transition-colors mt-0.5 block leading-relaxed font-medium"
                  >
                    {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city},{" "}
                    {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM BAR: Copyright, EC4You, Social Links & Payment Badges */}
        {/* ========================================================================= */}
        <div className="py-6 border-t border-white/10 flex flex-col xl:flex-row items-center justify-between gap-3 text-center xl:text-left">
          {/* Left: Copyright & Developed by EC4You */}
          <div className="text-xs text-slate-400">
            <p>Copyright &copy; {new Date().getFullYear()} Ariviyaa. All Rights Reserved.</p>

          </div>
          <div className="text-xs text-slate-400">
            <p>
              Designed &amp; Developed by{" "}
              <a
                href="https://www.ec4you.in/"
                target="_blank"
                rel="noreferrer"
                className="text-white font-bold hover:text-[#7E8ED4] underline-offset-2 hover:underline transition-colors"
              >
                EC4You
              </a>
            </p>
          </div>

          {/* Center: Social Media Links */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                title={s.name}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-[#5160a3] hover:border-[#5160a3] hover:text-white flex items-center justify-center transition-all shadow-xs hover:scale-105 cursor-pointer"
              >
                <s.Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
