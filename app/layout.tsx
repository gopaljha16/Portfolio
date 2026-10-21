import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { profile } from "@/lib/data";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const display = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: "swap",
});

const sans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
  display: "swap",
});

const title = `${profile.name} | Full-Stack Engineer in ${profile.city}, ${profile.country}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  keywords: [
    profile.name,
    "full-stack engineer",
    "full-stack developer",
    `full-stack developer ${profile.city}`,
    "Next.js developer",
    "Node.js developer",
    "React developer India",
    "DevOps",
    "AI engineer",
    "Codexa",
    "Quibly",
    "Elevare",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Gopal",
    lastName: "Jha",
    username: profile.github,
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
    creator: "@Gopaljha04",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION in Vercel to verify the domain in Search Console.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e7eaf0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f15" },
  ],
};

// Runs before paint so the saved (or system) theme never flashes the wrong colors.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-inverse transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
