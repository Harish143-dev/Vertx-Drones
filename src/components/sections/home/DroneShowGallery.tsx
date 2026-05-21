import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import video100 from "@/assets/videos/showcase/100drones.mp4";
import video200 from "@/assets/videos/showcase/200drones.mp4";
import video400 from "@/assets/videos/showcase/400drones.mp4";
import video500 from "@/assets/videos/showcase/500drones.mp4";

interface Package {
  drones: number;
  label: string;
  video: string;
}

const packages: Package[] = [
  { drones: 100, label: "100", video: video100 },
  { drones: 200, label: "200", video: video200 },
  { drones: 400, label: "400", video: video400 },
  { drones: 500, label: "500", video: video500 },
];

const ORANGE = "#F97316";
const MAX = packages.length - 1;

export function DroneShowGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = packages[activeIndex];

  const go = (idx: number) => {
    setActiveIndex(idx);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (current.video) videoRef.current.play().catch(() => { });
    }
  }, [activeIndex, current.video]);

  const fillPct = (activeIndex / MAX) * 100;

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
        <div className="w-full lg:w-2xl flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 lg:mb-16"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl leading-tight">PREVIEW YOUR SHOW BEFORE IT HAPPENS</h2>
              <p className="text-white/35 font-light text-sm max-w-xs leading-relaxed">
                Pick 100, 200, 400, or 500 drones. Choose your formations. See exactly what your sky will look like before you decide anything.
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
                {packages[0].label} — {packages[MAX].label}
              </span>
            </div>

            <div className="relative flex items-center w-full" style={{ height: "20px" }}>
              {/* Custom Track and Ticks wrapped inside a 9px-inset container (half of the 18px thumb width) */}
              <div className="absolute inset-y-0 left-[9px] right-[9px] pointer-events-none flex items-center">
                {/* Gray Background Track */}
                <div className="absolute inset-x-0 h-[2px] w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

                {/* Active Orange Progress Track */}
                <div
                  className="absolute h-[2px] transition-all duration-150"
                  style={{ left: 0, width: `${fillPct}%`, background: `linear-gradient(90deg, rgba(249,115,22,0.3), ${ORANGE})` }}
                />

                {/* Ticks */}
                <div className="absolute inset-x-0 flex justify-between w-full">
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
              </div>

              {/* Native range input slider */}
              <input
                type="range"
                min={0}
                max={MAX}
                step={1}
                value={activeIndex}
                onChange={(e) => go(Number(e.target.value))}
                className="drone-slider relative z-10 w-full"
              />
            </div>

            <div className="relative w-full mt-3 h-4 pointer-events-none">
              {/* Label container also inset by 9px to match ticks perfectly */}
              <div className="absolute inset-x-[9px]">
                {packages.map((pkg, i) => {
                  const isActive = i === activeIndex;
                  const percent = (i / MAX) * 100;
                  return (
                    <span
                      key={pkg.drones}
                      className="absolute text-[9px] font-medium tracking-wide transition-all duration-200"
                      style={{
                        left: `${percent}%`,
                        transform: isActive ? "translate(-50%, 0) scale(1.1)" : "translate(-50%, 0) scale(1)",
                        color: isActive ? ORANGE : "rgba(255,255,255,0.18)",
                      }}
                    >
                      {pkg.drones >= 1000 ? `${pkg.drones / 1000}k` : pkg.drones}
                    </span>
                  );
                })}
              </div>
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
            className="w-full overflow-hidden relative aspect-video"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: `0 0 0 1px rgba(249,115,22,0.05), 0 40px 90px rgba(0,0,0,0.75)`,
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover block"
              autoPlay
              loop
              muted
              playsInline
              src={current.video}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
