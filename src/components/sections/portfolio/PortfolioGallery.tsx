import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Play, Target, Users, X, Zap } from "lucide-react";

import newyear from "@/assets/images/gallery/newYear.webp"
import drug from "@/assets/images/gallery/drug.webp"
import corporate from "@/assets/images/gallery/hitachi.webp"
import wedding from "@/assets/images/gallery/wedding.webp"

import video100 from "@/assets/videos/gallery/Pondicherry.mp4";
import video200 from "@/assets/videos/showcase/200drones.mp4";
import video300 from "@/assets/videos/showcase/400drones.mp4";
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
  video?: string;
  description: string;
  clientName: string;
  objective: string;
  eventType: string;
  impact: string;
  tall?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "New Year Drone Light Show",
    category: "Festivals",
    drones: "150",
    location: "Pondicherry",
    duration: "10 min",
    image: newyear,
    video: video100,
    description: "A spectacular public celebration for the Pondicherry Government, marking the arrival of the New Year with synchronized aerial displays.",
    clientName: "Pondicherry Government",
    objective: "Public New Year celebration and tourism promotion.",
    eventType: "Public Festival",
    impact: "10,000 people",
    tall: true,
  },
  {
    id: 2,
    title: "Drug Awareness Drone Show",
    category: "Government",
    drones: "50",
    location: "Besant Nagar, Chennai",
    duration: "8 min",
    image: drug,
    video: video200,
    description: "Drive public engagement for a national drug awareness campaign through visual storytelling.",
    clientName: "Narcotics Control Bureau (NCB)",
    objective: "Social Awareness",
    eventType: "Government Event",
    impact: "20,000+ people",
  },
  {
    id: 3,
    title: "Corporate Brand Activation Drone Show",
    category: "Corporate",
    drones: "50",
    location: "Mahabalipuram",
    duration: "10 min",
    image: corporate,
    video: video300,
    description: "A high-impact brand activation for Four Points by Sheraton, showcasing synchronized branding and logo reveals.",
    clientName: "Four Points by Sheraton",
    objective: "Corporate brand visibility and guest engagement.",
    eventType: "Brand Activation",
    impact: "500+ people",
  },
  {
    id: 4,
    title: "Wedding Drone Show",
    category: "Weddings",
    drones: "100-150",
    location: "Hyderabad",
    duration: "8 min",
    image: wedding,
    video: video400,
    description: "A personalized aerial story for a grand wedding in Hyderabad, featuring couple name reveals and cinematic entries.",
    clientName: "Private Wedding",
    objective: "Create a memorable sky moment for a high-profile wedding.",
    eventType: "Wedding Celebration",
    impact: "500 people",
    tall: true,
  },
  {
    id: 5,
    title: "Cultural Fest Drone Show",
    category: "Cultural",
    drones: "100",
    location: "Chennai",
    duration: "10 min",
    image: drug,
    description: "Engage a large student audience during the annual cultural festival with dynamic aerial visuals.",
    clientName: "Sathyabama Institute",
    objective: "Engage student audience",
    eventType: "Educational / Cultural Event",
    impact: "5,000+ people",
  }
];

const categories = ["All", "Government", "Corporate", "Weddings", "Festivals", "Cultural"];

export function PortfolioGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const hoverVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const handleHoverPlay = (index: number, play: boolean) => {
    const video = hoverVideoRefs.current[index];
    if (!video) return;
    if (play) {
      video.currentTime = 0;
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  };

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

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
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-white md:text-5xl">
            Watch our Drone Shows
          </h2>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                onMouseEnter={() => handleHoverPlay(i, true)}
                onMouseLeave={() => handleHoverPlay(i, false)}
                className="group relative cursor-pointer overflow-hidden aspect-[4/3] sm:aspect-[16/9] rounded-lg"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                />

                {project.video && (
                  <video
                    ref={(el) => { hoverVideoRefs.current[i] = el; }}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#0a0a0a]/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {project.video && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md transition-colors group-hover:bg-[#F97316]/90">
                    <Play size={10} fill="currentColor" className="text-white group-hover:text-black" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white group-hover:text-black">Watch</span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
                  <h3 className="mb-2 text-lg font-bold text-white transition-transform duration-500 group-hover:translate-y-[-2px] md:text-xl">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-light text-white/60">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap size={11} />
                      {project.drones}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      {project.impact}
                    </span>
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
              className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden overflow-y-auto rounded-lg border border-white/10 bg-[#0f0f0f]"
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
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    controls
                    autoPlay
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
