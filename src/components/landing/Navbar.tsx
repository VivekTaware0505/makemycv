import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import founderPhoto from "@/assets/founder.webp";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Templates", action: () => navigate("/templates") },
    { label: "ATS Checker", action: () => navigate("/ats-checker") },
    { label: "Pricing", action: () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-lg sm:text-xl font-bold tracking-tight text-foreground cursor-pointer flex items-center gap-1.5"
          onClick={() => { navigate("/"); setMobileOpen(false); }}
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-[10px] sm:text-xs font-black">M</div>
          MakeMy<span className="text-primary">CV</span><span className="text-muted-foreground">.com</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={link.action}
            >
              {link.label}
            </button>
          ))}
          <Button size="sm" className="rounded-lg font-semibold shadow-md" onClick={() => navigate("/builder")}>
            Build Resume
          </Button>
          <div className="flex items-center gap-2 pl-3 border-l border-border">
            <img src={founderPhoto} alt="Vivek Taware" className="w-7 h-7 rounded-full object-cover ring-1 ring-border" />
            <span className="text-[11px] text-muted-foreground leading-tight font-medium">Vivek<br />Taware</span>
          </div>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Button size="sm" className="rounded-lg font-semibold text-xs h-8 px-3" onClick={() => navigate("/builder")}>
            Build Resume
          </Button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                onClick={() => { link.action(); setMobileOpen(false); }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 px-4 pt-3 mt-2 border-t border-border">
              <img src={founderPhoto} alt="Vivek Taware" className="w-8 h-8 rounded-full object-cover ring-1 ring-border" />
              <div>
                <p className="text-sm font-medium text-foreground">Vivek Taware</p>
                <p className="text-xs text-muted-foreground">Founder</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
