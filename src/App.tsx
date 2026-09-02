import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppSticky } from "@/components/ui/WhatsAppSticky";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Corporate = lazy(() => import("@/pages/Corporate"));
const Weddings = lazy(() => import("@/pages/Weddings"));
const Simulator = lazy(() => import("@/pages/Simulator"));
const About = lazy(() => import("@/pages/About"));
const Partners = lazy(() => import("@/pages/Partners"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));
const ThankYou = lazy(() => import("@/pages/ThankYou").then(m => ({ default: m.ThankYou })));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    // Timeout ensures DOM updates and we bypass CSS smooth scroll for an instant snap
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = '';
    }, 10);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/corporate" component={Corporate} />
        <Route path="/weddings" component={Weddings} />
        <Route path="/design" component={Simulator} />
        <Route path="/about" component={About} />
        <Route path="/partners" component={Partners} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route path="/thank-you" component={ThankYou} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CustomCursor />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
          <WhatsAppSticky />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
