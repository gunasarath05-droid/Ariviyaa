/**
 * Order changes made in the admin panel (status, courier, AWB) on the demo build.
 * Both the admin panel and the customer account read this, so a status set by the admin
 * shows in the customer's order history. The backend's order API replaces this file.
 */
import type { DemoOrder, OrderStatus, TrackingEvent } from "@/constants/demo";
import type { PaymentStatus } from "@/constants/adminData";

export interface OrderUpdate {
  status?: OrderStatus;
  awb?: string;
  courierPartner?: string;
  paymentStatus?: PaymentStatus;
  /** Tracking events added by the admin, oldest first */
  events: TrackingEvent[];
}

export type OrderUpdates = Record<string, OrderUpdate>;

export const ORDER_UPDATES_KEY = "ariviya-order-updates";

export function loadOrderUpdates(): OrderUpdates {
  try {
    return JSON.parse(localStorage.getItem(ORDER_UPDATES_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveOrderUpdates(updates: OrderUpdates) {
  try {
    localStorage.setItem(ORDER_UPDATES_KEY, JSON.stringify(updates));
  } catch {
    // Storage blocked — changes last for this page view only
  }
}

export function applyOrderUpdate<T extends DemoOrder>(order: T, update: OrderUpdate | undefined): T {
  if (!update) return order;
  return {
    ...order,
    status: update.status ?? order.status,
    awb: update.awb ?? order.awb,
    courierPartner: update.courierPartner ?? order.courierPartner,
    ...(update.paymentStatus ? { paymentStatus: update.paymentStatus } : {}),
    timeline: [...order.timeline, ...update.events],
  };
}

/** "06 Nov 2026, 02:15 PM" — the format used on order timelines */
export function timelineStamp(date = new Date()) {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
