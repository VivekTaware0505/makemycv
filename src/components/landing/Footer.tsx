const Footer = () => (
  <footer className="py-12 border-t border-border bg-background">
    <div className="container mx-auto px-6 text-center">
      <div className="text-xl font-bold text-foreground mb-2">
        CV<span className="text-muted-foreground">.com</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} CV.com. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
