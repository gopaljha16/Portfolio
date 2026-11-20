"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { ContributionDay } from "@/lib/github-activity";

const monthFormat = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "UTC" });
const dayFormat = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" });
const weekdays = ["", "Mon", "", "Wed", "", "Fri", ""];
const movements: Partial<Record<string, number>> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };

function describeDay({ date, count }: ContributionDay) {
  const amount = count === 0 ? "No contributions" : count === 1 ? "1 contribution" : `${count} contributions`;
  return `${amount} on ${dayFormat.format(new Date(date))}`;
}

export function ContributionCalendar({ days }: { days: ContributionDay[] }) {
  const [selected, setSelected] = useState(days.length - 1);
  const grid = useRef<HTMLDivElement>(null);
  const offset = new Date(days[0].date).getUTCDay();
  const weeks = Math.ceil((offset + days.length) / 7);
  let lastLabel = -3;

  const months = days.flatMap(({ date }, index) => {
    const week = Math.floor((index + offset) / 7);
    const monthStart = date.endsWith("-01") || (index === 0 && new Date(date).getUTCDate() <= 15);
    if (!monthStart || week - lastLabel < 3) return [];
    lastLabel = week;
    return [{ week, date, name: monthFormat.format(new Date(date)) }];
  });

  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction = movements[event.key];
    if (direction === undefined) return;
    event.preventDefault();
    const next = Math.max(0, Math.min(index + direction, days.length - 1));
    grid.current?.querySelector<HTMLButtonElement>(`[data-day-index="${next}"]`)?.focus();
  }

  return (
    <>
      <p id="contribution-keys" className="sr-only">Use the arrow keys to browse daily contribution counts.</p>
      <div className="contribution-scroll">
        <div className="contribution-chart" style={{ "--chart-weeks": weeks } as CSSProperties}>
          <div className="contribution-months" aria-hidden="true">
            {months.map(({ week, date, name }) => <span key={date} style={{ gridColumn: week + 1 }}>{name}</span>)}
          </div>
          <div className="contribution-weekdays" aria-hidden="true">
            {weekdays.map((label, index) => <span key={index}>{label}</span>)}
          </div>
          <div ref={grid} className="contribution-days" role="group" aria-label="Daily contributions" aria-describedby="contribution-keys">
            {days.map((day, index) => {
              const description = describeDay(day);
              return (
                <button
                  key={day.date}
                  type="button"
                  data-day-index={index}
                  data-level={day.level}
                  aria-label={description}
                  aria-pressed={index === selected}
                  title={description}
                  tabIndex={index === selected ? 0 : -1}
                  style={{ gridColumn: Math.floor((index + offset) / 7) + 1, gridRow: (index + offset) % 7 + 1 }}
                  onFocus={() => setSelected(index)}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => move(event, index)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <p className="contribution-scroll-hint">Scroll to see earlier months.</p>
      <div className="contribution-footer">
        <p className="contribution-selected" role="status">{describeDay(days[selected])}</p>
        <div className="contribution-legend" aria-label="Contribution intensity, from less to more">
          Less
          {[0, 1, 2, 3, 4].map((level) => <span key={level} data-level={level} aria-hidden="true" />)}
          More
        </div>
      </div>
    </>
  );
}
