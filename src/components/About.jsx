// ...existing code...
export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto"
    >
      <header className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight 
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
          bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="mt-4 text-sm text-text/70 max-w-2xl mx-auto">
          I design and build thoughtful web experiences — minimal, fast, and
          maintainable.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2 items-start">
        {/* Left: polished intro */}
        <article className="card p-8 md:p-10">
          <p className="text-base leading-relaxed text-text mb-4">
            Hi — I’m <span className="font-semibold text-primary">Surya Teja</span>.
            I build reliable web applications with a focus on clean UX and
            maintainable code. I enjoy turning product ideas into polished
            interfaces and small, well-tested systems that solve real problems.
          </p>

          <p className="text-base leading-relaxed text-text mb-6">
            My work spans front-end engineering, a bit of backend, and tools
            automation. I prefer pragmatic solutions: iterate fast, measure,
            and improve. Outside of work I play badminton, read, and write
            technical pieces on Medium.
          </p>

          <p className="text-sm text-text/70">
            Looking to collaborate or have a quick chat? <a href="#contact" className="text-primary font-medium hover:underline">Get in touch</a> — I reply quickly.
          </p>
        </article>

        {/* Right: quick facts + skills */}
        <aside className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-medium text-primary mb-3">Quick facts</h3>
            <ul className="text-sm text-text space-y-2">
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold">L</span>
                <span>Location: Bangalore, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold">S</span>
                <span>Primary: JavaScript · React · TypeScript</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold">B</span>
                <span>Also: Node.js, SQL, cloud deployments</span>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-medium text-primary mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Tailwind", "Node", "SQL"].map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-primary/6 to-secondary/6 border border-gray-100 text-primary font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-medium text-primary mb-3">Current focus</h3>
            <p className="text-sm text-text/70">
              Improving frontend performance, building accessible UI components,
              and writing about practical engineering patterns.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}