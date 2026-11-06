import React from "react";
import type { Metadata } from "next";
import { CommonHero } from "@/components/CommonHero";
import { OfficeLocations } from "@/sections/Contact/OfficeLocations";
import { DealerList } from "@/sections/Stores/DealerList";

export const metadata: Metadata = {
  title: "Store Locations & Dealers",
  description:
    "Visit Ariviyaa's head office in Thanjavur or find an authorised dealer, vet clinic or pet store near you that stocks Ariviyaa products.",
  alternates: { canonical: "https://www.ariviyaa.com/store-locations" },
};

export default function StoreLocationsPage() {
  return (
    <>
      <CommonHero
        title="Store Locations"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Store Locations" }]}
        subtitle="Visit our Thanjavur office or find an authorised dealer near you"
      />
      {/* Hero is light, so the page runs white → light */}
      <OfficeLocations tone="white" />
      <DealerList tone="light" />
    </>
  );
}
