"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Truck, PackageCheck, MapPin, Check } from "lucide-react";
import { formatPrice } from "@/constants/products";
import { SHIPPING_METHODS, orderTotals } from "@/constants/demo";
import type { AdminOrder } from "@/constants/adminData";
import { useAdmin } from "@/context/AdminContext";
import {
  AdminPageHeader,
  OrderStatusPill,
  PanelHeader,
  Pill,
  adminButtonClass,
  adminInputClass,
  adminLabelClass,
  panelClass,
} from "@/components/admin/ui";

// Demo courier allocation: the backend will use Shiprocket's courier recommendation API
const SHIPROCKET_PARTNERS = ["Delhivery via Shiprocket", "Xpressbees via Shiprocket", "Ecom Express via Shiprocket"];

const demoAwb = () =>
  `SR ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;

function OrderLine({ order, children }: { order: AdminOrder; children?: React.ReactNode }) {
  return (
    <li className="px-5 py-4 flex flex-col md:flex-row md:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/orders/${order.id}`} className="font-bold text-[#5160a3] hover:underline">
            {order.id}
          </Link>
          <OrderStatusPill status={order.status} />
          {order.paymentId === "cod" && <Pill tone="amber">COD</Pill>}
        </div>
        <p className="text-xs text-slate-500 mt-1 truncate">
          {order.customer.businessName ?? order.customer.name} · {order.address.city} {order.address.pincode} ·{" "}
          {formatPrice(orderTotals(order).total)}
        </p>
      </div>
      {children}
    </li>
  );
}

export function ShippingDesk() {
  const { orders, updateOrder, settings, updateSettings } = useAdmin();
  const [stAwbs, setStAwbs] = useState<Record<string, string>>({});
  const [threshold, setThreshold] = useState(String(settings.freeShippingAbove));
  const [pickup, setPickup] = useState(settings.shiprocketPickup);
  const [branch, setBranch] = useState(settings.stCourierBranch);
  const [saved, setSaved] = useState("");

  const packed = orders.filter((o) => o.status === "packed");
  const shiprocketQueue = packed.filter((o) => o.shippingId !== "st-courier");
  const stQueue = packed.filter((o) => o.shippingId === "st-courier");
  const inTransit = orders.filter((o) => o.status === "shipped" || o.status === "out-for-delivery");
  const placed = orders.filter((o) => o.status === "placed");

  const flash = (message: string) => {
    setSaved(message);
    window.setTimeout(() => setSaved(""), 2500);
  };

  const generateAwb = (order: AdminOrder, index: number) =>
    updateOrder(order.id, {
      status: "shipped",
      awb: demoAwb(),
      courierPartner: SHIPROCKET_PARTNERS[index % SHIPROCKET_PARTNERS.length],
      note: "AWB generated on Shiprocket; pickup requested",
    });

  const shipSt = (order: AdminOrder) => {
    const awb = (stAwbs[order.id] ?? "").trim();
    if (!awb) return;
    updateOrder(order.id, {
      status: "shipped",
      awb,
      courierPartner: "ST Courier",
      note: `Booked at ${settings.stCourierBranch}`,
    });
  };

  const saveRates = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(threshold);
    if (!Number.isFinite(value) || value < 0) return;
    updateSettings({ freeShippingAbove: Math.round(value) });
    flash("Free shipping threshold saved");
  };

  const savePickup = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ shiprocketPickup: pickup.trim(), stCourierBranch: branch.trim() });
    flash("Pickup details saved");
  };

  return (
    <>
      <AdminPageHeader
        title="Shipping"
        subtitle="Dispatch packed orders through Shiprocket or ST Courier"
        actions={saved ? <Pill tone="green">{saved}</Pill> : undefined}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Waiting to pack", value: placed.length },
          { label: "Shiprocket queue", value: shiprocketQueue.length },
          { label: "ST Courier queue", value: stQueue.length },
          { label: "In transit", value: inTransit.length },
        ].map((t) => (
          <div key={t.label} className={`${panelClass} p-4 sm:p-5`}>
            <p className="text-2xl font-black text-slate-900">{t.value}</p>
            <p className="text-xs font-semibold text-slate-500">{t.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Shiprocket */}
        <div className={`${panelClass} overflow-hidden`}>
          <PanelHeader title="Shiprocket — ready to ship" action={<Pill>{shiprocketQueue.length}</Pill>} />
          {shiprocketQueue.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">No packed orders for Shiprocket.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {shiprocketQueue.map((o, i) => (
                <OrderLine key={o.id} order={o}>
                  <button type="button" onClick={() => generateAwb(o, i)} className={`${adminButtonClass} shrink-0`}>
                    <Truck className="w-4 h-4" />
                    Generate AWB
                  </button>
                </OrderLine>
              ))}
            </ul>
          )}
        </div>

        {/* ST Courier */}
        <div className={`${panelClass} overflow-hidden`}>
          <PanelHeader title="ST Courier — book at branch" action={<Pill>{stQueue.length}</Pill>} />
          <p className="px-5 pt-3 text-xs text-slate-500">
            Book the parcel at {settings.stCourierBranch}, then enter the AWB from the receipt.
          </p>
          {stQueue.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">No packed orders for ST Courier.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {stQueue.map((o) => (
                <OrderLine key={o.id} order={o}>
                  <div className="flex gap-2 w-full md:w-auto">
                    <input
                      aria-label={`ST Courier AWB for ${o.id}`}
                      placeholder="AWB number"
                      value={stAwbs[o.id] ?? ""}
                      onChange={(e) => setStAwbs((prev) => ({ ...prev, [o.id]: e.target.value.toUpperCase() }))}
                      className={`${adminInputClass} md:w-40`}
                    />
                    <button
                      type="button"
                      onClick={() => shipSt(o)}
                      disabled={!(stAwbs[o.id] ?? "").trim()}
                      className={`${adminButtonClass} shrink-0`}
                    >
                      <Check className="w-4 h-4" />
                      Save & ship
                    </button>
                  </div>
                </OrderLine>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* In transit */}
      <div className={`${panelClass} overflow-hidden`}>
        <PanelHeader title="In transit" action={<Pill>{inTransit.length}</Pill>} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-[#F5F7FC]">
                <th className="px-5 py-2.5 font-bold">Order</th>
                <th className="px-5 py-2.5 font-bold">Courier</th>
                <th className="px-5 py-2.5 font-bold">AWB</th>
                <th className="px-5 py-2.5 font-bold">Destination</th>
                <th className="px-5 py-2.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inTransit.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    Nothing in transit right now.
                  </td>
                </tr>
              ) : (
                inTransit.map((o) => (
                  <tr key={o.id}>
                    <td className="px-5 py-3">
                      <Link href={`/admin/orders/${o.id}`} className="font-bold text-[#5160a3] hover:underline">
                        {o.id}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{o.courierPartner ?? "—"}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-700">{o.awb ?? "—"}</td>
                    <td className="px-5 py-3 text-slate-600">
                      {o.address.city}, {o.address.pincode}
                    </td>
                    <td className="px-5 py-3">
                      <OrderStatusPill status={o.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Rates */}
        <form onSubmit={saveRates} className={`${panelClass} overflow-hidden`}>
          <PanelHeader title="Delivery rates" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-[#F5F7FC]">
                  <th className="px-5 py-2.5 font-bold">Method</th>
                  <th className="px-5 py-2.5 font-bold">Carrier</th>
                  <th className="px-5 py-2.5 font-bold">Delivery time</th>
                  <th className="px-5 py-2.5 font-bold text-right">Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SHIPPING_METHODS.map((m) => (
                  <tr key={m.id}>
                    <td className="px-5 py-3 font-semibold text-slate-900">{m.label}</td>
                    <td className="px-5 py-3 text-slate-600">{m.carrier}</td>
                    <td className="px-5 py-3 text-slate-600">{m.eta}</td>
                    <td className="px-5 py-3 text-right font-bold text-slate-900">{formatPrice(m.fee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1">
              <label htmlFor="sh-free" className={adminLabelClass}>
                Free standard delivery above (₹)
              </label>
              <input
                id="sh-free"
                type="number"
                min={0}
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className={adminInputClass}
              />
            </div>
            <button type="submit" className={adminButtonClass}>
              Save
            </button>
          </div>
        </form>

        {/* Pickup */}
        <form onSubmit={savePickup} className={`${panelClass} overflow-hidden`}>
          <PanelHeader title="Pickup details" />
          <div className="p-5 space-y-4">
            <div>
              <label htmlFor="sh-pickup" className={adminLabelClass}>
                Shiprocket pickup address
              </label>
              <textarea
                id="sh-pickup"
                rows={2}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className={adminInputClass}
              />
            </div>
            <div>
              <label htmlFor="sh-branch" className={adminLabelClass}>
                ST Courier branch
              </label>
              <input id="sh-branch" value={branch} onChange={(e) => setBranch(e.target.value)} className={adminInputClass} />
            </div>
            <p className="flex items-start gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#5160a3] shrink-0 mt-0.5" />
              The pickup address must match the one registered in your Shiprocket account.
            </p>
            <button type="submit" className={adminButtonClass}>
              <PackageCheck className="w-4 h-4" />
              Save pickup details
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
