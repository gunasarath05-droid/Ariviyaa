import { IMAGES } from "@/constants/images";

export type BlogCategory = "Dairy & Cattle" | "Pet Health" | "Biotech Science" | "Poultry Care";

export interface BlogSectionBody {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  body: BlogSectionBody[];
}

export const BLOG_CATEGORIES: ("All" | BlogCategory)[] = [
  "All",
  "Dairy & Cattle",
  "Pet Health",
  "Biotech Science",
  "Poultry Care",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Understanding Bovine Mastitis: Why Antibiotics Fail & How Natural Bio-Polymers Protect the Teat",
    slug: "bovine-mastitis-prevention-natural-biopolymers",
    excerpt: "Mastitis costs Indian dairy farmers over ₹7,000 crores annually. Discover how non-antibiotic polymer barrier technology stops environmental pathogens without milk withholding penalties.",
    category: "Dairy & Cattle",
    author: "Dr. Chinnadurai",
    authorRole: "B.V.Sc, VP Animal Health",
    date: "October 12, 2026",
    readTime: "5 min read",
    image: IMAGES.site.mammaryoInvented,
    body: [
      {
        heading: "The hidden cost of mastitis",
        paragraphs: [
          "Mastitis is the single most expensive disease on Indian dairy farms. Beyond treatment costs, farmers lose income through reduced yield, discarded milk during antibiotic withholding periods and, in severe cases, permanent damage to the udder.",
          "Most infections are environmental. After milking, the teat canal stays open for up to an hour — long enough for Staphylococcus aureus, E. coli and Streptococcus from bedding, dung and water to enter.",
        ],
      },
      {
        heading: "Why antibiotics alone are not the answer",
        paragraphs: [
          "Antibiotics treat an infection after it has started. Repeated use leads to resistant bacteria, residues in milk and a withholding period during which milk cannot be sold.",
          "Prevention at the teat end — every single milking — is far cheaper than treatment, and it keeps milk free from residues.",
        ],
      },
      {
        heading: "How a bio-polymer barrier works",
        paragraphs: [
          "MammaryO, built on our patented NaxPoly® technology, forms a flexible film over the teat right after milking. The film physically blocks pathogens while the teat canal closes, and conditions cracked teat skin.",
          "Because it is non-antibiotic and was tested with TANUVAS-TRPVB, there is no milk withholding period. The film washes off easily before the next milking.",
        ],
      },
      {
        heading: "Putting it into your routine",
        paragraphs: [
          "Dip every teat fully with a teat dip cup immediately after milking and let it dry. Combine this with clean bedding, dry standing areas and regular CMT screening for best results.",
        ],
      },
    ],
  },
  {
    id: "post-2",
    title: "Green Synthesis in Animal Health: Inside Ariviya's Patented NaxPoly® Technology",
    slug: "green-synthesis-naxpoly-nanotechnology",
    excerpt: "A deep dive into how biodegradable carbohydrate-based polymers are synthesized using eco-friendly green chemistry to create robust antimicrobial matrices with zero toxic residues.",
    category: "Biotech Science",
    author: "Dr. M. Sivakumar",
    authorRole: "Ph.D, Director & CTO",
    date: "October 04, 2026",
    readTime: "7 min read",
    image: IMAGES.site.productsRange,
    body: [
      {
        heading: "What green synthesis means",
        paragraphs: [
          "Conventional antimicrobial products rely on harsh chemicals and solvents. Green synthesis builds active materials using plant extracts and water-based processes, avoiding toxic by-products at every step.",
        ],
      },
      {
        heading: "Carbohydrate polymers as the backbone",
        paragraphs: [
          "NaxPoly® uses biodegradable carbohydrate-based polymers. On contact with skin or a surface, they form a thin, breathable matrix that holds bioactive particles in place.",
          "This matrix acts as both a physical barrier and a carrier, so a small amount of active material stays effective for longer.",
        ],
      },
      {
        heading: "Safety by design",
        paragraphs: [
          "Because the polymers break down naturally, there is no persistent residue on teats, in milk, on pet fur or on floors. That is why our formulations are lick-safe for pets and need no withholding period for dairy animals.",
        ],
      },
      {
        heading: "From the lab to the farm",
        paragraphs: [
          "The technology was developed at Periyar TBI, Thanjavur, and validated with partners including TANUVAS-TRPVB and JSS College of Pharmacy. Every batch is produced at our Thanjavur facility.",
        ],
      },
    ],
  },
  {
    id: "post-3",
    title: "Gentle Care for Sensitive Paws: Why Pets Suffer from Chemical Floor Cleaner Residues",
    slug: "pet-safe-natural-cleaners-allergy-prevention",
    excerpt: "Commercial bleach and pine floor cleaners leave corrosive residues that pets ingest while licking paws. Learn how bio-polymer plant sanitizers keep floors sterile and dogs allergy-free.",
    category: "Pet Health",
    author: "Dr. Chinnadurai",
    authorRole: "B.V.Sc, VP Animal Health",
    date: "September 28, 2026",
    readTime: "4 min read",
    image: IMAGES.friendlyPetsRow,
    body: [
      {
        heading: "Your floor is your pet's world",
        paragraphs: [
          "Dogs and cats spend most of their day close to the floor. Whatever is left behind after mopping ends up on their paws, fur and, eventually, their tongues.",
        ],
      },
      {
        heading: "What chemical residues do",
        paragraphs: [
          "Bleach, phenyl and strong pine cleaners can irritate paw pads, trigger itching and cause stomach upsets when licked. Pets with allergies often get worse after the floors are cleaned.",
        ],
      },
      {
        heading: "A safer way to keep floors clean",
        paragraphs: [
          "Cleanida and PetEnviron use plant-based actives and bio-polymers that clean and sanitise without leaving harsh residues. Floors are safe to walk on as soon as they dry — no rinse needed.",
          "For kennels and clinics, use PetEnviron on cages and countertops between animals to reduce cross-infection.",
        ],
      },
    ],
  },
  {
    id: "post-4",
    title: "The Clean Milk Revolution: Standard Operating Procedure for Post-Milking Teat Dips",
    slug: "clean-milk-standard-operating-procedure-teat-dip",
    excerpt: "Step-by-step veterinary guidelines on timing, dipping cups, coverage, and barrier drying that protect commercial crossbred cows against Streptococcus and E. coli infections.",
    category: "Dairy & Cattle",
    author: "Dr. M. Sivakumar",
    authorRole: "Ph.D, Director & CTO",
    date: "September 19, 2026",
    readTime: "6 min read",
    image: IMAGES.farmLandscape,
    body: [
      {
        heading: "Timing matters most",
        paragraphs: [
          "Apply the teat dip within one minute of removing the milking unit or finishing hand milking. This is when the teat canal is most open and most vulnerable.",
        ],
      },
      {
        heading: "Use the right dipping cup",
        paragraphs: [
          "A non-return teat dip cup keeps the solution clean. Fill it fresh for every milking session and never pour used dip back into the container.",
        ],
      },
      {
        heading: "Full coverage, every teat",
        paragraphs: [
          "Dip at least two-thirds of the teat length so the barrier covers the teat end completely. Spraying often misses the far side of the teat — dipping is more reliable.",
        ],
      },
      {
        heading: "Let the barrier dry",
        paragraphs: [
          "Keep animals standing for 20–30 minutes after milking, ideally with fresh feed, so the film dries before they lie down. Before the next milking, wash and dry teats as usual.",
        ],
      },
    ],
  },
  {
    id: "post-5",
    title: "Poultry Shed Biosecurity: Combating Ammonia & Viral Loads Without Harsh Chemicals",
    slug: "poultry-biosecurity-natural-disinfection",
    excerpt: "How natural antimicrobial formulations reduce flock mortality, eliminate foul odors, and prevent secondary respiratory infections in broiler and layer setups.",
    category: "Poultry Care",
    author: "Ariviya Research Desk",
    authorRole: "Biotech Advisory",
    date: "September 10, 2026",
    readTime: "5 min read",
    image: IMAGES.site.sproutHands,
    body: [
      {
        heading: "Biosecurity starts with the shed",
        paragraphs: [
          "Most flock losses begin with pathogens that build up in litter, feeders and drinkers. Regular cleaning between and during cycles is the first line of defence.",
        ],
      },
      {
        heading: "The ammonia problem",
        paragraphs: [
          "High ammonia from wet litter damages birds' airways and opens the door to respiratory infections. Keeping litter dry and treating surfaces reduces both odour and disease pressure.",
        ],
      },
      {
        heading: "Natural disinfection that birds tolerate",
        paragraphs: [
          "Bio-polymer surface disinfectants can be sprayed across sheds, feeders and equipment without the corrosive fumes of conventional chemicals, making them suitable for routine use.",
          "Our poultry range is in development — talk to our team about field trials for your farm.",
        ],
      },
    ],
  },
];
