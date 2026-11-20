import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildNotes } from "@/lib/build-notes";
import { caseStudies, profile } from "@/lib/data";
import { projectJsonLd, JsonLd } from "@/lib/seo";
import { CodingDemo } from "@/components/CodingDemo";
import { MessageTrace } from "@/components/MessageTrace";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

const find = (slug: string) => caseStudies.find((project) => project.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = find((await params).slug);
  if (!project) return {};
  const title = `${project.name} case study`;
  const description = `${project.summary} Designed and built by ${profile.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: "article", url: `/work/${project.slug}`, title, description, siteName: profile.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const project = find((await params).slug);
  if (!project?.study) notFound();
  const { study } = project;
  const note = buildNotes[project.slug];
  const next = caseStudies[(caseStudies.indexOf(project) + 1) % caseStudies.length];

  const facts = [
    { label: "Role", value: "Design and full-stack development" },
    { label: "Year", value: project.year },
    { label: "Focus", value: project.domains.join(" / ") },
  ];

  return (
    <article className="site-shell case-study">
      <JsonLd data={projectJsonLd(project)} />
      <nav aria-label="Breadcrumb">
        <Link href="/#work" className="portfolio-text-link">All work</Link>
      </nav>

      <header className="case-header">
        <div>
          <p className="portfolio-kicker">Case study</p>
          <h1 className="portfolio-name">{project.name}</h1>
          <p className="portfolio-intro">{project.summary}</p>
          <div className="portfolio-actions">
            {project.href && <a href={project.href} className="portfolio-button portfolio-button-primary">Live site</a>}
            {project.repo && <a href={project.repo} className="portfolio-button portfolio-button-plain">Source on GitHub</a>}
            {note && <a href="#how-built" className="portfolio-text-link case-build-jump">Build notes</a>}
          </div>
        </div>
        <dl className="case-facts">
          {facts.map(({ label, value }) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </header>

      <figure className="case-preview">
        <Image src={project.image} alt={`${project.name} product screenshot`} sizes="(max-width: 1340px) 92vw, 1216px" preload />
      </figure>

      {project.slug === "quibly" ? <MessageTrace /> : note && (
        <section id="how-built" className="case-build" aria-labelledby="case-build-title">
          <header>
            <p className="portfolio-kicker">How it’s built</p>
            <h2 id="case-build-title">{note.title}</h2>
            <p>{note.intro}</p>
          </header>
          <ol className="build-steps">
            {note.steps.map(({ label, title, detail }) => (
              <li key={label}>
                <p className="portfolio-kicker">{label}</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.slug === "codexa" && (
        <div className="case-coding-demo">
          <CodingDemo />
        </div>
      )}

      <section className="portfolio-section portfolio-section-split" aria-labelledby="overview">
        <header className="portfolio-section-heading"><h2 id="overview">Overview</h2></header>
        <div className="case-prose">
          {study.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="portfolio-section portfolio-section-split" aria-labelledby="highlights">
        <header className="portfolio-section-heading"><h2 id="highlights">What it does</h2></header>
        <ul className="case-highlight-list">
          {study.highlights.map(({ title, copy }) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="portfolio-section portfolio-section-split" aria-labelledby="stack">
        <header className="portfolio-section-heading"><h2 id="stack">Built with</h2></header>
        <dl className="skill-list">
          {study.stack.map(({ layer, items }) => (
            <div key={layer} className="skill-row"><dt>{layer}</dt><dd>{items.join(" · ")}</dd></div>
          ))}
        </dl>
      </section>

      <nav className="case-next" aria-label="Next case study">
        <p className="entry-meta">Next case study</p>
        <Link href={`/work/${next.slug}`} className="portfolio-text-link">{next.name}</Link>
      </nav>
    </article>
  );
}
