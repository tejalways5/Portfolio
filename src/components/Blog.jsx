"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MEDIUM_FEED = "https://medium.com/feed/@suryatejatumu";

// Helpers
function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function extractImageFromContent(content = "") {
  const m = content.match(/<img[^>]+src="([^">]+)"/i);
  return m ? m[1] : null;
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0); // 👈 new
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    async function fetchFeed() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(MEDIUM_FEED);
        const text = await res.text();
        const doc = new window.DOMParser().parseFromString(text, "text/xml");
        const items = Array.from(doc.querySelectorAll("item"))
          .slice(0, 12)
          .map((it) => {
            const title = it.querySelector("title")?.textContent || "";
            const link = it.querySelector("link")?.textContent || "";
            const pubDate = it.querySelector("pubDate")?.textContent || "";
            const content =
              it.querySelector("content\\:encoded")?.textContent ||
              it.querySelector("description")?.textContent ||
              "";
            const excerpt = stripHtml(content).slice(0, 420);
            const image = extractImageFromContent(content);
            return { title, link, pubDate, excerpt, image };
          });

        if (mountedRef.current) {
          setPosts(items);
          setLoading(false);
        }
      } catch (e) {
        try {
          const fallback = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            MEDIUM_FEED
          )}`;
          const res2 = await fetch(fallback);
          const json = await res2.json();
          const items = (json.items || [])
            .slice(0, 12)
            .map((it) => ({
              title: it.title,
              link: it.link,
              pubDate: it.pubDate,
              excerpt: (it.description || it.content || "")
                .replace(/<[^>]*>/g, "")
                .slice(0, 420),
              image: extractImageFromContent(it.content || it.description || ""),
            }));
          if (mountedRef.current) {
            setPosts(items);
            setLoading(false);
          }
        } catch (err2) {
          if (mountedRef.current) {
            setErr("Could not load Medium posts (CORS or network issue).");
            setLoading(false);
          }
        }
      }
    }

    fetchFeed();
    return () => (mountedRef.current = false);
  }, []);

  useEffect(() => {
    if (active >= posts.length) setActive(Math.max(0, posts.length - 1));
  }, [posts, active]);

  const prev = () => {
    setDirection(-1); // 👈 move backward
    setActive((s) => (s - 1 + posts.length) % posts.length);
  };

  const next = () => {
    setDirection(1); // 👈 move forward
    setActive((s) => (s + 1) % posts.length);
  };

  const swipeConfidenceThreshold = 100;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  // Variants for directional animation
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section id="posts" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-4xl sm:text-5xl font-semibold tracking-tight 
            bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] 
            bg-clip-text text-transparent"
          >
            Blog
          </h2>
          <p className="text-sm text-text/70 mt-1">
            Latest posts — swipe or use controls.
          </p>
        </div>

        {loading && (
          <div className="text-center text-sm text-text/60">Loading posts…</div>
        )}
        {err && <div className="text-center text-sm text-red-500">{err}</div>}

        {!loading && posts.length > 0 && (
          <>
            <div
              className="relative w-full max-w-5xl mx-auto overflow-hidden flex justify-center z-0"
              style={{ height: "500px" }}
            >
              {/* Prev / Next Buttons */}
              <button
                aria-label="Previous post"
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-100 shadow hover:scale-105 transition-transform"
              >
                <ChevronLeft className="w-6 h-6 text-text" />
              </button>

              <button
                aria-label="Next post"
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-100 shadow hover:scale-105 transition-transform"
              >
                <ChevronRight className="w-6 h-6 text-text" />
              </button>

              {/* Cards viewport */}
              <div className="relative w-full max-w-4xl mx-auto">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="wait"
                >
                  {posts.slice(active, active + 1).map((p) => (
                    <motion.article
                      key={p.link || active}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) next();
                        else if (swipe > swipeConfidenceThreshold) prev();
                      }}
                      className="absolute top-0 left-0 w-full card card--elevated rounded-xl overflow-hidden flex flex-col md:flex-row h-[500px] z-0"
                    >
                      {/* Image */}
                      <div className="w-full md:w-1/2 h-[500px] md:h-full relative">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-primary/6 to-primary/3 rounded-lg" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col w-full md:w-1/2">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4 line-clamp-2">
                          {p.title}
                        </h3>
                        <span className="text-slate-800 text-sm mb-4">
                          {new Date(p.pubDate).toLocaleDateString()}
                        </span>
                        <p className="text-sm mb-6 text-gray-500 line-clamp-6 overflow-hidden">
                          {p.excerpt}…
                        </p>
                        <div className="mt-auto flex justify-between items-center">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            Read more
                          </a>
                          <div className="text-xs text-text/60">Medium</div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Dots below */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-3">
                {posts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > active ? 1 : -1);
                      setActive(idx);
                    }}
                    aria-label={`Go to post ${idx + 1}`}
                    className={`focus-ring btn-hit transition-colors duration-150 rounded-full ${
                      idx === active
                        ? "dot dot--tiny dot--active"
                        : "dot dot--tiny dot--inactive"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {!loading && posts.length === 0 && !err && (
          <div className="text-center text-sm text-text/60">No posts found.</div>
        )}
      </div>
    </section>
  );
}