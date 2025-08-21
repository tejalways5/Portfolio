// ...existing code...
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blog from "./components/BLog";
import Experience from "./components/Experience";

const themes = [
  { 
    name: "Blue", 
    colors: { 
      "--color-primary": "#2563eb",   // stronger blue
      "--color-bg": "#f0f9ff"
      // removed --color-text so we can force black globally
    } 
  },
  { 
    name: "Emerald", 
    colors: { 
      "--color-primary": "#10b981", 
      "--color-bg": "#ecfdf5"
    } 
  },
  { 
    name: "Lavender", 
    colors: { 
      "--color-primary": "#a78bfa", 
      "--color-bg": "#f5f3ff"
    } 
  },
  { 
    name: "Sunset", 
    colors: { 
      "--color-primary": "#f97316", 
      "--color-bg": "#fff7ed"
    } 
  },
  { 
    name: "Rose", 
    colors: { 
      "--color-primary": "#e11d48", 
      "--color-bg": "#fff1f2"
    } 
  },
];

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);

  // ✅ Apply theme on mount / change but force body text to black
  useEffect(() => {
    const theme = themes[themeIndex];
    for (const key in theme.colors) {
      document.documentElement.style.setProperty(key, theme.colors[key]);
    }

    // Force all regular text to black while keeping headings' color (they use --color-primary)
    document.documentElement.style.setProperty("--color-text", "#000000");
  }, [themeIndex]);

  const switchTheme = () => {
    const next = (themeIndex + 1) % themes.length;
    setThemeIndex(next);
  };

  return (
    <div className="bg-bg text-text min-h-screen font-sans transition-colors duration-500">
      <Navbar
        switchTheme={switchTheme}
        currentThemeName={themes[themeIndex].name}
      />
      <Hero />
      <About />
      <Experience />
      <Blog />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
// ...existing code...