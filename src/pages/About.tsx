import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutDifferences } from "@/components/sections/about/AboutDifferences";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutExperience } from "@/components/sections/about/AboutExperience";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <SEO
        title="About VertX | Drone Light Show Company India"
        description="VertX is a drone light show company based in Chennai. In-house production, 1,000-drone fleet, shows delivered for government bodies, corporate brands, and weddings across India."
      />
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutDifferences />
        <AboutMission />
        <AboutExperience />
        <AboutTeam />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}
