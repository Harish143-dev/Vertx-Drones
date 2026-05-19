import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import partnerImg from "@/assets/images/partnerHero.png";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

export function PartnerHero() {
  const headline = "Your Clients Want Drone Shows. You Can Offer Them.";
  const description = "Add drone shows to your portfolio without building a production team. You bring the client. We handle everything else.";

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <img
          src={partnerImg}
          alt="Drone show event partnership"
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
            Your Clients Want Drone Shows.<br />
            You Can Offer Them.
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
              <button onClick={handleScrollToForm}>
                Become a Partner
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </button>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
