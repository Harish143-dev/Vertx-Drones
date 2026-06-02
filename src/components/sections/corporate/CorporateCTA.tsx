import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { fadeUp } from "@/lib/motion";

const ORANGE = "#F97316";

export function CorporateCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
      <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-4 text-3xl font-light leading-tight md:text-5xl">
            Ready to Make Your Brand Unforgettable?
          </h2>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-white/42">
            Tell us your event. We will tell you exactly what we can build for it.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-8">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/contact">
                Plan a Corporate Show
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group w-full sm:w-auto border-white/20 text-white hover:border-[#25D366] hover:text-[#25D366] hover:bg-transparent shadow-none">
              <a
                href="https://wa.me/917358598707?text=Hi%20VertX!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20drone%20show."
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={15} className="mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
