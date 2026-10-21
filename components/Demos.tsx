"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, m as motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { Check, GitCommitHorizontal, RotateCcw } from "lucide-react";
import { inkOn, profile, projects, toolbox } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const list = (names: string[]) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

/* ------------------------------------------------------------------ */
/* Frontend: a live component you can tune                             */
/* ------------------------------------------------------------------ */

const notifications: Record<string, { message: string; action: string }> = {
  codexa: { message: "Weekly contest starts in 5 min", action: "Join contest" },
  quibly: { message: "12 new messages in #product-launch", action: "Open channel" },
  elevare: { message: "Your resume is ready to review", action: "Review resume" },
  lynkr: { message: "Your link page is getting clicks", action: "See analytics" },
  "console-me": { message: "Someone wants to video chat", action: "Say hello" },
  elyra: { message: "Elyra is in the works", action: "Notify me" },
};

const motionPresets: Record<"Bouncy" | "Smooth" | "Off", Transition> = {
  Bouncy: { type: "spring", stiffness: 520, damping: 13 },
  Smooth: { type: "spring", stiffness: 240, damping: 30 },
  Off: { duration: 0 },
};
type MotionName = keyof typeof motionPresets;

export function InterfaceTuner() {
  const [pick, setPick] = useState(1);
  const [radius, setRadius] = useState(18);
  const [motionName, setMotionName] = useState<MotionName>("Bouncy");
  const [on, setOn] = useState(true);
  const [replay, setReplay] = useState(0);
  const reduce = useReducedMotion();

  const project = projects[pick];
  const accent = project.color;
  const ink = inkOn(project);
  const spring = reduce ? motionPresets.Off : motionPresets[motionName];
  const copy = notifications[project.slug];

  return (
    <div className="grid flex-1 gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div className="dot-grid relative grid min-h-[260px] place-items-center overflow-hidden rounded-2xl border border-line bg-surface-2 p-6">
        <motion.div
          key={replay}
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={spring}
          style={{ borderRadius: radius }}
          className="w-full max-w-[290px] border border-line bg-surface p-4 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.45)]"
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ backgroundColor: accent, color: ink }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: Math.max(radius * 0.55, 4) }}
              className="grid size-10 shrink-0 place-items-center font-display text-lg font-bold"
            >
              {project.name[0]}
            </motion.span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{project.name}</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={copy.message}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="truncate text-xs text-muted"
                >
                  {copy.message}
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-label="Notifications"
              onClick={() => setOn((o) => !o)}
              className="relative h-6 w-10 shrink-0 rounded-full transition-colors duration-300"
              style={{ background: on ? accent : "var(--line)" }}
            >
              <motion.span
                animate={{ x: on ? 18 : 2 }}
                transition={spring}
                className="absolute left-0 top-[3px] size-[18px] rounded-full bg-white shadow"
              />
            </button>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              animate={{ width: on ? "74%" : "22%", backgroundColor: accent }}
              transition={spring}
              className="h-full rounded-full"
            />
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            animate={{ backgroundColor: accent, color: ink }}
            transition={{ duration: 0.3 }}
            style={{ borderRadius: Math.max(radius * 0.65, 4) }}
            className="mt-4 w-full py-2.5 text-sm font-semibold"
          >
            {copy.action}
          </motion.button>
        </motion.div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-line p-5">
        <div>
          <p className="mb-2.5 text-sm text-muted">Accent</p>
          <div className="flex flex-wrap gap-1.5">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={`${p.name} color`}
                aria-pressed={i === pick}
                onClick={() => setPick(i)}
                className="relative size-7 rounded-full transition-transform hover:scale-110"
                style={{ background: p.color }}
              >
                {i === pick && (
                  <motion.span
                    layoutId="tuner-accent"
                    className="absolute -inset-1 rounded-full border-2 border-ink"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-2.5 flex justify-between text-sm text-muted">
            Corner radius <span className="tabular-nums text-ink">{radius}px</span>
          </span>
          <input
            type="range"
            min={4}
            max={28}
            value={radius}
            onChange={(e) => setRadius(+e.target.value)}
            className="w-full"
            style={{ accentColor: accent }}
          />
        </label>

        <div>
          <p className="mb-2.5 text-sm text-muted">Motion</p>
          <LayoutGroup id="tuner-motion">
            <div role="radiogroup" aria-label="Motion" className="flex gap-1 rounded-full bg-surface-2 p-1">
              {(Object.keys(motionPresets) as MotionName[]).map((name) => (
                <button
                  key={name}
                  type="button"
                  role="radio"
                  aria-checked={motionName === name}
                  onClick={() => {
                    setMotionName(name);
                    setReplay((r) => r + 1);
                  }}
                  className={"relative flex-1 rounded-full py-1.5 text-sm transition-colors " + (motionName === name ? "text-ink" : "text-muted")}
                >
                  {motionName === name && (
                    <motion.span layoutId="tuner-motion-pill" className="absolute inset-0 rounded-full bg-surface shadow-sm" />
                  )}
                  <span className="relative">{name}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <button
          type="button"
          onClick={() => setReplay((r) => r + 1)}
          className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <RotateCcw size={14} /> Replay the entrance
        </button>
      </div>

      <p aria-hidden className="truncate font-mono text-[12px] text-faint md:col-span-2">
        {`<Card radius={${radius}} accent="${accent}" motion="${motionName.toLowerCase()}" />`}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Backend: a request log with latency, while on screen                 */
/* ------------------------------------------------------------------ */

const requests = [
  ["GET", "/api/problems", 200, 41],
  ["POST", "/api/submissions", 201, 118],
  ["GET", "/api/contests/live", 200, 23],
  ["WS", "room:join", 101, 6],
  ["POST", "/api/resume/score", 200, 342],
  ["GET", "/l/creator-workshop", 302, 9],
  ["GET", "/api/channels", 200, 17],
  ["GET", "/api/leaderboard", 200, 34],
] as const;

// Deterministic jitter, so server and client agree and the line looks alive.
const latencyAt = (n: number) => Math.round(38 + Math.sin(n * 1.7) * 18 + Math.sin(n * 0.43) * 22 + (n % 7 === 0 ? 70 : 0));

export function LiveApi({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(30);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const rows = [4, 3, 2, 1, 0].map((k) => ({ n: tick - k, r: requests[(tick - k) % requests.length] }));
  const series = Array.from({ length: 30 }, (_, i) => latencyAt(tick - 29 + i));
  const sorted = [...series].sort((a, b) => a - b);
  const p50 = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const max = Math.max(...series, 1);
  const line = series.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (series.length - 1)) * 300} ${52 - (v / max) * 44}`).join(" ");

  return (
    <div ref={ref} className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-surface-2">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs">
        <span className="flex items-center gap-2 font-medium">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ background: color }} />
            <span className="relative inline-flex size-2 rounded-full" style={{ background: color }} />
          </span>
          Live
        </span>
        <span className="text-faint">Simulated traffic</span>
      </div>

      <dl className="grid grid-cols-3 border-b border-line text-center">
        {[
          ["p50", `${p50}ms`],
          ["p95", `${p95}ms`],
          ["Errors", "0"],
        ].map(([label, value]) => (
          <div key={label} className="border-r border-line py-3 last:border-r-0">
            <dt className="text-xs text-faint">{label}</dt>
            <dd className="mt-0.5 font-display text-lg font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      <div aria-hidden className="flex-1 px-4 py-2 font-mono text-[12px] leading-7">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map(({ n, r: [method, path, status, ms] }) => (
            <motion.div
              key={n}
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 whitespace-nowrap"
            >
              <span className="w-9 text-faint">{method}</span>
              <span className="min-w-0 flex-1 truncate">{path}</span>
              <span style={{ color: status < 300 ? color : "var(--faint)" }}>{status}</span>
              <span className="w-12 text-right text-faint">{ms}ms</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div aria-hidden className="border-t border-line px-4 pb-3 pt-2">
        <p className="mb-1 text-xs text-faint">Latency, last 30 requests</p>
        <svg viewBox="0 0 300 56" preserveAspectRatio="none" className="h-14 w-full overflow-visible">
          <path d={`${line} L 300 56 L 0 56 Z`} style={{ fill: `color-mix(in oklab, ${color} 14%, transparent)` }} />
          <path d={line} fill="none" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" style={{ stroke: color }} />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cloud & DevOps: a commit going out as a rolling update               */
/* ------------------------------------------------------------------ */

const commits = [
  ["a3f9c1e", "feat: live contest leaderboard"],
  ["7be2d40", "fix: reconnect voice rooms faster"],
  ["c19a5f2", "perf: cache problem list in Redis"],
  ["e84b07d", "feat: ATS keyword hints"],
];
const PODS = 6;
const BUILD = 1400;
const TEST = 1400;
const ROLL = 3000;
const HOLD = 2600;

export function RollingDeploy({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  // One state object, so a finished run resets the clock and bumps the version in a single update.
  const [{ t, run }, setClock] = useState({ t: 0, run: 0 });

  useEffect(() => {
    if (reduce) return setClock({ t: BUILD + TEST + ROLL, run: 0 });
    if (!inView) return;
    const id = setInterval(() => {
      setClock((c) => (c.t + 100 > BUILD + TEST + ROLL + HOLD ? { t: 0, run: c.run + 1 } : { t: c.t + 100, run: c.run }));
    }, 100);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
  const stages = [
    { label: "Build", p: clamp(t / BUILD) },
    { label: "Test", p: clamp((t - BUILD) / TEST) },
    { label: "Deploy", p: clamp((t - BUILD - TEST) / ROLL) },
  ];
  const updated = Math.floor(stages[2].p * PODS + 0.0001);
  const done = stages[2].p >= 1;
  const [hash, message] = commits[run % commits.length];
  const version = 41 + run;
  const elapsed = Math.min(t, BUILD + TEST + ROLL) / 1000;

  let status = "Building the image";
  if (done) status = `v${version + 1} is live on all ${PODS} pods`;
  else if (stages[2].p > 0) status = `Rolling out: ${updated} of ${PODS} pods updated`;
  else if (stages[1].p > 0) status = "Running the test suite";

  return (
    <div ref={ref} aria-hidden className="flex flex-1 flex-col gap-4 rounded-2xl border border-line bg-surface-2 p-4">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="flex min-w-0 items-center gap-2">
          <GitCommitHorizontal size={15} className="shrink-0 text-faint" />
          <span className="font-mono text-faint">{hash}</span>
          <span className="truncate">{message}</span>
        </span>
        <span className="shrink-0 font-mono tabular-nums text-faint">{elapsed.toFixed(1)}s</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stages.map((s) => (
          <div key={s.label}>
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
              {s.p >= 1 ? (
                <Check size={14} strokeWidth={3} style={{ color }} />
              ) : (
                <motion.span
                  className="size-1.5 rounded-full bg-current"
                  animate={s.p > 0 ? { opacity: [1, 0.2, 1] } : { opacity: 0.3 }}
                  transition={s.p > 0 ? { duration: 0.6, repeat: Infinity } : {}}
                />
              )}
              {s.label}
            </p>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${s.p * 100}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2">
        {Array.from({ length: PODS }, (_, i) => {
          const isNew = i < updated;
          return (
            <div key={i} className="relative min-h-[52px] [perspective:400px]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isNew ? `new-${run}` : `old-${run}`}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="absolute inset-0 flex flex-col justify-between rounded-xl px-3 py-2 text-xs"
                  style={isNew ? { background: color, color: "#12141b" } : { background: "var(--surface)", color: "var(--faint)" }}
                >
                  <span className="font-mono">pod-{i + 1}</span>
                  <span className="font-display text-sm font-semibold">v{isNew ? version + 1 : version}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="flex items-center gap-2 text-sm font-medium">
        {done ? <Check size={15} strokeWidth={3} style={{ color }} /> : <span className="size-1.5 animate-pulse rounded-full" style={{ background: color }} />}
        {status}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI: questions answered from this page's own data                     */
/* ------------------------------------------------------------------ */

const allTools = toolbox.flatMap((g) => g.tools);
const toolsOf = (project: string) => allTools.filter((t) => t.usedIn.includes(project)).map((t) => t.name);
const whereUsed = (tool: string) => allTools.find((t) => t.name === tool)?.usedIn ?? [];

const questions: { q: string; a: () => string }[] = [
  {
    q: "Which projects use AI?",
    a: () =>
      `${projects
        .filter((p) => p.aiUse)
        .map((p) => `${p.name} ${p.aiUse}`)
        .join(", and ")}, both with Gemini. Revueon puts Gemini, OpenAI, DeepSeek or Grok inside VS Code.`,
  },
  { q: "What is Quibly built with?", a: () => `Quibly runs on ${list(toolsOf("Quibly"))}.` },
  { q: "Where has Socket.IO shipped?", a: () => `In ${list(whereUsed("Socket.IO"))}.` },
  {
    q: "Is Gopal open to work?",
    a: () => `Yes: freelance projects, full-time roles and product consulting. Email ${profile.email} and expect a reply within a day.`,
  },
];

export function AskPortfolio({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [asked, setAsked] = useState<number[]>([]);
  const [shown, setShown] = useState(0);

  const current = asked.at(-1);
  const answer = useMemo(() => (current === undefined ? "" : questions[current].a()), [current]);

  // Ask the first question on its own the first time the tile appears.
  useEffect(() => {
    if (inView && asked.length === 0) setAsked([0]);
  }, [inView, asked.length]);

  useEffect(() => {
    if (!answer) return;
    if (reduce) return setShown(answer.length);
    setShown(0);
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= answer.length) clearInterval(id);
        return Math.min(n + 2, answer.length);
      });
    }, 22);
    return () => clearInterval(id);
  }, [answer, reduce]);

  const ask = (i: number) => setAsked((a) => [...a.filter((x) => x !== i), i].slice(-2));
  const streaming = shown < answer.length;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-4">
      <div className="flex min-h-[210px] flex-1 flex-col justify-end gap-3 overflow-hidden rounded-2xl border border-line bg-surface-2 p-4">
        <AnimatePresence initial={false} mode="popLayout">
          {asked.map((qi, idx) => {
            const isLatest = idx === asked.length - 1;
            const text = isLatest ? answer.slice(0, shown) : questions[qi].a();
            return (
              <motion.div
                key={qi}
                layout="position"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: isLatest ? 1 : 0.5, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease }}
                className="flex flex-col gap-2"
              >
                <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-surface px-4 py-2.5 text-[15px]">{questions[qi].q}</p>
                <p
                  className="max-w-[90%] rounded-2xl rounded-bl-md px-4 py-2.5 text-[15px] leading-relaxed"
                  style={{ background: color, color: "#000" }}
                  aria-live={isLatest ? "polite" : undefined}
                >
                  {text}
                  {isLatest && streaming && (
                    <motion.span
                      aria-hidden
                      className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 rounded-sm bg-black"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((item, i) => (
          <button
            key={item.q}
            type="button"
            onClick={() => ask(i)}
            aria-pressed={current === i}
            style={{ "--c": color } as React.CSSProperties}
            className={
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors " +
              (current === i
                ? "border-[var(--c)] bg-[color-mix(in_oklab,var(--c)_16%,transparent)] text-ink"
                : "border-line text-muted hover:border-[var(--c)] hover:text-ink")
            }
          >
            {item.q}
          </button>
        ))}
      </div>
      <p className="text-xs text-faint">Answers come straight from this page&apos;s own data. No model, no guessing.</p>
    </div>
  );
}
