"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { label } from 'three/tsl';
import { Button } from '@/components/ui/button';

const AnimatedNavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) => {
  const defaultTextColor = isActive ? 'text-[#F97316]' : 'text-white/40';
  const hoverTextColor = 'text-[#F97316]';

  return (
    <Link href={href} className="group relative inline-block px-6 py-2 overflow-hidden">
      <motion.div
        className="flex flex-col items-center justify-center relative h-6"
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={`block text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${defaultTextColor} group-hover:opacity-0 group-hover:-translate-y-full`}>
          {children}
        </span>
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${hoverTextColor} opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0`}>
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinksData = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Corporate', href: '/corporate' },
    { label: 'Wedding', href: '/weddings' },
    { label: 'Simulator', href: '/design' },
    { label: 'Blog', href: '/blog' },
    { label: 'Partners', href: '/partners' },
    { label: 'About Us', href: '/about' }
  ];

  const dotLogo = (
    <div className="relative w-4 h-4 flex items-center justify-center mr-3 group-hover:rotate-90 transition-transform duration-700">
      <span className="absolute w-1 h-1 rounded-full bg-[#F97316] top-0 shadow-[0_0_8px_#F97316]"></span>
      <span className="absolute w-1 h-1 rounded-full bg-white/40 left-0"></span>
      <span className="absolute w-1 h-1 rounded-full bg-white/40 right-0"></span>
      <span className="absolute w-1 h-1 rounded-full bg-[#F97316] bottom-0 shadow-[0_0_8px_#F97316]"></span>
    </div>
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-center pt-2 transition-all duration-700`}
    >
      <motion.div
        layout
        className={`relative flex items-center rounded-full justify-between transition-all duration-700 ease-in-out
                   ${scrolled
            ? 'w-[95%] md:w-[90%] px-8 bg-black/40 backdrop-blur-2xl py-2.5 border border-white/10 shadow-2xl'
            : 'w-full max-w-[1600px] px-12 py-4 bg-transparent border-transparent'}`}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center group shrink-0">
          <img src="/White.svg" alt="VERTX" className="h-5 md:h-7 w-auto object-contain transition-opacity group-hover:opacity-70" />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinksData.map((link) => (
            <AnimatedNavLink
              key={link.label}
              href={link.href}
              isActive={location === link.href}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center shrink-0">
          <Button asChild variant="outline" size="sm" >
            <Link href="/contact">
              Contact
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex items-center justify-center text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} className="w-full h-px bg-white block origin-center" />
            <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-full h-px bg-white block" />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }} className="w-full h-px bg-white block origin-center" />
          </div>
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[-1] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center space-y-10">
              {navLinksData.map((link, i) => (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.label}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-bold uppercase tracking-[0.4em] ${location === link.href ? 'text-[#F97316]' : 'text-white/40 hover:text-white'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8"
              >
                <Button asChild size="lg" className="w-64">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
