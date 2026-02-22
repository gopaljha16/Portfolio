import React, { useEffect, useState } from "react";
import { motion as motionBase, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
  MessageSquare,
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Code2,
  Globe,
  Cloud,
  Bot,
  Layers,
  Sparkles,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import ProductCard from "./components/ProductCard";
import TechStack from "./components/TechStack";
import BuildProcess from "./components/BuildProcess";
import Footer from "./components/Footer";
import CodexaImage from "./images/Codexa.png";
import ElevareImage from "./images/Elevare.png";
import LynkrImage from "./images/Lyknr.png";

const motion = motionBase as any;

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <div
      className={`relative min-h-screen selection:bg-accent-primary/30 overflow-x-hidden ${theme}`}
    >
      <div className="mesh-gradient" />

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#030303] flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [0.95, 1, 0.95], opacity: [0.5, 1, 0.5] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="text-black dark:text-white font-heading text-4xl font-black tracking-tighter"
            >
              GJ<span className="text-accent-primary">.</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 md:pt-28 space-y-28 md:space-y-36">
        <Hero />

        <section id="about" className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-8 items-stretch">
            <div className="glass-card rounded-[2rem] p-7 md:p-10 border border-black/5 dark:border-white/10 space-y-5">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-primary">
                About Me
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.05]">
                Full-stack engineer building fast, scalable, and user-first products.
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
                I work across frontend, backend, DevOps, and AI integrations. I focus on clean architecture,
                strong product thinking, and shipping features that users actually love.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.14em] border border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-200">
                  Product Engineering
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.14em] border border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-200">
                  System Design
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.14em] border border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-200">
                  AI + Web3
                </span>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-7 md:p-8 border border-black/5 dark:border-white/10 space-y-4">
              <h3 className="text-lg font-bold tracking-tight text-black dark:text-white">Quick Snapshot</h3>
              <div className="grid grid-cols-1 gap-3">
                <SnapshotItem icon={<BadgeCheck size={16} />} label="Projects Built" value="10+" />
                <SnapshotItem icon={<BriefcaseBusiness size={16} />} label="Domains" value="EdTech, AI, SaaS, Web3" />
                <SnapshotItem icon={<Clock3 size={16} />} label="Typical Response" value="Within 24 hours" />
                <SnapshotItem icon={<MapPin size={16} />} label="Location" value="India (Remote Worldwide)" />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="space-y-12 md:space-y-16 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 dark:border-white/5 pb-12">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-accent-primary font-black text-[10px] uppercase tracking-[0.3em]"
              >
                <Layers size={14} /> Domain
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white"
              >
                Core <span className="text-accent-primary">Capabilities</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 dark:text-gray-400 max-w-sm font-medium leading-relaxed"
            >
              Solving complex architectural challenges with modern engineering
              paradigms.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
            <FeatureCard
              icon={<Code2 className="w-6 h-6" />}
              title="Full-Stack Engineering"
              description="High-throughput systems using MERN and Next.js with sub-second response times."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Web3 Architectures"
              description="Secure dApps and smart contracts on Ethereum, Solana, and Polygon."
            />
            <FeatureCard
              icon={<Cloud className="w-6 h-6" />}
              title="Infrastructure & Ops"
              description="Automated CI/CD pipelines, Dockerized workloads, and distributed messaging systems."
            />
            <FeatureCard
              icon={<Bot className="w-6 h-6" />}
              title="GenAI Solutions"
              description="Custom LLM workflows, RAG systems, and AI-driven process automation."
            />
          </div>
        </section>

        <section id="products" className="space-y-10 md:space-y-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2 text-accent-secondary font-black text-[10px] uppercase tracking-[0.3em] justify-center md:justify-start"
            >
              <Sparkles size={14} /> Projects
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-bold tracking-tighter text-black dark:text-white text-center md:text-left"
            >
              My <span className="italic font-light">Projects</span>
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-center md:text-left">
              Selected products designed for scale, speed, and a strong user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ProductCard
              title="Quibly"
              tagline="Real-time communication platform for communities, similar to Discord."
              image="https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1400"
              color="from-cyan-600/30 to-blue-600/30"
              link="#contact"
              tags={["Realtime", "Chat", "Voice", "WebSocket"]}
              featured
            />
            <ProductCard
              title="Codexa"
              tagline="Coding and DSA learning platform with contests, interview prep, and interactive problem-solving."
              image={CodexaImage}
              color="from-indigo-600/20 to-violet-600/20"
              link="#contact"
              tags={["Coding", "DSA", "Contests"]}
            />
            <ProductCard
              title="Elevare"
              tagline="AI resume builder that helps create ATS-friendly resumes and professional portfolios."
              image={ElevareImage}
              color="from-purple-600/20 to-pink-600/20"
              link="#contact"
              tags={["AI", "Resume", "Portfolio"]}
            />
            <ProductCard
              title="Lynktr"
              tagline="Linktree-style profile with custom slug, built-in URL shortener, and QR code generation."
              image={LynkrImage}
              color="from-emerald-600/20 to-teal-600/20"
              link="#contact"
              tags={["Links", "Shortener", "QR"]}
            />
            <ProductCard
              title="Wallet Web"
              tagline="Next-gen institutional crypto dashboard."
              image="https://images.unsplash.com/photo-1621416848440-d369283f2f03?auto=format&fit=crop&q=80&w=1200"
              color="from-amber-600/20 to-orange-600/20"
              link="#contact"
              tags={["Crypto", "Dashboard", "Fintech"]}
            />
          </div>
        </section>

        <section
          id="stack"
          className="py-20 md:py-24 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.005] rounded-[2rem]"
        >
          <TechStack />
        </section>

        <section className="space-y-16 md:space-y-24 py-6 md:py-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
              The Engineering <span className="text-accent-primary">DNA</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium">
              A systematic approach to building resilient, beautiful software.
            </p>
          </div>
          <BuildProcess />
        </section>

        <section id="experience" className="space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-primary">
              Professional Experience
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
              Experience
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Professional work summary in a standard resume-style format.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:gap-6 max-w-5xl mx-auto">
            <ExperienceCard
              role="Freelance Full-Stack Developer"
              company="Self-Employed"
              employmentType="Freelance"
              duration="Aug 2025 - Present"
              location="Remote"
              highlights={[
                "Delivered end-to-end web products from planning to live deployment for client and personal builds.",
                "Shipped an e-commerce platform with product catalog, checkout flow, admin panel, and production hosting.",
                "Built ad-tech and SaaS solutions with responsive frontend, scalable backend APIs, and deployment pipelines.",
                "Handled maintenance, feature iteration, and performance improvements after launch.",
              ]}
            />
          </div>
        </section>

        <section className="relative group">
          <div className="absolute inset-0 bg-accent-primary/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden border-black/5 dark:border-white/5">
            <div className="max-w-4xl space-y-12 relative z-10">
              <h2 className="text-[10px] font-black text-accent-primary uppercase tracking-[0.5em]">
                Vision
              </h2>
              <p className="text-2xl md:text-5xl font-bold leading-[1.1] text-black dark:text-white">
                I engineer{" "}
                <span className="text-gray-400">scalable digital products</span>{" "}
                that bridge complex logic with human experience. Focused on{" "}
                <span className="underline decoration-accent-primary/50 underline-offset-8">
                  systems
                </span>{" "}
                and{" "}
                <span className="underline decoration-accent-primary/50 underline-offset-8">
                  speed
                </span>
                .
              </p>
              <div className="flex gap-4 items-center pt-6">
                <div className="w-12 h-px bg-black/10 dark:bg-white/10" />
                <span className="text-gray-500 uppercase tracking-widest text-[10px] font-black">
                  Building for impact
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] backdrop-blur-xl"
          >
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-accent-primary/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-accent-secondary/20 blur-3xl rounded-full" />

            <div className="relative z-10 p-8 md:p-14 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 items-center">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-primary">
                  Ready to collaborate
                </p>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white leading-[1]">
                  Let&apos;s build your next
                  <span className="text-accent-primary italic"> product</span>.
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Open to freelance, full-time, and product consulting work.
                  Tell me your idea, timeline, and goals.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:gopaljha1677@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-black uppercase tracking-[0.16em] hover:opacity-90 transition-opacity"
                  >
                    <MessageSquare size={16} />
                    Start a Conversation
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gopal-jha-229a2b243/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-black/15 dark:border-white/20 text-[11px] font-black uppercase tracking-[0.16em] text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Connect on LinkedIn
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/25 p-6 md:p-7">
                <p className="text-xs uppercase tracking-[0.25em] font-black text-gray-500 dark:text-gray-400">
                  Quick links
                </p>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  <SocialButton
                    icon={<Github size={18} />}
                    label="GitHub"
                    href="https://github.com/gopaljha16"
                  />
                  <SocialButton
                    icon={<Linkedin size={18} />}
                    label="LinkedIn"
                    href="https://www.linkedin.com/in/gopal-jha-229a2b243/"
                  />
                  <SocialButton
                    icon={<Twitter size={18} />}
                    label="X"
                    href="https://x.com/Gopaljha04"
                  />
                  <SocialButton
                    icon={<Mail size={18} />}
                    label="Email"
                    href="mailto:gopaljha1677@gmail.com"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const SocialButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  href: string;
}> = ({ icon, label, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    className="glass px-4 py-3 rounded-xl flex items-center justify-between gap-3 font-bold uppercase tracking-widest text-[10px] transition-all border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 dark:text-white"
  >
    <span className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </span>
    <ArrowUpRight size={14} />
  </motion.a>
);

const SnapshotItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-4 py-3.5 flex items-start gap-3">
    <span className="text-accent-primary pt-0.5">{icon}</span>
    <span className="space-y-1">
      <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="block text-sm font-bold text-black dark:text-white">
        {value}
      </span>
    </span>
  </div>
);

const ExperienceCard: React.FC<{
  role: string;
  company: string;
  employmentType: string;
  duration: string;
  location: string;
  highlights: string[];
}> = ({ role, company, employmentType, duration, location, highlights }) => (
  <div className="glass-card rounded-[1.5rem] p-6 md:p-8 border border-black/5 dark:border-white/10 space-y-5">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div className="space-y-1">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white">{role}</h3>
        <p className="text-base font-semibold text-gray-700 dark:text-gray-200">{company}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.14em] border border-black/10 dark:border-white/15 text-gray-600 dark:text-gray-300">
          {employmentType}
        </span>
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.14em] border border-black/10 dark:border-white/15 text-gray-600 dark:text-gray-300">
          {duration}
        </span>
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.14em] border border-black/10 dark:border-white/15 text-gray-600 dark:text-gray-300">
          {location}
        </span>
      </div>
    </div>

    <ul className="space-y-2.5">
      {highlights.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default App;
