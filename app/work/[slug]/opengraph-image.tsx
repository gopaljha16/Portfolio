import { ImageResponse } from "next/og";
import { caseStudies, profile } from "@/lib/data";
import { loadFont, OgMark, ogSize, screenshotDataUrl } from "@/lib/og";

export const alt = "Case study by Gopal Jha";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug) ?? caseStudies[0];
  const byline = `Case study by ${profile.name}`;
  const text = project.name + project.tagline + byline;
  const [fonts, shot] = await Promise.all([
    Promise.all([loadFont("Funnel Display", 700, text), loadFont("Funnel Display", 500, text)]),
    screenshotDataUrl(project.slug),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: project.color,
          color: "#12141b",
          fontFamily: "Funnel Display",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 500 }}>
            <OgMark size={32} />
            {byline}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 124, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9 }}>{project.name}</div>
            <div style={{ fontSize: 36, fontWeight: 500, marginTop: 22, lineHeight: 1.2 }}>{project.tagline}</div>
          </div>
        </div>
        {shot && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot}
            alt=""
            width={900}
            style={{
              position: "absolute",
              left: 640,
              top: 110,
              borderRadius: 18,
              boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
            }}
          />
        )}
      </div>
    ),
    { ...size, fonts: fonts.filter((f) => f !== null) },
  );
}
