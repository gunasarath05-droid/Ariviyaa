"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
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

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [accountType, setAccountType] = useState<AccountType>("Retail");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Demo build: every successful form lands on the account dashboard
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      if (phone.length !== 10) {
        setError("Enter a valid 10-digit mobile number.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    setError("");
    router.push("/account");
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );

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
                      <input
                        id="lg-name"
                        required
                        autoComplete="name"
                        placeholder="e.g. Rajesh Kumar"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="lg-mobile" className={labelClass}>
                        Mobile number
                      </label>
                      <div className="flex gap-2">
                        <span className="px-3.5 py-3 rounded-xl bg-[#F5F7FC] border border-[#D9DFF0] text-sm font-semibold text-slate-700">
                          +91
                        </span>
                        <input
                          id="lg-mobile"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          required
                          maxLength={10}
                          placeholder="98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          className={inputClass}
                        />
                      </div>
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

                <div>
                  <label htmlFor="lg-email" className={labelClass}>
                    Email address
                  </label>
                  <input
                    id="lg-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="lg-pass" className={labelClass}>
                      {mode === "signup" ? "Create password" : "Password"}
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
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      minLength={mode === "signup" ? 8 : undefined}
                      placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className={`${inputClass} pr-11`}
                    />
                    {passwordToggle}
                  </div>
                </div>

                {mode === "signup" && (
                  <div>
                    <label htmlFor="lg-pass2" className={labelClass}>
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        id="lg-pass2"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setError("");
                        }}
                        className={`${inputClass} pr-11`}
                      />
                      {passwordToggle}
                    </div>
                  </div>
                )}

                {error && (
                  <p role="alert" className="text-xs font-semibold text-rose-600">
                    {error}
                  </p>
                )}

                <button type="submit" className={`${primaryButtonClass} w-full`}>
                  {mode === "signin" ? "Sign in" : "Create account"}
                  <ArrowRight className="w-4 h-4" />
                </button>

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
