import React from "react";
import { Check } from "lucide-react";
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STYLE,
  TRACKING_STEPS,
  type DemoOrder,
  type OrderStatus,
} from "@/constants/demo";

export function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold whitespace-nowrap ${ORDER_STATUS_STYLE[status]}`}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

/** Index of the furthest delivery step reached; returns count as fully delivered */
function reachedStep(order: DemoOrder) {
  if (order.status === "return-requested" || order.status === "returned") return TRACKING_STEPS.length - 1;
  return Math.max(0, TRACKING_STEPS.indexOf(order.status));
}

// Compact horizontal tracker used on cards
export function OrderProgress({ order }: { order: DemoOrder }) {
  const reached = reachedStep(order);
  return (
    <ol className="flex items-start">
      {TRACKING_STEPS.map((step, i) => {
        const done = i <= reached;
        return (
          <li key={step} className="flex-1 flex flex-col items-center text-center relative">
            {i > 0 && (
              <span
                className={`absolute top-3 right-1/2 w-full h-0.5 ${i <= reached ? "bg-[#5160a3]" : "bg-[#D9DFF0]"}`}
              />
            )}
            <span
              className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                done ? "bg-[#5160a3] text-white" : "bg-white border border-[#D9DFF0] text-slate-300"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </span>
            <span
              className={`mt-1.5 text-xs font-semibold leading-tight ${
                done ? "text-slate-800" : "text-slate-400"
              }`}
            >
              {ORDER_STATUS_LABEL[step]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

// Vertical timeline with dates, for the expanded order view
export function OrderTimeline({ order }: { order: DemoOrder }) {
  const reached = reachedStep(order);
  const extra = order.timeline.filter((e) => !TRACKING_STEPS.includes(e.status));
  const rows = [
    ...TRACKING_STEPS.map((step, i) => ({
      status: step,
      event: order.timeline.find((e) => e.status === step),
      done: i <= reached,
    })),
    ...extra.map((event) => ({ status: event.status, event, done: true })),
  ];

  return (
    <ol className="space-y-0">
      {rows.map(({ status, event, done }, i) => (
        <li key={status} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className={`w-3 h-3 mt-1 rounded-full shrink-0 ${
                done ? "bg-[#5160a3]" : "bg-white border-2 border-[#D9DFF0]"
              }`}
            />
            {i < rows.length - 1 && (
              <span className={`w-0.5 flex-1 min-h-8 ${rows[i + 1].done ? "bg-[#5160a3]" : "bg-[#D9DFF0]"}`} />
            )}
          </div>
          <div className="pb-4">
            <p className={`text-sm font-bold ${done ? "text-slate-900" : "text-slate-400"}`}>
              {ORDER_STATUS_LABEL[status]}
            </p>
            {event ? (
              <p className="text-xs text-slate-500">
                {event.date}
                {event.note && <span className="block text-slate-600">{event.note}</span>}
              </p>
            ) : (
              <p className="text-xs text-slate-400">Pending</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
