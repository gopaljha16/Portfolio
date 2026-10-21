"use client";

import { useState } from "react";
import { m as motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq, projects } from "@/lib/data";
import { SectionHead } from "./Bento";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Plain questions with full-sentence answers. Every answer stays in the HTML when closed
 * (only its height animates), so search and answer engines can always read it.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="pt-24 md:pt-40">
      <SectionHead id="faq-title" title="Questions, answered" intro="The things people usually ask about me, in one place." />

      <ul className="border-t border-line">
        {faq.map((item, i) => {
          const isOpen = open === i;
          const color = projects[i % projects.length].color;
          return (
            <motion.li
              key={item.q}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease, delay: Math.min(i, 3) * 0.05 }}
              className="border-b border-line"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center gap-4 py-6 text-left md:gap-6 md:py-7"
                >
                  <span aria-hidden className="size-2.5 shrink-0 rounded-[3px] transition-transform duration-300 group-hover:scale-125" style={{ background: color }} />
                  <span className="flex-1 font-display text-[clamp(1.25rem,2.4vw,1.85rem)] font-semibold leading-tight tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-2">
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={
                      "grid size-10 shrink-0 place-items-center rounded-full border transition-colors " +
                      (isOpen ? "border-ink bg-ink text-inverse" : "border-line text-muted group-hover:text-ink")
                    }
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
              </h3>
              {/* Grid rows animate between 0fr and 1fr, so the answer keeps its real height and stays in the DOM. */}
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                  (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                }
              >
                <div className="overflow-hidden">
                  <p className="max-w-[68ch] pb-7 pl-[1.625rem] text-[17px] leading-relaxed text-muted md:pl-[2.125rem]">{item.a}</p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
