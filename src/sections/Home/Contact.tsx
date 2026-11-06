"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { EnquiryForm } from "@/components/EnquiryForm";

const channels = [
  { label: "Call us", value: COMPANY_INFO.displayPhone, href: `tel:${COMPANY_INFO.phone}`, Icon: Phone },
  { label: "Email", value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}`, Icon: Mail },
  {
    label: "WhatsApp",
    value: "Chat with our team",
    href: `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`,
    Icon: MessageCircle,
    external: true,
  },
  { label: "Open every day", value: COMPANY_INFO.supportHours, Icon: Clock },
];

const nextSteps = [
  "Our team reviews your enquiry the same day.",
  "We call or email you within one working day.",
  "You get pricing, documents and a trial or dealer proposal.",
];

export function ContactSection() {
  return (
    <section id="contact-section" className="w-full section-y bg-white border-b border-[#D9DFF0] scroll-mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: intro, ways to reach us, what happens next */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="eyebrow">
                <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
                <span>Contact Us</span>
              </div>
              <h2 className="h-section text-slate-900">
                Bulk Orders, Distribution <span className="text-[#5160a3]">&amp; Partnerships</span>
              </h2>
              <p className="t-lead text-slate-600 max-w-xl">
                Dairy cooperative, farm, veterinary clinic, distributor or investor? Tell us what you need and our team
                will share MammaryO pricing, technical documents and next steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channels.map(({ label, value, href, Icon, external }) => {
                const body = (
                  <>
                    <span className="w-10 h-10 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
                      <span className="block text-sm font-bold text-slate-900 truncate">{value}</span>
                    </span>
                  </>
                );
                const cardClass =
                  "flex items-center gap-3 p-4 rounded-2xl bg-[#F5F7FC] border border-[#D9DFF0] transition-colors";
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className={`${cardClass} hover:border-[#5160a3]`}
                  >
                    {body}
                  </a>
                ) : (
                  <div key={label} className={cardClass}>
                    {body}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3">
              <h3 className="h-card text-slate-900">What happens next</h3>
              <ol className="space-y-2.5">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 t-body text-slate-600">
                    <span className="w-6 h-6 rounded-full bg-[#5160a3] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: enquiry form (goes to the admin panel, not WhatsApp) */}
          <EnquiryForm source="Website – Home page" />
        </div>
      </div>
    </section>
  );
}
