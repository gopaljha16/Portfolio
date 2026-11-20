"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

type Preview = Pick<Project, "slug" | "name" | "image" | "domains" | "summary">;

export function HeroProjects({ projects }: { projects: Preview[] }) {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <div className="cover-gallery" data-project={project.slug}>
      <div className="cover-topline">
        <p id="cover-projects-label">Featured projects</p>
        <span>{project.domains.join(" / ")}</span>
      </div>
      <ul className="cover-project-picker" aria-labelledby="cover-projects-label">
        {projects.map((preview, index) => (
          <li key={preview.slug}>
            <button
              type="button"
              aria-controls="cover-project-preview"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              {preview.name}
            </button>
          </li>
        ))}
      </ul>
      <div id="cover-project-preview" className="cover-preview">
        {projects.map((preview, index) => {
          const position = (index - active + projects.length) % projects.length;
          return (
            <figure className="cover-sheet" key={preview.slug} data-position={position} aria-hidden={position !== 0}>
              <Image
                src={preview.image}
                alt={`${preview.name} product screenshot`}
                sizes="(max-width: 760px) 75vw, (max-width: 1340px) 48vw, 640px"
                placeholder="blur"
                preload={index === 0}
              />
              <figcaption>{preview.name}</figcaption>
            </figure>
          );
        })}
      </div>
      <div className="cover-project-detail" aria-live="polite">
        <p>{project.summary}</p>
        <Link href={`/work/${project.slug}`} className="cover-case-link" aria-label={`Read the ${project.name} case study`}>
          Case study
        </Link>
      </div>
    </div>
  );
}
