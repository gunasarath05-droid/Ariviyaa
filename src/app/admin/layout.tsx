import type { Metadata } from "next";
import { AdminProvider } from "@/context/AdminContext";

export const metadata: Metadata = {
  title: "Admin",
  // The admin panel is never indexed or followed by search engines
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
