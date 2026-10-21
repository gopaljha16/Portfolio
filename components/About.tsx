"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  m as motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { milestones, profile, projects, snapshot, stats, type Milestone } from "@/lib/data";
import { Bento, RevealWords, SectionHead, Tile } from "./Bento";

const ease = [0.22, 1, 0.36, 1] as const;

const story =
  "I'm Gopal, a full-stack engineer in Hyderabad. I made my first commits in February 2024. Today I design, build and ship whole products on my own: real-time platforms, AI tools and the cloud infrastructure underneath them. Whatever the layer, I care about the same three things: clean architecture, clear product thinking, and features people actually enjoy using.";

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  // Unlit words stay at half strength: dim enough to read as unlit, bright enough to pass contrast for large text.
  const opacity = useTransform(progress, range, [0.5, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/** A paragraph that lights up word by word as it scrolls through the viewport. */
function ScrollLitText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="max-w-[30ch] font-display text-[clamp(1.85rem,4.4vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.03em]"
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        </Fragment>
      ))}
    </p>
  );
}

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) return count.set(value);
    const controls = animate(count, value, { duration: 1.8, ease });
    return () => controls.stop();
  }, [inView, reduce, value, count]);

  return (
    <span ref={ref}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden>
        <motion.span>{shown}</motion.span>
        {suffix}
      </span>
    </span>
  );
}

const statColors = ["#FF8A1F", "#8B5CF6", "#22A06B", "#5B8CFF"];

function MilestoneItem({ m, showYear }: { m: Milestone; showYear: boolean }) {
  const [open, setOpen] = useState(false);
  const project = projects.find((p) => p.slug === m.project);
  const color = project?.color ?? "var(--ink)";
  const isNow = m.date === "Now";

  return (
    <li className="relative pl-12 md:pl-16">
      {showYear && (
        <p aria-hidden className="mb-6 font-display text-[clamp(3rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.05em] text-faint">
          {m.year}
        </p>
      )}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.6, ease }}
        className="relative"
      >
        {/* The marker fills once the line reaches it. */}
        <span
          aria-hidden
          className="absolute -left-12 top-0 grid size-6 place-items-center rounded-full border-2 border-line bg-bg md:-left-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -45% 0px" }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className={"size-3 rounded-full " + (isNow ? "animate-pulse" : "")}
            style={{ background: color }}
          />
        </span>
        <p className="text-sm text-faint">{m.date}</p>
        <h4 className="mt-1 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em]">
          {m.title}
        </h4>
        <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted">{m.copy}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project?.study && (
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-sm transition-colors hover:bg-surface"
            >
              Read the case study
            </Link>
          )}
          {m.href && (
            <a
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-sm transition-colors hover:bg-surface"
            >
              See it <ArrowUpRight size={14} />
              <span className="sr-only">: {m.title}</span>
            </a>
          )}
          {m.details && (
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-sm transition-colors hover:bg-surface"
            >
              {open ? "Hide the details" : "What I did for clients"}
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={14} />
              </motion.span>
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {open && m.details && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2.5 rounded-2xl border border-line bg-surface p-5">
                {m.details.map((d, i) => (
                  <li key={d} className="flex gap-3 text-[15px] leading-relaxed">
                    <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-[2px]" style={{ background: statColors[i % statColors.length] }} />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </li>
  );
}

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-line" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : progress }}
        className="product-stripe-v absolute bottom-0 left-[11px] top-0 w-[2px] origin-top"
      />
      <ol ref={ref} className="relative space-y-12">
        {milestones.map((m, i) => (
          <MilestoneItem key={m.title} m={m} showYear={i === 0 || milestones[i - 1].year !== m.year} />
        ))}
      </ol>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="pt-24 md:pt-40">
      <SectionHead id="about-title" title="About me" intro="The short version first, then the whole road." />

      <ScrollLitText text={story} />

      <Bento className="mt-16 md:mt-24">
        {stats.map((s, i) => (
          <Tile key={s.label} className="col-span-1 flex min-h-[190px] flex-col justify-between gap-6 p-5 md:col-span-3 md:p-6">
            <span aria-hidden className="h-1 w-10 rounded-full" style={{ background: statColors[i] }} />
            <div>
              <p className="font-display text-[clamp(2.75rem,5.5vw,4.5rem)] font-bold leading-none tracking-[-0.04em] tabular-nums">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 min-h-[2.6em] text-sm leading-snug text-muted">{s.label}</p>
            </div>
          </Tile>
        ))}
      </Bento>

      <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] md:gap-20">
        <aside className="self-start md:sticky md:top-28">
          <RevealWords
            as="h3"
            text="The road so far"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
          />
          <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-muted">
            From a first HTML page to platforms running in production. Every date here comes from a first commit.
          </p>
          {profile.photo && (
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={640}
              height={640}
              sizes="(min-width: 768px) 30vw, 90vw"
              className="mt-8 aspect-square w-full max-w-sm rounded-[24px] object-cover"
            />
          )}
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {snapshot.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="text-right font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <Timeline />
      </div>
    </section>
  );
}
