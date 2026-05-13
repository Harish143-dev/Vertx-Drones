import { motion } from "framer-motion";

export function Hero() {

  const headline = "India's Most Advanced Drone Light Shows";
  const description = "Up to 1,000 drones. 15 minutes of synchronized aerial storytelling.";
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/mp_.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />

      {/* Main Content — two-column bottom layout */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-end flex-1 pb-10 md:pb-16 pt-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">

          {/* Left: Title + CTA */}
          <div className="flex flex-col items-start md:max-w-[55%]">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-6 leading-[1.1]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
              }}
            >
              {headline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/contact"
                className="px-8 py-3 bg-[#F97316] text-[#0a0a0a] font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] uppercase tracking-widest text-xs flex items-center justify-center"
              >
              Get a Quote
              </a>
              <a
                href="/contact?quote=true"
                className="px-8 py-3 border border-white/20 text-white font-medium hover:bg-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center"
              >
              Book a Show 
              </a>
            </motion.div>
          </div>

          {/* Right: Description    */}
          { <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="md:max-w-[30%] md:text-right"
          >
            <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
              {description}
            </p>
          </motion.div>}

        </div>
      </div>
    </section>
  );
}
