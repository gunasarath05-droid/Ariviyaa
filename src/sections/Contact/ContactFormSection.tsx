"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { COMPANY_INFO } from "@/constants/company";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Building,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Dairy Farmer / Cattle Owner",
    location: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `*New Inquiry via Ariviya Website:*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Role/Category:* ${formData.role}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Location/District:* ${formData.location || "Not specified"}\n\n` +
      `*Message:* ${formData.message}`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, "_blank");

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Dairy Farmer / Cattle Owner",
      location: "",
      message: "",
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 8000);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 font-sans border-b border-[#D9DFF0]" id="contact-form-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Form Info & Direct Assurance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5160a3]">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3]" />
              <span>Direct Inquiry Form</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Tell Us What You Need. <br />
              <span className="text-[#5160a3]">We Answer Promptly.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Whether you are an individual dairy farmer struggling with mastitis, a veterinary doctor seeking clinical trial dossiers, a wholesale distributor, or an investor — our team routes your query directly to the relevant department head.
            </p>

            {/* Direct Guarantees */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Veterinary Doctor Consultation</h4>
                  <p className="text-xs text-slate-500">Free dosage & clinical application support for cattle & pets.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Wholesale & Dealership Terms</h4>
                  <p className="text-xs text-slate-500">Exclusive territorial distribution rights available in select states.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Investor Pitch Deck & Cap Table</h4>
                  <p className="text-xs text-slate-500">Confidential investor pack sent upon verification of credentials.</p>
                </div>
              </div>
            </div>

            {/* Product range preview banner */}
            <div className="rounded-2xl overflow-hidden border border-[#D9DFF0] shadow-2xs mt-4">
              <div className="relative aspect-16/9 w-full bg-slate-100">
                <Image
                  src={IMAGES.site.productsRange}
                  alt="Ariviya Product Line"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Box */}
          <div className="lg:col-span-7">
            <div className="bg-[#F5F7FC] rounded-3xl border border-[#D9DFF0] p-6 sm:p-8 lg:p-10 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-1">Send a Direct Message</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Fill the fields below. Clicking send connects you immediately with our team on WhatsApp and records your request.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your inquiry has been prepared! Our technical team will respond shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    I am inquiring as: *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]"
                    required
                  >
                    <option value="Dairy Farmer / Cattle Owner">Dairy Farmer / Cattle Owner</option>
                    <option value="Pet Parent (Dog / Cat)">Pet Parent (Dog / Cat)</option>
                    <option value="Veterinary Doctor / Clinic">Veterinary Doctor / Clinic</option>
                    <option value="Dairy Cooperative / Milk Union">Dairy Cooperative / Milk Union</option>
                    <option value="Distributor / Stockist / Retailer">Distributor / Stockist / Retailer</option>
                    <option value="Institutional Investor / VC / Partner">Institutional Investor / VC / Partner</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]"
                      required
                    />
                  </div>
                </div>

                {/* Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rajesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      City / District / State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Thanjavur / Erode / Bengaluru"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your herd size, specific mastitis symptoms, bulk order quantity, or investment proposal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9DFF0] text-sm text-slate-900 focus:outline-none focus:border-[#5160a3] focus:ring-1 focus:ring-[#5160a3]"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#5160a3] hover:bg-[#43518a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Technical Desk</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
