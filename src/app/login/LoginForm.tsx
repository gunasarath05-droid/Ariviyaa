"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  Mail,
  ShieldCheck,
  Truck,
  FileText,
  RotateCcw,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Building2,
} from "lucide-react";
import { IMAGES } from "@/constants/images";
import { inputClass, labelClass, primaryButtonClass } from "@/components/ui/form";

type Mode = "signin" | "signup";
type Method = "otp" | "email";
type AccountType = "Retail" | "Business";

const TRUST_POINTS = [
  { Icon: Truck, text: "Track every order from Thanjavur to your doorstep" },
  { Icon: FileText, text: "Download GST invoices for business purchases" },
  { Icon: RotateCcw, text: "Reorder and request returns in a few taps" },
  { Icon: ShieldCheck, text: "Secure payments powered by Razorpay" },
];

const BADGES = [
  { src: IMAGES.badges.tanuvas, alt: "TANUVAS tested" },
  { src: IMAGES.badges.patented, alt: "Patented technology" },
  { src: IMAGES.badges.gmp, alt: "GMP certified" },
  { src: IMAGES.badges.nabl, alt: "NABL lab tested" },
];

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [method, setMethod] = useState<Method>("otp");
  const [accountType, setAccountType] = useState<AccountType>("Retail");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const sendOtp = () => {
    setOtpSent(true);
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(RESEND_SECONDS);
    setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const updateOtp = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      setOtp((prev) => prev.map((d, i) => (i === index ? "" : d)));
      return;
    }
    // Supports pasting the whole code into any box
    setOtp((prev) => {
      const next = [...prev];
      digits
        .slice(0, OTP_LENGTH - index)
        .split("")
        .forEach((d, offset) => (next[index + offset] = d));
      return next;
    });
    const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleOtpKey = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Demo build: every successful form lands on the account dashboard
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "otp" && !otpSent) {
      sendOtp();
      return;
    }
    router.push("/account");
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setOtpSent(false);
    setTimer(0);
  };

  const phoneValid = phone.replace(/\D/g, "").length === 10;
  const otpComplete = otp.every((d) => d !== "");

  return (
    <section className="w-full bg-[#F5F7FC] py-10 sm:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl border border-[#D9DFF0] shadow-sm overflow-hidden">
          {/* Brand panel */}
          <div className="relative hidden lg:flex flex-col justify-between p-10 bg-[#EFF3FC] border-r border-[#D9DFF0]">
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <Image
                  src={IMAGES.logo}
                  alt="Ariviya"
                  width={150}
                  height={48}
                  style={{ width: "auto", height: "auto" }}
                  className="h-10 w-auto"
                />
              </Link>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Your farm &amp; pet care, one account away
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Shop patented bio-polymer formulations, manage bulk orders and keep every invoice in
                  one place.
                </p>
              </div>
              <ul className="space-y-3">
                {TRUST_POINTS.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-8 h-8 rounded-lg bg-white border border-[#D9DFF0] text-[#5160a3] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="pt-1.5">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mt-8">
              <Image
                src={IMAGES.productHeroBanner}
                alt="Ariviya product range"
                fill
                sizes="480px"
                className="object-contain object-bottom"
              />
            </div>

            <div className="pt-6 border-t border-[#D9DFF0] flex items-center gap-3">
              {BADGES.map((badge) => (
                <div
                  key={badge.alt}
                  className="relative w-12 h-12 rounded-full bg-white border border-[#D9DFF0] overflow-hidden"
                >
                  <Image src={badge.src} alt={badge.alt} fill sizes="48px" className="object-contain p-1" />
                </div>
              ))}
              <span className="text-xs font-semibold text-slate-500">Tested &amp; certified formulations</span>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {mode === "signin" ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-sm text-slate-500">
                  {mode === "signin"
                    ? "Sign in to track orders, reorder and download invoices."
                    : "Join farmers, vets and pet parents across India."}
                </p>
              </div>

              {/* Method tabs */}
              <div className="grid grid-cols-2 p-1 bg-[#F5F7FC] border border-[#D9DFF0] rounded-xl text-sm font-bold">
                {(
                  [
                    { id: "otp", label: "Mobile OTP", Icon: Smartphone },
                    { id: "email", label: "Email & password", Icon: Mail },
                  ] as const
                ).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMethod(id);
                      setOtpSent(false);
                    }}
                    className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      method === id ? "bg-white text-[#5160a3] shadow-2xs" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <>
                    <div>
                      <span className={labelClass}>Account type</span>
                      <div className="grid grid-cols-2 gap-3">
                        {(
                          [
                            { id: "Retail", hint: "Pet parents & farmers", Icon: User },
                            { id: "Business", hint: "Farms, clinics, dealers", Icon: Building2 },
                          ] as const
                        ).map(({ id, hint, Icon }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setAccountType(id)}
                            className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                              accountType === id
                                ? "border-[#5160a3] bg-[#EFF3FC] ring-2 ring-[#5160a3]/15"
                                : "border-[#D9DFF0] hover:border-[#5160a3]/50"
                            }`}
                          >
                            <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                              <Icon className="w-4 h-4 text-[#5160a3]" />
                              {id}
                            </span>
                            <span className="block text-xs text-slate-500 mt-0.5">{hint}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lg-name" className={labelClass}>
                        Full name
                      </label>
                      <input id="lg-name" required placeholder="e.g. Rajesh Kumar" className={inputClass} />
                    </div>

                    {accountType === "Business" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="lg-biz" className={labelClass}>
                            Business name
                          </label>
                          <input id="lg-biz" required placeholder="e.g. Sri Murugan Dairy" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="lg-gst" className={labelClass}>
                            GSTIN <span className="normal-case font-medium text-slate-400">(optional)</span>
                          </label>
                          <input
                            id="lg-gst"
                            placeholder="33ABCDE1234F1Z5"
                            maxLength={15}
                            className={`${inputClass} uppercase`}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {method === "otp" ? (
                  <>
                    <div>
                      <label htmlFor="lg-phone" className={labelClass}>
                        Mobile number
                      </label>
                      <div className="flex gap-2">
                        <span className="px-3.5 py-3 rounded-xl bg-[#F5F7FC] border border-[#D9DFF0] text-sm font-semibold text-slate-700">
                          +91
                        </span>
                        <input
                          id="lg-phone"
                          type="tel"
                          inputMode="numeric"
                          required
                          maxLength={10}
                          placeholder="98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          disabled={otpSent}
                          className={`${inputClass} disabled:bg-[#F5F7FC]`}
                        />
                      </div>
                      {otpSent && (
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="mt-2 text-xs font-bold text-[#5160a3] hover:underline cursor-pointer"
                        >
                          Change number
                        </button>
                      )}
                    </div>

                    {otpSent && (
                      <div>
                        <span className={labelClass}>Enter the 6-digit code sent to +91 {phone}</span>
                        <div className="flex gap-2 sm:gap-2.5">
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              ref={(el) => {
                                otpRefs.current[i] = el;
                              }}
                              aria-label={`OTP digit ${i + 1}`}
                              inputMode="numeric"
                              autoComplete={i === 0 ? "one-time-code" : "off"}
                              maxLength={OTP_LENGTH}
                              value={digit}
                              onChange={(e) => updateOtp(i, e.target.value)}
                              onKeyDown={(e) => handleOtpKey(i, e)}
                              className="w-full aspect-square max-w-12 rounded-xl border border-[#D9DFF0] text-center text-lg font-black text-slate-900 focus:outline-none focus:border-[#5160a3] focus:ring-2 focus:ring-[#5160a3]/15"
                            />
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          {timer > 0 ? (
                            <span>
                              Resend code in <strong className="text-slate-700">0:{String(timer).padStart(2, "0")}</strong>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={sendOtp}
                              className="font-bold text-[#5160a3] hover:underline cursor-pointer"
                            >
                              Resend code
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={otpSent ? !otpComplete : !phoneValid}
                      className={`${primaryButtonClass} w-full`}
                    >
                      {otpSent ? (mode === "signin" ? "Verify & sign in" : "Verify & create account") : "Send OTP"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="lg-email" className={labelClass}>
                        Email address
                      </label>
                      <input id="lg-email" type="email" required placeholder="you@example.com" className={inputClass} />
                    </div>
                    {mode === "signup" && (
                      <div>
                        <label htmlFor="lg-mobile" className={labelClass}>
                          Mobile number
                        </label>
                        <input id="lg-mobile" type="tel" required placeholder="+91 98765 43210" className={inputClass} />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="lg-pass" className={labelClass}>
                          Password
                        </label>
                        {mode === "signin" && (
                          <button type="button" className="mb-2 text-xs font-bold text-[#5160a3] hover:underline cursor-pointer">
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="lg-pass"
                          type={showPassword ? "text" : "password"}
                          required
                          minLength={mode === "signup" ? 8 : undefined}
                          placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
                          className={`${inputClass} pr-11`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" className={`${primaryButtonClass} w-full`}>
                      {mode === "signin" ? "Sign in" : "Create account"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {mode === "signup" && (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    By creating an account you agree to our{" "}
                    <Link href="/terms-and-conditions" className="font-semibold text-[#5160a3] hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="font-semibold text-[#5160a3] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                )}
              </form>

              <div className="pt-5 border-t border-slate-100 text-center text-sm text-slate-600">
                {mode === "signin" ? "New to Ariviya?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                  className="font-bold text-[#5160a3] hover:underline cursor-pointer"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </div>

              <p className="text-center text-xs text-slate-500">
                Buying in bulk for a cooperative or dealership?{" "}
                <Link href="/contact?type=distributor" className="font-semibold text-[#5160a3] hover:underline">
                  Talk to our B2B team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
