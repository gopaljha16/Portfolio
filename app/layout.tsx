import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gopal Jha | Full-Stack Engineer",
  description:
    "Portfolio of Gopal Jha — Full-stack engineer building scalable products across Web3, DevOps, and GenAI. Available for freelance, full-time, and consulting work.",
  authors: [{ name: "Gopal Jha" }],
  keywords: [
    "Gopal Jha",
    "Full-Stack Developer",
    "Web3",
    "GenAI",
    "DevOps",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Gopal Jha | Building Internet Products",
    description:
      "Full-stack engineer building scalable products across Web3, DevOps, and GenAI.",
    type: "website",
    url: "https://gopaljha.dev",
    siteName: "Gopal Jha Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gopal Jha | Building Internet Products",
    description:
      "Full-stack engineer building scalable products across Web3, DevOps, and GenAI.",
    creator: "@Gopaljha04",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                  document.body.className = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
