import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "Pay securely with UPI, card, net banking or wallet.",
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
