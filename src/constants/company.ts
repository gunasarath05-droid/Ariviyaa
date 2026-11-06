export interface CompanyInfo {
  name: string;
  tagline: string;
  subTagline: string;
  phone: string;
  displayPhone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  gstin: string;
  /** Customer support hours, every day */
  supportHours: string;
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  supportedBy: string[];
  certifications: string[];
  socials: {
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const COMPANY_INFO: CompanyInfo = {
  name: "Ariviyaa Pet Food & Animal Health",
  tagline: "Innovative Chemical-Free Solutions for Pet & Farm Animal Health!",
  subTagline: "Advanced Care. Naturally — Powered by Green Synthesis Naxpoly® Technology",
  phone: "+917010105831",
  displayPhone: "+91 70101 05831",
  whatsapp: "917010105831",
  whatsappMessage: "Hello Ariviyaa, I would like to inquire about your natural animal health formulations.",
  email: "ariviyalabs@gmail.com",
  gstin: "33AAWCA0079Q1ZZ",
  supportHours: "8:30 AM – 7:30 PM",
  address: {
    line1: "Unit #103, Periyar TBI, Vallam",
    city: "Thanjavur",
    state: "Tamil Nadu",
    country: "India",
    pincode: "613403",
  },
  supportedBy: [
    "StartupTN (Government of Tamil Nadu)",
    "C-CAMP (Centre for Cellular and Molecular Platforms)",
    "TRPVB - TANUVAS (Translational Research Platform for Veterinary Biologicals)",
    "a-IDEA, ICAR-NAARM",
    "JSS College of Pharmacy, Ooty",
    "Department of Biotechnology (DBT), Govt. of India"
  ],
  certifications: [
    "100% Biodegradable Formulations",
    "Zero Chemical Residue Verified",
    "Non-Antibiotic Mastitis Defense",
    "Clinically Validated & ISO Certified",
    "Indian Patent Granted",
  ],
  socials: {
    linkedin: "https://linkedin.com/company/ariviya",
    facebook: "https://facebook.com/AriviyaDeepTechTNJ",
    instagram: "https://instagram.com/ariviya_deeptech/",
    youtube: "https://youtube.com/channel/UC1JBvNCI1FB1CPECWL2qx0A",

  },
};

export default COMPANY_INFO;
