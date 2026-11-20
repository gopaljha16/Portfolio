import { Github } from "lucide-react";
import { profile } from "@/lib/data";
import type { GitHubActivity as Activity } from "@/lib/github-activity";
import { ContributionCalendar } from "./ContributionCalendar";

const periodFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function GitHubActivity({ activity }: { activity: Activity | null }) {
  return (
    <section id="github" className="site-shell portfolio-section" aria-labelledby="github-title">
      <header className="portfolio-section-heading">
        <h2 id="github-title">GitHub activity</h2>
        <a href={profile.links.github} className="portfolio-text-link" rel="me">View GitHub profile</a>
      </header>
      <div className="contribution-panel">
        {activity ? (
          <>
            <div className="contribution-summary">
              <span className="contribution-icon"><Github size={22} aria-hidden="true" /></span>
              <div>
                <p><strong>{activity.total.toLocaleString("en-IN")}</strong> {activity.total === 1 ? "contribution" : "contributions"}</p>
                <p className="contribution-period">
                  {periodFormat.formatRange(new Date(activity.days[0].date), new Date(activity.days[activity.days.length - 1].date))}
                  {activity.source === "account" && " · Public + private"}
                  {activity.source === "profile" && " · GitHub profile"}
                  {activity.source === "snapshot" && " · Saved snapshot"}
                </p>
              </div>
            </div>
            <ContributionCalendar days={activity.days} />
          </>
        ) : (
          <p className="contribution-period">The contribution chart is temporarily unavailable. You can view it on GitHub.</p>
        )}
      </div>
    </section>
  );
}
