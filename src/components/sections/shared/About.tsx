import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-4">
              The VERTX Standard
            </h2>
            <h3 className="text-3xl md:text-5xl font-light leading-tight mb-8">
              Calm authority on the surface.<br />
              <span className="text-muted-foreground">Barely contained power underneath.</span>
            </h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-6 text-lg">
              We don't just fly drones; we orchestrate light. For over a decade, we have redefined aerial entertainment, transforming night skies into vast, dynamic canvases for the world's most prestigious brands.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed text-lg">
              Our proprietary flight coordination algorithms and ultra-bright LED technology allow for unparalleled precision. When inevitable perfection is required, VERTX delivers.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square relative overflow-hidden glass-panel">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                 <p className="text-3xl md:text-4xl font-light text-white text-center leading-relaxed">
                   "Like watching a Nolan film open — quiet, precise, and overwhelming at the right moment."
                 </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-primary/30" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-primary/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
