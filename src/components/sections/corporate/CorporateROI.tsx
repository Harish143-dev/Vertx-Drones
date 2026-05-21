import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { BarChart3, Share2, Flame, Newspaper, Zap } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const roiPoints = [
  {
    value: "Social media reach",
    label: "Live events that look spectacular get filmed. A corporate drone show generates organic video content from hundreds of attendees simultaneously. That content travels without any distribution cost to you.",
    icon: Share2,
    number: "01",
  },
  {
    value: "Audience engagement",
    label: "The average drone show holds full audience attention for 15 minutes. No panel, performance, or presentation achieves that reliably at a corporate event. For a brand, that is 15 uninterrupted minutes at peak energy.",
    icon: Flame,
    number: "02",
  },
  {
    value: "PR value",
    label: "A well-executed show for a brand launch or national event gets picked up by event industry publications, local press, and social media news accounts. Your event becomes the reference point other brands point to.",
    icon: Newspaper,
    number: "03",
  },
  {
    value: "Brand differentiation",
    label: "Most Indian events are still running the same format. A drone show for brand activation positions you visibly above the standard playbook. The first brand in your category to do it owns that memory.",
    icon: Zap,
    number: "04",
  },
];

export function CorporateROI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track overall section scroll for the stepper indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.50) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    <section className="bg-background border-t border-border relative" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 relative">

        {/* ================= DESKTOP STICKY STACKING CARDS ================= */}
        <div className="hidden lg:flex items-start gap-16 relative">

          {/* Left Column: Sticky Title & Stepper */}
          <div className="sticky top-0 h-screen w-[42%] flex flex-col justify-center py-20">

            <h2 className="text-3xl lg:text-4xl font-light leading-tight text-foreground mb-5">
              What You Actually<br />Get Out of It
            </h2>
            <p className="text-sm font-light leading-relaxed text-muted-foreground max-w-sm">
              This section answers the one question every brand manager asks before signing off on a large activation.
            </p>

            {/* Vertical Dashboard Timeline Stepper */}
            <div className="relative border-l border-border pl-6 flex flex-col gap-4 mt-10">
              {/* Glowing active timeline accent segment */}
              <div
                className="absolute left-[-1px] top-0 w-[2px] bg-primary transition-all duration-500 ease-[0.22,1,0.36,1] shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                style={{
                  height: `${((activeIndex + 0.3) / 4) * 100}%`,
                  maxHeight: "100%",
                }}
              />

              {roiPoints.map((item, index) => (
                <div
                  key={item.value}
                  className={`text-[11px] lg:text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 ${index === activeIndex ? "text-primary font-bold pl-2" : "text-muted-foreground/50"}`}
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Native Sticky Stacking Cards */}
          <div className="w-[58%] pb-[20vh] pt-[15vh]">
            {roiPoints.map((item, index) => {
              // Calculate dynamic top positioning so they stack like a physical deck
              const stickyTopOffset = `calc(25vh + ${index * 20}px)`;

              return (
                <div
                  key={item.value}
                  className="sticky flex items-start justify-center h-[60vh]"
                  style={{ top: stickyTopOffset }}
                >
                  {/* The Physical Card */}
                  <motion.div
                    className="w-full h-[320px] bg-card border border-border shadow-[0_-15px_50px_rgba(0,0,0,0.85)] p-8 flex flex-col justify-between group overflow-hidden transition-all duration-500 hover:border-primary/40 relative rounded-lg"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <span className="absolute right-8 top-8 select-none text-7xl font-black text-foreground/5 transition-colors duration-500 group-hover:text-foreground/10">
                      {item.number}
                    </span>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]">
                        <item.icon size={22} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-semibold text-card-foreground tracking-tight mb-3">
                        {item.value}
                      </h3>
                      <p className="text-base font-light leading-relaxed text-muted-foreground max-w-[92%]">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= MOBILE / TABLET FALLBACK ================= */}
        <div className="lg:hidden py-24">
          <div className="mb-16 select-none">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
              <BarChart3 size={20} />
            </div>
            <h2 className="text-3xl font-light leading-tight text-foreground mb-4">
              What You Actually Get Out of It
            </h2>
            <p className="text-base font-light leading-relaxed text-muted-foreground">
              This section answers the one question every brand manager asks before signing off.
            </p>
          </div>

          <div className="space-y-6">
            {roiPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.value}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={index * 0.08}
                  className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 flex flex-col justify-between shadow-xl"
                >
                  <span className="text-6xl font-black text-foreground/5 absolute right-6 top-6 select-none pointer-events-none">
                    {item.number}
                  </span>
                  <div className="relative z-10">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center border border-primary/20 bg-primary/10 text-primary rounded-lg">
                      <Icon size={24} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-card-foreground leading-tight">
                      {item.value}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-muted-foreground relative z-10">
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
