import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { CircularCarousel } from "@/components/ui/circular-carousel";

import imgLaunches from "@/assets/images/use-cases/corporate-launches.webp";
import imgBranding from "@/assets/images/use-cases/corporate-branding.webp";
import imgCelebration from "@/assets/images/use-cases/corporate-celebration.webp";
import imgTourism from "@/assets/images/use-cases/corporate-tourism.webp";

const useCases = [
  {
    title: "Product Launches",
    copy: "Your new product deserves more than a stage reveal. A 150-drone formation carrying your product name, logo, and launch message leaves the venue and lands on social feeds the same night.",
    tag: "Launch visibility",
    image: imgLaunches,
  },
  {
    title: "Brand Storytelling",
    copy: "Custom animations tell your brand story in the sky. Color, shape, movement, and music synchronized to your brand identity. Every formation designed specifically for your brief.",
    tag: "Brand identity",
    image: imgBranding,
  },
  {
    title: "Corporate Celebrations",
    copy: "Annual days, milestone events, leadership summits. A drone show turns a routine celebration into a moment people bring up at the next one.",
    tag: "Premium positioning",
    image: imgCelebration,
  },
  {
    title: "Government and Tourism Events",
    copy: "Tourism campaigns, city celebrations, national days. Drone shows for government events are proven at scale. We have delivered shows for the Pondicherry Government and the Narcotics Control Bureau.",
    tag: "Public reach",
    image: imgTourism,
  },
];

export function CorporateUseCases() {
  const carouselItems = useCases.map((item) => ({
    title: item.title,
    subtitle: item.tag,
    description: item.copy,
    src: item.image,
  }));

  return (
    <section className="bg-[#050505] py-24 md:py-32 relative overflow-hidden border-b border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F97316]/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading at the top */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >

            <h2 className="text-3xl font-light leading-tight md:text-5xl text-white tracking-tight max-w-3xl">
              Built for Every Corporate Brief
            </h2>
          </motion.div>
        </div>

        {/* Carousel Component */}
        <div className="flex justify-center items-center">
          <CircularCarousel items={carouselItems} />
        </div>

      </div>
    </section>
  );
}
