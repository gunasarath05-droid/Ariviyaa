import type { Metadata } from "next";
import { PaymentsLedger } from "./PaymentsLedger";

export const metadata: Metadata = {
  title: "Payments",
};

export default function AdminPaymentsPage() {
  return <PaymentsLedger />;
}
