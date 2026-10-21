import Link from "next/link";
import { caseStudies } from "@/lib/data";
import { Swatch } from "@/components/Bento";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[1240px] flex-col justify-center px-4 pt-28 sm:px-6">
      <p className="text-sm text-muted">Error 404</p>
      <h1 className="mt-3 font-display text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.05em]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted">
        The link may be old or mistyped. Head back to the home page, or open one of these case studies.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link href="/" className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-inverse">
          Back to the home page
        </Link>
        {caseStudies.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-3 text-sm font-medium transition-colors hover:bg-surface"
          >
            <Swatch color={p.color} />
            {p.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
