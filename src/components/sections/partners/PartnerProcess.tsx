import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const steps = [
  "Apply via the form below",
  "Discovery call with our team",
  "Agreement signed",
  "Start offering drone shows to your clients"
];

export function PartnerProcess() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl font-light leading-tight md:text-5xl">
            How It Works
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-auto md:right-auto md:top-[19px] md:h-px md:w-full md:bottom-auto md:bg-border" />

          <div className="grid gap-12 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="relative flex flex-col md:items-start pl-12 md:pl-0"
              >
                {/* Number Circle */}
                <div className="absolute rounded-lg left-0 top-0 flex h-10 w-10 items-center justify-center border border-primary bg-background text-primary font-bold z-10 md:relative md:mb-6">
                  0{i + 1}
                </div>

                <h3 className="text-lg font-semibold mt-1.5 md:mt-0">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
