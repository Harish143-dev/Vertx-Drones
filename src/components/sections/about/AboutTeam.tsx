import { motion } from "framer-motion";
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

        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white mb-6"
          >
            Our Team
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
            className="max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed text-white/50"
          >
            Software, animation, and flight planning are all handled internally. When our team arrives at your venue, they have already run the show dozens of times in simulation.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={0.2 + (i * 0.1)}
                className="rounded-lg border border-border bg-[#0a0a0a] p-8 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-all duration-300"
              >
                <Icon className="text-primary mb-4" size={28} strokeWidth={1.5} />
                <span className="text-4xl font-light text-white mb-2">{stat.value}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-white/40">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Founders Block */}
        {/* <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-primary">Leadership</h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
            className="flex flex-col gap-10 text-base md:text-lg font-light leading-relaxed text-white/60"
          >
            <p className="text-white/80 text-xl md:text-2xl leading-snug text-center">
              Vertx Drone Entity was founded by <strong className="text-white font-medium">Fahad Ahmed</strong> and <strong className="text-white font-medium">Sharvesh Logan</strong>, two entrepreneurs driven by a shared vision to transform the future of live entertainment.
            </p>
              
            <div className="h-px w-12 bg-border mx-auto" />

            <p>
              With a passion for creativity, technology, and large-scale visual storytelling, the founders launched VertX to deliver world-class aerial experiences that blend precision engineering with artistic performance. Their mission is to redefine celebrations, brand activations, public events, and cultural experiences using synchronized drone light shows that are safe, sustainable, and unforgettable.
            </p>
              
            <p>
              <strong className="text-white font-medium">Fahad</strong> brings strategic leadership and operational vision, while <strong className="text-white font-medium">Sharvesh</strong> contributes creative direction, technology execution, and experience design. Together, they are building VertX into a leading name in next-generation entertainment, creating immersive sky-based experiences for brands, festivals, weddings, government events, and large public gatherings.
            </p>

            <div className="mt-8 rounded-lg border border-primary/30 bg-primary/5 p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
              <p className="relative z-10 text-primary font-medium italic text-lg md:text-xl">
                "At its core, VertX represents innovation, imagination, and the belief that the sky is no longer the limit."
              </p>
            </div>
          </motion.div>
        </div> */}

      </div>
    </section>
  );
}
