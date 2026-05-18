import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import aboutImg from "@/assets/images/use-cases/corporate.png"; // Placeholder for the best wide aerial shot

export function AboutHero() {
  const headline = "We Build Drone Shows. End to End.";
  const description = "VertX is a drone light show company based in Chennai. We design and execute custom aerial shows for weddings, corporate events, government celebrations, and cultural festivals across India.";

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <img
          src={aboutImg}
          alt="VertX drone light show company India"
          className="h-full w-full object-cover opacity-45"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-end flex-1 pb-10 md:pb-16 pt-28">
        <div className="max-w-3xl">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.12}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white mb-6"
          >
            We Build Drone Shows.<br />
            End to End.
          </motion.h1>
          
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.24}
            className="mb-8 max-w-xl text-sm md:text-base font-light leading-relaxed text-white/80"
          >
            {description}
          </motion.p>
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.36}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="group w-fit">
              <Link href="/contact">
                Talk to Our Team
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
