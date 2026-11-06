"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { COMPANY_INFO } from "@/constants";
import { Phone, Mail, CheckCircle2 } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compose inquiry message directly to WhatsApp with user's details
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const message = `*Hello Ariviyaa! New Inquiry:*\n\n*Name:* ${fullName}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*I am a:* ${formData.enquiryType}\n*Message:* ${formData.message}\n\nPlease share dosage, technical brochure, and pricing quote.`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    // Reset form inputs so when the user returns, the form is cleanly refreshed
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      enquiryType: "",
      message: "",
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 8000);
  };

  return (
    <section
      id="contact-section"
      className="w-full section-y bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-100 scroll-mt-20 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Badge, Title, Description, Dogs Image, Phone & Email */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* Paw Badge */}
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
              <span>Contact Us</span>
            </div>

            {/* Main Heading */}
            <h2 className="h-section text-slate-900">
              Bulk Orders, Distribution &amp; Partnerships
            </h2>

            {/* Description Text */}
            <p className="t-lead text-slate-600 max-w-xl">
              Dairy cooperative, farm, veterinary clinic, distributor or investor? Tell us what you
              need and our team will share MammaryO pricing, technical documents and next steps.
            </p>

            {/* Product Range */}
            <div className="w-full py-2 hidden md:block">
              <Image
                src={IMAGES.productShowcase}
                alt="Ariviyaa product range with MammaryO teat dip"
                width={650}
                height={350}
                className="w-full h-auto object-contain drop-shadow-sm select-none rounded-xl"
                priority
              />
            </div>

            {/* Contact Pills: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Phone */}
              <div className="flex items-center gap-3.5">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-12 h-12 rounded-full bg-[#5160a3] hover:bg-[#434f8a] flex items-center justify-center text-white shrink-0 shadow-sm transition-colors cursor-pointer"
                  title="Call Us"
                >
                  <Phone className="w-5 h-5 fill-white" />
                </a>
                <div>
                  <h4 className="h-card text-slate-900">Phone Number</h4>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-xs sm:text-sm text-slate-500 hover:text-[#0D5C46] transition-colors"
                  >
                    {COMPANY_INFO.displayPhone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="w-12 h-12 rounded-full bg-[#5160a3] hover:bg-[#434f8a] flex items-center justify-center text-white shrink-0 shadow-sm transition-colors cursor-pointer"
                  title="Email Us"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <div>
                  <h4 className="h-card text-slate-900">Email Address</h4>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-xs sm:text-sm text-slate-500 hover:text-[#0D5C46] transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Soft Sand/Cream Card Form */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 bg-[#F5F7FC] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#D9DFF0]">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="First name"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-transparent focus:border-[#5160a3] focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Last name"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-transparent focus:border-[#5160a3] focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email Address & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter e-mail"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-transparent focus:border-[#5160a3] focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter number"
                    className="w-full px-4 py-3 bg-white rounded-xl border border-transparent focus:border-[#5160a3] focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Enquiry Type */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  I am a
                </label>
                <select
                  required
                  value={formData.enquiryType}
                  onChange={(e) =>
                    setFormData({ ...formData, enquiryType: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white rounded-xl border border-transparent focus:border-[#5160a3] focus:outline-none text-xs sm:text-sm text-slate-800 shadow-2xs transition-all cursor-pointer"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Dairy Cooperative / Milk Union</option>
                  <option>Dairy Farm Owner</option>
                  <option>Veterinary Doctor / Clinic</option>
                  <option>Distributor / Dealer</option>
                  <option>Investor</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write message here..."
                  className="w-full px-4 py-3 bg-white rounded-xl border border-transparent focus:border-[#5160a3] focus:outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all resize-none"
                />
              </div>

              {/* Submission Feedback */}
              {isSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold">Inquiry Sent to WhatsApp!</p>
                    <p className="text-emerald-700 font-normal mt-0.5">
                      Your message was opened on WhatsApp. The form has been cleared for you.
                    </p>
                  </div>
                </div>
              )}

              {/* Row 4: Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] active:scale-[0.99] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center"
              >
                {isSubmitted ? "Message Sent ✓" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
