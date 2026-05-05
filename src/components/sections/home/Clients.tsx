const clients = [
  "NEXUS GLOBAL",
  "AERIS DYNAMICS",
  "QUANTUM MOTORS",
  "SYNERGY LABS",
  "VALIANT CAPITAL",
  "ORBIT VENTURES",
  "ZENITH CORP",
  "APEX INDUSTRIES",
];

export function Clients() {
  const repeated = [...clients, ...clients, ...clients];

  return (
    <section className="py-12 border-y border-white/6 bg-[#0a0a0a] overflow-hidden">
      <p className="text-center text-xs font-medium tracking-[0.2em] text-white/25 uppercase mb-8">
        Trusted by Industry Leaders
      </p>

      <div className="relative">
        <div
          className="flex gap-16 md:gap-24 w-max"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {repeated.map((client, index) => (
            <span
              key={index}
              className="text-base md:text-lg font-light tracking-[0.2em] text-white/30 hover:text-[#F97316] hover:[text-shadow:0_0_12px_rgba(249,115,22,0.5)] transition-all duration-400 cursor-default whitespace-nowrap select-none"
            >
              {client}
              <span className="ml-16 md:ml-24 text-[#F97316]/20">✦</span>
            </span>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
