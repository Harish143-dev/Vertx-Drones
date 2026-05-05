import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What if I'm near an airport or no-fly zone?",
    a: "If your location is near an airport or falls within a no-fly zone, don't worry — we'll assess it based on the airspace classification and applicable aviation regulations. We'll manage all necessary permissions and coordinate with aviation authorities to ensure full compliance. Whether near an airport or within a restricted zone, we've got everything covered to make your show safe, legal, and spectacular.",
  },
  {
    q: "Where can I have a drone show?",
    a: "Drone light shows can be hosted in a wide variety of venues — from open fields and stadiums to beaches, rooftops, urban landmarks, and festival grounds. We customize each show to suit the space. We offer site assessments and will guide you in selecting the best location for your event.",
  },
  {
    q: "How does the weather affect a drone show?",
    a: "Light wind and clear skies are ideal, but we can fly in mild conditions. Heavy rain, strong winds, or lightning can cause delays or postponements for safety reasons. We monitor weather forecasts closely and will always keep you updated ahead of time.",
  },
  {
    q: "Can I have lasers or fireworks with a drone show?",
    a: "Yes! We can integrate lasers, fireworks, and even live performances to create a truly immersive experience. These add-ons are carefully coordinated with the drone choreography for maximum visual impact and safety.",
  },
  {
    q: "How long is a drone light show?",
    a: "A typical drone show lasts between 10 to 13 minutes, depending on the number of drones and complexity of the animation. The duration can be customized to suit your event schedule.",
  },
  {
    q: "Are drone light shows safe?",
    a: "Yes. We follow strict safety protocols including pre-show checks, flight path planning, and airspace permissions. Our drones are programmed with failsafe systems to ensure they land safely in any scenario. The entire operation is managed by certified pilots and technicians.",
  },
  {
    q: "What is the process for booking a drone light show?",
    a: "Whether you have a clear concept or simply want to elevate your event, our team is here to help. We handle everything — from show programming and 3D simulations to securing flight permits, preparing equipment, and managing logistics. On event day, our team sets up, conducts pre-flight tests, and delivers a breathtaking performance.",
  },
];

const ORANGE = "#F97316";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ORANGE }}>
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Common Questions</h2>
        </motion.div>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-b border-white/7"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span
                  className="text-sm md:text-base font-medium pr-8 transition-colors duration-200"
                  style={{ color: open === i ? ORANGE : "rgba(255,255,255,0.85)" }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-200"
                  style={{
                    borderColor: open === i ? ORANGE : "rgba(255,255,255,0.1)",
                    color: open === i ? ORANGE : "rgba(255,255,255,0.35)",
                  }}
                >
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-white/45 font-light leading-relaxed pr-12">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
