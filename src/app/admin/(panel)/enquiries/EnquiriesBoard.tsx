"use client";

import React, { useState } from "react";
import { Search, X, Phone, Mail, MessageCircle, StickyNote } from "lucide-react";
import { ENQUIRY_STATUSES, type AdminEnquiry, type EnquiryStatus } from "@/constants/adminData";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminPageHeader,
  Pill,
  panelClass,
  adminButtonClass,
  adminInputClass,
  adminLabelClass,
  type PillTone,
} from "@/components/admin/ui";

const STATUS_TONE: Record<EnquiryStatus, PillTone> = {
  New: "brand",
  Contacted: "amber",
  Quoted: "amber",
  Won: "green",
  Lost: "slate",
};

const digits = (phone: string) => phone.replace(/\D/g, "");

function EnquiryDetail({ enquiry, onClose }: { enquiry: AdminEnquiry; onClose: () => void }) {
  const { updateEnquiry } = useAdmin();
  const [note, setNote] = useState("");

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    const text = note.trim();
    if (!text) return;
    const stamp = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    updateEnquiry(enquiry.id, {}, `${stamp}: ${text}`);
    setNote("");
  };

  return (
    <div className={`${panelClass} p-5 space-y-5 xl:sticky xl:top-24`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-400">{enquiry.id} · {enquiry.date}</p>
          <p className="text-base font-bold text-slate-900">{enquiry.organisation}</p>
          <p className="text-sm text-slate-500">{enquiry.name}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close enquiry" className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div>
        <label htmlFor="enq-status" className={adminLabelClass}>
          Status
        </label>
        <select
          id="enq-status"
          value={enquiry.status}
          onChange={(e) => updateEnquiry(enquiry.id, { status: e.target.value as EnquiryStatus })}
          className={adminInputClass}
        >
          {ENQUIRY_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={`tel:${digits(enquiry.phone)}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D9DFF0] text-xs font-bold text-slate-700 hover:border-[#5160a3] hover:text-[#5160a3]"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>
        <a
          href={`https://wa.me/${digits(enquiry.phone)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D9DFF0] text-xs font-bold text-emerald-700 hover:border-emerald-300"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>
        <a
          href={`mailto:${enquiry.email}?subject=${encodeURIComponent(`Ariviyaa — ${enquiry.product}`)}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D9DFF0] text-xs font-bold text-slate-700 hover:border-[#5160a3] hover:text-[#5160a3]"
        >
          <Mail className="w-3.5 h-3.5" />
          Email
        </a>
      </div>

      <dl className="text-sm divide-y divide-slate-100">
        {[
          ["Type", enquiry.type],
          ["Product", enquiry.product],
          ["Quantity", enquiry.quantity],
          ["Location", enquiry.location],
          ["Phone", enquiry.phone],
          ["Email", enquiry.email],
        ].map(([term, value]) => (
          <div key={term} className="py-2 flex items-start justify-between gap-4">
            <dt className="text-slate-500">{term}</dt>
            <dd className="font-semibold text-slate-900 text-right break-all">{value}</dd>
          </div>
        ))}
      </dl>

      <div>
        <p className={adminLabelClass}>Message</p>
        <p className="p-3 rounded-xl bg-[#F5F7FC] border border-[#D9DFF0] text-sm text-slate-700 leading-relaxed">
          {enquiry.message}
        </p>
      </div>

      <div className="space-y-2">
        <p className={adminLabelClass}>Notes</p>
        {enquiry.notes.length === 0 ? (
          <p className="text-sm text-slate-400">No notes yet.</p>
        ) : (
          <ul className="space-y-1.5">
            {enquiry.notes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <StickyNote className="w-3.5 h-3.5 text-[#5160a3] mt-0.5 shrink-0" />
                {n}
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={addNote} className="space-y-2">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Add a note, e.g. called, sent price list…"
            aria-label="New note"
            className={adminInputClass}
          />
          <button type="submit" disabled={!note.trim()} className={adminButtonClass}>
            Add note
          </button>
        </form>
      </div>
    </div>
  );
}

export function EnquiriesBoard() {
  const { enquiries } = useAdmin();
  const [status, setStatus] = useState<EnquiryStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const visible = enquiries.filter(
    (e) =>
      (status === "all" || e.status === status) &&
      [e.organisation, e.name, e.product, e.location, e.id].some((v) => v.toLowerCase().includes(q))
  );
  const current = enquiries.find((e) => e.id === selected);

  return (
    <>
      <AdminPageHeader title="B2B Enquiries" subtitle="Distributor, dealer and bulk-order leads" />

      {/* Pipeline */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {(["all", ...ENQUIRY_STATUSES] as const).map((s) => {
          const count = s === "all" ? enquiries.length : enquiries.filter((e) => e.status === s).length;
          const active = status === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={active}
              className={`${panelClass} p-3 text-left transition-colors cursor-pointer ${
                active ? "border-[#5160a3] ring-2 ring-[#5160a3]/15" : "hover:border-[#5160a3]/50"
              }`}
            >
              <p className="text-xl sm:text-2xl font-black text-slate-900">{count}</p>
              <p className="text-xs font-semibold text-slate-500">{s === "all" ? "All" : s}</p>
            </button>
          );
        })}
      </div>

      <div className={`${panelClass} p-3 sm:p-4`}>
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search organisation, contact, product or location"
            aria-label="Search enquiries"
            className={`${adminInputClass} pl-9`}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-6 ${current ? "xl:grid-cols-[minmax(0,1fr)_360px]" : ""} items-start`}>
        <div className={`${panelClass} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead className="bg-[#F5F7FC] text-left text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Organisation</th>
                  <th className="px-4 py-3 font-bold">Type</th>
                  <th className="px-4 py-3 font-bold">Product · Qty</th>
                  <th className="px-4 py-3 font-bold">Location</th>
                  <th className="px-4 py-3 font-bold">Date</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                      No enquiries match.
                    </td>
                  </tr>
                )}
                {visible.map((e) => (
                  <tr
                    key={e.id}
                    onClick={() => setSelected(e.id)}
                    className={`cursor-pointer transition-colors ${selected === e.id ? "bg-[#EFF3FC]" : "hover:bg-[#F5F7FC]/60"}`}
                  >
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setSelected(e.id);
                        }}
                        className="font-bold text-slate-900 hover:text-[#5160a3] text-left cursor-pointer"
                      >
                        {e.organisation}
                      </button>
                      <p className="text-xs text-slate-500">{e.name}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{e.type}</td>
                    <td className="px-4 py-3">
                      <p className="text-slate-800">{e.product}</p>
                      <p className="text-xs text-slate-500">{e.quantity}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{e.location}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{e.date}</td>
                    <td className="px-4 py-3">
                      <Pill tone={STATUS_TONE[e.status]}>{e.status}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {current && <EnquiryDetail key={current.id} enquiry={current} onClose={() => setSelected(null)} />}
      </div>
    </>
  );
}
