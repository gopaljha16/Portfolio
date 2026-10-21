"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { CommandMenu } from "./CommandMenu";
import { Cursor } from "./Cursor";

/**
 * Smooth scrolling, the command menu and the cursor label, for every page.
 * Smooth scrolling and motion both stand down when the visitor asks for reduced motion.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSmooth(!query.matches);
    const onChange = () => setSmooth(!query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const content = (
    <MotionConfig reducedMotion="user">
      {children}
      <CommandMenu />
      <Cursor />
    </MotionConfig>
  );

  return smooth ? (
    <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -80 } }}>
      {content}
    </ReactLenis>
  ) : (
    content
  );
}
