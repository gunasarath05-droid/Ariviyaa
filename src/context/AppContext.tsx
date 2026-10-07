"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProductItem, PRODUCTS } from "@/constants/products";
import { COMPANY_INFO } from "@/constants/company";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface AppContextType {
  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Side Drawer (Cart & Wishlist)
  isSideDrawerOpen: boolean;
  setIsSideDrawerOpen: (open: boolean) => void;
  drawerTab: "cart" | "wishlist";
  setDrawerTab: (tab: "cart" | "wishlist") => void;
  openDrawerWithTab: (tab: "cart" | "wishlist") => void;

  // Product Modal (Quick view)
  selectedProduct: ProductItem | null;
  setSelectedProduct: (product: ProductItem | null) => void;

  // Active Category Filter
  activeCategory: string;
  setActiveCategory: (cat: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: ProductItem, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  checkoutViaWhatsApp: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // WhatsApp helper
  openWhatsAppInquiry: (productName?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"cart" | "wishlist">("cart");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Initial demo cart with MammaryO (Client priority #1!)
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS.find((p) => p.id === "prod-8") || PRODUCTS[0],
      quantity: 1,
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>(["prod-8", "prod-2"]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsSideDrawerOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openDrawerWithTab = (tab: "cart" | "wishlist") => {
    setDrawerTab(tab);
    setIsSideDrawerOpen(true);
  };

  const addToCart = (product: ProductItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setDrawerTab("cart");
    setIsSideDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) {
      openWhatsAppInquiry();
      return;
    }

    let message = `*Hello Ariviya! I would like to place an order / inquiry:*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* (Qty: ${item.quantity})\n`;
    });
    message += `\nPlease confirm availability, quotation, and dispatch details.`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openWhatsAppInquiry = (productName?: string) => {
    const message = productName
      ? `Hello Ariviya, I would like to inquire about ${productName}. Please share technical brochure, farm dosage and pricing.`
      : COMPANY_INFO.whatsappMessage;
    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <AppContext.Provider
      value={{
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isSideDrawerOpen,
        setIsSideDrawerOpen,
        drawerTab,
        setDrawerTab,
        openDrawerWithTab,
        selectedProduct,
        setSelectedProduct,
        activeCategory,
        setActiveCategory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        checkoutViaWhatsApp,
        wishlist,
        toggleWishlist,
        isInWishlist,
        openWhatsAppInquiry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
