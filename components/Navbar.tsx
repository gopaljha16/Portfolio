
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const motion = motionBase as any;

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, currentTheme }) => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-50 px-6"
    >
      <div className="container mx-auto">
        <div className="glass max-w-fit mx-auto px-6 py-2.5 rounded-full flex items-center gap-8 shadow-xl border-black/5 dark:border-white/5 dark:bg-white/[0.02] bg-white/70 backdrop-blur-xl">
          <a href="#" className="font-heading font-black text-xl tracking-tighter text-black dark:text-white">GJ<span className="text-accent-primary">.</span></a>
          
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#services">Capabilities</NavLink>
            <NavLink href="#products">Lab</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white"
            >
              {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href="#contact"
              className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 hover:text-black dark:hover:text-white transition-colors"
  >
    {children}
  </a>
);

export default Navbar;
