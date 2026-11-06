"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Plus, X, Check, Package, AlertTriangle, PackageX, Hourglass, Trash2, Info } from "lucide-react";
import { PRODUCTS, formatPrice, type CategoryGroup, type ProductItem } from "@/constants/products";
import { useAdmin, type ProductOverride } from "@/context/AdminContext";
import {
  AdminPageHeader,
  Pill,
  panelClass,
  adminButtonClass,
  adminSecondaryButtonClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/ui";

const CATEGORIES: { id: CategoryGroup | "all"; label: string }[] = [
  { id: "all", label: "All categories" },
  { id: "farm", label: "Farm animals" },
  { id: "pet", label: "Pets" },
  { id: "poultry", label: "Poultry" },
  { id: "home", label: "Home care" },
  { id: "general", label: "General care" },
];

const categoryLabel = (group: CategoryGroup) => CATEGORIES.find((c) => c.id === group)?.label ?? group;

interface Row {
  product: ProductItem;
  packs: { size: string; price: number }[];
  stock: number;
  reorderAt: number;
  comingSoon: boolean;
  hidden: boolean;
  low: boolean;
}

function buildRow(
  product: ProductItem,
  override: ProductOverride | undefined,
  stockEntry: { stock: number; reorderAt: number } | undefined
): Row {
  const comingSoon = override?.comingSoon ?? Boolean(product.comingSoon);
  const stock = stockEntry?.stock ?? 0;
  const reorderAt = stockEntry?.reorderAt ?? 0;
  return {
    product,
    packs: product.packs.map((p) => ({ size: p.size, price: override?.prices?.[p.size] ?? p.price })),
    stock,
    reorderAt,
    comingSoon,
    hidden: Boolean(override?.hidden),
    low: !comingSoon && stock <= reorderAt,
  };
}

function StatusPill({ row }: { row: Row }) {
  if (row.hidden) return <Pill tone="slate">Hidden</Pill>;
  if (row.comingSoon) return <Pill tone="amber">Coming soon</Pill>;
  return <Pill tone="green">Live</Pill>;
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="flex items-start justify-between gap-3 p-3 rounded-xl border border-[#D9DFF0] cursor-pointer">
      <span>
        <span className="block text-sm font-bold text-slate-900">{label}</span>
        <span className="block text-xs text-slate-500">{hint}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 w-4 h-4 accent-[#5160a3]" />
    </label>
  );
}

function EditPanel({ row, onClose }: { row: Row; onClose: () => void }) {
  const { updateProduct, setStock } = useAdmin();
  const [prices, setPrices] = useState<Record<string, string>>(
    Object.fromEntries(row.packs.map((p) => [p.size, String(p.price)]))
  );
  const [stock, setStockValue] = useState(String(row.stock));
  const [reorderAt, setReorderAt] = useState(String(row.reorderAt));
  const [comingSoon, setComingSoon] = useState(row.comingSoon);
  const [hidden, setHidden] = useState(row.hidden);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Object.entries(prices).map(([size, v]) => [size, Number(v)] as const);
    if (parsed.some(([, v]) => !Number.isFinite(v) || v <= 0)) return setError("Every pack needs a price above ₹0.");
    const stockNum = Number(stock);
    const reorderNum = Number(reorderAt);
    if (!Number.isInteger(stockNum) || stockNum < 0) return setError("Stock must be a whole number, 0 or more.");
    if (!Number.isInteger(reorderNum) || reorderNum < 0) return setError("Reorder level must be a whole number, 0 or more.");
    setError("");
    updateProduct(row.product.id, { prices: Object.fromEntries(parsed), comingSoon, hidden });
    setStock(row.product.id, stockNum, reorderNum);
    setSaved(true);
  };

  return (
    <form onSubmit={save} noValidate className={`${panelClass} p-5 space-y-5 xl:sticky xl:top-24`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#F5F7FC] p-1.5 flex items-center justify-center shrink-0">
            <Image src={row.product.image} alt="" width={40} height={40} style={{ width: "auto", height: "auto" }} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{row.product.name}</p>
            <p className="text-xs text-slate-500">{categoryLabel(row.product.categoryGroup)}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close editor" className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <p className={adminLabelClass}>Price per pack (₹, GST included)</p>
        {row.packs.map((p) => (
          <div key={p.size} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm font-semibold text-slate-700">{p.size}</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              aria-label={`Price for ${p.size}`}
              value={prices[p.size]}
              onChange={(e) => {
                setPrices((prev) => ({ ...prev, [p.size]: e.target.value }));
                setSaved(false);
              }}
              className={adminInputClass}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="pm-stock" className={adminLabelClass}>
            Units in stock
          </label>
          <input
            id="pm-stock"
            type="number"
            min={0}
            value={stock}
            onChange={(e) => {
              setStockValue(e.target.value);
              setSaved(false);
            }}
            className={adminInputClass}
          />
        </div>
        <div>
          <label htmlFor="pm-reorder" className={adminLabelClass}>
            Reorder at
          </label>
          <input
            id="pm-reorder"
            type="number"
            min={0}
            value={reorderAt}
            onChange={(e) => {
              setReorderAt(e.target.value);
              setSaved(false);
            }}
            className={adminInputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Toggle
          checked={comingSoon}
          onChange={(v) => {
            setComingSoon(v);
            setSaved(false);
          }}
          label="Coming soon"
          hint="Shown in the shop but can't be added to cart"
        />
        <Toggle
          checked={hidden}
          onChange={(v) => {
            setHidden(v);
            setSaved(false);
          }}
          label="Hide from store"
          hint="Removed from shop listings and search"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-semibold text-rose-600">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="flex items-start gap-2 text-sm text-emerald-700">
          <Check className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            <strong>Saved.</strong> The live store picks up these changes once the backend is connected.
          </span>
        </p>
      )}

      <div className="flex gap-2">
        <button type="submit" className={adminButtonClass}>
          Save changes
        </button>
        <button type="button" onClick={onClose} className={adminSecondaryButtonClass}>
          Close
        </button>
      </div>
    </form>
  );
}

function AddProductPanel({ onClose }: { onClose: () => void }) {
  const [packs, setPacks] = useState([{ size: "", price: "" }]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className={`${panelClass} p-5 space-y-5 xl:sticky xl:top-24`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900">Add product</h2>
        <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="flex items-start gap-2 p-3 rounded-xl bg-[#EFF3FC] border border-[#D9DFF0] text-xs text-slate-600">
        <Info className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
        New products are created through the backend product API. This form shows the fields; nothing is added to the
        store yet.
      </p>

      <div>
        <label htmlFor="np-name" className={adminLabelClass}>
          Product name
        </label>
        <input id="np-name" required placeholder="e.g. Neostar Aqua" className={adminInputClass} />
      </div>
      <div>
        <label htmlFor="np-cat" className={adminLabelClass}>
          Category
        </label>
        <select id="np-cat" className={adminInputClass} defaultValue="farm">
          {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <p className={adminLabelClass}>Pack sizes & prices</p>
        {packs.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              aria-label={`Pack ${i + 1} size`}
              placeholder="Size, e.g. 1 L"
              value={p.size}
              onChange={(e) => setPacks((prev) => prev.map((x, j) => (j === i ? { ...x, size: e.target.value } : x)))}
              className={adminInputClass}
            />
            <input
              aria-label={`Pack ${i + 1} price`}
              type="number"
              min={1}
              placeholder="₹"
              value={p.price}
              onChange={(e) => setPacks((prev) => prev.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))}
              className={`${adminInputClass} max-w-28`}
            />
            {packs.length > 1 && (
              <button
                type="button"
                onClick={() => setPacks((prev) => prev.filter((_, j) => j !== i))}
                aria-label={`Remove pack ${i + 1}`}
                className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setPacks((prev) => [...prev, { size: "", price: "" }])}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#5160a3] hover:underline cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add pack size
        </button>
      </div>

      <div>
        <label htmlFor="np-stock" className={adminLabelClass}>
          Opening stock
        </label>
        <input id="np-stock" type="number" min={0} placeholder="0" className={adminInputClass} />
      </div>

      {submitted && (
        <p role="status" className="text-sm text-slate-600">
          Ready to send — this will be created once the backend product API is connected.
        </p>
      )}

      <div className="flex gap-2">
        <button type="submit" className={adminButtonClass}>
          Create product
        </button>
        <button type="button" onClick={onClose} className={adminSecondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export function ProductsManager() {
  const { productOverrides, stock } = useAdmin();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryGroup | "all">("all");
  const [lowOnly, setLowOnly] = useState(false);
  const [panel, setPanel] = useState<{ kind: "edit"; id: string } | { kind: "add" } | null>(null);

  const rows = PRODUCTS.map((p) => buildRow(p, productOverrides[p.id], stock[p.id]));
  const visible = rows.filter(
    (r) =>
      (category === "all" || r.product.categoryGroup === category) &&
      (!lowOnly || r.low) &&
      r.product.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const tiles = [
    { label: "Total products", value: rows.length, Icon: Package },
    { label: "Low stock", value: rows.filter((r) => r.low).length, Icon: AlertTriangle },
    { label: "Out of stock", value: rows.filter((r) => !r.comingSoon && r.stock === 0).length, Icon: PackageX },
    { label: "Coming soon", value: rows.filter((r) => r.comingSoon).length, Icon: Hourglass },
  ];

  const editing = panel?.kind === "edit" ? rows.find((r) => r.product.id === panel.id) : undefined;

  return (
    <>
      <AdminPageHeader
        title="Products & Stock"
        subtitle="Prices per pack, stock levels and store visibility"
        actions={
          <button type="button" onClick={() => setPanel({ kind: "add" })} className={adminButtonClass}>
            <Plus className="w-4 h-4" />
            Add product
          </button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map(({ label, value, Icon }) => (
          <div key={label} className={`${panelClass} p-4`}>
            <span className="w-9 h-9 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center">
              <Icon className="w-4.5 h-4.5" />
            </span>
            <p className="mt-3 text-2xl font-black text-slate-900">{value}</p>
            <p className="text-xs font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className={`${panelClass} p-3 sm:p-4 flex flex-col md:flex-row md:items-center gap-3`}>
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
            className={`${adminInputClass} pl-9`}
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryGroup | "all")}
          aria-label="Filter by category"
          className={`${adminInputClass} md:w-48`}
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer whitespace-nowrap">
          <input type="checkbox" checked={lowOnly} onChange={(e) => setLowOnly(e.target.checked)} className="w-4 h-4 accent-[#5160a3]" />
          Low stock only
        </label>
      </div>

      <div className={`grid grid-cols-1 gap-6 ${panel ? "xl:grid-cols-[minmax(0,1fr)_360px]" : ""} items-start`}>
        <div className={`${panelClass} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead className="bg-[#F5F7FC] text-left text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Product</th>
                  <th className="px-4 py-3 font-bold">Packs & prices</th>
                  <th className="px-4 py-3 font-bold">Stock</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                      No products match these filters.
                    </td>
                  </tr>
                )}
                {visible.map((row) => {
                  const selected = editing?.product.id === row.product.id;
                  return (
                    <tr
                      key={row.product.id}
                      onClick={() => setPanel({ kind: "edit", id: row.product.id })}
                      className={`cursor-pointer transition-colors ${selected ? "bg-[#EFF3FC]" : "hover:bg-[#F5F7FC]/60"}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-lg bg-[#F5F7FC] p-1 flex items-center justify-center shrink-0">
                            <Image src={row.product.image} alt="" width={36} height={36} style={{ width: "auto", height: "auto" }} className="max-h-full max-w-full object-contain" />
                          </div>
                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPanel({ kind: "edit", id: row.product.id });
                              }}
                              className="font-bold text-slate-900 hover:text-[#5160a3] text-left cursor-pointer"
                            >
                              {row.product.name}
                            </button>
                            <p className="text-xs text-slate-500">{categoryLabel(row.product.categoryGroup)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {row.packs.map((p) => (
                            <span key={p.size} className="px-2 py-0.5 rounded-md bg-[#F5F7FC] border border-[#D9DFF0] text-xs text-slate-700 whitespace-nowrap">
                              {p.size} · <strong>{formatPrice(p.price)}</strong>
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-bold text-slate-900">{row.stock}</span>
                        <span className="text-xs text-slate-400"> / reorder {row.reorderAt}</span>
                        {row.low && (
                          <span className="ml-2">
                            <Pill tone={row.stock === 0 ? "rose" : "amber"}>{row.stock === 0 ? "Out" : "Low"}</Pill>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill row={row} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {panel?.kind === "add" && <AddProductPanel onClose={() => setPanel(null)} />}
        {editing && <EditPanel key={editing.product.id} row={editing} onClose={() => setPanel(null)} />}
      </div>
    </>
  );
}
