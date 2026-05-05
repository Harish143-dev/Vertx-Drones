export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="mb-4">
              <img src="/White.svg" alt="VERTX" className="h-5 w-auto object-contain opacity-80" />
            </div>
            <p className="text-sm text-muted-foreground font-light">
              Premium Aerial Light Shows
            </p>
          </div>
          
          <div className="flex space-x-8 text-sm font-light text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Press Kit</a>
          </div>
          
          <div className="text-sm text-muted-foreground font-light">
            © {new Date().getFullYear()} VERTX. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
