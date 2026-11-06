"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  MapPin,
  Truck,
  Smartphone,
  CreditCard,
  Landmark,
  Wallet,
  Banknote,
  Loader2,
  ShoppingBag,
  ArrowRight,
  Info,
} from "lucide-react";
import { CommonHero } from "@/components/CommonHero";
import { CheckoutSteps } from "@/components/CheckoutSteps";
import { OrderSummaryCard } from "@/components/OrderSummaryCard";
import { useApp } from "@/context/AppContext";
import { useAccount } from "@/context/AccountContext";
import { formatPrice } from "@/constants/products";
import {
  DEMO_CUSTOMER,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  computeTotals,
  type PaymentMethodId,
} from "@/constants/demo";
import { loadCheckoutDraft, newOrderId, savePlacedOrder, type CheckoutDraft } from "@/lib/checkoutSession";
import { cardClass, inputClass, labelClass, primaryButtonClass } from "@/components/ui/form";

const METHOD_ICONS: Record<PaymentMethodId, React.ElementType> = {
  upi: Smartphone,
  card: CreditCard,
  netbanking: Landmark,
  wallet: Wallet,
  cod: Banknote,
};

const BANKS = ["State Bank of India", "Indian Bank", "HDFC Bank", "ICICI Bank", "Axis Bank", "Canara Bank"];
const WALLETS = ["Paytm", "Mobikwik", "Amazon Pay"];

// Demo fallback so the page renders on its own during client review
const SAMPLE_DRAFT: CheckoutDraft = {
  email: DEMO_CUSTOMER.email,
  address: DEMO_CUSTOMER.addresses[0].address,
  shippingId: "shiprocket-standard",
};

// Mock sub-panel per method — the real fields come from Razorpay Checkout
function MethodPanel({ id }: { id: PaymentMethodId }) {
  const [bank, setBank] = useState(BANKS[0]);
  const [wallet, setWallet] = useState(WALLETS[0]);

  if (id === "upi") {
    return (
      <div className="space-y-3">
        <label htmlFor="pay-upi" className={labelClass}>
          UPI ID
        </label>
        <input id="pay-upi" placeholder="yourname@okaxis" className={inputClass} />
        <p className="text-xs text-slate-500">Or scan the QR shown in the Razorpay window with any UPI app.</p>
      </div>
    );
  }
  if (id === "card") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label htmlFor="pay-card" className={labelClass}>
            Card number
          </label>
          <input id="pay-card" inputMode="numeric" placeholder="4111 1111 1111 1111" className={inputClass} />
        </div>
        <div>
          <label htmlFor="pay-exp" className={labelClass}>
            Expiry
          </label>
          <input id="pay-exp" placeholder="MM / YY" className={inputClass} />
        </div>
        <div>
          <label htmlFor="pay-cvv" className={labelClass}>
            CVV
          </label>
          <input id="pay-cvv" type="password" placeholder="•••" className={inputClass} />
        </div>
        <div className="col-span-2">
          <label htmlFor="pay-holder" className={labelClass}>
            Name on card
          </label>
          <input id="pay-holder" placeholder="As printed on the card" className={inputClass} />
        </div>
      </div>
    );
  }
  if (id === "netbanking") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {BANKS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setBank(name)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
              bank === name ? "border-[#5160a3] bg-[#EFF3FC] text-[#5160a3]" : "border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]/60"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    );
  }
  if (id === "wallet") {
    return (
      <div className="flex flex-wrap gap-2">
        {WALLETS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setWallet(name)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              wallet === name ? "border-[#5160a3] bg-[#EFF3FC] text-[#5160a3]" : "border-[#D9DFF0] text-slate-700 hover:border-[#5160a3]/60"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    );
  }
  return (
    <p className="flex items-start gap-2 text-xs text-slate-600">
      <Info className="w-4 h-4 text-[#5160a3] shrink-0 mt-px" />
      Pay in cash or UPI to the delivery partner. A ₹40 handling fee applies and COD is available on orders up to ₹5,000.
    </p>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useApp();
  const { ready, user, recordOrder } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState<CheckoutDraft>(SAMPLE_DRAFT);
  const [paymentId, setPaymentId] = useState<PaymentMethodId>("upi");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/checkout");
  }, [ready, user, router]);

  useEffect(() => {
    const saved = loadCheckoutDraft();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setDraft(saved);
    setMounted(true);
  }, []);

  const shipping = SHIPPING_METHODS.find((m) => m.id === draft.shippingId) ?? SHIPPING_METHODS[0];
  const totals = computeTotals(cartSubtotal, draft.shippingId, paymentId);
  const { address } = draft;

  const handlePay = () => {
    setProcessing(true);
    // Simulates the Razorpay round trip; the backend will verify the payment signature
    window.setTimeout(() => {
      const placedAt = new Date();
      const id = newOrderId();
      const items = cart.map(({ product, pack, quantity }) => ({ productId: product.id, size: pack.size, quantity }));
      savePlacedOrder({ id, placedAt: placedAt.toISOString(), draft, paymentId, items });
      // Signed-in shoppers see the order in their account right away
      recordOrder({
        id,
        date: placedAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        status: "placed",
        items,
        shippingId: draft.shippingId,
        paymentId,
        address: draft.address,
        timeline: [
          {
            status: "placed",
            date: placedAt.toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          },
        ],
      });
      clearCart();
      router.push("/order-confirmation");
    }, 1500);
  };

  return (
    <>
      <CommonHero
        title="Payment"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" },
          { label: "Payment" },
        ]}
      />

      <section className="w-full bg-white py-10 sm:py-14 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <CheckoutSteps current={2} />

          {!mounted || !user ? (
            <div className={`${cardClass} h-96 animate-pulse`} />
          ) : cart.length === 0 && !processing ? (
            <div className={`${cardClass} py-16 px-6 text-center flex flex-col items-center gap-3`}>
              <div className="w-16 h-16 rounded-full bg-[#EFF3FC] text-[#5160a3] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="h-card text-slate-900">Nothing to pay for yet</h2>
              <p className="t-body text-slate-500 max-w-sm">Your cart is empty. Add products to continue.</p>
              <Link href="/shop" className={`${primaryButtonClass} mt-2`}>
                Go to shop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                {/* Delivery summary */}
                <div className={`${cardClass} p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5`}>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="flex items-center gap-2 h-card text-slate-900">
                        <MapPin className="w-4 h-4 text-[#5160a3]" />
                        Deliver to
                      </h2>
                      <Link href="/checkout" className="text-xs font-bold text-[#5160a3] hover:underline">
                        Edit
                      </Link>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{address.name}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {address.line1}
                      {address.line2 ? `, ${address.line2}` : ""}
                      <br />
                      {address.city}, {address.state} – {address.pincode}
                    </p>
                    <p className="text-xs text-slate-500">
                      {address.phone} · {draft.email}
                    </p>
                    {draft.gstin && (
                      <p className="text-xs text-slate-500">
                        GST invoice: {draft.businessName} ({draft.gstin})
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:border-l sm:border-slate-100 sm:pl-5">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="flex items-center gap-2 h-card text-slate-900">
                        <Truck className="w-4 h-4 text-[#5160a3]" />
                        Shipping
                      </h2>
                      <Link href="/checkout" className="text-xs font-bold text-[#5160a3] hover:underline">
                        Change
                      </Link>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {shipping.label} · via {shipping.carrier}
                    </p>
                    <p className="text-sm text-slate-600">{shipping.eta}</p>
                    <p className="text-xs text-slate-500">{shipping.note}</p>
                  </div>
                </div>

                {/* Payment methods */}
                <div className={`${cardClass} p-5 sm:p-6 space-y-5`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className="h-card text-slate-900">Choose a payment method</h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF3FC] border border-[#D9DFF0] text-xs font-bold text-[#5160a3] self-start">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Secured by Razorpay
                    </span>
                  </div>

                  <div className="space-y-3" role="radiogroup" aria-label="Payment method">
                    {PAYMENT_METHODS.map((method) => {
                      const selected = method.id === paymentId;
                      const Icon = METHOD_ICONS[method.id];
                      return (
                        <div
                          key={method.id}
                          className={`rounded-xl border transition-colors ${
                            selected ? "border-[#5160a3] ring-2 ring-[#5160a3]/15" : "border-[#D9DFF0] hover:border-[#5160a3]/60"
                          }`}
                        >
                          <label className="flex items-center gap-3.5 p-4 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selected}
                              onChange={() => setPaymentId(method.id)}
                              className="w-4 h-4 accent-[#5160a3] shrink-0"
                            />
                            <span
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                selected ? "bg-[#5160a3] text-white" : "bg-[#F5F7FC] text-[#5160a3]"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block text-sm font-bold text-slate-900">{method.label}</span>
                              <span className="block text-xs text-slate-500">{method.hint}</span>
                            </span>
                            {method.fee > 0 && (
                              <span className="text-xs font-semibold text-slate-500">+{formatPrice(method.fee)}</span>
                            )}
                          </label>
                          {selected && (
                            <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-[#F5F7FC]/60 rounded-b-xl">
                              <div className="pt-3">
                                <MethodPanel id={method.id} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p className="flex items-start gap-2 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-[#5160a3] shrink-0 mt-px" />
                    Card and bank details are entered in Razorpay&apos;s secure window — Ariviyaa never stores them.
                    This review build only simulates the payment.
                  </p>
                </div>
              </div>

              <aside className="lg:col-span-4 lg:sticky lg:top-40 lg:self-start">
                <OrderSummaryCard items={cart} totals={totals} shippingLabel={`Shipping (${shipping.carrier})`}>
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={processing}
                    className={`${primaryButtonClass} w-full py-3.5 text-base`}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing payment…
                      </>
                    ) : paymentId === "cod" ? (
                      <>Place order · {formatPrice(totals.total)}</>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay {formatPrice(totals.total)}
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 leading-relaxed">
                    By placing this order you agree to our{" "}
                    <Link href="/terms-and-conditions" className="font-semibold text-[#5160a3] hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/refund-policy" className="font-semibold text-[#5160a3] hover:underline">
                      Refund Policy
                    </Link>
                    .
                  </p>
                </OrderSummaryCard>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
