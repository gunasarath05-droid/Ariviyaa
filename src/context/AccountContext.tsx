"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  DEMO_CUSTOMER,
  DEMO_ORDERS,
  type CustomerProfile,
  type DemoOrder,
  type SavedAddress,
} from "@/constants/demo";

/**
 * Demo sign-in for the client-review build: accounts and their orders live in this browser's
 * localStorage until the backend (real auth + order API) replaces this provider.
 * Passwords are never stored.
 */

interface StoredAccount {
  profile: CustomerProfile;
  /** Signed in (not signed up): shows the sample order history of a returning customer */
  returning: boolean;
  /** Orders placed through checkout while signed in, newest first */
  orders: DemoOrder[];
  /** Order IDs with a return request raised from this account */
  returns: string[];
}

export type SignUpDetails = Pick<CustomerProfile, "name" | "email" | "phone" | "accountType" | "businessName" | "gstin">;

interface AccountContextType {
  /** False until the saved session is read after mount */
  ready: boolean;
  user: CustomerProfile | null;
  orders: DemoOrder[];
  signIn: (email: string) => void;
  signUp: (details: SignUpDetails) => void;
  signOut: () => void;
  /** Adds an order placed at checkout and saves its address if the account has none */
  recordOrder: (order: DemoOrder) => void;
  requestReturn: (orderId: string) => void;
  /** Email is the account key on the demo build, so it is not editable here */
  updateProfile: (details: Omit<SignUpDetails, "email">) => void;
  /** Saves at `index`, or adds when index is null; a default address clears the others' flag */
  saveAddress: (index: number | null, saved: SavedAddress) => void;
  removeAddress: (index: number) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const SESSION_KEY = "ariviya-session";
const ACCOUNTS_KEY = "ariviya-accounts";

const memberSince = () => new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

function withReturnStatus(order: DemoOrder, returns: string[]): DemoOrder {
  if (!returns.includes(order.id) || order.status === "return-requested") return order;
  return {
    ...order,
    status: "return-requested",
    timeline: [...order.timeline, { status: "return-requested", date: "Just now", note: "Return request raised" }],
  };
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accounts, setAccounts] = useState<Record<string, StoredAccount>>({});
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  // Restore after mount so server and client markup match
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      setAccounts(JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "{}"));
      setSessionEmail(localStorage.getItem(SESSION_KEY));
    } catch {
      // Storage unavailable — the visitor simply starts signed out
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      if (sessionEmail) localStorage.setItem(SESSION_KEY, sessionEmail);
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage failures (private mode, quota)
    }
  }, [accounts, sessionEmail, ready]);

  const account = sessionEmail ? accounts[sessionEmail] : undefined;
  const user = account?.profile ?? null;
  const orders = account
    ? [...account.orders, ...(account.returning ? DEMO_ORDERS : [])].map((o) => withReturnStatus(o, account.returns))
    : [];

  const updateAccount = (update: (current: StoredAccount) => StoredAccount) => {
    if (!sessionEmail) return;
    setAccounts((prev) => (prev[sessionEmail] ? { ...prev, [sessionEmail]: update(prev[sessionEmail]) } : prev));
  };

  const signIn = (email: string) => {
    const key = email.trim().toLowerCase();
    // Unknown email on the demo build: open the sample returning customer under that email
    setAccounts((prev) =>
      prev[key]
        ? prev
        : { ...prev, [key]: { profile: { ...DEMO_CUSTOMER, email: key }, returning: true, orders: [], returns: [] } }
    );
    setSessionEmail(key);
  };

  const signUp = (details: SignUpDetails) => {
    const key = details.email.trim().toLowerCase();
    const profile: CustomerProfile = { ...details, email: key, memberSince: memberSince(), addresses: [] };
    setAccounts((prev) => ({ ...prev, [key]: { profile, returning: false, orders: [], returns: [] } }));
    setSessionEmail(key);
  };

  const signOut = () => setSessionEmail(null);

  const recordOrder = (order: DemoOrder) =>
    updateAccount((current) => {
      const addresses = current.profile.addresses.length
        ? current.profile.addresses
        : [{ label: "Home", isDefault: true, address: order.address }];
      return {
        ...current,
        profile: { ...current.profile, addresses },
        orders: [order, ...current.orders.filter((o) => o.id !== order.id)],
      };
    });

  const requestReturn = (orderId: string) =>
    updateAccount((current) =>
      current.returns.includes(orderId) ? current : { ...current, returns: [...current.returns, orderId] }
    );

  const updateProfile = (details: Omit<SignUpDetails, "email">) =>
    updateAccount((current) => ({ ...current, profile: { ...current.profile, ...details } }));

  const setAddresses = (update: (addresses: SavedAddress[]) => SavedAddress[]) =>
    updateAccount((current) => {
      const next = update(current.profile.addresses);
      // Always keep exactly one default while any address exists
      const withDefault =
        next.length > 0 && !next.some((a) => a.isDefault) ? next.map((a, i) => ({ ...a, isDefault: i === 0 })) : next;
      return { ...current, profile: { ...current.profile, addresses: withDefault } };
    });

  const saveAddress = (index: number | null, saved: SavedAddress) =>
    setAddresses((addresses) => {
      const cleared = saved.isDefault ? addresses.map((a) => ({ ...a, isDefault: false })) : addresses;
      return index === null ? [...cleared, saved] : cleared.map((a, i) => (i === index ? saved : a));
    });

  const removeAddress = (index: number) => setAddresses((addresses) => addresses.filter((_, i) => i !== index));

  return (
    <AccountContext.Provider
      value={{
        ready,
        user,
        orders,
        signIn,
        signUp,
        signOut,
        recordOrder,
        requestReturn,
        updateProfile,
        saveAddress,
        removeAddress,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
