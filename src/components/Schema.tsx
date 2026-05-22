import { Helmet } from "react-helmet-async";

interface SchemaProps {
  schema: Record<string, any> | Record<string, any>[];
}

export const Schema = ({ schema }: SchemaProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Common schema generator functions
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "VertX Drones",
  "image": "https://vertxdroneshow.in/Original.svg",
  "@id": "https://vertxdroneshow.in/#localbusiness",
  "url": "https://vertxdroneshow.in",
  "telephone": "+917358598707",
  "email": "business@vertxdroneshow.in",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "New #32, 2nd floor, 16th Main Road, West, Kathiravan Colony, Anna Nagar",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600040",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 13.0848,
    "longitude": 80.2101
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/share/1CVFdBUyzg/",
    "https://www.instagram.com/vertx.de?igsh=MXE3ZWFuMXBueHpjaw==",
    "https://www.linkedin.com/company/vertx-drone-entity/"
  ]
});

export const getServiceSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "serviceType": "Drone Light Show",
  "provider": {
    "@type": "LocalBusiness",
    "name": "VertX Drones",
    "url": "https://vertxdroneshow.in"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "description": description,
  "url": url
});

export const getBlogPostingSchema = (
  title: string,
  description: string,
  datePublished: string,
  image: string,
  url: string
) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": url
  },
  "headline": title,
  "description": description,
  "image": image.startsWith('http') ? image : `https://vertxdroneshow.in${image}`,
  "datePublished": new Date(datePublished).toISOString().split('T')[0],
  "author": {
    "@type": "Organization",
    "name": "VertX Drones",
    "url": "https://vertxdroneshow.in"
  },
  "publisher": {
    "@type": "Organization",
    "name": "VertX Drones",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vertxdroneshow.in/Original.svg"
    }
  }
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
