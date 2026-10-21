import { Fragment } from "react";
import { profile } from "@/lib/data";
import { HeroWall } from "./HeroWall";
import { Magnetic } from "./Magnetic";

/**
 * The name, letter by letter. The entrance is a CSS animation (see .anim-rise), so it plays as soon
 * as the HTML arrives instead of waiting for JavaScript: this is the first thing anyone sees.
 */
function Name() {
  let i = 0;
  return (
    <h1
      aria-label={`${profile.name}, ${profile.role.toLowerCase()}`}
      className="font-display text-[clamp(4.5rem,15vw,13.5rem)] font-bold leading-[0.82] tracking-[-0.06em]"
    >
      {profile.name.split(" ").map((word, w) => (
        <Fragment key={word}>
          {/* A real space between the words, so it renders, and crawlers and copy-paste read "Gopal Jha". */}
          {w > 0 && " "}
          <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            {word.split("").map((letter) => (
              <span key={letter + i} className="anim-rise inline-block" style={{ animationDelay: `${0.1 + i++ * 0.04}s` }}>
                {letter}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </h1>
  );
}

/**
 * A server component: no JavaScript runs for the hero except the two magnetic buttons.
 * The entrance is CSS keyframes, and the scroll effects (the wall lying flat, the type lifting away)
 * are CSS scroll-driven animations, see .hero-wall and .hero-copy in globals.css.
 */
export function Hero() {
  return (
    <section id="top" className="relative isolate h-[100svh] min-h-[620px] overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 [perspective:1400px]">
        <div className="anim-wall-in absolute inset-0">
          <div className="hero-wall absolute left-[58%] top-1/2 grid h-[190vh] w-[150vw] grid-cols-3 gap-4 md:left-[62%] md:w-[96vw] md:grid-cols-4">
            <HeroWall />
          </div>
        </div>
        {/* Wash the wall into the page so the type always reads. */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/10 md:bg-gradient-to-r md:from-bg md:via-bg/70 md:to-bg/0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="hero-copy mx-auto flex h-full max-w-[1240px] flex-col justify-end px-4 pb-12 sm:px-6 md:pb-20">
        <p className="anim-fade-up mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" style={{ animationDelay: "0.05s" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-medium backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22A06B] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#22A06B]" />
            </span>
            Open to new work
          </span>
          <span className="text-muted">
            Based in {profile.city}, {profile.country}
          </span>
        </p>

        <Name />

        <div className="mt-8 flex flex-col gap-7 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p
            className="anim-fade-up max-w-[34ch] font-display text-[clamp(1.25rem,2.1vw,1.7rem)] font-medium leading-snug tracking-[-0.01em]"
            style={{ animationDelay: "0.3s" }}
          >
            Full-stack engineer. I design, build and ship whole products, from the first schema to the final deploy.
          </p>
          <div className="anim-fade-up flex shrink-0 flex-wrap items-center gap-2" style={{ animationDelay: "0.42s" }}>
            <Magnetic>
              <a
                href="#work"
                className="block rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-inverse transition-transform active:scale-[0.97]"
              >
                See the work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="block rounded-full border border-line bg-surface/70 px-6 py-3.5 text-[15px] font-medium backdrop-blur transition-colors hover:bg-surface"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
