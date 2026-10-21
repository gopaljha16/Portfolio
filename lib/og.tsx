import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "./data";

export const ogSize = { width: 1200, height: 630 };

/** Fetches a Google font as TTF (the format the image renderer reads), subset to `text`. */
export async function loadFont(family: string, weight: number, text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return { name: family, data: await (await fetch(url)).arrayBuffer(), weight: weight as 500 | 700, style: "normal" as const };
  } catch {
    // Offline build: the image still renders, in the default font.
    return null;
  }
}

const screenshotFiles: Record<string, string> = {
  codexa: "Codexa.png",
  quibly: "Quibly-landing.png",
  elevare: "Elevare.png",
  lynkr: "lynkr-landing.png",
  "console-me": "consoleme-landing.png",
};

export async function screenshotDataUrl(slug: string) {
  const file = screenshotFiles[slug];
  if (!file) return null;
  const data = await readFile(join(process.cwd(), "images", file), "base64");
  return `data:image/png;base64,${data}`;
}

/** The six product colors as a row of blocks, as on the site. */
export function OgMark({ size = 30 }: { size?: number }) {
  const cell = size / 3 - 2;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: size, gap: 3 }}>
      {projects.map((p) => (
        <div key={p.slug} style={{ width: cell, height: cell, borderRadius: 3, background: p.color }} />
      ))}
    </div>
  );
}

export function OgStripe() {
  return (
    <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, height: 12 }}>
      {projects.map((p) => (
        <div key={p.slug} style={{ flex: 1, background: p.color }} />
      ))}
    </div>
  );
}
