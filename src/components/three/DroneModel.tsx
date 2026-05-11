import { type MutableRefObject, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

type DroneHeroSceneProps = {
  cameraView?: "Front" | "Wide" | "Top";
};

export type FormationShape = "Logo" | "Bird" | "Numbers" | "Nature";

type FormationPreviewSceneProps = {
  droneCount: number;
  shape: FormationShape;
  cameraView?: "Front" | "Wide" | "Top";
};

const BLUE_WHITE = "#d9f3ff";
const CARBON = "#08090b";
const DARK_METAL = "#16181c";

type DroneMaterials = {
  carbon: THREE.MeshPhysicalMaterial;
  shell: THREE.MeshPhysicalMaterial;
  edge: THREE.MeshPhysicalMaterial;
  propeller: THREE.MeshPhysicalMaterial;
  glass: THREE.MeshPhysicalMaterial;
  led: THREE.MeshPhysicalMaterial;
  red: THREE.MeshPhysicalMaterial;
  green: THREE.MeshPhysicalMaterial;
};

export function DroneHeroScene({ cameraView = "Wide" }: DroneHeroSceneProps) {
  const cameraPosition: [number, number, number] =
    cameraView === "Top"
      ? [0, 4.8, 0.25]
      : cameraView === "Front"
        ? [0, 0.5, 5.4]
        : [3.2, 1.25, 4.8];

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 38, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
      >
        <fog attach="fog" args={["#050505", 7, 14]} />

        {/* HDR-like studio lighting for premium reflective materials */}
        <ambientLight intensity={0.55} />
        <directionalLight
          castShadow
          position={[3.5, 5, 4]}
          intensity={2.4}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-4, 4, 2.5]}
          angle={0.32}
          penumbra={0.85}
          intensity={5.2}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[0, -1.1, 1.2]} intensity={2.8} color={BLUE_WHITE} />

        <group position={[0.15, 0.1, 0]}>
          <DroneModel scale={0.88} />
        </group>

        <ContactShadows
          position={[0, -1.25, 0]}
          opacity={0.24}
          scale={5.5}
          blur={2.8}
          far={3}
        />
        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 2.05}
        />
        <EffectComposer>
          <Bloom intensity={0.42} luminanceThreshold={0.72} luminanceSmoothing={0.22} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export function FormationPreviewScene({
  droneCount,
  shape,
  cameraView = "Wide",
}: FormationPreviewSceneProps) {
  const cameraPosition: [number, number, number] =
    cameraView === "Top"
      ? [0, 14, 0.5]
      : cameraView === "Front"
        ? [0, 0.5, 14]
        : [4, 2.5, 12];

  return (
    <div className="h-[420px] w-full md:h-[540px]" style={{ background: "#020208" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 38, near: 0.1, far: 200 }}
        gl={{ alpha: false, antialias: true }}
      >
        {/* Very dark night sky */}
        <color attach="background" args={["#020208"]} />
        <fog attach="fog" args={["#020208", 12, 28]} />

        {/* Minimal ambient — just enough to hint at silhouettes */}
        <ambientLight intensity={0.04} />

        {/* Stars background */}
        <NightSkyStars />

        {/* The formation */}
        <FormationSwarm droneCount={droneCount} shape={shape} />

        <OrbitControls enablePan={false} enableZoom={false} />
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.4}
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
    const positions = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
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

function FormationSwarm({
  droneCount,
  shape,
}: {
  droneCount: number;
  shape: FormationShape;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(
    () => createFormationPoints(shape, droneCount),
    [shape, droneCount]
  );

  // Color palette — like real drone shows use multi-colored LEDs
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

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.22) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle ground reference — dark horizon line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#040410" transparent opacity={0.6} />
      </mesh>
      {/* Subtle city skyline silhouette hint */}
      <mesh position={[0, -1.5, -6]}>
        <planeGeometry args={[20, 2.5]} />
        <meshBasicMaterial color="#080812" transparent opacity={0.4} />
      </mesh>

      {points.map((point: THREE.Vector3, index: number) => (
        <DroneLED
          key={`${shape}-${droneCount}-${index}`}
          position={point}
          index={index}
          color={colorPalette[index % colorPalette.length]}
        />
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────
   Individual glowing LED dot — simulates a single drone as
   seen from the ground during a real drone light show
   ────────────────────────────────────────────────────────────── */
function DroneLED({
  position,
  index,
  color,
}: {
  position: THREE.Vector3;
  index: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  // Unique animation offsets for each drone
  const phase = useMemo(() => seededNoise(index * 7 + 13, 6.28), [index]);
  const hoverAmp = useMemo(
    () => 0.008 + Math.abs(seededNoise(index * 3 + 7, 0.012)),
    [index]
  );
  const twinkleSpeed = useMemo(
    () => 1.5 + Math.abs(seededNoise(index * 11 + 5, 2.0)),
    [index]
  );

  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
      }),
    [color]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ref.current) {
      // Subtle hovering bob
      ref.current.position.y =
        position.y + Math.sin(t * 1.8 + phase) * hoverAmp;
      // Gentle twinkling (scale pulsing)
      const twinkle = 0.85 + Math.sin(t * twinkleSpeed + phase) * 0.15;
      ref.current.scale.setScalar(twinkle);
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={ledDotGeo}
      position={[position.x, position.y, position.z]}
    >
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function DroneModel({ scale = 1 }: { scale?: number }) {
  const rootRef = useRef<THREE.Group>(null);
  const propellerRefs = useRef<THREE.Group[]>([]);

  const materials = useMemo(() => {
    const carbon = new THREE.MeshPhysicalMaterial({
      color: CARBON,
      roughness: 0.46,
      metalness: 0.42,
      clearcoat: 0.35,
      clearcoatRoughness: 0.42,
    });
    const shell = new THREE.MeshPhysicalMaterial({
      color: "#202329",
      roughness: 0.34,
      metalness: 0.55,
      clearcoat: 0.55,
      clearcoatRoughness: 0.32,
    });
    const edge = new THREE.MeshPhysicalMaterial({
      color: "#2d3138",
      roughness: 0.28,
      metalness: 0.72,
      clearcoat: 0.45,
    });
    const propeller = new THREE.MeshPhysicalMaterial({
      color: "#050608",
      roughness: 0.22,
      metalness: 0.2,
      transparent: true,
      opacity: 0.68,
      clearcoat: 0.5,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#050b12",
      roughness: 0.08,
      metalness: 0.05,
      transparent: true,
      opacity: 0.86,
      transmission: 0.12,
      clearcoat: 1,
    });
    const led = new THREE.MeshPhysicalMaterial({
      color: BLUE_WHITE,
      emissive: BLUE_WHITE,
      emissiveIntensity: 4.5,
      roughness: 0.12,
      metalness: 0,
      clearcoat: 1,
    });
    const red = new THREE.MeshPhysicalMaterial({
      color: "#ff3344",
      emissive: "#ff3344",
      emissiveIntensity: 2.8,
      roughness: 0.16,
    });
    const green = new THREE.MeshPhysicalMaterial({
      color: "#37ff8b",
      emissive: "#37ff8b",
      emissiveIntensity: 2.8,
      roughness: 0.16,
    });

    return { carbon, shell, edge, propeller, glass, led, red, green };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 1.35) * 0.06;
      rootRef.current.rotation.y = -0.42 + Math.sin(t * 0.55) * 0.18;
      rootRef.current.rotation.z = Math.sin(t * 0.7) * 0.018;
    }

    propellerRefs.current.forEach((propeller, index) => {
      propeller.rotation.y += index % 2 === 0 ? 0.92 : -0.92;
    });
  });

  return (
    <group ref={rootRef} scale={scale}>
      {/* Central compact rounded rectangular shell */}
      <RoundedBox args={[1.15, 0.26, 0.7]} radius={0.09} smoothness={8} castShadow receiveShadow>
        <primitive object={materials.shell} attach="material" />
      </RoundedBox>

      {/* Lower carbon battery bay */}
      <RoundedBox
        args={[0.78, 0.16, 0.46]}
        radius={0.045}
        smoothness={6}
        position={[0, -0.18, 0]}
        castShadow
        receiveShadow
      >
        <primitive object={materials.carbon} attach="material" />
      </RoundedBox>

      {/* Front camera/sensor detail */}
      <RoundedBox
        args={[0.28, 0.13, 0.08]}
        radius={0.035}
        smoothness={6}
        position={[0, 0.01, 0.39]}
        castShadow
      >
        <primitive object={materials.glass} attach="material" />
      </RoundedBox>

      {/* Panel seams and top vents */}
      <PanelLines material={materials.edge} />
      <Vents material={materials.carbon} />
      <Screws material={materials.edge} />

      {/* Diagonal four-arm frame */}
      <Arm angle={Math.PI / 4} material={materials.carbon} />
      <Arm angle={-Math.PI / 4} material={materials.carbon} />

      {/* Motors, propellers, nav lights */}
      {[
        { position: [-1.05, 0, -1.05] as [number, number, number], navLight: "red" as const },
        { position: [1.05, 0, -1.05] as [number, number, number], navLight: "green" as const },
        { position: [-1.05, 0, 1.05] as [number, number, number] },
        { position: [1.05, 0, 1.05] as [number, number, number] },
      ].map((motor, index) => (
        <MotorAssembly
          key={index}
          index={index}
          position={motor.position}
          material={materials}
          navLight={motor.navLight}
          propellerRefs={propellerRefs}
        />
      ))}

      {/* Landing legs */}
      <LandingSkids material={materials.carbon} />

      {/* Show LED module and soft bloom target */}
      <group position={[0, -0.36, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.13, 0.15, 0.08, 32]} />
          <primitive object={materials.edge} attach="material" />
        </mesh>
        <mesh position={[0, -0.07, 0]}>
          <sphereGeometry args={[0.105, 32, 20]} />
          <primitive object={materials.led} attach="material" />
        </mesh>
        <pointLight intensity={1.7} distance={2.1} color={BLUE_WHITE} />
      </group>
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

function generateBird3D(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  // Proportional allocation
  const headCount  = Math.floor(count * 0.05);
  const neckCount  = Math.floor(count * 0.04);
  const bodyCount  = Math.floor(count * 0.10);
  const wingCount  = Math.floor(count * 0.60);
  const tailCount  = Math.floor(count * 0.10);
  const featherCount = count - headCount - neckCount - bodyCount - wingCount - tailCount;

  // Helper: point inside ellipsoid
  const ellipsoid = (rx: number, ry: number, rz: number, ox = 0, oy = 0, oz = 0) => {
    const u = Math.random(), v = Math.random();
    const theta = u * 2 * Math.PI;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(Math.random());
    return new THREE.Vector3(
      ox + r * rx * Math.sin(phi) * Math.cos(theta),
      oy + r * ry * Math.sin(phi) * Math.sin(theta),
      oz + r * rz * Math.cos(phi)
    );
  };

  // 1. Head — small sphere at top-front
  for (let i = 0; i < headCount; i++) points.push(ellipsoid(0.28, 0.28, 0.28, 0, 1.1, -1.2));

  // 2. Neck — thin elongated ellipsoid
  for (let i = 0; i < neckCount; i++) points.push(ellipsoid(0.12, 0.38, 0.12, 0, 0.72, -0.85));

  // 3. Body — plump torso
  for (let i = 0; i < bodyCount; i++) points.push(ellipsoid(0.45, 0.38, 0.9, 0, 0.4, 0));

  // 4. Wings — parametric swept surface (each side)
  const halfWing = Math.floor(wingCount / 2);
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < halfWing; i++) {
      const span   = Math.pow(Math.random(), 0.6);          // bias toward tips
      const chord  = (Math.random() - 0.5);
      const wLen   = 4.2;
      const x      = span * wLen * side;
      // dihedral: wings curve upward toward tips
      const y      = Math.pow(span, 1.8) * 1.2 + 0.4;
      // sweep-back + taper
      const ww     = 1.2 - span * 0.85;
      const z      = span * 0.8 + chord * ww;
      const thick  = (Math.random() - 0.5) * 0.07 * (1 - span);
      points.push(new THREE.Vector3(x, y + thick, z));
    }
  }

  // 5. Tail fan — spreading plumes
  for (let i = 0; i < tailCount; i++) {
    const t   = Math.random();
    const fan = (Math.random() - 0.5) * 2;
    const x   = fan * t * 1.4;
    const y   = -t * 0.6 + 0.1;
    const z   = t * 2.2 + 1.0;
    points.push(new THREE.Vector3(x, y, z));
  }

  // 6. Primary feathers — individual quills along trailing wing edge
  const quillCount = 10;
  for (let i = 0; i < featherCount; i++) {
    const side  = i % 2 === 0 ? -1 : 1;
    const qi    = Math.floor(Math.random() * quillCount);
    const span  = 0.35 + (qi / quillCount) * 0.65;
    const rootX = span * 4.2 * side;
    const rootY = Math.pow(span, 1.8) * 1.2 + 0.4;
    const rootZ = span * 0.8 + 0.5;
    const t     = Math.random();
    const featherLen = 0.6 * (1 - span * 0.4);
    points.push(new THREE.Vector3(
      rootX + t * 0.1 * side,
      rootY - t * featherLen * 0.3,
      rootZ + t * featherLen
    ));
  }

  return points;
}

function generateTree3D(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  const trunkCount   = Math.floor(count * 0.12);
  const branchCount  = Math.floor(count * 0.18);
  const canopyCount  = count - trunkCount - branchCount;

  // 1. Trunk — tapered cylinder
  for (let i = 0; i < trunkCount; i++) {
    const h = Math.random();
    const height = h * 2.5 - 2.5;          // -2.5 → 0
    const taperR = 0.18 + (1 - h) * 0.22;  // wider at base
    const a = Math.random() * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(a) * Math.random() * taperR,
      height,
      Math.sin(a) * Math.random() * taperR
    ));
  }

  // 2. Main branches — 5 large limbs spreading out
  const branchDirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7]
  ];
  for (let i = 0; i < branchCount; i++) {
    const bd  = branchDirs[i % 5];
    const t   = Math.random();
    const bLen = 1.6;
    const thick = (Math.random() - 0.5) * 0.12;
    points.push(new THREE.Vector3(
      bd[0] * t * bLen + thick,
      t * 0.9 + 0.1,
      bd[1] * t * bLen + thick
    ));
  }

  // 3. Canopy — layered spherical clusters (oak-like)
  const clusters = [
    { x:  0,    y: 2.0, z:  0,    r: 1.9 },
    { x: -1.4,  y: 1.2, z:  0.6,  r: 1.3 },
    { x:  1.4,  y: 1.2, z:  0.6,  r: 1.3 },
    { x:  0,    y: 1.3, z: -1.4,  r: 1.4 },
    { x: -0.8,  y: 2.8, z: -0.5,  r: 0.9 },
    { x:  0.8,  y: 2.8, z:  0.5,  r: 0.9 },
  ];
  const weights = clusters.map(c => c.r * c.r * c.r);
  const totalW  = weights.reduce((a, b) => a + b, 0);

  for (let i = 0; i < canopyCount; i++) {
    // weighted random cluster
    let rw = Math.random() * totalW, ci = 0;
    for (let j = 0; j < weights.length; j++) { rw -= weights[j]; if (rw <= 0) { ci = j; break; } }
    const c = clusters[ci];
    const u = Math.random(), v = Math.random();
    const theta = u * 2 * Math.PI;
    const phi   = Math.acos(2 * v - 1);
    const r     = Math.cbrt(Math.random()) * c.r;
    points.push(new THREE.Vector3(
      c.x + r * Math.sin(phi) * Math.cos(theta),
      c.y + r * Math.sin(phi) * Math.sin(theta),
      c.z + r * Math.cos(phi)
    ));
  }

  return points;
}

function generateLogo3D(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  const bodyCount   = Math.floor(count * 0.15);
  const armsCount   = Math.floor(count * 0.25);
  const rotorsCount = Math.floor(count * 0.35);
  const textCount   = count - bodyCount - armsCount - rotorsCount;

  // 1. Central body — flattened box drone body
  for (let i = 0; i < bodyCount; i++) {
    points.push(new THREE.Vector3(
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.25 + 0.5,
      (Math.random() - 0.5) * 0.8
    ));
  }

  // 2. Arms — 4 diagonal beams
  const armAngles = [Math.PI/4, 3*Math.PI/4, 5*Math.PI/4, 7*Math.PI/4];
  const armLen    = 2.4;
  for (let i = 0; i < armsCount; i++) {
    const ang  = armAngles[i % 4];
    const dist = Math.random() * armLen;
    const th   = (Math.random() - 0.5) * 0.12;
    points.push(new THREE.Vector3(
      Math.cos(ang) * dist + th,
      0.5 + (Math.random() - 0.5) * 0.1,
      Math.sin(ang) * dist + th
    ));
  }

  // 3. Rotors — full torus rings at each arm tip
  const rotorR = 0.72;
  const rotorSegs = 64;
  for (let i = 0; i < rotorsCount; i++) {
    const ang = armAngles[i % 4];
    const cx  = Math.cos(ang) * armLen;
    const cz  = Math.sin(ang) * armLen;
    // sample on torus surface
    const phi = Math.random() * Math.PI * 2;
    const tubeR = 0.06;
    const tubeA = Math.random() * Math.PI * 2;
    points.push(new THREE.Vector3(
      cx + (rotorR + tubeR * Math.cos(tubeA)) * Math.cos(phi),
      0.5 + tubeR * Math.sin(tubeA),
      cz + (rotorR + tubeR * Math.cos(tubeA)) * Math.sin(phi)
    ));
  }

  // 4. VERTX text — structured 3D stroke letters
  const letters: Array<Array<[[number,number],[number,number]]>> = [
    [ [[-0.8,1],[0,-1]], [[0.8,1],[0,-1]] ],                                                   // V
    [ [[-0.8,1],[-0.8,-1]], [[-0.8,1],[0.6,1]], [[-0.8,0],[0.4,0]], [[-0.8,-1],[0.6,-1]] ], // E
    [ [[-0.8,1],[-0.8,-1]], [[-0.8,1],[0.6,1]], [[0.6,1],[0.6,0]], [[0.6,0],[-0.8,0]], [[-0.2,0],[0.8,-1]] ], // R
    [ [[-0.8,1],[0.8,1]], [[0,1],[0,-1]] ],                                                    // T
    [ [[-0.8,1],[0.8,-1]], [[0.8,1],[-0.8,-1]] ],                                             // X
  ];
  const lSpc = 1.9, startX = -((letters.length - 1) * lSpc) / 2;
  for (let i = 0; i < textCount; i++) {
    const li   = i % letters.length;
    const segs = letters[li];
    const seg  = segs[Math.floor(Math.random() * segs.length)];
    const t    = Math.random();
    const lx   = seg[0][0] + t * (seg[1][0] - seg[0][0]);
    const ly   = seg[0][1] + t * (seg[1][1] - seg[0][1]);
    const dep  = (Math.random() - 0.5) * 0.35;
    const jx   = (Math.random() - 0.5) * 0.06;
    const jy   = (Math.random() - 0.5) * 0.06;
    points.push(new THREE.Vector3(
      startX + li * lSpc + lx * 0.65 + jx,
      -2.0 + ly * 0.65 + jy,
      dep
    ));
  }

  return points;
}

function generateNumbers3D(count: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
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

  for (let i = 0; i < count; i++) {
    const di   = i % strCount.length;
    const segs = segments[strCount[di]];
    const segI = segs[Math.floor(Math.random() * segs.length)];
    const seg  = segLines[segI];
    const t    = Math.random();
    const lx   = seg[0][0] + t * (seg[1][0] - seg[0][0]);
    const ly   = seg[0][1] + t * (seg[1][1] - seg[0][1]);
    // Thick extrusion — tube around each segment
    const tubeR  = 0.18;
    const tubeA  = Math.random() * Math.PI * 2;
    const scatZ  = (Math.random() - 0.5) * 0.9;
    points.push(new THREE.Vector3(
      startX + di * spacing + lx + Math.cos(tubeA) * tubeR * Math.random(),
      ly          + Math.sin(tubeA) * tubeR * Math.random(),
      scatZ
    ));
  }

  return points;
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


function Arm({ angle, material }: { angle: number; material: THREE.Material }) {
  return (
    <group rotation={[0, angle, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.42, 0.055, 0.07]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0, 0.052, 0]} castShadow>
        <boxGeometry args={[2.16, 0.014, 0.082]} />
        <meshStandardMaterial color="#30343b" roughness={0.5} metalness={0.45} />
      </mesh>
    </group>
  );
}

function MotorAssembly({
  index,
  position,
  material,
  navLight,
  propellerRefs,
}: {
  index: number;
  position: [number, number, number];
  material: DroneMaterials;
  navLight?: "red" | "green";
  propellerRefs: MutableRefObject<THREE.Group[]>;
}) {
  return (
    <group position={position}>
      {/* Circular motor housing and rotor base */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.21, 0.18, 32]} />
        <primitive object={material.edge} attach="material" />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.25, 0.018, 10, 56]} />
        <primitive object={material.carbon} attach="material" />
      </mesh>

      {/* Semi-transparent aerodynamic propellers */}
      <group
        ref={(node) => {
          if (node) propellerRefs.current[index] = node;
        }}
        position={[0, 0.22, 0]}
      >
        <PropellerBlade rotation={[0, 0, 0]} material={material.propeller} />
        <PropellerBlade rotation={[0, Math.PI, 0]} material={material.propeller} />
        <PropellerBlade rotation={[0, Math.PI / 2, 0]} material={material.propeller} />
        <PropellerBlade rotation={[0, -Math.PI / 2, 0]} material={material.propeller} />

        {/* Motion blur disk */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.42, 64]} />
          <meshBasicMaterial color="#111217" transparent opacity={0.12} depthWrite={false} />
        </mesh>
      </group>

      {/* Navigation lights */}
      {navLight && (
        <mesh position={[0, -0.08, 0.24]}>
          <sphereGeometry args={[0.045, 16, 12]} />
          <primitive object={navLight === "red" ? material.red : material.green} attach="material" />
        </mesh>
      )}
    </group>
  );
}

function PropellerBlade({
  rotation,
  material,
}: {
  rotation: [number, number, number];
  material: THREE.Material;
}) {
  return (
    <group rotation={rotation}>
      <mesh position={[0.27, 0, 0]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[0.48, 0.014, 0.085]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0.5, 0, 0]} scale={[1.6, 0.16, 0.5]} castShadow>
        <sphereGeometry args={[0.075, 18, 10]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}

function LandingSkids({ material }: { material: THREE.Material }) {
  return (
    <group>
      {[-0.34, 0.34].map((x) => (
        <group key={x} position={[x, -0.46, 0]}>
          <mesh rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.36, 12]} />
            <primitive object={material} attach="material" />
          </mesh>
          <mesh position={[0, -0.19, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.72, 12]} />
            <primitive object={material} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PanelLines({ material }: { material: THREE.Material }) {
  return (
    <group position={[0, 0.139, 0]}>
      <mesh position={[0, 0, 0.22]}>
        <boxGeometry args={[0.7, 0.01, 0.012]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0, 0, -0.22]}>
        <boxGeometry args={[0.7, 0.01, 0.012]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[-0.31, 0, 0]}>
        <boxGeometry args={[0.012, 0.01, 0.4]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[0.31, 0, 0]}>
        <boxGeometry args={[0.012, 0.01, 0.4]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
}

function Vents({ material }: { material: THREE.Material }) {
  return (
    <group position={[0, 0.151, -0.04]}>
      {[-0.18, -0.09, 0, 0.09, 0.18].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.045, 0.01, 0.16]} />
          <primitive object={material} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

function Screws({ material }: { material: THREE.Material }) {
  return (
    <group position={[0, 0.155, 0]}>
      {[
        [-0.43, 0.22],
        [0.43, 0.22],
        [-0.43, -0.22],
        [0.43, -0.22],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.012, 16]} />
          <primitive object={material} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
