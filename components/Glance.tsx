"use client";

import { useEffect, useRef, useState } from "react";
import { m as motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { inkOn, profile, projects } from "@/lib/data";
import type { GitHubStats } from "@/lib/github";
import { Bento, Tile } from "./Bento";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** "4h 30m ahead of you", from a difference in minutes. */
function describeGap(minutes: number) {
  if (minutes === 0) return "Same time zone as you";
  const abs = Math.abs(minutes);
  const parts = [];
  if (abs >= 60) parts.push(Math.floor(abs / 60) + "h");
  if (abs % 60) parts.push((abs % 60) + "m");
  return parts.join(" ") + (minutes > 0 ? " ahead of you" : " behind you");
}

// Built once: creating an Intl formatter is far costlier than using one, and the clock ticks every second.
const timeFormat = new Intl.DateTimeFormat("en-GB", { timeZone: profile.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const [hh, mm] = now ? timeFormat.format(now).split(":") : ["--", "--"];
  // India is UTC+5:30. Compare it with the visitor's own offset.
  const gap = now ? describeGap(330 + now.getTimezoneOffset()) : "";

  return (
    <div className="flex h-full flex-col justify-between gap-6 p-5 md:p-6">
      <p className="text-sm text-muted">Local time in {profile.city}</p>
      <div>
        <p className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-tight tabular-nums">
          {hh}
          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}>
            :
          </motion.span>
          {mm}
        </p>
        <p className="mt-2 min-h-5 text-sm text-muted">{gap}</p>
      </div>
      <p className="text-sm font-medium">Usually replies within a day</p>
    </div>
  );
}

function NowBuilding() {
  const elyra = projects.find((p) => p.status === "building");
  if (!elyra) return null;
  return (
    <div className="relative flex h-full flex-col justify-between gap-6 p-5 text-[#12141b] md:p-6" style={{ background: elyra.color }}>
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -right-10 -top-10 size-44 opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="#12141b" strokeWidth="1" strokeDasharray="2 5" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#12141b" strokeWidth="1" strokeDasharray="1 4" />
      </motion.svg>
      <p className="relative text-sm font-medium">Building now</p>
      <div className="relative">
        <p className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-none tracking-tight">{elyra.name}</p>
        <p className="mt-2 max-w-[24ch] text-sm leading-snug">{elyra.summary}</p>
      </div>
    </div>
  );
}

// Fixed per language, so a color always means the same language. Validated as a set in both themes.
const languageColor: Record<string, string> = {
  JavaScript: "var(--lang-orange)",
  TypeScript: "#5B8CFF",
};
const thirdColor = "#22A06B";

function GitHubTile({ stats, lastPush }: { stats: GitHubStats; lastPush: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const segments = [
    ...stats.languages.map((l) => ({ ...l, color: languageColor[l.name] ?? thirdColor })),
    ...(stats.other ? [{ name: "Other", count: stats.other, color: "var(--faint)" }] : []),
  ];
  const total = segments.reduce((n, s) => n + s.count, 0);

  return (
    <div className="flex h-full flex-col justify-between gap-6 p-5 md:p-6">
      <a
        href={profile.links.github}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <Github size={16} />
        github.com/{profile.github}
        <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>

      <div>
        <p className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-tight tabular-nums">
          {stats.repos}
        </p>
        <p className="mt-2 text-sm text-muted">public repositories, by main language</p>
      </div>

      <div>
        <div className="relative flex h-2.5 gap-[2px]" onMouseLeave={() => setHover(null)}>
          {segments.map((s, i) => (
            <motion.div
              key={s.name}
              role="img"
              aria-label={`${s.name}: ${s.count} repositories`}
              tabIndex={0}
              onMouseEnter={() => setHover(s.name)}
              onFocus={() => setHover(s.name)}
              onBlur={() => setHover(null)}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={
                "relative h-full origin-left outline-none transition-opacity " +
                (i === 0 ? "rounded-l-[4px] " : "") +
                (i === segments.length - 1 ? "rounded-r-[4px] " : "") +
                (hover && hover !== s.name ? "opacity-35" : "")
              }
              style={{ flexGrow: s.count, flexBasis: 0, background: s.color }}
            >
              {hover === s.name && (
                <span className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-medium text-inverse">
                  {s.name}: {s.count} of {total}
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          {segments.map((s) => (
            <li key={s.name} className="flex items-center gap-1.5">
              <span aria-hidden className="size-2.5 rounded-[3px]" style={{ background: s.color }} />
              {s.name}
              <span className="text-muted tabular-nums">{s.count}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">Last pushed {lastPush}</p>
      </div>
    </div>
  );
}

/** One segment per product. Hover grows a segment; each one jumps to its project tile. */
function ProductBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const narrow = !useMediaQuery("(min-width: 768px)");
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "-15% 0px" });
  const live = projects.filter((p) => p.status === "live").length;
  const building = projects.length - live;

  // Phones can't hover, so the segments take turns opening on their own until one is tapped.
  useEffect(() => {
    if (!narrow || !inView || reduce || touched) return;
    let i = 0;
    setActive(projects[0].slug);
    const id = setInterval(() => {
      i = (i + 1) % projects.length;
      setActive(projects[i].slug);
    }, 1500);
    return () => clearInterval(id);
  }, [narrow, inView, reduce, touched]);

  return (
    <div ref={ref} className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:gap-8 md:p-6">
      <p className="shrink-0 font-display text-xl font-medium leading-tight tracking-tight md:w-56">
        {live} products live,
        <br />
        {building} in progress
      </p>

      <div
        className={"h-16 gap-1.5 md:flex-1 " + (narrow && reduce ? "hidden" : "flex")}
        onMouseLeave={() => !narrow && setActive(null)}
      >
        {projects.map((p) => {
          const open = active === p.slug;
          return (
            <motion.a
              key={p.slug}
              href={p.status === "live" ? `#work-${p.slug}` : undefined}
              onMouseEnter={() => !narrow && setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              onBlur={() => !narrow && setActive(null)}
              onTouchStart={() => {
                setTouched(true);
                setActive(p.slug);
              }}
              animate={{ flexGrow: open ? (narrow ? 4.5 : 3.2) : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex min-w-0 basis-0 items-end overflow-hidden rounded-[14px] px-2.5 pb-2.5 md:px-3"
              style={{ background: p.color, color: inkOn(p) }}
            >
              {/* On narrow screens only the open segment has room for its name. */}
              <motion.span
                animate={{ opacity: !narrow || open ? 1 : 0, y: !narrow || open ? 0 : 6 }}
                transition={{ duration: 0.25 }}
                className="whitespace-nowrap text-sm font-semibold"
              >
                {p.name}
              </motion.span>
            </motion.a>
          );
        })}
      </div>

      <div className={"grid-cols-3 gap-1.5 " + (narrow && reduce ? "grid" : "hidden")}>
        {projects.map((p) => (
          <a
            key={p.slug}
            href={p.status === "live" ? `#work-${p.slug}` : undefined}
            className="flex h-14 items-end rounded-[12px] px-2.5 pb-2 text-[13px] font-semibold"
            style={{ background: p.color, color: inkOn(p) }}
          >
            {p.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Glance({ github, lastPush }: { github: GitHubStats; lastPush: string }) {
  return (
    <section id="glance" aria-label="At a glance" className="scroll-mt-24">
      <Bento>
        <Tile className="col-span-2 md:col-span-5">
          <GitHubTile stats={github} lastPush={lastPush} />
        </Tile>
        <Tile className="col-span-2 min-h-[230px] sm:col-span-1 md:col-span-4">
          <Clock />
        </Tile>
        <Tile bare className="col-span-2 min-h-[230px] sm:col-span-1 md:col-span-3">
          <NowBuilding />
        </Tile>
        <Tile className="col-span-2 md:col-span-12">
          <ProductBar />
        </Tile>
      </Bento>
    </section>
  );
}
