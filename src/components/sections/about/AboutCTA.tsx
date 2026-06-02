import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-28 md:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center"
        >
          <h2 className="mb-6 text-3xl md:text-5xl font-light leading-tight tracking-tight text-white">
            Talk to Our Team
          </h2>
          <p className="mb-12 text-sm md:text-base font-light text-white/50 leading-relaxed max-w-xl mx-auto">
            Whether you represent a government body, a corporate brand, or are planning a high-profile wedding, we are ready to build your show.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/contact">
                Get in Touch
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
