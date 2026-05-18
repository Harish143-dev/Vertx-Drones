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
          <h2 className="text-3xl md:text-5xl font-light leading-tight mb-6">
            Your Show Is Next
          </h2>
          <p className="text-sm md:text-base text-white/40 font-light leading-relaxed mb-10 max-w-lg mx-auto">
            Every show above started with one conversation. Yours can too.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#F97316] text-[#0a0a0a] font-bold hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] uppercase tracking-widest text-xs group"
            >
              Plan Your Drone Show
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white font-bold hover:bg-white/5 transition-all duration-300 uppercase tracking-widest text-xs group"
            >
              WhatsApp Us
            </a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-light text-white/30">
            <Link href="/weddings" className="hover:text-white/70 transition-colors">wedding drone show</Link>
            <span>|</span>
            <Link href="/corporate" className="hover:text-white/70 transition-colors">corporate drone show</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white/70 transition-colors">drone light shows</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
