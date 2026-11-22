"use client";

export function PrintButton() {
  return (
    <button type="button" className="portfolio-button portfolio-button-primary" onClick={() => window.print()}>
      Print or save PDF
    </button>
  );
}
