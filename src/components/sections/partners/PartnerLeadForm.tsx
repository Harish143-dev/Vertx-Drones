import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

export function PartnerLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement | null)?.value,
      companyName: (form.elements.namedItem("companyName") as HTMLInputElement | null)?.value,
      businessType: (form.elements.namedItem("businessType") as HTMLSelectElement | null)?.value,
      city: (form.elements.namedItem("city") as HTMLInputElement | null)?.value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement | null)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement | null)?.value,
      volume: (form.elements.namedItem("volume") as HTMLInputElement | null)?.value,
      brief: (form.elements.namedItem("brief") as HTMLTextAreaElement | null)?.value,
    };

    try {
      const response = await fetch("https://hook.eu1.make.com/7qdx1ds2csrhbatn4phgx045lyblp1qo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partner-form" className="bg-[#0a0a0a] py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-6 text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Become a Partner
            </h2>
            <p className="mb-12 text-sm md:text-base font-light text-white/50 max-w-md leading-relaxed">
              Fill out the application below. Our partnership team will review it and contact you within 24 hours to schedule a discovery call.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" size="lg" className="group w-fit border-white/20 text-white hover:border-[#25D366] hover:text-[#25D366] hover:bg-transparent shadow-none">
                <a
                  href="https://wa.me/917358598707"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={15} className="mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
            className="rounded-lg border border-border bg-card p-8 md:p-10"
          >
            {isSubmitted ? (
              <div className="rounded-lg flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-primary/10 text-primary">
                  <ArrowRight size={32} className="-rotate-45" />
                </div>
                <h3 className="mb-4 text-2xl font-light">Application Received</h3>
                <p className="text-muted-foreground">
                  Thank you for your interest. Our partnership team will review your details and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <input required type="text" id="fullName" name="fullName" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Company Name</label>
                    <input required type="text" id="companyName" name="companyName" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="businessType" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Business Type</label>
                    <select required id="businessType" name="businessType" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors appearance-none text-foreground">
                      <option value="" disabled selected>Select an option</option>
                      <option value="Event company">Event company</option>
                      <option value="Wedding planner">Wedding planner</option>
                      <option value="Corporate agency">Corporate agency</option>
                      <option value="Hotel">Hotel</option>
                      <option value="AV production">AV production</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="city" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</label>
                    <input required type="text" id="city" name="city" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                    <input required type="tel" id="phone" name="phone" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                    <input required type="email" id="email" name="email" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="volume" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">How many events do you manage per year?</label>
                  <input required type="text" id="volume" name="volume" placeholder="e.g., 20+ weddings, 5 corporate events" className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="brief" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Brief about your clients and events (up to 100 words)</label>
                  <textarea required id="brief" name="brief" rows={4} maxLength={800} className="rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none" />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="group mt-4 w-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
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
