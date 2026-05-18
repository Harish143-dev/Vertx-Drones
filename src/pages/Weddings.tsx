import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
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
