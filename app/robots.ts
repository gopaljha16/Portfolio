import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

// Search and AI answer engines, named explicitly so there's no doubt they're welcome.
const crawlers = [
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
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
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...crawlers.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${profile.url}/sitemap.xml`,
    host: profile.url,
  };
}
