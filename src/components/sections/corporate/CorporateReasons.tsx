import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { Target, Share2, Award, Users, Handshake } from "lucide-react";

const corporateReasons = [
  {
    code: "01 // ATTN",
    title: "Full audience attention",
    copy: "A drone show commands complete focus from the first formation. No divided screens, no wandering attention.",
    icon: Target,
  },
  {
    code: "02 // RCH",
    title: "Content your team did not have to produce",
    copy: "A 15-minute show generates hundreds of organic clips across Instagram, WhatsApp, and YouTube. Zero media spend.",
    icon: Share2,
  },
  {
    code: "03 // POS",
    title: "Premium brand positioning",
    copy: "Drone shows are still rare in India. The brands doing them are seen as ahead of the curve. Your competitors are still doing stage setups and LED screens.",
    icon: Award,
  },
  {
    code: "04 // PRD",
    title: "A moment your own people remember",
    copy: "Annual days blend into each other. A drone show that spells your company name across the sky signals investment in the people, not just the product.",
    icon: Users,
  },
  {
    code: "05 // IMP",
    title: "The impression clients take home",
    copy: "A drone show closing with your brand name in the sky is not something a deck can replicate. It is what clients tell people about when they describe doing business with you.",
    icon: Handshake,
  },
];

interface SpotlightCardProps {
  item: typeof corporateReasons[0];
  index: number;
  isExpanded: boolean;
  flexValue?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function SpotlightCard({ item, index, isExpanded, flexValue, onMouseEnter, onMouseLeave }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the spotlight movement
  const springConfig = { damping: 30, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  }

  const Icon = item.icon;
  const cardNumber = item.code.split(" ")[0];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={index * 0.08}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-8 md:p-10 group transition-all duration-500 hover:border-[#F97316]/10 min-w-0 flex flex-col justify-between"
      style={flexValue ? { flex: flexValue } : undefined}
    >
      {/* Background Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at ${smoothX}px ${smoothY}px, rgba(249, 115, 22, 0.07), transparent 80%)`,
        }}
      />

      {/* Faint decorative background number */}
      <span className="absolute right-6 bottom-4 text-7xl md:text-8xl font-light font-mono text-[#F97316]/5 select-none pointer-events-none group-hover:text-[#F97316]/5 transition-colors duration-500">
        {cardNumber}
      </span>

      {/* Content wrapper to stay above spotlight background */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-6 min-w-0">
        <div className="flex flex-col gap-4 min-w-0">


          {/* Title */}
          <h3 className="text-lg md:text-xl font-light tracking-tight text-white group-hover:text-[#F97316] transition-colors duration-300 truncate md:whitespace-normal">
            {item.title}
          </h3>
        </div>

        {/* Copy - Accordion transition */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isExpanded
            ? "max-h-[160px] opacity-100 mt-2"
            : "max-h-0 opacity-0 mt-0"
            }`}
        >
          <p className="text-sm font-light leading-relaxed text-white/40 group-hover:text-white/70 transition-colors duration-500 max-w-xl">
            {item.copy}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function CorporateReasons() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredRow1, setHoveredRow1] = useState<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const row1Items = corporateReasons.slice(0, 3);
  const row2Items = corporateReasons.slice(3, 5);

  return (
    <section className="border-y border-white/5 bg-[#0a0a0a] py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F97316]/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section Heading at the top */}
        <div className="mb-16 md:mb-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >

            <h2 className="text-3xl font-light leading-tight md:text-5xl text-white tracking-tight">
              Why Brands Choose Drone Shows
            </h2>

          </motion.div>
        </div>

        {/* Bento Grid Containers */}
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1: 3 Cards */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {row1Items.map((item, index) => {
              // Calculate expanded state (center card index 1 is default expanded)
              const isExpanded = isDesktop
                ? hoveredRow1 === null
                  ? index === 1
                  : hoveredRow1 === index
                : true;

              // Calculate flex value on desktop
              const flexValue = isDesktop
                ? hoveredRow1 === null
                  ? index === 1
                    ? "2 1 0%"
                    : "1 1 0%"
                  : hoveredRow1 === index
                    ? "2 1 0%"
                    : "1 1 0%"
                : undefined;

              return (
                <SpotlightCard
                  key={item.code}
                  item={item}
                  index={index}
                  isExpanded={isExpanded}
                  flexValue={flexValue}
                  onMouseEnter={() => setHoveredRow1(index)}
                  onMouseLeave={() => setHoveredRow1(null)}
                />
              );
            })}
          </div>

          {/* Row 2: 2 Cards */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {row2Items.map((item, index) => {
              // Row 2 is static half-width cards that don't expand
              const flexValue = isDesktop ? "2 1 0%" : undefined;

              return (
                <SpotlightCard
                  key={item.code}
                  item={item}
                  index={index + 3} // adjust index offset for animations
                  isExpanded={true}
                  flexValue={flexValue}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


