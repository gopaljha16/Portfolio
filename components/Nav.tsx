"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, X } from "lucide-react";
import { profile } from "@/lib/data";
import { OPEN_COMMAND_MENU } from "@/lib/events";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const sectionIds = ["top", "work", "about", "github", "contact"] as const;
type Section = (typeof sectionIds)[number];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<Section>("top");
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const activeSection = pathname.startsWith("/work/") ? "work" : pathname === "/" ? section : null;

  useEffect(() => {
    if (pathname !== "/") return;
    let observer: IntersectionObserver | undefined;

    function observeSections() {
      observer?.disconnect();
      const bottom = Math.max(0, window.innerHeight - 160);
      observer = new IntersectionObserver((entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        if (active) setSection(active.target.id as Section);
      }, { rootMargin: `-90px 0px -${bottom}px 0px` });

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    }

    observeSections();
    window.addEventListener("resize", observeSections, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, [pathname]);

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
        onBlur={(event) => {
          if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <Link href="/#top" className="site-name" aria-current={activeSection === "top" ? "location" : undefined}>
          {profile.name}
        </Link>
        <div id="main-nav-menu" className="site-menu-panel" data-open={open}>
          <ul id="main-nav-links" className="site-nav-links">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                  onClick={() => {
                    setSection(id);
                    setOpen(false);
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="site-command"
            onClick={() => {
              setOpen(false);
              if (open) toggle.current?.focus();
              window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
            }}
            aria-label="Open command menu"
            aria-keyshortcuts="Control+K Meta+K"
            title="Quick jump"
          >
            <Command size={16} aria-hidden="true" />
            <span>Quick jump</span>
          </button>
        </div>
        <div className="site-nav-actions">
          <ThemeToggle />
          <button
            ref={toggle}
            type="button"
            className="site-icon-button site-menu-toggle"
            aria-controls="main-nav-menu"
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
