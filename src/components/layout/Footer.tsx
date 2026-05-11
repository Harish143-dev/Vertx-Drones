"use client";

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Instagram, Twitter, Linkedin, Facebook, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Show Builder', href: '/simulator' },
    { label: 'About', href: '/about' },
  ];

  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#F97316]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-8">
              <img src="/White.svg" alt="VERTX" className="h-6 w-auto object-contain" />
            </Link>
            <p className="text-white/50 font-light leading-relaxed max-w-sm mb-8 text-sm md:text-base">
              Pioneering the future of aerial entertainment through cinematic drone light shows. 
              Based in India, staged across the globe.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#F97316] hover:bg-[#F97316]/10 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/40 hover:text-[#F97316] transition-colors text-sm font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Offerings</h4>
            <ul className="space-y-4">
              {['Corporate', 'Weddings', 'National Events', 'Festivals'].map((item) => (
                <li key={item}>
                  <span className="text-white/40 hover:text-[#F97316] transition-colors text-sm font-light cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@vertx.com" className="text-white/40 hover:text-[#F97316] transition-colors text-sm font-light">
                  hello@vertx.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-[#F97316] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
            <span>© {new Date().getFullYear()} VERTX</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>

          {/* Credit Line - Requested by user */}
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
            Design and developed by <a href="https://eyelevel.io" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F97316] transition-all">Eyelevel Growth Studio</a>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 hover:text-white transition-all"
          >
            Back to Top
            <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#F97316] group-hover:bg-[#F97316]/10 transition-all">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* Large Watermark */}
      <div className="absolute -bottom-20 -right-20 select-none pointer-events-none opacity-[0.02]">
        <h2 className="text-[300px] font-bold uppercase tracking-tighter text-white">VERTX</h2>
      </div>
    </footer>
  );
}
