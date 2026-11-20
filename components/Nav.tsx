"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { OPEN_COMMAND_MENU } from "@/lib/events";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <header className="site-header">
      <nav
        aria-label="Main"
        className="site-shell site-nav"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <Link href="/" className="site-wordmark" aria-label="Gopal Jha home" onClick={() => setOpen(false)}>
          GJ
        </Link>
        <ul id="main-nav-links" className="site-nav-links" data-open={open}>
          {sections.map(({ id, label }) => (
            <li key={id}><Link href={`/#${id}`} onClick={() => setOpen(false)}>{label}</Link></li>
          ))}
        </ul>
        <div className="site-nav-actions">
          <button
            type="button"
            className="site-icon-button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
            }}
            aria-label="Open command menu"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <Command size={17} aria-hidden="true" />
          </button>
          <ThemeToggle />
          <button
            ref={toggle}
            type="button"
            className="site-icon-button site-menu-toggle"
            aria-controls="main-nav-links"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((previous) => !previous)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
