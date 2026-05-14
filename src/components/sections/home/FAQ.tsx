import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What if my venue is near an airport or a no-fly zone?",
    a: "We assess every location against DGCA airspace classifications before confirming a show. If your venue is near an airport or in a restricted zone, we coordinate with aviation authorities to get the clearances sorted. We have operated in red and yellow zones before. It adds lead time, not a cancellation.",
  },
  {
    q: "Where can a drone show be held?",
    a: "Open fields, stadiums, beaches, rooftops, urban plazas, festival grounds. Most outdoor spaces work. We do a site assessment for every event to confirm the flying zone and the best viewing positions for your audience.",
  },
  {
    q: "How does weather affect a drone show?",
    a: "Light wind and clear skies are ideal. Heavy rain, strong winds, or lightning will ground the show for safety. We postpone within 48 hours and work out rescheduling with you. Weather is tracked closely in the days leading up to every show.",
  },
  {
    q: "Can we combine a drone show with lasers or fireworks?",
    a: "Yes. We can bring in lasers, fireworks, and live music. Each element is choreographed to the drone movements, not just placed alongside them. Tell us at the brief stage and we will design it in from the start.",
  },
  {
    q: "How long is a drone show?",
    a: "Our shows run 15 minutes. That is enough for a full narrative arc with a clear opening, story, and finale, without losing the audience.",
  },
  {
    q: "Are drone shows safe?",
    a: "Every show runs on DGCA-compliant flight plans with real-time failsafe systems. Drones are programmed with return-to-home protocols that activate automatically if any unit loses signal. Crowd safety distances are confirmed during site recce, well before show day.",
  },
  {
    q: "How do I book a drone show?",
    a: "Fill the form below or WhatsApp us directly. Once we understand your event, we will share a concept and a full proposal. No commitment needed at that stage.",
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
          <h2 className="text-3xl md:text-5xl">Questions We Get Asked Most</h2>
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
