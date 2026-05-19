import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { CorporateHero } from "@/components/sections/corporate/CorporateHero";
import { CorporateReasons } from "@/components/sections/corporate/CorporateReasons";
import { CorporateUseCases } from "@/components/sections/corporate/CorporateUseCases";
import { CorporateROI } from "@/components/sections/corporate/CorporateROI";
import { CorporateProof } from "@/components/sections/corporate/CorporateProof";
import { CorporateCTA } from "@/components/sections/corporate/CorporateCTA";

export default function Corporate() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans">
      <SEO 
        title="Corporate Drone Shows in India | VertX Drone Light Show" 
        description="VertX delivers corporate drone shows across India. Brand activations, product launches, corporate celebrations. High engagement. Viral content. Premium brand positioning."
      />
      <Navbar />
      <main>
        <CorporateHero />
        <CorporateReasons />
        <CorporateUseCases />
        <CorporateROI />
        <CorporateProof />
        <CorporateCTA />
      </main>
      <Footer />
    </div>
  );
}
