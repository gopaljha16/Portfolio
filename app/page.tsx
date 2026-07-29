"use client";

import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import Codexa from "@/images/Codexa.png";
import Elevare from "@/images/Elevare.png";
import Lynkr from "@/images/lynkr-landing.png";
import Quibly from "@/images/Quibly-landing.png";
import ConsoleMe from "@/images/consoleme-landing.png";
import Elyra from "@/images/elyra-preview.svg";

type Project = {
  title: string;
  description: string;
  image: StaticImageData;
  href?: string;
  tags: string[];
  status?: string;
};
const projects: Project[] = [
  {
    title: "Console Me",
    description:
      "A polished product landing experience built for a clear, conversion-led first impression.",
    image: ConsoleMe,
    href: "https://gopaldev.in/",
    tags: ["Product", "UI", "Live"],
  },
  {
    title: "Elyra",
    description:
      "A refined full-stack product experience currently in active development.",
    image: Elyra,
    tags: ["Full stack", "In progress"],
    status: "Building now",
  },
  {
    title: "Quibly",
    description:
      "A real-time community platform for chat, voice, and presence.",
    image: Quibly,
    href: "https://quiblyy.vercel.app/",
    tags: ["WebSocket", "Chat", "Voice"],
  },
  {
    title: "Codexa",
    description:
      "A coding and DSA learning platform for contests, interview preparation, and practice.",
    image: Codexa,
    href: "https://codexa.live",
    tags: ["EdTech", "DSA", "Platform"],
  },
  {
    title: "Elevare",
    description:
      "An AI resume builder for ATS-friendly resumes and professional portfolios.",
    image: Elevare,
    href: "https://elevare-seven.vercel.app/",
    tags: ["AI", "Resume", "SaaS"],
  },
  {
    title: "Lynkr",
    description:
      "A flexible profile link page with custom slugs, URL shortening, and QR generation.",
    image: Lynkr,
    href: "https://lynkr-iota.vercel.app/",
    tags: ["Utility", "QR", "Links"],
  },
];
const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <main className="min-h-screen bg-[#10100f] text-[#f6f2ea] selection:bg-[#e87840] selection:text-white">
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[#ed7941]"
        style={{ scaleX: progress }}
      />
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_82%_12%,rgba(235,119,62,.12),transparent_20%),radial-gradient(circle_at_16%_48%,rgba(255,245,220,.045),transparent_22%)]" />
      <Nav />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-8 pt-24 sm:px-7 md:pt-28 lg:px-10">
        <Hero />
        <Work />
        <About />
        <Capabilities />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-7">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-white/10 bg-[#111110]/80 px-5 py-3 backdrop-blur-xl">
        <a href="#top" className="text-sm font-bold tracking-[-.06em]">
          Gopal<span className="text-[#ed7941]">.</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {["Work", "About", "Capabilities"].map((item) => (
            <a
              key={item}
              href={"#" + item.toLowerCase()}
              className="text-[10px] font-bold uppercase tracking-[.16em] text-white/45 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#f6f2ea] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#171412] transition-transform hover:scale-105"
        >
          Let&apos;s talk <ArrowUpRight size={13} />
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden rounded-[28px] border border-white/[.09] bg-[#171614] px-5 pb-8 pt-16 sm:px-9 md:min-h-[680px] md:px-14 md:pt-24"
    >
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10"
      >
        <motion.div
          variants={reveal}
          className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.2em] text-white/45"
        >
          <span>Gopal Jha — Full-stack Engineer</span>
          <span className="hidden sm:block">India / Available worldwide</span>
        </motion.div>
        <motion.h1
          variants={reveal}
          transition={{ duration: 0.7 }}
          className="mt-14 max-w-6xl text-[clamp(4rem,11vw,10rem)] font-semibold leading-[.78] tracking-[-.09em]"
        >
          Making the web
          <br />
          <span className="font-serif font-normal italic text-[#eeae85]">
            feel effortless.
          </span>
        </motion.h1>
        <motion.div
          variants={reveal}
          className="mt-12 grid gap-8 border-t border-white/10 pt-6 md:grid-cols-[1fr_1.15fr] md:items-end"
        >
          <p className="max-w-sm text-sm leading-6 text-white/58">
            I turn ambitious ideas into fast, dependable products — pairing
            thoughtful interfaces with scalable systems and practical AI.
          </p>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <a
              href="#work"
              className="inline-flex items-center gap-3 rounded-full bg-[#ed7941] px-2 py-2 pr-5 text-xs font-bold text-white"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#18120f]">
                <ArrowDownRight size={16} />
              </span>
              Explore selected work
            </a>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-white/45">
              <span className="h-2 w-2 rounded-full bg-[#ee7940] shadow-[0_0_15px_#ee7940]" />
              Available for opportunities
            </span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute right-[12%] top-[35%] hidden h-20 w-20 rotate-12 rounded-[23px] border border-[#ec7841]/50 bg-[#ec7841]/10 shadow-[0_0_80px_rgba(236,120,65,.22)] md:block"
      />
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="pt-24 md:pt-36">
      <SectionHeader
        index="01"
        eyebrow="Selected work"
        title={
          <>
            Built with intent.
            <br />
            <span className="text-white/35">Shipped for people.</span>
          </>
        }
        copy="A selection of products spanning real-time communities, AI tools, developer education, and useful web utilities."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      variants={reveal}
      transition={{ duration: 0.55, delay: (index % 2) * 0.07 }}
      className={
        "group relative overflow-hidden rounded-[24px] border border-white/[.09] bg-[#181715] " +
        (index === 0 ? "md:col-span-2" : "")
      }
    >
      <div
        className={
          "relative overflow-hidden bg-[#0e0e0d] p-3 " +
          (index === 0 ? "h-[290px] md:h-[430px]" : "h-[260px] md:h-[300px]")
        }
      >
        <Image
          src={project.image}
          alt={project.title + " project preview"}
          fill
          className="object-contain p-3 transition duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0e0d]/75 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] backdrop-blur-md">
          0{index + 1}
        </span>
        {project.status && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#ee7940] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            {project.status}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-.05em]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/52">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold uppercase tracking-[.13em] text-white/38"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.12em] transition hover:border-[#ed7941] hover:bg-[#ed7941] md:self-auto"
          >
            View project <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-[.12em] text-white/35">
            In development
          </span>
        )}
      </div>
    </motion.article>
  );
}

function About() {
  const facts = [
    ["10+", "Projects built"],
    ["4", "Core domains"],
    ["24h", "Typical response"],
  ];
  return (
    <section
      id="about"
      className="grid gap-4 pt-24 md:grid-cols-[1.2fr_.8fr] md:pt-36"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={reveal}
        className="rounded-[24px] border border-white/[.09] bg-[#e9dfd2] p-7 text-[#191512] sm:p-10"
      >
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b55227]">
          About me
        </p>
        <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-[.95] tracking-[-.07em] md:text-6xl">
          Full-stack engineering, with a product mind.
        </h2>
        <p className="mt-8 max-w-xl text-sm leading-6 text-black/60">
          I work across frontend, backend, DevOps, and AI integrations. The
          focus stays the same: clean architecture, clear product thinking, and
          features people genuinely enjoy using.
        </p>
      </motion.div>
      <div className="grid grid-cols-3 gap-4">
        {facts.map(([number, label], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex min-h-[170px] flex-col justify-between rounded-[24px] border border-white/[.09] bg-[#181715] p-5"
          >
            <span className="text-3xl font-semibold tracking-[-.06em] text-[#ed7941]">
              {number}
            </span>
            <span className="text-[10px] font-bold uppercase leading-4 tracking-[.12em] text-white/45">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
function Capabilities() {
  const items = [
    [
      "01",
      "Full-stack Engineering",
      "Modern React and Next.js products supported by scalable APIs and thoughtful architecture.",
    ],
    [
      "02",
      "AI & Automation",
      "Practical LLM workflows, RAG systems, and product integrations that create real utility.",
    ],
    [
      "03",
      "Infrastructure & Ops",
      "Reliable releases, Dockerized workloads, CI/CD, and cloud-native systems built to last.",
    ],
  ];
  return (
    <section id="capabilities" className="pt-24 md:pt-36">
      <SectionHeader
        index="02"
        eyebrow="How I can help"
        title={
          <>
            End-to-end
            <br />
            <span className="font-serif font-normal italic text-[#eeae85]">
              product thinking.
            </span>
          </>
        }
        copy="From first interface to production release, I build the pieces that turn a good idea into a reliable product."
      />
      <div className="mt-10 border-t border-white/10">
        {items.map(([number, title, copy]) => (
          <motion.div
            key={number}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[70px_1fr_auto] sm:items-center"
          >
            <span className="text-xs font-bold text-[#ed7941]">{number}</span>
            <h3 className="text-2xl font-semibold tracking-[-.05em] sm:text-3xl">
              {title}
            </h3>
            <p className="max-w-sm text-sm leading-6 text-white/48">{copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="pt-24 md:pt-36">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[28px] bg-[#ed7941] p-7 text-white sm:p-12"
      >
        <Sparkles className="absolute right-8 top-8 opacity-50" />
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/65">
          Have an idea?
        </p>
        <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[.88] tracking-[-.08em] md:text-7xl">
          Let&apos;s make it useful.
        </h2>
        <p className="mt-7 max-w-md text-sm leading-6 text-white/75">
          Open to freelance, full-time, and product consulting work. Tell me
          what you&apos;re building.
        </p>
        <a
          href="mailto:gopaljha1677@gmail.com"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#171412] px-5 py-3 text-xs font-bold transition-transform hover:scale-105"
        >
          Start a conversation <ArrowUpRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}
function SectionHeader({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
}) {
  return (
    <div className="grid gap-7 md:grid-cols-[90px_1.15fr_.85fr] md:items-end">
      <div className="text-xs font-bold text-[#ed7941]">({index})</div>
      <div>
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-white/43">
          {eyebrow}
        </p>
        <h2 className="text-4xl font-semibold leading-[.9] tracking-[-.07em] md:text-6xl">
          {title}
        </h2>
      </div>
      <p className="max-w-sm text-sm leading-6 text-white/48">{copy}</p>
    </div>
  );
}
function Footer() {
  return (
    <footer className="flex flex-col gap-5 py-10 text-[10px] font-bold uppercase tracking-[.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} Gopal Jha</span>
      <div className="flex gap-5">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          <Github size={16} />
        </a>
        <a
          href="https://www.linkedin.com/in/gopal-jha-229a2b243/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          <Linkedin size={16} />
        </a>
        <a href="mailto:gopaljha1677@gmail.com" className="hover:text-white">
          <Mail size={16} />
        </a>
      </div>
    </footer>
  );
}
