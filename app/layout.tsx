import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gopal Jha | Full-Stack Engineer",
  description:
    "Portfolio of Gopal Jha — full-stack engineer building scalable products across AI, DevOps, and the web.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
