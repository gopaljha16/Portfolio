"use client";

import { useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { Award } from "lucide-react";
import { experience, startedAlongside, type Role } from "@/lib/data";
import { Bento, RevealWords, SectionHead, Tile } from "./Bento";

const ease = [0.22, 1, 0.36, 1] as const;

// The shared axis runs from Oct 2025 (0) to the start of Nov 2026 (13).
const AXIS = 13;
const pct = (months: number) => `${(months / AXIS) * 100}%`;
const ticks = [
  { at: 0, label: "Oct 2025" },
  { at: 2, label: "Dec" },
  { at: 4, label: "Feb 2026" },
  { at: 6, label: "Apr" },
  { at: 8, label: "Jun" },
  { at: 10, label: "Aug" },
  { at: 12, label: "Oct" },
];
const slug = (r: Role) => r.company.toLowerCase().replace(/\s+/g, "-");

/** Both roles and my own projects on one time axis, so the overlap is visible at a glance. */
function TimeAxis() {
  const [hover, setHover] = useState<string | null>(null);
  const lane = "relative h-12 rounded-xl bg-surface-2 [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px)] [background-size:calc(100%/13)_100%]";

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">October 2025 to now</h3>
        <p className="text-[15px] text-muted">Roles on top. Underneath, the projects I started on my own over the same months.</p>
      </div>

      {/* On phones each label sits above its lane, so the axis gets the full width. */}
      <div className="mt-8 grid grid-cols-1 items-center gap-x-4 gap-y-2 md:grid-cols-[140px_minmax(0,1fr)] md:gap-y-3">
        <p className="text-sm text-muted">Roles</p>
        <div className={lane}>
          {experience.map((r, i) => (
            <motion.a
              key={r.company}
              href={`#role-${slug(r)}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease }}
              className="absolute inset-y-1.5 flex origin-left items-center overflow-hidden rounded-[8px] px-2 text-sm font-semibold sm:px-3 text-[#12141b] transition-[filter] hover:brightness-110"
              style={{ left: pct(r.span[0]), width: pct(r.span[1] - r.span[0]), background: r.color }}
            >
              <span className="truncate">{r.company}</span>
            </motion.a>
          ))}
        </div>

        <p className="mt-2 text-sm leading-tight text-muted md:mt-0">
          Own projects
          <span className="ml-1.5 text-xs text-faint md:ml-0 md:block">by first commit</span>
        </p>
        <div className={lane}>
          {startedAlongside.map((p, i) => (
            <motion.button
              key={p.name}
              type="button"
              aria-label={`${p.name}, started ${p.month}`}
              onMouseEnter={() => setHover(p.name)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.name)}
              onBlur={() => setHover(null)}
              onClick={() => setHover((h) => (h === p.name ? null : p.name))}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 420, damping: 16, delay: 0.6 + i * 0.08 }}
              className="absolute top-1/2 -ml-1.5 -mt-1.5 size-3 rounded-full ring-2 ring-surface-2 sm:-ml-2 sm:-mt-2 sm:size-4 sm:ring-4"
              style={{ left: pct(p.at), background: p.color }}
            >
              <AnimatePresence>
                {hover === p.name && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-[calc(100%+10px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-medium text-inverse"
                  >
                    {p.name}, {p.month}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <span className="hidden md:block" />
        <div className="relative h-5">
          {ticks.map((t, i) => (
            <span
              key={t.at}
              className={"absolute top-0 whitespace-nowrap text-xs text-faint " + (i % 2 ? "hidden sm:block" : "")}
              style={{ left: pct(t.at) }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Certificate({ text, color }: { text: string; color: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-4">
      {/* A sheen passes over the badge on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
      />
      <p className="flex items-center gap-2 text-sm font-semibold">
        <motion.span
          initial={{ rotate: -30, scale: 0.6 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.3 }}
          className="grid size-8 place-items-center rounded-full"
          style={{ background: color, color: "#12141b" }}
        >
          <Award size={16} />
        </motion.span>
        Certified
      </p>
      <p className="mt-2 text-sm leading-snug text-muted">{text}</p>
    </div>
  );
}

function RoleCard({ role }: { role: Role }) {
  return (
    <Tile id={`role-${slug(role)}`} className="col-span-2 scroll-mt-28 md:col-span-12">
      <div className="grid gap-10 p-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] md:gap-14 md:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <motion.span
              initial={{ rotate: -8, scale: 0.85, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="grid size-14 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold text-[#12141b]"
              style={{ background: role.color }}
              aria-hidden
            >
              {role.monogram}
            </motion.span>
            <div>
              <p className="font-display text-lg font-semibold">{role.company}</p>
              <p className="text-sm text-muted">
                {role.type}, {role.place.toLowerCase()}
              </p>
            </div>
          </div>
          <div>
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-none tracking-[-0.03em]">{role.period}</p>
            <p className="mt-2 text-sm text-muted">{role.duration}</p>
          </div>
          {role.certificate && <Certificate text={role.certificate} color={role.color} />}
        </div>

        <div>
          <RevealWords
            as="h3"
            text={role.role}
            className="font-display text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          />
          <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-muted">{role.summary}</p>
          <ul className="mt-6 space-y-3">
            {role.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
                className="flex gap-3.5 text-[15px] leading-relaxed"
              >
                <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-[2px]" style={{ background: role.color }} />
                {h}
              </motion.li>
            ))}
          </ul>
          <ul className="mt-7 flex flex-wrap gap-1.5">
            {role.skills.map((s) => (
              <li key={s} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-[13px] text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Tile>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="pt-24 md:pt-40">
      <SectionHead
        id="experience-title"
        title="Experience"
        intro="An internship and a freelance run, with my own projects running alongside both."
      />
      <Bento>
        <Tile className="col-span-2 md:col-span-12">
          <TimeAxis />
        </Tile>
        {experience.map((r) => (
          <RoleCard key={r.company} role={r} />
        ))}
      </Bento>
    </section>
  );
}
