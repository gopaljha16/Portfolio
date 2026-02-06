import React, { useEffect, useState } from "react";
import { motion as motionBase, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Globe,
  Zap,
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
import LyknrImage from "./images/Lyknr.png";

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

      <main className="container mx-auto px-6 lg:px-20 pt-12 space-y-40">
        <Hero />

        {/* Services Section */}
        <section id="services" className="space-y-16 relative">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Code2 className="w-6 h-6" />}
              title="Full-Stack Engineering"
              description="High-throughput systems using MERN & Next.js with sub-second response times."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Web3 Architectures"
              description="Secure dApps and smart contracts on Ethereum, Solana, and Polygon networks."
            />
            <FeatureCard
              icon={<Cloud className="w-6 h-6" />}
              title="Infrastructure & Ops"
              description="Automated CI/CD pipelines, Dockerized scaling, and distributed messaging systems."
            />
            <FeatureCard
              icon={<Bot className="w-6 h-6" />}
              title="GenAI Solutions"
              description="Custom LLM workflows, RAG systems, and AI-driven business process automation."
            />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="space-y-16">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2 text-accent-secondary font-black text-[10px] uppercase tracking-[0.3em]"
            >
              <Sparkles size={14} /> Production Lab
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-black dark:text-white"
            >
              Real World <span className="italic font-light">Products</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ProductCard
              title="Codexa"
              tagline="Collaborative IDE for high-growth teams."
              image={CodexaImage}
              color="from-indigo-600/20 to-violet-600/20"
              link="#"
              tags={["IDE", "React", "Collaboration"]}
            />
            <ProductCard
              title="Elevare"
              tagline="AI-native recruitment OS."
              image={ElevareImage}
              color="from-purple-600/20 to-pink-600/20"
              link="#"
              tags={["AI", "Recruitment", "Automation"]}
            />
            <ProductCard
              title="Lynkr"
              tagline="Decentralized identity for the creator economy."
              image={LyknrImage}
              color="from-emerald-600/20 to-teal-600/20"
              link="#"
              tags={["Web3", "Identity", "Blockchain"]}
            />
            <ProductCard
              title="Wallet Web"
              tagline="Next-gen institutional crypto dashboard."
              image="https://images.unsplash.com/photo-1621416848440-d369283f2f03?auto=format&fit=crop&q=80&w=1200"
              color="from-amber-600/20 to-orange-600/20"
              link="#"
              tags={["Crypto", "Dashboard", "Fintech"]}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="stack"
          className="py-24 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.005]"
        >
          <TechStack />
        </section>

        {/* Process Section */}
        <section className="space-y-24 py-12">
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

        {/* Philosophy Section */}
        <section className="relative group">
          <div className="absolute inset-0 bg-accent-primary/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="glass-card rounded-[3rem] p-12 md:p-24 relative overflow-hidden border-black/5 dark:border-white/5">
            <div className="max-w-4xl space-y-12 relative z-10">
              <h2 className="text-[10px] font-black text-accent-primary uppercase tracking-[0.5em]">
                Vision
              </h2>
              <p className="text-3xl md:text-5xl font-bold leading-[1.1] text-black dark:text-white">
                I engineer{" "}
                <span className="text-gray-400">scalable digital assets</span>{" "}
                that bridge the gap between complex logic and human emotion.
                Focused on{" "}
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
                  Building for the 1%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 text-center space-y-16">
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] text-black dark:text-white"
            >
              Let’s <span className="text-accent-primary italic">launch</span>{" "}
              <br />
              something new.
            </motion.h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <SocialButton
              icon={<Github size={20} />}
              label="GitHub"
              href="https://github.com"
            />
            <SocialButton
              icon={<Linkedin size={20} />}
              label="LinkedIn"
              href="https://linkedin.com"
            />
            <SocialButton
              icon={<Mail size={20} />}
              label="Email"
              href="mailto:gopal@example.com"
            />
          </div>
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
    whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.05)" }}
    className="glass px-8 py-5 rounded-2xl flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] transition-all border-black/5 dark:border-white/5 dark:hover:bg-white/5 shadow-lg dark:text-white"
  >
    {icon}
    <span>{label}</span>
  </motion.a>
);

export default App;
