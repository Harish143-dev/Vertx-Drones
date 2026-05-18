import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const DroneIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-primary"
  >
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M8 8l-3 -3" />
    <path d="M16 8l3 -3" />
    <path d="M8 16l-3 3" />
    <path d="M16 16l3 3" />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
    <circle cx="19" cy="5" r="1" fill="currentColor" />
    <circle cx="5" cy="19" r="1" fill="currentColor" />
    <circle cx="19" cy="19" r="1" fill="currentColor" />
  </svg>
);

export function PartnerTiers() {
  return (
    <section className="bg-background py-24 md:py-32 border-y border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >

            <h2 className="mb-6 text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Become an Official Partner
            </h2>
            <p className="text-sm md:text-base font-light leading-relaxed text-white/50 max-w-xl">
              Get listed on vertxdroneshow.in as an official partner. Co-branded collateral, joint marketing, priority booking for your clients, and access to VertX show assets for your own promotions.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.1}
            className="flex flex-col gap-6 lg:border-l lg:border-border lg:pl-16"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                <DroneIcon size={16} />
              </div>
              <div>
                <h4 className="mb-1 text-base md:text-lg font-semibold text-foreground">Co-branded Collateral</h4>
                <p className="text-sm font-light text-white/50">Custom marketing materials to help you sell.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                <DroneIcon size={16} />
              </div>
              <div>
                <h4 className="mb-1 text-base md:text-lg font-semibold text-foreground">Priority Booking</h4>
                <p className="text-sm font-light text-white/50">Secure dates for your clients before the calendar fills up.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                <DroneIcon size={16} />
              </div>
              <div>
                <h4 className="mb-1 text-base md:text-lg font-semibold text-foreground">Exclusive Margins</h4>
                <p className="text-sm font-light text-white/50">Industry-leading commission rates and volume incentives.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                <DroneIcon size={16} />
              </div>
              <div>
                <h4 className="mb-1 text-base md:text-lg font-semibold text-foreground">Protected Territory</h4>
                <p className="text-sm font-light text-white/50">Dedicated region mapping and client protection protocols.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
