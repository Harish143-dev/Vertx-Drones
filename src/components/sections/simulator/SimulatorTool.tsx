import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Bird, Diamond, Hash, Leaf, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormationPreviewScene,
  type FormationShape,
} from "@/components/three/DroneModel";

// SEO-requested drone counts
const droneCounts = [100, 200, 300, 400];

// Mapping SEO-requested shape labels to the 3D model's actual supported types
const shapes = [
  { label: "Logo / Text", value: "Logo" as FormationShape, icon: Diamond },
  { label: "Nature", value: "Nature" as FormationShape, icon: Leaf },
  { label: "Geometric", value: "Numbers" as FormationShape, icon: Hash },
  { label: "Custom", value: "Bird" as FormationShape, icon: Bird },
];

// Mapping SEO-requested camera views to the 3D model's actual supported types
export const cameraViewMap = {
  "Audience View": "Wide",
  "Aerial View": "Top",
  "Close-Up": "Front"
} as const;
export type UICameraView = keyof typeof cameraViewMap;
const cameraViews = Object.keys(cameraViewMap) as UICameraView[];

interface SimulatorToolProps {
  uiCameraView: UICameraView;
  setUiCameraView: (view: UICameraView) => void;
}

export function SimulatorTool({ uiCameraView, setUiCameraView }: SimulatorToolProps) {
  const [droneCount, setDroneCount] = useState(300);
  const [activeShapeObj, setActiveShapeObj] = useState(shapes[0]);

  return (
    <section id="simulator-tool" className="border-y border-border bg-background py-24 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight">
              Pick Your Drone Count
            </h2>
          </div>
          <SlidersHorizontal className="hidden text-primary md:block" size={36} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="grid gap-4">
            {/* Drone Count Selector */}
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">Drone count</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {droneCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setDroneCount(count)}
                    className={`rounded-lg border px-2 py-3 text-sm font-bold transition-all duration-300 ${
                      droneCount === count
                        ? "border-primary bg-primary text-background"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {count} Drones
                  </button>
                ))}
              </div>
            </div>

            {/* Formation Shape Selector */}
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">Shape Options</p>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeShapeObj.label === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveShapeObj(item)}
                      className={`rounded-lg flex items-center justify-between border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <Icon size={16} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Camera View Selector */}
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">Camera View</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {cameraViews.map((view) => (
                  <button
                    key={view}
                    onClick={() => setUiCameraView(view)}
                    className={`rounded-lg border px-4 py-3 text-center text-sm font-bold transition-all duration-300 ${
                      uiCameraView === view
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Embedded CTA */}
            <div className="mt-4 hidden lg:block">
              <Button asChild size="lg" className="group w-full">
                <Link href="/contact">
                  Turn This Into a Real Show
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* 3D Preview Panel */}
          <div className="relative overflow-hidden rounded-lg border border-border bg-card min-h-[400px]">
            <FormationPreviewScene
              droneCount={droneCount}
              shape={activeShapeObj.value}
              cameraView={cameraViewMap[uiCameraView]}
            />
          </div>
          
          <div className="mt-2 lg:hidden">
            <Button asChild size="lg" className="group w-full">
              <Link href="/contact">
                Turn This Into a Real Show
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
