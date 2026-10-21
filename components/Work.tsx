"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  m as motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import { archive, inkOn, profile, projects, type ArchiveItem, type Project } from "@/lib/data";
import { RevealWords, SectionHead } from "./Bento";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ease = [0.22, 1, 0.36, 1] as const;
const live = projects.filter((p) => p.status === "live");

/**
 * The product in a browser window, with its real address in the bar.
 * On phones it keeps its natural size and only crops from the bottom when the card is short on room.
 */
function BrowserFrame({ project, imageScale }: { project: Project; imageScale: MotionValue<number> }) {
  const host = project.href ? new URL(project.href).host : `${project.slug}.app`;
  return (
    <div className="flex max-h-full w-full flex-col overflow-hidden rounded-[16px] bg-[#0d0f15] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.65)] ring-1 ring-black/20">
      <div className="flex shrink-0 items-center gap-3 bg-[#1a1d26] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md bg-white/[0.06] px-3 py-1 text-xs text-white/60">
          <Lock size={11} />
          {host}
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="min-h-0 overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="origin-top">
          <Image
            src={project.image}
            alt={`${project.name} home page`}
            sizes="(min-width: 768px) 58vw, 92vw"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}

/**
 * One product, full height. Each card sticks while the next slides over it, and the cards
 * underneath settle back into a deck. Same on phones, where the card is sized to the screen.
 */
function StackCard({
  project,
  index,
  progress,
  range,
  targetScale,
  desktop,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  desktop: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const ink = inkOn(project);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  const deckScale = useTransform(progress, range, [1, targetScale]);
  // Darken only while the next card slides over this one, never while it's the one being read.
  const step = 1 / (live.length - 1);
  const dim = useTransform(progress, [index * step, (index + 1) * step], [0, 0.22]);
  // Touch screens have no pointer to tilt toward, so the window tilts in as the card arrives instead.
  const arriveTilt = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, 0]);

  // Pointer tilt for the browser window.
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || !desktop || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const untilt = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div ref={ref} id={`work-${project.slug}`} className="sticky top-0 flex h-[100svh] scroll-mt-24 items-center pt-14 md:pt-0">
      <motion.article
        onPointerMove={tilt}
        onPointerLeave={untilt}
        data-cursor="Read the case study"
        style={{
          scale: reduce ? 1 : deckScale,
          top: desktop ? `calc(${index * 22}px - 3vh)` : `${index * 6}px`,
          background: project.color,
          color: ink,
        }}
        className="group relative h-[calc(100svh-7rem)] w-full origin-top overflow-hidden rounded-[28px] md:h-[min(80vh,700px)] md:rounded-[32px]"
      >
        <div aria-hidden className="dot-field absolute inset-0 opacity-70" />
        {/* Cards further back in the deck darken a touch. */}
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-black" />

        <div className="relative flex h-full flex-col gap-4 p-5 sm:p-8 md:grid md:grid-cols-12 md:grid-rows-[auto_minmax(0,1fr)] md:gap-x-10 md:gap-y-4 md:p-12">
          <div className="flex shrink-0 items-center justify-between text-sm font-medium md:col-span-12">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(live.length).padStart(2, "0")}
            </span>
            <span className="flex gap-4">
              <span className="hidden opacity-75 sm:inline">{project.domains.join(", ")}</span>
              <span className="tabular-nums">{project.year}</span>
            </span>
          </div>

          {/* Phones: header, screenshot, then the words. Desktop: words left, screenshot right. */}
          <div className="order-3 flex shrink-0 flex-col md:order-none md:col-span-5">
            <div className="flex flex-col justify-end md:flex-1">
              <h3 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.85] tracking-[-0.05em]">
                {project.name}
              </h3>
              <p className="mt-3 max-w-[26ch] font-display text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium leading-snug md:mt-5">
                {project.tagline}
              </p>
              <p className="mt-4 hidden max-w-[42ch] text-[15px] leading-relaxed opacity-80 md:block">{project.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5 md:mt-5">
                {project.features.map((f) => (
                  <li key={f} className="rounded-full bg-black/10 px-3 py-1 text-[13px] font-medium">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2 md:mt-7">
                <Link
                  href={`/work/${project.slug}`}
                  className="relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform after:absolute after:inset-0 after:content-[''] group-hover:scale-[1.03]"
                  style={{ background: ink, color: project.color }}
                >
                  Read the case study
                </Link>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Open the live site"
                    className="relative z-10 inline-flex items-center gap-1.5 rounded-full border px-5 py-3 text-sm font-semibold transition-colors hover:bg-black/10"
                    style={{ borderColor: `color-mix(in oklab, ${ink} 35%, transparent)` }}
                  >
                    Visit site
                    <ArrowUpRight size={16} />
                    <span className="sr-only">(opens {project.name} in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="order-2 flex min-h-0 flex-1 items-center md:order-none md:col-span-7 [perspective:1400px]">
            <motion.div style={{ rotateX: desktop ? rx : arriveTilt, rotateY: desktop ? ry : 0 }} className="flex max-h-full w-full md:block md:max-h-none">
              <BrowserFrame project={project} imageScale={imageScale} />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/** What follows the pointer over the archive: a screenshot if the project is live, its clone command if not. */
function Preview({ item, eager = false }: { item: ArchiveItem; eager?: boolean }) {
  if (item.image) {
    return (
      <div className="overflow-hidden rounded-[18px] bg-[#0d0f15] p-1.5 shadow-2xl ring-1 ring-black/10">
        <Image
          src={item.image}
          alt=""
          sizes="360px"
          loading={eager ? "eager" : "lazy"}
          className="aspect-[16/10] w-full rounded-[13px] object-cover object-top"
        />
      </div>
    );
  }
  const repo = item.repo?.replace("https://", "") ?? "";
  return (
    <div className="rounded-[18px] bg-[#0d0f15] p-5 font-mono text-[12.5px] leading-6 text-white/80 shadow-2xl ring-1 ring-white/10">
      <p className="mb-3 flex gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </p>
      <p className="break-all">
        <span className="text-[#22A06B]">$</span> git clone {repo}
      </p>
      <p className="text-white/45">Cloning into &apos;{repo.split("/").pop()}&apos;...</p>
      <p className="mt-3 text-white/45"># {item.stack.join(", ")}</p>
    </div>
  );
}

function Archive() {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <div className="mt-24 md:mt-32">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <RevealWords
            as="h3"
            text="More I've built"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
          />
          <p className="mt-4 max-w-[52ch] text-[17px] text-muted">
            Smaller products, infrastructure work and experiments, straight from my GitHub.
          </p>
        </div>
        <a
          href={`${profile.links.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          Every repository on GitHub
          <ArrowUpRight size={15} />
        </a>
      </div>

      <ul
        className="mt-10 border-t border-line"
        onPointerMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onPointerLeave={() => setActive(null)}
      >
        {archive.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: Math.min(i, 4) * 0.05 }}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            className="group relative grid gap-x-8 gap-y-2 border-b border-line px-1 py-6 md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.5fr)_150px] md:items-baseline md:px-5"
          >
            {/* A fill sweeps in from the left on hover. */}
            <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            <span className="relative text-sm tabular-nums text-faint">{item.year}</span>
            <span className="relative font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-3">
              {item.name}
            </span>
            <div className="relative">
              <p className="text-[15px] leading-relaxed text-muted">{item.summary}</p>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-faint">
                {item.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {/* Phones have no pointer for the floating preview, so it wipes in under each row instead.
                  The wrapper is what gets watched: a fully clipped element never counts as in view. */}
              <motion.div aria-hidden initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-40px" }} className="mt-4 md:hidden">
                <motion.div
                  variants={{
                    hidden: { clipPath: "inset(0% 100% 0% 0% round 16px)", y: 10 },
                    shown: { clipPath: "inset(0% 0% 0% 0% round 16px)", y: 0 },
                  }}
                  transition={{ duration: 0.8, ease }}
                >
                  <Preview item={item} eager />
                </motion.div>
              </motion.div>
            </div>
            <span className="relative flex gap-2 md:justify-end">
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-bg px-3 py-1 text-sm transition-colors hover:bg-ink hover:text-inverse"
                >
                  Live <ArrowUpRight size={14} />
                  <span className="sr-only">: {item.name}</span>
                </a>
              )}
              {item.repo && (
                <a
                  href={item.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-bg px-3 py-1 text-sm transition-colors hover:bg-ink hover:text-inverse"
                >
                  <Github size={13} /> Code
                  <span className="sr-only">: {item.name} on GitHub</span>
                </a>
              )}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Portalled to <body>: the section uses content-visibility, which would pin "fixed" to the section. */}
      {mounted &&
        createPortal(
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute left-8 top-0 w-[340px] -translate-y-1/2"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <Preview item={archive[active]} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>,
          document.body,
        )}
    </div>
  );
}

export function Work() {
  const container = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="work" aria-labelledby="work-title" className="pt-24 md:pt-40">
      <SectionHead
        id="work-title"
        title="Selected work"
        intro={`${live.length} live products, each designed, built and shipped by me. Scroll through them, or open any one for the full story.`}
      />
      <div ref={container} className="relative">
        {live.map((p, i) => (
          <StackCard
            key={p.slug}
            project={p}
            index={i}
            progress={scrollYProgress}
            range={[i / live.length, 1]}
            targetScale={1 - (live.length - i) * 0.035}
            desktop={desktop}
          />
        ))}
      </div>
      <Archive />
    </section>
  );
}
