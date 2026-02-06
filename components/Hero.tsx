
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowUpRight, Orbit } from 'lucide-react';

const motion = motionBase as any;

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-10 max-w-5xl relative"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-accent-primary/10 blur-[80px] -z-10" />
        
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border-black/5 dark:border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-accent-primary mb-2 animate-float bg-white/50 dark:bg-white/5">
          <Orbit size={14} className="animate-pulse" />
          Internet Product Engineer
        </div>
        
        <h1 className="text-[14vw] md:text-[11rem] font-black tracking-tighter leading-[0.8] text-black dark:text-white select-none">
          Gopal <span className="text-gray-200 dark:text-gray-800 transition-colors">Jha</span>
        </h1>
        
        <div className="space-y-6 max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-800 dark:text-white/90 transition-colors">
            Engineering <span className="text-accent-primary underline decoration-accent-primary/20">Scalable Systems</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Specializing in Web3, DevOps, and Full-Stack GenAI systems.
            Architecture that scales. UI that connects. Code that performs.
          </p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-5 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="#products" 
            className="group px-10 py-5 bg-black dark:bg-white text-white dark:text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl flex items-center gap-3 transition-all hover:scale-[1.03] active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/5"
          >
            My Products
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          
          <a 
            href="#contact" 
            className="px-10 py-5 glass text-black dark:text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all hover:bg-black/5 dark:hover:bg-white/5 border-black/10 dark:border-white/10 active:scale-95"
          >
            Hire Me
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-accent-primary/80 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
