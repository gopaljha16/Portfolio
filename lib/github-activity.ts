import { profile } from "./data";
import snapshot from "./github-activity-snapshot.json";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubActivity = {
  days: ContributionDay[];
  total: number;
  isSnapshot: boolean;
};

const dayMs = 86_400_000;

function attributes(tag: string) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
}

function parseDays(html: string): ContributionDay[] | null {
  const counts = new Map<string, number>();

  for (const [, tag, text] of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = attributes(tag).for;
    const label = text.trim();
    const amount = label.match(/^([\d,]+) contributions?\b/i)?.[1];
    if (id && amount) counts.set(id, Number(amount.replaceAll(",", "")));
    if (id && /^no contributions\b/i.test(label)) counts.set(id, 0);
  }

  const days: ContributionDay[] = [];
  for (const [, tag] of html.matchAll(/<td\b([^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*)>/g)) {
    const { id, "data-date": date, "data-level": intensity } = attributes(tag);
    const count = counts.get(id);
    const level = Number(intensity);
    if (count === undefined || !Number.isSafeInteger(count) || !Number.isInteger(level) || level < 0 || level > 4) return null;
    days.push({ date, count, level });
  }

  if (days.length < 365 || days.length > 372) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  const start = Date.parse(days[0].date);
  return days.every(({ date }, index) => Date.parse(date) === start + index * dayMs) ? days : null;
}

function summarize(days: ContributionDay[], isSnapshot: boolean): GitHubActivity {
  return { days, total: days.reduce((total, day) => total + day.count, 0), isSnapshot };
}

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  try {
    // Read the same chart a signed-out visitor sees on GitHub.
    const response = await fetch(`https://github.com/users/${encodeURIComponent(profile.github)}/contributions`, {
      headers: { Accept: "text/html", "Accept-Language": "en" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    const days = response.ok ? parseDays(await response.text()) : null;
    if (days) return summarize(days, false);
  } catch {
    // The saved public chart keeps the section usable during an outage.
  }

  if (snapshot.login !== profile.github) return null;
  const start = Date.parse(snapshot.firstDate);
  const days = snapshot.counts.map((count, index) => ({
    date: new Date(start + index * dayMs).toISOString().slice(0, 10),
    count,
    level: Number(snapshot.levels[index]),
  }));
  return summarize(days, true);
}
