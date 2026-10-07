export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about-ariviya" },
  { label: "Services", href: "#specialized-solutions" },
  { label: "Products", href: "#ariviya-technology" },
  { label: "Science", href: "#science-tech" },
  { label: "Contact", href: "#contact-section" },
];

export const CATEGORY_FILTERS = [
  { id: "all", label: "All Formulations", count: 12 },
  { id: "pet", label: "Pets (Dogs & Cats)", count: 5 },
  { id: "farm", label: "Dairy & Farm Animals", count: 4 },
  { id: "poultry", label: "Poultry Flock", count: 1 },
  { id: "hygiene", label: "Biosecurity & Hygiene", count: 3 },
  { id: "wound", label: "Wound Care & Sprays", count: 2 },
];

export const FOOTER_SECTIONS = [
  {
    title: "Categories",
    links: [
      { label: "Dairy & Cattle Care", href: "#ariviya-technology" },
      { label: "Pet Health & Grooming", href: "#ariviya-technology" },
      { label: "Poultry Flock Biosecurity", href: "#ariviya-technology" },
      { label: "Eco Disinfectants", href: "#ariviya-technology" },
      { label: "Mastitis Protection", href: "#ariviya-technology" },
    ],
  },
  {
    title: "Quick Navigation",
    links: [
      { label: "Home Showcase", href: "#hero" },
      { label: "About Ariviya", href: "#about-ariviya" },
      { label: "Specialized Solutions", href: "#specialized-solutions" },
      { label: "Green Naxpoly® Tech", href: "#science-tech" },
      { label: "Contact & Inquiries", href: "#contact-section" },
    ],
  },
  {
    title: "Direct Support",
    links: [
      { label: "WhatsApp Direct Desk", href: "https://wa.me/917010105831" },
      { label: "Call: +91 70101 05831", href: "tel:+917010105831" },
      { label: "Email: contact@ariviya.org", href: "mailto:contact@ariviya.org" },
      { label: "StartupTN TBI Center", href: "#about-ariviya" },
    ],
  },
];
