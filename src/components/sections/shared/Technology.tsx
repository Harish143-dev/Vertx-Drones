import { motion } from "framer-motion";
import { Cpu, Wifi, ShieldCheck, Zap } from "lucide-react";

export function Technology() {
  return (
    <section id="technology" className="py-24 relative bg-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-4">
              Our Technology
            </h2>
            <h3 className="text-3xl md:text-5xl font-light mb-8">
              A symphony of code and hardware
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed text-lg mb-8">
              Our custom-engineered drones are operated by proprietary swarm-logic algorithms, ensuring centimeter-level precision even in challenging meteorological conditions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Wifi, title: "RTK GPS Positioning", desc: "Sub-centimeter accuracy for tight formations." },
                { icon: Zap, title: "Ultra-Bright LEDs", desc: "4000-lumen output visible from miles away." },
                { icon: Cpu, title: "Swarm Logic Engine", desc: "Real-time collision avoidance and routing." },
                { icon: ShieldCheck, title: "Triple Redundancy", desc: "Failsafe systems for absolute event security." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-primary mt-1">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">{feature.title}</h5>
                    <p className="text-sm text-muted-foreground font-light">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative flex items-center justify-center min-h-[400px]">
            {/* Abstract tech visualization */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-primary/20 border-dashed" />
              <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-primary/30" />
              <div className="absolute w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full border border-primary/50" />
            </motion.div>
            
            {/* Glowing center */}
            <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(0,212,255,0.5)]">
              <div className="w-8 h-8 rounded-full bg-primary shadow-[0_0_20px_rgba(0,212,255,1)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
