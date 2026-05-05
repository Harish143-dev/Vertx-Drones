import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import image1 from "@/assets/images/drone-diamond.png";
import image2 from "@/assets/images/drone-logo.png";
import image3 from "@/assets/images/drone-constellation.png";

const showcases = [
  { image: image1, title: "Geometric Precision", category: "Corporate Summit" },
  { image: image2, title: "Brand Activation",    category: "Product Launch"   },
  { image: image3, title: "Stellar Choreography",category: "Cultural Festival"},
];

const ORANGE = "#F97316";

export function Showcase() {
  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ORANGE }}>
              Our Work
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">A Few of Our Shows</h2>
          </div>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 group shrink-0"
            style={{ color: ORANGE }}
          >
            View Full Portfolio
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showcases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer bg-[#111]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: ORANGE }}>
                  {item.category}
                </p>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
