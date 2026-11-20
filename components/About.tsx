import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { milestones, profile } from "@/lib/data";
import type { GitHubStats } from "@/lib/github";
import { Glance } from "./Glance";

export function About({ github }: { github: GitHubStats }) {
  return (
    <section id="about" className="site-shell portfolio-section portfolio-section-split" aria-labelledby="about-title">
      <header className="portfolio-section-heading"><h2 id="about-title">About me</h2></header>
      <div className="about-content">
        <p>
          I started out building small JavaScript projects and logging my DSA practice on GitHub.
          I went on to build a coding judge with a problem library and submissions. That project
          became <Link href="/work/codexa" className="portfolio-text-link">Codexa</Link>.
        </p>
        <p>
          I’m based in {profile.city} and enjoy working across the application, from the first
          data model through to deployment.
        </p>
        <Glance github={github} />
        <details className="portfolio-disclosure">
          <summary>
            <span>How I got here</span>
            <ChevronDown size={18} className="disclosure-chevron" aria-hidden="true" />
          </summary>
          <ol className="milestone-list">
            {milestones.map((milestone) => {
              const href = milestone.project === "elyra" ? "#work" : milestone.project ? `/work/${milestone.project}` : milestone.href;
              return (
                <li key={milestone.title} className="milestone-entry">
                  <p className="entry-meta">{milestone.date}</p>
                  <div>
                    <h3>{href ? <Link href={href} className="portfolio-text-link">{milestone.title}</Link> : milestone.title}</h3>
                    <p>{milestone.copy}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </details>
      </div>
    </section>
  );
}
