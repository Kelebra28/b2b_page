import type { Metadata } from "next";
import { AboutPage } from "@/components/templates/AboutPage";
import { about } from "@/content/about";
import { siteUrl } from "@/content/site";

const url = `${siteUrl}${about.path}`;
const image = `${siteUrl}/og-laser-inova.png`;

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "es_MX", siteName: "Laser Inova", url, title: about.meta.ogTitle, description: about.meta.ogDescription, images: [{ url: image, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: about.meta.ogTitle, description: about.meta.ogDescription, images: [image] },
};

export default function AboutRoute() {
  return <AboutPage page={about} />;
}
