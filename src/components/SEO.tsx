import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
}

export const SEO = ({ 
  title, 
  description = "Vertx Drones - Leading drone light show company providing spectacular aerial displays for corporate events, weddings, and special celebrations.", 
  canonical,
  type = "website",
  image = "/og-image.jpg" // Default OG image
}: SEOProps) => {
  const siteTitle = "Vertx Drones";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = window.location.origin;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};
