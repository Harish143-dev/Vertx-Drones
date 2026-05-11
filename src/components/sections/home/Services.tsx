import { motion } from "framer-motion";
import {
  ExpandingCards,
  type CardItem,
} from "@/components/ui/expanding-cards";
import corporateImg from "../../../assets/images/use-cases/corporate.png";
import weddingsImg from "../../../assets/images/use-cases/weddings.png";
import festivalsImg from "../../../assets/images/use-cases/festivals.png";
import sportsImg from "../../../assets/images/use-cases/sports.png";

const useCases: CardItem[] = [
  {
    id: "corporate-events",
    title: "Corporate Events",
    description:
      "Product launches, annual summits, and executive gatherings elevated with bespoke aerial choreography that reflects your brand identity.",
    imgSrc: corporateImg,
    linkHref: "/corporate",
  },
  {
    id: "weddings",
    title: "Weddings",
    description:
      "Create an unforgettable moment as the sky tells your love story, perfectly timed, deeply personal, and breathtaking for every guest.",
    imgSrc: weddingsImg,
    linkHref: "/weddings",
  },
  {
    id: "festivals",
    title: "Festivals",
    description:
      "From music festivals to cultural celebrations, transform the night sky into a shared experience that unites thousands in a single moment.",
    imgSrc: festivalsImg,
    linkHref: "/portfolio",
  },
  {
    id: "sports-events",
    title: "Sports Events",
    description:
      "Amplify the energy of major sporting events with dramatic aerial formations that energise crowds and create iconic broadcast moments.",
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
          <p
            className="mb-4 text-xs uppercase tracking-[0.3em]"
            style={{ color: "#F97316" }}
          >
            Use Cases
          </p>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="text-3xl leading-tight md:text-5xl">
              Every Occasion,
              <br />
              Lit from Above
            </h2>
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/35 md:text-right">
              Tailored drone shows for events of every scale and occasion.
            </p>
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
