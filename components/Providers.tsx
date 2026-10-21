"use client";

import { useEffect, useState } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import dynamic from "next/dynamic";
import { revealAllSections } from "@/lib/events";

// Only needed once someone presses Ctrl K or moves a mouse, so they load after the page is interactive.
const CommandMenu = dynamic(() => import("./CommandMenu").then((m) => m.CommandMenu), { ssr: false });
const Cursor = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });

// framer-motion's animation engine arrives in its own chunk after the page has painted.
const loadMotionFeatures = () => import("@/lib/motion-features").then((m) => m.default);

/**
 * Smooth scrolling, the command menu and the cursor label, for every page.
 * Smooth scrolling and motion both stand down when the visitor asks for reduced motion.
 *
 * The tree is the same on the server and on every client render: smoothing is switched through
 * Lenis's options, never by adding or removing a wrapper, which would remount the whole page.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(false);
  // Any click on an in-page link lays out all sections first (capture phase, so before Lenis
  // measures), which keeps the smooth scroll on target.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href*='#']");
      const href = link?.getAttribute("href");
      if (!href) return;
      const url = new URL(href, window.location.href);
      if (url.hash && url.pathname === window.location.pathname) revealAllSections();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSmooth(!query.matches);
    const onChange = () => setSmooth(!query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.11, smoothWheel: smooth, anchors: smooth }}>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          {children}
          <CommandMenu />
          <Cursor />
        </MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}
