import { motion, type Variants } from "framer-motion";
import { Users, PlaneTakeoff, PenTool, HardHat } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const stats = [
  { icon: Users, value: "10+", label: "In-house Experts" },
  { icon: PlaneTakeoff, value: "2", label: "Licensed Pilots" },
  { icon: PenTool, value: "3", label: "Show Designers" },
  { icon: HardHat, value: "10", label: "On-site Crew Members" },
];

export function AboutTeam() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white">
            Our Team
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] items-start mb-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-sm md:text-base font-light leading-relaxed text-white/50"
          >
            <p>
              Software, animation, and flight planning are all handled internally. When our team arrives at your venue, they have already run the show dozens of times in simulation.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, i) => {
                 const Icon = stat.icon;
                 return (
                  <div key={stat.label} className="rounded-lg border border-border bg-card p-6 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-all duration-300">
                    <Icon className="text-primary mb-3" size={24} />
                    <span className="text-3xl font-light text-white mb-1">{stat.value}</span>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-white/40">{stat.label}</span>
                  </div>
                 );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
            className="rounded-lg border border-primary/30 bg-primary/5 p-8 md:p-12 relative"
          >
            <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-background rounded-bl-lg rounded-tr-lg">
              Leadership
            </div>
            <h3 className="text-2xl font-semibold text-white mb-6">Founders</h3>
            <div className="flex flex-col gap-4 text-sm font-light leading-relaxed text-white/50">
              <p>
                Vertx Drone Entity was founded by <strong className="text-white font-semibold">Fahad Ahmed</strong> and <strong className="text-white font-semibold">Sharvesh Logan</strong>, two entrepreneurs driven by a shared vision to transform the future of live entertainment through innovative drone technology. With a passion for creativity, technology, and large-scale visual storytelling, the founders launched VertX to deliver world-class aerial experiences that blend precision engineering with artistic performance.
              </p>
              <p>
                Their mission is to redefine celebrations, brand activations, public events, and cultural experiences using synchronized drone light shows that are safe, sustainable, and unforgettable.
              </p>
              <p>
                <strong className="text-white font-semibold">Fahad</strong> brings strategic leadership and operational vision, while <strong className="text-white font-semibold">Sharvesh</strong> contributes creative direction, technology execution, and experience design. Together, they are building VertX into a leading name in next-generation entertainment, creating immersive sky-based experiences for brands, festivals, weddings, government events, and large public gatherings.
              </p>
              <p className="mt-2 text-primary font-medium italic">
                At its core, VertX represents innovation, imagination, and the belief that the sky is no longer the limit.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
