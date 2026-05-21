import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
        <source src="/hero_section.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />

      {/* Main Content — two-column bottom layout */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-end flex-1 pb-10 md:pb-16 pt-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">

          {/* Left: Title, Description + CTA */}
          <div className="flex flex-col items-start md:max-w-[55%]">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-6 leading-[1.1]"
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

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="text-base md:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg">
                <a href="/contact">Get a Quote</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact?quote=true">Book a Show</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
