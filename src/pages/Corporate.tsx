import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Eye,
  Landmark,
  Megaphone,
  Share2,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import corporateImg from "@/assets/images/use-cases/corporate.png";
import { SEO } from "@/components/SEO";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const audiences = [
  {
    title: "Brands",
    copy: "Launch products, campaigns, and identities with a high-impact public reveal.",
    icon: Sparkles,
  },
  {
    title: "Companies",
    copy: "Turn summits, annual days, and milestone events into executive-grade moments.",
    icon: Building2,
  },
  {
    title: "Agencies",
    copy: "Add a premium outdoor activation layer to campaign, PR, and experiential briefs.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Government Events",
    copy: "Create landmark public shows for destinations, tourism, civic days, and festivals.",
    icon: Landmark,
  },
  {
    title: "Marketing Teams",
    copy: "Build a launch asset that supports awareness, social reach, and brand recall.",
    icon: Megaphone,
  },
];

const corporateReasons = [
  {
    title: "Audience attention",
    copy: "A scheduled sky moment that stops the crowd and gives every guest a reason to look up, record, and share.",
    icon: Users,
  },
  {
    title: "Content velocity",
    copy: "Designed for reels, press photos, launch films, sponsor recaps, and campaign cutdowns from the same live moment.",
    icon: Share2,
  },
  {
    title: "Premium positioning",
    copy: "A high-visibility brand signal that feels innovative, category-leading, and worthy of the scale of the occasion.",
    icon: Trophy,
  },
];

const useCases = [
  {
    title: "Product launches",
    copy: "Reveal logos, product silhouettes, launch dates, and campaign lines in a format built for live audience attention and digital replay.",
    tag: "Launch visibility",
    icon: Sparkles,
  },
  {
    title: "Campaign amplification",
    copy: "Turn the big idea into an aerial sequence that gives agencies, creators, media teams, and guests a clear shareable moment.",
    tag: "Marketing impact",
    icon: Megaphone,
  },
  {
    title: "Corporate milestones",
    copy: "Make annual days, investor nights, summits, and leadership events feel premium without relying on generic stage production.",
    tag: "Premium positioning",
    icon: Building2,
  },
  {
    title: "Government and tourism",
    copy: "Create civic-scale shows for destinations, festivals, public celebrations, and landmark moments that need wide visibility.",
    tag: "Public reach",
    icon: BadgeCheck,
  },
];

const roiPoints = [
  {
    value: "Reach",
    label: "A show designed to leave the venue through audience videos, short-form content, press photos, and campaign recaps.",
  },
  {
    value: "Engagement",
    label: "A live focal point that turns passive attendees into active viewers, recorders, and sharers.",
  },
  {
    value: "PR value",
    label: "A strong visual hook for media coverage, post-event storytelling, internal communications, and stakeholder reports.",
  },
  {
    value: "Brand recall",
    label: "Your identity appears as the headline moment, not just as signage around the venue.",
  },
];

const impactSteps = [
  {
    title: "Before",
    copy: "Use the drone show as the teaser, invite hook, countdown asset, or premium reveal promise.",
  },
  {
    title: "During",
    copy: "Own the highest-attention moment of the night with branded choreography timed to the audience peak.",
  },
  {
    title: "After",
    copy: "Extend the campaign through reels, PR stills, recap films, internal decks, and sponsor reports.",
  },
];

export default function Corporate() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0a] text-foreground font-sans">
      <SEO 
        title="Corporate Drone Shows" 
        description="Elevate your brand with premium drone light shows. Perfect for product launches, corporate milestones, and large-scale marketing activations."
      />
      <Navbar />
      <main>
        <section className="relative min-h-screen overflow-hidden pt-48 md:pt-52">
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
                Brand visibility, built for impact.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.24}
                className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/55 md:text-lg"
              >
                Premium drone shows for brands, companies, agencies, government events, and marketing teams that need visibility, reach, PR value, and audience engagement.
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
                  Plan a Corporate Show
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#050505] py-20">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  Built For
                </p>
                <h2 className="max-w-2xl text-3xl font-light leading-tight md:text-5xl">
                  High-stakes brand moments
                </h2>
              </div>
              <p className="max-w-sm text-sm font-light leading-relaxed text-white/40 md:text-right">
                Clean execution for teams that need more than spectacle: visibility, attention, and marketing value.
              </p>
            </motion.div>

            <div className="grid gap-px border border-white/8 bg-white/8 md:grid-cols-5">
              {audiences.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={index * 0.06}
                    className="min-h-52 bg-[#0a0a0a] p-5 transition-colors duration-300 hover:bg-[#101010]"
                  >
                    <Icon className="mb-8 text-[#F97316]" size={22} />
                    <h3 className="mb-3 text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs font-light leading-relaxed text-white/42">
                      {item.copy}
                    </p>
                  </motion.article>
                );
              })}
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
                Why brands choose it
              </h2>
              <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/42">
                Corporate buyers do not invest only for visuals. They invest because the show creates a marketing asset, a PR angle, and a premium memory around the brand.
              </p>
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
                  Clear show formats for the moments brands, agencies, and public teams need people to notice.
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
                  Attention you can reuse
                </h2>
                <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/42">
                  The show becomes a high-value content engine before, during, and after the event. One live moment creates multiple marketing outputs.
                </p>
              </div>
              <BarChart3 className="hidden text-[#F97316] md:block" size={42} />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-4">
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
                  <p className="mb-3 font-display text-2xl text-white md:text-[1.7rem]">
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

        <section className="bg-[#050505] py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  Marketing Value
                </p>
                <h2 className="max-w-2xl text-3xl font-light leading-tight md:text-5xl">
                  A campaign asset
                </h2>
                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/42">
                  We shape the sequence around what your team needs to communicate: logo, message, launch date, product idea, sponsor visibility, or destination story.
                </p>
              </motion.div>

              <div className="space-y-4">
                {impactSteps.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={index * 0.08}
                    className="grid gap-4 border border-white/8 bg-white/[0.02] p-6 sm:grid-cols-[9rem_1fr]"
                  >
                    <div className="flex items-center gap-3 text-[#F97316]">
                      <Eye size={18} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-sm font-light leading-relaxed text-white/48">
                      {item.copy}
                    </p>
                  </motion.div>
                ))}
              </div>
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
                Ready to own the moment?
              </p>
              <h2 className="mb-8 text-3xl font-light leading-tight md:text-5xl">
                Build your brand show.
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#F97316] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
              >
                Plan a Corporate Show
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
