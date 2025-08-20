import { Linkedin, Twitter, Instagram, Github, PenTool, Mail } from "lucide-react";

export default function Contact() {
  const socials = [
    { icon: <Linkedin />, url: "https://linkedin.com/in/surya-teja-tumu" },
    { icon: <Twitter />, url: "https://twitter.com/yourhandle" },
    { icon: <Instagram />, url: "https://instagram.com/yourhandle" },
    { icon: <PenTool />, url: "https://medium.com/@suryatejatumu" },
    { icon: <Github />, url: "https://github.com/tejalways5" },
    { icon: <Mail />, url: "mailto:suryatejatumu@gmail.com" },
  ];

  return (
    <section id="contact" className="py-20 px-8 max-w-3xl mx-auto text-center">
      <h3 className="text-3xl font-bold mb-6 text-primary">Get in Touch</h3>

      {/* Closing Lines */}
      <p className="text-text/80 max-w-2xl mx-auto leading-relaxed">
        Made it this far? You deserve a cookie 🍪 <br />
        Got an idea or opportunity you think I’d love, or just a friendly hello 👋?  
        Hit me up through my socials.
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-10">
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-primary transition transform hover:scale-110"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
