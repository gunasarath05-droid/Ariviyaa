import { MetadataRoute } from "next";
import { PRODUCTS } from "@/constants/products";
import { BLOG_POSTS } from "@/constants/blog";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/store-locations", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms-and-conditions", priority: 0.5, changeFrequency: "monthly" },
  { path: "/refund-policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/shipping-policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/disclaimer", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ariviyaa.com";
  const currentDate = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${baseUrl}/shop/${product.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
