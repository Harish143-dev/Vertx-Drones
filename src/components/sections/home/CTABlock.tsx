import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const ORANGE = "#F97316";

export function CTABlock() {
  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Orange glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${ORANGE}12 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-center justify-between rounded-lg gap-8 border border-white/7 p-8 md:p-12"
          style={{ background: "rgba(255,255,255,0.015)" }}
        >
          <div className="">
            <h2 className="text-3xl md:text-5xl leading-tight">
              Ready to Light Up the Sky?
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Start Your Drone Show
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="group border-white/20 text-white/70 hover:border-[#25D366] hover:text-[#25D366] hover:bg-transparent shadow-none">
              <a
                href="https://wa.me/917358598707?text=Hi%20VertX!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20drone%20show."
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={15} className="mr-2" />
                WhatsApp quick connect
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
