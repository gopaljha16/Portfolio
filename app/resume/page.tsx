import type { Metadata } from "next";
import Link from "next/link";
import { experience, featuredProjects, profile, skillGroups } from "@/lib/data";
import { PrintButton } from "./PrintButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Gopal Jha’s full-stack engineering experience, projects, and technical skills.",
  alternates: { canonical: "/resume" },
};

const resumeSkills = [
  { label: skillGroups.frontend.name, items: skillGroups.frontend.skills.slice(0, 4) },
  { label: skillGroups.backend.name, items: skillGroups.backend.skills },
  { label: skillGroups.cloud.name, items: skillGroups.cloud.skills },
];

export default function ResumePage() {
  return (
    <article className="site-shell resume-page" aria-labelledby="resume-title">
      <div className="resume-actions">
        <Link href="/#top" className="portfolio-text-link">Back to portfolio</Link>
        <PrintButton />
      </div>

      <div className="resume-document">
        <header className="resume-header">
          <h1 id="resume-title">{profile.name}</h1>
          <p>{profile.role} · {profile.city}, {profile.country}</p>
          <ul className="resume-links" aria-label="Contact and profiles">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={profile.url}>Portfolio</a></li>
            <li><a href={profile.links.github}>GitHub</a></li>
            <li><a href={profile.links.linkedin}>LinkedIn</a></li>
          </ul>
        </header>

        <section className="resume-section" aria-labelledby="resume-experience">
          <h2 id="resume-experience">Experience</h2>
          <ul className="resume-entries">
            {experience.map((role) => (
              <li key={role.company}>
                <div className="resume-entry-heading">
                  <h3>{role.role} · {role.company}</h3>
                  <p>{role.period}</p>
                </div>
                <p>{role.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section" aria-labelledby="resume-projects">
          <h2 id="resume-projects">Selected projects</h2>
          <ul className="resume-entries">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3>
                <p>{project.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section" aria-labelledby="resume-skills">
          <h2 id="resume-skills">Technical skills</h2>
          <dl className="resume-skills">
            {resumeSkills.map(({ label, items }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </article>
  );
}
