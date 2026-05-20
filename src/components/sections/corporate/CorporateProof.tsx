import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

import imgFourPoints from "@/assets/images/portfolio/champions-crown.webp";
import imgPondy from "@/assets/images/portfolio/neon-horizons.webp";

const ORANGE = "#F97316";

const proofItems = [
  {
    id: 2,
    category: "Corporate Brand Activation",
    client: "Hitachi",
    drones: "50 drones",
    description: "Deliver synchronized branding and aerial formations for a high-profile corporate event.",
    location: "Mahabalipuram",
    image: imgFourPoints,
  },
  {
    id: 1,
    category: "Government / Public Awareness",
    client: "Narcotics Control Bureau (NCB)",
    drones: "50 drones",
    description: "Drive massive public engagement for a national awareness campaign through visual storytelling.",
    location: "Chennai",
    image: imgPondy,
  },
];

export function CorporateProof() {
  return (
    <section className="bg-[#0a0a0a] py-24 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h2 className="max-w-3xl text-3xl font-light leading-tight md:text-5xl text-white">
            We Have Done It for Brands Like Yours
          </h2>
          <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black shrink-0">
            <Link href="/portfolio">
              See all past shows <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {proofItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group flex flex-col bg-[#111] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-400 overflow-hidden rounded-lg"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.client}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                {/* Drone Count Badge */}
                {item.drones && (
                  <div className="absolute top-4 right-4 z-20 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 flex items-center gap-2 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--tw-colors-primary)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      {item.drones}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow -mt-4 relative z-10">
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.22em] mb-2"
                  style={{ color: ORANGE }}
                >
                  {item.category}
                </p>
                <h3 className="text-lg font-bold text-white leading-snug mb-1 group-hover:text-[#F97316] transition-colors">
                  {item.client}
                </h3>
                <p className="text-[13px] font-light text-white/50 leading-relaxed line-clamp-3 mb-3 flex-grow">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto pt-4 border-t border-white/[0.05]">
                  <span className="flex items-center gap-1.5 text-[10px] text-white/45">
                    <MapPin size={10} style={{ color: ORANGE }} />
                    {item.location}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
