import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Megaphone,
  Share2,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import corporateImg from "@/assets/images/use-cases/corporate.png";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const corporateReasons = [
  {
    title: "High engagement",
    copy: "A live moment people stop to record.",
    icon: Users,
  },
  {
    title: "Viral content",
    copy: "Built for reels, press, and recap films.",
    icon: Share2,
  },
  {
    title: "Premium brand positioning",
    copy: "A launch signal that feels category-leading.",
    icon: Trophy,
  },
];

const useCases = [
  {
    title: "Product launches",
    copy: "Reveal logos, products, dates, and campaign messages.",
    tag: "Launch night",
    icon: Sparkles,
  },
  {
    title: "Brand storytelling",
    copy: "Turn a campaign idea into a timed aerial sequence.",
    tag: "Brand film",
    icon: Megaphone,
  },
  {
    title: "Corporate celebrations",
    copy: "Make annual days, milestones, and summits feel premium.",
    tag: "Internal events",
    icon: Building2,
  },
  {
    title: "Government / tourism",
    copy: "Create landmark shows for cities, festivals, and destinations.",
    tag: "Public moments",
    icon: BadgeCheck,
  },
];

const roiPoints = [
  {
    value: "Social reach",
    label: "Short-form moments made to travel.",
  },
  {
    value: "Audience engagement",
    label: "Crowds watch, record, and share.",
  },
  {
    value: "PR value",
    label: "One strong image for press and recaps.",
  },
];

export default function Corporate() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0a] text-foreground font-sans">
      <Navbar />
      <main>
        <section className="relative min-h-[82vh] overflow-hidden pt-28 md:pt-32">
          <div className="absolute inset-0">
            <img
              src={corporateImg}
              alt="Corporate drone show visual"
              className="h-full w-full object-cover opacity-45"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/48 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/10" />

          <div className="container relative z-10 mx-auto flex min-h-[calc(82vh-7rem)] items-center px-6 pb-16 md:px-12">
            <div className="max-w-4xl">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mb-5 text-xs uppercase tracking-[0.32em]"
                style={{ color: ORANGE }}
              >
                Corporate Drone Shows
              </motion.p>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.12}
                className="max-w-4xl text-2xl font-light leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Brand the Sky
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.24}
                className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/55 md:text-lg"
              >
                Drone shows for launches, campaigns, milestones, and public moments.
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
                  Plan Your Brand Show
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#0a0a0a] py-24">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-12 max-w-3xl"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                Why Corporate Drone Shows
              </p>
              <h2 className="text-3xl font-light leading-tight md:text-5xl">
                Why it works
              </h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {corporateReasons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={index * 0.1}
                    className="border border-white/8 bg-white/[0.02] p-6 md:p-8"
                  >
                    <div className="mb-8 flex h-12 w-12 items-center justify-center border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316]">
                      <Icon size={20} />
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-white md:text-xl">{item.title}</h3>
                    <p className="text-sm font-light leading-relaxed text-white/45">
                      {item.copy}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  Use Cases
                </p>
                <h2 className="text-3xl font-light leading-tight md:text-5xl">
                  Where it fits
                </h2>
                <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/40">
                  Clear show formats for the moments brands need people to notice.
                </p>
              </motion.div>

              <div className="grid gap-px border border-white/8 bg-white/8 sm:grid-cols-2">
                {useCases.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={index * 0.08}
                      className="group flex min-h-56 flex-col justify-between bg-[#0a0a0a] p-6 transition-colors duration-300 hover:bg-[#101010]"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/25">
                          {item.tag}
                        </span>
                        <Icon
                          size={22}
                          className="text-white/20 transition-colors duration-300 group-hover:text-[#F97316]"
                        />
                      </div>
                      <div>
                        <h3 className="mb-3 text-lg font-bold leading-tight text-white md:text-xl">
                          {item.title}
                        </h3>
                        <p className="text-sm font-light leading-relaxed text-white/45">
                          {item.copy}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
              className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  ROI Angle
                </p>
                <h2 className="max-w-3xl text-3xl font-light leading-tight md:text-5xl">
                  Measurable impact
                </h2>
              </div>
              <BarChart3 className="hidden text-[#F97316] md:block" size={42} />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {roiPoints.map((item, index) => (
                <motion.div
                  key={item.value}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={index * 0.1}
                  className="border-t border-white/10 pt-6"
                >
                  <p className="mb-3 font-display text-2xl text-white md:text-3xl">
                    {item.value}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-white/45">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#050505] py-28">
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
                Ready for launch?
              </p>
              <h2 className="mb-8 text-3xl font-light leading-tight md:text-5xl">
                Plan your brand show
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#F97316] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
              >
                Plan Your Brand Show
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
