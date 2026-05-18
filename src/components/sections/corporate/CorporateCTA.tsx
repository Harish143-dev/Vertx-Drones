import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function CorporateCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
      <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-8 text-3xl font-light leading-tight md:text-5xl">
            Build your brand show.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 bg-[#F97316] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
          >
            Plan a Corporate Show
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
