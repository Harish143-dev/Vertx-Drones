import { motion } from "framer-motion";
import corporateImg from "../../../assets/images/use-cases/corporate.png";
import weddingsImg from "../../../assets/images/use-cases/weddings.png";
import festivalsImg from "../../../assets/images/use-cases/festivals.png";
import sportsImg from "../../../assets/images/use-cases/sports.png";

const useCases = [
  {
    title: "Corporate Events",
    description: "Product launches, annual summits, and executive gatherings elevated with bespoke aerial choreography that reflects your brand identity.",
    accent: "#F97316",
    image: corporateImg
  },
  {
    title: "Weddings",
    description: "Create an unforgettable moment as the sky tells your love story — perfectly timed, deeply personal, and breathtaking for every guest.",
    accent: "#f43f5e",
    image: weddingsImg
  },
  {
    title: "Festivals",
    description: "From music festivals to cultural celebrations, transform the night sky into a shared experience that unites thousands in a single moment.",
    accent: "#a855f7",
    image: festivalsImg
  },
  {
    title: "Sports Events",
    description: "Amplify the energy of major sporting events with dramatic aerial formations that energise crowds and create iconic broadcast moments.",
    accent: "#FBBF24",
    image: sportsImg
  },
];

export function Services() {
  return (
    <section id="use-cases" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#F97316" }}>
            Use Cases
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Every Occasion,<br />Lit from Above</h2>
            <p className="text-white/35 text-sm font-light max-w-xs md:text-right leading-relaxed">
              Tailored drone shows for events of every scale and occasion.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] flex flex-col justify-end"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300" />
              
              <div className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-20 p-6 md:p-8 transform transition-transform duration-500">
                <div className="flex flex-col items-start">
                  <h3 className="text-2xl font-bold text-white transition-transform duration-500">{item.title}</h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-white/70 font-light leading-relaxed pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
