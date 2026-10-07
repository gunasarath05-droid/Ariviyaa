import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { ProductModal } from "@/components/ProductModal";
import { SideDrawer } from "@/components/SideDrawer";
import { SearchModal } from "@/components/SearchModal";
import { JsonLd } from "@/components/seo/JsonLd";

// Headings, hero titles, section titles, buttons
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// Descriptions, product details, navigation, forms
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ariviyaa.com"),
  alternates: {
    canonical: "https://www.ariviyaa.com",
  },
  title: {
    default: "Ariviya - Animal Health Care | Natural Bio-Polymer & Nanotechnology Essentials",
    template: "%s | Ariviya Animal Health Care",
  },
  description:
    "Sustainable, chemical-free nanobio-polymer health care essentials for dairy cattle, livestock, poultry, and pets. Supported by StartupTN.",
  keywords: [
    "Ariviya",
    "Ariviyaa",
    "Animal Health Care",
    "Bovine Mastitis Prevention",
    "TANUVAS",
    "Pet Care",
    "Nanotechnology",
    "StartupTN",
    "Chemical-Free",
    "Teat Dip",
    "Veterinary Formulations",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Ariviya - Animal Health Care | Natural Bio-Polymer & Nanotechnology Essentials",
    description:
      "Sustainable, chemical-free nanobio-polymer health care essentials for dairy cattle, livestock, poultry, and pets. Supported by StartupTN.",
    url: "https://www.ariviyaa.com",
    siteName: "Ariviya Animal Health",
    images: [
      {
        url: "/assets/farm_landscape_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Ariviya Animal Health Care",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ariviya - Animal Health Care",
    description:
      "Sustainable, chemical-free nanobio-polymer health care essentials for dairy cattle, livestock, poultry, and pets. Supported by StartupTN.",
    images: ["/assets/farm_landscape_banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className="font-body antialiased bg-[#FAF7F2] text-slate-800 min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900"
      >
        <AppProvider>
         

          {/* Top navigation header */}
          <Suspense fallback={<div className="h-20 bg-white border-b border-slate-100" />}>
            <Header />
          </Suspense>

          {/* Main Content */}
          <main className="flex-grow">{children}</main>

          {/* Floating Right-Side WhatsApp & Call Widget */}
          <FloatingContact />

          {/* Interactive Modals & Slide-over Drawers */}
          <ProductModal />
          <SideDrawer />
          <SearchModal />

          {/* Footer Component */}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
