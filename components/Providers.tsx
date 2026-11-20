"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { CommandMenu } from "./CommandMenu";

const loadMotionFeatures = () => import("@/lib/motion-features").then((module) => module.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <CommandMenu />
      </MotionConfig>
    </LazyMotion>
  );
}
