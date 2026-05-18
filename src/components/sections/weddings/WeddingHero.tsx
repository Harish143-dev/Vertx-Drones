import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import weddingImg from "@/assets/images/use-cases/weddings.png";

export function WeddingHero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src={weddingImg}
          alt="VertX wedding drone show India couple celebration"
          className="h-full w-full object-cover opacity-45 mix-blend-luminosity"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-end flex-1 pb-10 md:pb-16 pt-28">
        <div className="max-w-3xl">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.15}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white mb-4"
          >
            Make Your Celebration Unforgettable
          </motion.h1>
          
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mb-8 max-w-xl text-sm md:text-base font-light leading-relaxed text-white/70"
          >
            The sky above your wedding has a story to tell. We help you tell it.
          </motion.p>
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.45}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Design Your Wedding Show
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
