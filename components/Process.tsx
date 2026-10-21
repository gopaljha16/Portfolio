"use client";

import { useEffect, useRef, useState } from "react";
import { m as motion, useInView, useReducedMotion } from "framer-motion";
import { workflow } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
const stepColors = ["#5B8CFF", "#E9479A", "#22A06B"];

const ink = { fill: "var(--ink)" };
const faint = { fill: "var(--faint)" };
const panel = { fill: "var(--surface)", stroke: "var(--line)" };

/** Architect: three tables appear, then the relations between them draw in and start to carry data. */
function SchemaArt({ color }: { color: string }) {
  const tables = [
    { x: 18, y: 26, name: "users", rows: [44, 30, 38] },
    { x: 122, y: 104, name: "projects", rows: [36, 46, 28] },
    { x: 226, y: 26, name: "contests", rows: [40, 26, 34] },
  ];
  const links = ["M 98 56 C 120 56, 110 134, 122 134", "M 226 56 C 204 56, 214 134, 202 134"];
  return (
    <svg viewBox="0 0 324 200" className="h-full w-full">
      {links.map((d, i) => (
        <g key={d}>
          <motion.path
            d={d}
            fill="none"
            strokeWidth={2}
            style={{ stroke: "var(--line)" }}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.2, ease }}
          />
          <motion.path
            d={d}
            fill="none"
            strokeWidth={2}
            strokeDasharray="5 7"
            style={{ stroke: color }}
            initial={{ opacity: 0, strokeDashoffset: 0 }}
            whileInView={{ opacity: 1, strokeDashoffset: -48 }}
            viewport={{ once: true }}
            transition={{
              opacity: { delay: 1.4 + i * 0.2, duration: 0.4 },
              strokeDashoffset: { delay: 1.4, duration: 2, repeat: Infinity, ease: "linear" },
            }}
          />
        </g>
      ))}
      {tables.map((t, i) => (
        <motion.g
          key={t.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15, ease }}
        >
          <rect x={t.x} y={t.y} width={80} height={62} rx={9} strokeWidth={1.5} style={panel} />
          <rect x={t.x} y={t.y} width={80} height={18} rx={9} style={{ fill: color, opacity: 0.22 }} />
          <text x={t.x + 9} y={t.y + 13} fontSize={9} fontWeight={600} fontFamily="ui-monospace, monospace" style={ink}>
            {t.name}
          </text>
          {t.rows.map((w, r) => (
            <rect key={r} x={t.x + 9} y={t.y + 26 + r * 11} width={w} height={5} rx={2.5} style={{ ...faint, opacity: 0.45 }} />
          ))}
          <circle cx={t.x + 70} cy={t.y + 28} r={2.5} style={{ fill: color }} />
        </motion.g>
      ))}
    </svg>
  );
}

/** Develop: a page assembles itself block by block, then a cursor comes in and presses the button. */
function BuildArt({ color }: { color: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setCycle((c) => c + 1), 5200);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const block = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease },
  });

  return (
    <svg ref={ref} viewBox="0 0 324 200" className="h-full w-full">
      <rect x={22} y={16} width={280} height={168} rx={12} strokeWidth={1.5} style={panel} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={36 + i * 10} cy={29} r={3} style={{ ...faint, opacity: 0.5 }} />
      ))}
      <line x1={22} x2={302} y1={40} y2={40} strokeWidth={1.5} style={{ stroke: "var(--line)" }} />
      {inView && (
        <g key={cycle}>
          <motion.rect x={36} y={50} width={44} height={6} rx={3} style={{ ...faint, opacity: 0.6 }} {...block(0)} />
          <motion.rect x={226} y={50} width={62} height={6} rx={3} style={{ ...faint, opacity: 0.35 }} {...block(0.05)} />
          <motion.rect x={36} y={72} width={150} height={12} rx={4} style={ink} {...block(0.3)} />
          <motion.rect x={36} y={90} width={110} height={12} rx={4} style={ink} {...block(0.4)} />
          <motion.rect x={36} y={110} width={130} height={5} rx={2.5} style={{ ...faint, opacity: 0.5 }} {...block(0.6)} />
          <motion.rect
            x={36}
            y={124}
            width={58}
            height={16}
            rx={8}
            style={{ fill: color, transformOrigin: "65px 132px" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [0.6, 1, 1, 0.88, 1] }}
            transition={{ duration: 3, delay: 0.8, times: [0, 0.12, 0.62, 0.68, 0.76] }}
          />
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={i}
              x={36 + i * 86}
              y={150}
              width={78}
              height={22}
              rx={6}
              style={{ fill: "var(--surface-2)" }}
              {...block(1.1 + i * 0.12)}
            />
          ))}
          <motion.rect x={204} y={68} width={84} height={68} rx={10} style={{ fill: color, opacity: 0.25 }} {...block(0.5)} />
          <motion.path
            d="M0 0 L0 14 L4 10 L7 16 L9 15 L6 9 L11 9 Z"
            style={{ ...ink, stroke: "var(--surface)" }}
            strokeWidth={1}
            initial={{ x: 250, y: 190, opacity: 0 }}
            animate={{ x: [250, 250, 70, 70], y: [190, 190, 130, 130], opacity: [0, 1, 1, 1] }}
            transition={{ duration: 2.6, delay: 1.2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
          />
        </g>
      )}
    </svg>
  );
}

/** Deploy: one build fans out to three regions, with packets flowing for as long as it's on screen. */
function ShipArt({ color }: { color: string }) {
  const reduce = useReducedMotion();
  const regions = [
    { y: 34, name: "bom1" },
    { y: 92, name: "fra1" },
    { y: 150, name: "iad1" },
  ];
  const paths = regions.map((r) => `M 92 100 C 150 100, 150 ${r.y + 14}, 206 ${r.y + 14}`);
  return (
    <svg viewBox="0 0 324 200" className="h-full w-full">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          id={`ship-path-${i}`}
          d={d}
          fill="none"
          strokeWidth={2}
          style={{ stroke: "var(--line)" }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease }}
        />
      ))}
      {!reduce &&
        paths.map((d, i) =>
          [0, 1].map((k) => (
            <circle key={`${i}-${k}`} r={3.5} style={{ fill: color }}>
              <animateMotion dur="1.8s" begin={`${1 + i * 0.3 + k * 0.9}s`} repeatCount="indefinite" path={d} />
            </circle>
          )),
        )}

      <motion.g initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
        <rect x={20} y={74} width={72} height={52} rx={10} strokeWidth={1.5} style={panel} />
        <circle cx={38} cy={92} r={4} style={{ fill: color }} />
        <line x1={38} x2={38} y1={96} y2={110} strokeWidth={2} style={{ stroke: color }} />
        <circle cx={38} cy={112} r={4} style={{ fill: "none", stroke: color }} strokeWidth={2} />
        <text x={50} y={96} fontSize={9} fontWeight={600} fontFamily="ui-monospace, monospace" style={ink}>
          main
        </text>
        <rect x={50} y={104} width={30} height={5} rx={2.5} style={{ ...faint, opacity: 0.5 }} />
      </motion.g>

      {regions.map((r, i) => (
        <motion.g
          key={r.name}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease }}
        >
          <rect x={206} y={r.y} width={98} height={28} rx={8} strokeWidth={1.5} style={panel} />
          <text x={218} y={r.y + 18} fontSize={9} fontWeight={600} fontFamily="ui-monospace, monospace" style={ink}>
            {r.name}
          </text>
          {[0, 1, 2].map((d) => (
            <motion.circle
              key={d}
              cx={262 + d * 11}
              cy={r.y + 14}
              r={3}
              style={{ fill: color }}
              animate={reduce ? { opacity: 1 } : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: d * 0.2 + i * 0.3 }}
            />
          ))}
        </motion.g>
      ))}
    </svg>
  );
}

const art = [SchemaArt, BuildArt, ShipArt];

export function Process() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">How a project moves</h3>
        <p className="text-[15px] text-muted">The same three steps, from the first schema to the last deploy.</p>
      </div>
      <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-5">
        {workflow.map((step, i) => {
          const Art = art[i];
          return (
            <li key={step.title} className="flex flex-col">
              <div aria-hidden className="dot-grid aspect-[324/200] overflow-hidden rounded-2xl border border-line bg-surface-2">
                <Art color={stepColors[i]} />
              </div>
              <p className="mt-5 flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-full text-sm font-semibold text-[#12141b]" style={{ background: stepColors[i] }}>
                  {i + 1}
                </span>
                <span className="font-display text-xl font-semibold tracking-tight">{step.title}</span>
              </p>
              <p className="mt-2 max-w-[38ch] text-[15px] leading-relaxed text-muted">{step.copy}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
