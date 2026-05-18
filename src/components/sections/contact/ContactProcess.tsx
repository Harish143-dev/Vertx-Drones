import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const steps = [
  {
    title: "We review your brief",
    copy: "Within 24 hours. We look at your event type, date, location, and scale."
  },
  {
    title: "We get on a call",
    copy: "A quick 15-minute conversation to understand your brief and answer your questions."
  },
  {
    title: "We share a concept and proposal",
    copy: "Custom show concept based on your brief. Full proposal with scope and timeline. No commitment needed at this stage."
  }
];

export function ContactProcess() {
  return (
    <section className="bg-card py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 text-start max-w-2xl">

          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-white">
            What Happens After You Submit
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.1}
              className="relative flex flex-col pt-8"
            >
              {/* Top border line */}
              <div className="absolute left-0 top-0 h-px w-full bg-border" />
              {/* Highlight bar */}
              <div className="absolute left-0 top-0 h-px w-1/3 bg-primary" />

              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-primary bg-primary/10 text-primary font-bold text-sm">
                0{i + 1}
              </div>

              <h3 className="mb-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-sm md:text-base font-light leading-relaxed text-white/50">
                {step.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
