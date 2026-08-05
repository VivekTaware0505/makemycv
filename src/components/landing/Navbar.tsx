import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/makemycv-logo.png.asset.json";


const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Hiring Journey", action: () => navigate("/journey") },
    { label: "Exam Prep", action: () => navigate("/exam-prep") },
    { label: "Templates", action: () => navigate("/templates") },
    { label: "ATS Checker", action: () => navigate("/ats-checker") },
    { label: "Interview Prep", action: () => navigate("/interview-prep") },
    { label: "Converter", action: () => navigate("/converter") },
    { label: "Feedback", action: () => navigate("/feedback") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => { navigate("/"); setMobileOpen(false); }}
        >
          <img src={logo.url} alt="MakeMyCV logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-glow object-contain" />
          <div className="leading-none">
            <div className="text-lg sm:text-xl font-display tracking-tight text-foreground">
              MakeMy<span className="text-primary">CV</span>
            </div>
            <div className="hidden sm:block text-[9px] tracking-[0.28em] text-muted-foreground font-medium mt-0.5">
              BUILD YOUR FUTURE
            </div>
          </div>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
