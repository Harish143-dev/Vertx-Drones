import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const ORANGE = "#F97316";

export function PortfolioCTA() {
  return (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ORANGE}, transparent 70%)` }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-light leading-tight mb-6">
            Let's design your sky together
          </h2>
          <p className="text-sm md:text-base text-white/40 font-light leading-relaxed mb-10 max-w-lg mx-auto">
            Every show above started with one conversation. Yours can too.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Plan Your Drone Show
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group border-white/20 text-white hover:border-[#25D366] hover:text-[#25D366] hover:bg-transparent shadow-none">
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

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-light text-white/30">
            <Link href="/weddings" className="hover:text-white/70 transition-colors">Wedding Drone Show</Link>
            <span>|</span>
            <Link href="/corporate" className="hover:text-white/70 transition-colors">Corporate Drone Show</Link>
            <span>|</span>
            <Link href="/" className="hover:text-white/70 transition-colors">Drone Light Shows</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
