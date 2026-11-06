"use client";

import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  ADMIN_IDLE_TIMEOUT_MINUTES,
  ADMIN_LOCK_SECONDS,
  ADMIN_MAX_ATTEMPTS,
  ADMIN_SEED_ENQUIRIES,
  ADMIN_SEED_ORDERS,
  ADMIN_SEED_RETURNS,
  ADMIN_SEED_SETTINGS,
  ADMIN_SEED_STOCK,
  ADMIN_USERS,
  ROLE_ACCESS,
  type AdminEnquiry,
  type AdminOrder,
  type AdminReturn,
  type AdminSection,
  type AdminSettings,
  type AdminUser,
  type PaymentStatus,
} from "@/constants/adminData";
import type { OrderStatus } from "@/constants/demo";
import { ACCOUNTS_KEY, type StoredAccount } from "@/context/AccountContext";
import {
  ORDER_UPDATES_KEY,
  applyOrderUpdate,
  loadOrderUpdates,
  saveOrderUpdates,
  timelineStamp,
  type OrderUpdates,
} from "@/lib/orderUpdates";
import { ENQUIRY_INBOX_KEY, loadEnquiryInbox } from "@/lib/enquiryInbox";

/**
 * Demo admin panel store. Sign-in, data and edits live in this browser's localStorage until the
 * backend replaces them with real authentication (hashed passwords, httpOnly session cookie,
 * server-side role checks) and the admin API. Passwords are never stored.
 */

export interface ProductOverride {
  /** Price per pack size */
  prices?: Record<string, number>;
  comingSoon?: boolean;
  hidden?: boolean;
}

interface AdminData {
  returns: AdminReturn[];
  enquiries: AdminEnquiry[];
  stock: Record<string, { stock: number; reorderAt: number }>;
  products: Record<string, ProductOverride>;
  settings: AdminSettings;
}

interface AdminSession {
  email: string;
  lastActive: number;
}

export interface OrderChange {
  status?: OrderStatus;
  awb?: string;
  courierPartner?: string;
  paymentStatus?: PaymentStatus;
  /** Shown on the tracking timeline with the status change */
  note?: string;
}

type SignInResult = { ok: true } | { ok: false; error: string };

interface AdminContextType {
  ready: boolean;
  admin: AdminUser | null;
  canAccess: (section: AdminSection) => boolean;
  signIn: (email: string, password: string) => SignInResult;
  signOut: () => void;
  /** Seconds left on a sign-in lockout, 0 when not locked */
  lockedFor: number;

  orders: AdminOrder[];
  updateOrder: (id: string, change: OrderChange) => void;

  returns: AdminReturn[];
  updateReturn: (id: string, patch: Partial<AdminReturn>) => void;

  enquiries: AdminEnquiry[];
  updateEnquiry: (id: string, patch: Partial<AdminEnquiry>, note?: string) => void;

  stock: AdminData["stock"];
  setStock: (productId: string, stock: number, reorderAt?: number) => void;
  productOverrides: AdminData["products"];
  updateProduct: (productId: string, patch: ProductOverride) => void;

  settings: AdminSettings;
  updateSettings: (patch: Partial<AdminSettings>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const SESSION_KEY = "ariviya-admin-session";
const DATA_KEY = "ariviya-admin-data";
const LOCK_KEY = "ariviya-admin-lock";

const SEED_DATA: AdminData = {
  returns: ADMIN_SEED_RETURNS,
  enquiries: ADMIN_SEED_ENQUIRIES,
  stock: ADMIN_SEED_STOCK,
  products: {},
  settings: ADMIN_SEED_SETTINGS,
};

const IDLE_MS = ADMIN_IDLE_TIMEOUT_MINUTES * 60 * 1000;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked — the panel still works for this page view
  }
}

/** Orders customers placed on this browser (demo accounts), shaped like admin orders */
function customerOrders(accounts: Record<string, StoredAccount>): AdminOrder[] {
  return Object.values(accounts).flatMap(({ profile, orders }) =>
    orders.map((o) => ({
      ...o,
      customer: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        type: profile.accountType,
        businessName: profile.businessName,
        gstin: profile.gstin,
      },
      paymentStatus: (o.paymentId === "cod" ? "cod-pending" : "paid") as PaymentStatus,
      razorpayId: o.paymentId === "cod" ? undefined : `pay_${o.id.replace("ARV-", "W")}dm`,
    }))
  );
}

/** Return requests customers raised from their accounts that the admin hasn't seen yet */
function customerReturns(accounts: Record<string, StoredAccount>, known: AdminReturn[], orders: AdminOrder[]) {
  return Object.values(accounts).flatMap(({ profile, returns }) =>
    returns
      .filter((orderId) => !known.some((r) => r.orderId === orderId))
      .map((orderId): AdminReturn => {
        const source = orders.find((o) => o.id === orderId);
        return {
          id: `RET-${orderId.replace("ARV-", "")}`,
          orderId,
          customer: profile.businessName ?? profile.name,
          date: "New",
          items: source?.items ?? [],
          reason: "Raised from customer account",
          refundTo: source?.paymentId === "cod" ? "bank" : "original",
          status: "Requested",
        };
      })
  );
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<AdminSession | null>(null);
  const [data, setData] = useState<AdminData>(SEED_DATA);
  const [updates, setUpdates] = useState<OrderUpdates>({});
  const [accounts, setAccounts] = useState<Record<string, StoredAccount>>({});
  // Enquiries sent from the website forms
  const [inbox, setInbox] = useState<AdminEnquiry[]>([]);
  const [lock, setLock] = useState<{ count: number; until: number }>({ count: 0, until: 0 });
  const [now, setNow] = useState(0);

  // Restore after mount so server and client markup match
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const saved = readJson<AdminSession | null>(SESSION_KEY, null);
    // An expired session is dropped on load, so a shared computer doesn't stay signed in
    setSession(saved && Date.now() - saved.lastActive < IDLE_MS ? saved : null);
    setData({ ...SEED_DATA, ...readJson<Partial<AdminData>>(DATA_KEY, {}) });
    setUpdates(loadOrderUpdates());
    setAccounts(readJson(ACCOUNTS_KEY, {}));
    setInbox(loadEnquiryInbox());
    setLock(readJson(LOCK_KEY, { count: 0, until: 0 }));
    setNow(Date.now());
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (ready) writeJson(SESSION_KEY, session);
  }, [session, ready]);
  useEffect(() => {
    if (ready) writeJson(DATA_KEY, data);
  }, [data, ready]);
  useEffect(() => {
    if (ready) writeJson(LOCK_KEY, lock);
  }, [lock, ready]);

  // Pick up orders and returns customers create in another tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === ACCOUNTS_KEY) setAccounts(readJson(ACCOUNTS_KEY, {}));
      if (e.key === ORDER_UPDATES_KEY) setUpdates(loadOrderUpdates());
      if (e.key === ENQUIRY_INBOX_KEY) setInbox(loadEnquiryInbox());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Idle timeout: activity refreshes the session; a 30 s tick signs out after the limit
  const signedIn = Boolean(session);
  useEffect(() => {
    if (!signedIn) return;
    let last = 0;
    const touch = () => {
      const t = Date.now();
      if (t - last < 15000) return;
      last = t;
      setSession((s) => (s ? { ...s, lastActive: t } : s));
    };
    const tick = window.setInterval(() => {
      setNow(Date.now());
      setSession((s) => (s && Date.now() - s.lastActive >= IDLE_MS ? null : s));
    }, 30000);
    const events = ["mousedown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, touch, { passive: true }));
    return () => {
      window.clearInterval(tick);
      events.forEach((e) => window.removeEventListener(e, touch));
    };
  }, [signedIn]);

  // Count down a lockout once a second
  useEffect(() => {
    if (lock.until <= Date.now()) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [lock.until]);

  const admin = session ? ADMIN_USERS.find((u) => u.email === session.email) ?? null : null;
  const lockedFor = Math.max(0, Math.ceil((lock.until - now) / 1000));

  const canAccess = useCallback(
    (section: AdminSection) => Boolean(admin && ROLE_ACCESS[admin.role].includes(section)),
    [admin]
  );

  const signIn = (email: string, password: string): SignInResult => {
    const t = Date.now();
    if (lock.until > t) {
      return { ok: false, error: `Too many attempts. Try again in ${Math.ceil((lock.until - t) / 1000)} seconds.` };
    }
    const user = ADMIN_USERS.find((u) => u.email === email.trim().toLowerCase());
    if (!user || password.length < 8) {
      const count = lock.count + 1;
      const locked = count >= ADMIN_MAX_ATTEMPTS;
      setLock({ count: locked ? 0 : count, until: locked ? t + ADMIN_LOCK_SECONDS * 1000 : 0 });
      setNow(t);
      return {
        ok: false,
        error: locked
          ? `Too many attempts. Sign-in is locked for ${ADMIN_LOCK_SECONDS} seconds.`
          : `Email or password is incorrect. ${ADMIN_MAX_ATTEMPTS - count} attempt${ADMIN_MAX_ATTEMPTS - count === 1 ? "" : "s"} left.`,
      };
    }
    setLock({ count: 0, until: 0 });
    setSession({ email: user.email, lastActive: t });
    return { ok: true };
  };

  const signOut = () => setSession(null);

  // ---- Orders: seed + customer orders, with admin changes applied
  const baseOrders = [...customerOrders(accounts), ...ADMIN_SEED_ORDERS].filter(
    (o, i, all) => all.findIndex((x) => x.id === o.id) === i
  );
  const orders = baseOrders.map((o) => applyOrderUpdate(o, updates[o.id]));

  const updateOrder = (id: string, change: OrderChange) => {
    setUpdates((prev) => {
      const current = prev[id] ?? { events: [] };
      const next: OrderUpdates = {
        ...prev,
        [id]: {
          ...current,
          ...(change.status ? { status: change.status } : {}),
          ...(change.awb !== undefined ? { awb: change.awb } : {}),
          ...(change.courierPartner !== undefined ? { courierPartner: change.courierPartner } : {}),
          ...(change.paymentStatus ? { paymentStatus: change.paymentStatus } : {}),
          events: change.status
            ? [...current.events, { status: change.status, date: timelineStamp(), note: change.note }]
            : current.events,
        },
      };
      saveOrderUpdates(next);
      return next;
    });
  };

  // ---- Returns: admin list + new requests from customer accounts
  const returns = [...customerReturns(accounts, data.returns, orders), ...data.returns];

  const updateReturn = (id: string, patch: Partial<AdminReturn>) =>
    setData((prev) => {
      const existing = prev.returns.find((r) => r.id === id) ?? returns.find((r) => r.id === id);
      if (!existing) return prev;
      const updated = { ...existing, ...patch };
      const others = prev.returns.filter((r) => r.id !== id);
      return { ...prev, returns: [updated, ...others] };
    });

  // Website enquiries the admin hasn't touched yet show first; once edited they live in admin data
  const enquiries = [...inbox.filter((e) => !data.enquiries.some((x) => x.id === e.id)), ...data.enquiries];

  const updateEnquiry = (id: string, patch: Partial<AdminEnquiry>, note?: string) =>
    setData((prev) => {
      const existing = prev.enquiries.find((e) => e.id === id) ?? inbox.find((e) => e.id === id);
      if (!existing) return prev;
      const updated = { ...existing, ...patch, notes: note ? [...existing.notes, note] : existing.notes };
      return prev.enquiries.some((e) => e.id === id)
        ? { ...prev, enquiries: prev.enquiries.map((e) => (e.id === id ? updated : e)) }
        : { ...prev, enquiries: [updated, ...prev.enquiries] };
    });

  const setStock = (productId: string, stock: number, reorderAt?: number) =>
    setData((prev) => ({
      ...prev,
      stock: {
        ...prev.stock,
        [productId]: { stock, reorderAt: reorderAt ?? prev.stock[productId]?.reorderAt ?? 0 },
      },
    }));

  const updateProduct = (productId: string, patch: ProductOverride) =>
    setData((prev) => ({
      ...prev,
      products: { ...prev.products, [productId]: { ...prev.products[productId], ...patch } },
    }));

  const updateSettings = (patch: Partial<AdminSettings>) =>
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));

  return (
    <AdminContext.Provider
      value={{
        ready,
        admin,
        canAccess,
        signIn,
        signOut,
        lockedFor,
        orders,
        updateOrder,
        returns,
        updateReturn,
        enquiries,
        updateEnquiry,
        stock: data.stock,
        setStock,
        productOverrides: data.products,
        updateProduct,
        settings: data.settings,
        updateSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
