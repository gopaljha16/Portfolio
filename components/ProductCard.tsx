import React, { useState } from "react";
import { motion as motionBase } from "framer-motion";
import { ArrowUpRight, ImageOff } from "lucide-react";

const motion = motionBase as any;

interface ProductCardProps {
  title: string;
  tagline: string;
  image: string;
  color: string;
  link: string;
  tags?: string[];
  featured?: boolean;
  active?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  tagline,
  image,
  color,
  link,
  tags = [],
  featured = false,
  active = false,
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const isExternalLink = /^https?:\/\//.test(link);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-[2rem] border border-black/10 dark:border-white/10 bg-white/65 dark:bg-white/[0.02] backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/30 ${featured ? "md:col-span-2" : ""}`}
    >
      <div className="p-4 md:p-5 bg-gradient-to-b from-black/[0.04] to-transparent dark:from-white/[0.02] dark:to-transparent">
        <div className="relative h-[240px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#05070f]">
          {!hasImageError ? (
            <img
              src={image}
              alt={`${title} project preview`}
              loading="lazy"
              onError={() => setHasImageError(true)}
              className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col items-center justify-center gap-3 text-white/80">
              <ImageOff size={28} />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Preview unavailable
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 md:px-6 md:pb-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="text-2xl md:text-[1.9rem] font-bold tracking-tight text-black dark:text-white">
              {title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {tagline}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {active && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Active
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
          {link && link !== "#" && (
            <a
              href={link}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-xl bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              View Project
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
