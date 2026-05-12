import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Sparkles, Star, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import weddingImg from "@/assets/images/use-cases/weddings.png";
import imgEternal from "@/assets/images/portfolio/eternal-vows.png";
import imgStarlight from "@/assets/images/portfolio/starlight-romance.png";
import imgRhythm from "@/assets/images/portfolio/rhythm-of-light.png";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const moments = [
  {
    title: "Couple name reveals",
    copy: "Your names, initials, or wedding hashtag glowing above the venue.",
    icon: Heart,
  },
  {
    title: "Proposal moments",
    copy: "A private question made unforgettable under the open sky.",
    icon: Sparkles,
  },
  {
    title: "Storytelling in the sky",
    copy: "A gentle sequence shaped around your journey together.",
    icon: Star,
  },
  {
    title: "Grand wedding entries",
    copy: "A cinematic arrival moment for families, guests, and cameras.",
    icon: Users,
  },
];

const gallery = [
  { title: "Eternal Vows", image: imgEternal, label: "Name Reveal" },
  { title: "Starlight Romance", image: imgStarlight, label: "Proposal Moment" },
  { title: "Rhythm of Light", image: imgRhythm, label: "Grand Entry" },
];

export default function Weddings() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0a] text-foreground font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-screen overflow-hidden pt-48 md:pt-52">
          <div className="absolute inset-0">
            <img
              src={weddingImg}
              alt="Wedding drone show visual"
              className="h-full w-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/78 via-[#0a0a0a]/42 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/64 to-[#0a0a0a]/10" />

          <div className="container relative z-10 mx-auto flex min-h-[calc(82vh-7rem)] items-center px-6 pb-16 md:px-12">
            <div className="max-w-3xl">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mb-5 text-xs uppercase tracking-[0.32em]"
                style={{ color: ORANGE }}
              >
                Wedding Drone Shows
              </motion.p>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.12}
                className="max-w-3xl text-2xl font-light leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Make Your Celebration Unforgettable
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.24}
                className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/55 md:text-lg"
              >
                A personal sky moment for proposals, weddings, and once-in-a-lifetime celebrations.
              </motion.p>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.36}
                className="mt-9"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-[#F97316] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
                >
                  Design Your Wedding Show
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#0a0a0a] py-24">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-12 max-w-2xl"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                Wedding Moments
              </p>
              <h2 className="text-3xl font-light leading-tight md:text-5xl">
                A memory written above everyone you love.
              </h2>
            </motion.div>

            <div className="grid gap-px border border-white/8 bg-white/8 md:grid-cols-4">
              {moments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={index * 0.08}
                    className="group flex min-h-64 flex-col justify-between bg-[#0a0a0a] p-6 transition-colors duration-300 hover:bg-[#101010]"
                  >
                    <Icon
                      size={24}
                      className="text-white/22 transition-colors duration-300 group-hover:text-[#F97316]"
                    />
                    <div>
                      <h3 className="mb-3 text-lg font-bold leading-tight text-white md:text-xl">
                        {item.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-white/45">
                        {item.copy}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  Celebration Ideas
                </p>
                <h2 className="text-3xl font-light leading-tight md:text-5xl">
                  Soft, personal, cinematic.
                </h2>
              </motion.div>
              <p className="max-w-sm text-sm font-light leading-relaxed text-white/40 md:text-right">
                Your show can be intimate, grand, or quietly emotional. The story stays yours.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {gallery.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={index * 0.08}
                  className="group relative min-h-[420px] overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-72 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/24 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: ORANGE }}>
                      {item.label}
                    </p>
                    <h3 className="text-lg font-bold text-white md:text-xl">{item.title}</h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0a0a0a] py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
          <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto max-w-2xl"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                Your sky moment
              </p>
              <h2 className="mb-8 text-3xl font-light leading-tight md:text-5xl">
                Design a show that feels like you.
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#F97316] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
              >
                Design Your Wedding Show
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
