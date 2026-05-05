import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioStats } from "@/components/sections/portfolio/PortfolioStats";
import { PortfolioGallery } from "@/components/sections/portfolio/PortfolioGallery";
import { PortfolioCTA } from "@/components/sections/portfolio/PortfolioCTA";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      <Navbar />
      <main>
        {/* 1. Hero — cinematic header */}
        <PortfolioHero />

        {/* 2. Stats Strip — animated counters */}
        <PortfolioStats />

        {/* 3. Gallery — filterable project grid + lightbox */}
        <PortfolioGallery />

        {/* 4. CTA — book your show */}
        <PortfolioCTA />
      </main>
      <Footer />
    </div>
  );
}
