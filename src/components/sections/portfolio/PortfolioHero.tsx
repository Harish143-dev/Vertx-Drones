import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/images/portfolio.png";

const ORANGE = "#F97316";

export function PortfolioHero() {
  const headline = "Our Work";
  const description = "Every drone light show on this page was designed from scratch for that event, that venue, and that story. Real footage. No demo reels.";

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="VERTX drone show over a city skyline"
          className="h-full w-full object-cover opacity-55"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />

      {/* Main Content — two-column bottom layout */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-end flex-1 pb-10 md:pb-16 pt-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">

          {/* Left: Title + CTA */}
          <div className="flex flex-col items-start md:max-w-[55%]">

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-2 leading-[1.1]"
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
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="mb-8 max-w-xl text-sm md:text-base text-white/80 font-light leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="group">
                <a href="#portfolio-gallery">
                  View Projects
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
