import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  keywords?: string;
  robots?: string;
}

export const SEO = ({ 
  title, 
  description = "VertX Drones - Leading drone light show company providing spectacular aerial displays for corporate events, weddings, and special celebrations.", 
  canonical,
  type = "website",
  image = "/512.png",
  keywords,
  robots = "index, follow"
}: SEOProps) => {
  const [location] = useLocation();
  const siteTitle = "VertX Drones";
  
  // Only append siteTitle if the title doesn't already contain "Vertx" or "VertX"
  const needsSuffix = title && !title.toLowerCase().includes("vertx");
  const fullTitle = title 
    ? (needsSuffix ? `${title} | ${siteTitle}` : title) 
    : siteTitle;
    
  const siteUrl = "https://vertxdroneshow.in";
  const currentPath = location;
  const normalizedPath = currentPath === '' || currentPath === '/' ? '/' : currentPath;
  const finalCanonical = canonical || `${siteUrl}${normalizedPath}`;
  const finalImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* Additional SEO */}
      <meta name="robots" content={robots} />
    </Helmet>
  );
};
