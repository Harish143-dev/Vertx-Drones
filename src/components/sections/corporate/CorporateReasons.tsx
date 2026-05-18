import { motion } from "framer-motion";
import { Share2, Trophy, Users } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const ORANGE = "#F97316";

const corporateReasons = [
  {
    title: "Full audience attention",
    copy: "A drone show commands complete focus from the first formation. No divided screens, no wandering attention. Everyone in the venue is watching the same thing at the same time.",
    icon: Users,
  },
  {
    title: "Content your team did not have to produce",
    copy: "Every person in your audience has a camera. A 15-minute show generates hundreds of organic clips that travel on Instagram, WhatsApp, and YouTube without a single rupee in media spend.",
    icon: Share2,
  },
  {
    title: "Premium brand positioning",
    copy: "Drone shows are still rare enough in India that the brands doing them are seen as ahead of the curve. It signals ambition and creativity in a single move. Your competitors are still doing stage setups and LED screens.",
    icon: Trophy,
  },
];

export function CorporateReasons() {
  return (
    <section className="border-y border-white/5 bg-[#0a0a0a] py-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <h2 className="text-3xl font-light leading-tight md:text-5xl text-white">
            Why Brands Choose Corporate Drone Shows
          </h2>
          <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/42">
            Corporate buyers do not invest only for visuals. They invest because the show creates a marketing asset, a PR angle, and a premium memory around the brand.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {corporateReasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.1}
                className="rounded-lg border border-white/8 bg-white/[0.02] p-6 md:p-8"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316]">
                  <Icon size={20} />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white md:text-xl">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/45">
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
