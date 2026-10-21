import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: profile.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${profile.url}/opengraph-image`, ...(profile.photo ? [`${profile.url}${profile.photo}`] : [])],
    },
    ...caseStudies.map((p) => ({
      url: `${profile.url}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${profile.url}/work/${p.slug}/opengraph-image`, `${profile.url}${p.image.src}`],
    })),
  ];
}
