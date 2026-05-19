import { motion, type Variants } from "framer-motion";
import { Users, Tent, Building2, Hotel, Music } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const audiences = [
  { icon: Tent, title: "Event Management" },
  { icon: Users, title: "Wedding Planners" },
  { icon: Building2, title: "Corporate Agencies" },
  { icon: Hotel, title: "Hotels & Resorts" },
  { icon: Music, title: "AV & Production" },
];

export function PartnerAudience() {
  return (
    <section className="border-y border-border bg-card py-24 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-light leading-tight md:text-4xl mx-auto max-w-3xl">
            Who This Is For
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {audiences.map((audience, i) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={audience.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="flex rounded-lg items-center gap-3 border border-border bg-background px-6 py-4 transition-all hover:border-primary/50"
              >
                <Icon size={20} className="text-primary" />
                <span className="text-sm font-semibold">{audience.title}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
