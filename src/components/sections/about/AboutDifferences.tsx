import { motion, type Variants } from "framer-motion";
import { Laptop, Expand, Users } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const differences = [
  {
    icon: Laptop,
    title: "In-house production",
    copy: "Every animation, formation, and show sequence is designed and programmed by our own team. We do not license templates or hand off creative work."
  },
  {
    icon: Expand,
    title: "Flexibility",
    copy: "100 to 1,000 drones. We adapt to your brief, your venue, and your timeline. We have operated in restricted airspace zones to make shows happen."
  },
  {
    icon: Users,
    title: "One team, full ownership",
    copy: "From the first concept call to the moment the last drone lands, the same team handles everything. No handoffs, no miscommunication between vendors."
  }
];

export function AboutDifferences() {
  return (
    <section className="bg-[#050505] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white">
            What We Do Differently
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {differences.map((diff, i) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={diff.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="rounded-lg bg-card border border-border p-8 md:p-10 transition-colors hover:border-primary/30"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                  <Icon className="text-primary" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-white">{diff.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  {diff.copy}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
