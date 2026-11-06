import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { CommonHero } from "@/components/CommonHero";
import { AriviyaIcon } from "@/components/AriviyaIcon";
import { CtaSection } from "@/sections/Home/Cta";
import { BLOG_POSTS } from "@/constants/blog";

const SITE_URL = "https://www.ariviyaa.com";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const url = encodeURIComponent(`${SITE_URL}/blog/${post.slug}`);
  const text = encodeURIComponent(post.title);
  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${url}`, Icon: FaWhatsapp },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, Icon: FaLinkedinIn },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, Icon: FaFacebookF },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`, Icon: FaXTwitter },
  ];

  const related = [
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <CommonHero
        title="Science & Blog"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
        ]}
      />

      <article className="w-full bg-white section-y font-sans border-b border-[#D9DFF0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <header className="space-y-4">
            <span className="inline-flex px-3 py-1 rounded-full bg-[#EFF3FC] border border-[#D9DFF0] text-xs font-bold text-[#5160a3]">
              {post.category}
            </span>
            <h1 className="h-section text-slate-900">
              {post.title}
            </h1>
            <p className="t-lead text-slate-600">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-slate-500">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-[#5160a3] text-white text-xs font-bold flex items-center justify-center">
                  {post.author.replace("Dr. ", "").charAt(0)}
                </span>
                <span>
                  <strong className="block text-slate-900 text-sm">{post.author}</strong>
                  <span className="text-xs">{post.authorRole}</span>
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </header>

          <div className="relative aspect-16/9 rounded-3xl overflow-hidden border border-[#D9DFF0] bg-slate-100">
            <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          <div className="space-y-8">
            {post.body.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="h-block text-slate-900">{section.heading}</h2>
                {section.paragraphs.map((para) => (
                  <p key={para} className="text-base sm:text-[17px] text-slate-700 leading-8">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="pt-6 border-t border-[#D9DFF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#5160a3] hover:underline">
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600 mr-1">Share</span>
              {shareLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${label}`}
                  className="w-9 h-9 rounded-full bg-[#F5F7FC] border border-[#D9DFF0] text-slate-600 hover:bg-[#5160a3] hover:text-white hover:border-[#5160a3] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="w-full section-y bg-[#F5F7FC] font-sans border-b border-[#D9DFF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <div className="eyebrow">
              <AriviyaIcon className="w-4 h-4 text-[#5160a3] shrink-0" />
              <span>Keep reading</span>
            </div>
            <h2 className="h-section text-slate-900">Related Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-[#D9DFF0] shadow-2xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5160a3]">{p.category}</span>
                  <h3 className="h-card text-slate-900 group-hover:text-[#5160a3] line-clamp-2">{p.title}</h3>
                  <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-bold text-[#5160a3]">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
