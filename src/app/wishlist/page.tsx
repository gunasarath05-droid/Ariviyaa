"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { CommonHero } from "@/components/CommonHero";
import { useApp } from "@/context/AppContext";
import { PRODUCTS, priceLabel } from "@/constants/products";
import { cardClass, primaryButtonClass, secondaryButtonClass } from "@/components/ui/form";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  // Wishlist restores from localStorage after mount; wait so the empty state doesn't flash
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const saved = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const addAllToCart = () => saved.forEach((product) => addToCart(product, 1));

  return (
    <>
      <CommonHero
        title="Wishlist"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: "Wishlist" }]}
        subtitle="Products you've saved to compare or order later"
      />

      <section className="w-full bg-[#F5F7FC] py-10 sm:py-14 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {!mounted ? (
            <div className={`${cardClass} h-64 animate-pulse`} />
          ) : saved.length === 0 ? (
            <div className={`${cardClass} py-16 px-6 text-center flex flex-col items-center gap-3`}>
              <div className="w-16 h-16 rounded-full bg-[#EFF3FC] text-[#5160a3] flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">No saved products yet</h2>
              <p className="text-sm text-slate-500 max-w-sm">
                Tap the heart on any product to save it here for quick review.
              </p>
              <Link href="/shop" className={`${primaryButtonClass} mt-2`}>
                Browse products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  <strong className="text-slate-900">{saved.length}</strong> saved{" "}
                  {saved.length === 1 ? "product" : "products"}
                </p>
                <button type="button" onClick={addAllToCart} className={primaryButtonClass}>
                  <ShoppingBag className="w-4 h-4" />
                  Add all to cart
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {saved.map((product) => (
                  <div key={product.id} className={`${cardClass} p-2.5 sm:p-3 flex flex-col group`}>
                    <div className="relative">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="w-full aspect-square rounded-xl bg-[#F5F7FC] p-4 sm:p-5 flex items-center justify-center"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={220}
                          height={220}
                          style={{ width: "auto", height: "auto" }}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {product.comingSoon && (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#5160a3] text-white text-[11px] font-semibold">
                          Coming soon
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white border border-[#D9DFF0] text-slate-500 hover:text-rose-600 flex items-center justify-center cursor-pointer"
                        aria-label={`Remove ${product.name} from wishlist`}
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="px-1.5 pt-3 pb-1 flex-1 flex flex-col text-center">
                      <span className="text-[11px] font-semibold text-slate-400 line-clamp-1">
                        {product.categoryLabel}
                      </span>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="mt-1 text-sm sm:text-base font-bold text-slate-900 hover:text-[#5160a3] line-clamp-2 leading-snug min-h-[2.5rem] sm:min-h-[2.75rem]"
                      >
                        {product.name}
                      </Link>
                      <div className="mt-1.5 flex items-baseline justify-center gap-2">
                        <span className="text-base sm:text-lg font-bold text-slate-900">
                          {priceLabel(product)}
                        </span>
                        <span className="text-xs text-slate-400">{product.packs[0].size}</span>
                      </div>
                      {product.comingSoon ? (
                        <Link
                          href={`/shop/${product.slug}`}
                          className="mt-3 py-2.5 px-3 rounded-[10px] bg-white border border-[#5160a3] text-[#5160a3] hover:bg-[#EFF3FC] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          Coming soon
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="mt-3 py-2.5 px-3 rounded-[10px] bg-[#5160a3] hover:bg-[#434f8a] text-white text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <Link href="/shop" className={secondaryButtonClass}>
                  Continue shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
