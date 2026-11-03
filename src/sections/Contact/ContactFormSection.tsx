"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { COMPANY_INFO } from "@/constants/company";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { Send, CheckCircle2, Clock, Building2 } from "lucide-react";

const ENQUIRY_TYPES = [
  "Dairy Cooperative / Milk Union",
  "Dairy Farm Owner",
  "Veterinary Doctor / Clinic",
  "Distributor / Stockist / Retailer",
  "Investor / VC / Strategic Partner",
  "Pet Parent (Dog / Cat)",
  "Other",
];

// Links elsewhere on the site pre-select the enquiry type, e.g. /contact?type=distributor
const QUERY_TO_TYPE: Record<string, string> = {
  distributor: "Distributor / Stockist / Retailer",
  investor: "Investor / VC / Strategic Partner",
  cooperative: "Dairy Cooperative / Milk Union",
  vet: "Veterinary Doctor / Clinic",
};

const assurances = [
  {
    title: "Bulk & Institutional Supply",
    desc: "5 L, 20 L and drum packs of MammaryO with GST invoicing for cooperatives and farms.",
  },
  {
    title: "Distributor & Dealer Partnerships",
    desc: "Dealer pricing and pan-India dispatch for veterinary and dairy-input networks.",
  },
  {
    title: "Veterinary & Technical Support",
    desc: "Usage guidance and the TANUVAS efficacy dossier for vets and qualified partners.",
  },
  {
    title: "Investor Relations",
    desc: "Company overview and investor information shared on request.",
  },
];

const EMPTY_FORM = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  enquiryType: "",
  location: "",
  message: "",
};

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5160a3] focus:ring-2 focus:ring-[#5160a3]/15 transition-all";

const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2";

function Required() {
  return <span className="text-rose-500"> *</span>;
}

export function ContactFormSection() {
  const searchParams = useSearchParams();
  const presetType =
    QUERY_TO_TYPE[searchParams.get("type") ?? ""] ?? QUERY_TO_TYPE[searchParams.get("role") ?? ""] ?? "";

  const [formData, setFormData] = useState({ ...EMPTY_FORM, enquiryType: presetType });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = (field: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage =
      `*New Enquiry via Ariviya Website:*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Organisation:* ${formData.organisation || "Not specified"}\n` +
      `*I am a:* ${formData.enquiryType}\n` +
      `*Phone:* +91 ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Location:* ${formData.location || "Not specified"}\n\n` +
      `*Message:* ${formData.message}`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, "_blank");

    setIsSubmitted(true);
    setFormData({ ...EMPTY_FORM });
    setTimeout(() => setIsSubmitted(false), 8000);
  };

  return (
    <section className="w-full bg-white pt-16 sm:pt-20 pb-16 sm:pb-24 font-sans border-b border-[#D9DFF0]" id="contact-form-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: intro & what we help with */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-40">
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3]" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Send Us Your <span className="text-[#5160a3]">Enquiry</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tell us who you are and what you need. Your message opens in WhatsApp so our team
              can reply directly — and route it to the right person.
            </p>

            <ul className="space-y-4 pt-1">
              {assurances.map(({ title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                    <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#D9DFF0] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_-30px_rgba(43,45,66,0.35)]">
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your enquiry opened in WhatsApp. Send it there and our team will reply shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-name" className={labelClass}>
                      Full Name<Required />
                    </label>
                    <input id="cf-name" type="text" required placeholder="e.g. Dr. Rajesh Kumar" value={formData.name} onChange={update("name")} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cf-org" className={labelClass}>
                      Organisation / Farm Name
                    </label>
                    <input id="cf-org" type="text" placeholder="e.g. Thanjavur Milk Union (optional)" value={formData.organisation} onChange={update("organisation")} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-email" className={labelClass}>
                      Email Address<Required />
                    </label>
                    <input id="cf-email" type="email" required placeholder="e.g. rajesh@example.com" value={formData.email} onChange={update("email")} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cf-phone" className={labelClass}>
                      Phone Number<Required />
                    </label>
                    <div className="flex rounded-xl border border-[#D9DFF0] bg-white focus-within:border-[#5160a3] focus-within:ring-2 focus-within:ring-[#5160a3]/15 transition-all overflow-hidden">
                      <span className="px-3.5 flex items-center text-sm font-bold text-slate-700 bg-[#F5F7FC] border-r border-[#D9DFF0]">
                        IN +91
                      </span>
                      <input
                        id="cf-phone"
                        type="tel"
                        required
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={update("phone")}
                        className="flex-1 min-w-0 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-type" className={labelClass}>
                      I Am A<Required />
                    </label>
                    <select id="cf-type" required value={formData.enquiryType} onChange={update("enquiryType")} className={`${inputClass} cursor-pointer`}>
                      <option value="" disabled>
                        Select one
                      </option>
                      {ENQUIRY_TYPES.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cf-location" className={labelClass}>
                      City / District / State
                    </label>
                    <input id="cf-location" type="text" placeholder="e.g. Erode, Tamil Nadu" value={formData.location} onChange={update("location")} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-message" className={labelClass}>
                    Your Requirement<Required />
                  </label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    required
                    placeholder="Herd size, product and quantity needed, distribution region, or investment interest…"
                    value={formData.message}
                    onChange={update("message")}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <p className="text-[11px] text-slate-400 leading-relaxed sm:max-w-xs">
                    Submitting opens WhatsApp with your details filled in. Nothing is sent until you tap send there.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] bg-[#5160a3] hover:bg-[#43518a] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
