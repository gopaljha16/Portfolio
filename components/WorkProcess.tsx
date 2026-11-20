"use client";

import { useState } from "react";

export function WorkProcess({ steps }: { steps: readonly { title: string; copy: string }[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="overview-card process-overview" aria-labelledby="process-overview-title">
      <h2 id="process-overview-title" className="overview-label">How I work</h2>
      <div id="process-step-details" className="process-step" aria-live="polite">
        <h3>{step.title}</h3>
        <p>{step.copy}</p>
      </div>
      <ul className="overview-picker" aria-labelledby="process-overview-title">
        {steps.map(({ title }, index) => (
          <li key={title}>
            <button type="button" aria-controls="process-step-details" aria-pressed={index === active} onClick={() => setActive(index)}>
              {title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
