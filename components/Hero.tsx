import React from "react";
import { motion as motionBase } from "framer-motion";
import { ArrowUpRight, Orbit, Sparkles } from "lucide-react";

const motion = motionBase as any;

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center py-24 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-24 h-44 w-44 -translate-x-1/2 rounded-full bg-accent-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-36 w-36 rounded-full bg-accent-secondary/15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl mx-auto text-center space-y-10"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.35em] text-accent-primary bg-white/60 dark:bg-white/5">
          <Orbit size={13} />
          Internet Product Engineer
        </div>

        <div className="space-y-6">
          <h1 className="text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] font-black tracking-[-0.04em] text-black dark:text-white">
            Gopal Jha
          </h1>

          <h2 className="text-[clamp(1.5rem,3.6vw,3.25rem)] font-bold tracking-tight text-gray-900 dark:text-white">
            Building{" "}
            <span className="text-accent-primary underline decoration-accent-primary/30 underline-offset-8">
              scalable products
            </span>{" "}
            for real users
          </h2>

          <p className="max-w-3xl mx-auto text-base md:text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Full-stack engineer focused on Web3, DevOps, and GenAI systems.
            Fast architecture, clean UI, and production-grade delivery.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black text-[11px] uppercase tracking-[0.18em] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Projects
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-black/15 dark:border-white/20 text-black dark:text-white font-black text-[11px] uppercase tracking-[0.18em] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Hire Me
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-300">
            <Sparkles size={12} className="text-accent-primary" />
            Web3
          </span>
          <span className="rounded-full border border-black/10 dark:border-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-300">
            DevOps
          </span>
          <span className="rounded-full border border-black/10 dark:border-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-300">
            GenAI
          </span>
          <span className="rounded-full border border-black/10 dark:border-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-300">
            Full-stack
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
