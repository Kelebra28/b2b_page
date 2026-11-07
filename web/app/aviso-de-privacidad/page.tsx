import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/LegalPage";
import { privacy as doc } from "@/content/legal";
import { siteUrl } from "@/content/site";

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.description,
  alternates: { canonical: `${siteUrl}${doc.path}` },
};

export default function PrivacyRoute() {
  return <LegalPage doc={doc} />;
}
