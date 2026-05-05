import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MessageCircle } from "lucide-react";

const ORANGE = "#F97316";

export function CTABlock() {
  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Orange glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${ORANGE}12 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/7 p-8 md:p-12"
          style={{ background: "rgba(255,255,255,0.015)" }}
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ORANGE }}>
              Ready to Launch?
            </p>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Start Your Drone Show
            </h2>
            <p className="text-white/35 text-sm mt-2 font-light max-w-sm">
              From concept to sky — let's build something unforgettable together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 group"
              style={{ background: ORANGE, color: "#0a0a0a" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = ORANGE)}
            >
              Get a Quote
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] border transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#25D366";
                (e.currentTarget as HTMLElement).style.color = "#25D366";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <MessageCircle size={13} />
              WhatsApp quick connect
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
