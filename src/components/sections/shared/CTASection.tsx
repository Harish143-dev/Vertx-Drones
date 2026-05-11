import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-primary/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-light mb-6">Ready to light the sky?</h2>
          <p className="text-xl text-muted-foreground font-light mb-12">
            Contact our executive team to discuss your next major event, cultural production, or brand activation.
          </p>

          <form className="max-w-xl mx-auto glass-panel p-8 space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/30 uppercase tracking-widest">Name</label>
                <input type="text" className="w-full bg-white/2 border border-white/6 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/30 uppercase tracking-widest">Company</label>
                <input type="text" className="w-full bg-white/2 border border-white/6 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/30 uppercase tracking-widest">Email</label>
              <input type="email" className="w-full bg-white/2 border border-white/6 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/30 uppercase tracking-widest">Event Details</label>
              <textarea rows={4} className="w-full bg-white/2 border border-white/6 px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            </div>
            <button type="button" className="w-full py-4 bg-primary text-primary-foreground font-bold hover:bg-white hover:text-[#0a0a0a] transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] uppercase tracking-widest text-sm">
              Request Consultation
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
