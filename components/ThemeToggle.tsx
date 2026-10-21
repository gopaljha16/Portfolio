"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { isDark, toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  // Follow the <html> class, so changes from the command menu show up here too.
  useEffect(() => {
    setDark(isDark());
    const observer = new MutationObserver(() => setDark(isDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-9 place-items-center overflow-hidden rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark !== null && (
          <motion.span
            key={dark ? "sun" : "moon"}
            initial={{ y: 14, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
