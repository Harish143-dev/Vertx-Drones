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
        title="Corporate Drone Shows" 
        description="Elevate your brand with premium drone light shows. Perfect for product launches, corporate milestones, and large-scale marketing activations."
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
