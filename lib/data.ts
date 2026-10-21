import type { StaticImageData } from "next/image";
import Codexa from "@/images/Codexa.png";
import Elevare from "@/images/Elevare.png";
import Lynkr from "@/images/lynkr-landing.png";
import Quibly from "@/images/Quibly-landing.png";
import ConsoleMe from "@/images/consoleme-landing.png";
import Elyra from "@/images/elyra-preview.svg";
import CareoraShot from "@/images/careora.png";
import CravonShot from "@/images/cravon.png";
import RevueonShot from "@/images/revueon.png";

export const profile = {
  name: "Gopal Jha",
  role: "Full-stack engineer",
  city: "Hyderabad",
  country: "India",
  countryCode: "IN",
  timeZone: "Asia/Kolkata",
  email: "gopaljha1677@gmail.com",
  /** Canonical domain. Override with NEXT_PUBLIC_SITE_URL (no trailing slash). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gopaldev.in").replace(/\/$/, ""),
  /** Put a portrait in /public and set its path here, e.g. "/gopal.jpg". Used on the page and in search results. */
  photo: undefined as string | undefined,
  github: "gopaljha16",
  links: {
    github: "https://github.com/gopaljha16",
    linkedin: "https://www.linkedin.com/in/gopal-jha-229a2b243/",
    x: "https://x.com/Gopaljha04",
  },
  /** Meta description: kept under 160 characters so search results show it whole. */
  description:
    "Gopal Jha is a full-stack engineer in Hyderabad, India, building real-time apps, AI tools and coding platforms like Codexa, Quibly and Elevare.",
};

export type Domain = "AI" | "Real-time" | "Learning" | "Social" | "Tools";

export const domains: Domain[] = ["AI", "Real-time", "Learning", "Social", "Tools"];

export type Project = {
  slug: string;
  name: string;
  /** One line, the product's own promise. */
  tagline: string;
  summary: string;
  image: StaticImageData;
  /** The product's own brand color, taken from its UI. */
  color: string;
  /** Text color on `color`. Dark everywhere except Quibly's violet, where black is the only ink above 4.5:1. */
  ink?: string;
  href?: string;
  repo?: string;
  year: number;
  status: "live" | "building";
  domains: Domain[];
  features: string[];
  /** What AI does in this product, for projects in the "AI" domain. */
  aiUse?: string;
  /** Case study content. Projects without it get no case study page. */
  study?: {
    overview: string[];
    highlights: { title: string; copy: string }[];
    stack: { layer: string; items: string[] }[];
  };
};

export const projects: Project[] = [
  {
    slug: "codexa",
    name: "Codexa",
    tagline: "Code. Learn. Compete. Conquer interviews.",
    summary:
      "A coding and DSA platform with contests, AI mock interviews and visual explanations of algorithms.",
    image: Codexa,
    color: "#FF8A1F",
    href: "https://codexa.live",
    repo: "https://github.com/gopaljha16/codexa",
    year: 2025,
    status: "live",
    domains: ["AI", "Learning"],
    features: ["Contests", "AI interviews", "DSA visualizer"],
    aiUse: "runs mock interviews",
    study: {
      overview: [
        "Codexa is a full platform for getting good at data structures and algorithms: a problem library with an in-browser editor, live contests with real-time leaderboards, and an AI interviewer that runs mock technical rounds.",
        "I built it end to end, from the problem judge and contest engine to the payments, the admin panel and the dashboard that turns every submission into a progress heatmap.",
      ],
      highlights: [
        { title: "Problem library", copy: "Curated DSA problems with explanations, multiple test cases and a Monaco editor in the browser." },
        { title: "AI doubt assistant", copy: "Stuck on a problem? A Gemini-powered assistant explains the idea without handing over the answer." },
        { title: "AI mock interviews", copy: "Simulated technical interviews for realistic practice before the real thing." },
        { title: "Live contests", copy: "Timed challenges with leaderboards that update in real time over Socket.IO." },
        { title: "Progress dashboard", copy: "Heatmaps, submission history and performance analytics for every user." },
        { title: "Payments and admin", copy: "Razorpay for premium plans, and an admin panel for problems, contests and users." },
      ],
      stack: [
        { layer: "Frontend", items: ["React", "Redux Toolkit", "Tailwind CSS", "GSAP", "Monaco Editor", "Vite"] },
        { layer: "Backend", items: ["Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "JWT + Google OAuth"] },
        { layer: "Services", items: ["Google Gemini", "Cloudinary", "Razorpay", "Nodemailer"] },
      ],
    },
  },
  {
    slug: "quibly",
    name: "Quibly",
    tagline: "A cleaner way to chat, collaborate and grow your community.",
    summary:
      "A community platform for channel chat, voice rooms and moderation, in the spirit of Discord.",
    image: Quibly,
    color: "#8B5CF6",
    ink: "#000000",
    href: "https://quiblyy.vercel.app/",
    repo: "https://github.com/gopaljha16/Quibly",
    year: 2025,
    status: "live",
    domains: ["Real-time", "Social"],
    features: ["WebSocket", "LiveKit voice", "Redis + Kafka"],
    study: {
      overview: [
        "Quibly is a real-time communication platform for communities: servers and channels, direct messages, voice and video calls, and the moderation tools that keep a busy server healthy.",
        "The interesting part is underneath. Messages fan out through Socket.IO with a Redis adapter so it scales across servers, Kafka carries events between services, and LiveKit handles voice and video.",
      ],
      highlights: [
        { title: "Real-time messaging", copy: "Channels and direct messages delivered instantly, with reactions, file uploads and link previews." },
        { title: "Voice and video", copy: "Voice rooms and video calls built on LiveKit." },
        { title: "Auto moderation", copy: "Content filtering rules, audit logs and member screening for new joiners." },
        { title: "Roles and permissions", copy: "A granular permission system so every server can run its own way." },
        { title: "Presence", copy: "Custom status, activities and live presence for every member." },
        { title: "Discovery", copy: "Interest-based discovery so people can find servers worth joining." },
      ],
      stack: [
        { layer: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Zustand", "TanStack Query", "Radix UI"] },
        { layer: "Backend", items: ["Bun", "Express", "PostgreSQL", "Prisma", "Socket.IO", "Redis", "Apache Kafka"] },
        { layer: "Infrastructure", items: ["LiveKit", "Docker Compose", "Nginx load balancing", "Cloudinary"] },
      ],
    },
  },
  {
    slug: "elevare",
    name: "Elevare",
    tagline: "Build ATS-optimized resumes and portfolios.",
    summary:
      "An AI resume builder that scores resumes against ATS checks and turns them into portfolios.",
    image: Elevare,
    color: "#E9479A",
    href: "https://elevare-seven.vercel.app/",
    repo: "https://github.com/gopaljha16/Elevare",
    year: 2025,
    status: "live",
    domains: ["AI", "Tools"],
    features: ["ATS scoring", "Portfolios", "Interview prep"],
    aiUse: "scores resumes against ATS checks",
    study: {
      overview: [
        "Elevare is an AI career platform for students and professionals. It builds ATS-friendly resumes, tunes them for a specific job description, and turns them into a portfolio.",
        "Upload an existing resume as a PDF or Word file and Elevare parses it, scores it, and suggests what to fix before a recruiter's software ever sees it.",
      ],
      highlights: [
        { title: "ATS score", copy: "Checks a resume the way applicant tracking systems do and explains the score." },
        { title: "Job-specific tuning", copy: "Optimizes keywords and wording for the exact role you're applying to." },
        { title: "Import anything", copy: "Reads existing resumes from PDF and Word files." },
        { title: "Portfolio generator", copy: "Turns the same content into a portfolio site." },
        { title: "Interview prep", copy: "Practice tools for the interview that comes after the resume works." },
        { title: "PDF export", copy: "Download a clean, print-ready resume." },
      ],
      stack: [
        { layer: "Frontend", items: ["React", "Redux Toolkit", "Radix UI", "Tailwind CSS", "Framer Motion", "Vite"] },
        { layer: "Backend", items: ["Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "Passport + Google OAuth"] },
        { layer: "Services", items: ["Google Gemini", "Razorpay", "pdf-parse", "Mammoth"] },
      ],
    },
  },
  {
    slug: "lynkr",
    name: "Lynkr",
    tagline: "Not another link page. A conversion cockpit.",
    summary:
      "A link-in-bio page with custom slugs, a built-in URL shortener and QR codes for every link.",
    image: Lynkr,
    color: "#5B8CFF",
    href: "https://lynkr-iota.vercel.app/",
    repo: "https://github.com/gopaljha16/Lynkr",
    year: 2025,
    status: "live",
    domains: ["Tools"],
    features: ["Custom slugs", "Short links", "QR codes"],
    study: {
      overview: [
        "Lynkr is a link-in-bio page built for people who care what happens after the click. Links, social profiles and a portfolio live on one page with a custom slug.",
        "Every link gets a short URL and a QR code, and a live board shows visits, clicks and click-through rate so you can see which links actually work.",
      ],
      highlights: [
        { title: "Custom slugs", copy: "Your page at a name you choose." },
        { title: "URL shortener", copy: "Short links for anything you share, built in." },
        { title: "QR codes", copy: "A QR code for every link, ready for print." },
        { title: "Live board", copy: "Visits, clicks and click-through rate, charted as they happen." },
      ],
      stack: [
        { layer: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Radix UI", "Recharts", "Framer Motion"] },
        { layer: "Backend", items: ["Next.js route handlers", "Prisma", "Clerk auth"] },
      ],
    },
  },
  {
    slug: "console-me",
    name: "Console Me",
    tagline: "Meet new people instantly, then keep the ones worth your time.",
    summary:
      "Instant matching meets intentional dating: meet people in seconds, then keep the ones worth your time.",
    image: ConsoleMe,
    color: "#22A06B",
    href: "https://console-me-nu.vercel.app/",
    repo: "https://github.com/gopaljha16/console-me",
    year: 2026,
    status: "live",
    domains: ["Real-time", "Social"],
    features: ["Instant matching", "Video rooms", "Speed dates"],
    study: {
      overview: [
        "Console Me brings together the speed of random video chat and the intention of modern dating. You meet someone in seconds, talk in a video room with shared prompts, and keep the matches worth keeping.",
        "It's a Turborepo monorepo with a Next.js web app, real-time signalling over Socket.IO and LiveKit for video, all running in Docker.",
      ],
      highlights: [
        { title: "Instant matching", copy: "Get matched with someone new in seconds." },
        { title: "Video rooms", copy: "Live video with shared prompts so conversations don't stall." },
        { title: "Speed dates", copy: "Timed rounds that keep things moving." },
        { title: "Matches worth keeping", copy: "Save the people you clicked with and pick the conversation back up." },
      ],
      stack: [
        { layer: "Frontend", items: ["Next.js", "React", "Zustand", "TanStack Query", "Tailwind CSS"] },
        { layer: "Real-time", items: ["LiveKit", "Socket.IO", "UploadThing", "Google OAuth"] },
        { layer: "Infrastructure", items: ["Turborepo", "Bun", "Docker Compose"] },
      ],
    },
  },
  {
    slug: "elyra",
    name: "Elyra",
    tagline: "In active development.",
    summary: "A full-stack product I'm building right now. More soon.",
    image: Elyra,
    color: "#F43F5E",
    year: 2026,
    status: "building",
    domains: [],
    features: ["Full stack", "In development"],
  },
];

export const caseStudies = projects.filter((p) => p.study);

export const inkOn = (p: Pick<Project, "ink">) => p.ink ?? "#12141b";

export type ArchiveItem = {
  name: string;
  year: number;
  summary: string;
  stack: string[];
  href?: string;
  repo?: string;
  /** Screenshot of the live site, shown as a hover preview. */
  image?: StaticImageData;
};

/** Smaller builds, pulled from GitHub. Newest first. */
export const archive: ArchiveItem[] = [
  {
    name: "Careora",
    year: 2026,
    summary: "A job application tracker with a drag-and-drop pipeline, interview reminders and stats.",
    stack: ["Next.js", "Express", "PostgreSQL", "Prisma"],
    href: "https://careora-frontend.vercel.app",
    repo: "https://github.com/gopaljha16/Careora",
    image: CareoraShot,
  },
  {
    name: "Boutique on EKS",
    year: 2026,
    summary: "Seven e-commerce microservices on AWS EKS, provisioned with Terraform and shipped through GitHub Actions and ArgoCD, with a Bedrock ops agent.",
    stack: ["Kubernetes", "Terraform", "ArgoCD", "AWS Bedrock"],
    repo: "https://github.com/gopaljha16/Ecommerce-Microservices",
  },
  {
    name: "ChronoTasks API",
    year: 2026,
    summary: "An event-driven task orchestration engine.",
    stack: ["Python", "Django REST Framework"],
    repo: "https://github.com/gopaljha16/ChronoTasks-API-Event-Driven-Task-Orchestration-Engine",
  },
  {
    name: "Cravon",
    year: 2026,
    summary: "Food delivery with restaurant discovery, Razorpay checkout and a partner dashboard.",
    stack: ["React", "Django REST Framework", "MongoDB", "Razorpay"],
    href: "https://cravon-delta.vercel.app",
    repo: "https://github.com/gopaljha16/Cravon",
    image: CravonShot,
  },
  {
    name: "Revueon",
    year: 2025,
    summary: "An AI code review extension for VS Code, with agent mode, autocomplete and Gemini, OpenAI, DeepSeek or Grok behind it.",
    stack: ["TypeScript", "VS Code API"],
    href: "https://marketplace.visualstudio.com/items?itemName=RevueonLabs.revueon",
    repo: "https://github.com/gopaljha16/Revueon-Extension",
    image: RevueonShot,
  },
  {
    name: "CodeLens",
    year: 2025,
    summary: "An algorithm visualizer with a race mode that runs sorting algorithms side by side.",
    stack: ["React", "TypeScript"],
    repo: "https://github.com/gopaljha16/Codelens",
  },
  {
    name: "RAG PDF Assistant",
    year: 2025,
    summary: "Ask questions of a PDF and get answers grounded in its pages.",
    stack: ["Python", "RAG"],
    repo: "https://github.com/gopaljha16/RAG-PDF-Assistant",
  },
  {
    name: "Exodus Wallet",
    year: 2025,
    summary: "A Web3 wallet for connecting wallets and managing crypto assets.",
    stack: ["Next.js", "Solidity"],
    repo: "https://github.com/gopaljha16/Exodus-Wallet",
  },
  {
    name: "Nexonnect",
    year: 2025,
    summary: "Real-time chat for private, group and community conversations, with an AI assistant built in.",
    stack: ["JavaScript", "Socket.IO"],
    repo: "https://github.com/gopaljha16/Nexonnect",
  },
];

export type SkillGroup = {
  name: string;
  color: string;
  blurb: string;
  skills: string[];
};

export const skillGroups: Record<"frontend" | "backend" | "cloud" | "ai", SkillGroup> = {
  frontend: {
    name: "Frontend",
    color: "#5B8CFF",
    blurb: "Interfaces that feel quick and stay accessible.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
  },
  backend: {
    name: "Backend",
    color: "#22A06B",
    blurb: "APIs and data layers built for real traffic.",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Kafka", "Prisma"],
  },
  cloud: {
    name: "Cloud & DevOps",
    color: "#FF8A1F",
    blurb: "Automated releases I don't have to babysit.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD"],
  },
  ai: {
    name: "Web3 & GenAI",
    color: "#8B5CF6",
    blurb: "LLM workflows, RAG systems and smart contracts on Ethereum and Polygon.",
    skills: ["Gemini", "OpenAI", "LangChain", "Pinecone", "Solidity", "Ethers.js"],
  },
};

export const workflow = [
  {
    title: "Architect",
    copy: "Design the data model, the API surface and how the system holds up under load.",
  },
  {
    title: "Develop",
    copy: "Build the interface and the backend together, so every screen has a real endpoint behind it.",
  },
  {
    title: "Deploy",
    copy: "Ship through automated pipelines, then keep iterating on what people actually use.",
  },
];

export type Role = {
  role: string;
  company: string;
  type: "Internship" | "Freelance" | "Full-time";
  place: string;
  period: string;
  duration: string;
  /** Months since Oct 2025, for the shared time axis. */
  span: [number, number];
  color: string;
  monogram: string;
  summary: string;
  highlights: string[];
  skills: string[];
  certificate?: string;
};

/** From LinkedIn. Newest first. */
export const experience: Role[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Coder Army",
    type: "Internship",
    place: "Remote",
    period: "Apr 2026 – Oct 2026",
    duration: "Six-month internship",
    span: [6, 12],
    color: "#5B8CFF",
    monogram: "CA",
    summary:
      "Worked across full-stack product development, frontend engineering, backend implementation, Generative AI and technical content creation.",
    highlights: [
      "Full-stack product development, from the interface down to the API.",
      "Frontend engineering and backend implementation on the same features.",
      "Generative AI work, from prototypes to integrations.",
      "Technical content creation for a developer audience.",
    ],
    skills: ["Frontend development", "Backend development", "Generative AI", "Technical writing"],
    certificate: "Full Stack Developer Internship Certificate, April 1 to October 1, 2026",
  },
  {
    role: "Full Stack Developer",
    company: "Fiverr",
    type: "Freelance",
    place: "Remote",
    period: "Oct 2025 – Dec 2025",
    duration: "3 months",
    span: [0, 3],
    color: "#22A06B",
    monogram: "fi",
    summary: "Full-stack builds for clients, from planning to live deployment and the work after launch.",
    highlights: [
      "Delivered web products end to end, from planning to live deployment.",
      "Shipped an e-commerce platform with a product catalog, checkout, admin panel and production hosting.",
      "Built ad-tech and SaaS tools with responsive frontends, scalable APIs and deployment pipelines.",
      "Handled maintenance, new features and performance work after launch.",
    ],
    skills: ["Node.js", "React.js"],
  },
];

/** My own projects on the same axis, placed by first commit (months since Oct 2025). */
export const startedAlongside = [
  { name: "Revueon", month: "Dec 2025", at: 2.8, color: "#9ba2b2" },
  { name: "Quibly", month: "Jan 2026", at: 3.1, color: "#8B5CF6" },
  { name: "Console Me", month: "Apr 2026", at: 6.3, color: "#22A06B" },
  { name: "Cravon", month: "Apr 2026", at: 6.7, color: "#9ba2b2" },
  { name: "Boutique on EKS", month: "May 2026", at: 7.4, color: "#9ba2b2" },
  { name: "Careora", month: "Jun 2026", at: 8.5, color: "#9ba2b2" },
];

export const snapshot = [
  { label: "Based in", value: "Hyderabad, working remotely worldwide" },
  { label: "Domains", value: "EdTech, AI, SaaS, Web3" },
  { label: "Replies", value: "Usually within 24 hours" },
];

/**
 * Every tool, and the projects that actually shipped with it, taken from each repo's
 * package.json and README. Names in `usedIn` match `toolboxProjects`.
 */
export const toolbox: { group: string; color: string; tools: { name: string; usedIn: string[] }[] }[] = [
  {
    group: "Frontend",
    color: "#5B8CFF",
    tools: [
      { name: "React", usedIn: ["Codexa", "Quibly", "Elevare", "Lynkr", "Console Me", "Careora", "Cravon"] },
      { name: "Next.js", usedIn: ["Quibly", "Lynkr", "Console Me", "Careora", "Exodus Wallet"] },
      { name: "TypeScript", usedIn: ["Quibly", "Lynkr", "Console Me", "Careora", "Revueon", "Exodus Wallet"] },
      { name: "Tailwind CSS", usedIn: ["Codexa", "Quibly", "Elevare", "Lynkr", "Console Me", "Careora", "Cravon"] },
      { name: "Framer Motion", usedIn: ["Elevare", "Lynkr", "Careora"] },
      { name: "Redux Toolkit", usedIn: ["Codexa", "Elevare"] },
      { name: "Zustand", usedIn: ["Quibly", "Console Me"] },
    ],
  },
  {
    group: "Backend",
    color: "#22A06B",
    tools: [
      { name: "Node.js + Express", usedIn: ["Codexa", "Quibly", "Elevare", "Careora"] },
      { name: "Socket.IO", usedIn: ["Codexa", "Quibly", "Elevare", "Console Me", "Nexonnect"] },
      { name: "PostgreSQL", usedIn: ["Quibly", "Careora"] },
      { name: "MongoDB", usedIn: ["Codexa", "Elevare", "Cravon"] },
      { name: "Prisma", usedIn: ["Quibly", "Lynkr", "Careora"] },
      { name: "Redis", usedIn: ["Codexa", "Quibly", "Elevare"] },
      { name: "Kafka", usedIn: ["Quibly"] },
      { name: "Django REST", usedIn: ["Cravon", "ChronoTasks API"] },
      { name: "LiveKit", usedIn: ["Quibly", "Console Me"] },
      { name: "Razorpay", usedIn: ["Codexa", "Elevare", "Cravon"] },
    ],
  },
  {
    group: "Cloud & DevOps",
    color: "#FF8A1F",
    tools: [
      { name: "Docker", usedIn: ["Quibly", "Console Me", "Boutique on EKS"] },
      { name: "Kubernetes", usedIn: ["Boutique on EKS"] },
      { name: "Terraform", usedIn: ["Boutique on EKS"] },
      { name: "ArgoCD", usedIn: ["Boutique on EKS"] },
      { name: "GitHub Actions", usedIn: ["Boutique on EKS"] },
      { name: "Nginx", usedIn: ["Quibly"] },
    ],
  },
  {
    group: "AI & Web3",
    color: "#8B5CF6",
    tools: [
      { name: "Gemini", usedIn: ["Codexa", "Elevare", "Revueon"] },
      { name: "OpenAI", usedIn: ["Revueon"] },
      { name: "AWS Bedrock", usedIn: ["Boutique on EKS"] },
      { name: "RAG", usedIn: ["RAG PDF Assistant"] },
      { name: "Solidity", usedIn: ["Exodus Wallet"] },
    ],
  },
];

/** The right-hand column of the toolbox map, in display order. */
export const toolboxProjects = [
  "Codexa",
  "Quibly",
  "Elevare",
  "Lynkr",
  "Console Me",
  "Careora",
  "Cravon",
  "Revueon",
  "Boutique on EKS",
  "Exodus Wallet",
  "ChronoTasks API",
  "RAG PDF Assistant",
  "Nexonnect",
];

/** Tools I use without a shipped project to point at yet. */
export const alsoComfortableWith = ["LangChain", "Pinecone", "Ethers.js", "Ansible", "Jenkins", "Linux"];

export type Milestone = {
  date: string;
  year: number;
  title: string;
  copy: string;
  /** Slug of a featured project, to color the marker and link the case study. */
  project?: string;
  href?: string;
  /** Extra detail revealed on demand. */
  details?: string[];
};

/** Dates come from first commits in each repo's git history. */
export const milestones: Milestone[] = [
  {
    date: "Feb 2024",
    year: 2024,
    title: "First commits",
    copy: "HTML, CSS and JavaScript, one small project at a time. The JavaScript repo alone grew to 69 commits.",
    href: "https://github.com/gopaljha16/JavaScript-Projects",
  },
  {
    date: "Sep 2024",
    year: 2024,
    title: "A first AI project",
    copy: "DisasterGuard, an AI-driven disaster management site.",
    href: "https://github.com/gopaljha16/DisasterGaurd",
  },
  {
    date: "Jan 2025",
    year: 2025,
    title: "133 days of DSA",
    copy: "A daily habit of data structures and algorithms, logged in 165 commits through September.",
    href: "https://github.com/gopaljha16/133Days-of-Dsa-Learning",
  },
  {
    date: "Apr 2025",
    year: 2025,
    title: "A coding platform from scratch",
    copy: "A LeetCode-style judge with problems and submissions. It became the first version of Codexa.",
    href: "https://github.com/gopaljha16/Coding-Platform",
  },
  {
    date: "Aug 2025",
    year: 2025,
    title: "Codexa",
    copy: "Rebuilt properly, with live contests, AI mock interviews and payments. Now live at codexa.live.",
    project: "codexa",
  },
  {
    date: "Oct 2025",
    year: 2025,
    title: "Freelancing on Fiverr",
    copy: "Full-stack builds for clients, from planning to live deployment. The details are under Experience.",
  },
  {
    date: "Dec 2025",
    year: 2025,
    title: "On the VS Code Marketplace",
    copy: "Revueon, an AI code review extension, is published for anyone to install.",
    href: "https://marketplace.visualstudio.com/items?itemName=RevueonLabs.revueon",
  },
  {
    date: "Feb 2026",
    year: 2026,
    title: "Quibly 1.0",
    copy: "A Discord-style platform with voice, video and moderation, built over 165 commits.",
    project: "quibly",
  },
  {
    date: "Apr 2026",
    year: 2026,
    title: "Full-stack internship at Coder Army",
    copy: "Six months of full-stack product work, Generative AI and technical content, finished with a certificate in October.",
  },
  {
    date: "Apr 2026",
    year: 2026,
    title: "Console Me and Cravon",
    copy: "Live video matching on LiveKit, and food delivery on Django.",
    project: "console-me",
  },
  {
    date: "May 2026",
    year: 2026,
    title: "Kubernetes, end to end",
    copy: "Seven microservices on AWS EKS with Terraform, ArgoCD and a Bedrock ops agent.",
    href: "https://github.com/gopaljha16/Ecommerce-Microservices",
  },
  {
    date: "Now",
    year: 2026,
    title: "Building Elyra",
    copy: "The next one. More soon.",
    project: "elyra",
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "projects deployed and live" },
  { value: 133, suffix: "", label: "days of DSA practice, logged on GitHub" },
  { value: 165, suffix: "", label: "commits to ship Quibly 1.0" },
  { value: 1, suffix: "", label: "extension on the VS Code Marketplace" },
];

/** Used when the GitHub API can't be reached at build time. Snapshot from Oct 2026. */
export const githubFallback = {
  repos: 70,
  languages: [
    { name: "JavaScript", count: 20 },
    { name: "TypeScript", count: 16 },
    { name: "CSS", count: 4 },
  ],
  other: 15,
  lastPush: "2026-09-24T00:00:00Z",
};

/**
 * Questions people (and answer engines) ask, answered in full sentences that name Gopal,
 * so each answer stands on its own when quoted. Rendered on the page and as FAQPage data.
 */
export const faq = [
  {
    q: "Who is Gopal Jha?",
    a: "Gopal Jha is a full-stack engineer based in Hyderabad, India. He designs, builds and ships complete web products on his own, from the database to the deploy. His live products include Codexa, Quibly, Elevare, Lynkr and Console Me.",
  },
  {
    q: "What has Gopal Jha built?",
    a: "Five live products: Codexa, a coding and DSA platform with live contests and AI mock interviews; Quibly, a Discord-style community platform with voice and video; Elevare, an AI resume builder; Lynkr, a link-in-bio page with analytics; and Console Me, a video matching app. He also published Revueon, an AI code review extension, on the VS Code Marketplace.",
  },
  {
    q: "What experience does Gopal Jha have?",
    a: "Gopal Jha completed a six-month Full Stack Developer internship at Coder Army, from April to October 2026, and worked as a freelance full-stack developer on Fiverr from October to December 2025. He has been shipping his own products since his first commits in February 2024.",
  },
  {
    q: "What tech stack does Gopal Jha use?",
    a: "React, Next.js and TypeScript on the frontend; Node.js, Express, PostgreSQL, MongoDB, Prisma, Redis, Kafka and Socket.IO on the backend; Docker, Kubernetes, Terraform, ArgoCD and GitHub Actions for infrastructure; and Gemini and OpenAI for AI features.",
  },
  {
    q: "Where is Gopal Jha based?",
    a: "Gopal Jha is based in Hyderabad, India, and works remotely with teams and clients worldwide on Indian Standard Time (UTC+5:30).",
  },
  {
    q: "Is Gopal Jha available for work?",
    a: "Yes. Gopal Jha is open to full-time roles, freelance projects and product consulting. Email gopaljha1677@gmail.com and expect a reply within a day.",
  },
];
