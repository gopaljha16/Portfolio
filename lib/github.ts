import { githubFallback, profile } from "./data";

export type GitHubStats = {
  repos: number;
  /** Top three languages by repo count. The rest fold into `other`. */
  languages: { name: string; count: number }[];
  other: number;
  lastPush: string;
  live: boolean;
};

type Repo = { fork: boolean; language: string | null; pushed_at: string };

/** Public profile numbers, refreshed at most once a day. Falls back to a snapshot if GitHub is unreachable or rate-limited. */
export async function getGitHubStats(): Promise<GitHubStats> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const opts = { headers, next: { revalidate: 86400 } };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${profile.github}`, opts),
      fetch(`https://api.github.com/users/${profile.github}/repos?per_page=100&sort=pushed`, opts),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error(`GitHub ${userRes.status}/${reposRes.status}`);
    const user: { public_repos: number } = await userRes.json();
    const repos: Repo[] = await reposRes.json();

    const counts = new Map<string, number>();
    for (const r of repos) {
      if (r.fork || !r.language) continue;
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }
    const sorted = [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    const top = sorted.slice(0, 3);
    const other = sorted.slice(3).reduce((n, l) => n + l.count, 0);

    return {
      repos: user.public_repos,
      languages: top,
      other,
      lastPush: repos[0]?.pushed_at ?? githubFallback.lastPush,
      live: true,
    };
  } catch {
    return { ...githubFallback, live: false };
  }
}
