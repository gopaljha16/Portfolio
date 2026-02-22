
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Server, Layout, Ship } from 'lucide-react';

const motion = motionBase as any;

const steps = [
  {
    icon: <Server className="text-accent-primary" />,
    title: "Architect",
    label: "01",
    description: "Designing resilient systems with high-concurrency capabilities and distributed state management."
  },
  {
    icon: <Layout className="text-violet-500" />,
    title: "Develop",
    label: "02",
    description: "Polishing every pixel and optimizing every byte for a fluid, accessible, and high-conversion frontend."
  },
  {
    icon: <Ship className="text-emerald-500" />,
    title: "Deploy",
    label: "03",
    description: "Orchestrating production releases with fully automated pipelines and multi-region redundancy."
  }
];

const BuildProcess: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative max-w-6xl mx-auto">
      <div className="hidden md:block absolute top-[60px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent z-0" />
      
      {steps.map((step, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 flex flex-col items-center text-center space-y-6 group glass-card rounded-[1.75rem] p-7 md:p-8 border border-black/5 dark:border-white/10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent-primary/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center border-black/5 dark:border-white/10 dark:bg-white/[0.02] bg-white/50 group-hover:-translate-y-1 transition-all shadow-xl">
              {React.cloneElement(step.icon as React.ReactElement<any>, { size: 36, strokeWidth: 1.5 })}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-[10px] font-black text-accent-primary uppercase tracking-[0.4em]">{step.label}</div>
            <h4 className="text-2xl font-bold tracking-tight text-black dark:text-white">{step.title}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[280px] font-medium mx-auto">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BuildProcess;
