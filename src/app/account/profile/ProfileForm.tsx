"use client";

import React, { useState } from "react";
import { UserRound, Building2, KeyRound, Eye, EyeOff, Check } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import type { CustomerProfile } from "@/constants/demo";
import { cardClass, inputClass, labelClass, primaryButtonClass } from "@/components/ui/form";

type AccountType = CustomerProfile["accountType"];

function SavedNote({ show, text }: { show: boolean; text: string }) {
  return show ? (
    <p role="status" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
      <Check className="w-4 h-4" />
      {text}
    </p>
  ) : null;
}

// Rendered inside AccountShell, so a signed-in user is always present
export function ProfileForm() {
  const { user, updateProfile } = useAccount();

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState((user?.phone ?? "").replace(/\D/g, "").slice(-10));
  const [accountType, setAccountType] = useState<AccountType>(user?.accountType ?? "Retail");
  const [businessName, setBusinessName] = useState(user?.businessName ?? "");
  const [gstin, setGstin] = useState(user?.gstin ?? "");
  const [profileError, setProfileError] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  if (!user) return null;

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(false);
    if (!name.trim()) return setProfileError("Enter your full name.");
    if (phone.length !== 10) return setProfileError("Enter a valid 10-digit mobile number.");
    if (accountType === "Business") {
      if (!businessName.trim()) return setProfileError("Enter your business name.");
      if (gstin && !/^[0-9A-Z]{15}$/.test(gstin)) return setProfileError("GSTIN must be 15 characters.");
    }
    setProfileError("");
    updateProfile({
      name: name.trim(),
      phone: `+91 ${phone}`,
      accountType,
      businessName: accountType === "Business" ? businessName.trim() : undefined,
      gstin: accountType === "Business" ? gstin || undefined : undefined,
    });
    setProfileSaved(true);
  };

  // Demo build: nothing is stored; the backend will verify the current password
  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(false);
    if (!currentPassword) return setPasswordError("Enter your current password.");
    if (newPassword.length < 8) return setPasswordError("New password must be at least 8 characters.");
    if (newPassword !== confirmPassword) return setPasswordError("New passwords do not match.");
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordSaved(true);
  };

  const passwordInput = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
    autoComplete: string
  ) => (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={showPasswords ? "text" : "password"}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setPasswordError("");
        }}
        className={inputClass}
      />
    </div>
  );

  return (
    <>
      {/* Personal + business details */}
      <form onSubmit={saveProfile} noValidate className={`${cardClass} p-5 sm:p-6 space-y-5`}>
        <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900">
          <UserRound className="w-5 h-5 text-[#5160a3]" />
          Personal details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="pf-name" className={labelClass}>
              Full name
            </label>
            <input
              id="pf-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="pf-mobile" className={labelClass}>
              Mobile number
            </label>
            <div className="flex gap-2">
              <span className="px-3.5 py-3 rounded-xl bg-[#F5F7FC] border border-[#D9DFF0] text-sm font-semibold text-slate-700">
                +91
              </span>
              <input
                id="pf-mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="pf-email" className={labelClass}>
              Email address
            </label>
            <input
              id="pf-email"
              type="email"
              value={user.email}
              readOnly
              className={`${inputClass} bg-[#F5F7FC] text-slate-500 cursor-not-allowed`}
            />
            <p className="mt-1.5 text-[11px] text-slate-500">Your sign-in email. Contact support to change it.</p>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Building2 className="w-4 h-4 text-[#5160a3]" />
            Account type
          </h3>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {(["Retail", "Business"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAccountType(type)}
                aria-pressed={accountType === type}
                className={`p-3 rounded-xl border text-left text-sm font-bold transition-colors cursor-pointer ${
                  accountType === type
                    ? "border-[#5160a3] bg-[#EFF3FC] text-slate-900 ring-2 ring-[#5160a3]/15"
                    : "border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]/50"
                }`}
              >
                {type}
                <span className="block text-xs font-medium text-slate-500 mt-0.5">
                  {type === "Retail" ? "Pet parents & farmers" : "GST invoice on every order"}
                </span>
              </button>
            ))}
          </div>

          {accountType === "Business" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pf-biz" className={labelClass}>
                  Business name
                </label>
                <input
                  id="pf-biz"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="pf-gst" className={labelClass}>
                  GSTIN <span className="normal-case font-medium text-slate-400">(optional)</span>
                </label>
                <input
                  id="pf-gst"
                  maxLength={15}
                  placeholder="33ABCDE1234F1Z5"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase().replace(/\s/g, ""))}
                  className={`${inputClass} uppercase`}
                />
              </div>
            </div>
          )}
        </div>

        {profileError && (
          <p role="alert" className="text-sm font-semibold text-rose-600">
            {profileError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className={primaryButtonClass}>
            Save changes
          </button>
          <SavedNote show={profileSaved} text="Details saved" />
        </div>
      </form>

      {/* Password */}
      <form onSubmit={changePassword} noValidate className={`${cardClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900">
            <KeyRound className="w-5 h-5 text-[#5160a3]" />
            Change password
          </h2>
          <button
            type="button"
            onClick={() => setShowPasswords((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5160a3] hover:underline cursor-pointer"
          >
            {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showPasswords ? "Hide" : "Show"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {passwordInput("pf-pass-current", "Current password", currentPassword, setCurrentPassword, "current-password")}
          {passwordInput("pf-pass-new", "New password", newPassword, setNewPassword, "new-password")}
          {passwordInput("pf-pass-confirm", "Confirm new password", confirmPassword, setConfirmPassword, "new-password")}
        </div>

        {passwordError && (
          <p role="alert" className="text-sm font-semibold text-rose-600">
            {passwordError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className={primaryButtonClass}>
            Update password
          </button>
          <SavedNote show={passwordSaved} text="Password updated" />
        </div>
      </form>
    </>
  );
}
