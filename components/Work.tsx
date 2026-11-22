import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { archive, caseStudies, featuredProjects, getProjectPreview, type Project } from "@/lib/data";

function ProjectEntry({ project, featured = false }: { project: Project; featured?: boolean }) {
  const caseStudy = `/work/${project.slug}`;
  const preview = getProjectPreview(project);

  return (
    <article className={featured ? "project-entry project-entry-featured" : "project-entry"}>
      <div className="project-copy">
        <div className="project-identity">
          <p className="project-meta">{project.domains.join(" / ")} · {project.year}</p>
          <h3>{project.name}</h3>
        </div>
        <div className="project-description">
          <p className="project-summary">{project.summary}</p>
          <div className="project-links">
            <Link href={caseStudy} className="portfolio-text-link" aria-label={`Read the ${project.name} case study`}>
              Read case study
            </Link>
            {project.slug === "quibly" && (
              <Link href={`${caseStudy}#how-built`} className="portfolio-text-link">
                Message trace
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="project-preview">
        <Image
          src={preview.image}
          alt={preview.alt}
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
  const [featured, ...otherFeatured] = featuredProjects;
  const otherProjects = caseStudies.slice(featuredProjects.length);

  return (
    <section id="work" className="site-shell portfolio-section" aria-labelledby="work-title">
      <header className="portfolio-section-heading">
        <h2 id="work-title">Selected work</h2>
      </header>

      <ProjectEntry project={featured} featured />
      <div className="project-index">
        {otherFeatured.map((project) => <ProjectEntry key={project.slug} project={project} />)}
      </div>
      <section className="more-projects" aria-labelledby="more-projects-title">
        <h3 id="more-projects-title">More projects</h3>
        <ul>
          {otherProjects.map((project) => (
            <li key={project.slug} className="archive-entry">
              <h4>{project.name}</h4>
              <p className="project-summary">{project.summary}</p>
              <Link href={`/work/${project.slug}`} className="portfolio-text-link" aria-label={`Read the ${project.name} case study`}>
                Read case study
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ProjectArchive />
    </section>
  );
}
