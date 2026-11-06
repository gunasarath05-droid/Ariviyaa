"use client";

import React from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/constants";
import { IMAGES } from "@/constants/images";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Leaf,
  ChevronRight,
} from "lucide-react";
import {
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

const CUSTOMER_CARE_LINKS = [
  { label: "My Account", href: "/account" },
  { label: "Track Order", href: "/account/orders" },
  { label: "Returns", href: "/return-order" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Store Locations", href: "/store-locations" },
];

export function Footer() {
  return (
    <footer className="bg-[#F5F7FC] text-slate-700 font-sans border-t border-[#D9DFF0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <Link href="/" className="inline-block group">
              <img
                src={IMAGES.logoPng}
                alt="Ariviyaa Animal Health Logo"
                width={160}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-sm">
              Ariviyaa Deep Tech Pvt. Ltd. — A deep-tech veterinary biotechnology startup founded in Thanjavur, supported by StartupTN TANSEED 3.0, developing patented chemical-free bio-polymer healthcare essentials.
            </p>

            <div className="pt-2 text-xs font-bold text-[#5160a3] uppercase tracking-wider">
              Govt. of Tamil Nadu • StartupTN Grantee
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5160a3] border-l-2 border-[#5160a3] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#5160a3] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#5160a3]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5160a3] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#5160a3]" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#5160a3] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#5160a3]" />
                  <span>Shop Catalog</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#5160a3] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#5160a3]" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#5160a3] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#5160a3]" />
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#5160a3] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#5160a3]" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer care & policies */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5160a3] border-l-2 border-[#5160a3] pl-2.5">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              {CUSTOMER_CARE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#5160a3] transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#5160a3]" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info (3.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5160a3] border-l-2 border-[#5160a3] pl-2.5">
              Contact Desk
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium pt-1">
              {/* Address */}
              <div className="flex items-start gap-2.5">  
                <MapPin className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city},{" "}
                  {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5160a3] shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-[#5160a3] transition-colors font-bold"
                >
                  {COMPANY_INFO.displayPhone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5160a3] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-[#5160a3] transition-colors font-bold"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              {/* Support hours */}
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#5160a3] shrink-0" />
                <span>Support: {COMPANY_INFO.supportHours}</span>
              </div>

              <p className="text-xs text-slate-500">GSTIN: {COMPANY_INFO.gstin}</p>
            </div>
          </div>

          {/* Col 4: Connect & Socials */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5160a3] border-l-2 border-[#5160a3] pl-2.5">
              Connect With Us
            </h4>

            {/* Social Media Horizontal Buttons */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#D9DFF0] text-slate-600 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>

              <a
                href={COMPANY_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#D9DFF0] text-slate-600 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                title="YouTube"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>

              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#D9DFF0] text-slate-600 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                title="Instagram"
                aria-label="Instagram"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>

              <a
                href={COMPANY_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#D9DFF0] text-slate-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                title="Facebook"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                title="Direct WhatsApp"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>


          </div>

        </div>
      </div>

      {/* BOTTOM BAR: Copyright & Legal */}
      <div className="border-t border-[#D9DFF0] bg-[#F5F7FC] py-5 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 font-medium relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Ariviyaa Animal Health. All rights reserved.
          </p>

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
