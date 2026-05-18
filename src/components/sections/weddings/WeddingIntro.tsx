import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function WeddingIntro() {
  return (
    <section className="bg-background py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-2xl font-light leading-relaxed text-white/90 md:text-3xl lg:leading-[1.4]"
        >
          Some weddings get remembered for years. The ones people send videos of to cousins across the country. The ones that come up at the next family gathering. <span className="text-primary font-normal">A wedding drone show is often the reason.</span>
        </motion.p>
      </div>
    </section>
  );
}
