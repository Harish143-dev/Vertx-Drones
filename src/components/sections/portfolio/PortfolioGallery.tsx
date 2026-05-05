import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Zap, Clock } from "lucide-react";

// Portfolio images
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
  tall?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Skyline Symphony",
    category: "Corporate",
    drones: "2,500",
    location: "Mumbai",
    duration: "12 min",
    image: imgSkyline,
    description: "A grand corporate summit opening featuring geometric precision choreography over the Mumbai skyline, synchronized to a live orchestra.",
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
    description: "An intimate lakeside celebration where drones painted interlocking hearts and the couple's monogram across the Rajasthani sky.",
  },
  {
    id: 3,
    title: "Rhythm of Light",
    category: "Festivals",
    drones: "3,000",
    location: "Delhi",
    duration: "15 min",
    image: imgRhythm,
    description: "A massive music festival finale with sound-reactive formations dancing to live beats, witnessed by 50,000+ attendees.",
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
    description: "A high-energy half-time spectacle at a championship match, with drones recreating iconic sporting moments and team crests.",
  },
  {
    id: 5,
    title: "Heritage Glow",
    category: "Cultural",
    drones: "2,000",
    location: "Jaipur",
    duration: "14 min",
    image: imgHeritage,
    description: "A cultural celebration where drones formed a majestic peacock above the Pink City, honouring Rajasthan's royal heritage.",
  },
  {
    id: 6,
    title: "Neon Horizons",
    category: "Corporate",
    drones: "1,800",
    location: "Hyderabad",
    duration: "11 min",
    image: imgNeon,
    description: "A tech product launch that transformed the Hyderabad skyline into a futuristic canvas, showcasing cutting-edge brand storytelling.",
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
    description: "A beachside wedding surprise where drones traced constellations and shooting stars over the Arabian Sea at sunset.",
  },
  {
    id: 8,
    title: "Beats from Above",
    category: "Festivals",
    drones: "2,500",
    location: "Pune",
    duration: "13 min",
    image: imgBeats,
    description: "An EDM festival headliner where drones became a living equaliser, pulsing in sync with DJ sets for a crowd of 30,000.",
  },
  {
    id: 9,
    title: "Champion's Crown",
    category: "Sports",
    drones: "1,200",
    location: "Chennai",
    duration: "9 min",
    image: imgChampions,
    description: "A championship ceremony that crowned the victors with a giant luminous trophy formation visible across the entire city.",
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
    description: "Our grandest cultural show — a lotus flower and sacred symbols illuminating the Ganges ghats during a spiritual festival, witnessed by millions.",
  },
];

const categories = ["All", "Corporate", "Weddings", "Festivals", "Sports", "Cultural"];

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ORANGE }}>
            Featured Projects
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Every Show, a Masterpiece
          </h2>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-5 py-2 text-xs font-medium uppercase tracking-widest transition-all duration-300 border"
              style={{
                background: activeFilter === cat ? ORANGE : "transparent",
                color: activeFilter === cat ? "#0a0a0a" : "rgba(255,255,255,0.4)",
                borderColor: activeFilter === cat ? ORANGE : "rgba(255,255,255,0.08)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px] md:auto-rows-[320px]"
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
                className={`group relative overflow-hidden cursor-pointer ${
                  project.tall ? "row-span-2" : ""
                }`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/30 to-transparent" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0a0a0a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: ORANGE, color: "#0a0a0a" }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 transition-transform duration-500 group-hover:translate-y-[-4px]">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/40 text-xs font-light">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap size={11} />
                      {project.drones} drones
                    </span>
                  </div>

                  {/* Hover description */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-xs text-white/50 font-light leading-relaxed pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-10 w-full max-w-4xl bg-[#0f0f0f] border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/60 text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Hero Image */}
              <div className="relative aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: ORANGE, color: "#0a0a0a" }}
                  >
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 -mt-12 relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-8 max-w-2xl">
                  {selectedProject.description}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Zap size={14} style={{ color: ORANGE }} />
                      <span className="text-lg font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {selectedProject.drones}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Drones</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Clock size={14} style={{ color: ORANGE }} />
                      <span className="text-lg font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {selectedProject.duration}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Duration</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <MapPin size={14} style={{ color: ORANGE }} />
                      <span className="text-lg font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {selectedProject.location}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Location</p>
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
