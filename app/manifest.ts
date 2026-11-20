import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name}, ${profile.role}`,
    short_name: profile.name,
    description: profile.description,
    start_url: "/",
    display: "browser",
    background_color: "#f6f5f3",
    theme_color: "#f6f5f3",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
