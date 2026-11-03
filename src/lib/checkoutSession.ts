/**
 * Carries the checkout between /checkout → /payment → /order-confirmation in the demo build.
 * The backend will replace this with a real order + Razorpay order id; sessionStorage can be
 * unavailable (private mode), so every access is guarded and callers must handle `null`.
 */
import type { Address, PaymentMethodId, ShippingMethodId } from "@/constants/demo";

export interface CheckoutDraft {
  email: string;
  address: Address;
  gstin?: string;
  businessName?: string;
  shippingId: ShippingMethodId;
  notes?: string;
}

export interface PlacedOrder {
  id: string;
  placedAt: string;
  draft: CheckoutDraft;
  paymentId: PaymentMethodId;
  items: { productId: string; quantity: number }[];
}

const DRAFT_KEY = "ariviya-checkout-draft";
const ORDER_KEY = "ariviya-last-order";

function read<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked — the demo flow still works, the next page just shows sample data.
  }
}

export const saveCheckoutDraft = (draft: CheckoutDraft) => write(DRAFT_KEY, draft);
export const loadCheckoutDraft = () => read<CheckoutDraft>(DRAFT_KEY);

export const savePlacedOrder = (order: PlacedOrder) => write(ORDER_KEY, order);
export const loadPlacedOrder = () => read<PlacedOrder>(ORDER_KEY);

/** Demo order number; the backend will issue the real one */
export const newOrderId = () => `ARV-${Math.floor(10400 + Math.random() * 500)}`;
