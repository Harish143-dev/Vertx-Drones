import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ORANGE = "#F97316";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 150, suffix: "+", label: "Shows Completed" },
  { value: 50000, suffix: "+", label: "Drones Deployed" },
  { value: 25, suffix: "+", label: "Cities Covered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  const formatted = value >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold" style={{ color: ORANGE, fontFamily: "'Orbitron', sans-serif" }}>
      {formatted}{suffix}
    </span>
  );
}

export function PortfolioStats() {
  return (
    <section className="py-16 bg-[#0a0a0a] border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-xs md:text-sm text-white/35 font-light tracking-wide uppercase mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
