import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import founderPhoto from "@/assets/founder.webp";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-foreground cursor-pointer flex items-center gap-1.5" onClick={() => navigate("/")}>
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-black">M</div>
          MakeMy<span className="text-primary">CV</span><span className="text-muted-foreground">.com</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            onClick={() => navigate("/templates")}
          >
            Templates
          </button>
          <button
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            onClick={() => navigate("/ats-checker")}
          >
            ATS Checker
          </button>
          <button
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Pricing
          </button>
          <Button size="sm" className="rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow" onClick={() => navigate("/builder")}>
            Build Resume
          </Button>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
            <img src={founderPhoto} alt="Vivek Taware" className="w-7 h-7 rounded-full object-cover ring-1 ring-border" />
            <span className="text-[11px] text-muted-foreground leading-tight font-medium">Vivek<br/>Taware</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
