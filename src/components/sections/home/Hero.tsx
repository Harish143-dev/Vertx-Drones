import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function Hero() {

  const headline = "India's Most Advanced Drone Light Shows";

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/mp_.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-end flex-1 pb-10 md:pb-12 pt-28">
        <div className="flex flex-col items-start">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 max-w-2xl leading-[1.1]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
            }}
          >
            {headline.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-sm md:text-lg text-white/80 font-light max-w-xl leading-relaxed mb-6"
          >
            Elevating brand storytelling with mesmerizing aerial choreography. We transform the night sky into your limitless digital canvas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/contact"
              className="px-8 py-3 bg-[#F97316] text-[#0a0a0a] font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] uppercase tracking-widest text-xs flex items-center justify-center"
            >
              Book a Show
            </a>
            <a
              href="/contact?quote=true"
              className="px-8 py-3 border border-white/20 text-white font-medium hover:bg-white/10 transition-all uppercase tracking-widest text-xs flex items-center justify-center"
            >
              Get a Quote
            </a>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Floating CTA */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, type: "spring", bounce: 0.5 }}
        href="https://wa.me/"
        target="_blank"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_32px_rgba(37,211,102,0.6)] transition-all duration-300"
      >
        <FaWhatsapp size={30} />
      </motion.a>
    </section>
  );
}
