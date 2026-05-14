import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" } }),
};

const contactDetails = [
  { label: "General Inquiries", value: "hello@vertx.show", href: "mailto:hello@vertx.show" },
  { label: "Executive Bookings", value: "bookings@vertx.show", href: "mailto:bookings@vertx.show" },
  { label: "Headquarters", value: "Dubai, UAE Â· New York Â· London", href: null },
];

const eventTypes = [
  "Corporate Event", "Brand Activation", "Product Launch",
  "Wedding / Celebration", "Festival / Concert", "Other",
];

export function Contact() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Vertx Drones for your next aerial display. We work with corporate producers, brand directors, and event architects worldwide."
      />
      <Navbar />

      <main className="min-h-screen flex flex-col pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">

          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-16 md:mb-20">
            <p className="text-xs font-medium tracking-[0.3em] text-[#F97316] uppercase mb-4">Get in Touch</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white">
              Let's light<br />
              <span className="text-white/15">your sky.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

            {/* Left â€” info */}
            <div className="space-y-12">
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
                Our executive team works directly with corporate producers, brand directors, and event architects to design shows that become the defining moment of any occasion.
              </motion.p>

              <div className="space-y-8">
                {contactDetails.map((item, i) => (
                  <motion.div key={item.label} variants={fadeUp} initial="hidden" animate="show" custom={2 + i * 0.5}
                    className="border-t border-white/6 pt-6">
                    <p className="text-xs tracking-[0.25em] text-white/25 uppercase mb-2">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-base md:text-lg text-white/70 hover:text-[#F97316] transition-colors duration-300 font-light">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base md:text-lg text-white/70 font-light">{item.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="pt-4">
                <p className="text-xs tracking-[0.25em] text-white/25 uppercase mb-4">Response Time</p>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316] animate-pulse" />
                  <span className="text-white/50 font-light">Executive inquiries answered within 24 hours</span>
                </div>
              </motion.div>
            </div>

            {/* Right â€” form */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1.5}>
              {submitted ? (
                <div className="glass-panel p-12 md:p-16 text-center space-y-6 border border-[#F97316]/15">
                  <div className="w-16 h-16 mx-auto border border-[#F97316]/40 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.5" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-light tracking-wide">Request Received</h3>
                  <p className="text-white/40 font-light">Our executive team will be in touch within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)}
                    className="text-xs tracking-[0.2em] text-[#F97316] uppercase hover:text-white transition-colors">
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form className="glass-panel p-8 md:p-12 space-y-7 border border-white/5"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Full Name" type="text" required />
                    <Field label="Company" type="text" />
                  </div>
                  <Field label="Email Address" type="email" required />
                  <Field label="Phone (optional)" type="tel" />

                  <div className="space-y-3">
                    <label className="block text-xs font-medium tracking-[0.25em] text-white/30 uppercase">Event Type</label>
                    <div className="flex flex-wrap gap-2">
                      {eventTypes.map((type) => (
                        <button key={type} type="button"
                          onClick={() => setSelected(type === selected ? null : type)}
                          className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all duration-200 ${
                            selected === type
                              ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10 shadow-[0_0_12px_rgba(249,115,22,0.15)]"
                              : "border-white/8 text-white/35 hover:border-white/20 hover:text-white/60"
                          }`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium tracking-[0.25em] text-white/30 uppercase">Tell us about your event</label>
                    <textarea rows={5} placeholder="Expected audience size, date, location, vision..." required
                      className="w-full bg-white/2 border border-white/6 px-5 py-4 text-white placeholder:text-white/15 focus:outline-none focus:border-[#F97316]/40 focus:bg-[#F97316]/3 transition-all duration-300 resize-none text-sm font-light" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium tracking-[0.25em] text-white/30 uppercase">Estimated Budget</label>
                    <select className="w-full bg-[#0a0a0a] border border-white/6 px-5 py-4 text-white/60 focus:outline-none focus:border-[#F97316]/40 transition-all duration-300 text-sm font-light appearance-none cursor-pointer" defaultValue="">
                      <option value="" disabled>Select a range</option>
                      <option value="50k">$50,000 â€“ $150,000</option>
                      <option value="150k">$150,000 â€“ $500,000</option>
                      <option value="500k">$500,000 â€“ $1M</option>
                      <option value="1m">$1M+</option>
                    </select>
                  </div>

                  <button type="submit"
                    className="w-full py-5 bg-[#F97316] text-[#0a0a0a] font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                    Request Private Consultation
                  </button>

                  <p className="text-center text-xs text-white/15 font-light tracking-wide">
                    All inquiries are treated with strict confidentiality.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

function Field({ label, type, required }: { label: string; type: string; required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium tracking-[0.25em] text-white/30 uppercase">{label}</label>
      <input type={type} required={required}
        className="w-full bg-white/2 border border-white/6 px-5 py-4 text-white placeholder:text-white/15 focus:outline-none focus:border-[#F97316]/40 focus:bg-[#F97316]/3 transition-all duration-300 text-sm font-light" />
    </div>
  );
}
