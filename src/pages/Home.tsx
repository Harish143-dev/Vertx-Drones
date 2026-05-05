import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/home/Hero";
import { Highlights } from "@/components/sections/home/Highlights";
import { Showcase } from "@/components/sections/home/Showcase";
import { Services } from "@/components/sections/home/Services";
import { Process } from "@/components/sections/home/Process";
import { CTABlock } from "@/components/sections/home/CTABlock";
import { DroneShowGallery } from "@/components/sections/home/DroneShowGallery";
import { FAQ } from "@/components/sections/home/FAQ";
import { HomeContact } from "@/components/sections/home/HomeContact";
import { Footer } from "@/components/layout/Footer";

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      <Navbar />
      <main>
        {/* 1. Hero â€” full screen, video-ready */}
        <Hero />

        {/* 2. Key highlights strip */}
        <Highlights />

        {/* 4. Portfolio â€” 3 tiles */}
        <Showcase />

        {/* 5. Use Cases */}
        <Services />

        {/* 6. How It Works â€” 4-step process */}
        <Process />

        {/* 7. CTA Block */}
        <CTABlock />

        {/* 8. Drone Show Scale / Packages */}
        <DroneShowGallery />

        {/* 9. FAQ */}
        <FAQ />

        {/* 10. Contact Form */}
        <HomeContact />
      </main>
      <Footer />
    </div>
  );
}
