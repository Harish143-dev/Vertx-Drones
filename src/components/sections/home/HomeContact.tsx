import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ORANGE = "#F97316";

export function HomeContact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "e25a8f18-fdd9-49ec-96d5-7c038c34d196");

    try {
      const response = await fetch("https://hook.eu1.make.com/25rrrn6aw6fw8suynquwzk8g5eqsqray", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setSubmitted(true);
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
    <section className="py-24 bg-[#0a0a0a]" id="contact">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >

          <h2 className="text-3xl md:text-5xl font-light leading-tight">
            Let's Light Up the Sky Together
          </h2>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center border border-white/7"
            style={{ background: "rgba(255,255,255,0.015)" }}
          >
            <p className="text-2xl font-bold mb-2">We've received your message.</p>
            <p className="text-white/40 text-sm">Our team will reach out within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {[
              { label: "First Name", name: "firstName", required: true },
              { label: "Last Name", name: "lastName", required: true },
              { label: "Phone Number", name: "phone", required: true },
              { label: "Email Address", name: "email", required: true },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">
                  {field.label}{field.required && <span style={{ color: ORANGE }}> *</span>}
                </label>
                <Input
                  type={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "text"}
                  name={field.name}
                  required={field.required}
                  className="w-full rounded-lg bg-white/[0.03] border-white/10 px-4 py-6 text-sm text-white placeholder-white/20 focus-visible:ring-1 focus-visible:ring-[#F97316] transition-colors duration-200"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">
                What's the vibe or concept of your event?
              </label>
              <Input
                type="text"
                name="concept"
                className="w-full rounded-lg bg-white/[0.03] border-white/10 px-4 py-6 text-sm text-white placeholder-white/20 focus-visible:ring-1 focus-visible:ring-[#F97316] transition-colors duration-200"
                placeholder="e.g. Grand product launch with 500 drones over the marina"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">
                What date are you planning for?
              </label>
              <Input
                type="date"
                name="date"
                className="w-full rounded-lg bg-white/[0.03] border-white/10 px-4 py-6 text-sm text-white/70 focus-visible:ring-1 focus-visible:ring-[#F97316] transition-colors duration-200"
                style={{ colorScheme: "dark" }}
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">
                Event Location
              </label>
              <Input
                type="text"
                name="location"
                className="w-full rounded-lg bg-white/[0.03] border-white/10 px-4 py-6 text-sm text-white placeholder-white/20 focus-visible:ring-1 focus-visible:ring-[#F97316] transition-colors duration-200"
                placeholder="City, venue, or region"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">
                Share a few more details{" "}
                <span className="text-white/20 normal-case tracking-normal">(up to 100 words)</span>
              </label>
              <Textarea
                name="message"
                rows={4}
                maxLength={700}
                required
                className="w-full rounded-lg bg-white/[0.03] border-white/10 px-4 py-4 text-sm text-white placeholder-white/20 focus-visible:ring-1 focus-visible:ring-[#F97316] transition-colors duration-200 resize-none min-h-[120px]"
                placeholder="Tell us about your event, audience size, special requirements…"
              />
            </div>

            {errorMsg && (
              <div className="md:col-span-2 text-red-500 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="md:col-span-2 flex justify-start">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="group"
              >
                {isSubmitting ? (
                  <>
                    Sending...
                    <Loader2 size={15} className="animate-spin ml-2" />
                  </>
                ) : (
                  <>
                    Let's Talk
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
