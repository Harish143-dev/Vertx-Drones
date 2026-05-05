import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";

const services = [
  {
    label: "Corporate",
    href: "/corporate",
    desc: "Custom drone shows for brands and events",
    accent: "#F97316",
  },
  {
    label: "Weddings",
    href: "/weddings",
    desc: "Magical aerial displays for your special day",
    accent: "#a855f7",
  },
];

const resources = [
  {
    label: "About",
    href: "/about",
    desc: "Learn about the team behind the magic",
    accent: "#3b82f6",
  },
  {
    label: "Partner Program",
    href: "/partner-program",
    desc: "Collaborate and grow with VERTX",
    accent: "#10b981",
  },
  {
    label: "Blog / Insights",
    href: "/blog",
    desc: "Latest news, articles, and updates",
    accent: "#eab308",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const isContact = location === "/contact";
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) => location === href;

  const renderDropdown = (title: string, items: typeof services) => {
    const isOpen = activeDropdown === title;
    return (
      <div 
        className="relative group py-2"
        onMouseEnter={() => setActiveDropdown(title)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button
          className={`flex items-center gap-1.5 text-sm font-light tracking-wide uppercase transition-colors ${isOpen ? "text-white" : "text-white/45 hover:text-white"
            }`}
        >
          {title}
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px] bg-[#0f0f0f] border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
              <div className="p-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-start gap-4 px-4 py-4 group hover:bg-white/3 transition-colors duration-200"
                  >

                    <div>
                      <div className="text-sm font-medium text-white tracking-wide mb-0.5">{item.label}</div>
                      <div className="text-xs text-white/60 font-light leading-relaxed">{item.desc}</div>
                    </div>
                    <div
                      className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
                      style={{ color: item.accent }}
                    >
                      →
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderMobileDropdown = (title: string, items: typeof services) => {
    const isOpen = mobileDropdown === title;
    return (
      <div className="border-b border-white/5">
        <button
          onClick={() => setMobileDropdown(isOpen ? null : title)}
          className="w-full flex items-center justify-between py-3 text-sm font-light text-white/45 hover:text-white transition-colors tracking-wide uppercase"
        >
          {title}
          <ChevronDown size={13} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pb-3 space-y-1 pl-2">
                {items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-2.5 text-sm text-white/40 hover:text-white transition-colors">

                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isContact ? "glass-panel py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/White.svg" alt="VERTX" className="h-6 md:h-7 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div ref={dropdownRef} className="hidden lg:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-light tracking-wide uppercase transition-colors ${isActive("/") ? "text-[#F97316]" : "text-white/45 hover:text-white"
              }`}
          >
            Home
          </Link>

          <Link
            href="/portfolio"
            className={`text-sm font-light tracking-wide uppercase transition-colors ${isActive("/portfolio") ? "text-[#F97316]" : "text-white/45 hover:text-white"
              }`}
          >
            Portfolio
          </Link>

          {renderDropdown("Shows", services)}

          <Link
            href="/simulator"
            className={`text-sm font-light tracking-wide uppercase transition-colors ${isActive("/simulator") ? "text-[#F97316]" : "text-white/45 hover:text-white"
              }`}
          >
            Simulator
          </Link>

          {renderDropdown("Company", resources)}

          <Link
            href="/contact"
            className={`text-sm font-medium px-6 py-2 border transition-colors tracking-wide ${isContact
              ? "border-[#F97316] text-[#F97316] bg-[#F97316]/10"
              : "border-[#F97316]/50 text-[#F97316] hover:bg-[#F97316]/10"
              }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#0f0f0f] border-t border-white/10 overflow-hidden lg:hidden"
          >
            <div className="p-6 flex flex-col space-y-1 max-h-[80vh] overflow-y-auto">
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-light text-white/45 hover:text-white transition-colors tracking-wide uppercase border-b border-white/5">
                Home
              </Link>

              <Link href="/portfolio" onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-light text-white/45 hover:text-white transition-colors tracking-wide uppercase border-b border-white/5">
                Portfolio
              </Link>

              {renderMobileDropdown("Shows", services)}

              <Link href="/simulator" onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-light text-white/45 hover:text-white transition-colors tracking-wide uppercase border-b border-white/5">
                Simulator
              </Link>

              {renderMobileDropdown("Company", resources)}

              <Link href="/contact" onClick={() => setMobileOpen(false)}
                className="mt-6 py-3 text-center text-sm font-medium text-[#F97316] border border-[#F97316]/40 hover:bg-[#F97316]/10 transition-colors tracking-wide uppercase">
                Contact / Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
