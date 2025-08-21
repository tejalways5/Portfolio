import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef(null);
  const blockUntilRef = useRef(0);
  const BLOCK_MS = 100;

  const handleAboutClick = (e) => {
    e.preventDefault();
    blockUntilRef.current = Date.now() + BLOCK_MS;
    setVisible(false);
  };

  const onExitComplete = () => {
    const target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#about";
    }
  };

  const topVariant = {
    hidden: { y: -40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
    exit: { y: -40, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const bottomVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut", delay: 0.2 } },
    exit: { y: 30, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && Date.now() >= blockUntilRef.current) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6"
    >
      <AnimatePresence initial={true} onExitComplete={onExitComplete}>
        {visible && (
          <>
            {/* Heading */}
            <motion.h1
              key="hero-title"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={topVariant}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Hey, I’m{" "}
              <span className="tracking-tight 
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
          bg-clip-text text-transparent">
                Surya
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key="hero-desc"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={bottomVariant}
              className="text-lg md:text-xl text-text/70 max-w-xl leading-relaxed"
            >
              I craft minimalistic, clean, and fluid web experiences with React.
            </motion.p>

            {/* CTA Button */}
            <motion.a
              key="hero-cta"
              href="#about"
              onClick={handleAboutClick}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 inline-block px-7 py-3 rounded-2xl bg-primary text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              About
            </motion.a>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
