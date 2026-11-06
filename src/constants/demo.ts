/**
 * Demo data for the client-review build. Everything here is placeholder content that the
 * backend (orders, customers, Razorpay, Shiprocket) will replace — nothing is persisted.
 */
import { PRODUCTS, type ProductItem, type ProductPack } from "@/constants/products";

// ---------------------------------------------------------------------------
// Shipping & payment
// ---------------------------------------------------------------------------

export type ShippingMethodId = "shiprocket-standard" | "shiprocket-express" | "st-courier";

export interface ShippingMethod {
  id: ShippingMethodId;
  label: string;
  carrier: string;
  eta: string;
  fee: number;
  note: string;
}

export const FREE_SHIPPING_THRESHOLD = 999;

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "shiprocket-standard",
    label: "Standard Delivery",
    carrier: "Shiprocket",
    eta: "4–7 working days",
    fee: 60,
    note: `Free on orders above ₹${FREE_SHIPPING_THRESHOLD}`,
  },
  {
    id: "shiprocket-express",
    label: "Express Delivery",
    carrier: "Shiprocket",
    eta: "2–3 working days",
    fee: 120,
    note: "Metro cities and major towns",
  },
  {
    id: "st-courier",
    label: "ST Courier",
    carrier: "ST Courier",
    eta: "3–5 working days",
    fee: 50,
    note: "Tamil Nadu & South India — booked by our team",
  },
];

export type PaymentMethodId = "upi" | "card" | "netbanking" | "wallet" | "cod";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  hint: string;
  fee: number;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm, BHIM", fee: 0 },
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay", fee: 0 },
  { id: "netbanking", label: "Net Banking", hint: "All major Indian banks", fee: 0 },
  { id: "wallet", label: "Wallets", hint: "Paytm, Mobikwik, Amazon Pay", fee: 0 },
  { id: "cod", label: "Cash on Delivery", hint: "Pay when the parcel arrives", fee: 40 },
];

export const GST_RATE = 0.18;

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  codFee: number;
  /** GST already included in product prices; shown for the invoice breakdown */
  gstIncluded: number;
  total: number;
}

export function computeTotals(
  subtotal: number,
  shippingId: ShippingMethodId = "shiprocket-standard",
  paymentId: PaymentMethodId = "upi"
): OrderTotals {
  const method = SHIPPING_METHODS.find((m) => m.id === shippingId) ?? SHIPPING_METHODS[0];
  const shipping =
    subtotal === 0 || (method.id === "shiprocket-standard" && subtotal >= FREE_SHIPPING_THRESHOLD)
      ? 0
      : method.fee;
  const codFee = PAYMENT_METHODS.find((p) => p.id === paymentId)?.fee ?? 0;
  const gstIncluded = Math.round(subtotal - subtotal / (1 + GST_RATE));
  return { subtotal, shipping, codFee, gstIncluded, total: subtotal + shipping + codFee };
}

// ---------------------------------------------------------------------------
// Customer & orders
// ---------------------------------------------------------------------------

export interface Address {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface SavedAddress {
  label: string;
  isDefault: boolean;
  address: Address;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  accountType: "Retail" | "Business";
  businessName?: string;
  gstin?: string;
  memberSince: string;
  addresses: SavedAddress[];
}

/** Sample returning customer, used when someone signs in on the demo build */
export const DEMO_CUSTOMER: CustomerProfile = {
  name: "Rajesh Kumar",
  email: "rajesh@murugandairy.in",
  phone: "+91 98765 43210",
  accountType: "Business",
  businessName: "Sri Murugan Dairy Farm",
  gstin: "33ABCDE1234F1Z5",
  memberSince: "March 2026",
  addresses: [
    {
      label: "Farm",
      isDefault: true,
      address: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        line1: "12, Pillaiyar Kovil Street",
        line2: "Near Panchayat Office, Vallam",
        city: "Thanjavur",
        state: "Tamil Nadu",
        pincode: "613403",
      },
    },
    {
      label: "Office",
      isDefault: false,
      address: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        line1: "45, Medical College Road",
        city: "Thanjavur",
        state: "Tamil Nadu",
        pincode: "613004",
      },
    },
  ],
};

export type OrderStatus =
  | "placed"
  | "packed"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"
  | "return-requested"
  | "returned";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Order placed",
  packed: "Packed",
  shipped: "Shipped",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  "return-requested": "Return requested",
  returned: "Returned",
};

/** Tailwind classes for status pills, kept within the site palette */
export const ORDER_STATUS_STYLE: Record<OrderStatus, string> = {
  placed: "bg-[#EFF3FC] text-[#5160a3] border-[#D9DFF0]",
  packed: "bg-[#EFF3FC] text-[#5160a3] border-[#D9DFF0]",
  shipped: "bg-amber-50 text-amber-700 border-amber-200",
  "out-for-delivery": "bg-amber-50 text-amber-700 border-amber-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-slate-100 text-slate-500 border-slate-200",
  "return-requested": "bg-rose-50 text-rose-600 border-rose-200",
  returned: "bg-slate-100 text-slate-600 border-slate-200",
};

/** Tracking steps shown on order timelines, in order */
export const TRACKING_STEPS: OrderStatus[] = [
  "placed",
  "packed",
  "shipped",
  "out-for-delivery",
  "delivered",
];

export interface OrderLine {
  productId: string;
  /** Pack size bought; older lines without one use the product's smallest pack */
  size?: string;
  quantity: number;
}

export interface TrackingEvent {
  status: OrderStatus;
  date: string;
  note?: string;
}

export interface DemoOrder {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderLine[];
  shippingId: ShippingMethodId;
  paymentId: PaymentMethodId;
  awb?: string;
  courierPartner?: string;
  address: Address;
  timeline: TrackingEvent[];
}

const farmAddress = DEMO_CUSTOMER.addresses[0].address;

export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: "ARV-10302",
    date: "31 Oct 2026",
    status: "packed",
    items: [
      { productId: "prod-farm-1", quantity: 6 },
      { productId: "prod-care-2", quantity: 2 },
    ],
    shippingId: "shiprocket-standard",
    paymentId: "upi",
    address: farmAddress,
    timeline: [
      { status: "placed", date: "31 Oct 2026, 10:42 AM" },
      { status: "packed", date: "01 Nov 2026, 04:15 PM", note: "Packed at Thanjavur facility" },
    ],
  },
  {
    id: "ARV-10248",
    date: "18 Oct 2026",
    status: "shipped",
    items: [
      { productId: "prod-pet-1", quantity: 2 },
      { productId: "prod-pet-5", quantity: 1 },
    ],
    shippingId: "st-courier",
    paymentId: "card",
    awb: "STC 4471 0928 31",
    courierPartner: "ST Courier",
    address: farmAddress,
    timeline: [
      { status: "placed", date: "18 Oct 2026, 09:10 AM" },
      { status: "packed", date: "18 Oct 2026, 05:30 PM" },
      { status: "shipped", date: "19 Oct 2026, 11:00 AM", note: "Handed to ST Courier, Thanjavur" },
    ],
  },
  {
    id: "ARV-10219",
    date: "02 Oct 2026",
    status: "delivered",
    items: [
      { productId: "prod-farm-1", quantity: 10 },
      { productId: "prod-care-1", quantity: 4 },
    ],
    shippingId: "shiprocket-express",
    paymentId: "netbanking",
    awb: "SR 1489 2203 7765",
    courierPartner: "Delhivery via Shiprocket",
    address: farmAddress,
    timeline: [
      { status: "placed", date: "02 Oct 2026, 08:20 AM" },
      { status: "packed", date: "02 Oct 2026, 03:00 PM" },
      { status: "shipped", date: "03 Oct 2026, 10:00 AM", note: "Picked up by Delhivery" },
      { status: "out-for-delivery", date: "05 Oct 2026, 09:15 AM" },
      { status: "delivered", date: "05 Oct 2026, 01:40 PM" },
    ],
  },
  {
    id: "ARV-10187",
    date: "14 Sep 2026",
    status: "return-requested",
    items: [{ productId: "prod-pet-2", quantity: 3 }],
    shippingId: "shiprocket-standard",
    paymentId: "upi",
    awb: "SR 1402 8819 0032",
    courierPartner: "Xpressbees via Shiprocket",
    address: farmAddress,
    timeline: [
      { status: "placed", date: "14 Sep 2026, 07:55 PM" },
      { status: "packed", date: "15 Sep 2026, 12:10 PM" },
      { status: "shipped", date: "15 Sep 2026, 06:00 PM" },
      { status: "delivered", date: "19 Sep 2026, 11:25 AM" },
      { status: "return-requested", date: "20 Sep 2026, 09:00 AM", note: "Damaged seal on 1 bottle" },
    ],
  },
];

export function orderProducts(
  order: DemoOrder
): { product: ProductItem; pack: ProductPack; quantity: number }[] {
  return order.items.flatMap(({ productId, size, quantity }) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const pack = product?.packs.find((p) => p.size === size) ?? product?.packs[0];
    return product && pack ? [{ product, pack, quantity }] : [];
  });
}

export function orderTotals(order: DemoOrder): OrderTotals {
  const subtotal = orderProducts(order).reduce(
    (sum, { pack, quantity }) => sum + pack.price * quantity,
    0
  );
  return computeTotals(subtotal, order.shippingId, order.paymentId);
}

export const RETURN_REASONS = [
  "Damaged or leaking product",
  "Wrong product delivered",
  "Missing item in the parcel",
  "Product expired or near expiry",
  "Other",
];

// ---------------------------------------------------------------------------
// Admin dashboard
// ---------------------------------------------------------------------------

export const ADMIN_KPIS = [
  { label: "Revenue (Oct)", value: "₹4,86,200", change: "+18%" },
  { label: "Orders (Oct)", value: "642", change: "+12%" },
  { label: "B2B enquiries", value: "38", change: "+9" },
  { label: "Pending dispatch", value: "27", change: "Today" },
];

export const ADMIN_MONTHLY_REVENUE = [
  { month: "May", value: 182000 },
  { month: "Jun", value: 214000 },
  { month: "Jul", value: 268000 },
  { month: "Aug", value: 301000 },
  { month: "Sep", value: 412000 },
  { month: "Oct", value: 486200 },
];

export const ADMIN_RECENT_ORDERS = [
  { id: "ARV-10311", customer: "Thanjavur Milk Union", type: "Business", amount: 38940, status: "placed" as OrderStatus, courier: "Shiprocket" },
  { id: "ARV-10309", customer: "Priya S.", type: "Retail", amount: 798, status: "packed" as OrderStatus, courier: "ST Courier" },
  { id: "ARV-10306", customer: "Kaveri Vet Clinic", type: "Business", amount: 6420, status: "shipped" as OrderStatus, courier: "Shiprocket" },
  { id: "ARV-10302", customer: "Sri Murugan Dairy Farm", type: "Business", amount: 4892, status: "packed" as OrderStatus, courier: "Shiprocket" },
  { id: "ARV-10297", customer: "Arun K.", type: "Retail", amount: 1148, status: "delivered" as OrderStatus, courier: "ST Courier" },
  { id: "ARV-10290", customer: "Happy Paws Pet Store", type: "Business", amount: 12680, status: "delivered" as OrderStatus, courier: "Shiprocket" },
];

export const ADMIN_STOCK = [
  { productId: "prod-farm-1", stock: 420, reorderAt: 200 },
  { productId: "prod-pet-1", stock: 86, reorderAt: 100 },
  { productId: "prod-pet-2", stock: 140, reorderAt: 80 },
  { productId: "prod-pet-3", stock: 34, reorderAt: 60 },
  { productId: "prod-pet-5", stock: 210, reorderAt: 80 },
  { productId: "prod-care-2", stock: 58, reorderAt: 60 },
];

export const ADMIN_ENQUIRIES = [
  { name: "Erode District Co-op", type: "Distributor", product: "MammaryO 20 L", date: "Today" },
  { name: "Dr. Meena R.", type: "Vet clinic", product: "Anima Spray", date: "Yesterday" },
  { name: "Green Feeds Agencies", type: "Dealer", product: "Full range", date: "30 Oct" },
  { name: "Salem Poultry Cluster", type: "Bulk order", product: "PetEnviron 5 L", date: "29 Oct" },
];

export const ADMIN_RETURNS = [
  { id: "RET-0042", orderId: "ARV-10187", customer: "Sri Murugan Dairy Farm", reason: "Damaged seal", status: "Pickup scheduled" },
  { id: "RET-0041", orderId: "ARV-10164", customer: "Lakshmi V.", reason: "Wrong product", status: "Awaiting review" },
];
