import type { Metadata } from "next";
import { FaqPage } from "@/components/templates/FaqPage";
import { faqPage } from "@/content/faq-page";
import { siteUrl } from "@/content/site";

const url = `${siteUrl}${faqPage.path}`;
const image = `${siteUrl}/og-laser-inova.png`;

export const metadata: Metadata = {
  title: faqPage.meta.title,
  description: faqPage.meta.description,
  alternates: { canonical: url },
  openGraph: { type: "website", locale: "es_MX", siteName: "Laser Inova", url, title: faqPage.meta.ogTitle, description: faqPage.meta.ogDescription, images: [{ url: image, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: faqPage.meta.ogTitle, description: faqPage.meta.ogDescription, images: [image] },
};

export default function FaqRoute() {
  return <FaqPage page={faqPage} />;
}
