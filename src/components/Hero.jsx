import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-4 text-text"
      >
        Hey, I'm <span className="text-primary">Surya</span>
      </motion.h1>

      <motion.p 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 1 }}
        className="text-lg text-text/70 max-w-lg"
      >
        I build minimalistic, clean, and fluid web experiences with React.
      </motion.p>

      <motion.a
        href="#about"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 inline-block bg-primary text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition"
      >
       About
      </motion.a>
    </section>
  );
}
