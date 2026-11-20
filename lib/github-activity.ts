import { execFile } from "node:child_process";
import { promisify } from "node:util";
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
  source: "account" | "profile" | "snapshot";
};

const dayMs = 86_400_000;
const runGitHubCli = promisify(execFile);
const contributionQuery = `
  query PortfolioContributions {
    viewer {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }
`;

const levels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const;

type AccountCalendarResponse = {
  errors?: unknown[];
  data?: {
    viewer?: {
      login: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: { date: string; contributionCount: number; contributionLevel: keyof typeof levels }[];
          }[];
        };
      };
    };
  };
};

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
    if (count === undefined || !intensity) return null;
    days.push({ date, count, level: Number(intensity) });
  }

  return validateDays(days);
}

function validateDays(days: ContributionDay[]): ContributionDay[] | null {
  if (days.length < 365 || days.length > 372) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));
  const start = Date.parse(days[0].date);
  const valid = days.every(({ date, count, level }, index) =>
    Number.isSafeInteger(count) && count >= 0 &&
    Number.isInteger(level) && level >= 0 && level <= 4 &&
    Date.parse(date) === start + index * dayMs,
  );
  return valid ? days : null;
}

function summarize(days: ContributionDay[], source: GitHubActivity["source"]): GitHubActivity {
  return { days, total: days.reduce((total, day) => total + day.count, 0), source };
}

async function getAccountCalendar(): Promise<AccountCalendarResponse | null> {
  const token = process.env.GITHUB_ACTIVITY_TOKEN?.trim();
  if (token) {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: contributionQuery }),
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? await response.json() : null;
  }

  if (process.env.NODE_ENV !== "development") return null;
  // Let local development use an existing GitHub CLI login without exporting its token.
  const { stdout } = await runGitHubCli("gh", ["api", "graphql", "-f", `query=${contributionQuery}`], {
    timeout: 8000,
    windowsHide: true,
  });
  return JSON.parse(stdout);
}

async function getAccountActivity(): Promise<GitHubActivity | null> {
  try {
    const response = await getAccountCalendar();
    const viewer = response?.data?.viewer;
    if (response?.errors?.length || viewer?.login.toLowerCase() !== profile.github.toLowerCase()) return null;

    const calendar = viewer.contributionsCollection.contributionCalendar;
    const days = validateDays(calendar.weeks.flatMap(({ contributionDays }) => contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levels[day.contributionLevel],
    }))));
    if (!days) return null;
    const activity = summarize(days, "account");
    return activity.total === calendar.totalContributions ? activity : null;
  } catch {
    return null;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const accountActivity = await getAccountActivity();
  if (accountActivity) return accountActivity;

  try {
    // Read the same chart a signed-out visitor sees on GitHub.
    const response = await fetch(`https://github.com/users/${encodeURIComponent(profile.github)}/contributions`, {
      headers: { Accept: "text/html", "Accept-Language": "en" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    const days = response.ok ? parseDays(await response.text()) : null;
    if (days) return summarize(days, "profile");
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
  return summarize(days, "snapshot");
}
