"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m as motion, useInView, useReducedMotion } from "framer-motion";
import { alsoComfortableWith, projects, toolbox, toolboxProjects } from "@/lib/data";
import { Swatch } from "./Bento";

type Selection = { kind: "tool" | "project"; name: string } | null;
type Path = { id: string; d: string; color: string };

const tools = toolbox.flatMap((g) => g.tools.map((t) => ({ ...t, group: g.group, color: g.color })));
const colorOf = (name: string) => projects.find((p) => p.name === name)?.color;

// While nobody has touched the map, it walks through a few tools on its own to show what it does.
const showcase = ["Socket.IO", "Gemini", "Prisma", "Redis", "Next.js", "LiveKit", "Razorpay", "Kubernetes"];

const list = (names: string[]) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

/**
 * Every tool, wired to the projects that shipped with it.
 * Hover (or tap) a tool to light up where it was used; hover a project to see what it's made of.
 */
export function StackMap() {
  const box = useRef<HTMLDivElement>(null);
  const toolEls = useRef(new Map<string, HTMLElement>());
  const projectEls = useRef(new Map<string, HTMLElement>());
  const [selection, setSelection] = useState<Selection>(null);
  const [touched, setTouched] = useState(false);
  const [paths, setPaths] = useState<Path[]>([]);
  const inView = useInView(box, { margin: "-25% 0px" });
  const reduce = useReducedMotion();

  const pairs = useMemo<[string, string][]>(() => {
    if (!selection) return [];
    if (selection.kind === "tool") {
      const tool = tools.find((t) => t.name === selection.name);
      return tool ? tool.usedIn.map((p) => [tool.name, p]) : [];
    }
    return tools.filter((t) => t.usedIn.includes(selection.name)).map((t) => [t.name, selection.name]);
  }, [selection]);

  const litTools = new Set(pairs.map(([t]) => t));
  const litProjects = new Set(pairs.map(([, p]) => p));

  useEffect(() => {
    if (!inView || touched || reduce) return;
    let i = 0;
    setSelection({ kind: "tool", name: showcase[0] });
    const id = setInterval(() => {
      i = (i + 1) % showcase.length;
      setSelection({ kind: "tool", name: showcase[i] });
    }, 2600);
    return () => clearInterval(id);
  }, [inView, touched, reduce]);

  // Curves from each lit tool's right edge to each lit project's left edge.
  const measure = useCallback(() => {
    const b = box.current?.getBoundingClientRect();
    if (!b) return;
    const next: Path[] = [];
    for (const [t, p] of pairs) {
      const a = toolEls.current.get(t)?.getBoundingClientRect();
      const z = projectEls.current.get(p)?.getBoundingClientRect();
      if (!a || !z) continue;
      const x1 = a.right - b.left;
      const y1 = a.top + a.height / 2 - b.top;
      const x2 = z.left - b.left;
      const y2 = z.top + z.height / 2 - b.top;
      const dx = Math.max((x2 - x1) * 0.55, 40);
      next.push({
        id: `${t}->${p}`,
        d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`,
        color: colorOf(p) ?? "var(--faint)",
      });
    }
    setPaths(next);
  }, [pairs]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (box.current) observer.observe(box.current);
    return () => observer.disconnect();
  }, [measure]);

  const pick = (next: Selection) => {
    setTouched(true);
    setSelection(next);
  };

  let caption = "Hover any tool to see where it shipped, or a project to see what it's made of.";
  if (selection?.kind === "tool") {
    const used = [...litProjects];
    caption = `${selection.name} shipped in ${used.length === 1 ? "one project" : `${used.length} projects`}: ${list(used)}.`;
  } else if (selection?.kind === "project") {
    caption = `${selection.name} is built with ${list([...litTools])}.`;
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Where it shipped</h3>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={caption}
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="max-w-[52ch] text-[15px] leading-relaxed text-muted md:text-right"
          >
            {caption}
          </motion.p>
        </AnimatePresence>
      </div>

      <div
        ref={box}
        onMouseLeave={() => touched && setSelection(null)}
        className="relative mt-8 grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-7 md:mt-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-32"
      >
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <AnimatePresence>
            {paths.map((p, i) => (
              <motion.path
                key={p.id}
                d={p.d}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                style={{ stroke: p.color }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </AnimatePresence>
        </svg>

        <div className="relative z-10 space-y-5 md:space-y-6">
          {toolbox.map((group) => (
            <div key={group.group}>
              <p className="mb-2.5 flex items-center gap-2 text-sm text-muted">
                <Swatch color={group.color} />
                {group.group}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {group.tools.map((t) => {
                  const lit = litTools.has(t.name);
                  return (
                    <li key={t.name}>
                      <button
                        type="button"
                        ref={(el) => {
                          if (el) toolEls.current.set(t.name, el);
                        }}
                        onMouseEnter={() => pick({ kind: "tool", name: t.name })}
                        onFocus={() => pick({ kind: "tool", name: t.name })}
                        onClick={() => pick({ kind: "tool", name: t.name })}
                        aria-pressed={selection?.kind === "tool" && selection.name === t.name}
                        style={{ "--c": group.color } as React.CSSProperties}
                        className={
                          "rounded-full border px-2.5 py-1 text-xs transition-all duration-300 sm:px-3.5 sm:py-1.5 sm:text-sm " +
                          // Dim with color, not opacity: the chips stay opaque so the curves pass behind them.
                          (lit
                            ? "border-[var(--c)] bg-[color-mix(in_oklab,var(--c)_18%,var(--surface))] text-ink"
                            : "border-line bg-surface-2 " + (selection ? "text-faint" : ""))
                        }
                      >
                        {t.name}
                        <span className="ml-1 text-[10px] text-faint tabular-nums sm:ml-1.5 sm:text-xs">{t.usedIn.length}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <ul className="relative z-10 grid content-start gap-0.5 md:gap-1">
          {toolboxProjects.map((name) => {
            const lit = litProjects.has(name);
            const color = colorOf(name);
            return (
              <li key={name}>
                <button
                  type="button"
                  ref={(el) => {
                    if (el) projectEls.current.set(name, el);
                  }}
                  onMouseEnter={() => pick({ kind: "project", name })}
                  onFocus={() => pick({ kind: "project", name })}
                  onClick={() => pick({ kind: "project", name })}
                  aria-pressed={selection?.kind === "project" && selection.name === name}
                  className={
                    "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs leading-tight transition-all duration-300 sm:gap-2.5 sm:px-3 sm:text-sm md:rounded-xl md:text-[15px] " +
                    (lit ? "bg-surface-2 font-semibold text-ink" : selection ? "text-faint" : "text-muted")
                  }
                >
                  <motion.span
                    animate={{ scale: lit ? 1.35 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="inline-block size-2.5 shrink-0 rounded-[3px]"
                    style={{ background: color ?? "var(--faint)" }}
                  />
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-10 border-t border-line pt-5 text-sm text-muted">
        Also comfortable with {list(alsoComfortableWith)}.
      </p>
    </div>
  );
}
