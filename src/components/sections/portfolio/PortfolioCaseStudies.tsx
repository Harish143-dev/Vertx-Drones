import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

import imgDrugCS from "@/assets/new-portfolio/10. Drug Awareness Drone Show.webp";
import imgHitachiCS from "@/assets/new-portfolio/11. Hitachi Corporate Brand Activation.webp";
import imgWeddingCS from "@/assets/new-portfolio/12. Wedding Drone Show.webp";
import imgCulturalCS from "@/assets/new-portfolio/13. Cultural Fest Show.webp";
import imgPoliticalCS from "@/assets/new-portfolio/14. Political Campaign Show.webp";
import imgNewYearCS from "@/assets/new-portfolio/15. Public New Year Celebration.webp";

const ORANGE = "#F97316";

const caseStudies = [
  {
    id: 1,
    title: "Drug Awareness Initiative",
    client: "Narcotics Control Bureau (NCB)",
    objective: "Drive public engagement for a national drug awareness campaign through visual storytelling",
    droneCount: "50",
    eventType: "Government / Social Awareness",
    location: "Besant Nagar, Chennai",
    impact: "20,000+ people reached",
    image: imgDrugCS,
  },
  {
    id: 2,
    title: "Corporate Brand Activation",
    client: "Hitachi",
    objective: "Deliver synchronized branding and aerial formations for a corporate event",
    droneCount: "50",
    eventType: "Corporate Event",
    location: "Mahabalipuram",
    impact: "500+ people attended",
    image: imgHitachiCS,
  },
  {
    id: 3,
    title: "Wedding Drone Show",
    client: "Private (HNI Wedding)",
    objective: "Personalized aerial story for the couple — name reveal, entry formations, and celebration",
    droneCount: "100 to 150",
    eventType: "Wedding",
    location: "Hyderabad and Karnataka",
    impact: "500 guests",
    image: imgWeddingCS,
  },
  {
    id: 4,
    title: "Cultural Fest Show",
    client: "Sathyabama Institute of Science and Technology",
    objective: "Engage a large student audience during the annual cultural festival with dynamic aerial visuals",
    droneCount: "100",
    eventType: "Educational / Cultural Event",
    location: "Chennai",
    impact: "5,000+ students and faculty",
    image: imgCulturalCS,
  },
  {
    id: 5,
    title: "Political Campaign Show",
    client: "Political Campaign",
    droneCount: "150",
    eventType: "Government / Political",
    objective: "Bring stories, symbols, and campaign spirit to life through a synchronized drone light show experience",
    location: "Panakudi, Tamil Nadu",
    image: imgPoliticalCS,
  },
  {
    id: 6,
    title: "Public New Year Celebration",
    droneCount: "200",
    eventType: "Public Celebration / Entertainment",
    objective: "Create a high-impact visual experience to engage large crowds and celebrate New Year festivities through synchronized drone storytelling",
    location: "Besant Nagar, Chennai",
    impact: "10000+ people",
    image: imgNewYearCS,
  }
];

export function PortfolioCaseStudies() {
  return (
    <section className="bg-[#0a0a0a] py-24 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="max-w-3xl text-3xl font-light leading-tight md:text-5xl text-white">
            Drone Light Shows Delivered Across India
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group flex flex-col bg-[#111] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-400 overflow-hidden rounded-lg"
            >
              {/* Image on top */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                {/* Drone Count Badge */}
                {study.droneCount && (
                  <div className="absolute top-4 right-4 z-20 rounded-full bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 flex items-center gap-2 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--tw-colors-primary)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      {study.droneCount} Drones
                    </span>
                  </div>
                )}
              </div>

              {/* Content below */}
              <div className="p-6 flex flex-col flex-grow -mt-4 relative z-10">
                {study.eventType && (
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.22em] mb-2"
                    style={{ color: ORANGE }}
                  >
                    {study.eventType}
                  </p>
                )}
                <h3 className="text-lg font-bold text-white leading-snug mb-1">
                  {study.title}
                </h3>
                <p className="text-[11px] text-white/35 mb-3">{study.client}</p>
                {study.objective && (
                  <p className="text-[13px] font-light text-white/50 leading-relaxed line-clamp-2">
                    {study.objective}
                  </p>
                )}

                {/* Bottom stats */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto pt-4 border-t border-white/[0.05]">
                  <span className="flex items-center gap-1.5 text-[10px] text-white/45">
                    <MapPin size={10} style={{ color: ORANGE }} />
                    {study.location}
                  </span>
                  {study.impact && (
                    <span className="flex items-center gap-1.5 text-[10px] text-white/45">
                      <Users size={10} style={{ color: ORANGE }} />
                      {study.impact}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
