import type { Metadata } from "next";
import { ReturnsManager } from "./ReturnsManager";

export const metadata: Metadata = {
  title: "Returns",
};

export default function AdminReturnsPage() {
  return <ReturnsManager />;
}
