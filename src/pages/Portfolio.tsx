import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioGallery } from "@/components/sections/portfolio/PortfolioGallery";
import { PortfolioCaseStudies } from "@/components/sections/portfolio/PortfolioCaseStudies";
import { PortfolioCTA } from "@/components/sections/portfolio/PortfolioCTA";
import { SEO } from "@/components/SEO";

export default function Portfolio() {
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "name": "Drone Light Shows Delivered Across India",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Drug Awareness Initiative",
            "description": "50 drones, Besant Nagar, Chennai"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Corporate Brand Activation",
            "description": "50 drones, Mahabalipuram"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Wedding Drone Show",
            "description": "100 to 150 drones, Hyderabad"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Cultural Fest Show",
            "description": "100 drones, Chennai"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Political Campaign Show",
            "description": "150 drones, Panakudi"
          }
        ]
      },
      {
        "@type": "VideoObject",
        "name": "VertX Drone Light Show Portfolio",
        "description": "Real footage from real VertX drone light shows across India.",
        "thumbnailUrl": "https://vertx-drones.com/og-image.jpg",
        "uploadDate": "2024-01-01T08:00:00+08:00",
        "contentUrl": "https://vertx-drones.com/portfolio"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      <SEO 
        title="Drone Light Show Portfolio | VertX Drone Shows India" 
        description="Real footage from real VertX drone light shows across India. Government events, corporate activations, weddings and national celebrations. Watch our work."
        keywords="drone light show portfolio India, drone show videos India, drone light show case studies India, drone show formations India, drone show government events India, wedding drone show India, corporate drone show India"
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <Navbar />
      <main>
        {/* 1. Hero — cinematic header */}
        <PortfolioHero />

        {/* 2. Gallery — filterable project grid + lightbox */}
        <PortfolioGallery />

        {/* 3. Case Studies */}
        <PortfolioCaseStudies />

        {/* 4. CTA — book your show */}
        <PortfolioCTA />
      </main>
      <Footer />
    </div>
  );
}
