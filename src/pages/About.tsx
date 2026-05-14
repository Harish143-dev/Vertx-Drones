import { SEO } from "@/components/SEO";

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title="About Us" 
        description="Learn about Vertx Drones, the team behind the most spectacular aerial light shows. Our mission is to transform the sky into a digital canvas for global celebrations."
      />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white mb-8">About Us</h1>
        <p>Learn more about VERTX and our mission to light up the sky.</p>
      </div>
    </div>
  );
}
