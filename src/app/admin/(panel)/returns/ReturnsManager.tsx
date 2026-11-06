"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RotateCcw, X, CheckCircle2, XCircle, Truck, PackageCheck, Wallet } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { PRODUCTS, formatPrice } from "@/constants/products";
import { PAYMENT_METHODS, type OrderLine } from "@/constants/demo";
import { RETURN_STATUS_FLOW, type AdminReturn, type ReturnStatus } from "@/constants/adminData";
import {
  AdminPageHeader,
  PanelHeader,
  Pill,
  adminButtonClass,
  adminInputClass,
  adminLabelClass,
  adminSecondaryButtonClass,
  panelClass,
  type PillTone,
} from "@/components/admin/ui";

const STATUS_TONE: Record<ReturnStatus, PillTone> = {
  Requested: "amber",
  Approved: "brand",
  "Pickup scheduled": "brand",
  Received: "brand",
  Refunded: "green",
  Rejected: "slate",
};

const TABS: ("All" | ReturnStatus)[] = ["All", ...RETURN_STATUS_FLOW, "Rejected"];

const REJECT_REASONS = [
  "Outside the 7-day return window",
  "Product opened or used",
  "No damage found in photos",
  "Item not from this order",
];

/** Return lines with the product, pack and price used for the refund */
function returnLines(items: OrderLine[]) {
  return items.flatMap(({ productId, size, quantity }) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const pack = product?.packs.find((p) => p.size === size) ?? product?.packs[0];
    return product && pack ? [{ product, pack, quantity }] : [];
  });
}

const refundAmount = (r: AdminReturn) => returnLines(r.items).reduce((sum, l) => sum + l.pack.price * l.quantity, 0);

const demoReverseAwb = () => `SR-R ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;

export function ReturnsManager() {
  const { returns, orders, updateReturn, updateOrder } = useAdmin();
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState(REJECT_REASONS[0]);
  const [pickupAwb, setPickupAwb] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const visible = returns.filter((r) => tab === "All" || r.status === tab);
  const selected = returns.find((r) => r.id === selectedId) ?? null;
  const order = selected ? orders.find((o) => o.id === selected.orderId) : undefined;

  const select = (id: string) => {
    setSelectedId(id);
    setRejecting(false);
    setPickupAwb("");
  };

  const act = (patch: Partial<AdminReturn>, message: string) => {
    if (!selected) return;
    updateReturn(selected.id, patch);
    setRejecting(false);
    setToast(message);
  };

  const issueRefund = () => {
    if (!selected) return;
    const amount = formatPrice(refundAmount(selected));
    updateReturn(selected.id, { status: "Refunded" });
    updateOrder(selected.orderId, {
      status: "returned",
      paymentStatus: "refunded",
      note: `Refund of ${amount} issued (${selected.id})`,
    });
    setToast(`Refund of ${amount} issued`);
  };

  const detail = selected && (
    <div className={`${panelClass} overflow-hidden`}>
      <PanelHeader
        title={`${selected.id} · ${selected.status}`}
        action={
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            aria-label="Close return"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#F5F7FC] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        }
      />
      <div className="p-5 space-y-5 text-sm">
        <div className="space-y-1">
          <p className="text-slate-500">
            Order{" "}
            <Link href={`/admin/orders/${selected.orderId}`} className="font-bold text-[#5160a3] hover:underline">
              {selected.orderId}
            </Link>{" "}
            · {selected.customer}
          </p>
          <p className="text-slate-500">Raised {selected.date}</p>
        </div>

        <ul className="divide-y divide-slate-100 border border-[#D9DFF0] rounded-xl">
          {returnLines(selected.items).map(({ product, pack, quantity }) => (
            <li key={`${product.id}|${pack.size}`} className="px-3 py-2.5 flex items-center justify-between gap-3">
              <span className="text-slate-900 font-semibold">
                {product.name} <span className="font-normal text-slate-500">({pack.size}) × {quantity}</span>
              </span>
              <span className="font-bold text-slate-900">{formatPrice(pack.price * quantity)}</span>
            </li>
          ))}
          {selected.items.length === 0 && <li className="px-3 py-2.5 text-slate-500">Items to be confirmed with the customer</li>}
        </ul>

        <dl className="space-y-2">
          <div>
            <dt className={adminLabelClass}>Reason</dt>
            <dd className="text-slate-900 font-semibold">{selected.reason}</dd>
            {selected.details && <dd className="text-slate-600 mt-0.5">{selected.details}</dd>}
          </div>
          <div>
            <dt className={adminLabelClass}>Refund</dt>
            <dd className="text-slate-900">
              <strong>{formatPrice(refundAmount(selected))}</strong> to{" "}
              {selected.refundTo === "original"
                ? `original payment (${PAYMENT_METHODS.find((p) => p.id === order?.paymentId)?.label ?? "online"} via Razorpay)`
                : "customer's bank account / UPI"}
            </dd>
          </div>
          {selected.pickupAwb && (
            <div>
              <dt className={adminLabelClass}>Reverse pickup</dt>
              <dd className="text-slate-900">AWB {selected.pickupAwb}</dd>
            </div>
          )}
        </dl>

        {/* Next step */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          {selected.status === "Requested" &&
            (rejecting ? (
              <div className="space-y-2">
                <label htmlFor="rt-reject" className={adminLabelClass}>
                  Reject reason
                </label>
                <select
                  id="rt-reject"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className={adminInputClass}
                >
                  {REJECT_REASONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      act({ status: "Rejected", details: `Rejected: ${rejectReason}` }, "Return rejected")
                    }
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    Confirm reject
                  </button>
                  <button type="button" onClick={() => setRejecting(false)} className={`${adminSecondaryButtonClass} flex-1`}>
                    Back
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button type="button" onClick={() => act({ status: "Approved" }, "Return approved")} className={`${adminButtonClass} flex-1`}>
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
                <button type="button" onClick={() => setRejecting(true)} className={`${adminSecondaryButtonClass} flex-1`}>
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            ))}

          {selected.status === "Approved" && (
            <div className="space-y-2">
              <label htmlFor="rt-awb" className={adminLabelClass}>
                Reverse pickup AWB
              </label>
              <div className="flex gap-2">
                <input
                  id="rt-awb"
                  value={pickupAwb}
                  onChange={(e) => setPickupAwb(e.target.value)}
                  placeholder="Enter, or generate below"
                  className={adminInputClass}
                />
                <button type="button" onClick={() => setPickupAwb(demoReverseAwb())} className={`${adminSecondaryButtonClass} shrink-0`}>
                  Generate
                </button>
              </div>
              <button
                type="button"
                disabled={!pickupAwb.trim()}
                onClick={() => act({ status: "Pickup scheduled", pickupAwb: pickupAwb.trim().toUpperCase() }, "Shiprocket pickup scheduled")}
                className={`${adminButtonClass} w-full`}
              >
                <Truck className="w-4 h-4" />
                Schedule pickup
              </button>
            </div>
          )}

          {selected.status === "Pickup scheduled" && (
            <button type="button" onClick={() => act({ status: "Received" }, "Marked received at warehouse")} className={`${adminButtonClass} w-full`}>
              <PackageCheck className="w-4 h-4" />
              Mark received
            </button>
          )}

          {selected.status === "Received" && (
            <button type="button" onClick={issueRefund} className={`${adminButtonClass} w-full`}>
              <Wallet className="w-4 h-4" />
              Issue refund · {formatPrice(refundAmount(selected))}
            </button>
          )}

          {(selected.status === "Refunded" || selected.status === "Rejected") && (
            <p className="text-slate-600">
              This return is <strong className="text-slate-900">{selected.status.toLowerCase()}</strong>. No further steps.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AdminPageHeader title="Returns" subtitle="Approve, schedule Shiprocket reverse pickup and refund" />

      {toast && (
        <div role="status" className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-700">
          {toast}
        </div>
      )}

      <div className={`${panelClass} p-3 sm:p-4`}>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const count = returns.filter((r) => t === "All" || r.status === t).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  tab === t ? "bg-[#5160a3] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {t} <span className={tab === t ? "text-white/75" : "text-slate-400"}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
        <div className={`${panelClass} overflow-hidden ${selected ? "xl:col-span-3" : "xl:col-span-5"}`}>
          {visible.length === 0 ? (
            <div className="py-16 px-6 text-center space-y-2">
              <RotateCcw className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-base font-bold text-slate-800">No returns here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="bg-[#F5F7FC] text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-bold">Return</th>
                    <th className="px-3 py-3 font-bold">Customer</th>
                    <th className="px-3 py-3 font-bold">Reason</th>
                    <th className="px-3 py-3 font-bold text-right">Refund</th>
                    <th className="px-5 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visible.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => select(r.id)}
                      className={`cursor-pointer ${r.id === selectedId ? "bg-[#EFF3FC]" : "hover:bg-[#F5F7FC]/60"}`}
                    >
                      <td className="px-5 py-3">
                        <button type="button" className="font-bold text-[#5160a3] hover:underline cursor-pointer">
                          {r.id}
                        </button>
                        <span className="block text-xs text-slate-500">
                          {r.orderId} · {r.date}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-semibold text-slate-900">{r.customer}</td>
                      <td className="px-3 py-3 text-slate-600 max-w-56 truncate">{r.reason}</td>
                      <td className="px-3 py-3 text-right font-bold text-slate-900">{formatPrice(refundAmount(r))}</td>
                      <td className="px-5 py-3">
                        <Pill tone={STATUS_TONE[r.status]}>{r.status}</Pill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selected && <div className="xl:col-span-2 xl:sticky xl:top-24">{detail}</div>}
      </div>
    </>
  );
}
