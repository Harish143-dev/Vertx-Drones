import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const ORANGE = "#F97316";

export function PortfolioCTA() {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 70%)` }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: ORANGE }}>
            Ready?
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Want a Show
            <br />
            Like This?
          </h2>
          <p className="text-sm md:text-base text-white/40 font-light leading-relaxed mb-10 max-w-lg mx-auto">
            Every project starts with a conversation. Tell us about your event and we'll craft a sky-show that leaves your audience speechless.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#F97316] text-[#0a0a0a] font-bold hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] uppercase tracking-widest text-xs group"
          >
            Book Your Show
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
