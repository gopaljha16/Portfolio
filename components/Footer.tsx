import Link from "next/link";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav aria-label="External profiles">
          <a href={profile.links.github} rel="me">GitHub</a>
          <a href={profile.links.linkedin} rel="me">LinkedIn</a>
          <a href={profile.links.x} rel="me">X</a>
          <Link href="/#top">Back to top</Link>
        </nav>
      </div>
    </footer>
  );
}
