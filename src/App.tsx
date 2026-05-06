import { Home } from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Corporate from "@/pages/Corporate";
import Weddings from "@/pages/Weddings";
import Simulator from "@/pages/Simulator";
import About from "@/pages/About";
import PartnerProgram from "@/pages/PartnerProgram";
import Blog from "@/pages/Blog";
import { Contact } from "@/pages/Contact";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppSticky } from "@/components/ui/WhatsAppSticky";
import { CustomCursor } from "@/components/ui/CustomCursor";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/corporate" component={Corporate} />
      <Route path="/weddings" component={Weddings} />
      <Route path="/simulator" component={Simulator} />
      <Route path="/about" component={About} />
      <Route path="/partner-program" component={PartnerProgram} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <WhatsAppSticky />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
