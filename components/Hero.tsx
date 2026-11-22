import localFont from "next/font/local";
import Link from "next/link";
import { experience, featuredProjects, getProjectPreview, profile } from "@/lib/data";
import { HeroProjects } from "./HeroProjects";

const accent = localFont({
  src: "../app/fonts/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-hero-accent",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export function Hero() {
  const featured = featuredProjects.map((project) => ({
    slug: project.slug,
    name: project.name,
    domains: project.domains,
    preview: getProjectPreview(project),
  }));

  return (
    <section id="top" className={`site-shell portfolio-cover ${accent.variable}`} aria-labelledby="hero-title">
      <div className="hero-introduction">
        <h1 id="hero-title">Hi, I’m {profile.name}.</h1>
        <div className="hero-role-line">
          <p>{profile.role}</p>
          <a className="availability" href="#contact"><span aria-hidden="true" />Open to work</a>
        </div>
        <p className="hero-summary"><em>I build</em> coding platforms, real-time apps, and the APIs behind them.</p>
        <div className="portfolio-actions hero-actions">
          <a href="#work" className="portfolio-button portfolio-button-primary">View work</a>
          <Link href="/resume" className="portfolio-text-link">Résumé</Link>
        </div>
      </div>

      <div className="overview-grid">
        <HeroProjects projects={featured} />

        <section className="overview-card experience-overview" aria-labelledby="experience-overview-title">
          <h2 id="experience-overview-title" className="overview-label">Experience</h2>
          <ol className="overview-timeline">
            {experience.map((role) => (
              <li key={role.company}>
                <p>{role.company}</p>
                <span>{role.role}</span>
                <span>{role.period}</span>
              </li>
            ))}
          </ol>
          <a href="#experience" className="portfolio-text-link overview-link">View experience</a>
        </section>
      </div>
    </section>
  );
}
