import { Linkedin, Twitter, Instagram, Github, PenTool, Mail } from "lucide-react";

export default function Contact() {
  const socials = [
    { icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com/in/surya-teja-tumu" },
    { icon: <Twitter className="w-6 h-6" />, url: "https://twitter.com/yourhandle" },
    { icon: <Instagram className="w-6 h-6" />, url: "https://instagram.com/___surya_teja___" },
    { icon: <PenTool className="w-6 h-6" />, url: "https://medium.com/@suryatejatumu" },
    { icon: <Github className="w-6 h-6" />, url: "https://github.com/tejalways5" },
    { icon: <Mail className="w-6 h-6" />, url: "mailto:suryatejatumu@gmail.com" },
  ];

  return (
    <section id="contact" className="relative py-24 px-8">
      {/* Soft gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10 blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight 
          bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
          bg-clip-text text-transparent">
          Get in Touch
        </h2>

        {/* Sub text */}
        <p className="text-text/80 max-w-2xl mx-auto leading-relaxed mt-6">
          Made it this far? You deserve a cookie 🍪 <br />
          Got an idea or just wanna say hi?  
          Drop me a message or connect on social media.
        </p>

        {/* Socials */}
        <div className="flex justify-center gap-8 mt-10">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full 
                bg-white/5 backdrop-blur-md shadow-sm 
                hover:scale-110 hover:text-[var(--color-primary)] hover:shadow-[0_0_15px_var(--color-primary)] 
                transition-all duration-300"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
