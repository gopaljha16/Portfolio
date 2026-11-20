import Link from "next/link";
import { skillGroups } from "@/lib/data";

const examples = {
  frontend: { name: "Lynkr", href: "/work/lynkr" },
  backend: { name: "Quibly", href: "/work/quibly" },
  cloud: { name: "Boutique on EKS", href: "https://github.com/gopaljha16/Ecommerce-Microservices" },
  ai: { name: "Elevare", href: "/work/elevare" },
} satisfies Record<keyof typeof skillGroups, { name: string; href: string }>;

export function Skills() {
  const groups = Object.keys(skillGroups) as (keyof typeof skillGroups)[];

  return (
    <section id="skills" className="about-subsection" aria-labelledby="skills-title">
      <h3 id="skills-title">Technical stack</h3>
      <dl className="skill-list">
        {groups.map((key) => {
          const group = skillGroups[key];
          const example = examples[key];
          return (
            <div key={key} className="skill-row">
              <dt>{group.name}</dt>
              <dd>
                <p>{group.skills.join(" · ")}</p>
                <Link href={example.href} className="portfolio-text-link">{example.name}</Link>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
