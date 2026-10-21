"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m as motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { projects, profile } from "@/lib/data";
import { OPEN_COMMAND_MENU, SECTION_HYDRATED } from "@/lib/events";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/** Six small squares in the product colors: a bento, as a logo. */
export function Mark({ size = 18 }: { size?: number }) {
  return (
    <span aria-hidden className="grid shrink-0 grid-cols-3 gap-[2px]" style={{ width: size, height: (size * 2) / 3 }}>
      {projects.map((p) => (
        <span key={p.slug} className="rounded-[1.5px]" style={{ background: p.color }} />
      ))}
    </span>
  );
}

/**
 * The section crossing the middle of the screen. An IntersectionObserver never forces layout;
 * it re-attaches whenever a lazily hydrated section wakes up and replaces its elements.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return setActive(null);
    const ids = ["top", "glance", ...sections.map((s) => s.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const observeAll = () => {
      observer.disconnect();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    };
    observeAll();
    window.addEventListener(SECTION_HYDRATED, observeAll);
    return () => {
      observer.disconnect();
      window.removeEventListener(SECTION_HYDRATED, observeAll);
    };
  }, [enabled]);
  return active;
}

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;

  // Get out of the way while reading down the page; come back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last && !openRef.current);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      {/* Grows with scroll through a CSS scroll timeline (.scroll-progress): no JavaScript per frame. */}
      <div aria-hidden className="scroll-progress product-stripe fixed inset-x-0 top-0 z-[60] h-[3px] origin-left" />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
      >
        <nav aria-label="Main" className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full border border-line bg-surface/80 py-1.5 pl-4 pr-1.5 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
            <Mark />
            {profile.name}
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <li key={s.id} className="relative">
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Link
                  href={href(s.id)}
                  className={
                    "relative block rounded-full px-4 py-2 text-sm transition-colors " +
                    (active === s.id ? "text-ink" : "text-muted hover:text-ink")
                  }
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
              aria-label="Open command menu"
              className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink sm:flex"
            >
              <Command size={14} />K
            </button>
            <ThemeToggle />
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-inverse transition-transform hover:scale-[1.03] active:scale-[0.98] sm:block"
            >
              Email me
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full text-ink hover:bg-surface-2 lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-2 grid max-w-[1240px] grid-cols-2 gap-1 rounded-[22px] border border-line bg-surface/95 p-2 backdrop-blur-xl lg:hidden"
            >
              {sections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={href(s.id)}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-lg font-medium hover:bg-surface-2"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
                  }}
                  className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left font-display text-lg font-medium hover:bg-surface-2"
                >
                  <Command size={16} /> Jump anywhere
                </button>
              </li>
              <li className="col-span-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="block rounded-2xl bg-ink px-4 py-3 text-center font-medium text-inverse"
                >
                  Email me
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
