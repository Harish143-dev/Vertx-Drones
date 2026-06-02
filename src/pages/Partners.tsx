import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

import { PartnerHero } from "@/components/sections/partners/PartnerHero";
import { PartnerAudience } from "@/components/sections/partners/PartnerAudience";
import { PartnerTiers } from "@/components/sections/partners/PartnerTiers";
import { PartnerBenefits } from "@/components/sections/partners/PartnerBenefits";
import { PartnerProcess } from "@/components/sections/partners/PartnerProcess";
import { PartnerLeadForm } from "@/components/sections/partners/PartnerLeadForm";

export default function Partners() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <SEO 
        title="Drone Show Partner Program India | VertX Drone Light Show" 
        description="Partner with VertX to offer drone light shows to your clients. Reseller and Official Partner programs for event companies and agencies across India."
        keywords="drone show partner program India, drone show partnership India, reseller drone show India, event company drone show partner India, drone show business partnership India"
      />
      <Navbar />
      <main>
        <PartnerHero />
        <PartnerAudience />
        <PartnerTiers />
        <PartnerBenefits />
        <PartnerProcess />
        <PartnerLeadForm />
      </main>
      <Footer />
    </div>
  );
}
