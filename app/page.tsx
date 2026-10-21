import { Hero } from "@/components/Hero";
import { Glance } from "@/components/Glance";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { LazyHydrate } from "@/components/LazyHydrate";
import { getGitHubStats } from "@/lib/github";
import { homeJsonLd, JsonLd } from "@/lib/seo";

// Rebuild at most once a day, which keeps the GitHub numbers fresh.
export const revalidate = 86400;

function timeAgo(iso: string) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (days < 7) return rtf.format(-days, "day");
  if (days < 60) return rtf.format(-Math.round(days / 7), "week");
  return rtf.format(-Math.round(days / 30), "month");
}

export default async function Home() {
  const github = await getGitHubStats();
  // Below the hero, each section ships full HTML but only starts its JavaScript as it nears the screen.
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <div className="mx-auto max-w-[1240px] px-3 sm:px-6">
        {/* Sits right at the fold: wakes as it enters the screen, so it stays out of the first load. */}
        <LazyHydrate estimate={900} rootMargin="0px">
          <Glance github={github} lastPush={timeAgo(github.lastPush)} />
        </LazyHydrate>
        <LazyHydrate estimate={6400}>
          <Work />
        </LazyHydrate>
        <LazyHydrate estimate={2000}>
          <Experience />
        </LazyHydrate>
        <LazyHydrate estimate={3600}>
          <Skills />
        </LazyHydrate>
        <LazyHydrate estimate={3200}>
          <About />
        </LazyHydrate>
        <LazyHydrate estimate={1200}>
          <Faq />
        </LazyHydrate>
        <LazyHydrate estimate={900}>
          <Contact />
        </LazyHydrate>
      </div>
    </>
  );
}
