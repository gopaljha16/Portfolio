"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { revealAllSections } from "@/lib/events";

const CommandMenu = dynamic(() => import("./CommandMenu").then((module) => module.CommandMenu), { ssr: false });
const loadMotionFeatures = () => import("@/lib/motion-features").then((module) => module.default);

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.hash && link.pathname === window.location.pathname) revealAllSections();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <CommandMenu />
      </MotionConfig>
    </LazyMotion>
  );
}
