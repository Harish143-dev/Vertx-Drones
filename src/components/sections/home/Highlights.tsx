"use client";

import { motion } from "framer-motion";

export function Highlights() {
  const highlights = [
    { value: "Up to 1000", label: "Drones" },
    { value: "15 MIN",  label: "Drone Shows " },
    { value: "In-House",     label: "Technology" },
    { value: "Precision-Controlled", label: "Formations" }
  ];

  return (
    <section className="bg-black py-10 border-y border-white/5 relative z-20 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[100px] bg-[#F97316]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-px md:bg-white/10">
          {highlights.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-black py-8 md:py-12 flex flex-col items-center group"
            >
              <div className="relative mb-4">
                <span className="text-4xl md:text-3xl font-bold text-white tracking-tighter transition-all duration-500 group-hover:text-[#F97316]">
                  {item.value}
                </span>
                {/* Micro-glow on hover */}
                <div className="absolute -inset-2 bg-[#F97316] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 font-bold group-hover:text-white/60 transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
