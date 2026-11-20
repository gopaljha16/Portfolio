import { archive, caseStudies, experience, faq, profile, toolbox } from "./data";

/**
 * A plain-markdown briefing for AI crawlers and answer engines (the llms.txt convention).
 * Built from the same data as the page, so the two never disagree.
 */
export function llmsText(full: boolean) {
  const lines: string[] = [
    `# ${profile.name}`,
    "",
    `> ${profile.description}`,
    "",
    `${profile.name} is a ${profile.role.toLowerCase()} based in ${profile.city}, ${profile.country}. This site (${profile.url}) is his official portfolio.`,
    "",
    "## Contact",
    "",
    `- Email: ${profile.email}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- X: ${profile.links.x}`,
    "",
    "## Experience",
    "",
    ...experience.map((r) => `- ${r.role}, ${r.company} (${r.type}, ${r.place}), ${r.period}. ${r.summary}`),
    "",
    "## Products",
    "",
    ...caseStudies.map(
      (p) => `- [${p.name}](${profile.url}/work/${p.slug}): ${p.summary}${p.href ? ` Live at ${p.href}.` : ""}`,
    ),
    "",
    "## Other projects",
    "",
    ...archive.map((a) => `- ${a.name} (${a.year}): ${a.summary} Built with ${a.stack.join(", ")}.`),
    "",
    "## Tools, and where they shipped",
    "",
    ...toolbox.flatMap((g) => [
      `### ${g.group}`,
      ...g.tools.map((t) => `- ${t.name}: ${t.usedIn.join(", ")}`),
      "",
    ]),
    "## Questions and answers",
    "",
    ...faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];

  if (full) {
    lines.push("## Case studies", "");
    for (const p of caseStudies) {
      if (!p.study) continue;
      lines.push(`### ${p.name}`, "", `${p.tagline}`, "", ...p.study.overview.flatMap((o) => [o, ""]));
      lines.push("What it does:", "", ...p.study.highlights.map((h) => `- ${h.title}: ${h.copy}`), "");
      lines.push("Built with:", "", ...p.study.stack.map((s) => `- ${s.layer}: ${s.items.join(", ")}`), "");
      if (p.href) lines.push(`Live site: ${p.href}`);
      if (p.repo) lines.push(`Source: ${p.repo}`);
      lines.push("");
    }
  } else {
    lines.push("## More", "", `- [Full details, including every case study](${profile.url}/llms-full.txt)`, "");
  }

  return lines.join("\n");
}
