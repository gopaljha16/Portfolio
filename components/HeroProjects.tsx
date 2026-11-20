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
    <div className="cover-gallery">
      <div className="cover-project-picker">
        <p id="cover-projects-label">Featured projects</p>
        <ul aria-labelledby="cover-projects-label">
          {projects.map((preview, index) => (
            <li key={preview.slug}>
              <button
                type="button"
                aria-controls="cover-project-preview"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                {preview.name}
                <span>{preview.domains.join(" / ")}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <figure id="cover-project-preview" className="cover-preview">
        <Image
          key={project.slug}
          src={project.image}
          alt={`${project.name} product screenshot`}
          sizes="(max-width: 848px) 92vw, (max-width: 1340px) 68vw, 960px"
          placeholder="blur"
          preload={active === 0}
        />
      </figure>
      <Link href={`/work/${project.slug}`} className="cover-case-link">Read the {project.name} case study</Link>
    </div>
  );
}
