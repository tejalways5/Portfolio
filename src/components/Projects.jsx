// ...existing code...
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
      <h2 className="text-3xl font-semibold text-center text-primary">Projects</h2>
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
                className="relative rounded-2xl p-5 bg-white/6 backdrop-blur-sm border border-white/8 hover:shadow-lg transition-transform duration-300 ease-out"
                aria-label={proj.title}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-none rounded-lg bg-white/8 p-2">
                    <Icon className="text-primary w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">{proj.title} icon</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary">{proj.title}</h3>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-transparent rounded-full mt-1" />
                  </div>
                </div>

                <p className="text-sm text-text/70 leading-relaxed">{proj.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}