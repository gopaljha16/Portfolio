import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { GitHubActivity } from "@/components/GitHubActivity";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { getGitHubStats } from "@/lib/github";
import { getGitHubActivity } from "@/lib/github-activity";
import { homeJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 86400;

export default async function Home() {
  const [github, activity] = await Promise.all([getGitHubStats(), getGitHubActivity()]);

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Work />
      <GitHubActivity activity={activity} />
      <About github={github} />
      <Contact />
    </>
  );
}
