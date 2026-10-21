import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies, profile } from "@/lib/data";
import { projectJsonLd, JsonLd } from "@/lib/seo";
import { Bento, Swatch, Tile } from "@/components/Bento";
import { CaseImage, CaseTitle, FadeIn, NextProject } from "@/components/CaseStudy";
import { LazyHydrate } from "@/components/LazyHydrate";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => caseStudies.find((p) => p.slug === slug);

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
  const next = caseStudies[(caseStudies.indexOf(project) + 1) % caseStudies.length];
  const highlightSpan = study.highlights.length % 3 === 0 ? "md:col-span-4" : "md:col-span-6";

  const facts = [
    { label: "Role", value: "Design and full-stack development" },
    { label: "Year", value: String(project.year) },
    { label: "Status", value: "Live" },
    { label: "Focus", value: project.domains.join(", ") || "Product" },
  ];

  return (
    <article className="mx-auto max-w-[1240px] px-3 pt-28 sm:px-6 md:pt-36">
      <JsonLd data={projectJsonLd(project)} />

      <nav aria-label="Breadcrumb">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
          <ArrowLeft size={16} />
          All work
        </Link>
      </nav>

      <header className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end">
        <div>
          <FadeIn>
            <p className="mb-5 flex items-center gap-2.5 text-sm text-muted">
              <Swatch color={project.color} className="size-3" />
              Case study
            </p>
          </FadeIn>
          <CaseTitle name={project.name} />
          <FadeIn delay={0.25}>
            <p className="mt-6 max-w-[30ch] font-display text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium leading-snug tracking-[-0.01em]">
              {project.tagline}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.35} className="flex flex-col gap-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-sm">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-faint">{f.label}</dt>
                <dd className="mt-1 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-2">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-inverse transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Visit {project.name}
                <ArrowUpRight size={16} />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
              >
                Source on GitHub
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </FadeIn>
      </header>

      <CaseImage project={project} />

      <section aria-labelledby="overview" className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
        <h2 id="overview" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Overview
        </h2>
        <div className="space-y-5">
          {study.overview.map((para) => (
            <p key={para.slice(0, 24)} className="max-w-[62ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      <section aria-labelledby="highlights" className="mt-20 md:mt-28">
        <h2 id="highlights" className="mb-6 font-display text-2xl font-semibold tracking-tight md:mb-8 md:text-3xl">
          What it does
        </h2>
        <LazyHydrate estimate={700}>
          <Bento>
            {study.highlights.map((h) => (
              <Tile key={h.title} className={"col-span-2 flex flex-col gap-3 p-6 md:p-7 " + highlightSpan}>
                <Swatch color={project.color} className="size-3" />
                <h3 className="font-display text-xl font-semibold tracking-tight">{h.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{h.copy}</p>
              </Tile>
            ))}
          </Bento>
        </LazyHydrate>
      </section>

      <section aria-labelledby="stack" className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
        <h2 id="stack" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Built with
        </h2>
        <dl className="divide-y divide-line border-y border-line">
          {study.stack.map((layer) => (
            <div key={layer.layer} className="grid gap-3 py-5 sm:grid-cols-[140px_minmax(0,1fr)]">
              <dt className="text-sm text-muted">{layer.layer}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {layer.items.map((item) => (
                  <span key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <LazyHydrate estimate={400}>
        <NextProject project={next} />
      </LazyHydrate>
    </article>
  );
}
