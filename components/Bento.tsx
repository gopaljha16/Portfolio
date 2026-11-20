"use client";

import { Fragment } from "react";
import { m as motion, type HTMLMotionProps, type Variants } from "framer-motion";

export const tileVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 28 },
  },
};

const gridVariants: Variants = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/** A 12-column bento grid whose tiles assemble in sequence when it scrolls into view. */
export function Bento({
  children,
  className = "",
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Animate on mount instead of on scroll (used above the fold). */
  immediate?: boolean;
}) {
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-80px" } };
  return (
    <motion.div
      initial="hidden"
      {...trigger}
      variants={gridVariants}
      className={"grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4 " + className}
    >
      {children}
    </motion.div>
  );
}

export function Tile({
  className = "",
  bare = false,
  children,
  ...props
}: HTMLMotionProps<"div"> & {
  /** Skip the default surface and border, for tiles that bring their own fill. */
  bare?: boolean;
}) {
  return (
    <motion.div
      variants={tileVariants}
      className={
        "relative overflow-hidden rounded-[26px] " +
        (bare ? "" : "border border-line bg-surface ") +
        className
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  id,
  title,
  intro,
  children,
}: {
  /** Lets the section point at its heading with aria-labelledby. */
  id?: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <RevealWords
          as="h2"
          id={id}
          text={title}
          className="font-display text-[clamp(2.75rem,7.5vw,6rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-muted"
        >
          {intro}
        </motion.p>
      </div>
      {children}
    </div>
  );
}

/**
 * A heading whose words rise out of a mask, one after another, the first time it scrolls into view.
 * Real spaces sit between the words so the text reads normally to crawlers and screen readers.
 */
export function RevealWords({
  text,
  as: Tag = "h2",
  id,
  className = "",
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className}>
      {words.map((word, i) => (
        <Fragment key={word + i}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", rotate: 4 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.07 }}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

/** Small colored square used to key a tile to its color. */
export function Swatch({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={"inline-block size-2.5 shrink-0 rounded-[3px] " + className}
      style={{ background: color }}
    />
  );
}
