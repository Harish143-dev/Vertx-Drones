"use client";

import { motion } from "framer-motion";

export function Highlights() {
  const highlights = [
    { value: "Up to 1000", label: "Drones" },
    { value: "15 MIN", label: "Drone Shows " },
    { value: "In-House", label: "Technology" },
    { value: "Precision", label: "Controlled Formations" }
  ];

  return (
    <section className="bg-black py-10 border-y border-white/5 relative z-20 overflow-hidden">
      <style>{`
        .font-display { font-family: 'Orbitron', sans-serif; font-weight: 500; }
      `}</style>
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[100px] bg-[#F97316]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-0 md:bg-white/5">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-black py-6 md:py-14 flex flex-col items-center group relative overflow-hidden"
            >
              {/* Vertical Divider for desktop */}
              {i < highlights.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-white/10" />
              )}

              <div className="relative mb-3 md:mb-4 text-center">
                <span className="text-2xl md:text-4xl font-bold text-white tracking-tight transition-all duration-500 group-hover:text-[#F97316] font-display block text-center leading-tight px-4">
                  {item.value}
                </span>
                {/* Micro-glow on hover */}
                <div className="absolute -inset-4 bg-[#F97316] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />
              </div>

              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/25 font-bold group-hover:text-white/60 transition-colors text-center px-4 block w-full">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
