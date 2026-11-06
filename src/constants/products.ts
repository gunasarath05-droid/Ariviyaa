import { IMAGES } from "@/constants/images";

export type DivisionType = "animal-healthcare" | "personal-general-care";
export type CategoryGroup = "farm" | "pet" | "poultry" | "home" | "general";

/** One sellable size of a product; each size has its own price (GST included) */
export interface ProductPack {
  size: string;
  price: number;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  division: DivisionType;
  divisionLabel: string;
  category: "farm" | "pet" | "poultry" | "hygiene";
  categoryGroup: CategoryGroup;
  categoryLabel: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  image: string;
  subtitle: string;
  description: string;
  features: string[];
  tags: string[];
  targetAnimals: string;
  keyBenefit: string;
  techTag: string;
  /** Smallest pack first */
  packs: ProductPack[];
  /** Starting price: the smallest pack's price */
  price: number;
  rating?: number;
  reviewsCount?: number;
  isPopular?: boolean;
  /** Listed but not yet on sale: no add-to-cart, enquiry only */
  comingSoon?: boolean;
}

export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

/** Price label for listings: "From ₹601" when the product comes in several sizes */
export const priceLabel = (product: ProductItem) =>
  product.packs.length > 1 ? `From ${formatPrice(product.price)}` : formatPrice(product.price);

const CATALOG: Omit<ProductItem, "price">[] = [
  // =========================================================================
  // DIVISION 1: ANIMAL HEALTHCARE
  // -------------------------------------------------------------------------
  // SUB-GROUP A: FARM ANIMALS (COW + GOAT)
  // =========================================================================
  {
    id: "prod-farm-1",
    name: "MammaryO Teat Barrier",
    slug: "mammaryo",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "farm",
    categoryGroup: "farm",
    categoryLabel: "Cow, Buffalo & Goat Mastitis Preventive Care",
    badge: "Clinical Mastitis Defense",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800 border-emerald-200",
    image: IMAGES.products.mammaryo,
    subtitle: "Pre- & post-milking teat dip for mastitis prevention in cattle & goats.",
    description: "Clinically tested with TANUVAS-TRPVB. Forms a long-lasting flexible bio-barrier over teat canals, blocking environmental mastitis pathogens (Staphylococcus aureus, E. coli, Streptococcus) while conditioning teat skin with zero milk withholding period.",
    features: ["Clinical Mastitis Infection Control", "Teat Condition & Skin Protection", "Increases Clean Milk Yield"],
    tags: ["farm", "dairy", "mastitis", "udder", "cow", "goat"],
    targetAnimals: "Dairy Cattle, Cows, Goats & Buffaloes",
    keyBenefit: "Saves farmers up to 70% in veterinary antibiotics and lost milk dumping costs.",
    techTag: "Patented Teat Bio-Shield",
    packs: [{ size: "1 L", price: 601 }, { size: "5 L", price: 2500 }, { size: "20 L", price: 10000 }, { size: "100 L drum", price: 50000 }],
    rating: 4.9,
    reviewsCount: 142,
    isPopular: true,
  },

  // =========================================================================
  // SUB-GROUP B: PET ANIMALS (DOG + CAT)
  // =========================================================================
  {
    id: "prod-pet-1",
    name: "Anima Spray Pet Wound Care",
    slug: "anima-spray-pet",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "pet",
    categoryGroup: "pet",
    categoryLabel: "Pet Wound Healing",
    badge: "100% Lick-Safe",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700 border-rose-200",
    image: IMAGES.products.animaspray,
    subtitle: "Heals dog & cat cuts, abrasions & hot spots faster naturally.",
    description: "Bio-polymer spray that creates a protective breathable film over cuts, surgical incisions, abrasions, hot spots, and open wounds. Accelerates tissue regeneration and is 100% lick-safe.",
    features: ["Rapid Wound Closure", "Broad Antibacterial Barrier", "100% Lick-Safe & Non-Stinging"],
    tags: ["pet", "wound", "dog", "cat", "first-aid"],
    targetAnimals: "Dogs, Cats, Puppies & Kittens",
    keyBenefit: "Forms an instant protective nanobio shield that repels maggots, flies, and dirt.",
    techTag: "Bio-Chitosan Matrix",
    packs: [{ size: "100 mL", price: 245 }, { size: "200 mL", price: 399 }],
    rating: 4.9,
    reviewsCount: 185,
    isPopular: true,
  },
  {
    id: "prod-pet-2",
    name: "PetSha Aloe Vera Shampoo",
    slug: "petsha",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "pet",
    categoryGroup: "pet",
    categoryLabel: "Grooming & Coat",
    badge: "Organic Aloe & Neem",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700 border-emerald-200",
    image: IMAGES.products.petsha,
    subtitle: "Natural soothing dog & cat conditioning shampoo.",
    description: "Hypoallergenic herbal shampoo infused with pure bio-stabilized aloe vera, neem derivatives, and gentle conditioning agents. Restores skin microbiome balance.",
    features: ["Enriched with Pure Aloe Vera", "Deep Hydrating & Moisturizing", "Silky, Lustrous Coat & Odor-Free"],
    tags: ["pet", "grooming", "shampoo", "dog", "cat"],
    targetAnimals: "All Breeds of Dogs & Cats",
    keyBenefit: "Free from harsh sulfates, parabens, and artificial chemical perfumes.",
    techTag: "Phyto-Biopolymer",
    packs: [{ size: "100 mL", price: 199 }, { size: "200 mL", price: 275 }],
    rating: 4.8,
    reviewsCount: 120,
    isPopular: true,
  },
  {
    id: "prod-pet-3",
    name: "Dermisward Antifungal Spray",
    slug: "dermisward",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "pet",
    categoryGroup: "pet",
    categoryLabel: "Pet Dermatology",
    badge: "Steroid-Free Anti-Itch",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800 border-amber-200",
    image: IMAGES.products.dermisward,
    subtitle: "Antifungal & anti-itch natural therapeutic spray for dogs & cats.",
    description: "Steroid-free dermaceutical spray for canine and feline dermatitis, ringworm, yeast infections, malassezia, and chronic paw licking. Relieves itching within minutes.",
    features: ["Stops Chronic Itching & Redness", "Soothes Fungal Irritation", "Gentle, Steroid-Free & Safe"],
    tags: ["pet", "skin", "antifungal", "dog", "cat"],
    targetAnimals: "Dogs, Cats & Small Pets",
    keyBenefit: "Destroys fungal cell membranes naturally without damaging healthy skin flora.",
    techTag: "Bioactive Nanoparticles",
    packs: [{ size: "100 mL", price: 235 }, { size: "200 mL", price: 389 }],
    rating: 4.9,
    reviewsCount: 156,
    isPopular: true,
  },
  {
    id: "prod-pet-4",
    name: "OtoSpray Ear Hygiene Rinse",
    slug: "otospray",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "pet",
    categoryGroup: "pet",
    categoryLabel: "Pet Ear Care",
    badge: "Alcohol-Free Non-Sting",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800 border-teal-200",
    image: IMAGES.products.otospray,
    subtitle: "Gentle ear cleanser & microbial rinse for dogs & cats.",
    description: "Non-irritating, non-alcoholic otic rinse formulated with nanobio cleansing agents. Dissolves stubborn cerumen (ear wax), cleanses ear canals, and combats otitis externa.",
    features: ["Gentle Wax & Odor Cleansing", "Soothes Ear Canals & Irritation", "Alcohol-Free & Non-Stinging"],
    tags: ["pet", "ears", "hygiene", "dog", "cat"],
    targetAnimals: "Dogs (especially floppy-eared breeds) & Cats",
    keyBenefit: "No painful stinging or alcohol burn; calms head-shaking and itching instantly.",
    techTag: "Naxpoly® Otic Tech",
    packs: [{ size: "50 mL", price: 100 }, { size: "100 mL", price: 190 }],
    rating: 4.7,
    reviewsCount: 88,
    isPopular: false,
  },
  {
    id: "prod-pet-5",
    name: "Tiksha Tick Defense Spray",
    slug: "tiksha",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "pet",
    categoryGroup: "pet",
    categoryLabel: "Tick & Flea Repellent",
    badge: "Botanical Defense",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700 border-emerald-200",
    image: IMAGES.products.tiksha,
    subtitle: "Natural non-aerosol tick & flea repellent spray for dogs & cats.",
    description: "Chemical-free botanical spray combining natural repellents with bio-polymers to keep ticks and fleas away and leave a lasting defensive scent barrier on the coat.",
    features: ["Natural Tick & Flea Repellent", "Non-Aerosol, Quiet Spray", "Gentle, Skin-Friendly Formula"],
    tags: ["pet", "tick", "flea", "spray", "dog", "cat"],
    targetAnimals: "Dogs & Cats of all ages",
    keyBenefit: "Non-neurotoxic; safe for children to cuddle pets immediately after drying.",
    techTag: "Botanical Nano-Complex",
    packs: [{ size: "100 mL", price: 199 }, { size: "200 mL", price: 275 }],
    rating: 4.8,
    reviewsCount: 94,
    isPopular: false,
  },

  // =========================================================================
  // DIVISION 2: PERSONAL / GENERAL CARE
  // -------------------------------------------------------------------------
  // SUB-GROUP A: FLOOR CLEANER
  // =========================================================================
  {
    id: "prod-care-1",
    name: "Cleanida Eco Floor Cleaner",
    slug: "cleanida",
    division: "personal-general-care",
    divisionLabel: "Personal / General Care",
    category: "hygiene",
    categoryGroup: "home",
    categoryLabel: "Floor Cleaner · Home Care",
    badge: "100% Chemical Free",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800 border-teal-200",
    image: IMAGES.products.cleanida,
    subtitle: "Probiotic multi-surface floor sanitizer for homes with pets & families.",
    description: "Probiotic and nano-bio multi-surface floor cleaner for homes with pets, vet hospitals, and animal shelters. Neutralizes pet odors and urine pheromones naturally.",
    features: ["Hospital-Grade Floor Disinfection", "Child & Pet Safe When Wet or Dry", "Eco-Friendly & Hypoallergenic"],
    tags: ["hygiene", "floor", "eco", "cleaner", "general"],
    targetAnimals: "Homes, Kennels, Veterinary Clinics & Animal Cages",
    keyBenefit: "Zero toxic synthetic chemicals; safe for bare human feet and curious pet tongues.",
    techTag: "Eco-Pure Enzyme Formula",
    packs: [{ size: "200 mL", price: 75 }, { size: "450 mL", price: 150 }, { size: "950 mL", price: 260 }, { size: "5 L", price: 1250 }],
    rating: 4.8,
    reviewsCount: 88,
    isPopular: true,
  },

  // =========================================================================
  // SUB-GROUP B: SURFACE DISINFECTANT
  // =========================================================================
  {
    id: "prod-care-2",
    name: "PetEnviron Surface Disinfectant",
    slug: "petenviron",
    division: "personal-general-care",
    divisionLabel: "Personal / General Care",
    category: "hygiene",
    categoryGroup: "general",
    categoryLabel: "Clinic & Surface Disinfectant, Kennel Wash",
    badge: "Broad-Spectrum Bio-Guard",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700 border-indigo-200",
    image: IMAGES.products.petenviron,
    subtitle: "Pet safe multi-surface environmental disinfectant for clinics & households.",
    description: "Broad-spectrum nanobio polymer surface disinfectant specially engineered for animal shelters, veterinary clinics, grooming salons, and pet homes.",
    features: ["Antibacterial & Antiviral Defense", "Broad Antifungal Action", "100% Biodegradable & Non-Toxic"],
    tags: ["hygiene", "surface", "disinfectant", "general"],
    targetAnimals: "Veterinary Clinics, Kennels, Cages & Countertops",
    keyBenefit: "Zero toxic bleach residues; safe for pet skin contact immediately upon drying.",
    techTag: "Naxpoly® Bio-Barrier",
    packs: [{ size: "500 mL", price: 230 }, { size: "1 L", price: 420 }, { size: "5 L", price: 1750 }],
    rating: 4.9,
    reviewsCount: 130,
    isPopular: false,
  },

  // =========================================================================
  // FARM ANIMALS — added from the client's product list (Nov 2026).
  // Descriptions are short drafts from the client's category notes; photos pending.
  // =========================================================================
  {
    id: "prod-farm-2",
    name: "FarmEnviron Surface Disinfectant",
    slug: "farmenviron",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "farm",
    categoryGroup: "farm",
    categoryLabel: "Cattle, Buffalo & Goat Shed Disinfectant",
    badge: "Shed Hygiene",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700 border-indigo-200",
    image: IMAGES.products.placeholder,
    subtitle: "Surface disinfectant for cattle, buffalo and goat holding places.",
    description: "Natural surface disinfectant for cattle sheds, goat pens, milking parlours and other animal holding places.",
    features: ["For Sheds & Holding Places", "Natural Formulation", "Safe Around Animals"],
    tags: ["farm", "shed", "disinfectant", "cow", "buffalo", "goat"],
    targetAnimals: "Cattle, Buffaloes & Goats (holding places)",
    keyBenefit: "Keeps animal holding areas clean between milking and feeding cycles.",
    techTag: "Naxpoly® Bio-Barrier",
    packs: [{ size: "500 mL", price: 230 }, { size: "1 L", price: 420 }, { size: "5 L", price: 1750 }],
  },
  {
    id: "prod-farm-3",
    name: "Farmspray Wound Care",
    slug: "farmspray",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "farm",
    categoryGroup: "farm",
    categoryLabel: "Cattle, Buffalo & Goat Wound Healing",
    badge: "Wound Care",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700 border-rose-200",
    image: IMAGES.products.placeholder,
    subtitle: "Wound healing spray for cattle, buffaloes and goats.",
    description: "Bio-polymer wound care spray for cuts, abrasions and minor wounds in cattle, buffaloes and goats.",
    features: ["For Cuts & Abrasions", "Easy Spray Application", "Bio-Polymer Formula"],
    tags: ["farm", "wound", "spray", "cow", "buffalo", "goat"],
    targetAnimals: "Cattle, Buffaloes & Goats",
    keyBenefit: "Protective film over wounds while they heal.",
    techTag: "Bio-Chitosan Matrix",
    packs: [{ size: "100 mL", price: 245 }, { size: "200 mL", price: 399 }],
  },
  {
    id: "prod-farm-4",
    name: "Tickifence Tick Repellent",
    slug: "tickifence",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "farm",
    categoryGroup: "farm",
    categoryLabel: "Tick Repellent for Cattle, Buffalo & Goat",
    badge: "Botanical Defense",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700 border-emerald-200",
    image: IMAGES.products.placeholder,
    subtitle: "Natural tick repellent spray for cattle, buffaloes and goats.",
    description: "Botanical tick repellent spray for cattle, buffaloes and goats.",
    features: ["Natural Tick Repellent", "Easy Spray Application", "Botanical Formula"],
    tags: ["farm", "tick", "repellent", "cow", "buffalo", "goat"],
    targetAnimals: "Cattle, Buffaloes & Goats",
    keyBenefit: "Helps keep ticks away from livestock.",
    techTag: "Botanical Nano-Complex",
    packs: [{ size: "100 mL", price: 199 }, { size: "200 mL", price: 275 }],
  },

  // =========================================================================
  // POULTRY — Neostar range, shown as "coming soon" until launch is confirmed
  // =========================================================================
  {
    id: "prod-poultry-1",
    name: "Neostar PB",
    slug: "neostar-pb",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "poultry",
    categoryGroup: "poultry",
    categoryLabel: "Poultry Space, Cage & Vehicle Disinfectant",
    badge: "Coming Soon",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800 border-amber-200",
    image: IMAGES.products.placeholder,
    subtitle: "Natural disinfectant for poultry spaces, cages and vehicles.",
    description: "Natural disinfectant for poultry sheds, cages and transport vehicles.",
    features: ["Sheds, Cages & Vehicles", "Natural Formulation", "Bulk Farm Packs"],
    tags: ["poultry", "disinfectant", "cage", "vehicle"],
    targetAnimals: "Poultry farms",
    keyBenefit: "One disinfectant for sheds, cages and vehicles.",
    techTag: "Naxpoly® Bio-Barrier",
    packs: [{ size: "5 L", price: 2450 }, { size: "25 L", price: 11200 }],
    comingSoon: true,
  },
  {
    id: "prod-poultry-2",
    name: "Neostar Aqua",
    slug: "neostar-aqua",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "poultry",
    categoryGroup: "poultry",
    categoryLabel: "Natural Water Sanitizer",
    badge: "Coming Soon",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800 border-amber-200",
    image: IMAGES.products.placeholder,
    subtitle: "Natural drinking-water sanitizer for poultry.",
    description: "Natural water sanitizer for poultry drinking-water lines and tanks.",
    features: ["Drinking-Water Sanitizer", "Natural Formulation", "Bulk Farm Packs"],
    tags: ["poultry", "water", "sanitizer"],
    targetAnimals: "Poultry farms",
    keyBenefit: "Helps keep drinking water clean for the flock.",
    techTag: "Naxpoly® Bio-Barrier",
    packs: [{ size: "5 L", price: 2627 }, { size: "25 L", price: 12637 }],
    comingSoon: true,
  },
  {
    id: "prod-poultry-3",
    name: "Neostar Aqua Plus",
    slug: "neostar-aqua-plus",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "poultry",
    categoryGroup: "poultry",
    categoryLabel: "Natural Water Sanitizer with Herbal",
    badge: "Coming Soon",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800 border-amber-200",
    image: IMAGES.products.placeholder,
    subtitle: "Natural herbal drinking-water sanitizer for poultry.",
    description: "Natural water sanitizer with herbal extracts for poultry drinking water.",
    features: ["Herbal Water Sanitizer", "Natural Formulation", "Bulk Farm Packs"],
    tags: ["poultry", "water", "sanitizer", "herbal"],
    targetAnimals: "Poultry farms",
    keyBenefit: "Water sanitation with added herbal extracts.",
    techTag: "Phyto-Biopolymer",
    packs: [{ size: "5 L", price: 2750 }, { size: "25 L", price: 13500 }],
    comingSoon: true,
  },
  {
    id: "prod-poultry-4",
    name: "Neostar Piper",
    slug: "neostar-piper",
    division: "animal-healthcare",
    divisionLabel: "Animal Healthcare",
    category: "poultry",
    categoryGroup: "poultry",
    categoryLabel: "Poultry Pipe Cleaner",
    badge: "Coming Soon",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800 border-amber-200",
    image: IMAGES.products.placeholder,
    subtitle: "Cleaner for poultry drinking-water pipelines.",
    description: "Pipe cleaner for poultry drinking-water lines and nipple drinkers.",
    features: ["Water Pipeline Cleaner", "Natural Formulation", "Bulk Farm Packs"],
    tags: ["poultry", "pipe", "cleaner", "water"],
    targetAnimals: "Poultry farms",
    keyBenefit: "Keeps water lines clear between flock cycles.",
    techTag: "Eco-Pure Enzyme Formula",
    packs: [{ size: "5 L", price: 2100 }, { size: "25 L", price: 10500 }],
    comingSoon: true,
  },

  // =========================================================================
  // HOME CARE — added from the client's product list (Nov 2026)
  // =========================================================================
  {
    id: "prod-care-3",
    name: "Disinba Vessel Cleaner",
    slug: "disinba",
    division: "personal-general-care",
    divisionLabel: "Personal / General Care",
    category: "hygiene",
    categoryGroup: "home",
    categoryLabel: "Natural Derived Vessel Cleaner · Home Care",
    badge: "Home Care",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800 border-teal-200",
    image: IMAGES.products.placeholder,
    subtitle: "Naturally derived dishwashing and vessel cleaner.",
    description: "Naturally derived cleaner for vessels, utensils and kitchenware.",
    features: ["For Vessels & Utensils", "Naturally Derived", "Everyday Home Use"],
    tags: ["home", "vessel", "dishwash", "cleaner"],
    targetAnimals: "Homes & kitchens",
    keyBenefit: "Naturally derived cleaning for everyday kitchen use.",
    techTag: "Eco-Pure Enzyme Formula",
    packs: [{ size: "200 mL", price: 80 }, { size: "450 mL", price: 160 }, { size: "950 mL", price: 260 }],
  },
  {
    id: "prod-care-4",
    name: "M-Shield Natural Spray",
    slug: "m-shield",
    division: "personal-general-care",
    divisionLabel: "Personal / General Care",
    category: "hygiene",
    categoryGroup: "home",
    categoryLabel: "Herbal & Bio-Polymer Spray · Home Care",
    badge: "Non-Toxic",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700 border-emerald-200",
    image: IMAGES.products.placeholder,
    subtitle: "Herbal and bio-polymer based natural spray, non-toxic.",
    description: "Non-toxic natural spray made with herbal extracts and bio-polymers.",
    features: ["Herbal + Bio-Polymer", "Non-Toxic", "Compact Spray Bottle"],
    tags: ["home", "spray", "herbal", "natural"],
    targetAnimals: "Homes",
    keyBenefit: "Herbal and bio-polymer based, with no toxic chemicals.",
    techTag: "Phyto-Biopolymer",
    packs: [{ size: "50 mL", price: 99 }, { size: "100 mL", price: 150 }],
  },
  {
    id: "prod-care-5",
    name: "RepleX Fly Repellent",
    slug: "replex",
    division: "personal-general-care",
    divisionLabel: "Personal / General Care",
    category: "hygiene",
    categoryGroup: "home",
    categoryLabel: "Natural Fly Repellent · Home Care",
    badge: "Natural Repellent",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700 border-emerald-200",
    image: IMAGES.products.placeholder,
    subtitle: "Natural fly repellent spray.",
    description: "Natural fly repellent spray for homes, shops and animal areas.",
    features: ["Natural Fly Repellent", "Easy Spray Application", "Botanical Formula"],
    tags: ["home", "fly", "repellent", "natural"],
    targetAnimals: "Homes, shops & animal areas",
    keyBenefit: "Keeps flies away naturally.",
    techTag: "Botanical Nano-Complex",
    packs: [{ size: "100 mL", price: 80 }, { size: "200 mL", price: 150 }],
  },
];

export const PRODUCTS: ProductItem[] = CATALOG.map((product) => ({
  ...product,
  price: product.packs[0].price,
}));
