import { Github } from "lucide-react";
import { profile } from "@/lib/data";
import { CodingDemo } from "./CodingDemo";

export function Hero() {
  return (
    <section id="top" className="site-shell portfolio-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="portfolio-kicker hero-kicker">{profile.role}</p>
        <p className="hero-greeting">Hi, I’m</p>
        <h1 id="hero-title" className="portfolio-name">{profile.name}<span aria-hidden="true">.</span></h1>
        <div className="hero-identity">
          <a href={profile.links.github} className="hero-handle" rel="me">
            <Github size={17} aria-hidden="true" />
            @{profile.github}
          </a>
          <p>{profile.city}, {profile.country}</p>
        </div>
        <p className="portfolio-intro">
          I build coding platforms, real-time apps, and the APIs behind them.
        </p>
        <div className="portfolio-actions">
          <a href="#work" className="portfolio-button portfolio-button-primary">Explore my work</a>
          <a href="#contact" className="portfolio-button portfolio-button-plain">Get in touch</a>
        </div>
      </div>
      <CodingDemo />
    </section>
  );
}
