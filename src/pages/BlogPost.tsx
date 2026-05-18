import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { blogData } from "@/data/blogData";
import { ArrowLeft } from "lucide-react";
import NotFound from "./not-found";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogData.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <NotFound />;
  }

  const Content = post.content;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <SEO 
        title={post.metaTitle} 
        description={post.metaDescription}
      />
      <Navbar />

      <main className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <article className="container mx-auto px-6 md:px-12">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-12 max-w-3xl mx-auto"
          >
            <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground hover:text-white uppercase tracking-widest text-xs font-bold mb-8">
              <Link href="/blog">
                <ArrowLeft size={14} className="mr-2" />
                Back to Insights
              </Link>
            </Button>

            <div className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
              <span>{post.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.2] tracking-tight text-white mb-12">
              {post.title}
            </h1>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="max-w-3xl mx-auto prose prose-invert prose-lg prose-h2:text-2xl prose-h2:font-light prose-h2:mt-12 prose-h2:mb-6 prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed prose-li:text-muted-foreground prose-li:font-light prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          >
            <Content />
          </motion.div>

        </article>
      </main>

      <Footer />
    </div>
  );
}
