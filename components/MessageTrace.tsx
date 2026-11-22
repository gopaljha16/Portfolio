"use client";

import { useState } from "react";
import { AppWindow, Database, RadioTower } from "lucide-react";
import { quiblyBuild } from "@/lib/build-notes";

const icons = [AppWindow, RadioTower, Database];

export function MessageTrace() {
  const [active, setActive] = useState(0);
  const { title, detail } = quiblyBuild.steps[active];

  return (
    <section id="how-built" className="message-trace" aria-labelledby="case-build-title">
      <header className="trace-header">
        <p>How it’s built</p>
      </header>
      <h2 id="case-build-title">{quiblyBuild.title}</h2>
      <p className="trace-intro">{quiblyBuild.intro}</p>
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
      <div className="case-decision">
        <h3>{quiblyBuild.decision.title}</h3>
        <p>{quiblyBuild.decision.detail}</p>
      </div>
    </section>
  );
}
