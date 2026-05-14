import { SEO } from "@/components/SEO";

export default function Blog() {
  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title="Blog & Insights" 
        description="Stay updated with the latest trends and technology in drone light shows. Insights from our team on the future of aerial entertainment."
      />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white mb-8">Blog & Insights</h1>
        <p>Read the latest news and insights from the world of drone light shows.</p>
      </div>
    </div>
  );
}
