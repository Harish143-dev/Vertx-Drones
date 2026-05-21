import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import simulatorBg from "@/assets/images/simulatorHero.webp";

interface SimulatorHeroProps {
  cameraView: "Wide" | "Top" | "Front";
}

export function SimulatorHero({ cameraView }: SimulatorHeroProps) {
  const handleScrollToSimulator = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("simulator-tool")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <img
          src={simulatorBg}
          alt="VertX Simulator Background"
          className="h-full w-full object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-end flex-1 pb-10 md:pb-16 pt-28">
        <div className="max-w-3xl">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4 leading-[1.1]"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            See Your Show Before It Flies
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.16}
            className="mb-8 max-w-xl text-base md:text-lg text-white/80 font-light leading-relaxed"
          >
            Pick your drone count. Choose your formations. Watch it come to life before a single drone leaves the ground.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.32}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="group">
              <button onClick={handleScrollToSimulator}>
                Start Designing
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </button>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
