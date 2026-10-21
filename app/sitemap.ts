import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: profile.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...caseStudies.map((p) => ({
      url: `${profile.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
