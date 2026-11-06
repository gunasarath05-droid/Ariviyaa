import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, type LucideIcon } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";
import { CommonHero } from "@/components/CommonHero";
import { PolicyTabs } from "@/components/PolicyTabs";

interface PolicyContact {
  /** Section heading, e.g. "5. Contact Us Regarding Privacy" */
  title: string;
  /** Optional line above the contact card */
  intro?: React.ReactNode;
  /** Desk name shown in the card */
  name: string;
}

interface PolicyPageProps {
  title: string;
  subtitle: string;
  badge: string;
  BadgeIcon: LucideIcon;
  intro: React.ReactNode;
  href: string;
  lastUpdated?: string;
  contact?: PolicyContact;
  children: React.ReactNode;
}

const DEFAULT_CONTACT: PolicyContact = { title: "Contact Us", name: "Ariviyaa Bio-Innovations Hub" };

// Frame shared by every legal / policy page so all five look the same
export function PolicyPage({
  title,
  subtitle,
  badge,
  BadgeIcon,
  intro,
  href,
  lastUpdated = "November 2026",
  contact = DEFAULT_CONTACT,
  children,
}: PolicyPageProps) {
  return (
    <>
      <CommonHero title={title} breadcrumb={[{ label: "Home", href: "/" }, { label: title }]} subtitle={subtitle} />
      <section className="w-full bg-white section-y font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#5160a3] hover:underline">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-xs text-slate-500 font-medium">Last Updated: {lastUpdated}</span>
          </div>

          {/* Intro + switcher (the page title is already in the hero above) */}
          <div className="bg-[#F5F7FC] rounded-3xl p-6 sm:p-8 border border-[#D9DFF0] space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D9DFF0] text-xs font-bold text-[#5160a3]">
              <BadgeIcon className="w-4 h-4" />
              <span>{badge}</span>
            </div>
            <div className="t-lead text-slate-600">{intro}</div>
            <PolicyTabs active={href} />
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D9DFF0] shadow-2xs space-y-8 t-lead text-slate-700">
            {children}

            <section className="space-y-3 pt-6 border-t border-[#D9DFF0]">
              <h2 className="h-card text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5160a3] shrink-0" />
                {contact.title}
              </h2>
              {contact.intro && <p>{contact.intro}</p>}
              <div className="bg-[#F5F7FC] rounded-2xl p-5 border border-[#D9DFF0] space-y-2.5 t-body">
                <p className="font-bold text-slate-900">{contact.name}</p>
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
      </section>
    </>
  );
}

export function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="h-card text-slate-900 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#5160a3] shrink-0" />
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Bulleted list style used inside policy sections */
export const policyListClass = "list-disc list-inside space-y-1.5 pl-2 t-body text-slate-600";
