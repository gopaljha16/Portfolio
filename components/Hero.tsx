import localFont from "next/font/local";
import { Github } from "lucide-react";
import { caseStudies, profile } from "@/lib/data";
import { HeroProjects } from "./HeroProjects";

const geist = localFont({
  src: "../app/fonts/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-hero-geist",
  display: "swap",
});

const accent = localFont({
  src: "../app/fonts/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-hero-accent",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export function Hero() {
  const featured = caseStudies.slice(0, 3).map(({ slug, name, image, domains }) => ({ slug, name, image, domains }));

  return (
    <section id="top" className={`portfolio-cover ${geist.variable} ${accent.variable}`} aria-labelledby="hero-title">
      <div className="site-shell cover-inner">
        <div className="cover-identity">
          <p>{profile.role} <span aria-hidden="true">/</span> {profile.city}, {profile.country}</p>
          <a href={profile.links.github} rel="me"><Github size={16} aria-hidden="true" />@{profile.github}</a>
        </div>
        <div className="cover-masthead">
          <h1 id="hero-title">{profile.name}</h1>
          <div className="cover-intro">
            <p><em>I build</em> coding platforms, real-time apps, and the APIs behind them.</p>
            <a href="#work">Browse all work</a>
          </div>
        </div>
        <HeroProjects projects={featured} />
      </div>
    </section>
  );
}
