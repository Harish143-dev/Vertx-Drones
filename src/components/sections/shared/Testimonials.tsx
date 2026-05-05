import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "The sky became an extension of our brand. The precision and scale of the display left our executives speechless. Worth every penny of the investment.",
    author: "Elena Rostova",
    role: "CMO, Nexus Global"
  },
  {
    quote: "VERTX doesn't just provide a service; they deliver an undeniable moment of awe. Our product launch was defined by their aerial choreography.",
    author: "Marcus Chen",
    role: "VP Marketing, Quantum Motors"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-10 glass-panel relative"
            >
              <div className="text-6xl text-primary/20 absolute top-6 left-6 font-serif leading-none">
                "
              </div>
              <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed mb-8 relative z-10 pt-4">
                {item.quote}
              </p>
              <div>
                <div className="font-medium text-white">{item.author}</div>
                <div className="text-sm text-primary uppercase tracking-wider mt-1 font-light">
                  {item.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
