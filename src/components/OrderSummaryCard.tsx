import React from "react";
import Image from "next/image";
import type { ProductItem, ProductPack } from "@/constants/products";
import { formatPrice } from "@/constants/products";
import type { OrderTotals } from "@/constants/demo";
import { cardClass } from "@/components/ui/form";

interface OrderSummaryCardProps {
  items: { product: ProductItem; quantity: number; pack?: ProductPack }[];
  totals: OrderTotals;
  shippingLabel?: string;
  children?: React.ReactNode;
}

// Items + price breakdown used on checkout, payment and confirmation
export function OrderSummaryCard({ items, totals, shippingLabel = "Shipping", children }: OrderSummaryCardProps) {
  return (
    <div className={`${cardClass} p-5 sm:p-6 space-y-5`}>
      <h2 className="h-card text-slate-900">Order Summary</h2>

      <ul className="space-y-3 max-h-72 overflow-y-auto pt-2 pr-2">
        {items.map(({ product, quantity, pack }) => {
          const unitPrice = pack?.price ?? product.price;
          return (
          <li key={`${product.id}|${pack?.size ?? ""}`} className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl bg-[#F5F7FC] p-1.5 flex items-center justify-center shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                width={48}
                height={48}
                style={{ width: "auto", height: "auto" }}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#5160a3] text-white text-[11px] font-bold flex items-center justify-center">
                {quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 line-clamp-1">{product.name}</p>
              <p className="text-xs text-slate-500">
                {pack && `${pack.size} · `}
                {formatPrice(unitPrice)} each
              </p>
            </div>
            <span className="text-sm font-bold text-slate-900">{formatPrice(unitPrice * quantity)}</span>
          </li>
          );
        })}
      </ul>

      <dl className="space-y-2.5 text-sm pt-4 border-t border-slate-100">
        <div className="flex justify-between text-slate-600">
          <dt>Subtotal</dt>
          <dd className="font-semibold text-slate-900">{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between text-slate-600">
          <dt>{shippingLabel}</dt>
          <dd className="font-semibold text-slate-900">
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </dd>
        </div>
        {totals.codFee > 0 && (
          <div className="flex justify-between text-slate-600">
            <dt>Cash on delivery fee</dt>
            <dd className="font-semibold text-slate-900">{formatPrice(totals.codFee)}</dd>
          </div>
        )}
        <div className="flex justify-between text-xs text-slate-500">
          <dt>GST included</dt>
          <dd>{formatPrice(totals.gstIncluded)}</dd>
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
          <dt className="font-bold text-slate-900">Total</dt>
          <dd className="text-2xl font-bold text-slate-900">{formatPrice(totals.total)}</dd>
        </div>
      </dl>

      {children}
    </div>
  );
}
