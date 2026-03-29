import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-foreground cursor-pointer" onClick={() => navigate("/")}>
          CV<span className="text-muted-foreground">.com</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Pricing
          </button>
          <Button size="sm" className="rounded-lg font-semibold" onClick={() => navigate("/builder")}>
            Build Resume
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
