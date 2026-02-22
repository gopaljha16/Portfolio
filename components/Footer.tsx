import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
      <div className="flex items-center gap-4">
        <span className="font-heading font-black text-2xl tracking-tighter text-black dark:text-white">
          GJ<span className="text-accent-primary">.</span>
        </span>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">
          &copy; {new Date().getFullYear()} Gopal Jha
        </span>
      </div>

      <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
        <a
          href="#services"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          Services
        </a>
        <a
          href="#products"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
