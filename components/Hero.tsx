"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile, projects } from "@/lib/data";
import { Magnetic } from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

function Name() {
  const reduce = useReducedMotion();
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
              <motion.span
                key={letter + i}
                className="inline-block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i++ * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </Fragment>
      ))}
    </h1>
  );
}

// Only shipped products on the wall: real screenshots, no placeholders.
const shipped = projects.filter((p) => p.status === "live");

/** One column of the wall: the products, twice, so the CSS loop is seamless. */
function WallColumn({ offset, reverse, seconds }: { offset: number; reverse?: boolean; seconds: number }) {
  const items = [...shipped.slice(offset), ...shipped.slice(0, offset)];
  return (
    <div
      className="wall-col flex flex-col"
      style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[...items, ...items].map((p, i) => (
        <div key={p.slug + i} className="pb-4">
          <div className="rounded-[18px] p-2 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]" style={{ background: p.color }}>
            <Image
              src={p.image}
              alt=""
              sizes="(min-width: 768px) 26vw, 40vw"
              quality={60}
              className="h-auto w-full rounded-[12px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // As the hero scrolls away, the wall lies flat and fades; the type lifts out first.
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [22, 22] : [22, 4]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.18]);
  const wallOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 0.7], reduce ? [0, 0] : [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate h-[100svh] min-h-[620px] overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 [perspective:1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ rotateX, rotateZ: -14, scale, opacity: wallOpacity, x: "-50%", y: "-50%" }}
            className="absolute left-[58%] top-1/2 grid h-[190vh] w-[150vw] grid-cols-3 gap-4 md:left-[62%] md:w-[96vw] md:grid-cols-4"
          >
            <WallColumn offset={0} seconds={70} />
            <WallColumn offset={2} seconds={85} reverse />
            <WallColumn offset={4} seconds={65} />
            <div className="hidden md:block">
              <WallColumn offset={1} seconds={90} reverse />
            </div>
          </motion.div>
        </motion.div>
        {/* Wash the wall into the page so the type always reads. */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/10 md:bg-gradient-to-r md:from-bg md:via-bg/70 md:to-bg/0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="mx-auto flex h-full max-w-[1240px] flex-col justify-end px-4 pb-12 sm:px-6 md:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6, ease }}
          className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
        >
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
        </motion.p>

        <Name />

        <div className="mt-8 flex flex-col gap-7 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease }}
            className="max-w-[34ch] font-display text-[clamp(1.25rem,2.1vw,1.7rem)] font-medium leading-snug tracking-[-0.01em]"
          >
            Full-stack engineer. I design, build and ship whole products, from the first schema to the final deploy.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease }}
            className="flex shrink-0 flex-wrap items-center gap-2"
          >
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
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
