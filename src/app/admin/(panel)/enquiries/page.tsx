import type { Metadata } from "next";
import { EnquiriesBoard } from "./EnquiriesBoard";

export const metadata: Metadata = {
  title: "B2B Enquiries",
};

export default function AdminEnquiriesPage() {
  return <EnquiriesBoard />;
}
