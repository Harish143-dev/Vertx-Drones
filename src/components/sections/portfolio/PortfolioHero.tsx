import { motion } from "framer-motion";
import heroBg from "@/assets/images/portfolio/skyline-symphony.png";

const ORANGE = "#F97316";

export function PortfolioHero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden bg-[#0a0a0a]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="VERTX Portfolio"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pb-16 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: ORANGE }}
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 max-w-3xl"
        >
          Stories Written{" "}
          <br className="hidden md:block" />
          in the Sky
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm md:text-lg text-white/50 font-light max-w-xl leading-relaxed"
        >
          A curated showcase of our most spectacular drone light shows across India — from intimate celebrations to city-wide spectacles.
        </motion.p>
      </div>
    </section>
  );
}
