import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How many drones do I actually need?", a: "100 drones is the starting point for a visible, impactful show. 200 gives you more formation complexity. 300 to 500 is when the show fills the full sky and creates a cinema-scale effect. Use the simulator above to see the difference yourself." },
  { q: "What shapes and formations can drones make?", a: "Text, logos, portraits, animals, geometric patterns, abstract animations, and full narrative sequences. If it can be drawn, it can be programmed into a drone formation. Our design team works from your brief." },
  { q: "Can I see the show before the event?", a: "Yes. After onboarding, we build a full 3D simulation of your show for your approval. You see every formation before we fly." },
  { q: "How far in advance do I need to book?", a: "Minimum 20 days. For complex shows or locations requiring additional airspace coordination, 30 to 45 days is ideal." },
  { q: "What happens if the weather is bad on show day?", a: "We monitor weather closely in the days before every show. If conditions are unsafe, we postpone within 48 hours and coordinate rescheduling with you." },
  { q: "What is the minimum drone count for a show?", a: "100 drones is our minimum for a show with real visual impact." }
];

export function SimulatorFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Questions About the Show
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
