"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Twitter } from "lucide-react";
import { profile } from "@/lib/data";
import { Bento, Tile } from "./Bento";
import { Magnetic } from "./Magnetic";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-full border border-inverse/20 py-2 pl-5 pr-2 text-left transition-colors hover:bg-inverse/10"
    >
      <span className="break-all font-display text-[clamp(1rem,2.6vw,1.35rem)] font-medium">{profile.email}</span>
      <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-inverse text-ink">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "copy"}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {copied ? <Check size={17} strokeWidth={2.5} /> : <Copy size={16} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            aria-hidden
            className="pr-3 text-sm opacity-70"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

const socials = [
  { label: "GitHub", href: profile.links.github, icon: Github },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "X", href: profile.links.x, icon: Twitter },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pt-24 md:pt-36">
      <Bento>
        <Tile bare className="col-span-2 bg-ink text-inverse md:col-span-12">
          <div aria-hidden className="product-stripe h-2" />
          <div className="flex flex-col gap-10 p-6 sm:p-10 md:p-14">
            <h2 id="contact-title" className="max-w-[14ch] font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.045em]">
              Have something to build?
            </h2>
            <div className="grid gap-10 md:grid-cols-2 md:items-end">
              <p className="max-w-[44ch] text-[17px] leading-relaxed opacity-70">
                I&apos;m open to freelance projects, full-time roles and product consulting. Tell me
                what you&apos;re making and when you need it, and I&apos;ll reply within a day.
              </p>
              <div className="flex flex-col gap-4 md:items-end">
                <Magnetic strength={0.15}>
                  <CopyEmail />
                </Magnetic>
                <ul className="flex flex-wrap gap-2">
                  {socials.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="me noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-inverse/20 px-4 py-2 text-sm transition-colors hover:bg-inverse hover:text-ink"
                      >
                        <Icon size={15} />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Tile>
      </Bento>
    </section>
  );
}
