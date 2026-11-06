import type { Metadata } from "next";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsPage() {
  return <SettingsForm />;
}
