import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Play, Target, Users, X, Zap } from "lucide-react";

import imgSkyline from "@/assets/images/portfolio/skyline-symphony.png";
import imgEternal from "@/assets/images/portfolio/eternal-vows.png";
import imgRhythm from "@/assets/images/portfolio/rhythm-of-light.png";
import imgVictory from "@/assets/images/portfolio/victory-formation.png";
import imgHeritage from "@/assets/images/portfolio/heritage-glow.png";
import imgNeon from "@/assets/images/portfolio/neon-horizons.png";
import imgStarlight from "@/assets/images/portfolio/starlight-romance.png";
import imgBeats from "@/assets/images/portfolio/beats-from-above.png";
import imgChampions from "@/assets/images/portfolio/champions-crown.png";
import imgTemple from "@/assets/images/portfolio/temple-of-light.png";

import video100 from "@/assets/videos/showcase/100drones.mp4";
import video200 from "@/assets/videos/showcase/200drones.mp4";
import video300 from "@/assets/videos/showcase/300drones.mp4";
import video400 from "@/assets/videos/showcase/400drones.mp4";

const ORANGE = "#F97316";

interface Project {
  id: number;
  title: string;
  category: string;
  drones: string;
  location: string;
  duration: string;
  image: string;
  description: string;
  clientName: string;
  objective: string;
  eventType: string;
  impact: string;
  tall?: boolean;
}

const videoHighlights = [
  {
    title: "400 Drone Formation",
    label: "Formation Highlight",
    video: video400,
    meta: "Large-format reveal sequences",
  },
  {
    title: "300 Drone Choreography",
    label: "Show Highlight",
    video: video300,
    meta: "Logo, symbol, and story moments",
  },
  {
    title: "200 Drone Celebration",
    label: "Event Highlight",
    video: video200,
    meta: "Compact shows with crisp impact",
  },
  {
    title: "100 Drone Moment",
    label: "Entry Formation",
    video: video100,
    meta: "High-retention social clips",
  },
];

const projects: Project[] = [
  {
    id: 1,
    title: "Skyline Symphony",
    category: "Corporate",
    drones: "2,500",
    location: "Mumbai",
    duration: "12 min",
    image: imgSkyline,
    description:
      "A grand corporate summit opening featuring geometric precision choreography over the Mumbai skyline, synchronized to a live orchestra.",
    clientName: "Axis Tech Summit",
    objective: "Open the summit with a premium brand reveal visible across the venue.",
    eventType: "Corporate Launch",
    impact: "2,500 drones, 12-minute show, 18M+ estimated social impressions.",
    tall: true,
  },
  {
    id: 2,
    title: "Eternal Vows",
    category: "Weddings",
    drones: "500",
    location: "Udaipur",
    duration: "8 min",
    image: imgEternal,
    description:
      "An intimate lakeside celebration where drones painted interlocking hearts and the couple's monogram across the Rajasthani sky.",
    clientName: "Private Destination Wedding",
    objective: "Create a personal sky moment for the couple's finale.",
    eventType: "Wedding Celebration",
    impact: "500 drones, custom monogram sequence, 1,200+ guests engaged.",
  },
  {
    id: 3,
    title: "Rhythm of Light",
    category: "Festivals",
    drones: "3,000",
    location: "Delhi",
    duration: "15 min",
    image: imgRhythm,
    description:
      "A massive music festival finale with sound-reactive formations dancing to live beats, witnessed by 50,000+ attendees.",
    clientName: "Northstage Music Festival",
    objective: "Deliver a closing act that matched the live headliner energy.",
    eventType: "Music Festival",
    impact: "3,000 drones, 50,000+ live audience, 15-minute finale.",
    tall: true,
  },
  {
    id: 4,
    title: "Victory Formation",
    category: "Sports",
    drones: "1,500",
    location: "Bangalore",
    duration: "10 min",
    image: imgVictory,
    description:
      "A high-energy half-time spectacle at a championship match, with drones recreating iconic sporting moments and team crests.",
    clientName: "Premier League Finals",
    objective: "Turn half-time into a televised celebration moment.",
    eventType: "Sports Ceremony",
    impact: "1,500 drones, team crest reveal, 35,000+ stadium audience.",
  },
  {
    id: 5,
    title: "Heritage Glow",
    category: "Cultural",
    drones: "2,000",
    location: "Jaipur",
    duration: "14 min",
    image: imgHeritage,
    description:
      "A cultural celebration where drones formed a majestic peacock above the Pink City, honouring Rajasthan's royal heritage.",
    clientName: "Jaipur Heritage Council",
    objective: "Celebrate regional identity through culturally rooted formations.",
    eventType: "Cultural Festival",
    impact: "2,000 drones, 14-minute heritage story, 75,000+ public spectators.",
  },
  {
    id: 6,
    title: "Neon Horizons",
    category: "Corporate",
    drones: "1,800",
    location: "Hyderabad",
    duration: "11 min",
    image: imgNeon,
    description:
      "A tech product launch that transformed the Hyderabad skyline into a futuristic canvas, showcasing cutting-edge brand storytelling.",
    clientName: "NeonGrid Technologies",
    objective: "Launch a new product line with a futuristic sky narrative.",
    eventType: "Product Launch",
    impact: "1,800 drones, 4 product formations, 9M+ campaign views.",
    tall: true,
  },
  {
    id: 7,
    title: "Starlight Romance",
    category: "Weddings",
    drones: "400",
    location: "Goa",
    duration: "7 min",
    image: imgStarlight,
    description:
      "A beachside wedding surprise where drones traced constellations and shooting stars over the Arabian Sea at sunset.",
    clientName: "Private Beach Wedding",
    objective: "Create a romantic reveal timed to the sunset ceremony.",
    eventType: "Wedding Surprise",
    impact: "400 drones, 7-minute surprise, 600+ guests on-site.",
  },
  {
    id: 8,
    title: "Beats from Above",
    category: "Festivals",
    drones: "2,500",
    location: "Pune",
    duration: "13 min",
    image: imgBeats,
    description:
      "An EDM festival headliner where drones became a living equaliser, pulsing in sync with DJ sets for a crowd of 30,000.",
    clientName: "PulseWave EDM",
    objective: "Build a high-tempo aerial equalizer for the headline set.",
    eventType: "Music Festival",
    impact: "2,500 drones, 30,000+ crowd, synchronized to 6 music cues.",
  },
  {
    id: 9,
    title: "Champion's Crown",
    category: "Sports",
    drones: "1,200",
    location: "Chennai",
    duration: "9 min",
    image: imgChampions,
    description:
      "A championship ceremony that crowned the victors with a giant luminous trophy formation visible across the entire city.",
    clientName: "Champions Cup Ceremony",
    objective: "Create a victory moment for broadcast and fan celebration.",
    eventType: "Sports Finale",
    impact: "1,200 drones, trophy formation, 22,000+ stadium audience.",
    tall: true,
  },
  {
    id: 10,
    title: "Temple of Light",
    category: "Cultural",
    drones: "3,500",
    location: "Varanasi",
    duration: "18 min",
    image: imgTemple,
    description:
      "Our grandest cultural show, with a lotus flower and sacred symbols illuminating the Ganges ghats during a spiritual festival, witnessed by millions.",
    clientName: "Varanasi Festival Committee",
    objective: "Design a respectful spiritual spectacle for a large public gathering.",
    eventType: "Cultural Festival",
    impact: "3,500 drones, 18-minute sequence, 1M+ public and broadcast reach.",
  },
  {
    id: 11,
    title: "New Year Drone Light Show",
    category: "Festivals",
    drones: "150",
    location: "Pondicherry",
    duration: "15 min",
    image: imgBeats,
    description: "A spectacular public celebration for the Pondicherry Government, marking the arrival of the New Year with synchronized aerial displays.",
    clientName: "Pondicherry Government",
    objective: "Public New Year celebration and tourism promotion.",
    eventType: "Public Festival",
    impact: "150 drones, 15-minute show, thousands of live spectators.",
  },
  {
    id: 12,
    title: "Corporate Brand Activation",
    category: "Corporate",
    drones: "50",
    location: "Bangalore",
    duration: "10 min",
    image: imgChampions,
    description: "A high-impact brand activation for Four Points by Sheraton, showcasing synchronized branding and logo reveals.",
    clientName: "Four Points by Sheraton",
    objective: "Corporate brand visibility and guest engagement.",
    eventType: "Brand Activation",
    impact: "50 drones, precision logo formations, executive guest reach.",
  },
  {
    id: 13,
    title: "Wedding Drone Show",
    category: "Weddings",
    drones: "100-150",
    location: "Hyderabad",
    duration: "8 min",
    image: imgNeon,
    description: "A personalized aerial story for a grand wedding in Hyderabad, featuring couple name reveals and cinematic entries.",
    clientName: "Private Wedding",
    objective: "Create a memorable sky moment for a high-profile wedding.",
    eventType: "Wedding Celebration",
    impact: "150 drones, custom monogram reveal, grand entry sequence.",
    tall: true,
  },
];

const categories = ["All", "Corporate", "Weddings", "Festivals", "Sports", "Cultural"];

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Deep linking to project via query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project");
    if (projectId) {
      const project = projects.find((p) => p.id === Number(projectId));
      if (project) {
        setSelectedProject(project);
      }
    }
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio-gallery" className="bg-[#0a0a0a] py-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
            Visual Gallery
          </p>
          <h2 className="max-w-3xl text-3xl font-light leading-tight md:text-5xl">
            Video-first proof of formation, scale, and show control.
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/45">
            Formation highlights come first because movement builds trust faster than stills.
            Each project below then breaks the work into clear case-study details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mb-20 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {videoHighlights.map((highlight) => (
            <article
              key={highlight.title}
              className="group relative min-h-[360px] overflow-hidden border border-white/8 bg-white/[0.02]"
            >
              <video
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
                src={highlight.video}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/35 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F97316] text-[#0a0a0a]">
                <Play size={16} fill="currentColor" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p
                  className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em]"
                  style={{ color: ORANGE }}
                >
                  {highlight.label}
                </p>
                <h3 className="text-lg font-bold text-white md:text-xl">{highlight.title}</h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-white/45">
                  {highlight.meta}
                </p>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mb-10">
          <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
            Case Study Format
          </p>
          <h2 className="text-3xl font-light leading-tight md:text-5xl">
            Capability, shown project by project.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className="border px-5 py-2 text-xs font-medium uppercase tracking-widest transition-all duration-300"
              style={{
                background: activeFilter === category ? ORANGE : "transparent",
                color: activeFilter === category ? "#0a0a0a" : "rgba(255,255,255,0.4)",
                borderColor:
                  activeFilter === category ? ORANGE : "rgba(255,255,255,0.08)",
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[320px] lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={`group relative cursor-pointer overflow-hidden ${
                  project.tall ? "row-span-2" : ""
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#0a0a0a]/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute left-4 top-4 z-10">
                  <span
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: ORANGE, color: "#0a0a0a" }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
                  <h3 className="mb-1 text-lg font-bold text-white transition-transform duration-500 group-hover:translate-y-[-4px] md:text-xl">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-light text-white/40">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap size={11} />
                      {project.drones} drones
                    </span>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="pt-4 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                          {project.clientName}
                        </p>
                        <p className="mt-2 text-xs font-light leading-relaxed text-white/55">
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden overflow-y-auto border border-white/10 bg-[#0f0f0f]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center bg-black/60 text-white/70 transition-colors hover:text-white"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>

              <div className="relative aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                <div className="absolute left-4 top-4">
                  <span
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: ORANGE, color: "#0a0a0a" }}
                  >
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <div className="relative z-10 -mt-12 p-6 md:p-8">
                <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
                  {selectedProject.title}
                </h3>
                <p className="mb-8 max-w-2xl text-sm font-light leading-relaxed text-white/50">
                  {selectedProject.description}
                </p>

                <div className="mb-8 grid gap-3 md:grid-cols-2">
                  <div className="border border-white/8 bg-white/[0.02] p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
                      Client Name
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {selectedProject.clientName}
                    </p>
                  </div>
                  <div className="border border-white/8 bg-white/[0.02] p-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
                      Event Type
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {selectedProject.eventType}
                    </p>
                  </div>
                  <div className="border border-white/8 bg-white/[0.02] p-4">
                    <div className="mb-2 flex items-center gap-2 text-white/30">
                      <Target size={13} style={{ color: ORANGE }} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                        Objective
                      </p>
                    </div>
                    <p className="text-sm font-light leading-relaxed text-white/60">
                      {selectedProject.objective}
                    </p>
                  </div>
                  <div className="border border-white/8 bg-white/[0.02] p-4">
                    <div className="mb-2 flex items-center gap-2 text-white/30">
                      <Users size={13} style={{ color: ORANGE }} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em]">
                        Impact
                      </p>
                    </div>
                    <p className="text-sm font-light leading-relaxed text-white/60">
                      {selectedProject.impact}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                      <Zap size={14} style={{ color: ORANGE }} />
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {selectedProject.drones}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">
                      Drone Count
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                      <Clock size={14} style={{ color: ORANGE }} />
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {selectedProject.duration}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">
                      Duration
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                      <MapPin size={14} style={{ color: ORANGE }} />
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {selectedProject.location}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30">
                      Location
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
