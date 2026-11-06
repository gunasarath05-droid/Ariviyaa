"use client";

import React, { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Phone } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { INDIAN_STATES, type Address, type SavedAddress } from "@/constants/demo";
import { cardClass, inputClass, labelClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/form";

const LABELS = ["Home", "Farm", "Office", "Clinic", "Shop"];

const EMPTY_ADDRESS: Address = { name: "", phone: "", line1: "", line2: "", city: "", state: "Tamil Nadu", pincode: "" };

type Editing = { index: number | null; draft: SavedAddress } | null;

// Rendered inside AccountShell, so a signed-in user is always present
export function AddressBook() {
  const { user, saveAddress, removeAddress } = useAccount();
  const [editing, setEditing] = useState<Editing>(null);
  const [error, setError] = useState("");

  if (!user) return null;
  const addresses = user.addresses;

  const startAdd = () => {
    setError("");
    setEditing({
      index: null,
      draft: {
        label: LABELS.find((l) => !addresses.some((a) => a.label === l)) ?? "Home",
        isDefault: addresses.length === 0,
        address: { ...EMPTY_ADDRESS, name: user.name, phone: user.phone },
      },
    });
  };

  const startEdit = (index: number) => {
    setError("");
    setEditing({ index, draft: addresses[index] });
  };

  const updateDraft = (patch: Partial<SavedAddress>) =>
    setEditing((prev) => (prev ? { ...prev, draft: { ...prev.draft, ...patch } } : prev));

  const updateField = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setEditing((prev) =>
      prev ? { ...prev, draft: { ...prev.draft, address: { ...prev.draft.address, [field]: e.target.value } } } : prev
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const { label, address } = editing.draft;
    if (!label.trim()) return setError("Give this address a name, e.g. Home or Farm.");
    if (!address.name.trim()) return setError("Enter the receiver's name.");
    if (address.phone.replace(/\D/g, "").slice(-10).length !== 10) return setError("Enter a 10-digit mobile number.");
    if (!address.line1.trim()) return setError("Enter the house / street address.");
    if (!address.city.trim()) return setError("Enter the city or town.");
    if (!/^\d{6}$/.test(address.pincode)) return setError("Enter a 6-digit pincode.");
    saveAddress(editing.index, { ...editing.draft, label: label.trim() });
    setEditing(null);
  };

  const form = editing && (
    <form onSubmit={submit} noValidate className={`${cardClass} p-5 sm:p-6 space-y-5`}>
      <h2 className="h-card text-slate-900">
        {editing.index === null ? "Add a new address" : `Edit ${addresses[editing.index]?.label} address`}
      </h2>

      <div>
        <span className={labelClass}>Save as</span>
        <div className="flex flex-wrap gap-2">
          {LABELS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => updateDraft({ label })}
              aria-pressed={editing.draft.label === label}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-bold transition-colors cursor-pointer ${
                editing.draft.label === label
                  ? "border-[#5160a3] bg-[#EFF3FC] text-[#5160a3]"
                  : "border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ad-name" className={labelClass}>
            Receiver&apos;s name
          </label>
          <input id="ad-name" autoComplete="name" value={editing.draft.address.name} onChange={updateField("name")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="ad-phone" className={labelClass}>
            Mobile number
          </label>
          <input id="ad-phone" type="tel" autoComplete="tel" value={editing.draft.address.phone} onChange={updateField("phone")} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ad-line1" className={labelClass}>
            House / street
          </label>
          <input id="ad-line1" autoComplete="address-line1" value={editing.draft.address.line1} onChange={updateField("line1")} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ad-line2" className={labelClass}>
            Area / landmark <span className="normal-case font-medium text-slate-400">(optional)</span>
          </label>
          <input id="ad-line2" autoComplete="address-line2" value={editing.draft.address.line2 ?? ""} onChange={updateField("line2")} className={inputClass} />
        </div>
        <div>
          <label htmlFor="ad-city" className={labelClass}>
            City / town
          </label>
          <input id="ad-city" autoComplete="address-level2" value={editing.draft.address.city} onChange={updateField("city")} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ad-state" className={labelClass}>
              State
            </label>
            <select id="ad-state" value={editing.draft.address.state} onChange={updateField("state")} className={inputClass}>
              {INDIAN_STATES.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ad-pin" className={labelClass}>
              Pincode
            </label>
            <input
              id="ad-pin"
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              value={editing.draft.address.pincode}
              onChange={updateField("pincode")}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 cursor-pointer">
        <input
          type="checkbox"
          checked={editing.draft.isDefault}
          onChange={(e) => updateDraft({ isDefault: e.target.checked })}
          className="w-4 h-4 accent-[#5160a3]"
        />
        Use as my default delivery address
      </label>

      {error && (
        <p role="alert" className="text-sm font-semibold text-rose-600">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className={primaryButtonClass}>
          Save address
        </button>
        <button type="button" onClick={() => setEditing(null)} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <>
      <div className={`${cardClass} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <h2 className="flex items-center gap-2 h-card text-slate-900">
            <MapPin className="w-5 h-5 text-[#5160a3]" />
            Saved addresses
          </h2>
          <p className="text-sm text-slate-500 mt-1">Used for faster checkout and return pickups.</p>
        </div>
        {!editing && (
          <button type="button" onClick={startAdd} className={`${primaryButtonClass} self-start sm:self-auto`}>
            <Plus className="w-4 h-4" />
            Add address
          </button>
        )}
      </div>

      {editing?.index === null && form}

      {addresses.length === 0 && !editing ? (
        <div className={`${cardClass} py-12 px-6 text-center text-sm text-slate-500`}>
          No saved addresses yet. Add one now, or it will be saved automatically at your first checkout.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((saved, index) =>
            editing?.index === index ? (
              <div key={saved.label + index} className="md:col-span-2">
                {form}
              </div>
            ) : (
              <div key={saved.label + index} className={`${cardClass} p-5 flex flex-col gap-3`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{saved.label}</span>
                    {saved.isDefault && (
                      <span className="px-2 py-0.5 rounded-full bg-[#5160a3] text-white text-xs font-bold">Default</span>
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(index)}
                      aria-label={`Edit ${saved.label} address`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#5160a3] hover:bg-[#F5F7FC] cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      aria-label={`Delete ${saved.label} address`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-[#F5F7FC] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{saved.address.name}</strong>
                  <br />
                  {saved.address.line1}
                  {saved.address.line2 && `, ${saved.address.line2}`}
                  <br />
                  {saved.address.city}, {saved.address.state} – {saved.address.pincode}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Phone className="w-3.5 h-3.5" />
                  {saved.address.phone}
                </p>
                {!saved.isDefault && (
                  <button
                    type="button"
                    onClick={() => saveAddress(index, { ...saved, isDefault: true })}
                    className="mt-auto self-start text-xs font-bold text-[#5160a3] hover:underline cursor-pointer"
                  >
                    Set as default
                  </button>
                )}
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
