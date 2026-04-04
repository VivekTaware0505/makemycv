import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import founderPhoto from "@/assets/founder.webp";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand + Founder */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-3" style={{ color: 'hsl(var(--primary-foreground))' }}>
              CV<span style={{ color: 'hsl(var(--muted-foreground))' }}>.com</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Build professional, ATS-optimized resumes in minutes. Trusted by thousands of job seekers across India.
            </p>

            {/* Founder */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Founded by
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: 'rgba(255,255,255,0.1)', color: 'hsl(var(--primary-foreground))' }}>
                  VT
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'hsl(var(--primary-foreground))' }}>Mr. Vivek Taware</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Making job hunting easier</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'hsl(var(--primary-foreground))' }}>Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Resume Builder", action: () => navigate("/builder") },
                { label: "Templates", action: () => navigate("/templates") },
                { label: "ATS Checker", action: () => navigate("/builder") },
                { label: "Pricing", action: () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }) },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Templates by Profession */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'hsl(var(--primary-foreground))' }}>Templates</h4>
            <ul className="space-y-2.5">
              {["IT / Software", "Banking & Finance", "Healthcare", "Marketing", "Engineering"].map((t) => (
                <li key={t}>
                  <button
                    onClick={() => navigate("/templates")}
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            © {new Date().getFullYear()} CV.com. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Made with <Heart className="w-3 h-3 text-destructive" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
