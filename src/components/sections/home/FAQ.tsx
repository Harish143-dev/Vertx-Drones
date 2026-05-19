import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Questions We Get Asked Most
            </h2>
          </div>

          <div className="flex flex-col border-t border-border">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-border">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
                  >
                    <h3 className="text-lg md:text-xl font-medium pr-8">{faq.q}</h3>
                    <ChevronDown 
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-base font-light leading-relaxed text-muted-foreground pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

