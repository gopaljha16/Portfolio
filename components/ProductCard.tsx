
import React, { useRef } from 'react';
import { motion as motionBase, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className="group relative w-full aspect-[16/10] rounded-[2rem] overflow-hidden bg-black/5 dark:bg-white/5 cursor-pointer border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors"
    >
      {/* Dynamic Highlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Main Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
      </div>

      {/* Content Overlay - Minimal Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 z-20 pt-32 pb-8 px-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-3 max-w-[70%]">
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold tracking-tight text-white">{title}</h3>
              <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${color}`} />
            </div>

            {/* Description - Hides/Shows based on hover preference or keeps it nice and subtle */}
            <p className="text-gray-300 text-sm font-medium leading-relaxed line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
              {tagline}
            </p>

            {/* Tags - Slide up reveal */}
            <div className="flex flex-wrap gap-2 pt-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Icon */}
          <div className="flex-shrink-0 mb-1">
             <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowUpRight size={20} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </div>
          </div>
        </div>
      </div>

      {/* Top right detailed badge (optional, for 'Project' context) */}
      <div className="absolute top-6 right-6 z-20 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/90">
        Project
      </div>

    </motion.div>
  );
};

export default ProductCard;
