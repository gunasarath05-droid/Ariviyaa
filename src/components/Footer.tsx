"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants";
import {
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Leaf,
} from "lucide-react";

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
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href={COMPANY_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD0] text-slate-600 hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
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
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-[#E5DDD0] text-slate-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
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
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
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
          <div className="flex items-center justify-center gap-5 text-slate-600">
            <span className="hover:text-slate-900 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">
              Terms &amp; Conditions
            </span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">
              Disclaimer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
