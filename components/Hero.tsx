import Link from "next/link";
import { Database, MessagesSquare, Radio } from "lucide-react";
import { profile } from "@/lib/data";

const messagePath = [
  { icon: MessagesSquare, label: "Client", detail: "Send a channel message" },
  { icon: Radio, label: "Socket.IO", detail: "Broadcast to the channel" },
  { icon: Database, label: "Redis adapter", detail: "Fan out across instances" },
];

export function Hero() {
  return (
    <section id="top" className="site-shell portfolio-hero" aria-labelledby="hero-title">
      <div>
        <p className="portfolio-kicker">{profile.role}</p>
        <h1 id="hero-title" className="portfolio-name">{profile.name}</h1>
        <p className="portfolio-intro">
          I build real-time apps, developer tools, and the systems that run them.
        </p>
        <p className="portfolio-location">Based in {profile.city}, {profile.country}</p>
        <div className="portfolio-actions">
          <a href="#work" className="portfolio-button portfolio-button-primary">Explore my work</a>
          <a href={profile.links.github} className="portfolio-button portfolio-button-plain">GitHub</a>
        </div>
      </div>

      <figure className="engineering-figure">
        <figcaption className="engineering-caption">
          <span>Inside Quibly</span>
          <Link href="/work/quibly" className="portfolio-text-link">Case study</Link>
        </figcaption>
        <div className="engineering-diagram">
          <p>How a channel message is delivered</p>
          <ol>
            {messagePath.map(({ icon: Icon, label, detail }) => (
              <li key={label}>
                <span className="engineering-node"><Icon size={17} aria-hidden="true" /></span>
                <div>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </figure>
    </section>
  );
}
