"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ProductItem, ProductPack, PRODUCTS, formatPrice } from "@/constants/products";
import { COMPANY_INFO } from "@/constants/company";

export interface CartItem {
  product: ProductItem;
  /** Each pack size is its own cart line with its own price */
  pack: ProductPack;
  quantity: number;
}

/** Identifies a cart line: same product in two sizes = two lines */
export const cartLineKey = (item: { product: ProductItem; pack: ProductPack }) =>
  `${item.product.id}|${item.pack.size}`;

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
  /** Adds the given pack (default: smallest); coming-soon products are ignored */
  addToCart: (product: ProductItem, qty?: number, pack?: ProductPack) => void;
  removeFromCart: (lineKey: string) => void;
  updateQuantity: (lineKey: string, qty: number) => void;
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

const CART_STORAGE_KEY = "ariviya-cart";
const WISHLIST_STORAGE_KEY = "ariviya-wishlist";

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<"cart" | "wishlist">("cart");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Initial cart and wishlist start empty (0), then restore from the browser after mount
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  // Restoring after mount (not in the useState initializer) keeps server and client
  // markup identical, so the cart badge doesn't cause a hydration mismatch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const savedCart: { id: string; size?: string; quantity: number }[] = JSON.parse(
        localStorage.getItem(CART_STORAGE_KEY) || "[]"
      );
      const savedWishlist: string[] = JSON.parse(
        localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]"
      );
      setCart(
        savedCart.flatMap(({ id, size, quantity }) => {
          const product = PRODUCTS.find((p) => p.id === id);
          const pack = product?.packs.find((p) => p.size === size) ?? product?.packs[0];
          return product && pack && !product.comingSoon && quantity > 0
            ? [{ product, pack, quantity }]
            : [];
        })
      );
      setWishlist(savedWishlist.filter((id) => PRODUCTS.some((p) => p.id === id)));
    } catch {
      // Storage unavailable or corrupted — keep the empty defaults
    }
    setIsStorageLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isStorageLoaded) return;
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(
          cart.map((item) => ({ id: item.product.id, size: item.pack.size, quantity: item.quantity }))
        )
      );
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore storage failures (private mode, quota)
    }
  }, [cart, wishlist, isStorageLoaded]);

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

  const addToCart = (product: ProductItem, qty = 1, pack: ProductPack = product.packs[0]) => {
    if (product.comingSoon) return;
    const key = cartLineKey({ product, pack });
    setCart((prev) => {
      if (prev.some((item) => cartLineKey(item) === key)) {
        return prev.map((item) =>
          cartLineKey(item) === key ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product, pack, quantity: qty }];
    });
    setDrawerTab("cart");
    setIsSideDrawerOpen(true);
  };

  const removeFromCart = (lineKey: string) => {
    setCart((prev) => prev.filter((item) => cartLineKey(item) !== lineKey));
  };

  const updateQuantity = (lineKey: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(lineKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (cartLineKey(item) === lineKey ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.pack.price * item.quantity,
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

    let message = `*Hello Ariviyaa! I would like to place an order / inquiry:*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* (${item.pack.size}) — ${item.quantity} × ${formatPrice(item.pack.price)} = ${formatPrice(item.pack.price * item.quantity)}\n`;
    });
    message += `\n*Subtotal:* ${formatPrice(cartSubtotal)}\n`;
    message += `\nPlease confirm availability, delivery charges and dispatch details.`;

    const url = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openWhatsAppInquiry = (productName?: string) => {
    const message = productName
      ? `Hello Ariviyaa, I would like to inquire about ${productName}. Please share technical brochure, farm dosage and pricing.`
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
