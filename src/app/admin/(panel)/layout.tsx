import { AdminShell } from "@/components/admin/AdminShell";

// Every page in this group needs a signed-in admin; /admin/login sits outside it
export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
