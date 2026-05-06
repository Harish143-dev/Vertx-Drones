import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const droneRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        "a, button, [role='button'], input, textarea, select, label, .interactive"
      );
      setHovering(!!interactive);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Smooth follow (lerp)
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (droneRef.current) {
        droneRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) ${
          hovering ? "scale(1.25)" : "scale(1)"
        }`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [hovering, visible]);

  return (
    <>
      <style>{`
        body {
          cursor: none;
        }
        a, button, [role="button"], input, textarea, select, label {
          cursor: none !important;
        }

        .drone-cursor {
          position: fixed;
          left: 0; top: 0;
          width: 44px; height: 44px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.08s ease-out, opacity 0.2s;
        }
        .drone-cursor-dot {
          position: fixed;
          left: 0; top: 0;
          width: 6px; height: 6px;
          border-radius: 9999px;
          background: #1A8FFF;
          box-shadow: 0 0 12px rgba(26,143,255,0.9), 0 0 24px rgba(26,143,255,0.5);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }

        @keyframes propeller-spin { to { transform: rotate(360deg); } }
        .propeller {
          animation: propeller-spin 0.4s linear infinite;
          transform-origin: center;
        }

        /* Hide on touch devices — fall back to system cursor */
        @media (max-width: 768px), (pointer: coarse) {
          body, a, button, [role="button"], input, textarea, select, label { cursor: auto !important; }
          .drone-cursor, .drone-cursor-dot { display: none; }
        }
      `}</style>

      <div
        ref={droneRef}
        className="drone-cursor"
        style={{ opacity: visible ? 1 : 0, position: "fixed", left: 0, top: 0 }}
        aria-hidden
      >
        <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
          {/* Glow halo */}
          <circle cx="32" cy="32" r="28" fill="rgba(26,143,255,0.08)" />
          {/* Arms */}
          <line x1="20" y1="20" x2="44" y2="44" stroke="#1A8FFF" strokeWidth="1.5" />
          <line x1="44" y1="20" x2="20" y2="44" stroke="#1A8FFF" strokeWidth="1.5" />
          {/* Propellers */}
          <g className="propeller" style={{ transformOrigin: "20px 20px" }}>
            <ellipse cx="20" cy="20" rx="9" ry="2" fill="rgba(82,170,255,0.55)" />
            <ellipse cx="20" cy="20" rx="2" ry="9" fill="rgba(82,170,255,0.55)" />
          </g>
          <g className="propeller" style={{ transformOrigin: "44px 20px", animationDirection: "reverse" }}>
            <ellipse cx="44" cy="20" rx="9" ry="2" fill="rgba(82,170,255,0.55)" />
            <ellipse cx="44" cy="20" rx="2" ry="9" fill="rgba(82,170,255,0.55)" />
          </g>
          <g className="propeller" style={{ transformOrigin: "20px 44px", animationDirection: "reverse" }}>
            <ellipse cx="20" cy="44" rx="9" ry="2" fill="rgba(82,170,255,0.55)" />
            <ellipse cx="20" cy="44" rx="2" ry="9" fill="rgba(82,170,255,0.55)" />
          </g>
          <g className="propeller" style={{ transformOrigin: "44px 44px" }}>
            <ellipse cx="44" cy="44" rx="9" ry="2" fill="rgba(82,170,255,0.55)" />
            <ellipse cx="44" cy="44" rx="2" ry="9" fill="rgba(82,170,255,0.55)" />
          </g>
          {/* Motors */}
          <circle cx="20" cy="20" r="3" fill="#070B0F" stroke="#1A8FFF" strokeWidth="1" />
          <circle cx="44" cy="20" r="3" fill="#070B0F" stroke="#1A8FFF" strokeWidth="1" />
          <circle cx="20" cy="44" r="3" fill="#070B0F" stroke="#1A8FFF" strokeWidth="1" />
          <circle cx="44" cy="44" r="3" fill="#070B0F" stroke="#1A8FFF" strokeWidth="1" />
          {/* Core body */}
          <rect x="26" y="26" width="12" height="12" rx="2" fill="#070B0F" stroke="#1A8FFF" strokeWidth="1.2" />
          <circle cx="32" cy="32" r="2" fill="#52AAFF">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div
        ref={dotRef}
        className="drone-cursor-dot"
        style={{ opacity: visible ? 1 : 0, position: "fixed", left: 0, top: 0 }}
        aria-hidden
      />
    </>
  );
};
