"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

type Preview = Pick<Project, "slug" | "name" | "image" | "domains">;

export function HeroProjects({ projects }: { projects: Preview[] }) {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section className="overview-card featured-overview" aria-labelledby="featured-overview-title">
      <h2 id="featured-overview-title" className="overview-label">Featured work</h2>
      <div id="featured-project-details" aria-live="polite" className="featured-project-details">
        <div className="featured-art">
          <Image
            key={project.slug}
            src={project.image}
            alt={`${project.name} product screenshot`}
            sizes="(max-width: 560px) 88vw, (max-width: 780px) 44vw, 285px"
            placeholder="blur"
          />
        </div>
        <div className="featured-caption">
          <div><p>{project.name}</p><span>{project.domains.join(" / ")}</span></div>
          <Link href={`/work/${project.slug}`} className="portfolio-text-link" aria-label={`Read the ${project.name} case study`}>
            Case study
          </Link>
        </div>
      </div>
      <ul className="overview-picker" aria-labelledby="featured-overview-title">
        {projects.map((preview, index) => (
          <li key={preview.slug}>
            <button type="button" aria-controls="featured-project-details" aria-pressed={index === active} onClick={() => setActive(index)}>
              {preview.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
