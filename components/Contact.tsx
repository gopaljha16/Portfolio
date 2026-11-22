"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy } from "lucide-react";
import { profile } from "@/lib/data";

export function Contact() {
  const [feedback, setFeedback] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setFeedback("Email copied.");
    } catch {
      setFeedback("Select the email address to copy it.");
    }
  }

  return (
    <section id="contact" className="site-shell portfolio-section" aria-labelledby="contact-title">
      <div className="contact-panel">
        <header className="portfolio-section-heading"><h2 id="contact-title">Get in touch</h2></header>
        <p>I’m open to full-stack roles and software projects.</p>
        <div className="contact-actions">
          <a href={`mailto:${profile.email}`} className="portfolio-text-link contact-email">{profile.email}</a>
          <button type="button" onClick={copyEmail} className="site-icon-button" aria-label="Copy email address">
            <Copy size={18} aria-hidden="true" />
          </button>
        </div>
        <Link href="/resume" className="portfolio-text-link">View résumé</Link>
        <p className="entry-meta contact-feedback" role="status">{feedback}</p>
      </div>
    </section>
  );
}
