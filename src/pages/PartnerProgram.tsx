import { SEO } from "@/components/SEO";

export default function PartnerProgram() {
  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title="Partner Program" 
        description="Join the Vertx Drones partner network. Offer world-class drone light shows to your clients and grow your event business with our spectacular aerial technology."
      />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white mb-8">Partner Program</h1>
        <p>Join our partner network and offer drone light shows to your clients.</p>
      </div>
    </div>
  );
}
