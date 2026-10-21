"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Copy, CornerDownLeft, Hash, Moon, Search } from "lucide-react";
import { caseStudies, profile } from "@/lib/data";
import { toggleTheme } from "@/lib/theme";
import { Swatch } from "./Bento";

export const OPEN_COMMAND_MENU = "open-command-menu";

const socialNames = { github: "GitHub", linkedin: "LinkedIn", x: "X" };

type Item = {
  id: string;
  group: "Go to" | "Case studies" | "Actions";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  const close = useCallback(() => setOpen(false), []);

  const goToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (pathname === "/" && el) {
        if (lenis) lenis.scrollTo(el, { offset: -80 });
        else el.scrollIntoView({ behavior: "smooth" });
      } else router.push(`/#${id}`);
    },
    [lenis, pathname, router],
  );

  const items = useMemo<Item[]>(
    () => [
      ...["Work", "Experience", "Skills", "About", "Contact"].map((s) => ({
        id: `go-${s}`,
        group: "Go to" as const,
        label: s,
        icon: <Hash size={16} />,
        run: () => goToSection(s.toLowerCase()),
      })),
      ...caseStudies.map((p) => ({
        id: `cs-${p.slug}`,
        group: "Case studies" as const,
        label: p.name,
        hint: p.tagline,
        icon: <Swatch color={p.color} className="size-3" />,
        run: () => router.push(`/work/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: <Copy size={16} />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => {
            setToast("Email address copied");
            setTimeout(() => setToast(null), 1800);
          });
        },
      },
      { id: "theme", group: "Actions", label: "Switch theme", icon: <Moon size={16} />, run: () => toggleTheme() },
      ...(Object.entries(profile.links) as [keyof typeof socialNames, string][]).map(([key, href]) => ({
        id: `open-${key}`,
        group: "Actions" as const,
        label: `Open ${socialNames[key]}`,
        icon: <ArrowUpRight size={16} />,
        run: () => window.open(href, "_blank", "noopener"),
      })),
    ],
    [goToSection, router],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  // Cmd/Ctrl+K anywhere, or the nav button, opens the menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      lenis?.stop();
      requestAnimationFrame(() => input.current?.focus());
    } else {
      lenis?.start();
      returnFocus.current?.focus?.();
    }
  }, [open, lenis]);

  useEffect(() => setActive(0), [query]);

  const runItem = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    // Let the dialog close before scrolling or navigating.
    setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 px-3 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
            data-lenis-prevent
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="w-full max-w-[560px] overflow-hidden rounded-[22px] border border-line bg-surface shadow-2xl"
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={17} className="shrink-0 text-faint" />
                <input
                  ref={input}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section, project or action"
                  aria-label="Search commands"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-list"
                  aria-activedescendant={filtered[active]?.id}
                  className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-faint"
                />
                <kbd className="rounded-md border border-line px-1.5 py-0.5 text-xs text-faint">Esc</kbd>
              </div>
              <ul id="command-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
                {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">Nothing matches “{query}”.</li>}
                {filtered.map((item, i) => {
                  const header = item.group !== lastGroup ? item.group : null;
                  lastGroup = item.group;
                  return (
                    <li key={item.id} role="presentation">
                      {header && <p className="px-3 pb-1.5 pt-3 text-xs text-faint">{header}</p>}
                      <div
                        id={item.id}
                        role="option"
                        aria-selected={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => runItem(item)}
                        className={
                          "relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] " +
                          (i === active ? "text-ink" : "text-muted")
                        }
                      >
                        {i === active && (
                          <motion.span
                            layoutId="command-active"
                            className="absolute inset-0 rounded-xl bg-surface-2"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                          />
                        )}
                        <span className="relative grid size-5 place-items-center">{item.icon}</span>
                        <span className="relative flex-1 truncate">
                          {item.label}
                          {item.hint && <span className="ml-2 text-sm text-faint">{item.hint}</span>}
                        </span>
                        {i === active && <CornerDownLeft size={15} className="relative text-faint" />}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-inverse"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
