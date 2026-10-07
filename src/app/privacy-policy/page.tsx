import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ShieldCheck, FileText, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

export const metadata: Metadata = {
  title: "Privacy Policy | Ariviya Animal Health Care",
  description:
    "Learn how Ariviya protects your personal information, inquiry records, and communications in accordance with applicable data privacy laws.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5160a3] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs text-slate-400 font-medium">Last Updated: October 2026</span>
        </div>

        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-[#5160a3]">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal &amp; Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif sm:font-sans">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            At <strong>Ariviya</strong> (Ariviya Bio-Innovations Hub), we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, handle, and safeguard your details when you browse our catalog, submit product inquiries, or communicate with our technical desk.
          </p>

          {/* Policy Switcher Tabs */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            <Link
              href="/privacy-policy"
              className="px-4 py-2 rounded-xl bg-[#5160a3] text-white text-xs font-bold shadow-xs"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/disclaimer"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              1. Information We Collect
            </h2>
            <p>
              When you interact with our website or contact our team via WhatsApp, phone, or email, we may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-sm">
              <li><strong>Contact Details:</strong> Your name, phone number, email address, and farm/clinic location.</li>
              <li><strong>Inquiry Specifics:</strong> Products of interest (e.g., MammaryO teat dip, Pet wound sprays, disinfectants), estimated livestock count, or specialized dosage requirements.</li>
              <li><strong>Technical Data:</strong> Standard browser session info, device type, and anonymous analytics to improve website usability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              2. How We Use Your Information
            </h2>
            <p>We strictly utilize the information collected for the following legitimate purposes:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-sm">
              <li>Providing customized product quotations, technical brochures, and application guidelines.</li>
              <li>Coordinating batch dispatch, logistics tracking, and delivery confirmation.</li>
              <li>Addressing veterinary practitioner questions and dairy farmer feedback.</li>
              <li>Complying with statutory regulations and scientific reporting mandates.</li>
            </ul>
            <p className="text-sm text-slate-600">
              <strong>We never sell, rent, or trade your personal or farm data to any third-party advertisers or marketing agencies.</strong>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              3. Communication via WhatsApp &amp; Direct Phone
            </h2>
            <p>
              Our primary inquiry desk operates through WhatsApp and direct phone consultation. By clicking &quot;Proceed to WhatsApp Checkout&quot; or &quot;Inquire Now&quot;, you initiate a direct encrypted chat with our representatives. You may choose to stop receiving updates at any time by simply informing us in the chat.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              4. Data Security
            </h2>
            <p>
              We implement industry-standard technical and organizational security measures to protect your inquiries and contact details from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
              5. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have any questions or requests regarding your personal data or this policy, please reach out directly:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-sm">
              <p className="font-bold text-slate-900">Ariviya Bio-Innovations Hub</p>
              <p className="text-slate-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#5160a3]" />
                <span>{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} - {COMPANY_INFO.address.pincode}</span>
              </p>
              <p className="text-slate-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5160a3]" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#5160a3] hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </p>
              <p className="text-slate-600 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5160a3]" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#5160a3] hover:underline">
                  {COMPANY_INFO.displayPhone}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
