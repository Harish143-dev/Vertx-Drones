import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

const inclusions = [
  { title: "Concept and Storyboard", copy: "We start with your brief — the event, the story, the feeling you want to create — and build the show concept around it." },
  { title: "Custom Animation and Programming", copy: "Every formation, movement, and transition is programmed from scratch for your show. Nothing is taken off a shelf." },
  { title: "3D Simulation Preview", copy: "After onboarding, you see the full show in 3D before we fly a single drone. You approve it. Then we build it." },
  { title: "All Permits and Permissions", copy: "We handle every airspace clearance and regulatory requirement from start to finish." },
  { title: "Drone Fleet and Equipment", copy: "Full fleet deployment based on your confirmed drone count. Backup drones on site for every show." },
  { title: "On-Site Setup and Crew", copy: "Our operations team arrives two days before the show. Full ground prep, equipment check, site safety confirmation." },
  { title: "Test Flights", copy: "Multiple test flights the day before the show. Every drone verified individually." },
  { title: "Show Execution", copy: "Our pilots and technicians manage the live show from start to finish." }
];

export function SimulatorInclusions() {
  return (
    <section className="bg-[#050505] py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6">
            What Every VertX Drone Show Includes
          </h2>
          <p className="text-sm md:text-base font-light text-white/50 max-w-2xl leading-relaxed">
            No matter the size of your show, every booking includes the following end to end.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {inclusions.map((item, index) => (
            <motion.div 
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={index * 0.05}
              className="rounded-lg bg-card border border-border p-8 flex flex-col hover:border-primary/30 transition-colors"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-primary font-bold text-sm">
                0{index + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{item.title}</h3>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">{item.copy}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/contact">
              Plan Your Show
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
