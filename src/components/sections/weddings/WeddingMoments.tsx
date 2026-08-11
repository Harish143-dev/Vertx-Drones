import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import imgEternal from "@/assets/new-portfolio/20. Couple Name Reveals.webp";
import imgStarlight from "@/assets/new-portfolio/21. Proposal Moments.webp";
import imgRhythm from "@/assets/new-portfolio/22.Storytelling in the Sky.webp";
import weddingImg from "@/assets/new-portfolio/23. Grand Wedding Entries.webp";

const moments = [
  {
    title: "Couple Name Reveals",
    copy: "Your names, written in light, a hundred drones high. The formation locks. The crowd erupts. That moment is not planned — it just happens. And it happens on video, from every phone in the venue, all at once.",
    image: imgEternal,
    alt: "Wedding drone show couple name reveal India",
  },
  {
    title: "Proposal Moments",
    copy: "You have planned everything else. The location, the ring, the words. A drone show above the moment makes it the one she talks about for the rest of her life. And shares the next morning.",
    image: imgStarlight,
    alt: "Drone show proposal moment India",
  },
  {
    title: "Storytelling in the Sky",
    copy: "Where you met. A date that matters. Your two families, your two cities, a shared inside reference — told through formations in the night sky. Every animation is custom-designed for your brief. No two shows are the same.",
    image: imgRhythm,
    alt: "Custom wedding drone show storytelling India",
  },
  {
    title: "Grand Wedding Entries",
    copy: "Walk in under 150 drones spelling your name as the music builds. Not every couple gets that entrance. Yours can.",
    image: weddingImg,
    alt: "Grand wedding entry drone show India",
  },
];

export function WeddingMoments() {
  return (
    <section className="bg-background pb-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 text-start"
        >
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight">Moments That Stay Forever</h2>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32">
          {moments.map((moment, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={moment.title} className="grid items-center gap-12 md:grid-cols-2 lg:gap-24">
                {/* Image Block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-card ${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                  <img
                    src={moment.image}
                    alt={moment.alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Sharp corner accents */}
                  <div className="absolute -left-px -top-px h-4 w-4 border-l border-t border-primary" />
                  <div className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-primary" />
                </motion.div>

                {/* Text Block */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={isEven ? 'md:order-2' : 'md:order-1'}
                >
                  <div className="mb-6 inline-flex h-12 w-12 rounded-lg items-center justify-center border border-primary/20 bg-primary/5 text-primary">
                    <span className="text-sm font-bold">0{index + 1}</span>
                  </div>
                  <h3 className="mb-6 text-2xl md:text-4xl font-light leading-tight">{moment.title}</h3>
                  <p className="text-sm md:text-base font-light leading-relaxed text-white/50">
                    {moment.copy}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
