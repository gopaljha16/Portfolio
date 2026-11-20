import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name}, ${profile.role}`,
    short_name: profile.name,
    description: profile.description,
    start_url: "/",
    display: "browser",
    background_color: "#151621",
    theme_color: "#151621",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
