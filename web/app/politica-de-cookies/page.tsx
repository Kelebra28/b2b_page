import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/LegalPage";
import { cookies as doc } from "@/content/legal";
import { siteUrl } from "@/content/site";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.description,
  alternates: { canonical: `${siteUrl}${doc.path}` },
};

export default function CookiesRoute() {
  return <LegalPage doc={doc} />;
}
