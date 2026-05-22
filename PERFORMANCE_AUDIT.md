# Vertx Website Performance Audit Report

**Date:** May 22, 2026  
**Project:** Vertx Drones (React SPA + Vite + Three.js)  
**Objective:** Identify page load speed bottlenecks, rendering lag (stuttering), and implement strategies to achieve a highly responsive, fast, and optimized production site.

---

## 1. Executive Summary: What is Lagging & Why?

While the Vertx website features premium visual aesthetics, it suffers from severe performance bottlenecks that degrade initial loading times and cause runtime lagging, especially on mobile devices or slower network connections. 

The three primary causes of the performance lag are:
1. **Asset Overload (Network Bottleneck):** The website serves extremely heavy, uncompressed media files directly from the static directory on page mount. The home page hero video is **19.4 MB**, and the Portfolio page loads and autoplays **four massive videos concurrently, totaling 45+ MB** on mount.
2. **Monolithic Bundle (JS Parsing Bottleneck):** All routes—including the 3D Show Builder (which imports heavy packages like `three`, `@react-three/fiber`, `@react-three/drei`, and `@react-three/postprocessing`)—are statically imported in [App.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/App.tsx). This results in a massive **1.6 MB** entrypoint bundle that must be fully downloaded and compiled before a visitor can see *any* page.
3. **CPU & Rendering Loop Bottlenecks (Smoothness Bottleneck):** The interactive custom cursor ([CustomCursor.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/components/ui/CustomCursor.tsx)) triggers React component re-renders on mouse movement/hover states. This constantly tears down and recreates the `requestAnimationFrame` loop, resulting in visible mouse stuttering. Additionally, there is significant dead 3D code (`DroneHeroScene`) loaded in memory but never rendered.

---

## 2. In-Depth Analysis of Bottlenecks

### A. Monolithic Bundle & Lack of Code Splitting
In [App.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/App.tsx), all page components are imported at the top of the file:
```typescript
import { Home } from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Corporate from "@/pages/Corporate";
import Weddings from "@/pages/Weddings";
import Simulator from "@/pages/Simulator";
...
```
Because of this, the production build packs the entire React application into a single JavaScript file. Any user visiting the Home, About, or Blog pages is forced to download `three.js` and all WebGL code, leading to an unnecessarily high **Time to Interactive (TTI)** and **First Contentful Paint (FCP)**.

### B. Severe Media Weight (Videos & Images)
An audit of the [public/](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/public) and [src/assets/](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/assets) folders revealed:
- **`public/hero_section.mp4` (19.4 MB):** Served directly in the Home page Hero background. Servicing a 19MB video file on a standard mobile connection will halt script parsing and delay page interactivity.
- **`src/assets/videos/gallery/Pondicherry.mp4` (19.5 MB):** Loaded statically on the Portfolio page.
- **Simultaneous Video Autoplays on Portfolio:** In [PortfolioGallery.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/components/sections/portfolio/PortfolioGallery.tsx), the grid elements render autoplaying, looping video tags:
  ```tsx
  {project.video ? (
    <video
      src={project.video}
      muted
      loop
      playsInline
      autoPlay
      className="..."
    />
  ) : ...
  ```
  When the user visits `/portfolio`, the browser attempts to download and decode **4 massive videos simultaneously**. This chokes the GPU and network stream.

### C. Custom Cursor Paint Loops
In [CustomCursor.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/components/ui/CustomCursor.tsx), React state is used to track `hovering` and `visible`:
```typescript
const [hovering, setHovering] = useState(false);
const [visible, setVisible] = useState(false);
```
Every time the cursor moves over a link or button, or goes off-screen, React triggers a component re-render. Since `useEffect` depends on `[hovering, visible]`, the mouse movement listener and the `requestAnimationFrame` loop are destroyed and recreated continuously. This causes frame rate drops during hover transitions.

### D. Server-Side Asset Delivery
The current [.htaccess](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/public/.htaccess) handles client-side routing rewrites for SPAs but does not enforce Gzip/Brotli compression, nor does it define browser caching policies. As a result, repeat visitors have to download the 1.6MB JS bundle and media assets on every visit.

---

## 3. How Can We Increase Performance? (Action Plan)

We can increase performance, remove lagging, and streamline the website loading speed using 6 concrete steps:

### Step 1: Route-Level Code Splitting (Lazy Loading)
We can split the app's bundle using React's `lazy` and `Suspense`. This ensures that Three.js and heavy WebGL libraries are **only** downloaded when a user visits the `/design` (Simulator) route.

**Suggested Refactor in [App.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/App.tsx):**
```tsx
import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/ui/PageLoader"; // A custom elegant page loader

// Lazy-load page components
const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Corporate = lazy(() => import("@/pages/Corporate"));
const Weddings = lazy(() => import("@/pages/Weddings"));
const Simulator = lazy(() => import("@/pages/Simulator"));
const About = lazy(() => import("@/pages/About"));
const Partners = lazy(() => import("@/pages/Partners"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/corporate" component={Corporate} />
        <Route path="/weddings" component={Weddings} />
        <Route path="/design" component={Simulator} />
        <Route path="/about" component={About} />
        <Route path="/partners" component={Partners} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
```

---

### Step 2: Lazy Video Hover Loading on Portfolio Page
Instead of autoplaying all videos simultaneously, we must follow the **Hover-to-Play** pattern used on the Home Page Showcase. In [PortfolioGallery.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/components/sections/portfolio/PortfolioGallery.tsx), we should:
1. Render the static WebP image as the primary poster in the grid.
2. Load and play the video **only** when the user hovers over a card, setting `preload="none"` to prevent pre-fetching.

**Suggested Refactor in [PortfolioGallery.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/components/sections/portfolio/PortfolioGallery.tsx):**
```tsx
// 1. Maintain hover state refs for each card index
const hoverVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

const handleHoverPlay = (index: number, play: boolean) => {
  const video = hoverVideoRefs.current[index];
  if (!video) return;
  if (play) {
    video.currentTime = 0;
    video.play().catch(() => {});
  } else {
    video.pause();
  }
};

// 2. Update rendering loop:
{projects.map((project, i) => (
  <div
    key={project.id}
    onMouseEnter={() => handleHoverPlay(i, true)}
    onMouseLeave={() => handleHoverPlay(i, false)}
    className="group relative cursor-pointer overflow-hidden aspect-[16/9] rounded-lg"
    onClick={() => setSelectedProject(project)}
  >
    {/* Always show WebP image as poster background */}
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
    />
    
    {/* Overlay Video: load on demand, start transparent */}
    {project.video && (
      <video
        ref={(el) => { hoverVideoRefs.current[i] = el; }}
        src={project.video}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />
    )}
    ...
  </div>
))}
```

---

### Step 3: Optimize Custom Cursor (Zero-Render Direct DOM Mutation)
We can eliminate cursor stuttering entirely by storing `hovering` and `visible` in React `useRef` tokens and modifying the DOM classes directly. This ensures the component *never* re-renders after mounting, achieving a fluid 60+ FPS cursor.

**Suggested Refactor in [CustomCursor.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/components/ui/CustomCursor.tsx):**
```tsx
import { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const droneRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hoveringRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const droneEl = droneRef.current;
    const dotEl = dotRef.current;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        if (droneEl) droneEl.style.opacity = "1";
        if (dotEl) dotEl.style.opacity = "1";
      }

      const el = e.target as HTMLElement;
      const interactive = el.closest(
        "a, button, [role='button'], input, textarea, select, label, .interactive"
      );

      const isInteractive = !!interactive;
      if (hoveringRef.current !== isInteractive) {
        hoveringRef.current = isInteractive;
        if (isInteractive) {
          droneEl?.classList.add("hovering");
          dotEl?.classList.add("hovering");
        } else {
          droneEl?.classList.remove("hovering");
          dotEl?.classList.remove("hovering");
        }
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      if (droneEl) droneEl.style.opacity = "0";
      if (dotEl) dotEl.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (droneEl) {
        droneEl.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) ${
          hoveringRef.current ? "scale(1.25)" : "scale(1)"
        }`;
      }
      if (dotEl) {
        dotEl.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, [role="button"], input, textarea, select, label { cursor: none !important; }
        @keyframes color-cycle {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes rotate-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .drone-cursor {
          position: fixed;
          left: 0; top: 0;
          width: 32px; height: 32px;
          border-radius: 9999px;
          border: 1.5px solid #00F0FF;
          background: rgba(0, 240, 255, 0.04);
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.3), inset 0 0 8px rgba(0, 240, 255, 0.15);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.2s, background-color 0.2s, border-color 0.2s;
          animation: color-cycle 6s linear infinite;
        }
        .drone-cursor::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 9999px;
          border: 1px dashed rgba(0, 240, 255, 0.45);
          animation: rotate-ring 10s linear infinite;
          transition: inset 0.2s ease, border-color 0.2s ease;
        }
        .drone-cursor.hovering {
          background: rgba(0, 240, 255, 0.1);
          border-color: #00F0FF;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.5), inset 0 0 10px rgba(0, 240, 255, 0.25);
        }
        .drone-cursor.hovering::after {
          inset: -4px;
          border-color: rgba(0, 240, 255, 0.7);
          animation-duration: 5s;
        }
        .drone-cursor-dot {
          position: fixed;
          left: 0; top: 0;
          width: 6px; height: 6px;
          border-radius: 9999px;
          background: #FFFFFF;
          border: 1px solid #00F0FF;
          box-shadow: 0 0 10px #00F0FF, 0 0 20px rgba(0, 240, 255, 0.6);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: color-cycle 6s linear infinite;
          transition: width 0.2s, height 0.2s, box-shadow 0.2s;
        }
        .drone-cursor-dot.hovering {
          width: 8px;
          height: 8px;
          box-shadow: 0 0 15px #00F0FF, 0 0 30px rgba(0, 240, 255, 0.8);
        }
        @media (max-width: 768px), (pointer: coarse) {
          body, a, button, [role="button"], input, textarea, select, label { cursor: auto !important; }
          .drone-cursor, .drone-cursor-dot { display: none; }
        }
      `}</style>
      <div ref={droneRef} className="drone-cursor" aria-hidden />
      <div ref={dotRef} className="drone-cursor-dot" aria-hidden />
    </>
  );
};
```

---

### Step 4: Dead Code Elimination (Removing `DroneHeroScene`)
The [DroneModel.tsx](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/src/components/three/DroneModel.tsx) file contains `DroneHeroScene` and a highly detailed model definition `DroneModel` which are never imported by any active page (the Simulator page renders `SimulatorHero` using a static WebP image). 

Removing this dead code reduces the size of the 3D bundle module and avoids parsing heavy mesh and lighting arrays.

---

### Step 5: Compress & Stream Video Assets (FFmpeg)
Serving 19.4 MB raw video files causes critical lag. We can optimize these files in two ways:
1. **Host on CDN / Video Streamer:** Move media assets to an external CDN (e.g. AWS S3 + CloudFront, Vercel Blob, Cloudinary) that supports **range requests (HTTP 206)**. This allows the browser to buffer the video on demand instead of waiting for a single monolithic download.
2. **Compress with FFmpeg:** Compress the video files to H.264 MP4 format with constrained bitrates.
   * *Example compression command for the hero video:*
     ```bash
     ffmpeg -i public/hero_section.mp4 -vcodec libx264 -crf 28 -preset medium -acodec aac -b:a 128k -vf scale=1280:-2 public/hero_section_optimized.mp4
     ```
     This reduces the 19.4 MB video to **~1.8 MB** with minimal perceptual quality loss for background rendering.

---

### Step 6: Configure `.htaccess` Caching & Compression Policies
Adding expiration rules and compression to `.htaccess` ensures that visitors do not re-request bulky JS files, images, and videos on subsequent page navigations.

**Suggested addition to [public/.htaccess](file:///c:/Users/Harish/Documents/Eyelevel/Websites/Vertx-drones/public/.htaccess):**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  
  # CSS and JS
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  
  # Media Assets
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_deflate.c>
  # Compress HTML, CSS, JavaScript, Text, XML and fonts
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
  AddOutputFilterByType DEFLATE application/x-font
  AddOutputFilterByType DEFLATE application/x-font-opentype
  AddOutputFilterByType DEFLATE application/x-font-otf
  AddOutputFilterByType DEFLATE application/x-font-truetype
  AddOutputFilterByType DEFLATE application/x-font-ttf
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE font/opentype
  AddOutputFilterByType DEFLATE font/otf
  AddOutputFilterByType DEFLATE font/ttf
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE image/x-icon
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
</IfModule>
```

---

## 4. Projected Impact Assessment

| Metric / Page | Current State | Target State (Post-Optimizations) | Impact |
|---|---|---|---|
| **Initial JS Bundle Size** | 1.6 MB | **~150 KB** (Main) + ~1.4 MB (Simulator chunk) | **-90%** load size for Home & general pages |
| **Home Page Video Weight** | 19.4 MB | **~1.8 MB** (Compressed) | **-91%** video weight, faster rendering |
| **Portfolio Page Load Weight** | 45.4 MB (4 Autoplay Videos) | **< 1.2 MB** (WebP posters + lazy preload) | **-97%** initial page weight, no GPU throttle |
| **Custom Cursor Performance** | Laggy during hover / React re-renders | **Butter-smooth (60+ FPS)** (Direct DOM mutation) | Smooth user interactions |
| **Repeat Visit Load Speed** | Slow (No caching, refetching resources) | **Instant (Cache Hit)** | Improved retention and SEO ranking |

---

## 5. Next Steps

To execute these optimizations, we can apply the code changes in the following sequence:
1. **Create `PageLoader` component** and integrate **Route Lazy Loading** in `App.tsx` (Step 1).
2. **Refactor `PortfolioGallery.tsx`** to show static WebP images and lazy load videos on hover (Step 2).
3. **Refactor `CustomCursor.tsx`** to eliminate state updates and mutate the DOM directly (Step 3).
4. **Clean up/Disable unused components** in `DroneModel.tsx` (Step 4).
5. **Update `.htaccess`** with caching and compression headers (Step 6).
