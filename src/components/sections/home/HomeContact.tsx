import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

export function HomeContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "e25a8f18-fdd9-49ec-96d5-7c038c34d196");

    try {
      const response = await fetch("https://hook.eu1.make.com/n39ic3gs9ahpeonwrc9o7tlazn45qv3x", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMsg("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="contact">
      {/* Subtle decorative glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading and description */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col lg:col-span-5"
          >
            <h2 className="mb-6 text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Let's Light Up the Sky Together
            </h2>
            <p className="mb-10 text-base font-light leading-relaxed text-white/60 max-w-md">
              Tell us about your event. We will review your requirements and get back to you with a custom concept and proposal within 24 hours.
            </p>

            <div className="border-t border-border pt-10">
              <h3 className="mb-6 text-lg font-semibold text-white">Prefer to talk directly?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" size="lg" className="group w-fit border-white/20 text-white hover:border-[#25D366] hover:text-[#25D366] hover:bg-transparent shadow-none">
                  <a
                    href="https://wa.me/917358598707?text=Hi%20VertX!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20drone%20show."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={15} className="mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="group w-fit border-white/20 text-white hover:border-primary hover:text-primary hover:bg-transparent shadow-none">
                  <a href="tel:+917358598707">
                    <Phone size={15} className="mr-2" />
                    Call Us
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Lead Form Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
            className="rounded-lg border border-border bg-card p-8 md:p-10 shadow-2xl lg:col-span-7"
          >
            {isSubmitted ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-primary/10 text-primary">
                  <ArrowRight size={32} className="-rotate-45" />
                </div>
                <h3 className="mb-4 text-2xl font-light">Request Received</h3>
                <p className="text-muted-foreground mb-8">
                  Thank you. We will review your brief and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs tracking-[0.2em] text-primary uppercase hover:text-white transition-colors"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="homeFullName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name <span className="text-primary">*</span></label>
                    <input required type="text" id="homeFullName" name="fullName" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="homeEmail" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address <span className="text-primary">*</span></label>
                    <input required type="email" id="homeEmail" name="email" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="homePhone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number <span className="text-primary">*</span></label>
                  <input required type="tel" id="homePhone" name="phone" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="homeEventType" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Type <span className="text-primary">*</span></label>
                  <select required id="homeEventType" name="eventType" defaultValue="" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors appearance-none text-foreground">
                    <option value="" disabled>Select an option</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Festival">Festival</option>
                    <option value="Government Event">Government Event</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="homeLocation" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Location <span className="text-primary">*</span></label>
                    <input required type="text" id="homeLocation" name="location" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="homeDate" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preferred Date <span className="text-primary">*</span></label>
                    <input required type="date" id="homeDate" name="date" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors text-foreground min-h-[46px]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="homeBrief" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tell us about your event</label>
                  <textarea id="homeBrief" name="message" rows={4} maxLength={1000} placeholder="Up to 150 words..." className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none placeholder:text-muted-foreground/50" />
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-sm">
                    {errorMsg}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="group mt-4 w-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  {!isSubmitting && <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
