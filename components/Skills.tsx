"use client";

import { skillGroups, type SkillGroup } from "@/lib/data";
import { Bento, SectionHead, Swatch, Tile } from "./Bento";
import { AskPortfolio, InterfaceTuner, LiveApi, RollingDeploy } from "./Demos";
import { Process } from "./Process";
import { StackMap } from "./StackMap";

/** Title, one line, and a small status pill that says what kind of demo sits below. */
function DemoHeader({
  group,
  title,
  blurb,
  status,
}: {
  group: SkillGroup;
  title?: string;
  blurb?: string;
  status: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight md:text-2xl">
          <Swatch color={group.color} className="size-3" />
          {title ?? group.name}
        </h3>
        <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-muted">{blurb ?? group.blurb}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
        <span className="size-1.5 rounded-full" style={{ background: group.color }} />
        {status}
      </span>
    </div>
  );
}

export function Skills() {
  const { frontend, backend, cloud, ai } = skillGroups;
  return (
    <section id="skills" aria-labelledby="skills-title" className="pt-24 md:pt-40">
      <SectionHead
        id="skills-title"
        title="What I work with"
        intro="No list of logos. Every tool here has shipped in something real, and the map shows exactly where. Below it, a few of them at work."
      />
      <Bento>
        <Tile className="col-span-2 md:col-span-12">
          <StackMap />
        </Tile>

        <Tile className="col-span-2 flex flex-col gap-6 p-6 md:col-span-7 md:p-8">
          <DemoHeader group={frontend} status="Interactive" />
          <InterfaceTuner />
        </Tile>
        <Tile className="col-span-2 flex flex-col gap-6 p-6 md:col-span-5 md:p-8">
          <DemoHeader group={backend} status="Simulated" />
          <LiveApi color={backend.color} />
        </Tile>

        <Tile className="col-span-2 flex flex-col gap-6 p-6 md:col-span-5 md:p-8">
          <DemoHeader group={cloud} status="Running" />
          <RollingDeploy color={cloud.color} />
        </Tile>
        <Tile className="col-span-2 flex flex-col gap-6 p-6 md:col-span-7 md:p-8">
          <DemoHeader
            group={ai}
            title="Ask this portfolio"
            blurb="Pick a question. The answer is pieced together from this page's own data and streamed in, the way an LLM reply would be."
            status="Ask it"
          />
          <AskPortfolio color={ai.color} />
        </Tile>

        <Tile className="col-span-2 md:col-span-12">
          <Process />
        </Tile>
      </Bento>
    </section>
  );
}
