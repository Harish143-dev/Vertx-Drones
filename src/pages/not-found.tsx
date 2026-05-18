import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { fadeUp } from "@/lib/motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col justify-between overflow-hidden">
      <SEO title="404 - Page Not Found | VertX Drones" />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 lg:pt-40 lg:pb-32 flex items-center justify-center relative">
        {/* Cinematic Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="w-full max-w-lg text-center"
          >
            {/* Branded Icon with soft rotate animation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary shadow-[0_0_30px_rgba(249,115,22,0.15)]"
            >
              <Compass size={36} strokeWidth={1.5} />
            </motion.div>

            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-light leading-none tracking-tight text-white">
              Lost in Space
            </h1>
            
            <p className="mb-10 text-sm md:text-base font-light leading-relaxed text-white/50 max-w-md mx-auto">
              The coordinates you provided do not match any active flight paths. The page you are looking for may have been moved, renamed, or no longer exists.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                <Link href="/">
                  Return to Base
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/15 text-white hover:bg-white/5">
                <Link href="/contact">
                  Contact Flight Support
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
