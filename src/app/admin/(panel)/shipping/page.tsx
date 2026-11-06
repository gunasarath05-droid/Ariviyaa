import type { Metadata } from "next";
import { ShippingDesk } from "./ShippingDesk";

export const metadata: Metadata = {
  title: "Shipping",
};

export default function AdminShippingPage() {
  return <ShippingDesk />;
}
