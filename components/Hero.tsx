"use client";

import React from "react";
import { motion as motionBase } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const motion = motionBase as any;

const Hero: React.FC = () => (
  <section className="hero-stage relative isolate overflow-hidden rounded-[1.5rem] border border-white/[0.07] px-5 pb-14 pt-28 sm:px-10 md:min-h-[680px] md:px-16 md:pb-24 md:pt-36">
    <div className="hero-grid absolute inset-0 -z-10 opacity-40" />
    <div className="hero-horizon absolute inset-x-0 bottom-0 -z-10 h-[42%]" />
    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
      <div className="hero-frame absolute inset-x-0 top-[-1.8rem] hidden h-[310px] md:block" />
      <span className="hero-pill absolute left-[4%] top-[7.8rem] hidden md:inline-flex">Engineering</span>
      <span className="hero-pill hero-pill-light absolute right-[5%] top-[2.8rem] hidden md:inline-flex">Product-minded</span>
      <span className="hero-pill hero-pill-warm absolute right-[10%] bottom-[2.8rem] hidden md:inline-flex">AI-ready</span>
      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-[#f27b42]">Gopal Jha / Full-stack engineer</p>
      <h1 className="relative text-[clamp(3.25rem,8vw,7rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#f7f2ec]">Building digital<br /><span className="hero-script">products</span> that last.</h1>
      <p className="mt-7 max-w-xl text-xs leading-6 text-white/55 md:text-sm">I turn ambitious ideas into fast, dependable web products — combining thoughtful interface work, scalable systems, and AI where it creates real value.</p>
      <a href="#products" className="hero-cta mt-8 inline-flex items-center gap-2 rounded-full py-2 pl-2 pr-5 text-xs font-semibold text-white"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0783d] text-white"><ArrowUpRight size={15} /></span>Explore my work</a>
    </motion.div>
    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-white/30 md:left-8"><Sparkles size={12} className="text-[#f0783d]" /> Available for select projects</div>
  </section>
);

export default Hero;
