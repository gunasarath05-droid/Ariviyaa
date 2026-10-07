export interface CompanyInfo {
  name: string;
  tagline: string;
  subTagline: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  supportedBy: string[];
  certifications: string[];
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const COMPANY_INFO: CompanyInfo = {
  name: "Ariviya Pet Food & Animal Health",
  tagline: "Innovative Chemical-Free Solutions for Pet & Farm Animal Health!",
  subTagline: "Advanced Care. Naturally — Powered by Green Synthesis Naxpoly® Technology",
  phone: "+917010105831",
  displayPhone: "+91 70101 05831",
  whatsapp: "917010105831",
  whatsappMessage: "Hello Ariviya, I would like to inquire about your natural animal health formulations.",
  email: "contact@ariviya.org",
  address: {
    line1: "Ariviya Bio-Innovations Hub",
    line2: "TBI Facility, Science & Technology Park",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    pincode: "600025",
  },
  supportedBy: [
    "StartupTN (Government of Tamil Nadu)",
    "TRPVB - TANUVAS (Translational Research Platform for Veterinary Biologicals)",
    "JSS College of Pharmacy, Ooty",
    "Department of Biotechnology (DBT), Govt. of India"
  ],
  certifications: [
    "100% Biodegradable Formulations",
    "Zero Chemical Residue Verified",
    "Non-Antibiotic Mastitis Defense",
    "Clinically Validated & ISO Certified",
  ],
  socials: {
    linkedin: "https://linkedin.com/company/ariviya",
    twitter: "https://twitter.com/ariviya_health",
    instagram: "https://instagram.com/ariviya_health",
  },
};

export default COMPANY_INFO;
