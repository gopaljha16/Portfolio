import { getImageProps } from "next/image";
import { projects } from "@/lib/data";

// Only shipped products on the wall: real screenshots, no placeholders.
const shipped = projects.filter((p) => p.status === "live");

/**
 * The tilted wall of product screenshots behind the hero.
 * A server component on purpose: these are plain <img> tags with a responsive srcset,
 * so the browser has nothing to hydrate for them. The drift is pure CSS.
 */
function WallColumn({ offset, reverse, seconds }: { offset: number; reverse?: boolean; seconds: number }) {
  const items = [...shipped.slice(offset), ...shipped.slice(0, offset)];
  return (
    <div className="wall-col flex flex-col" style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? "reverse" : "normal" }}>
      {[...items, ...items].map((p, i) => {
        // A fixed width gives a short 1x/2x srcset instead of eleven candidates: these tiles are never wider than ~380px.
        const { props } = getImageProps({
          src: p.image,
          alt: "",
          width: 380,
          height: Math.round((380 * p.image.height) / p.image.width),
          quality: 60,
        });
        return (
          <div key={p.slug + i} className="pb-4">
            <div className="rounded-[18px] p-2 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]" style={{ background: p.color }}>
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element -- decorative; alt="" comes from props */}
              <img {...props} loading="lazy" decoding="async" fetchPriority="low" className="h-auto w-full rounded-[12px]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HeroWall() {
  return (
    <>
      <WallColumn offset={0} seconds={70} />
      <WallColumn offset={2} seconds={85} reverse />
      <WallColumn offset={4} seconds={65} />
      <div className="hidden md:block">
        <WallColumn offset={1} seconds={90} reverse />
      </div>
    </>
  );
}
