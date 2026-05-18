import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";

import { SimulatorHero } from "@/components/sections/simulator/SimulatorHero";
import { SimulatorTool, type UICameraView, cameraViewMap } from "@/components/sections/simulator/SimulatorTool";
import { SimulatorInclusions } from "@/components/sections/simulator/SimulatorInclusions";
import { SimulatorFAQ } from "@/components/sections/simulator/SimulatorFAQ";
import { SimulatorCTA } from "@/components/sections/simulator/SimulatorCTA";

export default function Simulator() {
  const [uiCameraView, setUiCameraView] = useState<UICameraView>("Audience View");

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <SEO 
        title="Design Your Drone Show | VertX Drone Light Show India" 
        description="Preview your drone show before you book it. Pick your drone count, shapes, and camera view. 100 to 400 drones. See exactly what your sky will look like."
      />
      <Navbar />
      <main>
        <SimulatorHero cameraView={cameraViewMap[uiCameraView]} />
        <SimulatorTool uiCameraView={uiCameraView} setUiCameraView={setUiCameraView} />
        <SimulatorInclusions />
        <SimulatorFAQ />
        <SimulatorCTA />
      </main>
      <Footer />
    </div>
  );
}
