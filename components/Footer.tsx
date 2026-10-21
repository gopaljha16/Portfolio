import Link from "next/link";
import { caseStudies, profile } from "@/lib/data";

const elsewhere = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "X", href: profile.links.x },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1240px] px-4 pb-8 pt-24 sm:px-6 md:pt-32">
      <div className="grid gap-10 border-t border-line pt-10 text-sm sm:grid-cols-3">
        <nav aria-label="Case studies">
          <p className="mb-3 text-faint">Case studies</p>
          <ul className="space-y-2">
            {caseStudies.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="text-muted transition-colors hover:text-ink">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Elsewhere">
          <p className="mb-3 text-faint">Elsewhere</p>
          <ul className="space-y-2">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="me noreferrer" className="text-muted transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-faint">Say hello</p>
          <a href={`mailto:${profile.email}`} className="break-all text-muted transition-colors hover:text-ink">
            {profile.email}
          </a>
          <p className="mt-2 text-muted">
            {profile.city}, {profile.country}
          </p>
        </div>
      </div>

      {/* The name, filled with the six product colors. */}
      <p
        aria-hidden
        className="product-stripe mx-auto mt-16 w-fit select-none whitespace-nowrap bg-clip-text font-display text-[18.5vw] font-bold leading-[0.8] tracking-[-0.06em] text-transparent xl:text-[14.5rem]"
      >
        {profile.name}
      </p>

      <div className="mt-8 flex flex-col gap-2 text-sm text-faint sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and Framer Motion.
        </p>
        <p>
          Press <kbd className="rounded border border-line px-1.5 py-0.5 text-xs">Ctrl K</kbd> to jump anywhere
        </p>
      </div>
    </footer>
  );
}
