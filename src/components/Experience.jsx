import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const experiences = [
  {
    company: "Acme Labs",
    role: "Senior Frontend Engineer",
    timeframe: "Jun 2022 — Present",
    location: "Bengaluru, India",
    bullets: [
      "Led a redesign of the core product, improving Lighthouse performance by 32%.",
      "Built a component library in TypeScript + React used across 6 teams.",
      "Introduced rigorous visual regression tests and accessibility audits.",
    ],
    tech: ["React", "TypeScript", "Tailwind", "Cypress"],
  },
  {
    company: "Nimbus Studio",
    role: "Frontend Engineer",
    timeframe: "Jan 2020 — May 2022",
    location: "Remote",
    bullets: [
      "Implemented progressive hydration and route-level code-splitting.",
      "Collaborated with designers to ship an adaptive design system.",
      "Owned analytics integration and performance monitoring.",
    ],
    tech: ["Next.js", "GraphQL", "Jest"],
  },
  {
    company: "Startify",
    role: "Software Engineer",
    timeframe: "Aug 2018 — Dec 2019",
    location: "Hyderabad, India",
    bullets: [
      "Built user-facing features and internal admin tools.",
      "Helped move monolith APIs to small, testable services.",
    ],
    tech: ["Node.js", "Postgres", "React"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-28 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      {/* Section header */}
      <div className="text-center mb-20">
        <h2
          className="text-4xl sm:text-5xl font-semibold tracking-tight 
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
          bg-clip-text text-transparent"
        >
          Experience
        </h2>

        <p className="mt-4 text-base text-text/70 max-w-2xl mx-auto">
          A timeline of roles, impact, and technologies shaping my career.
        </p>
      </div>

      <div className="relative">
        {/* vertical timeline line */}
        <div className="hidden md:block absolute left-7 top-0 bottom-0 w-px 
        bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)]/40 to-transparent" />

        <div className="space-y-14 md:pl-20">
          {experiences.map((exp, idx) => (
            <motion.article
              key={exp.company + idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative md:flex md:items-start md:gap-8"
            >
              {/* timeline dot */}
              <div className="absolute md:relative left-0 top-2 md:top-4">
                <div className="flex items-center">
                  <div className="hidden md:flex h-4 w-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] ring-4 ring-background border border-primary/30 shadow-md animate-pulse" />
                  <div className="md:hidden flex items-center gap-2 text-xs text-text/60">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{exp.timeframe}</span>
                  </div>
                </div>
              </div>

              {/* card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="w-full bg-background/60 backdrop-blur-xl border border-border/40 
                rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500"
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-text">
                      {exp.role}
                    </h3>
                    <div className="text-sm text-text/70 mt-0.5">
                      {exp.company} •{" "}
                      <span className="text-text/60">{exp.location}</span>
                    </div>
                  </div>

                  <time className="text-xs text-text/60 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {exp.timeframe}
                  </time>
                </header>

                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-text/80">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full 
                      bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 
                      text-primary border border-border/30 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
