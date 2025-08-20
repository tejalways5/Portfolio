export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-primary text-center">
        About Me
      </h2>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* Left: short, focused intro */}
        <div className="text-base leading-relaxed text-text">
          <p className="mb-4">
            Hi — I’m <span className="font-semibold text-primary">Surya Teja</span>.
            I build reliable web applications with a focus on clean UX and
            maintainable code. I enjoy turning product ideas into polished
            interfaces and small, well-tested systems that solve real problems.
          </p>

          <p className="mb-4">
            My work spans front-end engineering, a bit of backend, and tools
            automation. I prefer pragmatic solutions: iterate fast, measure,
            and improve. Outside of work I play badminton, read, and write
            technical pieces on Medium.
          </p>

          <p className="text-sm text-text/70">
            Looking to collaborate or have a quick chat? Scroll to the Contact
            section or drop me an email.
          </p>
        </div>

        {/* Right: quick facts + skills */}
        <aside className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Quick facts</h3>
            <ul className="text-sm text-text space-y-1">
              <li>Location: Bangalore, India</li>
              <li>Primary: JavaScript / React / TypeScript</li>
              <li>Also: Node.js, SQL, cloud deployments</li>
              <li>Writes on Medium about engineering &amp; learning</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Tailwind", "Node", "SQL"].map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full bg-white/6 border border-white/8 text-text"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Current focus</h3>
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