import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Play } from "lucide-react";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const proofItems = [
  {
    id: 3, // Four Points by Sheraton project ID in portfolio
    category: "Corporate Brand Activation",
    client: "Four Points by Sheraton",
    drones: "50 drones",
    description: "Synchronized branding and aerial formations",
  },
  {
    id: 1, // Pondicherry Government project ID in portfolio
    category: "New Year Drone Light Show",
    client: "Pondicherry Government",
    drones: "150 drones",
    description: "Large-scale public aerial experience",
  },
];

export function CorporateProof() {
  return (
    <section className="bg-[#050505] py-24 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-light leading-tight md:text-5xl text-white">
            We Have Done It for Brands Like Yours
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {proofItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={index * 0.1}
              className="group border border-white/8 bg-[#0a0a0a]/60 hover:bg-[#101010]/80 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-300"
            >
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: ORANGE }}>
                  {item.category}
                </p>
                <h3 className="text-xl font-bold text-white">
                  {item.client}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-light text-white/50">
                  <span>{item.drones}</span>
                  <span className="text-white/20">|</span>
                  <span>{item.description}</span>
                </div>
              </div>

              <div>
                <Link
                  href={`/portfolio?project=${item.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F97316] group-hover:text-white transition-colors duration-300"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F97316]/30 bg-[#F97316]/5 text-[#F97316] group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <Play size={10} fill="currentColor" />
                  </span>
                  Watch the show
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300 group"
          >
            See all past shows
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
