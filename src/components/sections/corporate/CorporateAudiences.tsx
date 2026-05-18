import { motion, type Variants } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  Landmark,
  Megaphone,
  Sparkles,
} from "lucide-react";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const audiences = [
  {
    title: "Brands",
    copy: "Launch products, campaigns, and identities with a high-impact public reveal.",
    icon: Sparkles,
  },
  {
    title: "Companies",
    copy: "Turn summits, annual days, and milestone events into executive-grade moments.",
    icon: Building2,
  },
  {
    title: "Agencies",
    copy: "Add a premium outdoor activation layer to campaign, PR, and experiential briefs.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Government Events",
    copy: "Create landmark public shows for destinations, tourism, civic days, and festivals.",
    icon: Landmark,
  },
  {
    title: "Marketing Teams",
    copy: "Build a launch asset that supports awareness, social reach, and brand recall.",
    icon: Megaphone,
  },
];

export function CorporateAudiences() {
  return (
    <section className="border-y border-white/5 bg-[#050505] py-20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="max-w-2xl text-3xl font-light leading-tight md:text-5xl">
              High-stakes brand moments
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-white/40 md:text-right">
            Clean execution for teams that need more than spectacle: visibility, attention, and marketing value.
          </p>
        </motion.div>

        <div className="grid gap-px border border-white/8 bg-white/8 md:grid-cols-5">
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.06}
                className="min-h-52 bg-[#0a0a0a] p-5 transition-colors duration-300 hover:bg-[#101010]"
              >
                <Icon className="mb-8 text-[#F97316]" size={22} />
                <h3 className="mb-3 text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs font-light leading-relaxed text-white/42">
                  {item.copy}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
