import { motion } from "framer-motion";


const ORANGE = "#F97316";

const steps = [
  {
    number: "01",
    title: "Plan",
    timing: "2 weeks before the event",
    description: "A safe flight zone and the best viewing spots are confirmed. Permissions are secured, and we collaborate with you to ensure full compliance.",
    bullets: ["Location Recce", "Permissions", "Theme of the Event"],
  },
  {
    number: "02",
    title: "Design",
    timing: "1-2 weeks before the event",
    description: "Once the show concept is approved, our creative team gets to work on crafting custom animations, programming the drone movements, and mixing perfectly synchronous audio.",
    bullets: ["Storyboarding", "Animation & Show Programming", "Sound Production"],
  },
  {
    number: "03",
    title: "Arrival & Assembly",
    timing: "2 days before the event",
    description: "The equipment and operations team arrive on-site. We begin preparations for the actual deployment of the drone fleet.",
    bullets: ["Equipment Transport", "On-Site Setup"],
  },
  {
    number: "04",
    title: "Final Checks",
    timing: "1 day before the event",
    description: "Final safety checks and multiple test flights are conducted to ensure flawless execution on show night.",
    bullets: ["Testing & Trials", "Final Safety Checks"],
  },
];

const DroneIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
    style={{ color: ORANGE }}
  >
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M8 8l-3 -3" />
    <path d="M16 8l3 -3" />
    <path d="M8 16l-3 3" />
    <path d="M16 16l3 3" />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
    <circle cx="19" cy="5" r="1" fill="currentColor" />
    <circle cx="5" cy="19" r="1" fill="currentColor" />
    <circle cx="19" cy="19" r="1" fill="currentColor" />
  </svg>
);

export function Process() {
  return (
    <section id="process" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ORANGE }}>
            How It Works
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl leading-tight">
              From Concept to Sky
            </h2>
            <p className="text-white/35 text-sm font-light max-w-xs md:text-right leading-relaxed">
              From concept to sky—every step is carefully crafted.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-white/6"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-8 flex flex-col group"
            >
              <div className="mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{ color: `${ORANGE}22`, fontFamily: "'Orbitron', sans-serif" }}
                >
                  {step.number}
                </span>
              </div>

              <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-2">{step.timing}</p>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-xs text-white/38 font-light leading-relaxed mb-5 flex-1">{step.description}</p>

              <ul className="space-y-2">
                {step.bullets.map((b, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[13px] text-white/50">
                    <DroneIcon size={14} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Grand Finale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-px border border-white/6 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6"
          style={{ background: `${ORANGE}08` }}
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: ORANGE }}>The Big Day</p>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">The Grand Finale</h3>
            <p className="text-sm text-white/40 font-light mb-2">
              The big day! The sky comes alive as your vision takes flight—literally.
            </p>
            <div className="flex items-center gap-2.5 text-sm font-medium text-white/80">
              <DroneIcon size={16} />
              Drone Light Show Live!
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
