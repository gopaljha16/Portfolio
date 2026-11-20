"use client";

import { useState } from "react";
import Link from "next/link";
import { AppWindow, Database, RadioTower } from "lucide-react";
import { quiblyBuild } from "@/lib/build-notes";

const icons = [AppWindow, RadioTower, Database];

export function MessageTrace() {
  const [active, setActive] = useState(0);
  const { title, detail } = quiblyBuild.steps[active];

  return (
    <section className="message-trace" aria-labelledby="message-trace-title">
      <header className="trace-header">
        <p>Inside Quibly</p>
        <Link href="/work/quibly">Case study</Link>
      </header>
      <h2 id="message-trace-title">{quiblyBuild.title}</h2>
      <ol className="trace-stages" data-step={active}>
        {quiblyBuild.steps.map((step, index) => {
          const Icon = icons[index];
          return (
            <li key={step.label}>
              <button type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
                <span className="trace-node"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span>
                <span>{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="trace-detail" aria-live="polite" aria-atomic="true">
        <p><strong>{title}</strong></p>
        <p>{detail}</p>
      </div>
    </section>
  );
}
