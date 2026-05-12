import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/images/portfolio/skyline-symphony.png";

const ORANGE = "#F97316";

export function PortfolioHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] pt-52 md:pt-60">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="VERTX drone show over a city skyline"
          className="h-full w-full object-cover opacity-55"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/45 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/58 to-[#0a0a0a]/10" />

      <div className="container relative z-10 mx-auto flex min-h-[calc(72vh-7rem)] items-center px-6 pb-16 md:px-12">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-5 text-xs uppercase tracking-[0.32em]"
            style={{ color: ORANGE }}
          >
            Vertx Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.25,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="max-w-3xl text-2xl font-light leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Drone Shows That Prove the Scale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-5 max-w-xl text-sm font-light leading-relaxed text-white/55 md:text-base"
          >
            A focused look at our formations, event execution, and case-study
            outcomes across weddings, launches, festivals, and public moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#portfolio-gallery"
              className="inline-flex items-center justify-center gap-3 bg-[#F97316] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
            >
              View Projects
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
