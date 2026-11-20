import { ChevronDown } from "lucide-react";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="about-subsection" aria-labelledby="experience-title">
      <h3 id="experience-title">Experience</h3>
      <div className="experience-list">
        {experience.map((role) => (
          <article key={role.company} className="experience-entry">
            <header>
              <div>
                <p className="portfolio-kicker">{role.company}</p>
                <h4>{role.role}</h4>
              </div>
              <p className="entry-meta">{role.period} · {role.place}</p>
            </header>
            <p>{role.summary}</p>
            <details className="portfolio-disclosure">
              <summary>
                <span>Work and responsibilities</span>
                <ChevronDown size={17} className="disclosure-chevron" aria-hidden="true" />
              </summary>
              <ul className="experience-notes">
                {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              {role.certificate && <p className="entry-meta experience-certificate">{role.certificate}</p>}
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
