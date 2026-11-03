import { IMAGES } from "@/constants/images";

export type DivisionType = "animal-healthcare" | "personal-general-care";
export type CategoryGroup = "farm" | "pet" | "poultry" | "floor" | "general";

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
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
}

export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export const discountPercent = (product: ProductItem) =>
  product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

export const PRODUCTS: ProductItem[] = [
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
    categoryLabel: "Cow & Goat Mastitis Care",
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
    price: 649,
    originalPrice: 899,
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
    price: 399,
    originalPrice: 550,
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
    price: 349,
    originalPrice: 480,
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
    price: 449,
    originalPrice: 599,
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
    price: 379,
    originalPrice: 499,
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
    price: 369,
    originalPrice: 499,
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
    categoryGroup: "floor",
    categoryLabel: "Floor Cleaner",
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
    price: 349,
    originalPrice: 450,
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
    categoryLabel: "Clinic & Multi-Surface Disinfectant",
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
    price: 499,
    originalPrice: 650,
    rating: 4.9,
    reviewsCount: 130,
    isPopular: false,
  },
];
