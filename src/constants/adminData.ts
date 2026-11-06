/**
 * Seed data for the demo admin panel. The backend will serve all of this from the database;
 * until then the admin store (context/AdminContext) copies it into localStorage on first load.
 */
import type { Address, DemoOrder, OrderLine, PaymentMethodId, ShippingMethodId, TrackingEvent } from "@/constants/demo";

// ---------------------------------------------------------------------------
// Admin users & roles
// ---------------------------------------------------------------------------

export type AdminRole = "Owner" | "Operations" | "Support";

export interface AdminUser {
  email: string;
  name: string;
  role: AdminRole;
}

/**
 * Demo sign-in accepts these emails with any password of 8+ characters; the backend will
 * verify hashed passwords and issue an httpOnly session cookie instead.
 */
export const ADMIN_USERS: AdminUser[] = [
  { email: "admin@ariviyaa.com", name: "Dr. M. Sivakumar", role: "Owner" },
  { email: "ops@ariviyaa.com", name: "Operations Desk", role: "Operations" },
  { email: "support@ariviyaa.com", name: "Customer Support", role: "Support" },
];

export type AdminSection =
  | "dashboard"
  | "orders"
  | "returns"
  | "products"
  | "customers"
  | "enquiries"
  | "shipping"
  | "payments"
  | "settings";

/** Which admin sections each role can open */
export const ROLE_ACCESS: Record<AdminRole, AdminSection[]> = {
  Owner: ["dashboard", "orders", "returns", "products", "customers", "enquiries", "shipping", "payments", "settings"],
  Operations: ["dashboard", "orders", "returns", "products", "shipping"],
  Support: ["dashboard", "orders", "returns", "customers", "enquiries"],
};

/** Signed-in admins are logged out after this much inactivity */
export const ADMIN_IDLE_TIMEOUT_MINUTES = 30;
/** Failed sign-ins before the form locks for a short while */
export const ADMIN_MAX_ATTEMPTS = 5;
export const ADMIN_LOCK_SECONDS = 60;

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export type PaymentStatus = "paid" | "cod-pending" | "cod-collected" | "refunded" | "failed";

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: "Paid",
  "cod-pending": "COD – to collect",
  "cod-collected": "COD – collected",
  refunded: "Refunded",
  failed: "Failed",
};

export interface AdminCustomerRef {
  name: string;
  email: string;
  phone: string;
  type: "Retail" | "Business";
  businessName?: string;
  gstin?: string;
}

export interface AdminOrder extends DemoOrder {
  customer: AdminCustomerRef;
  paymentStatus: PaymentStatus;
  /** Razorpay payment id for online payments */
  razorpayId?: string;
  notes?: string;
}

const addr = (name: string, phone: string, line1: string, city: string, pincode: string, state = "Tamil Nadu"): Address => ({
  name,
  phone,
  line1,
  city,
  state,
  pincode,
});

const ev = (status: TrackingEvent["status"], date: string, note?: string): TrackingEvent => ({ status, date, note });

const order = (
  id: string,
  date: string,
  customer: AdminCustomerRef,
  items: OrderLine[],
  shippingId: ShippingMethodId,
  paymentId: PaymentMethodId,
  status: AdminOrder["status"],
  timeline: TrackingEvent[],
  address: Address,
  extra: Partial<AdminOrder> = {}
): AdminOrder => ({
  id,
  date,
  customer,
  items,
  shippingId,
  paymentId,
  status,
  timeline,
  address,
  paymentStatus: paymentId === "cod" ? "cod-pending" : "paid",
  razorpayId: paymentId === "cod" ? undefined : `pay_${id.replace("ARV-", "Q")}xT${id.slice(-2)}`,
  ...extra,
});

const MILK_UNION: AdminCustomerRef = {
  name: "K. Senthil",
  email: "purchase@tnjmilkunion.in",
  phone: "+91 94430 11223",
  type: "Business",
  businessName: "Thanjavur Milk Union",
  gstin: "33AAACT1234K1Z2",
};
const KAVERI_VET: AdminCustomerRef = {
  name: "Dr. Meena R.",
  email: "kaverivet@gmail.com",
  phone: "+91 98422 55110",
  type: "Business",
  businessName: "Kaveri Vet Clinic",
  gstin: "33BBBPK5678L1Z9",
};
const HAPPY_PAWS: AdminCustomerRef = {
  name: "Arjun Prakash",
  email: "orders@happypaws.in",
  phone: "+91 90031 77881",
  type: "Business",
  businessName: "Happy Paws Pet Store",
};
const MURUGAN: AdminCustomerRef = {
  name: "Rajesh Kumar",
  email: "rajesh@murugandairy.in",
  phone: "+91 98765 43210",
  type: "Business",
  businessName: "Sri Murugan Dairy Farm",
  gstin: "33ABCDE1234F1Z5",
};
const PRIYA: AdminCustomerRef = { name: "Priya S.", email: "priya.s@gmail.com", phone: "+91 99400 12345", type: "Retail" };
const ARUN: AdminCustomerRef = { name: "Arun K.", email: "arunk@yahoo.com", phone: "+91 97890 44556", type: "Retail" };
const SELVI: AdminCustomerRef = { name: "Selvi M.", email: "selvi.m@gmail.com", phone: "+91 96260 33221", type: "Retail" };
const LAKSHMI: AdminCustomerRef = { name: "Lakshmi V.", email: "lakshmiv@gmail.com", phone: "+91 98940 66778", type: "Retail" };

export const ADMIN_SEED_ORDERS: AdminOrder[] = [
  order(
    "ARV-10311",
    "03 Nov 2026",
    MILK_UNION,
    [
      { productId: "prod-farm-1", size: "20 L", quantity: 3 },
      { productId: "prod-farm-2", size: "5 L", quantity: 4 },
    ],
    "shiprocket-standard",
    "netbanking",
    "placed",
    [ev("placed", "03 Nov 2026, 09:12 AM")],
    addr("K. Senthil", "+91 94430 11223", "Milk Union Office, Medical College Road", "Thanjavur", "613004"),
    { notes: "Deliver before 11 AM; unloading at Gate 2." }
  ),
  order(
    "ARV-10309",
    "02 Nov 2026",
    PRIYA,
    [{ productId: "prod-pet-2", size: "200 mL", quantity: 2 }],
    "st-courier",
    "upi",
    "packed",
    [ev("placed", "02 Nov 2026, 07:40 PM"), ev("packed", "03 Nov 2026, 10:05 AM")],
    addr("Priya S.", "+91 99400 12345", "14, Nehru Nagar 2nd Street", "Kumbakonam", "612001")
  ),
  order(
    "ARV-10306",
    "01 Nov 2026",
    KAVERI_VET,
    [
      { productId: "prod-pet-1", size: "200 mL", quantity: 6 },
      { productId: "prod-pet-3", size: "200 mL", quantity: 6 },
      { productId: "prod-care-2", size: "5 L", quantity: 1 },
    ],
    "shiprocket-express",
    "card",
    "shipped",
    [
      ev("placed", "01 Nov 2026, 11:30 AM"),
      ev("packed", "01 Nov 2026, 05:10 PM"),
      ev("shipped", "02 Nov 2026, 10:00 AM", "Picked up by Delhivery"),
    ],
    addr("Dr. Meena R.", "+91 98422 55110", "22, Gandhi Road", "Tiruchirappalli", "620001"),
    { awb: "SR 1520 8841 2201", courierPartner: "Delhivery via Shiprocket" }
  ),
  order(
    "ARV-10304",
    "31 Oct 2026",
    SELVI,
    [
      { productId: "prod-care-1", size: "950 mL", quantity: 2 },
      { productId: "prod-care-3", size: "450 mL", quantity: 3 },
    ],
    "st-courier",
    "cod",
    "packed",
    [ev("placed", "31 Oct 2026, 06:15 PM"), ev("packed", "01 Nov 2026, 12:20 PM")],
    addr("Selvi M.", "+91 96260 33221", "5/12, Big Street, Vallam", "Thanjavur", "613403")
  ),
  order(
    "ARV-10297",
    "28 Oct 2026",
    ARUN,
    [
      { productId: "prod-pet-5", size: "200 mL", quantity: 2 },
      { productId: "prod-pet-4", size: "100 mL", quantity: 2 },
    ],
    "st-courier",
    "upi",
    "delivered",
    [
      ev("placed", "28 Oct 2026, 08:00 AM"),
      ev("packed", "28 Oct 2026, 03:00 PM"),
      ev("shipped", "29 Oct 2026, 10:30 AM", "Booked at ST Courier, Vallam"),
      ev("out-for-delivery", "31 Oct 2026, 09:00 AM"),
      ev("delivered", "31 Oct 2026, 01:15 PM"),
    ],
    addr("Arun K.", "+91 97890 44556", "8, Anna Salai", "Pudukkottai", "622001"),
    { awb: "STC 4479 1180 02", courierPartner: "ST Courier" }
  ),
  order(
    "ARV-10290",
    "25 Oct 2026",
    HAPPY_PAWS,
    [
      { productId: "prod-pet-2", size: "200 mL", quantity: 12 },
      { productId: "prod-pet-1", size: "100 mL", quantity: 12 },
      { productId: "prod-pet-5", size: "100 mL", quantity: 12 },
    ],
    "shiprocket-standard",
    "netbanking",
    "delivered",
    [
      ev("placed", "25 Oct 2026, 12:45 PM"),
      ev("packed", "26 Oct 2026, 11:00 AM"),
      ev("shipped", "26 Oct 2026, 05:30 PM", "Picked up by Xpressbees"),
      ev("out-for-delivery", "29 Oct 2026, 09:20 AM"),
      ev("delivered", "29 Oct 2026, 02:10 PM"),
    ],
    addr("Arjun Prakash", "+91 90031 77881", "Shop 3, RS Puram Main Road", "Coimbatore", "641002"),
    { awb: "SR 1498 3302 7710", courierPartner: "Xpressbees via Shiprocket" }
  ),
  order(
    "ARV-10164",
    "12 Oct 2026",
    LAKSHMI,
    [{ productId: "prod-pet-3", size: "100 mL", quantity: 2 }],
    "shiprocket-standard",
    "upi",
    "return-requested",
    [
      ev("placed", "12 Oct 2026, 04:00 PM"),
      ev("packed", "13 Oct 2026, 11:00 AM"),
      ev("shipped", "13 Oct 2026, 06:00 PM"),
      ev("delivered", "16 Oct 2026, 12:40 PM"),
      ev("return-requested", "17 Oct 2026, 10:15 AM", "Wrong product delivered"),
    ],
    addr("Lakshmi V.", "+91 98940 66778", "21, Lake View Road", "Madurai", "625001"),
    { awb: "SR 1455 9087 1123", courierPartner: "Ecom Express via Shiprocket" }
  ),
  order(
    "ARV-10302",
    "31 Oct 2026",
    MURUGAN,
    [
      { productId: "prod-farm-1", size: "1 L", quantity: 6 },
      { productId: "prod-care-2", size: "500 mL", quantity: 2 },
    ],
    "shiprocket-standard",
    "upi",
    "packed",
    [ev("placed", "31 Oct 2026, 10:42 AM"), ev("packed", "01 Nov 2026, 04:15 PM", "Packed at Thanjavur facility")],
    addr("Rajesh Kumar", "+91 98765 43210", "12, Pillaiyar Kovil Street", "Thanjavur", "613403")
  ),
];

// ---------------------------------------------------------------------------
// Returns
// ---------------------------------------------------------------------------

export type ReturnStatus = "Requested" | "Approved" | "Pickup scheduled" | "Received" | "Refunded" | "Rejected";

export const RETURN_STATUS_FLOW: ReturnStatus[] = ["Requested", "Approved", "Pickup scheduled", "Received", "Refunded"];

export interface AdminReturn {
  id: string;
  orderId: string;
  customer: string;
  date: string;
  items: OrderLine[];
  reason: string;
  details?: string;
  refundTo: "original" | "bank";
  status: ReturnStatus;
  pickupAwb?: string;
}

export const ADMIN_SEED_RETURNS: AdminReturn[] = [
  {
    id: "RET-0042",
    orderId: "ARV-10187",
    customer: "Sri Murugan Dairy Farm",
    date: "20 Sep 2026",
    items: [{ productId: "prod-pet-2", quantity: 1 }],
    reason: "Damaged or leaking product",
    details: "Seal broken on one bottle; photo attached.",
    refundTo: "original",
    status: "Pickup scheduled",
    pickupAwb: "SR-R 2201 4410",
  },
  {
    id: "RET-0041",
    orderId: "ARV-10164",
    customer: "Lakshmi V.",
    date: "17 Oct 2026",
    items: [{ productId: "prod-pet-3", size: "100 mL", quantity: 2 }],
    reason: "Wrong product delivered",
    details: "Ordered OtoSpray, received Dermisward.",
    refundTo: "original",
    status: "Requested",
  },
];

// ---------------------------------------------------------------------------
// B2B enquiries
// ---------------------------------------------------------------------------

export type EnquiryStatus = "New" | "Contacted" | "Quoted" | "Won" | "Lost";

export const ENQUIRY_STATUSES: EnquiryStatus[] = ["New", "Contacted", "Quoted", "Won", "Lost"];

export interface AdminEnquiry {
  id: string;
  name: string;
  organisation: string;
  type: "Distributor" | "Dealer" | "Vet clinic" | "Dairy co-op" | "Bulk order";
  phone: string;
  email: string;
  location: string;
  product: string;
  quantity: string;
  message: string;
  date: string;
  status: EnquiryStatus;
  notes: string[];
}

export const ADMIN_SEED_ENQUIRIES: AdminEnquiry[] = [
  {
    id: "ENQ-118",
    name: "P. Ramasamy",
    organisation: "Erode District Co-op Milk Producers",
    type: "Dairy co-op",
    phone: "+91 94860 22113",
    email: "erodecoop@gmail.com",
    location: "Erode",
    product: "MammaryO 20 L",
    quantity: "40 cans / month",
    message: "Looking for monthly supply for 120 member societies. Need dealer price and trial results.",
    date: "06 Nov 2026",
    status: "New",
    notes: [],
  },
  {
    id: "ENQ-117",
    name: "Dr. Meena R.",
    organisation: "Kaveri Vet Clinic",
    type: "Vet clinic",
    phone: "+91 98422 55110",
    email: "kaverivet@gmail.com",
    location: "Tiruchirappalli",
    product: "Anima Spray, Dermisward",
    quantity: "24 units each",
    message: "Want clinic pricing and a display stand.",
    date: "05 Nov 2026",
    status: "Contacted",
    notes: ["Called on 05 Nov — sending clinic price list."],
  },
  {
    id: "ENQ-116",
    name: "S. Ganesan",
    organisation: "Green Feeds Agencies",
    type: "Dealer",
    phone: "+91 90950 33442",
    email: "greenfeeds.agencies@gmail.com",
    location: "Salem",
    product: "Full range",
    quantity: "Opening stock",
    message: "Existing cattle feed dealer, interested in adding Ariviyaa range for 3 taluks.",
    date: "30 Oct 2026",
    status: "Quoted",
    notes: ["Quote sent with 20% dealer margin.", "Follow up on 08 Nov."],
  },
  {
    id: "ENQ-115",
    name: "M. Basheer",
    organisation: "Salem Poultry Cluster",
    type: "Bulk order",
    phone: "+91 97510 88990",
    email: "salempoultry@gmail.com",
    location: "Namakkal",
    product: "Neostar PB 25 L",
    quantity: "20 cans",
    message: "When will Neostar be available? Want to book early.",
    date: "29 Oct 2026",
    status: "New",
    notes: [],
  },
  {
    id: "ENQ-112",
    name: "R. Vijay",
    organisation: "VJ Pet Distributors",
    type: "Distributor",
    phone: "+91 98845 12090",
    email: "vjpets@gmail.com",
    location: "Chennai",
    product: "Pet range",
    quantity: "Distribution for Chennai",
    message: "Distributor for 60 pet shops in Chennai.",
    date: "21 Oct 2026",
    status: "Won",
    notes: ["Agreement signed 28 Oct."],
  },
];

// ---------------------------------------------------------------------------
// Inventory
// ---------------------------------------------------------------------------

/** Units on hand per product (all pack sizes together) and the reorder level */
export const ADMIN_SEED_STOCK: Record<string, { stock: number; reorderAt: number }> = {
  "prod-farm-1": { stock: 420, reorderAt: 200 },
  "prod-farm-2": { stock: 75, reorderAt: 60 },
  "prod-farm-3": { stock: 140, reorderAt: 80 },
  "prod-farm-4": { stock: 38, reorderAt: 60 },
  "prod-pet-1": { stock: 86, reorderAt: 100 },
  "prod-pet-2": { stock: 140, reorderAt: 80 },
  "prod-pet-3": { stock: 34, reorderAt: 60 },
  "prod-pet-4": { stock: 120, reorderAt: 60 },
  "prod-pet-5": { stock: 210, reorderAt: 80 },
  "prod-care-1": { stock: 300, reorderAt: 120 },
  "prod-care-2": { stock: 58, reorderAt: 60 },
  "prod-care-3": { stock: 160, reorderAt: 80 },
  "prod-care-4": { stock: 90, reorderAt: 50 },
  "prod-care-5": { stock: 110, reorderAt: 50 },
  "prod-poultry-1": { stock: 0, reorderAt: 0 },
  "prod-poultry-2": { stock: 0, reorderAt: 0 },
  "prod-poultry-3": { stock: 0, reorderAt: 0 },
  "prod-poultry-4": { stock: 0, reorderAt: 0 },
};

// ---------------------------------------------------------------------------
// Store settings
// ---------------------------------------------------------------------------

export interface AdminSettings {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  orderNotifyEmail: string;
  codEnabled: boolean;
  codFee: number;
  freeShippingAbove: number;
  razorpayMode: "test" | "live";
  shiprocketPickup: string;
  stCourierBranch: string;
  twoStepLogin: boolean;
}

export const ADMIN_SEED_SETTINGS: AdminSettings = {
  storeName: "Ariviyaa Animal Health",
  supportEmail: "ariviyalabs@gmail.com",
  supportPhone: "+91 70101 05831",
  orderNotifyEmail: "orders@ariviyaa.com",
  codEnabled: true,
  codFee: 40,
  freeShippingAbove: 999,
  razorpayMode: "test",
  shiprocketPickup: "Unit #103, Periyar TBI, Vallam, Thanjavur 613403",
  stCourierBranch: "ST Courier, Vallam Branch",
  twoStepLogin: false,
};
