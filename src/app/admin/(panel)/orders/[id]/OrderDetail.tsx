"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Tag,
  UserRound,
  MapPin,
  CreditCard,
  PackageCheck,
  Truck,
  CheckCircle2,
  XCircle,
  PackageSearch,
} from "lucide-react";
import { useAdmin, type OrderChange } from "@/context/AdminContext";
import { formatPrice } from "@/constants/products";
import {
  ORDER_STATUS_LABEL,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  orderProducts,
  orderTotals,
} from "@/constants/demo";
import { PAYMENT_STATUS_LABEL } from "@/constants/adminData";
import {
  AdminPageHeader,
  OrderStatusPill,
  PanelHeader,
  Pill,
  adminButtonClass,
  adminInputClass,
  adminLabelClass,
  adminSecondaryButtonClass,
  panelClass,
} from "@/components/admin/ui";
import { PAYMENT_TONE } from "../OrdersList";

const SHIPROCKET_COURIERS = ["Delhivery", "Xpressbees", "Ecom Express"];

const CANCEL_REASONS = [
  "Customer requested cancellation",
  "Out of stock",
  "Payment not received",
  "Address not serviceable",
  "Duplicate order",
];

const demoAwb = (prefix: string) =>
  `${prefix} ${Array.from({ length: 3 }, () => String(Math.floor(1000 + Math.random() * 9000))).join(" ")}`;

export function OrderDetail({ id }: { id: string }) {
  const { orders, updateOrder } = useAdmin();
  const order = orders.find((o) => o.id === id);

  const [note, setNote] = useState("");
  const [stAwb, setStAwb] = useState("");
  const [courier, setCourier] = useState(SHIPROCKET_COURIERS[0]);
  const [cancelling, setCancelling] = useState(false);
  const [cancelReason, setCancelReason] = useState(CANCEL_REASONS[0]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (!order) {
    return (
      <div className={`${panelClass} py-20 px-6 text-center space-y-3`}>
        <PackageSearch className="w-10 h-10 text-slate-300 mx-auto" />
        <p className="text-lg font-bold text-slate-900">Order not found</p>
        <p className="text-sm text-slate-500">No order with ID {id}.</p>
        <Link href="/admin/orders" className={adminSecondaryButtonClass}>
          <ArrowLeft className="w-4 h-4" />
          Back to orders
        </Link>
      </div>
    );
  }

  const items = orderProducts(order);
  const totals = orderTotals(order);
  const shipping = SHIPPING_METHODS.find((m) => m.id === order.shippingId);
  const payment = PAYMENT_METHODS.find((p) => p.id === order.paymentId);
  const isSt = order.shippingId === "st-courier";

  const apply = (change: OrderChange, message: string) => {
    updateOrder(order.id, { ...change, note: change.note ?? (note.trim() || undefined) });
    setNote("");
    setError("");
    setToast(message);
  };

  const ship = () => {
    if (isSt) {
      if (!stAwb.trim()) {
        setError("Enter the AWB number from the ST Courier booking slip.");
        return;
      }
      apply(
        { status: "shipped", awb: stAwb.trim().toUpperCase(), courierPartner: "ST Courier", note: note.trim() || "Booked at ST Courier, Vallam" },
        "Marked shipped with ST Courier"
      );
      setStAwb("");
    } else {
      const awb = demoAwb("SR");
      apply(
        { status: "shipped", awb, courierPartner: `${courier} via Shiprocket`, note: note.trim() || `Picked up by ${courier}` },
        `Shiprocket AWB ${awb} generated`
      );
    }
  };

  const cancel = () => {
    apply({ status: "cancelled", note: note.trim() ? `${cancelReason} — ${note.trim()}` : cancelReason }, "Order cancelled");
    setCancelling(false);
  };

  const canCancel = order.status === "placed" || order.status === "packed";

  return (
    <>
      <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5160a3] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        All orders
      </Link>

      <AdminPageHeader
        title={order.id}
        subtitle={`Placed ${order.date} · ${shipping?.label} via ${shipping?.carrier}`}
        actions={
          <>
            <OrderStatusPill status={order.status} />
            <button type="button" onClick={() => window.print()} className={adminSecondaryButtonClass}>
              <Printer className="w-4 h-4" />
              Print invoice
            </button>
            <button type="button" onClick={() => window.print()} className={adminSecondaryButtonClass}>
              <Tag className="w-4 h-4" />
              Print shipping label
            </button>
          </>
        }
      />

      {toast && (
        <div role="status" className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-700">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2 space-y-6">
          {/* Items */}
          <div className={`${panelClass} overflow-hidden`}>
            <PanelHeader title={`Items (${items.reduce((n, i) => n + i.quantity, 0)})`} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="bg-[#F5F7FC] text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-bold">Product</th>
                    <th className="px-3 py-3 font-bold">Pack</th>
                    <th className="px-3 py-3 font-bold text-right">Qty</th>
                    <th className="px-3 py-3 font-bold text-right">Unit price</th>
                    <th className="px-5 py-3 font-bold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map(({ product, pack, quantity }) => (
                    <tr key={`${product.id}|${pack.size}`}>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-lg bg-[#F5F7FC] p-1 flex items-center justify-center shrink-0">
                            <Image
                              src={product.image}
                              alt=""
                              width={36}
                              height={36}
                              style={{ width: "auto", height: "auto" }}
                              className="max-h-full max-w-full object-contain"
                            />
                          </span>
                          <span className="font-semibold text-slate-900">{product.name}</span>
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-700">{pack.size}</td>
                      <td className="px-3 py-3 text-right text-slate-700">{quantity}</td>
                      <td className="px-3 py-3 text-right text-slate-700">{formatPrice(pack.price)}</td>
                      <td className="px-5 py-3 text-right font-bold text-slate-900">{formatPrice(pack.price * quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <dl className="px-5 py-4 border-t border-slate-100 text-sm space-y-1.5 sm:max-w-xs sm:ml-auto">
              <div className="flex justify-between text-slate-600">
                <dt>Subtotal</dt>
                <dd>{formatPrice(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>Shipping</dt>
                <dd>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
              </div>
              {totals.codFee > 0 && (
                <div className="flex justify-between text-slate-600">
                  <dt>COD fee</dt>
                  <dd>{formatPrice(totals.codFee)}</dd>
                </div>
              )}
              <div className="flex justify-between text-slate-500 text-xs">
                <dt>GST included</dt>
                <dd>{formatPrice(totals.gstIncluded)}</dd>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 font-black text-slate-900">
                <dt>Total</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>
          </div>

          {/* Timeline */}
          <div className={panelClass}>
            <PanelHeader title="Tracking timeline" />
            <ol className="p-5 space-y-4">
              {order.timeline.map((event, i) => (
                <li key={`${event.status}-${i}`} className="flex gap-3">
                  <span
                    className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                      i === order.timeline.length - 1 ? "bg-[#5160a3]" : "bg-[#5160a3]/35"
                    }`}
                  />
                  <span className="text-sm">
                    <span className="block font-bold text-slate-900">{ORDER_STATUS_LABEL[event.status]}</span>
                    <span className="block text-xs text-slate-500">{event.date}</span>
                    {event.note && <span className="block text-xs text-slate-600 mt-0.5">{event.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          {/* Actions */}
          <div className={panelClass}>
            <PanelHeader title="Next step" />
            <div className="p-5 space-y-4">
              {["delivered", "cancelled", "return-requested", "returned"].includes(order.status) ? (
                <p className="text-sm text-slate-600">
                  This order is <strong className="text-slate-900">{ORDER_STATUS_LABEL[order.status].toLowerCase()}</strong>.
                  {order.status === "return-requested" && (
                    <>
                      {" "}
                      Handle it from{" "}
                      <Link href="/admin/returns" className="font-bold text-[#5160a3] hover:underline">
                        Returns
                      </Link>
                      .
                    </>
                  )}
                </p>
              ) : (
                <>
                  <div>
                    <label htmlFor="od-note" className={adminLabelClass}>
                      Note on timeline <span className="normal-case font-medium text-slate-400">(optional)</span>
                    </label>
                    <input
                      id="od-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Packed by Ravi, 2 boxes"
                      className={adminInputClass}
                    />
                  </div>

                  {order.status === "placed" && (
                    <button type="button" onClick={() => apply({ status: "packed" }, "Marked packed")} className={`${adminButtonClass} w-full`}>
                      <PackageCheck className="w-4 h-4" />
                      Mark packed
                    </button>
                  )}

                  {order.status === "packed" &&
                    (isSt ? (
                      <div className="space-y-2">
                        <label htmlFor="od-st-awb" className={adminLabelClass}>
                          ST Courier AWB
                        </label>
                        <input
                          id="od-st-awb"
                          value={stAwb}
                          onChange={(e) => {
                            setStAwb(e.target.value);
                            setError("");
                          }}
                          placeholder="From the Vallam branch booking slip"
                          className={adminInputClass}
                        />
                        <button type="button" onClick={ship} className={`${adminButtonClass} w-full`}>
                          <Truck className="w-4 h-4" />
                          Mark shipped
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label htmlFor="od-courier" className={adminLabelClass}>
                          Shiprocket courier
                        </label>
                        <select
                          id="od-courier"
                          value={courier}
                          onChange={(e) => setCourier(e.target.value)}
                          className={adminInputClass}
                        >
                          {SHIPROCKET_COURIERS.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                        <button type="button" onClick={ship} className={`${adminButtonClass} w-full`}>
                          <Truck className="w-4 h-4" />
                          Generate Shiprocket AWB
                        </button>
                      </div>
                    ))}

                  {order.status === "shipped" && (
                    <button
                      type="button"
                      onClick={() => apply({ status: "out-for-delivery" }, "Marked out for delivery")}
                      className={`${adminButtonClass} w-full`}
                    >
                      <Truck className="w-4 h-4" />
                      Out for delivery
                    </button>
                  )}

                  {order.status === "out-for-delivery" && (
                    <button
                      type="button"
                      onClick={() => apply({ status: "delivered" }, "Marked delivered")}
                      className={`${adminButtonClass} w-full`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark delivered
                    </button>
                  )}

                  {error && (
                    <p role="alert" className="text-sm font-semibold text-rose-600">
                      {error}
                    </p>
                  )}

                  {canCancel &&
                    (cancelling ? (
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        <label htmlFor="od-cancel" className={adminLabelClass}>
                          Cancel reason
                        </label>
                        <select
                          id="od-cancel"
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          className={adminInputClass}
                        >
                          {CANCEL_REASONS.map((r) => (
                            <option key={r}>{r}</option>
                          ))}
                        </select>
                        <p className="text-xs text-slate-500">
                          {order.paymentId === "cod"
                            ? "Cash on delivery — nothing to refund."
                            : "Refund the online payment from Razorpay after cancelling."}
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={cancel}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                          >
                            Confirm cancel
                          </button>
                          <button type="button" onClick={() => setCancelling(false)} className={`${adminSecondaryButtonClass} flex-1`}>
                            Keep order
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCancelling(true)}
                        className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel order
                      </button>
                    ))}
                </>
              )}
            </div>
          </div>

          {/* Customer */}
          <div className={panelClass}>
            <PanelHeader
              title="Customer"
              action={
                <Link
                  href={`/admin/customers?email=${encodeURIComponent(order.customer.email)}`}
                  className="text-xs font-bold text-[#5160a3] hover:underline"
                >
                  View customer
                </Link>
              }
            />
            <div className="p-5 text-sm space-y-1.5">
              <p className="flex items-center gap-2 font-bold text-slate-900">
                <UserRound className="w-4 h-4 text-[#5160a3]" />
                {order.customer.name}
                {order.customer.type === "Business" && <Pill>Business</Pill>}
              </p>
              {order.customer.businessName && <p className="text-slate-700">{order.customer.businessName}</p>}
              {order.customer.gstin && <p className="text-slate-500 text-xs">GSTIN {order.customer.gstin}</p>}
              <p className="text-slate-600 break-all">{order.customer.email}</p>
              <p className="text-slate-600">{order.customer.phone}</p>
            </div>
          </div>

          {/* Address */}
          <div className={panelClass}>
            <PanelHeader title="Delivery address" />
            <p className="p-5 text-sm text-slate-600 leading-relaxed flex gap-2">
              <MapPin className="w-4 h-4 text-[#5160a3] shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-900">{order.address.name}</strong>
                <br />
                {order.address.line1}
                {order.address.line2 && `, ${order.address.line2}`}
                <br />
                {order.address.city}, {order.address.state} – {order.address.pincode}
                <br />
                {order.address.phone}
              </span>
            </p>
            {(order.awb || order.courierPartner) && (
              <p className="px-5 pb-5 text-xs text-slate-500">
                {order.courierPartner}
                {order.awb && ` · AWB ${order.awb}`}
              </p>
            )}
          </div>

          {/* Payment */}
          <div className={panelClass}>
            <PanelHeader title="Payment" />
            <div className="p-5 text-sm space-y-2">
              <p className="flex items-center gap-2 text-slate-700">
                <CreditCard className="w-4 h-4 text-[#5160a3]" />
                {payment?.label}
                {order.paymentId !== "cod" && " via Razorpay"}
              </p>
              {order.razorpayId && <p className="text-xs text-slate-500 break-all">Razorpay ID {order.razorpayId}</p>}
              <Pill tone={PAYMENT_TONE[order.paymentStatus]}>{PAYMENT_STATUS_LABEL[order.paymentStatus]}</Pill>
              {order.paymentStatus === "cod-pending" && order.status === "delivered" && (
                <button
                  type="button"
                  onClick={() => apply({ paymentStatus: "cod-collected" }, "COD marked collected")}
                  className={`${adminSecondaryButtonClass} w-full mt-2`}
                >
                  Mark COD collected
                </button>
              )}
            </div>
          </div>

          {order.notes && (
            <div className={`${panelClass} p-5 text-sm text-slate-600`}>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Customer note</p>
              {order.notes}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
