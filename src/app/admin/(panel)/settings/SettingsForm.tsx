"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Store, ShoppingCart, CreditCard, ShieldCheck, Users, Check, X, AlertTriangle, LogOut } from "lucide-react";
import {
  ADMIN_IDLE_TIMEOUT_MINUTES,
  ADMIN_LOCK_SECONDS,
  ADMIN_MAX_ATTEMPTS,
  ADMIN_USERS,
  ROLE_ACCESS,
  type AdminRole,
  type AdminSection,
  type AdminSettings,
} from "@/constants/adminData";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminPageHeader,
  Pill,
  adminButtonClass,
  adminInputClass,
  adminLabelClass,
  adminSecondaryButtonClass,
  panelClass,
} from "@/components/admin/ui";

const SECTION_LABEL: Record<AdminSection, string> = {
  dashboard: "Dashboard",
  orders: "Orders",
  returns: "Returns",
  products: "Products",
  customers: "Customers",
  enquiries: "Enquiries",
  shipping: "Shipping",
  payments: "Payments",
  settings: "Settings",
};

const ROLES: AdminRole[] = ["Owner", "Operations", "Support"];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${checked ? "bg-[#5160a3]" : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`}
      />
    </button>
  );
}

// Same look as PanelHeader, with an icon before the title
function IconHeader({ title, Icon }: { title: string; Icon: React.ElementType }) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
      <Icon className="w-4.5 h-4.5 text-[#5160a3]" />
      <h2 className="text-sm sm:text-base font-bold text-slate-900">{title}</h2>
    </div>
  );
}

function Section({ title, Icon, children }: { title: string; Icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className={`${panelClass} overflow-hidden`}>
      <IconHeader title={title} Icon={Icon} />
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

export function SettingsForm() {
  const router = useRouter();
  const { settings, updateSettings, signOut, admin } = useAdmin();
  const [draft, setDraft] = useState<AdminSettings>(settings);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...draft,
      codFee: Math.max(0, Math.round(Number(draft.codFee) || 0)),
      freeShippingAbove: Math.max(0, Math.round(Number(draft.freeShippingAbove) || 0)),
    });
    setSaved(true);
  };

  const field = (id: string, label: string, key: "storeName" | "supportEmail" | "supportPhone" | "orderNotifyEmail", type = "text") => (
    <div>
      <label htmlFor={id} className={adminLabelClass}>
        {label}
      </label>
      <input id={id} type={type} value={draft[key]} onChange={(e) => set(key, e.target.value)} className={adminInputClass} />
    </div>
  );

  return (
    <form onSubmit={save} className="space-y-6">
      <AdminPageHeader
        title="Settings"
        subtitle="Store, checkout, payments and team access"
        actions={
          <>
            {saved && (
              <Pill tone="green">
                <Check className="w-3.5 h-3.5 mr-1" />
                Saved
              </Pill>
            )}
            <button type="submit" className={adminButtonClass}>
              Save changes
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Section title="Store details" Icon={Store}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("st-name", "Store name", "storeName")}
            {field("st-phone", "Support phone", "supportPhone", "tel")}
            {field("st-email", "Support email", "supportEmail", "email")}
            {field("st-notify", "Order notification email", "orderNotifyEmail", "email")}
          </div>
        </Section>

        <Section title="Checkout" Icon={ShoppingCart}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">Cash on Delivery</p>
              <p className="text-xs text-slate-500">Offer COD at checkout with an extra fee.</p>
            </div>
            <Toggle checked={draft.codEnabled} onChange={(v) => set("codEnabled", v)} label="Cash on Delivery" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="st-codfee" className={adminLabelClass}>
                COD fee (₹)
              </label>
              <input
                id="st-codfee"
                type="number"
                min={0}
                disabled={!draft.codEnabled}
                value={draft.codFee}
                onChange={(e) => set("codFee", Number(e.target.value))}
                className={`${adminInputClass} disabled:bg-[#F5F7FC] disabled:text-slate-400`}
              />
            </div>
            <div>
              <label htmlFor="st-free" className={adminLabelClass}>
                Free delivery above (₹)
              </label>
              <input
                id="st-free"
                type="number"
                min={0}
                value={draft.freeShippingAbove}
                onChange={(e) => set("freeShippingAbove", Number(e.target.value))}
                className={adminInputClass}
              />
            </div>
          </div>
        </Section>

        <Section title="Payments" Icon={CreditCard}>
          <div>
            <span className={adminLabelClass}>Razorpay mode</span>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              {(["test", "live"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={draft.razorpayMode === mode}
                  onClick={() => set("razorpayMode", mode)}
                  className={`p-3 rounded-xl border text-left text-sm font-bold transition-colors cursor-pointer ${
                    draft.razorpayMode === mode
                      ? "border-[#5160a3] bg-[#EFF3FC] text-slate-900 ring-2 ring-[#5160a3]/15"
                      : "border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]/50"
                  }`}
                >
                  {mode === "test" ? "Test" : "Live"}
                  <span className="block text-xs font-medium text-slate-500 mt-0.5">
                    {mode === "test" ? "No real money moves" : "Real customer payments"}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <p className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Razorpay API keys are never entered here. Live keys stay on the server and are set by the developer.
          </p>
        </Section>

        <Section title="Security" Icon={ShieldCheck}>
          <dl className="divide-y divide-slate-100 text-sm">
            {[
              ["Auto sign-out", `After ${ADMIN_IDLE_TIMEOUT_MINUTES} minutes of inactivity`],
              ["Wrong password limit", `${ADMIN_MAX_ATTEMPTS} attempts, then locked for ${ADMIN_LOCK_SECONDS} seconds`],
              ["Signed in as", admin ? `${admin.name} (${admin.role})` : "—"],
            ].map(([term, value]) => (
              <div key={term} className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-slate-500">{term}</dt>
                <dd className="font-semibold text-slate-900 text-right">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">Two-step sign-in</p>
              <p className="text-xs text-slate-500">Ask for an email code after the password (enabled with the backend).</p>
            </div>
            <Toggle checked={draft.twoStepLogin} onChange={(v) => set("twoStepLogin", v)} label="Two-step sign-in" />
          </div>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.replace("/admin/login");
            }}
            className={adminSecondaryButtonClass}
          >
            <LogOut className="w-4 h-4" />
            Sign out now
          </button>
        </Section>
      </div>

      {/* Team & roles */}
      <div className={`${panelClass} overflow-hidden`}>
        <IconHeader title="Team & roles" Icon={Users} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-[#F5F7FC]">
                <th className="px-5 py-2.5 font-bold">Name</th>
                <th className="px-5 py-2.5 font-bold">Email</th>
                <th className="px-5 py-2.5 font-bold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ADMIN_USERS.map((u) => (
                <tr key={u.email}>
                  <td className="px-5 py-3 font-semibold text-slate-900">{u.name}</td>
                  <td className="px-5 py-3 text-slate-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <Pill tone={u.role === "Owner" ? "brand" : "slate"}>{u.role}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-[#F5F7FC]">
                <th className="px-5 py-2.5 font-bold">Access</th>
                {ROLES.map((r) => (
                  <th key={r} className="px-5 py-2.5 font-bold text-center">
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(Object.keys(SECTION_LABEL) as AdminSection[]).map((section) => (
                <tr key={section}>
                  <td className="px-5 py-2.5 text-slate-700">{SECTION_LABEL[section]}</td>
                  {ROLES.map((r) => (
                    <td key={r} className="px-5 py-2.5 text-center">
                      {ROLE_ACCESS[r].includes(section) ? (
                        <Check className="w-4 h-4 text-[#5160a3] inline" aria-label="Allowed" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 inline" aria-label="No access" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
          Inviting staff and changing roles is enabled with the backend.
        </p>
      </div>
    </form>
  );
}
