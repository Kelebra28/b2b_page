import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/templates/BlogIndexPage";
import { blogIndex } from "@/content/blog";
import { siteUrl } from "@/content/site";

const m = blogIndex.meta;
const url = `${siteUrl}/blog`;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  keywords: m.keywords,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Laser Inova",
    url,
    title: m.ogTitle,
    description: m.ogDescription,
    images: [{ url: `${siteUrl}/inova_laser_og_ready.png`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: m.twitterTitle || m.ogTitle, description: m.twitterDescription || m.ogDescription, images: [`${siteUrl}/inova_laser_og_ready.png`] },
};

export default function BlogRoute() {
  return <BlogIndexPage blog={blogIndex} />;
}
