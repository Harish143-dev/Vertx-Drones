import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import imgEternal from "@/assets/images/portfolio/eternal-vows.png";
import imgStarlight from "@/assets/images/portfolio/starlight-romance.png";

const proofs = [
  {
    title: "HNI Wedding",
    location: "Hyderabad",
    drones: "100 to 150 drones",
    details: "Personalized aerial story for the couple",
    image: imgEternal,
  },
  {
    title: "HNI Wedding",
    location: "Karnataka",
    drones: "100 to 150 drones",
    details: "Custom formations and couple name reveal",
    image: imgStarlight,
  },
];

export function WeddingProof() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight">Wedding Drone Shows<br />We Have Delivered</h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
          >
            See all our work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {proofs.map((proof, index) => (
            <motion.article
              key={proof.location}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={index * 0.15}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="relative aspect-video w-full overflow-hidden border-b border-border">
                <img
                  src={proof.image}
                  alt={`VertX wedding drone show ${proof.location}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="flex flex-col justify-between p-8 md:p-10 flex-grow">
                <div>
                  <div className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                    <span>{proof.title}</span>
                    <div className="h-1 w-1 bg-primary" />
                    <span>{proof.location}</span>
                  </div>
                  <h3 className="mb-4 text-xl font-light md:text-2xl">{proof.details}</h3>
                  <p className="text-sm font-light text-muted-foreground">{proof.drones}</p>
                </div>
                <div className="mt-5">
                  <Button asChild variant="outline" size="sm" className="group">
                    <Link href="/portfolio">
                      See the show
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
