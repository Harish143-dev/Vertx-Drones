import { useEffect } from "react";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  Clock, 
  FileCheck2, 
  Layers, 
  ShieldCheck
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

export function ThankYou() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. Meta Pixel 'Lead' event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Drone Show Inquiry",
        status: "success"
      });
    }

    // 2. Google Tag Manager / GA4 DataLayer
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "lead_form_submitted",
        page_location: window.location.href,
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hi VertX Team! I just submitted an inquiry on vertxdroneshow.in. I would like to check date availability and drone choreography options for my event."
  );

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-black">
      <SEO
        title="Thank You | VertX Drone Light Show India"
        description="Thank you for reaching out to VertX Drone Light Show. Our flight directors and choreography team are reviewing your event details."
        keywords="VertX drone show, drone show booking confirmation"
      />
      
      <Navbar />

      <main className="relative pt-32 pb-24 lg:pt-40 px-6 md:px-12">
        {/* Glow backdrop */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none -z-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.12) 0%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Badge & Celebration */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-medium backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span>Inquiry Confirmed • Flight Team Notified</span>
            </div>

            <div className="flex justify-center my-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-primary/30 animate-ping opacity-30 pointer-events-none" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">
              Let’s Light Up Your Sky!
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Thank you for reaching out to <span className="text-white font-medium">VertX Drone Light Show</span>. Our flight engineers and 3D visual artists are reviewing your event requirements.
            </p>
          </div>

          {/* Priority Connect Box (WhatsApp & Call) */}
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-card border border-border/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-primary">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Need Urgent Date Confirmation?</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Chat Directly with our Show Director
                </h2>
                <p className="text-sm text-white/50 max-w-lg">
                  Planning a wedding or high-profile brand launch within the next 30 days? Connect via WhatsApp for immediate slot locking and feasibility.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold shadow-lg hover:scale-[1.02] transition-all"
                >
                  <a
                    href={`https://wa.me/917358598707?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FaWhatsapp size={18} />
                    <span>WhatsApp Us</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:border-primary hover:text-primary hover:bg-transparent"
                >
                  <a href="tel:+917358598707" className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>Direct Call</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Next Steps: 3-Step Roadmap */}
          <div className="mt-16 space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-light tracking-tight text-white flex items-center justify-center md:justify-start gap-2">
                <span>What Happens Next?</span>
                <span className="text-primary text-sm font-normal">— Our 3-Step Process</span>
              </h2>
              <p className="text-sm text-white/50 mt-1">
                Here is how VertX transforms your celebration into a synchronized sky spectacle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-xl bg-card/60 border border-border hover:border-primary/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono font-bold mb-4">
                  01
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Airspace & Safety
                </h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                  Within <strong className="text-white">2–4 hours</strong>, our DGCA-certified flight engineers verify your venue coordinates, green-zone clearances, and safety perimeter.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-xl bg-card/60 border border-border hover:border-primary/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono font-bold mb-4">
                  02
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  3D Storyboard & Quote
                </h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                  Within <strong className="text-white">24 hours</strong>, we share a customized 3D animation concept, recommended drone fleet size (100–1,000+ drones), and quote.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-xl bg-card/60 border border-border hover:border-primary/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono font-bold mb-4">
                  03
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-primary" />
                  Show Consultation
                </h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                  A 15-minute consultation to fine-tune formations, custom logos, soundtrack sync, and finalize execution logistics.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links back to site */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} VertX Drone Light Show India. 100% DGCA Compliant.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link href="/" className="text-white/60 hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/weddings" className="text-white/60 hover:text-primary transition-colors">
                Weddings
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/corporate" className="text-white/60 hover:text-primary transition-colors">
                Corporate
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/portfolio" className="text-white/60 hover:text-primary transition-colors">
                Portfolio
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
