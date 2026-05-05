import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import image1 from "@/assets/images/drone-diamond.png";
import image2 from "@/assets/images/drone-logo.png";
import image3 from "@/assets/images/drone-constellation.png";
import image4 from "@/assets/images/drone-figure.png";

interface Package {
  drones: number;
  label: string;
  poster: string;
  video: string; // drop your .mp4 path here per package
}

const packages: Package[] = [
  { drones: 3500, label: "3,500", poster: image3, video: "" },
  { drones: 3000, label: "3,000", poster: image2, video: "" },
  { drones: 2500, label: "2,500", poster: image1, video: "" },
  { drones: 2000, label: "2,000", poster: image4, video: "" },
  { drones: 1000, label: "1,000", poster: image2, video: "" },
  { drones: 500,  label: "500",   poster: image3, video: "" },
  { drones: 400,  label: "400",   poster: image1, video: "" },
  { drones: 300,  label: "300",   poster: image4, video: "" },
  { drones: 200,  label: "200",   poster: image2, video: "" },
  { drones: 100,  label: "100",   poster: image1, video: "" },
];

const ORANGE = "#F97316";
const MAX = packages.length - 1;

export function DroneShowGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = packages[activeIndex];

  const go = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (current.video) videoRef.current.play().catch(() => {});
    }
  }, [activeIndex, current.video]);

  const fillPct = ((MAX - activeIndex) / MAX) * 100;

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <style>{`
        .drone-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          outline: none;
          border: none;
          background: transparent;
          cursor: pointer;
        }
        .drone-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${ORANGE};
          box-shadow: 0 0 0 3px rgba(249,115,22,0.18), 0 0 16px rgba(249,115,22,0.4);
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .drone-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 5px rgba(249,115,22,0.22), 0 0 24px rgba(249,115,22,0.55);
          transform: scale(1.15);
        }
        .drone-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: none;
          background: ${ORANGE};
          box-shadow: 0 0 0 3px rgba(249,115,22,0.18), 0 0 16px rgba(249,115,22,0.4);
          cursor: pointer;
        }
        .drone-slider::-webkit-slider-runnable-track { background: transparent; }
        .drone-slider::-moz-range-track { background: transparent; height: 2px; }
      `}</style>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-center">
        
        {/* Left Column: Header & Slider */}
        <div className="w-full lg:w-5/12 flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 lg:mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ORANGE }}>
              Show Packages
            </p>
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Drone Show Scale</h2>
              <p className="text-white/35 font-light text-sm max-w-xs leading-relaxed">
                Choose the fleet size and preview the visual impact
              </p>
            </div>
          </motion.div>

          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 lg:mb-0"
          >
            <div className="flex items-baseline justify-between mb-5">
              <div className="flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22 }}
                    className="text-3xl font-bold"
                    style={{ color: ORANGE, fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {current.label}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/30 text-sm tracking-widest uppercase">Drones</span>
              </div>
              <span className="text-white/20 text-xs tracking-[0.2em] uppercase">
                {packages[MAX].label} — {packages[0].label}
              </span>
            </div>

            <div className="relative flex items-center" style={{ height: "20px" }}>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px]" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[2px] transition-all duration-150"
                style={{ left: 0, width: `${fillPct}%`, background: `linear-gradient(90deg, rgba(249,115,22,0.3), ${ORANGE})` }}
              />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                {packages.map((_, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={i}
                      className="w-[1px] transition-all duration-200"
                      style={{
                        height: isActive ? "10px" : "6px",
                        marginTop: isActive ? "-4px" : "-2px",
                        background: isActive ? ORANGE : "rgba(255,255,255,0.18)",
                      }}
                    />
                  );
                })}
              </div>
              <input
                type="range"
                min={0}
                max={MAX}
                step={1}
                value={activeIndex}
                onChange={(e) => go(Number(e.target.value))}
                className="drone-slider relative z-10"
              />
            </div>

            <div className="flex justify-between mt-3 pointer-events-none">
              {packages.map((pkg, i) => {
                const isActive = i === activeIndex;
                return (
                  <span
                    key={pkg.drones}
                    className="text-[9px] font-medium tracking-wide transition-all duration-200"
                    style={{
                      color: isActive ? ORANGE : "rgba(255,255,255,0.18)",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      display: "inline-block",
                      width: "10%",
                      textAlign: "center",
                    }}
                  >
                    {pkg.drones >= 1000 ? `${pkg.drones / 1000}k` : pkg.drones}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Video Card */}
        <div className="w-full lg:w-7/12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: `0 0 0 1px rgba(249,115,22,0.05), 0 40px 90px rgba(0,0,0,0.75)`,
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
                  center: { opacity: 1, x: 0 },
                  exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="w-full aspect-video"
              >
                <video
                  ref={videoRef}
                  key={activeIndex}
                  className="w-full h-full object-cover block"
                  poster={current.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  {current.video && <source src={current.video} type="video/mp4" />}
                </video>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
