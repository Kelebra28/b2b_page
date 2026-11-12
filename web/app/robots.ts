import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/** Bots de IA y buscadores con LLM: acceso permitido al contenido público. */
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

/** Mismas reglas que el robots.txt anterior. En staging (SITE_NOINDEX=1) se bloquea todo. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_NOINDEX === "1") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/tmp/", "/private/"] },
      { userAgent: aiBots, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
