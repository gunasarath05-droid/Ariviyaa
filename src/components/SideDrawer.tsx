"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PRODUCTS, formatPrice } from "@/constants/products";
import {
  X,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export function SideDrawer() {
  const {
    isSideDrawerOpen,
    setIsSideDrawerOpen,
    drawerTab,
    setDrawerTab,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    checkoutViaWhatsApp,
    wishlist,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
  } = useApp();

  if (!isSideDrawerOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsSideDrawerOpen(false)}
      />

      {/* Drawer Panel (Right Side) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-full sm:w-[420px] bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 border-l border-slate-100">
          {/* 1. TOP HEADER & TABS */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
                <ShoppingBag className="w-5 h-5 text-[#495384]" />
                <span>
                  {drawerTab === "cart"
                    ? `Shopping Cart (${cartCount})`
                    : `Saved Wishlist (${wishlist.length})`}
                </span>
              </div>
              <button
                onClick={() => setIsSideDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-200/70 rounded-xl text-xs font-bold">
              <button
                onClick={() => setDrawerTab("cart")}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  drawerTab === "cart"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#5160a3]" />
                <span>Cart ({cartCount})</span>
              </button>
              <button
                onClick={() => setDrawerTab("wishlist")}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  drawerTab === "wishlist"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Wishlist ({wishlist.length})</span>
              </button>
            </div>
          </div>

          {/* 2. BODY CONTENT (Cart Items or Wishlist Items) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {drawerTab === "cart" ? (
              cart.length === 0 ? (
                /* Empty Cart State */
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-700">Your shopping cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explore our Udder care, mastitis formulas, and pet health solutions to add items.
                  </p>
                  <button
                    onClick={() => setIsSideDrawerOpen(false)}
                    className="mt-3 px-6 py-2.5 rounded-full bg-[#5160a3] text-white text-xs font-bold hover:bg-[#434f8a] transition cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-3.5">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3.5"
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-slate-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={56}
                          height={56}
                          style={{ width: "auto", height: "auto" }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-500 p-0.5 transition cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#10B981] font-semibold">
                          {item.product.categoryLabel}
                        </p>

                        <div className="flex items-center justify-between mt-2 pt-1">
                          <span className="text-sm font-black text-slate-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>

                          {/* Stepper (+ / -) */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 text-xs">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="px-2 py-1 text-slate-600 hover:bg-slate-200 cursor-pointer"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-1 font-bold text-slate-800 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="px-2 py-1 text-slate-600 hover:bg-slate-200 cursor-pointer"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              /* Wishlist Items List */
              wishlistProducts.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-700">No saved items yet</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Click the heart icon on any formulation to save it for quick review.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-3"
                    >
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        onClick={() => {
                          setSelectedProduct(p);
                          setIsSideDrawerOpen(false);
                        }}
                      >
                        <div className="w-14 h-14 bg-slate-50 rounded-xl p-1 flex items-center justify-center shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={48}
                            height={48}
                            style={{ width: "auto", height: "auto" }}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="truncate">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{p.name}</h5>
                          <p className="text-[11px] text-[#10B981] font-semibold">{p.categoryLabel}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(p);
                            setDrawerTab("cart");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#5160a3] text-white text-xs font-bold hover:bg-[#434f8a] transition cursor-pointer"
                        >
                          + Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Remove from saved"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/wishlist"
                    onClick={() => setIsSideDrawerOpen(false)}
                    className="block pt-2 text-center text-xs font-bold text-[#5160a3] hover:underline"
                  >
                    View full wishlist
                  </Link>
                </div>
              )
            )}
          </div>

          {/* 3. DRAWER FOOTER (Inquiry & Proceed To WhatsApp Checkout) */}
          {drawerTab === "cart" && cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Shipping &amp; GST shown at checkout
                  </span>
                </div>
                <span className="text-xl font-black text-slate-900">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              {/* Primary actions: full cart page or straight to checkout */}
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/cart"
                  onClick={() => setIsSideDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl bg-white border border-[#D9DFF0] hover:border-[#5160a3] text-slate-800 hover:text-[#5160a3] text-xs sm:text-sm font-bold flex items-center justify-center transition"
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsSideDrawerOpen(false)}
                  className="py-3 px-4 rounded-xl bg-[#5160a3] hover:bg-[#434f8a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Secondary: send the cart on WhatsApp */}
              <button
                onClick={checkoutViaWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#D9DFF0] hover:bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Or order on WhatsApp</span>
              </button>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>TANUVAS & JSS Tested Formulations | Direct Lab Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
