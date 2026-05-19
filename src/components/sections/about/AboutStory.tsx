import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const DroneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="20" x2="44" y2="44" stroke="currentColor" strokeWidth="1.5" />
    <line x1="44" y1="20" x2="20" y2="44" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="3" fill="transparent" stroke="currentColor" strokeWidth="1" />
    <circle cx="44" cy="20" r="3" fill="transparent" stroke="currentColor" strokeWidth="1" />
    <circle cx="20" cy="44" r="3" fill="transparent" stroke="currentColor" strokeWidth="1" />
    <circle cx="44" cy="44" r="3" fill="transparent" stroke="currentColor" strokeWidth="1" />
    <rect x="26" y="26" width="12" height="12" rx="2" fill="transparent" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export function AboutStory() {
  return (
    <section className="bg-background">
      {/* Top Statement Block - Big and airy */}
      <div className="py-18 border-b border-border/50 relative overflow-hidden">
        {/* Subtle radial gradient background for the statement */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight tracking-tight text-white mb-12">
              Every show is built from scratch. Nothing is templated. Nothing is outsourced.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Company Story Block - Clean, reading layout */}
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-primary">Company Story</h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.2}
              className="flex flex-col gap-10 text-base md:text-lg font-light leading-relaxed text-white/60"
            >
              <p className="text-white/80 text-xl md:text-2xl leading-snug">
                We started in 2025 with a straightforward goal. Drone shows in India were either too expensive, too standardized, or both. We built VertX to fix that.
              </p>

              <div className="h-px w-12 bg-border" />

              <p>
                Our production is fully in-house — concept, choreography, animation programming, permits, ground setup, and execution. One team handles all of it. That is why our shows are faster to deliver, easier to customize, and more consistent in quality than what a vendor-heavy operation produces.
              </p>

              <div className="mt-8 rounded-lg border border-border bg-[#0a0a0a] p-6 flex items-start gap-4">
                <DroneIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-white/50">
                  <strong className="text-white font-medium">Headquarters:</strong> We are based in Chennai and operate across India. South India within 7 days. Pan-India with standard lead time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
