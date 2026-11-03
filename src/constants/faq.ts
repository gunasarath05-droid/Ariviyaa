export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqEntry[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "products",
    title: "Products & Usage",
    items: [
      {
        question: "What is MammaryO and how does it prevent mastitis?",
        answer:
          "MammaryO is a post-milking teat dip built on our patented NaxPoly® nano-bio-polymer technology. After every milking it forms a protective film over the teat that blocks mastitis-causing pathogens and helps heal cracks — without antibiotics.",
      },
      {
        question: "Is there a milk withholding period?",
        answer:
          "No. MammaryO is non-antibiotic and was tested with TANUVAS-TRPVB, so there is no withholding period and no antibiotic residue in milk.",
      },
      {
        question: "Are the pet sprays safe if my dog or cat licks them?",
        answer:
          "Yes. Anima Spray, Dermisward, OtoSpray and Tiksha are made with bio-polymers and plant-based actives and are lick-safe. For deep wounds or ongoing conditions, always consult your veterinarian.",
      },
      {
        question: "How should I store the products?",
        answer:
          "Store in a cool, dry place away from direct sunlight, with the cap closed. Shelf life is printed on each pack — typically 18–24 months from manufacture.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders & Payment",
    items: [
      {
        question: "Which payment methods do you accept?",
        answer:
          "We accept UPI, credit and debit cards, net banking and wallets through Razorpay's secure checkout. Cash on Delivery is available on eligible pin codes for a small handling fee.",
      },
      {
        question: "Is online payment safe?",
        answer:
          "Yes. Payments are processed by Razorpay, a PCI-DSS compliant gateway. We never see or store your card or UPI details.",
      },
      {
        question: "Do I need an account to order?",
        answer:
          "No, you can check out as a guest. Creating an account lets you track orders, reorder quickly, save addresses and download GST invoices.",
      },
      {
        question: "Can I get a GST invoice?",
        answer:
          "Yes. Enter your GSTIN and business name at checkout and the invoice will carry your GST details.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    items: [
      {
        question: "How long does delivery take?",
        answer:
          "Orders are dispatched within 1–2 working days. Standard delivery takes 4–7 working days, Express 2–3 days, and ST Courier 3–5 days within Tamil Nadu and South India.",
      },
      {
        question: "What are the delivery charges?",
        answer:
          "Standard delivery is free on orders above ₹999. Otherwise charges start at ₹50 depending on the option you choose at checkout.",
      },
      {
        question: "Which courier companies do you use?",
        answer:
          "We ship through Shiprocket, which assigns the best courier for your pin code (Delhivery, Xpressbees, Blue Dart and others). ST Courier is also available for South India.",
      },
      {
        question: "How do I track my order?",
        answer:
          "You will receive the AWB tracking number by SMS, WhatsApp and email once your order ships. You can also track it from My Account → Order History.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "You can request a return within 7 days of delivery if the product is damaged, leaking, wrong or missing. Opened products cannot be returned unless they were defective on arrival.",
      },
      {
        question: "How do I request a return?",
        answer:
          "Use the Return Order page with your order number and phone number, choose the items and reason, and upload photos. We review requests within 2 working days.",
      },
      {
        question: "When will I get my refund?",
        answer:
          "Online payments are refunded to the original method within 5–7 working days after the return is received. COD refunds go to your bank account or UPI ID.",
      },
    ],
  },
  {
    id: "business",
    title: "Business & Distributors",
    items: [
      {
        question: "What pack sizes are available for bulk buyers?",
        answer:
          "We supply 5-litre, 20-litre and drum packs for dairy cooperatives, large farms and distributors, along with teat dip cups, field demo kits and technical documentation.",
      },
      {
        question: "How can I become a distributor or dealer?",
        answer:
          "Send us an enquiry through the contact form or call our team. We offer dealer pricing, GST invoicing, marketing support and pan-India dispatch.",
      },
      {
        question: "Do you offer field demonstrations for dairy cooperatives?",
        answer:
          "Yes. Our animal health team conducts on-farm demonstrations and can share the TANUVAS efficacy dossier with qualified partners.",
      },
      {
        question: "Is there a minimum order quantity for bulk pricing?",
        answer:
          "Bulk pricing starts from 10 units per product. For 200+ units or mixed-product orders, request a custom quote.",
      },
    ],
  },
];
