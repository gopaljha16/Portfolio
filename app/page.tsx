import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { getGitHubStats } from "@/lib/github";
import { homeJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 86400;

export default async function Home() {
  const github = await getGitHubStats();

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Work />
      <About github={github} />
      <div className="site-shell">
        <Faq />
      </div>
      <Contact />
    </>
  );
}
