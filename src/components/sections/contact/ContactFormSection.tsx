import { useState } from "react";
import { useLocation } from "wouter";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import contactImg from "@/assets/images/contactHero.webp"; // Placeholder for premium show still

export function ContactFormSection() {
  const [, setLocation] = useLocation();
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
        setLocation("/thank-you");
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
    <section className="relative min-h-screen bg-background pt-32 pb-24 lg:pt-40">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={contactImg}
          alt="VertX drone show contact India book a show"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Left Column - Intro & Quick Connect */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-white">
              Let's Plan Your Drone Show
            </h1>
            <p className="mb-16 text-sm md:text-base font-light leading-relaxed text-white/50 max-w-md">
              Fill the form and we will get back to you within 24 hours. Rather talk first? WhatsApp or call us directly.
            </p>

            <div className="border-t border-border pt-12">
              <h2 className="mb-6 text-xl font-semibold text-white">Other Ways to Reach Us</h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
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

              <h2 className="mb-4 text-xl font-semibold text-white">Our Headquarters</h2>
              <p className="text-sm md:text-base font-light leading-relaxed text-white/50 max-w-sm">
                New #32, 2nd floor, 16th Main Road, West,<br />
                Kathiravan Colony, Anna Nagar,<br />
                Chennai, Tamil Nadu 600040
              </p>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="rounded-lg border border-border bg-card p-8 md:p-10 shadow-2xl"
          >
            {isSubmitted ? (
              <div className="flex h-full min-h-[500px] flex-col items-center justify-center text-center">
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
                    <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name <span className="text-primary">*</span></label>
                    <input required type="text" id="fullName" name="fullName" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address <span className="text-primary">*</span></label>
                    <input required type="email" id="email" name="email" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number <span className="text-primary">*</span></label>
                  <input required type="tel" id="phone" name="phone" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="eventType" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Type <span className="text-primary">*</span></label>
                  <select required id="eventType" name="eventType" defaultValue="" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors appearance-none text-foreground">
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
                    <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Location <span className="text-primary">*</span></label>
                    <input required type="text" id="location" name="location" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preferred Date <span className="text-primary">*</span></label>
                    <input required type="date" id="date" name="date" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors text-foreground min-h-[46px]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="brief" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tell us about your event</label>
                  <textarea id="brief" name="message" rows={4} maxLength={1000} placeholder="Up to 150 words..." className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none placeholder:text-muted-foreground/50" />
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
