"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m as motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { inkOn, type Project } from "@/lib/data";

// The entrances on this page are CSS (see .anim-rise and .anim-fade-up in globals.css), so the title
// and the screenshot paint with the HTML instead of waiting for JavaScript. Only the parallax uses framer.

export function CaseTitle({ name }: { name: string }) {
  return (
    <h1 className="font-display text-[clamp(3.75rem,12vw,10rem)] font-bold leading-[0.85] tracking-[-0.055em]">
      <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <span className="anim-rise inline-block" style={{ animationDelay: "0.1s" }}>
          {name}
        </span>
      </span>
    </h1>
  );
}

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className={"anim-fade-up " + className} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/** The product on its own color, drifting up a little as the page scrolls. */
export function CaseImage({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <div
      ref={ref}
      className="anim-fade-up dot-field relative mt-12 overflow-hidden rounded-[28px] px-5 pt-10 sm:px-12 sm:pt-16 md:mt-16 md:px-20 md:pt-20"
      style={{ backgroundColor: project.color, animationDelay: "0.3s" }}
    >
      <motion.div style={{ y }} className="overflow-hidden rounded-t-[14px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-black/10">
        <Image
          src={project.image}
          alt={`${project.name} home page`}
          priority
          sizes="(min-width: 1240px) 1100px, 92vw"
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}

export function NextProject({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor={`Read about ${project.name}`}
      className="group relative mt-24 block overflow-hidden rounded-[28px] p-6 sm:p-10 md:mt-32 md:p-14"
      style={{ background: project.color, color: inkOn(project) }}
    >
      <p className="text-sm font-medium">Next case study</p>
      <div className="mt-6 flex items-end justify-between gap-6">
        <div>
          <p className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.85] tracking-[-0.05em]">{project.name}</p>
          <p className="mt-4 max-w-[40ch] text-[17px] leading-snug">{project.tagline}</p>
        </div>
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#12141b] text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-12 md:size-20">
          <ArrowRight size={28} />
        </span>
      </div>
    </Link>
  );
}
