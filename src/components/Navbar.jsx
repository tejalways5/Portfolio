"use client";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

// Smooth scroll helper
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: "smooth" }); // fallback if no section
};

export default function Navbar({ switchTheme, currentThemeName }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg border-b border-border/40"
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-40 h-16">
        {/* Left: Name (click → scroll top) + Theme */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
          >
            Surya Teja Tumu
          </div>

          <button
            onClick={switchTheme}
            title="Change Theme"
            aria-label={`Change theme (current: ${currentThemeName || "default"})`}
            className="p-2 rounded-full border border-border/50 
                       hover:scale-105 transition-transform duration-300"
          >
            <Sun className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Right: Nav links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {[
            { id: "about", label: "About" },
            { id: "experience", label: "Experience" },
            { id: "posts", label: "Blog" },
            { id: "projects", label: "Projects" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => scrollToSection(item.id)}
              className="relative text-text/80 hover:text-primary transition-colors"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}