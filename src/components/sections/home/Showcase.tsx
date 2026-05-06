import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

// Import real assets
import imgBeats from "@/assets/images/portfolio/beats-from-above.png";
import imgChampions from "@/assets/images/portfolio/champions-crown.png";
import imgNeon from "@/assets/images/portfolio/neon-horizons.png";
import imgSkyline from "@/assets/images/portfolio/skyline-symphony.png";
import imgHeritage from "@/assets/images/portfolio/heritage-glow.png";
import imgVictory from "@/assets/images/portfolio/victory-formation.png";

type Item = {
  src: string;       // poster image
  video: string;     // video url
  title: string;
  category: string;
  location: string;
  year: string;
  drones: string;
};

const SAMPLE = "/mp_.mp4"; // Using the local video we found earlier

const items: Item[] = [
  { src: imgBeats, video: SAMPLE, title: "Sky Vows", category: "Wedding", location: "Chennai", year: "2025", drones: "300" },
  { src: imgChampions, video: SAMPLE, title: "Aurora Launch", category: "Brand Activation", location: "Bangalore", year: "2025", drones: "500" },
  { src: imgNeon, video: SAMPLE, title: "Tricolour Above", category: "National Event", location: "New Delhi", year: "2026", drones: "800" },
];

export const Showcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState<Item | null>(null);

  // Scroll-driven parallax on each card image
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-parallax]");

    const onScroll = () => {
      const vh = window.innerHeight;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = (center - vh / 2) / vh; // -1..1
        const img = card.querySelector<HTMLElement>("[data-parallax-img]");
        if (img) img.style.transform = `translate3d(0, ${dist * -40}px, 0) scale(1.15)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock body scroll + ESC to close lightbox
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const handleHoverPlay = (i: number, play: boolean) => {
    const v = hoverVideoRefs.current[i];
    if (!v) return;
    if (play) {
      v.currentTime = 0;
      v.play().catch(() => { });
    } else {
      v.pause();
    }
  };

  // Editorial asymmetric layout per card index
  const layout = [
    "md:col-span-6 md:row-span-2 h-[420px] md:h-[580px]",
    "md:col-span-6 h-[360px] md:h-[280px]",
    "md:col-span-6 h-[360px] md:h-[280px]",
    "md:col-span-6 h-[360px] md:h-[280px]",
    "md:col-span-6 md:row-span-2 h-[420px] md:h-[580px]",
    "md:col-span-6 h-[360px] md:h-[280px]",
  ];

  return (
    <section id="portfolio" className="relative bg-[#050505] py-28 md:py-36 overflow-hidden">
      <style>{`
        /* Marquee */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }

        /* Optional helpers used by the section */
        .font-display       { font-family: 'Orbitron', sans-serif; font-weight: 500; }
        .font-serif-italic  { font-style: italic; }
        .text-gradient-blue {
          background: linear-gradient(135deg, #1A8FFF, #52AAFF);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .radial-blue {
          background: radial-gradient(circle at center, rgba(26,143,255,0.25) 0%, transparent 70%);
        }
      `}</style>

      {/* Decorative glow + top divider */}
      {/* <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] radial-blue opacity-60" /> */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] uppercase text-[#F97316]/90">Selected Portfolio</span>
            <h2 className="mt-8 text-3xl md:text-5xl tracking-tight leading-[0.95] uppercase">
              Shows that moved the sky
            </h2>
          </div>
          <p className="text-white/60 font-light max-w-sm md:text-right">
            A curated selection of cinematic drone performances staged across India.
          </p>
        </div>

        {/* Grid */}
        <div ref={containerRef} className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {items.map((it, i) => (
            <article
              key={i}
              data-parallax
              onMouseEnter={() => handleHoverPlay(i, true)}
              onMouseLeave={() => handleHoverPlay(i, false)}
              onClick={() => setActive(it)}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 cursor-pointer ${layout[i]}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  data-parallax-img
                  src={it.src}
                  alt={`${it.title} — ${it.category} drone show in ${it.location}`}
                  loading="lazy"
                  className="h-full w-full object-cover scale-[1.15] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.22]"
                />
                {/* Hover video preview */}
                <video
                  ref={(el) => { hoverVideoRefs.current[i] = el; }}
                  src={it.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* Veils */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/0 via-transparent to-[#F97316]/0 group-hover:from-[#F97316]/10 group-hover:to-[#F97316]/5 transition-all duration-700" />

              {/* Top meta */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-white/70">
                <span className="px-3 py-1 rounded-full border border-white/20 backdrop-blur-md bg-black/30">
                  {it.category}
                </span>
                <span className="font-mono">{it.year}</span>
              </div>

              {/* Bottom content + play button */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[#F97316] mb-2 font-bold">
                      {it.location}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl leading-tight truncate uppercase">
                      {it.title}
                    </h3>
                    <div className="mt-3 h-px w-0 bg-[#F97316] group-hover:w-24 transition-all duration-700" />
                    <div className="mt-3 text-xs text-white/60 font-light">
                      <span className="font-mono text-white/90 font-bold">{it.drones}</span> drones in formation
                    </div>
                  </div>

                  <div className="shrink-0 h-12 w-12 rounded-full border border-white/30 grid place-items-center backdrop-blur-md bg-white/10 transition-all duration-500 group-hover:bg-[#F97316] group-hover:border-[#F97316] group-hover:rotate-45">
                    <ArrowUpRight size={18} className="text-white group-hover:hidden" />
                    <Play size={16} className="hidden group-hover:block fill-current text-black" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer line */}
        {/* <div className="mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="font-display text-2xl md:text-3xl max-w-xl uppercase">
            Over <span className="text-gradient-blue">500 shows</span> staged. Every sky a canvas.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#F97316] hover:text-white transition-all duration-300"
          >
            Book Your Show
            <ArrowRight size={14} />
          </Link>
        </div> */}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setActive(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={active.video}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#F97316] text-xs font-bold uppercase tracking-widest mb-2">{active.category}</p>
                <h2 className="text-3xl md:text-5xl font-display text-white uppercase">{active.title}</h2>
                <p className="text-white/60 text-sm mt-2">{active.location} • {active.year} • {active.drones} Drones</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
