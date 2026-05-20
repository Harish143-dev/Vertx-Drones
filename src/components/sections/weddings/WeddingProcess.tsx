import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Plus } from "lucide-react";

export function WeddingProcess() {
  return (
    <section className="border-y border-border bg-[#050505] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight">
              You Focus on the Wedding.<br />
              <span className="text-primary font-normal">We Handle the Rest.</span>
            </h2>
            <p className="mt-6 text-sm md:text-base font-light leading-relaxed text-white/50">
              From the first concept conversation to the moment the sky lights up, our team manages all approvals, choreography, on-site setup, and execution. You give us your story. We build the show around it.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-lg border border-primary/20 bg-background/50 p-10 md:p-14 backdrop-blur-sm"
          >
            {/* Tech Accents */}
            <Plus size={16} className="absolute left-4 top-4 text-primary/50" />
            <Plus size={16} className="absolute bottom-4 right-4 text-primary/50" />

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Scale</p>
                <p className="text-2xl font-light">100 to 1,000 drones</p>
              </div>
              <div className="h-px w-full bg-border" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Duration</p>
                <p className="text-2xl font-light">15 minutes</p>
              </div>
              <div className="h-px w-full bg-border" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Design</p>
                <p className="text-2xl font-light">Designed entirely for your brief</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 pt-8 lg:pt-12 mt-8 lg:mt-12 border-t border-white/10"
          >
            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/70">
              We deliver wedding drone shows across India. <span className="text-white">Hyderabad, Bangalore, Udaipur, Jaipur</span>, and wherever your wedding takes you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
