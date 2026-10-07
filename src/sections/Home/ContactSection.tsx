"use client";

import React, { useState } from "react";
import Image from "next/image";
import { COMPANY_INFO } from "@/constants";
import { Phone, Mail, PawPrint } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compose inquiry message directly to WhatsApp with user's details
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const message = `*Hello Ariviya! New Inquiry:*\n\n*Name:* ${fullName}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}\n\nPlease share dosage, technical brochure, and pricing quote.`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="contact-section"
      className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100 scroll-mt-20 font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Badge, Title, Description, Dogs Image, Phone & Email */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* Paw Badge */}
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#5160a3]">
              <PawPrint className="w-4 h-4 fill-[#5160a3]" />
              <span>Contact Us</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Contact Our Team Today
            </h2>

            {/* Description Text */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
              Have questions about our products or services? Our friendly team is
              here to help you find the best solutions for your pet care needs.
            </p>

            {/* Lineup of Cute Pets */}
            <div className="w-full py-2 hidden md:block">
              <Image
                src="/assets/image.png"
                alt="Friendly pets"
                width={650}
                height={350}
                className="w-full h-auto object-contain drop-shadow-sm select-none"
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
                  <h4 className="text-sm font-bold text-slate-900">Phone Number</h4>
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
                  <h4 className="text-sm font-bold text-slate-900">Email Address</h4>
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
          <div className="lg:col-span-6 bg-[#F8F5F0] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm border border-[#EFEAE2]">
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

              {/* Row 3: Message */}
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

              {/* Row 4: Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] active:scale-[0.99] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
