import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HomeContact() {
  return (
    <section className="py-24 bg-[#0a0a0a]" id="contact">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl font-light leading-tight mb-6">
            Let's Light Up the Sky Together
          </h2>
          <p className="text-white/60 mb-10">
            Ready to create an unforgettable experience? Get in touch with our team to discuss your next event.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Plan Your Show
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
