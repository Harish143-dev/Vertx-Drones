import { motion } from "framer-motion";
import {
  ExpandingCards,
  type CardItem,
} from "@/components/ui/expanding-cards";
import corporateImg from "../../../assets/images/use-cases/corporate.webp";
import weddingsImg from "../../../assets/images/use-cases/weddings.webp";
import festivalsImg from "../../../assets/images/use-cases/festivals.webp";
import sportsImg from "../../../assets/images/use-cases/sports.webp";

const useCases: CardItem[] = [
  {
    id: "corporate-events",
    title: "Corporate Events",
    description:
      "Corporate drone shows work best for brand launches, product reveals, and company celebrations. Shows your audience films and shares before the evening is over.",
    imgSrc: corporateImg,
    linkHref: "/corporate",
  },
  {
    id: "weddings",
    title: "Weddings",
    description:
      "Wedding drone shows in India are now a fixture at HNI weddings. Couple name reveals, grand entries, formations personalized to the couple. Guests bring it up at the next family gathering.",
    imgSrc: weddingsImg,
    linkHref: "/weddings",
  },
  {
    id: "festivals",
    title: "National Celebrations and Festivals",
    shortTitle: "Festivals",
    description:
      "Large-scale public shows synced to music, lights, and live performances.",
    imgSrc: festivalsImg,
    linkHref: "/portfolio",
  },
  {
    id: "sports-events",
    title: "Sports Events",
    shortTitle: "Sports",
    description:
      "Pre-match spectacles and championship reveals that set the tone before a single game is played.",
    imgSrc: sportsImg,
    linkHref: "/portfolio",
  },
];

export function Services() {
  return (
    <section id="use-cases" className="bg-[#0a0a0a] py-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="text-3xl leading-tight md:text-5xl">
              Drone Shows for Every Event
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <ExpandingCards items={useCases} defaultActiveIndex={0} />
        </motion.div>
      </div>
    </section>
  );
}
