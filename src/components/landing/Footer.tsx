import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Heart, ExternalLink } from "lucide-react";
import founderPhoto from "@/assets/founder.webp";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0f1117] text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Ready to Build Your Resume?</h3>
          <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">Join thousands of professionals who landed their dream jobs with MakeMyCV</p>
          <button
            onClick={() => navigate("/builder")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Building — Free
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-xs font-black">M</div>
              MakeMy<span className="text-primary">CV</span><span className="text-white/40">.com</span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed mb-6 max-w-xs">
              Build professional, ATS-optimized resumes in minutes. 100% free. Trusted by thousands across India.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { label: "Resume Builder", action: () => navigate("/builder") },
                { label: "Templates", action: () => navigate("/templates") },
                { label: "ATS Checker", action: () => navigate("/ats-checker") },
                { label: "Pricing", action: () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }) },
              ].map((item) => (
                <li key={item.label}>
                  <button onClick={item.action} className="text-sm text-white/50 hover:text-white transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Template Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Templates</h4>
            <ul className="space-y-3">
              {["IT / Software", "Banking & Finance", "Healthcare", "Marketing", "Engineering"].map((t) => (
                <li key={t}>
                  <button onClick={() => navigate("/templates")} className="text-sm text-white/50 hover:text-white transition-colors">
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Founder */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Founder</h4>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-5">
                <img
                  src={founderPhoto}
                  alt="Mr. Vivek Taware"
                  className="w-20 h-20 rounded-xl object-cover ring-2 ring-primary/30"
                />
                <div>
                  <p className="font-semibold text-lg">Mr. Vivek Taware</p>
                  <p className="text-sm text-white/40 mt-0.5">Founder & Developer</p>
                  <p className="text-xs text-white/30 mt-1.5 leading-relaxed">Making job hunting easier for everyone across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} MakeMyCV.com — All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
