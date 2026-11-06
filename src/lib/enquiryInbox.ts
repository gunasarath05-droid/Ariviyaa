/**
 * Website enquiries on the demo build. The enquiry forms write here and the admin panel's
 * B2B Enquiries page reads it, so nothing goes through WhatsApp. The backend will replace this
 * with a POST /api/enquiries call (plus spam protection and an email alert to the team).
 */
import type { AdminEnquiry } from "@/constants/adminData";

export const ENQUIRY_INBOX_KEY = "ariviya-enquiry-inbox";

export function loadEnquiryInbox(): AdminEnquiry[] {
  try {
    return JSON.parse(localStorage.getItem(ENQUIRY_INBOX_KEY) || "[]");
  } catch {
    return [];
  }
}

export interface EnquiryInput {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  type: AdminEnquiry["type"];
  location: string;
  product: string;
  message: string;
  source: string;
}

/** Saves the enquiry and returns its reference number (shown to the visitor) */
export function submitEnquiry(input: EnquiryInput): string {
  const id = `ENQ-${Date.now().toString().slice(-6)}`;
  const enquiry: AdminEnquiry = {
    id,
    name: input.name,
    organisation: input.organisation || input.name,
    type: input.type,
    phone: input.phone,
    email: input.email,
    location: input.location || "Not given",
    product: input.product,
    quantity: "See message",
    message: input.message,
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "New",
    notes: [],
    source: input.source,
  };
  try {
    localStorage.setItem(ENQUIRY_INBOX_KEY, JSON.stringify([enquiry, ...loadEnquiryInbox()]));
  } catch {
    // Storage blocked: the visitor still sees the confirmation on the demo build
  }
  return id;
}
