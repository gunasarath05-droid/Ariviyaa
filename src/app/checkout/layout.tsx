import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter delivery details and choose a shipping method.",
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
