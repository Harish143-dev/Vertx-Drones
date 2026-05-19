import { Home } from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Corporate from "@/pages/Corporate";
import Weddings from "@/pages/Weddings";
import Simulator from "@/pages/Simulator";
import About from "@/pages/About";
import Partners from "@/pages/Partners";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { Contact } from "@/pages/Contact";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppSticky } from "@/components/ui/WhatsAppSticky";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";

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
      <Route component={NotFound} />
    </Switch>
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
