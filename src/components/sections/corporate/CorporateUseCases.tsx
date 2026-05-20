import { motion } from "framer-motion";
import { Landmark, Megaphone, Rocket, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const ORANGE = "#F97316";

const useCases = [
  {
    title: "Product Launches",
    copy: "Your new product deserves more than a stage reveal. A 150-drone formation carrying your product name, logo, and launch message leaves the venue and lands on social feeds the same night.",
    tag: "Launch visibility",
    icon: Rocket,
  },
  {
    title: "Brand Storytelling",
    copy: "Custom animations tell your brand story in the sky. Color, shape, movement, and music synchronized to your brand identity. Every formation designed specifically for your brief.",
    tag: "Brand identity",
    icon: Sparkles,
  },
  {
    title: "Corporate Celebrations",
    copy: "Annual days, milestone events, leadership summits. A drone show turns a routine celebration into a moment people bring up at the next one.",
    tag: "Premium positioning",
    icon: Megaphone,
  },
  {
    title: "Government and Tourism Events",
    copy: "Tourism campaigns, city celebrations, national days. Drone shows for government events are proven at scale. We have delivered shows for the Pondicherry Government and the Narcotics Control Bureau.",
    tag: "Public reach",
    icon: Landmark,
  },
];

export function CorporateUseCases() {
  return (
    <section className="bg-[#050505] py-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="max-w-3xl text-3xl font-light leading-tight md:text-5xl">
            Built for Every Corporate Drone Show Brief
          </h2>
        </motion.div>

        <div className="grid gap-px border border-white/8 bg-white/8 sm:grid-cols-2 rounded-lg overflow-hidden">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.08}
                className="group flex min-h-56 flex-col justify-between bg-[#0a0a0a] p-6 transition-colors duration-300 hover:bg-[#101010]"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/25">
                    {item.tag}
                  </span>
                  {/* <Icon
                    size={22}
                    className="text-white/20 transition-colors duration-300 group-hover:text-[#F97316]"
                  /> */}
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-bold leading-tight text-white md:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-white/45">
                    {item.copy}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
