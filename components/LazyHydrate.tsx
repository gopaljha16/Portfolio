"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SECTION_HYDRATED } from "@/lib/events";

/**
 * Renders a section on the server as usual, then leaves that HTML untouched in the browser until
 * the section is about to scroll into view. Only then does React render it and attach its animations.
 *
 * Search engines and readers get the complete HTML from the start; the browser just skips the
 * JavaScript work for sections nobody has reached yet, which keeps the first load fast on phones.
 * `content-visibility: auto` does the same for layout and paint: off-screen sections aren't laid out
 * until they come near. `estimate` is a rough height so the scrollbar is about right before then.
 */
export function LazyHydrate({
  children,
  estimate,
  rootMargin = "600px 0px",
}: {
  children: React.ReactNode;
  estimate: number;
  rootMargin?: string;
}) {
  // useId matches between server and client, so the first client render can find its own server markup.
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  // True on the server, so the HTML is rendered; false on the client's first pass, so it's kept as-is.
  const [active, setActive] = useState(typeof window === "undefined");
  // React 19 replaces an element's contents with its dangerouslySetInnerHTML when hydrating, so we hand
  // it the exact HTML that's already on the page: nothing changes, and nothing inside is hydrated.
  const [serverHtml] = useState(() => (typeof document === "undefined" ? "" : (document.getElementById(id)?.innerHTML ?? "")));
  const style = { contentVisibility: "auto", containIntrinsicSize: `auto ${estimate}px` } as const;

  // Let anything tracking section elements (the nav highlight) know they were just replaced.
  const woke = useRef(false);
  useEffect(() => {
    if (active && woke.current) window.dispatchEvent(new Event(SECTION_HYDRATED));
  }, [active]);

  useEffect(() => {
    if (active || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          woke.current = true;
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [active, rootMargin]);

  if (!active) {
    return <div id={id} ref={ref} data-lazy-section="" style={style} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: serverHtml }} />;
  }
  return (
    <div id={id} ref={ref} data-lazy-section="" style={style}>
      {children}
    </div>
  );
}
