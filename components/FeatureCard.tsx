import React from "react";
import { motion as motionBase } from "framer-motion";

const motion = motionBase as any;

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  image,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card p-7 md:p-8 rounded-[1.75rem] space-y-5 group cursor-default flex flex-col h-full bg-white/[0.02] hover:bg-white/[0.04] dark:bg-white/[0.02] dark:hover:bg-white/[0.04] border-black/5 dark:border-white/5"
    >
      {image && (
        <div className="w-full h-48 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="w-12 h-12 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-center transition-all group-hover:bg-accent-primary/10 group-hover:border-accent-primary/20 group-hover:scale-105 shadow-inner text-accent-primary">
        {icon}
      </div>
      <div className="space-y-4">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white group-hover:text-accent-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium transition-colors">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-auto flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-600">
          Enterprise Standard
        </span>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
