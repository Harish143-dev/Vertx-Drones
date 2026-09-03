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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-600px h-350px pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.12) 0%, transparent 70%)" }}  
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Top Badge & Celebration */}
          <div className="text-center space-y-4">
            <div className="flex justify-center my-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-primary/30 animate-ping opacity-30 pointer-events-none" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white py-10">
              Let’s Light Up Your Sky!
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Thank you for reaching out to <span className="text-white font-medium">VertX Drone Light Show</span>. Our flight engineers and 3D visual artists are reviewing your event requirements.
            </p>
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
