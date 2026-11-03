import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Products you saved for later.",
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
