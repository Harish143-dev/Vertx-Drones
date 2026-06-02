import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { Schema, getServiceSchema } from "@/components/Schema";
import { WeddingHero } from "@/components/sections/weddings/WeddingHero";
import { WeddingIntro } from "@/components/sections/weddings/WeddingIntro";
import { WeddingMoments } from "@/components/sections/weddings/WeddingMoments";
import { WeddingProcess } from "@/components/sections/weddings/WeddingProcess";
import { WeddingProof } from "@/components/sections/weddings/WeddingProof";
import { WeddingCTA } from "@/components/sections/weddings/WeddingCTA";

export default function Weddings() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-sans selection:bg-primary/30">
      <SEO 
        title="Wedding Drone Shows in India | VertX Drone Light Show" 
        description="VertX creates custom wedding drone shows across India. Couple name reveals, grand entries, proposal moments, storytelling in the sky. Make your wedding unforgettable."
        keywords="wedding drone show India, drone show for wedding India, wedding drone light show India, couple name reveal drone show India, drone show for wedding entry India, wedding drone show Hyderabad, wedding drone show Bangalore, wedding drone show Jaipur, wedding drone show Udaipur"
      />
      <Schema 
        schema={getServiceSchema(
          "Wedding Drone Light Shows",
          "VertX creates custom wedding drone shows across India. Couple name reveals, grand entries, proposal moments, storytelling in the sky. Make your wedding unforgettable.",
          "https://vertxdroneshow.in/weddings"
        )}
      />
      <Navbar />
      <main>
        <WeddingHero />
        <WeddingIntro />
        <WeddingMoments />
        <WeddingProcess />
        <WeddingProof />
        <WeddingCTA />
      </main>
      <Footer />
    </div>
  );
}
