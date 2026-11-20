"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { FileCode2, Play, RotateCcw } from "lucide-react";

const items = [2, 5, 8, 12, 16];
const initialTarget = 12;

const source = [
  "function find(items, x) {",
  "  let lo = 0;",
  "  let hi = items.length - 1;",
  "  while (lo <= hi) {",
  "    const mid = (lo + hi) >> 1;",
  "    const value = items[mid];",
  "    if (value === x) return mid;",
  "    if (value < x) lo = mid + 1;",
  "    else hi = mid - 1;",
  "  }",
  "  return -1;",
  "}",
];

function find(items: number[], x: number) {
  let lo = 0;
  let hi = items.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const value = items[mid];
    if (value === x) return mid;
    if (value < x) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

const keywords = new Set(["function", "let", "while", "const", "if", "return", "else"]);
let start = 0;
const lines = source.map((line) => {
  const duration = line.length * 7 + 35;
  const timing = {
    "--code-delay": `${start}ms`,
    "--code-duration": `${duration}ms`,
    "--code-columns": `${line.length}ch`,
    "--code-characters": line.length,
  } as CSSProperties;
  start += duration;
  const tokens = line.split(/(\b\w+\b)/);
  return { timing, tokens };
});

export function CodingDemo() {
  const [target, setTarget] = useState(String(initialTarget));
  const [result, setResult] = useState({ target: initialTarget, index: find(items, initialTarget) });
  const [replay, setReplay] = useState(0);
  const [typing, setTyping] = useState(false);
  const figure = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!figure.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setTyping(true);
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(figure.current);
    return () => observer.disconnect();
  }, []);

  function run(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(target);
    setResult({ target: value, index: find(items, value) });
  }

  return (
    <figure ref={figure} className="coding-demo" aria-labelledby="coding-demo-title">
      <figcaption id="coding-demo-title">
        <span>Try a Codexa-style exercise</span>
        <span>Binary search</span>
      </figcaption>
      <div className="code-editor">
        <div className="code-toolbar">
          <span><FileCode2 size={16} aria-hidden="true" />binary-search.js</span>
          <button type="button" className="code-replay" onClick={() => {
            setTyping(true);
            setReplay((key) => key + 1);
          }} aria-label="Replay typing">
            <RotateCcw size={15} aria-hidden="true" />
            Replay
          </button>
        </div>
        <pre key={replay} data-typing={typing} aria-label="JavaScript binary search function"><code>
          {lines.map(({ timing, tokens }, lineNumber) => (
            <span className="code-line" key={lineNumber}>
              <span className="code-line-number" aria-hidden="true">{lineNumber + 1}</span>
              <span className="code-line-source" style={timing}>
                {tokens.map((token, index) => (
                  <span
                    key={index}
                    className={keywords.has(token) ? "syntax-keyword" : /^\d+$/.test(token) ? "syntax-number" : token === "find" ? "syntax-function" : undefined}
                  >
                    {token}
                  </span>
                ))}
              </span>
              {"\n"}
            </span>
          ))}
        </code></pre>
        <div className="code-console">
          <div className="code-controls">
            <ul className="code-values" aria-label="Sorted values">
              {items.map((item, index) => (
                <li key={item} data-found={index === result.index}>{item}</li>
              ))}
            </ul>
            <form onSubmit={run}>
              <label htmlFor="code-target">Find</label>
              <input id="code-target" type="number" inputMode="numeric" required value={target} onChange={(event) => setTarget(event.target.value)} />
              <button type="submit"><Play size={13} fill="currentColor" aria-hidden="true" /> Run</button>
            </form>
          </div>
          <p className="code-output" role="status">
            <span aria-hidden="true">›</span>{" "}
            {result.index === -1 ? `${result.target} wasn’t found` : `${result.target} found at index ${result.index}`}
          </p>
        </div>
      </div>
    </figure>
  );
}
