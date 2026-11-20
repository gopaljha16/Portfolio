import { Github } from "lucide-react";
import { caseStudies, profile } from "@/lib/data";
import { HeroProjects } from "./HeroProjects";

export function Hero() {
  const featured = caseStudies.slice(0, 3).map(({ slug, name, image, domains }) => ({ slug, name, image, domains }));

  return (
    <section id="top" className="portfolio-cover" aria-labelledby="hero-title">
      <div className="site-shell cover-inner">
        <div className="cover-identity">
          <p>{profile.role} <span aria-hidden="true">/</span> {profile.city}, {profile.country}</p>
          <a href={profile.links.github} rel="me"><Github size={16} aria-hidden="true" />@{profile.github}</a>
        </div>
        <div className="cover-masthead">
          <h1 id="hero-title">{profile.name}</h1>
          <div className="cover-intro">
            <p>I build coding platforms, real-time apps, and the APIs behind them.</p>
            <a href="#work">Browse all work</a>
          </div>
        </div>
        <HeroProjects projects={featured} />
      </div>
    </section>
  );
}
