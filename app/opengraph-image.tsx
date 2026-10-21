import { ImageResponse } from "next/og";
import { profile, projects } from "@/lib/data";
import { loadFont, OgMark, OgStripe, ogSize } from "@/lib/og";

export const alt = `${profile.name}, full-stack engineer in ${profile.city}, ${profile.country}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const host = new URL(profile.url).host;
  const tagline = `Full-stack engineer in ${profile.city}, ${profile.country}`;
  const text = profile.name + tagline + host + projects.map((p) => p.name).join("");
  const fonts = (await Promise.all([loadFont("Funnel Display", 700, text), loadFont("Funnel Display", 500, text)])).filter(
    (f) => f !== null,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0f15",
          color: "#eceef4",
          padding: "84px 72px 64px",
          fontFamily: "Funnel Display",
          position: "relative",
        }}
      >
        <OgStripe />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 500, color: "#9ba2b2" }}>
          <OgMark size={36} />
          {host}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 172, fontWeight: 700, letterSpacing: -9, lineHeight: 0.9 }}>{profile.name}</div>
          <div style={{ fontSize: 42, fontWeight: 500, color: "#9ba2b2", marginTop: 24 }}>{tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {projects.map((p) => (
            <div
              key={p.slug}
              style={{
                flex: 1,
                height: 84,
                borderRadius: 18,
                background: p.color,
                color: "#12141b",
                display: "flex",
                alignItems: "flex-end",
                padding: "0 16px 14px",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
