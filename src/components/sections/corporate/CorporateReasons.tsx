import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const corporateReasons = [
  {
    title: "Full audience attention",
    copy: "A drone show commands complete focus from the first formation. No divided screens, no wandering attention. Everyone in the venue is watching the same thing at the same time.",
  },
  {
    title: "Content your team did not have to produce",
    copy: "Every person in your audience has a camera. A 15-minute show generates hundreds of organic clips that travel on Instagram, WhatsApp, and YouTube without a single rupee in media spend.",
  },
  {
    title: "Premium brand positioning",
    copy: "Drone shows are still rare enough in India that the brands doing them are seen as ahead of the curve. It signals ambition and creativity in a single move. Your competitors are still doing stage setups and LED screens.",
  },
  {
    title: "A moment your own people remember",
    copy: "Annual days blend into each other. A corporate event drone show that spells your company name across the sky, in front of the team that built what it stands for, is a different kind of gesture. It signals investment in the people, not just the product.",
  },
  {
    title: "The impression clients take home",
    copy: "Hosting a partner summit, investor event, or client evening means the experience is part of the message. A drone show that closes with your brand name written in the sky is not something a deck can replicate. It is what they tell people about when they describe doing business with you.",
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
        </motion.div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {corporateReasons.map((item, index) => {
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.1}
                className="flex flex-col rounded-xl border border-white/8 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]"
              >
                <h3 className="mb-5 text-lg font-bold text-white md:text-xl">{item.title}</h3>
                <p className="text-sm md:text-base font-light leading-relaxed text-white/50 mt-auto">
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
