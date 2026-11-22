import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import HyderabadMap from "@/images/hyderabad-map.png";
import { milestones, profile } from "@/lib/data";
import { Experience } from "./Experience";
import { Skills } from "./Skills";

export function About() {
  return (
    <section id="about" className="site-shell portfolio-section" aria-labelledby="about-title">
      <header className="portfolio-section-heading"><h2 id="about-title">About me</h2></header>
      <div className="about-layout">
        <div className="about-content">
          <p>
            I started out building small JavaScript projects and logging my DSA practice on GitHub.
            I went on to build a coding judge with a problem library and submissions. That project
            became <Link href="/work/codexa" className="portfolio-text-link">Codexa</Link>.
          </p>
          <p>
            I enjoy working across the application, from the first data model through to deployment.
          </p>
          <figure className="about-location">
            <div className="location-image">
              <Image src={HyderabadMap} alt="" sizes="(max-width: 768px) 90vw, 400px" />
              <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>
            </div>
            <figcaption className="location-caption">
              <MapPin size={16} aria-hidden="true" />
              {profile.city}, {profile.country}
            </figcaption>
          </figure>
          <details className="portfolio-disclosure">
            <summary>
              <span>How I got here</span>
              <ChevronDown size={18} className="disclosure-chevron" aria-hidden="true" />
            </summary>
            <ol className="milestone-list">
              {milestones.map((milestone) => {
                const href = milestone.project && milestone.project !== "elyra" ? `/work/${milestone.project}` : milestone.href;
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
        <Experience />
        <Skills />
      </div>
    </section>
  );
}
