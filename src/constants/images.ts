/**
 * Centralized Images Registry for Ariviyaa Frontend.
 * All image assets reside in `/public/assets` and are referenced from this single source of truth.
 */
export const IMAGES = {
  // Brand & Logos
  logo: "/assets/logo/ariviyaa.svg",
  logoSvg: "/assets/logo/ariviyaa.svg",
  logoPng: "/assets/logo/ariviya.png",
  ariviyaSvg: "/assets/logo/ariviya.svg",
  icon: "/icon.png",
  titleicon: "/assets/logo/Ariviya Icon.svg",
  iconSvg: "/assets/logo/Ariviya Icon.svg",

  // Core Banners & Hero Images
  hero: "/assets/Hero.jpg",
  heroCutout: "/assets/Hero.jpg",
  farmLandscape: "/assets/Hero.jpg",
  petStoreBanner: "/assets/product-hero.png",
  friendlyPetsRow: "/assets/categories/avatar_dog.jpg",
  aboutPuppy: "/assets/categories/avatar_dog.jpg",
  contactBanner: "/assets/product-hero.png",
  commonHeroBanner: "/assets/product-hero.png",
  productHeroBanner: "/assets/product-hero.png",
  productImage: "/assets/Product Image.png",
  productShowcase: "/assets/images.jpg",
  imagesJpg: "/assets/images.jpg",

  // Awards & Recognition (/assets/awards)
  awards: {
    ariviyaDoc: "/assets/awards/Ariviya 1_page-0001.jpg",
    iitbPitchPerfect: "/assets/awards/Ariviya 1_page-0001.jpg",
    tanseed: "/assets/awards/award-tanseed.jpg",
    dettolWinner: "/assets/awards/cert-dettol-winner.jpg",
    kuberansHouse: "/assets/awards/cert-kuberans-house.jpg",
  },

  // Trust Badges & Certifications (/assets/Badges)
  badges: {
    gmp: "/assets/Badges/badge-gmp.jpg",
    nabl: "/assets/Badges/badge-nabl.jpg",
    patented: "/assets/Badges/badge-patented.jpg",
    tanuvas: "/assets/Badges/badge-tanuvas.jpg",
    glp: "/assets/Badges/badge-glp.png",
  },

  // Events & Summits (/assets/Events)
  events: {
    dettolPitch: "/assets/Events/event-dettol-pitch.jpg",
    vanakkamStartups: "/assets/Events/event-vanakkam-startups.jpg",
    yiCiiAward: "/assets/Events/event-yi-cii-award.jpg",
  },

  // Leadership Team (/assets/Team)
  team: {
    sivakumar: "/assets/Team/team-sivakumar.jpg",
    chinnadurai: "/assets/Team/team-chinnadurai.jpg",
    swami: "/assets/Team/team-swami.jpg",
  },

  // Category Icons & Avatars (/assets/categories)
  categories: {
    cow: "/assets/categories/avatar_cow.jpg",
    dog: "/assets/categories/avatar_dog.jpg",
    cat: "/assets/categories/avatar_cat.jpg",
    poultry: "/assets/categories/avatar_poultry.jpg",
    floor: "/assets/products/cleanida_square.jpg",
    general: "/assets/products/petenviron.jpg",
    goat: "/assets/categories/avatar_cow.jpg",
  },

  // Products Catalog - 7 Core Products (Mockups + Labels)
  products: {
    // 1. MammaryO (Flagship Cow & Goat Post Teat Dip)
    mammaryo: "/assets/products/mammaryo.jpg",
    mammaryoTeatDip: "/assets/mammaryo_teat_dip.png",
    mammaryoPoster: "/assets/mammaryo-poster.png",
    mammaryoInvented: "/assets/mammaryo-invented.jpg",

    // 2. Animaspray (Wound Care Spray 100mL)
    animaspray: "/assets/products/animaspray.jpg",
    animasprayLabel: "/assets/products/animaspray_label.png",
    animasprayFarm: "/assets/products/animaspray.jpg",

    // 3. Dermisward (Antifungal Natural Spray 100mL)
    dermisward: "/assets/products/dermisward.jpg",
    dermiswardLabel: "/assets/products/dermisward_label.png",

    // 4. Otospray (Ear Spray / Rinse 100mL)
    otospray: "/assets/products/otospray.jpg",
    otosprayLabel: "/assets/products/otospray_label.png",

    // 5. PetEnviron (Surface Disinfectant 1 Liter)
    petenviron: "/assets/products/petenviron.jpg",
    petenvironFront: "/assets/products/petenviron_label_F.png",
    petenvironBack: "/assets/products/petenviron_label_B.png",
    farmenviron: "/assets/products/petenviron.jpg",

    // 6. Petsha (Aloe & Neem Pet Shampoo 100mL)
    petsha: "/assets/products/petsha.jpg",
    petshaLabel: "/assets/products/petsha_label.png",
    farmsward: "/assets/products/petsha.jpg",

    // 7. Tiksha (Botanical Tick Defense Spray 100mL)
    tiksha: "/assets/products/tiksha.jpg",
    tikshaLabel: "/assets/products/tiksha_label.png",
    tikifence: "/assets/products/tiksha.jpg",
    cleanida: "/assets/products/cleanida_square.jpg",

    // Shown until the client's product photos arrive
    placeholder: "/assets/products/placeholder.svg",

    // Catalog aliases
    pe3: "/assets/products/petenviron.jpg",
    anima3: "/assets/products/animaspray.jpg",
    dermi2: "/assets/products/dermisward.jpg",
  },

  // Backward-compatibility namespace for components importing IMAGES.site.*
  site: {
    hero: "/assets/Hero.jpg",
    sproutHands: "/assets/Hero.jpg",
    mammaryoPoster: "/assets/mammaryo-poster.png",
    mammaryoInvented: "/assets/mammaryo-invented.jpg",
    productsRange: "/assets/images.jpg",
    badgeNabl: "/assets/Badges/badge-nabl.jpg",
    badgeGmp: "/assets/Badges/badge-gmp.jpg",
    badgePatented: "/assets/Badges/badge-patented.jpg",
    badgeTanuvas: "/assets/Badges/badge-tanuvas.jpg",
    awardTanseed: "/assets/awards/award-tanseed.jpg",
    certDettolWinner: "/assets/awards/cert-dettol-winner.jpg",
    certKuberansHouse: "/assets/awards/cert-kuberans-house.jpg",
    eventVanakkamStartups: "/assets/Events/event-vanakkam-startups.jpg",
    eventDettolPitch: "/assets/Events/event-dettol-pitch.jpg",
    eventYiCiiAward: "/assets/Events/event-yi-cii-award.jpg",
    teamSivakumar: "/assets/Team/team-sivakumar.jpg",
    teamChinnadurai: "/assets/Team/team-chinnadurai.jpg",
    teamSwami: "/assets/Team/team-swami.jpg",
  },
} as const;

export type ImagesType = typeof IMAGES;
export default IMAGES;