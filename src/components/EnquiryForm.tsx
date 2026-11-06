"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Lock } from "lucide-react";
import type { AdminEnquiry } from "@/constants/adminData";
import { submitEnquiry } from "@/lib/enquiryInbox";
import { inputClass, labelClass } from "@/components/ui/form";

/** Visitor-facing choices and the admin category each one files under */
export const ENQUIRY_TYPES: { label: string; type: AdminEnquiry["type"] }[] = [
  { label: "Dairy Cooperative / Milk Union", type: "Dairy co-op" },
  { label: "Dairy Farm Owner", type: "Dairy farm" },
  { label: "Veterinary Doctor / Clinic", type: "Vet clinic" },
  { label: "Distributor / Stockist / Retailer", type: "Distributor" },
  { label: "Investor / VC / Strategic Partner", type: "Investor" },
  { label: "Pet Parent (Dog / Cat)", type: "Pet parent" },
  { label: "Other", type: "Other" },
];

const PRODUCTS = [
  "MammaryO teat dip",
  "Farm care (FarmEnviron, Farmspray, Tickifence)",
  "Pet care range",
  "Poultry – Neostar range",
  "Home care range",
  "Full range / not sure yet",
];

const EMPTY_FORM = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  enquiryType: "",
  product: "",
  location: "",
  message: "",
};

type Field = keyof typeof EMPTY_FORM;

function Required() {
  return <span className="text-rose-500"> *</span>;
}

interface EnquiryFormProps {
  /** Shown to the admin, e.g. "Website – Home page" */
  source: string;
  /** Pre-selected "I am a" label, e.g. from /contact?type=distributor */
  presetType?: string;
}

// Enquiry form card used on the home page and the Contact page; submissions go to the admin panel
export function EnquiryForm({ source, presetType = "" }: EnquiryFormProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, enquiryType: presetType });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ id: string; name: string } | null>(null);

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: field === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) next.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.phone.length !== 10) next.phone = "Enter a 10-digit mobile number";
    if (!form.enquiryType) next.enquiryType = "Choose one";
    if (!form.message.trim()) next.message = "Tell us what you need";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`eq-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setSending(true);
    // Short pause so the button state is visible; the backend call replaces this
    window.setTimeout(() => {
      const id = submitEnquiry({
        name: form.name.trim(),
        organisation: form.organisation.trim(),
        email: form.email.trim(),
        phone: `+91 ${form.phone}`,
        type: ENQUIRY_TYPES.find((t) => t.label === form.enquiryType)?.type ?? "Other",
        location: form.location.trim(),
        product: form.product || "Not specified",
        message: form.message.trim(),
        source,
      });
      setSent({ id, name: form.name.trim().split(" ")[0] });
      setForm({ ...EMPTY_FORM });
      setSending(false);
    }, 600);
  };

  const fieldError = (field: Field) =>
    errors[field] ? <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors[field]}</p> : null;

  if (sent) {
    return (
      <div className="h-full bg-white rounded-3xl border border-[#D9DFF0] p-8 sm:p-10 shadow-[0_20px_60px_-30px_rgba(43,45,66,0.35)] flex flex-col items-center justify-center text-center gap-4">
        <span className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </span>
        <h3 className="h-block text-slate-900">Thank you, {sent.name}</h3>
        <p className="t-lead text-slate-600 max-w-sm">
          Your enquiry <strong className="text-slate-900">{sent.id}</strong> has reached our team. We&apos;ll call or
          email you within one working day.
        </p>
        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-2 text-sm font-bold text-[#5160a3] hover:underline cursor-pointer"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-3xl border border-[#D9DFF0] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_-30px_rgba(43,45,66,0.35)]">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="eq-name" className={labelClass}>
              Full Name<Required />
            </label>
            <input id="eq-name" type="text" autoComplete="name" placeholder="e.g. Dr. Rajesh Kumar" value={form.name} onChange={update("name")} className={inputClass} />
            {fieldError("name")}
          </div>
          <div>
            <label htmlFor="eq-organisation" className={labelClass}>
              Organisation / Farm Name
            </label>
            <input id="eq-organisation" type="text" autoComplete="organization" placeholder="Optional" value={form.organisation} onChange={update("organisation")} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="eq-email" className={labelClass}>
              Email Address<Required />
            </label>
            <input id="eq-email" type="email" autoComplete="email" placeholder="e.g. rajesh@example.com" value={form.email} onChange={update("email")} className={inputClass} />
            {fieldError("email")}
          </div>
          <div>
            <label htmlFor="eq-phone" className={labelClass}>
              Mobile Number<Required />
            </label>
            <div className="flex rounded-xl border border-[#D9DFF0] bg-white focus-within:border-[#5160a3] focus-within:ring-2 focus-within:ring-[#5160a3]/15 transition-all overflow-hidden">
              <span className="px-3.5 flex items-center text-sm font-bold text-slate-700 bg-[#F5F7FC] border-r border-[#D9DFF0]">
                +91
              </span>
              <input
                id="eq-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={form.phone}
                onChange={update("phone")}
                className="flex-1 min-w-0 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>
            {fieldError("phone")}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="eq-enquiryType" className={labelClass}>
              I Am A<Required />
            </label>
            <select id="eq-enquiryType" value={form.enquiryType} onChange={update("enquiryType")} className={`${inputClass} cursor-pointer`}>
              <option value="" disabled>
                Select one
              </option>
              {ENQUIRY_TYPES.map(({ label }) => (
                <option key={label}>{label}</option>
              ))}
            </select>
            {fieldError("enquiryType")}
          </div>
          <div>
            <label htmlFor="eq-product" className={labelClass}>
              Product of Interest
            </label>
            <select id="eq-product" value={form.product} onChange={update("product")} className={`${inputClass} cursor-pointer`}>
              <option value="">Select (optional)</option>
              {PRODUCTS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="eq-location" className={labelClass}>
            City / District / State
          </label>
          <input id="eq-location" type="text" autoComplete="address-level2" placeholder="e.g. Erode, Tamil Nadu" value={form.location} onChange={update("location")} className={inputClass} />
        </div>

        <div>
          <label htmlFor="eq-message" className={labelClass}>
            Your Requirement<Required />
          </label>
          <textarea
            id="eq-message"
            rows={4}
            placeholder="Herd size, product and quantity needed, distribution region, or investment interest…"
            value={form.message}
            onChange={update("message")}
            className={`${inputClass} resize-none`}
          />
          {fieldError("message")}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <p className="flex items-start gap-1.5 text-xs text-slate-500 leading-relaxed sm:max-w-xs">
            <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#5160a3]" />
            <span>
              Shared only with the Ariviyaa team. See our{" "}
              <Link href="/privacy-policy" className="font-semibold text-[#5160a3] hover:underline">
                privacy policy
              </Link>
              .
            </span>
          </p>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] bg-[#5160a3] hover:bg-[#43518a] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-wait"
          >
            <Send className="w-4 h-4" />
            <span>{sending ? "Sending…" : "Send Enquiry"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
