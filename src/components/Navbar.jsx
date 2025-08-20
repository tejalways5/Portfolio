"use client";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

// Smooth scroll helper (optional)
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Navbar({ switchTheme, currentThemeName }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white z-50"
    >
      <div className="flex items-center justify-between px-8 md:px-10 lg:px-48 h-16">
        {/* Left: Name + Theme */}
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold text-primary">
            Surya Teja Tumu
          </div>

          <button
            onClick={switchTheme}
            title="Change Theme"
            aria-label={`Change theme (current: ${currentThemeName || "default"})`}
            className="p-2 rounded-full bg-white hover:bg-gray-200 transition-colors"
          >
            <Sun className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Right: Nav links */}
        <div className="hidden md:flex gap-10 text-sm text-gray-600">
          <a
            href="#about"
            onClick={() => scrollToSection("about")}
            className="hover:text-primary text-slate-800 transition-colors"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={() => scrollToSection("experience")}
            className="hover:text-primary text-slate-800 transition-colors"
          >
            Experience
          </a>
          <a
            href="#posts"
            onClick={() => scrollToSection("posts")}
            className="hover:text-primary text-slate-800 transition-colors"
          >
            Blog
          </a>
          <a
            href="#projects"
            onClick={() => scrollToSection("projects")}
            className="hover:text-primary text-slate-800 transition-colors"
          >
            Projects
          </a>
        </div>
      </div>
    </motion.nav>
  );
}