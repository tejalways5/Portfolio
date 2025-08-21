import { motion } from "framer-motion";
import { Gamepad, Code, Database } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Flappy Sky: Angular Edition",
      desc: "Built a Flappy Bird-inspired game using Angular, featuring background music, backend to store and retrieve highest, extras like a resume button.",
      icon: Gamepad,
    },
    {
      title: "Project Two",
      desc: "Description for project two",
      icon: Code,
    },
    {
      title: "Project Three",
      desc: "Description for project three",
      icon: Database,
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-bg w-full">
      <h2 className="text-4xl sm:text-5xl text-center font-semibold tracking-tight 
               bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
               bg-clip-text text-transparent">Projects</h2>
      <div className="mx-auto mt-8 max-w-4xl">
        <p className="text-center text-sm text-text/70 mb-8">
          Selected work — minimal, intentional, and polished.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ translateY: -6 }}
                className="relative rounded-2xl p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transform hover:-translate-y-2 transition-all duration-200"
                aria-label={proj.title}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-none rounded-lg bg-primary/10 p-3 flex items-center justify-center">
                    <Icon className="text-primary w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">{proj.title} icon</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{proj.title}</h3>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{proj.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}