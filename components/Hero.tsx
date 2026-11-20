import { profile } from "@/lib/data";
import { MessageTrace } from "./MessageTrace";

export function Hero() {
  return (
    <section id="top" className="site-shell portfolio-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="portfolio-kicker hero-kicker">{profile.role}</p>
        <h1 id="hero-title" className="portfolio-name">{profile.name}</h1>
        <p className="portfolio-intro">
          I build real-time apps and developer tools, from the browser down to the infrastructure.
        </p>
        <p className="portfolio-location">{profile.city}, {profile.country}</p>
        <div className="portfolio-actions">
          <a href="#work" className="portfolio-button portfolio-button-primary">Explore my work</a>
          <a href={profile.links.github} className="portfolio-button portfolio-button-plain">GitHub</a>
        </div>
      </div>
      <MessageTrace />
    </section>
  );
}
