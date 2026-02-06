
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';

const motion = motionBase as any;

interface ProductCardProps {
  title: string;
  tagline: string;
  image: string;
  color: string;
  link: string;
  tags?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ title, tagline, image, color, link, tags = [] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[500px] rounded-[3rem] overflow-hidden glass-card cursor-pointer border-black/5 dark:border-white/5 hover:shadow-2xl transition-all duration-500"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-30 transition-opacity duration-700`} />
      
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-60 dark:opacity-50 grayscale-[0.5] dark:grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#030303] dark:via-[#030303]/50 dark:to-transparent opacity-90" />

      <div className="absolute inset-x-0 bottom-0 p-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] dark:group-hover:text-white transition-colors">
              <Layers size={12} /> Case Study
            </div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-white">{title}</h3>
          </div>
          <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ExternalLink size={24} className="text-black dark:text-white" />
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium max-w-sm group-hover:text-black dark:group-hover:text-gray-200 transition-colors">{tagline}</p>
        
        <div className="pt-6 flex flex-wrap gap-3">
          {tags.map((tag, index) => (
             <span key={index} className="px-4 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/5 border border-black/5 dark:border-white/5 text-[9px] font-black uppercase tracking-widest text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-all">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
