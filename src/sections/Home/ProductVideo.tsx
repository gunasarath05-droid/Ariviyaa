"use client";

import { ShieldCheck, Droplets, TrendingUp, Play } from "lucide-react";
import { AriviyaIcon } from "@/components/AriviyaIcon";

const videoId = "iSGUtgIoEhg";

const benefits = [
  {
    title: "Prevents bacterial infection",
    desc: "Forms a resilient antimicrobial barrier directly sealing the teat canal against environmental microbes.",
    Icon: ShieldCheck,
  },
  {
    title: "Maintains udder health & hygiene",
    desc: "Natural collagen hydrates and repairs fissures and lesions caused by automated or manual milking.",
    Icon: Droplets,
  },
  {
    title: "Improves milk quality & productivity",
    desc: "Zero antibiotic residue ensures 100% compliant, market-grade clean milk without discard losses.",
    Icon: TrendingUp,
  },
];

export function ProductVideoSection() {
  return (
    <section
      className="w-full section-y font-sans scroll-mt-20 bg-white border-b border-[#D9DFF0]"
      id="product-video"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column: Copy & Bullet Points */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="eyebrow">
                <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
                <span>Product Intro</span>
              </div>

              <h2 className="h-section text-slate-900">
                See MammaryO 
                <span className="text-[#5160a3]"> In Action</span>
              </h2>

              <p className="t-kicker text-slate-500">
                Bovine Udder Care, Explained In Under A Minute.
              </p>
            </div>

            <p className="t-head text-slate-600">
              Watch how our post-milking teat dip seamlessly fits into everyday
              milking routines — protecting teats after every milking for
              cleaner milk and healthier herds.
            </p>

            {/* Benefit List */}
            <div className="space-y-4">
              {benefits.map(({ title, desc, Icon }) => (
                <div
                  key={title}
                  className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-[#D9DFF0] shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#5160a3]/10 text-[#5160a3] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block t-body h-card text-slate-900">
                      {title} : <span className="t-body text-slate-500 mt-0.5 font-medium">{desc}</span>
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Responsive YouTube Video Frame */}
          <div>
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-[#D9DFF0] shadow-sm">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                title="Ariviyaa MammaryO product introduction video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductVideoSection;
