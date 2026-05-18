import { motion, type Variants } from "framer-motion";
import { CircleDollarSign, FileCheck, TrendingUp } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const benefits = [
  {
    icon: CircleDollarSign,
    title: "No Investment Needed",
    copy: "No drones, no pilots, no production team. You plug into an existing operation without the capital expenditure."
  },
  {
    icon: FileCheck,
    title: "Full Compliance Handled",
    copy: "Every show is fully permitted and executed by us. Zero regulatory risk or paperwork on your end."
  },
  {
    icon: TrendingUp,
    title: "Growing Market",
    copy: "Drone shows in India are still early. Agencies offering them now own the category before it becomes standard."
  }
];

export function PartnerBenefits() {
  return (
    <section className="bg-[#050505] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl font-light leading-tight md:text-5xl">
            Why Partner With VertX
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="bg-card rounded-lg border border-border p-8 md:p-10 transition-colors hover:border-primary/30"
              >
                <div className="mb-6 flex h-12 w-12 items-center rounded-full justify-center border border-primary/20 bg-primary/5">
                  <Icon className="text-primary" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {benefit.copy}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
