import { profile } from "@/lib/data";
import type { GitHubStats } from "@/lib/github";

export function Glance({ github }: { github: GitHubStats }) {
  return (
    <aside id="glance" className="github-note" aria-label="GitHub profile snapshot">
      <a href={profile.links.github} className="portfolio-text-link" rel="me">@{profile.github} on GitHub</a>
      {github.live && (
        <p>{github.repos} public repositories · {github.languages.map(({ name }) => name).join(", ")}</p>
      )}
    </aside>
  );
}
