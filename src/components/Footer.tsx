"use client";

import React from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/constants";
import {
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Leaf,
} from "lucide-react";
import {
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#F8F5F0] text-slate-700 font-sans border-t border-[#EAE3D6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-2">
            <a href="#hero" className="inline-block group">
              <img
                src="/assets/logo/ariviya.png"
                alt="Ariviya Animal Health Logo"
                width={160}
                height={48}
                className="h-10 sm:h-12 md:h-16 w-auto object-contain"
              />
            </a>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-sm">
              Ariviya is a deep-tech animal healthcare pioneer engineering sustainable, chemical-free
              nanobio-polymer essentials for bovine mastitis prevention, companion pet recovery, and poultry biosecurity.
            </p>
          </div>


          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#5160a3] border-l-2 border-[#5160a3] pl-2.5">
              Contact Info
            </h4>

            {/* Direct Contact List - No Separate Boxes */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium pt-1">
              {/* Address */}
              <div className="flex items-start gap-3">  
                <MapPin className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city},{" "}
                  {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#5160a3] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-[#5160a3] transition-colors"
                >
                  {COMPANY_INFO.displayPhone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#5160a3] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-[#5160a3] transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* Column 3: Connect With Us & WhatsApp Desk (3 Cols) */}
          {/* ======================================================================= */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#5160a3] border-l-2 border-[#5160a3] pl-2.5">
              Connect With Us
            </h4>

            {/* Social Media Horizontal Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* LinkedIn */}
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD0] text-slate-600 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href={COMPANY_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD0] text-slate-600 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
                title="YouTube"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4.5 h-4.5" />
              </a>

              {/* Instagram */}
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD0] text-slate-600 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
                title="Instagram"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD0] text-slate-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
                title="Facebook"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
                title="Direct WhatsApp"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM BAR: Copyright & Attribution */}
      {/* ========================================================================= */}
      <div className="border-t border-[#EAE3D6] bg-[#F2EDE4] py-5 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 font-medium relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Copyright */}
          <p>
            &copy; {new Date().getFullYear()} Ariviya Animal Health. All rights reserved.
          </p>

          {/* Designed & Developed By */}
          <p className="text-slate-600">
            Designed &amp; Developed by{" "}
            <a
              href="https://www.ec4you.in/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-900 font-bold hover:text-[#5160a3] transition-colors"
            >
              EC4You
            </a>
          </p>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-5 text-slate-600 text-xs sm:text-sm">
            <Link href="/privacy-policy" className="hover:text-slate-900 hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-900 hover:underline transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-900 hover:underline transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
