import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/** Mismas reglas que el robots.txt anterior. En staging (SITE_NOINDEX=1) se bloquea todo. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_NOINDEX === "1") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/tmp/", "/private/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
