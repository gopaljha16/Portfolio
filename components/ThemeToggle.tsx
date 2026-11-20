"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  return (
    <button type="button" className="site-icon-button" onClick={toggleTheme} aria-label="Toggle color theme">
      <Moon size={17} className="dark:hidden" aria-hidden="true" />
      <Sun size={17} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
