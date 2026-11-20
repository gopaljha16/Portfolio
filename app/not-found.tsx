import Link from "next/link";
import { caseStudies } from "@/lib/data";

export default function NotFound() {
  return (
    <section className="site-shell missing-page">
      <p className="portfolio-kicker">Error 404</p>
      <h1 className="portfolio-name">Page not found</h1>
      <p className="portfolio-intro">The link may be old or mistyped.</p>
      <div className="portfolio-actions">
        <Link href="/" className="portfolio-button portfolio-button-primary">Back to the home page</Link>
        <Link href="/#work" className="portfolio-button portfolio-button-plain">Browse projects</Link>
      </div>
      <nav aria-label="Case studies" className="project-links">
        {caseStudies.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="portfolio-text-link">{project.name}</Link>
        ))}
      </nav>
    </section>
  );
}
