"use client";

import React from "react";
import { motion as motionBase } from "framer-motion";
import { Sun, Moon } from "lucide-react";
const motion = motionBase as any;
interface NavbarProps { toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void; currentTheme: "dark" | "light"; }
const Navbar: React.FC<NavbarProps> = ({ toggleTheme, currentTheme }) => (
  <motion.nav initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-7">
    <div className="mx-auto flex max-w-[1160px] items-center justify-between rounded-full border border-white/10 bg-[#12100f]/85 px-5 py-3 backdrop-blur-xl md:px-7">
      <a href="#" className="font-heading text-sm font-bold tracking-[-0.06em] text-[#f7f2ec]">Gopal<span className="text-[#ef7840]">.</span></a>
      <div className="hidden items-center gap-6 md:flex"><NavLink href="#about">About</NavLink><NavLink href="#experience">Experience</NavLink><NavLink href="#products">Work</NavLink><NavLink href="#services">Services</NavLink></div>
      <div className="flex items-center gap-3"><button onClick={toggleTheme} className="text-white/65 transition-colors hover:text-white" aria-label="Toggle theme">{currentTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}</button><a href="#contact" className="rounded-full bg-[#f7f2ec] px-4 py-2 text-[10px] font-bold text-[#171413] transition-transform hover:scale-[1.03]">Let&apos;s talk</a></div>
    </div>
  </motion.nav>
);
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href} className="text-[10px] font-medium text-white/50 transition-colors hover:text-white">{children}</a>;
export default Navbar;
