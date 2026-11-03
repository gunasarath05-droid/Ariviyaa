import React from "react";
import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In or Create Account",
  description:
    "Sign in to your Ariviya account to track orders, reorder farm and pet care products, request returns and download GST invoices.",
  robots: { index: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
