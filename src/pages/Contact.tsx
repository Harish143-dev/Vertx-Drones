import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";
import { ContactProcess } from "@/components/sections/contact/ContactProcess";

export function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <SEO 
        title="Book a Drone Show in India | VertX Drone Light Show" 
        description="Book a drone show with VertX. Tell us your event and we will get back within 24 hours. WhatsApp, call, or fill the form."
        keywords="book a drone show India, hire drone show India, contact VertX drone show, drone show enquiry India, drone show booking India"
      />
      <Navbar />
      <main>
        <ContactFormSection />
        <ContactProcess />
      </main>
      <Footer />
    </div>
  );
}
