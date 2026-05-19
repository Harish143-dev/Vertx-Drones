import { useEffect } from "react";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { blogData } from "@/data/blogData";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground font-sans">
      <SEO
        title="Drone Show Insights and Guides | VertX Blog"
        description="Guides, comparisons, and case studies about drone light shows in India. Pricing, planning, and everything in between."
      />
      <Navbar />

      <main className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-6 md:px-12">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-16 md:mb-24 max-w-3xl"
          >
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-white">
              Insights
            </h1>
            <p className="text-sm md:text-base font-light leading-relaxed text-white/50 max-w-xl">
              Everything you need to know about drone shows — planning, pricing, formations, and how they work at real events.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogData.map((post, i) => (
              <motion.div
                key={post.slug}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={i * 0.1}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group h-full flex flex-col border border-border bg-card overflow-hidden transition-colors hover:border-primary/50 cursor-pointer rounded-lg">
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col flex-grow p-6 md:p-8">
                      <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span className="text-primary">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="mb-6 text-base md:text-lg line-clamp-3 font-semibold leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
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
      </main>

      <Footer />
    </div>
  );
}
