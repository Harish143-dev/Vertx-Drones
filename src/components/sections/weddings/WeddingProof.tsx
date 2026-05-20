import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import imgEternal from "@/assets/images/portfolio/eternal-vows.webp";

const ORANGE = "#F97316";

const proofs = [
  {
    title: "HNI Wedding",
    location: "Hyderabad",
    drones: "100 to 150 drones",
    details: "Personalized aerial story for the couple",
    image: imgEternal,
  },
];

export function WeddingProof() {
  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white">
              Wedding Drone Shows<br />We Have Delivered
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
          >
            See all our work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {proofs.map((proof, index) => (
            <motion.article
              key={proof.location}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group flex flex-col bg-[#111] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-400 overflow-hidden rounded-lg"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={proof.image}
                  alt={`VertX wedding drone show ${proof.location}`}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                {/* Drone Count Badge */}
                {proof.drones && (
                  <div className="absolute top-4 right-4 z-20 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 flex items-center gap-2 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--tw-colors-primary)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      {proof.drones}
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
                  Wedding Show
                </p>
                <h3 className="text-lg font-bold text-white leading-snug mb-1 group-hover:text-[#F97316] transition-colors">
                  {proof.title}
                </h3>
                <p className="text-[13px] font-light text-white/50 leading-relaxed line-clamp-3 mb-3 flex-grow">
                  {proof.details}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto pt-4 border-t border-white/[0.05]">
                  <span className="flex items-center gap-1.5 text-[10px] text-white/45">
                    <MapPin size={10} style={{ color: ORANGE }} />
                    {proof.location}
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
