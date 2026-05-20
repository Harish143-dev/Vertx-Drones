import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { blogData } from "@/data/blogData";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import NotFound from "./not-found";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogData.find(p => p.slug === slug);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <NotFound />;
  }

  const Content = post.content;

  // Get 3 related posts
  const currentIndex = blogData.findIndex(p => p.slug === slug);
  const relatedPosts = [
    blogData[(currentIndex + 1) % blogData.length],
    blogData[(currentIndex + 2) % blogData.length],
    blogData[(currentIndex + 3) % blogData.length],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white">
      <SEO 
        title={post.metaTitle} 
        description={post.metaDescription}
      />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <article className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mb-12"
            >
              <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground hover:text-white uppercase tracking-widest text-xs font-bold mb-8">
                <Link href="/blog">
                  <ArrowLeft size={14} className="mr-2" />
                  Back to Insights
                </Link>
              </Button>

              <div className="mb-6 flex flex-wrap items-center gap-3 md:gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-sm">{post.category}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{post.date}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock size={12} /> {post.readTime} read
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-white mb-12">
                {post.title}
              </h1>
              
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border/50 mb-12">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.1}
              className="prose prose-invert prose-lg max-w-none 
                prose-h2:text-3xl prose-h2:font-light prose-h2:mt-16 prose-h2:mb-6 prose-h2:tracking-tight
                prose-p:text-white/70 prose-p:font-light prose-p:leading-[1.8] prose-p:mb-8
                prose-li:text-white/70 prose-li:font-light prose-li:leading-[1.8]
                prose-strong:text-white prose-strong:font-medium
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-primary/80 prose-a:transition-colors
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8
                prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-white/90 prose-blockquote:font-light prose-blockquote:not-italic"
            >
              <Content />
            </motion.div>
          </div>
        </article>

        {/* Read Next Section */}
        <div className="mt-24 border-t border-border pt-24 pb-12">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-white mb-2">Keep Reading</h2>
              </div>
              <Button asChild variant="outline" className="border-border hover:bg-white hover:text-black transition-all">
                <Link href="/blog">
                  View All Posts <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost, i) => (
                <motion.div
                  key={relatedPost.slug}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="group h-full flex flex-col border border-border bg-background overflow-hidden transition-all hover:border-primary/50 cursor-pointer rounded-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.1)]">
                      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 z-10 bg-primary text-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                          {relatedPost.category}
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow p-6">
                        <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          <span>{relatedPost.date}</span>
                          <span>{relatedPost.readTime} read</span>
                        </div>
                        <h3 className="mb-6 text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                          Read Article
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
