import { motion, type Variants } from "framer-motion";
import { Eye } from "lucide-react";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const impactSteps = [
  {
    title: "Before",
    copy: "Use the drone show as the teaser, invite hook, countdown asset, or premium reveal promise.",
  },
  {
    title: "During",
    copy: "Own the highest-attention moment of the night with branded choreography timed to the audience peak.",
  },
  {
    title: "After",
    copy: "Extend the campaign through reels, PR stills, recap films, internal decks, and sponsor reports.",
  },
];

export function CorporateImpact() {
  return (
    <section className="bg-[#050505] py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="max-w-2xl text-3xl font-light leading-tight md:text-5xl">
              A campaign asset
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/42">
              We shape the sequence around what your team needs to communicate: logo, message, launch date, product idea, sponsor visibility, or destination story.
            </p>
          </motion.div>

          <div className="space-y-4">
            {impactSteps.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.08}
                className="grid gap-4 border border-white/8 bg-white/[0.02] p-6 sm:grid-cols-[9rem_1fr]"
              >
                <div className="flex items-center gap-3 text-[#F97316]">
                  <Eye size={18} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                    {item.title}
                  </p>
                </div>
                <p className="text-sm font-light leading-relaxed text-white/48">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
