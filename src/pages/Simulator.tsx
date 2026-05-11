import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Bird, Diamond, Hash, Leaf, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  DroneHeroScene,
  FormationPreviewScene,
  type FormationShape,
} from "@/components/three/DroneModel";

const ORANGE = "#F97316";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const droneCounts = [100, 300, 500, 1000, 1500, 2000];

const shapes = [
  { label: "Logo", icon: Diamond },
  { label: "Bird", icon: Bird },
  { label: "Numbers", icon: Hash },
  { label: "Nature", icon: Leaf },
] satisfies Array<{ label: FormationShape; icon: typeof Diamond }>;

const cameraViews = ["Front", "Wide", "Top"] as const;

export default function Simulator() {
  const [droneCount, setDroneCount] = useState(300);
  const [shape, setShape] = useState<FormationShape>("Logo");
  const [cameraView, setCameraView] = useState<(typeof cameraViews)[number]>("Wide");

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0a0a] text-foreground font-sans">
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-28 md:pt-32">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="absolute inset-y-0 right-[-6%] left-[48%] z-0 hidden md:block">
            <DroneHeroScene cameraView={cameraView} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

          <div className="container relative z-10 mx-auto px-6 pb-24 md:px-12">
            <div className="grid min-h-[calc(100vh-8rem)] gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <p className="mb-5 text-xs uppercase tracking-[0.32em]" style={{ color: ORANGE }}>
                  Show Builder
                </p>
                <h1 className="max-w-3xl text-2xl font-light leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  Preview Your Drone Show
                </h1>
                <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/55 md:text-lg">
                  Test drone count, formation style, and camera angle before turning the idea into a real show.
                </p>
                <Link
                  href="/contact"
                  className="mt-9 inline-flex items-center justify-center gap-3 bg-[#F97316] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
                >
                  Turn This Into a Real Show
                  <ArrowRight size={15} />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.16}
                className="relative min-h-[360px] overflow-hidden md:hidden"
              >
                <DroneHeroScene cameraView={cameraView} />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-[#0a0a0a] py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  Build the Preview
                </p>
                <h2 className="text-3xl font-light leading-tight md:text-5xl">
                  Choose the core show settings.
                </h2>
              </div>
              <SlidersHorizontal className="hidden text-[#F97316] md:block" size={36} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
              <div className="grid gap-4">
                <div className="border border-white/8 bg-white/[0.02] p-6">
                  <p className="mb-5 text-xs uppercase tracking-[0.24em] text-white/35">Drone count</p>
                  <div className="grid grid-cols-3 gap-2">
                    {droneCounts.map((count) => (
                      <button
                        key={count}
                        onClick={() => setDroneCount(count)}
                        className={`border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                          droneCount === count
                            ? "border-[#F97316] bg-[#F97316] text-[#0a0a0a]"
                            : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-white/8 bg-white/[0.02] p-6">
                  <p className="mb-5 text-xs uppercase tracking-[0.24em] text-white/35">Formation shape</p>
                  <div className="grid grid-cols-2 gap-2">
                    {shapes.map((item) => {
                      const Icon = item.icon;
                      const isActive = shape === item.label;
                      return (
                        <button
                          key={item.label}
                          onClick={() => setShape(item.label)}
                          className={`flex items-center justify-between border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                            isActive
                              ? "border-[#F97316] bg-[#F97316]/10 text-[#F97316]"
                              : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {item.label}
                          <Icon size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border border-white/8 bg-white/[0.02] p-6">
                  <p className="mb-5 text-xs uppercase tracking-[0.24em] text-white/35">Camera view</p>
                  <div className="grid gap-2">
                    {cameraViews.map((view) => (
                      <button
                        key={view}
                        onClick={() => setCameraView(view)}
                        className={`border px-4 py-3 text-left text-sm font-bold transition-all duration-300 ${
                          cameraView === view
                            ? "border-[#F97316] bg-[#F97316]/10 text-[#F97316]"
                            : "border-white/8 text-white/45 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden border border-white/8 bg-white/[0.02]">
                <div className="absolute left-5 top-5 z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/30">
                    Live 3D Formation
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {shape === "Numbers" ? `${droneCount} drone count` : `${shape} formation`}
                  </p>
                </div>
                <FormationPreviewScene
                  droneCount={droneCount}
                  shape={shape}
                  cameraView={cameraView}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                  From preview to production
                </p>
                <h2 className="text-3xl font-light leading-tight md:text-5xl">
                  The builder starts the conversation.
                </h2>
              </div>
              <div className="grid gap-px border border-white/8 bg-white/8 md:grid-cols-3">
                {["Concept", "3D simulation", "Flight-ready show"].map((item, index) => (
                  <div key={item} className="bg-[#050505] p-6">
                    <p className="mb-8 font-display text-2xl text-[#F97316]">
                      0{index + 1}
                    </p>
                    <p className="text-lg font-bold text-white">{item}</p>
                    <p className="mt-3 text-sm font-light leading-relaxed text-white/40">
                      {index === 0 && "Share the shape, scale, and mood you want."}
                      {index === 1 && "We refine camera angles, transitions, and timing."}
                      {index === 2 && "The approved show becomes an executable drone program."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0a0a0a] py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
          <div className="container relative z-10 mx-auto px-6 text-center md:px-12">
            <div className="mx-auto max-w-2xl">
              <p className="mb-5 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
                Ready to build it?
              </p>
              <h2 className="mb-8 text-3xl font-light leading-tight md:text-5xl">
                Turn this into a real show.
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#F97316] px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-white"
              >
                Turn This Into a Real Show
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
