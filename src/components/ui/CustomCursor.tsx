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
          transition: transform 0.08s ease-out, opacity 0.2s, background-color 0.2s, border-color 0.2s;
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

        /* Hover states */
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
          animation: color-cycle 6s linear infinite;
          transition: width 0.2s, height 0.2s, box-shadow 0.2s;
        }

        .drone-cursor-dot.hovering {
          width: 8px;
          height: 8px;
          box-shadow: 0 0 15px #00F0FF, 0 0 30px rgba(0, 240, 255, 0.8);
        }

        /* Hide on touch devices — fall back to system cursor */
        @media (max-width: 768px), (pointer: coarse) {
          body, a, button, [role="button"], input, textarea, select, label { cursor: auto !important; }
          .drone-cursor, .drone-cursor-dot { display: none; }
        }
      `}</style>

      <div
        ref={droneRef}
        className={`drone-cursor ${hovering ? "hovering" : ""}`}
        style={{ opacity: visible ? 1 : 0, position: "fixed", left: 0, top: 0 }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className={`drone-cursor-dot ${hovering ? "hovering" : ""}`}
        style={{ opacity: visible ? 1 : 0, position: "fixed", left: 0, top: 0 }}
        aria-hidden
      />
    </>
  );
};

