import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, type LucideIcon } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";
import { CommonHero } from "@/components/CommonHero";
import { PolicyTabs } from "@/components/PolicyTabs";

interface PolicyPageProps {
  title: string;
  subtitle: string;
  badge: string;
  BadgeIcon: LucideIcon;
  intro: React.ReactNode;
  href: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

// Frame shared by the newer policy pages — same layout as Privacy Policy
export function PolicyPage({
  title,
  subtitle,
  badge,
  BadgeIcon,
  intro,
  href,
  lastUpdated = "November 2026",
  children,
}: PolicyPageProps) {
  return (
    <>
      <CommonHero title={title} breadcrumb={[{ label: "Home", href: "/" }, { label: title }]} subtitle={subtitle} />
      <div className="w-full bg-[#F5F7FC] min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5160a3] hover:underline">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-xs text-slate-400 font-medium">Last Updated: {lastUpdated}</span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-[#5160a3]">
              <BadgeIcon className="w-4 h-4" />
              <span>{badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{title}</h2>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{intro}</div>
            <PolicyTabs active={href} />
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
            {children}

            <section className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5160a3]" />
                Contact Us
              </h2>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2.5 text-sm">
                <p className="font-bold text-slate-900">Ariviya Bio-Innovations Hub</p>
                <p className="text-slate-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#5160a3] shrink-0" />
                  <span>
                    {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} -{" "}
                    {COMPANY_INFO.address.pincode}
                  </span>
                </p>
                <p className="text-slate-600 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#5160a3] shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#5160a3] hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </p>
                <p className="text-slate-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#5160a3] shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-[#5160a3] hover:underline">
                    {COMPANY_INFO.displayPhone}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#5160a3] shrink-0" />
        {title}
      </h2>
      {children}
    </section>
  );
}
