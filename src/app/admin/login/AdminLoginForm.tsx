"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { IMAGES } from "@/constants/images";
import { ADMIN_IDLE_TIMEOUT_MINUTES } from "@/constants/adminData";
import { useAdmin } from "@/context/AdminContext";
import { inputClass, labelClass, primaryButtonClass } from "@/components/ui/form";

export function AdminLoginForm() {
  const router = useRouter();
  const { ready, admin, signIn, lockedFor } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Only same-site admin paths, e.g. /admin/orders
  const nextPath = () => {
    const next = new URLSearchParams(window.location.search).get("next");
    return next && next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin";
  };

  // Already signed in (e.g. back button): go straight to the panel
  useEffect(() => {
    if (ready && admin) router.replace(nextPath());
  }, [ready, admin, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signIn(email, password);
    if (!result.ok) {
      setError(result.error);
      setPassword("");
      return;
    }
    setError("");
    router.replace(nextPath());
  };

  const locked = lockedFor > 0;

  return (
    <div className="min-h-screen bg-[#F5F7FC] font-sans flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <Image
            src={IMAGES.logo}
            alt="Ariviyaa"
            width={150}
            height={44}
            style={{ width: "auto", height: "auto" }}
            className="h-10 w-auto mx-auto"
          />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF3FC] border border-[#D9DFF0] text-xs font-bold text-[#5160a3]">
            <Lock className="w-3.5 h-3.5" />
            Admin panel
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl border border-[#D9DFF0] shadow-sm p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sign in to manage the store</h1>
            <p className="text-sm text-slate-500">For Ariviyaa staff only.</p>
          </div>

          <div>
            <label htmlFor="ad-email" className={labelClass}>
              Work email
            </label>
            <input
              id="ad-email"
              type="email"
              autoComplete="username"
              required
              placeholder="name@ariviyaa.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={locked}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="ad-pass" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                id="ad-pass"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                disabled={locked}
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

          {(error || locked) && (
            <p role="alert" className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
              {locked ? `Too many attempts. Try again in ${lockedFor} seconds.` : error}
            </p>
          )}

          <button type="submit" disabled={locked || !email || !password} className={`${primaryButtonClass} w-full`}>
            Sign in
            <ArrowRight className="w-4 h-4" />
          </button>

          <ul className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5160a3] shrink-0" />
              Access is limited by role (Owner, Operations, Support)
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5160a3] shrink-0" />
              Locks after 5 wrong attempts · signs out after {ADMIN_IDLE_TIMEOUT_MINUTES} min idle
            </li>
          </ul>
        </form>

        <Link
          href="/"
          className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#5160a3]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to store
        </Link>
      </div>
    </div>
  );
}
