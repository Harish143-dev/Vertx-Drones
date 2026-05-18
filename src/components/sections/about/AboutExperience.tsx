import { motion, type Variants } from "framer-motion";
import { Landmark, Building2, GraduationCap, HeartHandshake } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const experiences = [
  {
    icon: Landmark,
    category: "Government and Public Events",
    clients: "Pondicherry Government | Narcotics Control Bureau (NCB)"
  },
  {
    icon: Building2,
    category: "Corporate",
    clients: "Four Points by Sheraton"
  },
  {
    icon: GraduationCap,
    category: "Educational and Cultural",
    clients: "Sathyabama Institute of Science and Technology"
  },
  {
    icon: HeartHandshake,
    category: "Weddings",
    clients: "HNI weddings across Hyderabad and Karnataka"
  }
];

export function AboutExperience() {
  return (
    <section className="bg-background py-24 md:py-32 border-y border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white mb-6">
            Shows We Have Delivered
          </h2>
          <p className="text-sm md:text-base font-light text-primary">
            5 cities. Every show delivered on time, on brief, and fully compliant.
          </p>
        </div>

        <div className="flex flex-col border-t border-border">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.category}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="flex flex-col md:flex-row md:items-center justify-between border-b border-border py-8 gap-4 hover:bg-card/50 transition-colors px-4 -mx-4 md:px-6 md:-mx-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{exp.category}</h3>
                </div>
                <div className="md:text-right">
                  <p className="text-sm md:text-base font-light text-white/50">{exp.clients}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
