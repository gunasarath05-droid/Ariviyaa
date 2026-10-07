import React from "react";
import { COMPANY_INFO } from "@/constants/company";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    description: COMPANY_INFO.subTagline,
    url: "https://www.ariviyaa.com",
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.line1,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.state,
      postalCode: COMPANY_INFO.address.pincode,
      addressCountry: COMPANY_INFO.address.country,
    },
    sameAs: [
      COMPANY_INFO.socials.linkedin,
      COMPANY_INFO.socials.youtube,
      COMPANY_INFO.socials.facebook,
      COMPANY_INFO.socials.instagram,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
