import localFont from "next/font/local";
import Image from "next/image";
import { Cloud, Database, Github, MapPin, PanelsTopLeft } from "lucide-react";
import { caseStudies, experience, profile, skillGroups, workflow } from "@/lib/data";
import HyderabadMap from "@/images/hyderabad-map.png";
import { HeroProjects } from "./HeroProjects";
import { WorkProcess } from "./WorkProcess";

const accent = localFont({
  src: "../app/fonts/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-hero-accent",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const stack = [
  { label: "Frontend", icon: PanelsTopLeft, tools: skillGroups.frontend.skills.slice(0, 3) },
  { label: "Data", icon: Database, tools: ["PostgreSQL", "Redis"] },
  { label: "Cloud", icon: Cloud, tools: skillGroups.cloud.skills.slice(0, 3) },
];

export function Hero() {
  const featured = caseStudies.slice(0, 3).map(({ slug, name, image, domains }) => ({ slug, name, image, domains }));

  return (
    <section id="top" className={`site-shell portfolio-cover ${accent.variable}`} aria-labelledby="hero-title">
      <div className="hero-introduction">
        <h1 id="hero-title">Hi, I’m {profile.name}.</h1>
        <div className="hero-role-line">
          <p>{profile.role}</p>
          <a className="availability" href="#contact"><span aria-hidden="true" />Open to work</a>
        </div>
        <div className="hero-intro-actions">
          <a href="#contact" className="portfolio-button portfolio-button-primary">Get in touch</a>
          <p><em>I build</em> coding platforms, real-time apps, and the APIs behind them.</p>
        </div>
        <a href={profile.links.github} className="hero-handle" rel="me">
          <Github size={16} aria-hidden="true" />@{profile.github}
        </a>
      </div>

      <div className="overview-grid">
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

        <HeroProjects projects={featured} />

        <section className="overview-card stack-overview" aria-labelledby="stack-overview-title">
          <h2 id="stack-overview-title" className="overview-label">Technical stack</h2>
          <ul>
            {stack.map(({ label, icon: Icon, tools }) => (
              <li key={label}>
                <Icon size={18} aria-hidden="true" />
                <div><p>{label}</p><span>{tools.join(" · ")}</span></div>
              </li>
            ))}
          </ul>
          <a href="#skills" className="portfolio-text-link overview-link">See the full stack</a>
        </section>

        <section className="overview-card location-overview" aria-labelledby="location-overview-title">
          <div className="location-image">
            <Image src={HyderabadMap} alt="" sizes="(max-width: 560px) 92vw, (max-width: 780px) 45vw, 305px" />
            <span className="overview-label"><MapPin size={14} aria-hidden="true" /> Based in</span>
            <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>
          </div>
          <div className="location-caption">
            <h2 id="location-overview-title">{profile.city}</h2>
            <p>{profile.country}</p>
          </div>
        </section>

        <WorkProcess steps={workflow} />
      </div>
    </section>
  );
}
