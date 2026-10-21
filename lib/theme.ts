import { flushSync } from "react-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

export const isDark = () => document.documentElement.classList.contains("dark");

function apply(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
}

/** Flip the theme. With an origin point, the new theme grows out of it as a circle. */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next = !isDark();
  const doc = document as ViewTransitionDocument;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduce) return apply(next);

  const { x, y } = origin ?? { x: innerWidth / 2, y: innerHeight / 2 };
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  doc
    .startViewTransition(() => flushSync(() => apply(next)))
    .ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
}
