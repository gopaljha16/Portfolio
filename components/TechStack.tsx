
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { 
  Database, 
  Cloud, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layout,
  Bot
} from 'lucide-react';

const motion = motionBase as any;

const skillCategories = [
  {
    name: "Frontend",
    icon: <Layout size={20} className="text-blue-500" />,
    skills: ["React 19", "Next.js 15", "Tailwind CSS", "TypeScript", "Framer Motion", "Zustand"]
  },
  {
    name: "Backend",
    icon: <Database size={20} className="text-emerald-500" />,
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Kafka", "Prisma"]
  },
  {
    name: "Cloud & DevOps",
    icon: <Cloud size={20} className="text-orange-500" />,
    skills: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Nginx", "Linux"]
  },
  {
    name: "Web3 & GenAI",
    icon: <Zap size={20} className="text-purple-500" />,
    skills: ["Solidity", "Ethers.js", "OpenAI", "LangChain", "Pinecone", "Web3.js"]
  }
];

const TechStack: React.FC = () => {
  return (
    <div className="space-y-24 py-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] font-black text-accent-primary uppercase tracking-[0.5em]"
        >
          Tech Stack
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white"
        >
          My Technical <span className="text-accent-primary">Arsenal</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 font-medium text-lg"
        >
          Re-engineered for scale. Built with modern paradigms.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[2.5rem] space-y-8 flex flex-col bg-white/5 dark:bg-white/[0.01] border-black/5 dark:border-white/5 hover:border-accent-primary/20 dark:hover:border-accent-primary/20 transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 border-b border-black/5 dark:border-white/5 pb-6">
              <div className="p-3 bg-black/[0.03] dark:bg-white/5 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                {cat.icon}
              </div>
              <h4 className="font-bold tracking-tight text-xl text-black dark:text-white">{cat.name}</h4>
            </div>
            
            <div className="flex flex-col gap-3">
              {cat.skills.map((skill, sIdx) => (
                <motion.div 
                  key={skill}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/[0.05] transition-all cursor-default shadow-sm group/skill"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/40 group-hover/skill:bg-accent-primary transition-colors" />
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee Performance Banner */}
      <div className="relative overflow-hidden py-10 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.005]">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-24 items-center"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-gray-600 flex items-center gap-3">
                <ShieldCheck size={16} className="text-emerald-500/60" /> Enterprise-Grade Security
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-gray-600 flex items-center gap-3">
                <Cpu size={16} className="text-accent-primary/60" /> Sub-100ms Latency
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-gray-600 flex items-center gap-3">
                <Cloud size={16} className="text-orange-500/60" /> Cloud Native Systems
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-gray-600 flex items-center gap-3">
                <Bot size={16} className="text-purple-500/60" /> AI-First Architecture
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;
