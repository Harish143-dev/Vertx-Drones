import { motion } from "framer-motion";
import { Radio, Clock, Cpu, Target } from "lucide-react";

export function Highlights() {
  const highlights = [
    { label: "Up to 1,000 Drones", icon: Radio },
    { label: "15-Min Flight Time", icon: Clock },
    { label: "In-House Technology", icon: Cpu },
    { label: "Precision Formations", icon: Target }
  ];

  return (
    <section className="bg-[#0a0a0a] border-b border-white/10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 md:py-8">
          {highlights.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 group justify-center md:justify-start"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#F97316]/50 transition-colors">
                <item.icon size={16} className="text-[#F97316]" />
              </div>
              <span className="text-sm md:text-base text-white/70 font-light tracking-wide">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
