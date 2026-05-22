import { useMemo, useRef, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export type FormationShape = "Logo" | "Bird" | "Numbers" | "Nature";

type FormationPreviewSceneProps = {
  droneCount: number;
  shape: FormationShape;
  cameraView?: "Front" | "Wide" | "Top";
};

function CameraUpdater({ position }: { position: [number, number, number] }) {
  const { camera, controls } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    if (controls) {
      (controls as any).target.set(0, 0.5, 0);
      (controls as any).update();
    }
  }, [camera, controls, position]);
  return null;
}

export function FormationPreviewScene({
  droneCount,
  shape,
  cameraView = "Wide",
}: FormationPreviewSceneProps) {
  const cameraPosition: [number, number, number] =
    cameraView === "Top"
      ? [0, 14, 0]        // Aerial View: Straight down
      : cameraView === "Front"
        ? [0, 0.5, 8]     // Close-Up: Straight on, closer
        : [0, 2.0, 13];   // Audience View: Straight on, wide

  return (
    <div className="h-[480px] w-full md:h-[620px]" style={{ background: "#020208" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 38, near: 0.1, far: 200 }}
        gl={{ alpha: false, antialias: true }}
      >
        {/* Very dark night sky */}
        <color attach="background" args={["#020208"]} />
        <fog attach="fog" args={["#020208", 12, 28]} />

        {/* Minimal ambient — just enough to hint at silhouettes */}
        <ambientLight intensity={0.16} />
        <directionalLight position={[4, 5, 5]} intensity={1.6} color="#ffffff" />
        <spotLight
          position={[-5, 4, 4]}
          angle={0.42}
          penumbra={0.8}
          intensity={3.2}
          color="#d9f3ff"
        />
        <pointLight position={[0, -1.1, 4]} intensity={2.5} color="#F97316" />

        {/* Stars background */}
        <NightSkyStars />

        {/* The formation */}
        <FormationSwarm droneCount={droneCount} shape={shape} />

        <CameraUpdater position={cameraPosition} />
        <OrbitControls makeDefault enablePan={false} enableZoom={false} target={[0, 0.5, 0]} />
        <EffectComposer>
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Night sky starfield background
   ────────────────────────────────────────────────────────────── */
function NightSkyStars() {
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 16 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 8;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[starPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#aabbdd"
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────
   Shared LED dot geometry (single sphere, reused by all drones)
   ────────────────────────────────────────────────────────────── */
const ledDotGeo = new THREE.SphereGeometry(0.028, 12, 10);
const ledHaloGeo = new THREE.SphereGeometry(0.075, 16, 12);

// Translate the arm and body geometries upwards to separate them from the LED at (0,0,0)
// This eliminates Z-fighting and clipping between the LED and the drone structure.
const microArmGeo = new THREE.BoxGeometry(0.16, 0.006, 0.008);
microArmGeo.translate(0, 0.022, 0);

const microBodyGeo = new THREE.BoxGeometry(0.038, 0.018, 0.032);
microBodyGeo.translate(0, 0.022, 0);

const microNavGeo = new THREE.SphereGeometry(0.012, 8, 6);
const microRotorGeo = new THREE.TorusGeometry(0.045, 0.004, 6, 18);

// Opaque body material for better visual stability and depth writing
const microDroneMaterial = new THREE.MeshBasicMaterial({
  color: "#05070a",
});

// Opaque LED core material completely eliminates transparency sorting flickering
const ledBaseMat = new THREE.MeshBasicMaterial({
  color: "#ffffff",
  toneMapped: false,
});
const haloBaseMat = new THREE.MeshBasicMaterial({
  color: "#ffffff",
  transparent: true,
  opacity: 0.45,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  toneMapped: false,
});

function FormationSwarm({
  droneCount,
  shape,
}: {
  droneCount: number;
  shape: FormationShape;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  const ledMeshRef = useRef<THREE.InstancedMesh>(null);
  const haloMeshRef = useRef<THREE.InstancedMesh>(null);
  const bodyMeshRef = useRef<THREE.InstancedMesh>(null);
  const arm1MeshRef = useRef<THREE.InstancedMesh>(null);
  const arm2MeshRef = useRef<THREE.InstancedMesh>(null);

  const points = useMemo(
    () => createFormationPoints(shape, droneCount),
    [shape, droneCount]
  );

  const colorPalette = useMemo(() => {
    if (shape === "Nature")
      return ["#22ff88", "#55ffaa", "#88ffcc", "#44ff66", "#66ffbb"];
    if (shape === "Bird")
      return ["#88ccff", "#aaddff", "#66bbff", "#bbddff", "#99ccee"];
    if (shape === "Numbers")
      return ["#ffaa22", "#ffcc44", "#ff8800", "#ffbb55", "#ffdd66"];
    // Logo
    return ["#ff6622", "#ff8844", "#ffaa33", "#ff7733", "#ffcc55"];
  }, [shape]);

  // Set colors synchronously when drone count or shape changes to prevent 1-frame color flickering
  useLayoutEffect(() => {
    if (!ledMeshRef.current || !haloMeshRef.current) return;
    const ledColor = new THREE.Color();
    const haloColor = new THREE.Color();
    for (let i = 0; i < droneCount; i++) {
      const baseColorStr = colorPalette[i % colorPalette.length];
      ledColor.set(baseColorStr).multiplyScalar(2.0); // HDR intensity for stable bloom
      haloColor.set(baseColorStr).multiplyScalar(1.2); // softer halo bloom
      ledMeshRef.current.setColorAt(i, ledColor);
      haloMeshRef.current.setColorAt(i, haloColor);
    }
    if (ledMeshRef.current.instanceColor) ledMeshRef.current.instanceColor.needsUpdate = true;
    if (haloMeshRef.current.instanceColor) haloMeshRef.current.instanceColor.needsUpdate = true;
  }, [droneCount, colorPalette]);

  // Refs to manage transition state smoothly inside the animation loop
  const prevPointsRef = useRef<THREE.Vector3[]>([]);
  const currentPointsRef = useRef<THREE.Vector3[]>([]);
  const transitionStartTimeRef = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);

  useEffect(() => {
    if (currentPointsRef.current.length > 0) {
      // If we already have a shape rendered, trigger a smooth transition
      const oldPoints = currentPointsRef.current;
      const newPoints = points;
      const adjustedOldPoints: THREE.Vector3[] = [];
      
      for (let i = 0; i < newPoints.length; i++) {
        if (i < oldPoints.length) {
          adjustedOldPoints.push(oldPoints[i].clone());
        } else {
          // If drone count has increased, spawn new drones from random positions on the ground plane
          adjustedOldPoints.push(
            new THREE.Vector3((Math.random() - 0.5) * 6, -2.2, (Math.random() - 0.5) * 6)
          );
        }
      }
      prevPointsRef.current = adjustedOldPoints;
      transitionStartTimeRef.current = -1; // Flag to initialize timestamp on next animation frame
      isTransitioningRef.current = true;
    } else {
      // Initial load, spawn immediately
      prevPointsRef.current = points.map((p) => p.clone());
    }
    currentPointsRef.current = points.map((p) => p.clone());
  }, [points]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = 0;
    }

    if (isTransitioningRef.current && transitionStartTimeRef.current === -1) {
      transitionStartTimeRef.current = t;
    }

    const dummy = new THREE.Object3D();
    
    if (!ledMeshRef.current) return;

    const transitionDuration = 2.0; // Duration of active flight in seconds
    const maxStaggerDelay = 0.8; // Maximum delay to distribute drone takeoff times
    const transTime = isTransitioningRef.current ? t - transitionStartTimeRef.current : 0;
    let allFinished = true;

    for (let i = 0; i < droneCount; i++) {
      if (i >= points.length) break;
      const targetPoint = points[i];
      const basePos = new THREE.Vector3();

      if (isTransitioningRef.current) {
        const startPoint =
          prevPointsRef.current[i] ||
          new THREE.Vector3((Math.random() - 0.5) * 6, -2.2, (Math.random() - 0.5) * 6);
        
        // Stagger flight takeoff based on index and distance from the center
        const distanceDelay = (targetPoint.length() / 8) * 0.3; // up to 0.3s delay depending on distance
        const indexDelay = (i / droneCount) * (maxStaggerDelay - 0.3); // up to 0.5s delay depending on index
        const delay = distanceDelay + indexDelay;

        const p = THREE.MathUtils.clamp((transTime - delay) / transitionDuration, 0, 1);
        if (p < 1) {
          allFinished = false;
        }

        // easeInOutCubic for organic acceleration and deceleration
        const easeP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        basePos.lerpVectors(startPoint, targetPoint, easeP);
      } else {
        basePos.copy(targetPoint);
      }

      dummy.position.set(basePos.x, basePos.y, basePos.z);
      dummy.scale.setScalar(1.0);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      
      ledMeshRef.current.setMatrixAt(i, dummy.matrix);
      if (haloMeshRef.current) haloMeshRef.current.setMatrixAt(i, dummy.matrix);
      if (bodyMeshRef.current) bodyMeshRef.current.setMatrixAt(i, dummy.matrix);
      if (arm1MeshRef.current) arm1MeshRef.current.setMatrixAt(i, dummy.matrix);
      
      if (arm2MeshRef.current) {
        dummy.rotation.set(0, Math.PI / 2, 0);
        dummy.updateMatrix();
        arm2MeshRef.current.setMatrixAt(i, dummy.matrix);
      }
    }
    
    ledMeshRef.current.instanceMatrix.needsUpdate = true;
    if (haloMeshRef.current) haloMeshRef.current.instanceMatrix.needsUpdate = true;
    if (bodyMeshRef.current) bodyMeshRef.current.instanceMatrix.needsUpdate = true;
    if (arm1MeshRef.current) arm1MeshRef.current.instanceMatrix.needsUpdate = true;
    if (arm2MeshRef.current) arm2MeshRef.current.instanceMatrix.needsUpdate = true;

    if (isTransitioningRef.current && allFinished) {
      isTransitioningRef.current = false;
      currentPointsRef.current = points.map(p => p.clone());
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#040410" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, -1.5, -6]}>
        <planeGeometry args={[20, 2.5]} />
        <meshBasicMaterial color="#080812" transparent opacity={0.4} />
      </mesh>

      {/* Render solid structures first to write depth */}
      <instancedMesh ref={bodyMeshRef} args={[microBodyGeo, microDroneMaterial, droneCount]} />
      <instancedMesh ref={arm1MeshRef} args={[microArmGeo, microDroneMaterial, droneCount]} />
      <instancedMesh ref={arm2MeshRef} args={[microArmGeo, microDroneMaterial, droneCount]} />

      {/* Render bright LEDs and transparent glowing halos last */}
      <instancedMesh ref={ledMeshRef} args={[ledDotGeo, ledBaseMat, droneCount]} />
      <instancedMesh ref={haloMeshRef} args={[ledHaloGeo, haloBaseMat, droneCount]} />
    </group>
  );
}


function createFormationPoints(shape: FormationShape, droneCount: number) {
  if (shape === "Bird") return generateBird3D(droneCount);
  if (shape === "Nature") return generateTree3D(droneCount);
  if (shape === "Logo") return generateLogo3D(droneCount);
  if (shape === "Numbers") return generateNumbers3D(droneCount);
  
  return fallbackFormation(droneCount);
}

/* ──────────────────────────────────────────────────────────────
   3D GENERATIVE ALGORITHMS
   ────────────────────────────────────────────────────────────── */

function linePoint(
  start: [number, number, number],
  end: [number, number, number],
  t: number,
  jitter = 0.035
) {
  return new THREE.Vector3(
    start[0] + (end[0] - start[0]) * t + (Math.random() - 0.5) * jitter,
    start[1] + (end[1] - start[1]) * t + (Math.random() - 0.5) * jitter,
    start[2] + (end[2] - start[2]) * t + (Math.random() - 0.5) * jitter
  );
}

function pushStroke(
  points: THREE.Vector3[],
  amount: number,
  start: [number, number, number],
  end: [number, number, number],
  jitter = 0.035
) {
  for (let i = 0; i < amount; i++) {
    points.push(linePoint(start, end, Math.random(), jitter));
  }
}

function generateBird3D(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  const headCount = Math.floor(count * 0.04);
  const beakCount = Math.floor(count * 0.03);
  const neckCount = Math.floor(count * 0.03);
  const bodyCount = Math.floor(count * 0.12);
  const tailCount = Math.floor(count * 0.12);
  const wingCount = count - headCount - beakCount - neckCount - bodyCount - tailCount;

  // Fibonacci sphere helper for perfectly even distribution
  const fibSphere = (n: number, rx: number, ry: number, rz: number, cx=0, cy=0, cz=0) => {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = phi * i;
      pts.push(new THREE.Vector3(cx + Math.cos(th)*rad*rx, cy + y*ry, cz + Math.sin(th)*rad*rz));
    }
    return pts;
  };

  // Realistic Cranium (elongated)
  points.push(...fibSphere(headCount, 0.18, 0.22, 0.28, 0, 1.15, -1.25));
  
  // Sharp Beak (V shape using lines)
  const beakLines = [
    { p1: [0, 1.18, -1.48] as [number,number,number], p2: [0, 0.95, -1.95] as [number,number,number] },
    { p1: [0, 0.95, -1.95] as [number,number,number], p2: [0, 1.05, -1.45] as [number,number,number] }
  ];
  points.push(...distributeOnLines(beakLines, beakCount));

  // Neck and Body
  points.push(...fibSphere(neckCount, 0.12, 0.38, 0.15, 0, 0.75, -0.85));
  points.push(...fibSphere(bodyCount, 0.45, 0.38, 0.9, 0, 0.4, 0));

  // Parametric Wings (Evenly spaced grid mapped to a curve)
  const halfWing = Math.floor(wingCount / 2);
  for (let side of [-1, 1]) {
    const rows = Math.floor(Math.sqrt(halfWing * 0.3));
    const cols = Math.floor(halfWing / (rows || 1));
    const actualCount = rows * cols;
    
    for (let i = 0; i < actualCount; i++) {
      const r = i % rows;
      const c = Math.floor(i / rows);
      const span = c / (cols - 1 || 1);
      const chord = (r / (rows - 1 || 1)) - 0.5;
      
      const x = span * 4.2 * side;
      const y = Math.pow(span, 1.8) * 1.2 + 0.4;
      const ww = 1.2 - span * 0.85;
      const z = span * 0.8 + chord * ww;
      points.push(new THREE.Vector3(x, y, z));
    }
  }

  // Tail (Evenly spaced fan)
  const tailRows = Math.floor(Math.sqrt(tailCount * 0.4));
  const tailCols = Math.floor(tailCount / (tailRows || 1));
  for (let i = 0; i < tailRows * tailCols; i++) {
    const r = i % tailRows;
    const c = Math.floor(i / tailRows);
    const t = c / (tailCols - 1 || 1);
    const fan = (r / (tailRows - 1 || 1)) * 2 - 1;
    
    const x = fan * t * 1.4;
    const y = -t * 0.6 + 0.1;
    const z = t * 2.2 + 1.0;
    points.push(new THREE.Vector3(x, y, z));
  }

  // Fill any missing points due to integer division roundoffs with a subtle aura
  while (points.length < count) {
    points.push(new THREE.Vector3(0, 0.4, 0));
  }

  return points.map((p) => new THREE.Vector3(-p.x, p.y, -p.z)).slice(0, count);
}

function generateTree3D(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  const trunkCount = Math.floor(count * 0.15);
  const canopyCount = count - trunkCount;

  // Trunk (Cylindrical Grid)
  const trunkRings = Math.floor(Math.sqrt(trunkCount * 1.5));
  const trunkCols = Math.floor(trunkCount / (trunkRings || 1));
  for (let i = 0; i < trunkRings * trunkCols; i++) {
    const r = i % trunkCols;
    const h = Math.floor(i / trunkCols) / (trunkRings - 1 || 1);
    const height = h * 3.0 - 2.5;
    const taperR = 0.12 + (1 - h) * 0.18;
    const a = (r / trunkCols) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a)*taperR, height, Math.sin(a)*taperR));
  }

  // Canopy (Layered Fibonacci Spheres to form a dense tree top)
  const layers = [
    { y: 1.5, r: 1.8, p: 0.4 },
    { y: 2.4, r: 1.2, p: 0.3 },
    { y: 0.6, r: 1.4, p: 0.3 }
  ];
  
  let remainingCanopy = canopyCount;
  layers.forEach((layer, idx) => {
    const lCount = idx === layers.length - 1 ? remainingCanopy : Math.floor(canopyCount * layer.p);
    remainingCanopy -= lCount;
    
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < lCount; i++) {
      const y = 1 - (i / (lCount - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = phi * i;
      points.push(new THREE.Vector3(
        Math.cos(th) * rad * layer.r,
        layer.y + y * layer.r * 0.7, // squashed vertically
        Math.sin(th) * rad * layer.r
      ));
    }
  });

  while (points.length < count) points.push(new THREE.Vector3(0, 1.5, 0));
  return points.slice(0, count);
}

// Helper function to evenly distribute points along multiple line segments
function distributeOnLines(lines: {p1: [number,number,number], p2: [number,number,number]}[], totalCount: number): THREE.Vector3[] {
  let totalLen = 0;
  const segments = lines.map(l => {
    const dx = l.p2[0] - l.p1[0], dy = l.p2[1] - l.p1[1], dz = l.p2[2] - l.p1[2];
    const len = Math.sqrt(dx*dx + dy*dy + dz*dz);
    totalLen += len;
    return { ...l, len };
  });
  
  const points: THREE.Vector3[] = [];
  let remaining = totalCount;
  
  segments.forEach((seg, i) => {
    const isLast = i === segments.length - 1;
    const ptsCount = isLast ? remaining : Math.round((seg.len / totalLen) * totalCount);
    remaining -= ptsCount;
    
    for(let j=0; j<ptsCount; j++) {
      const t = ptsCount === 1 ? 0.5 : j / (ptsCount - 1);
      points.push(new THREE.Vector3(
        seg.p1[0] + t * (seg.p2[0] - seg.p1[0]),
        seg.p1[1] + t * (seg.p2[1] - seg.p1[1]),
        seg.p1[2] + t * (seg.p2[2] - seg.p1[2])
      ));
    }
  });
  return points;
}

function generateLogo3D(count: number): THREE.Vector3[] {
  // Perfectly aligned 3D stroke letters for "VERTX"
  const letters: Array<Array<[[number,number],[number,number]]>> = [
    [ [[-0.8,1],[0,-1]], [[0.8,1],[0,-1]] ],                                                   // V
    [ [[-0.8,1],[-0.8,-1]], [[-0.8,1],[0.6,1]], [[-0.8,0],[0.4,0]], [[-0.8,-1],[0.6,-1]] ], // E
    [ [[-0.8,1],[-0.8,-1]], [[-0.8,1],[0.6,1]], [[0.6,1],[0.6,0]], [[0.6,0],[-0.8,0]], [[-0.2,0],[0.8,-1]] ], // R
    [ [[-0.8,1],[0.8,1]], [[0,1],[0,-1]] ],                                                    // T
    [ [[-0.8,1],[0.8,-1]], [[0.8,1],[-0.8,-1]] ],                                             // X
  ];
  
  const allLines: {p1: [number,number,number], p2: [number,number,number]}[] = [];
  const lSpc = 1.9, startX = -((letters.length - 1) * lSpc) / 2;
  
  letters.forEach((segs, li) => {
    segs.forEach(seg => {
      // Add depth layers for the text to make it substantial
      for (let layer of [-0.2, 0, 0.2]) {
        allLines.push({
          p1: [startX + li * lSpc + seg[0][0] * 0.65, -0.2 + seg[0][1] * 0.65, layer],
          p2: [startX + li * lSpc + seg[1][0] * 0.65, -0.2 + seg[1][1] * 0.65, layer]
        });
      }
    });
  });

  return distributeOnLines(allLines, count);
}

function generateNumbers3D(count: number): THREE.Vector3[] {
  const strCount = String(count);

  const segments: Record<string, number[]> = {
    '0':[0,1,2,3,4,5], '1':[1,2], '2':[0,1,6,4,3], '3':[0,1,6,2,3],
    '4':[5,6,1,2], '5':[0,5,6,2,3], '6':[0,5,4,3,2,6], '7':[0,1,2],
    '8':[0,1,2,3,4,5,6], '9':[0,1,2,3,5,6]
  };
  
  const segLines: [[number,number],[number,number]][] = [
    [[-1,2],[1,2]],   // 0 top
    [[1,2],[1,0]],    // 1 top-right
    [[1,0],[1,-2]],   // 2 bot-right
    [[1,-2],[-1,-2]], // 3 bottom
    [[-1,-2],[-1,0]], // 4 bot-left
    [[-1,0],[-1,2]],  // 5 top-left
    [[-1,0],[1,0]]    // 6 middle
  ];

  const spacing = 3.2;
  const startX  = -((strCount.length - 1) * spacing) / 2;

  const allLines: {p1: [number,number,number], p2: [number,number,number]}[] = [];

  // Generate exact lines for the 7-segment display digits
  for (let i = 0; i < strCount.length; i++) {
    const char = strCount[i];
    const segIdxs = segments[char];
    
    segIdxs.forEach(segI => {
      const seg = segLines[segI];
      
      // We will create 2 parallel layers to give the numbers a slight 3D thickness
      for (let layer of [-0.15, 0.15]) {
        allLines.push({
          p1: [startX + i * spacing + seg[0][0], seg[0][1], layer],
          p2: [startX + i * spacing + seg[1][0], seg[1][1], layer]
        });
      }
    });
  }

  return distributeOnLines(allLines, count);
}

function fallbackFormation(count: number) {
  // 3D Sphere fallback
  return Array.from({ length: count }, () => {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 2.0;
    
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  });
}

function seededNoise(seed: number, range: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return (value - Math.floor(value) - 0.5) * range;
}



