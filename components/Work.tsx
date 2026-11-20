import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { buildNotes } from "@/lib/build-notes";
import { archive, caseStudies, profile, projects, type Project } from "@/lib/data";

function ProjectEntry({ project, featured = false }: { project: Project; featured?: boolean }) {
  const caseStudy = `/work/${project.slug}`;
  const note = buildNotes[project.slug];

  return (
    <article className={featured ? "project-entry project-entry-featured" : "project-entry"}>
      <div className="project-copy">
        <div className="project-identity">
          <p className="project-meta">{project.domains.join(" / ")} · {project.year}</p>
          <h3><Link href={caseStudy} aria-label={`${project.name} case study`}>{project.name}</Link></h3>
        </div>
        <div className="project-description">
          <p className="project-summary">{project.summary}</p>
          <div className="project-links">
            {note && (
              <Link href={`${caseStudy}#how-built`} className="portfolio-text-link" aria-label={`${project.name} build notes`}>
                Build notes
              </Link>
            )}
            {project.href && <a href={project.href} aria-label={`${project.name} live site`}>Live site</a>}
            {project.repo && <a href={project.repo} aria-label={`${project.name} source code`}>Source</a>}
          </div>
        </div>
      </div>
      <div className="project-preview">
        <Image
          src={project.image}
          alt={`${project.name} product screenshot`}
          sizes={featured ? "(max-width: 767px) 90vw, 550px" : "(max-width: 560px) 90vw, (max-width: 1060px) 46vw, 470px"}
        />
      </div>
    </article>
  );
}

function ProjectArchive() {
  return (
    <details className="portfolio-disclosure project-archive">
      <summary>
        <span>Project archive <span className="archive-count">{archive.length} projects</span></span>
        <ChevronDown size={18} className="disclosure-chevron" aria-hidden="true" />
      </summary>
      <ul className="archive-list">
        {archive.map((project) => (
          <li key={project.name} className="archive-entry">
            <div>
              <h3>{project.name}</h3>
              <p className="project-meta">{project.year}</p>
            </div>
            <div>
              <p className="project-summary">{project.summary}</p>
              <p className="project-tools">{project.stack.join(" · ")}</p>
            </div>
            <div className="project-links">
              {project.href && <a href={project.href} aria-label={`${project.name} project link`}>Open</a>}
              {project.repo && <a href={project.repo} aria-label={`${project.name} source code`}>Source</a>}
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Work() {
  const [featured, ...otherProjects] = caseStudies;
  const inDevelopment = projects.filter((project) => project.status === "building");

  return (
    <section id="work" className="site-shell portfolio-section" aria-labelledby="work-title">
      <header className="portfolio-section-heading">
        <h2 id="work-title">Selected work</h2>
        <a href={profile.links.github} className="portfolio-text-link">More on GitHub</a>
      </header>

      <ProjectEntry project={featured} featured />
      <div className="project-index">
        {otherProjects.map((project) => <ProjectEntry key={project.slug} project={project} />)}
      </div>
      {inDevelopment.map((project) => (
        <div key={project.slug} className="project-wip">
          <h3>{project.name}</h3>
          <p>In development</p>
        </div>
      ))}
      <ProjectArchive />
    </section>
  );
}
