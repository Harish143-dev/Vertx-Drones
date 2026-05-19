import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function AboutMission() {
  return (
    <section className="bg-background py-24 md:py-32 relative overflow-hidden">
      {/* Subtle radial gradient background for the mission statement */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-primary mb-6">
            Our Mission
          </h2>
          <p className="text-2xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-white italic">
            "To build aerial shows that people remember long after the event is over."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
