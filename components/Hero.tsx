"use client";

import React from "react";
import { motion as motionBase } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Users, LineChart } from "lucide-react";

const motion = motionBase as any;

const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-between pb-16 md:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4f46e5]/10 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-[#818cf8]/15 blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 z-10"
        >
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-[clamp(3rem,5vw,4.5rem)] leading-[1.05] font-black tracking-tight text-black dark:text-white">
              Building scalable <br />
              products for <br />
              <span className="text-[#6366f1]">real users.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="max-w-lg text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
            Full-stack engineer focused on Web3, DevOps, and GenAI systems.
            <br />I build fast, reliable, and user-first products with clean
            architecture and modern design.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              Explore Projects
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-black/15 dark:border-white/10 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 font-bold text-sm transition-colors"
            >
              Hire Me
            </a>
          </div>

          {/* Tech Stack */}
          <div className="pt-8 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Tech I Work With
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-black dark:bg-white dark:text-black text-white flex items-center justify-center text-[10px] font-bold">
                  N
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Next.js
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#3178C6] flex items-center justify-center text-white text-[8px] font-bold">
                  TS
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  TypeScript
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#339933] flex items-center justify-center text-white text-[8px] font-bold">
                  JS
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Node.js
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[#336791] font-bold text-lg leading-none">
                  🐘
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  PostgreSQL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#FF9900]">AWS</span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  AWS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#2496ED] flex items-center justify-center text-white text-[8px] font-bold">
                  🐳
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Docker
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-black dark:bg-white dark:text-black text-white flex items-center justify-center text-[8px] font-bold">
                  Git
                </div>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  GitHub
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-full h-[500px] hidden lg:block ml-0 lg:ml-4 lg:-translate-y-4"
        >
          {/* Concentric Circles Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/5"></div>
            <div className="absolute w-[450px] h-[450px] rounded-full border border-white/5"></div>
            <div className="absolute w-[600px] h-[600px] rounded-full border border-white/[0.03]"></div>
            {/* Glowing Dots */}
            <div className="absolute top-[10%] left-[60%] w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#818cf8]"></div>
            <div className="absolute top-[45%] right-[10%] w-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_8px_#818cf8]"></div>
            <div className="absolute bottom-[10%] left-[30%] w-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_8px_#818cf8]"></div>
            <div className="absolute bottom-[40%] left-[5%] w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]"></div>
          </div>

          {/* Main Mockup Window */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-[#0c0d12] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div className="h-10 flex items-center px-5 gap-2 border-b border-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
            </div>
            {/* Code Lines */}
            <div className="px-6 py-6 flex flex-col gap-4">
              {[
                { w: "65%", c: "bg-[#282a47]" },
                { w: "45%", c: "bg-white/[0.04]" },
                { w: "75%", c: "bg-indigo-600/40" },
                { w: "55%", c: "bg-[#282a47]" },
                { w: "35%", c: "bg-white/[0.04]" },
                { w: "20%", c: "bg-indigo-600/30" },
                { w: "60%", c: "bg-[#282a47]" },
                { w: "80%", c: "bg-white/[0.04]" },
              ].map((line, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <span className="text-white/10 text-xs w-4">{i + 1}</span>
                  <div
                    className={`h-[6px] rounded-full ${line.c}`}
                    style={{ width: line.w }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Card: Performance */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-2 bg-[#12131c] border border-white/5 rounded-xl p-5 w-64 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20"
          >
            <div className="flex gap-3 items-center mb-4">
              <div className="bg-[#1e1b4b] p-2 rounded-lg">
                <LineChart className="text-indigo-400" size={16} />
              </div>
              <span className="text-white text-[14px] font-semibold tracking-wide">
                Performance
              </span>
            </div>
            <div className="h-12 w-full flex items-end px-1 relative overflow-hidden">
              <svg
                className="w-full h-full drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                preserveAspectRatio="none"
                viewBox="0 0 100 30"
              >
                <path
                  d="M0 22 C 15 25, 25 25, 35 20 C 45 15, 55 10, 70 15 C 85 20, 95 10, 100 5"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-[#34d399] text-[12px] font-bold text-right mt-2 tracking-wider">
              ↑ 98.6%
            </div>
          </motion.div>

          {/* Floating Card: Reliability */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 -left-12 -translate-y-1/2 bg-[#12131c] border border-white/5 rounded-xl p-5 w-64 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20"
          >
            <div className="flex gap-4 items-center">
              <div className="bg-[#1e1b4b] p-2 rounded-lg">
                <ShieldCheck className="text-indigo-400" size={16} />
              </div>
              <div>
                <div className="text-white text-[14px] font-semibold tracking-wide">
                  Reliability
                </div>
                <div className="text-gray-400 text-[11px]">
                  Production Ready
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 w-[99%] h-full rounded-full"></div>
              </div>
              <span className="text-[#34d399] text-[12px] font-bold">
                99.99%
              </span>
            </div>
          </motion.div>

          {/* Floating Card: Users */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-8 right-4 bg-[#12131c] border border-white/5 rounded-xl p-5 w-56 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20"
          >
            <div className="flex gap-4 items-center mb-2">
              <div className="bg-[#1e1b4b] p-2 rounded-lg">
                <Users className="text-indigo-400" size={16} />
              </div>
              <div>
                <div className="text-white text-[14px] font-semibold tracking-wide">
                  Users
                </div>
                <div className="text-gray-400 text-[11px]">
                  Built for Real Impact
                </div>
              </div>
            </div>
            <div className="text-[#6366f1] text-2xl font-bold text-right tracking-tight">
              10K+
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
