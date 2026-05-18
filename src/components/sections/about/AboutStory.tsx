import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function AboutStory() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 items-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-light leading-tight tracking-tight text-white max-w-xl">
              Every show is built from scratch. Nothing is templated. Nothing is outsourced.
            </h2>

            <div className="rounded-lg bg-card border-l-4 border-primary p-6 mt-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-primary mb-2">Our Mission</h3>
              <p className="text-xl font-light italic leading-relaxed text-white">
                "To build aerial shows that people remember long after the event is over."
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
            className="flex flex-col gap-8 text-sm md:text-base font-light leading-relaxed text-white/50 lg:pl-12 lg:border-l lg:border-border"
          >
            <p>
              We started in 2025 with a straightforward goal. Drone shows in India were either too expensive, too standardized, or both. We built VertX to fix that.
            </p>
            <p>
              Our production is fully in-house — concept, choreography, animation programming, permits, ground setup, and execution. One team handles all of it. That is why our shows are faster to deliver, easier to customize, and more consistent in quality than what a vendor-heavy operation produces.
            </p>
            <p className="border-t border-border pt-6 text-sm text-white/40 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary" />
              We are based in Chennai and operate across India. South India within 7 days. Pan-India with standard lead time.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
