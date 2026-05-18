import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { fadeUp } from "@/lib/motion";

export function WeddingCTA() {
  return (
    <section className="relative border-t border-border bg-[#050505] py-28 md:py-40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-6 text-3xl md:text-5xl font-light leading-tight tracking-tight">
            Your Wedding<br />Deserves the Sky
          </h2>
          <p className="mb-12 text-sm md:text-base font-light text-white/50 leading-relaxed">
            Tell us your story. We will show you what it looks like in the sky.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/contact">
                Design Your Wedding Show
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group w-full sm:w-auto border-white/20 text-white hover:border-[#25D366] hover:text-[#25D366] hover:bg-transparent shadow-none">
              <a
                href="https://wa.me/917358598707"
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
