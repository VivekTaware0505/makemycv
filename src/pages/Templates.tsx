import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Code, Landmark, HeartPulse, Megaphone, Wrench, Palette, LayoutGrid, Crown, Scale, GraduationCap, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates, templateCategories, TemplateId } from "@/types/templates";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const categoryIcons: Record<string, React.ElementType> = {
  all: LayoutGrid,
  general: Briefcase,
  it: Code,
  banking: Landmark,
  healthcare: HeartPulse,
  marketing: Megaphone,
  engineering: Wrench,
  creative: Palette,
  executive: Crown,
  legal: Scale,
  academic: GraduationCap,
};

const badgeColors: Record<string, { bg: string; text: string }> = {
  Popular: { bg: "#f0fdf4", text: "#15803d" },
  New: { bg: "#eff6ff", text: "#1d4ed8" },
  Premium: { bg: "#fefce8", text: "#a16207" },
};

const Templates = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const handleSelect = (id: TemplateId) => {
    navigate(`/builder?template=${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-primary mb-4">
              <Star className="w-3 h-3" />
              {templates.length} Professional Templates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Template
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Industry-specific, ATS-optimized templates crafted by HR professionals
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {templateCategories.map((cat) => {
              const Icon = categoryIcons[cat.id] || Briefcase;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-card"
                      : "bg-card text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Templates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((tmpl, i) => (
              <motion.div
                key={tmpl.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-card-hover hover:border-foreground/10 transition-all duration-300 cursor-pointer"
                onClick={() => handleSelect(tmpl.id)}
              >
                {/* Preview mockup - realistic resume */}
                <div className="aspect-[3/4] relative overflow-hidden bg-secondary/30">
                  <div className="absolute inset-3 rounded-lg overflow-hidden border border-border/50 shadow-sm" style={{ background: '#fff' }}>
                    {/* Header */}
                    <div className="px-3 py-2.5" style={{ background: tmpl.headerBg === '#ffffff' ? '#fff' : tmpl.headerBg }}>
                      <div className="text-center" style={{ color: tmpl.headerBg === '#ffffff' ? '#1a1a1a' : '#fff' }}>
                        <div className="text-[8px] font-bold tracking-wide leading-none">JOHN ANDERSON</div>
                        <div className="text-[5px] mt-0.5 opacity-70">Senior Software Engineer</div>
                        <div className="flex justify-center gap-2 mt-1 text-[4px] opacity-50">
                          <span>john@email.com</span>
                          <span>•</span>
                          <span>+91 98765 43210</span>
                          <span>•</span>
                          <span>LinkedIn</span>
                        </div>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="px-3 py-2 space-y-1.5">
                      {/* Summary */}
                      <div>
                        <div className="text-[5px] font-bold uppercase tracking-wider mb-0.5" style={{ color: tmpl.accentColor, borderBottom: `0.5px solid ${tmpl.accentColor}40` }}>Professional Summary</div>
                        <div className="text-[4px] text-gray-600 leading-[1.4]">Results-driven professional with 8+ years of experience delivering high-impact solutions. Proven track record of leading cross-functional teams and driving business growth.</div>
                      </div>
                      {/* Experience */}
                      <div>
                        <div className="text-[5px] font-bold uppercase tracking-wider mb-0.5" style={{ color: tmpl.accentColor, borderBottom: `0.5px solid ${tmpl.accentColor}40` }}>Work Experience</div>
                        <div className="mb-1">
                          <div className="flex justify-between">
                            <span className="text-[4.5px] font-semibold text-gray-800">Senior Engineer — Google</span>
                            <span className="text-[3.5px] text-gray-400">2021–Present</span>
                          </div>
                          <div className="text-[3.5px] text-gray-500 leading-[1.4] mt-0.5">• Led a team of 12 engineers to deliver microservices platform<br/>• Reduced infrastructure costs by 40% through optimization</div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span className="text-[4.5px] font-semibold text-gray-800">Software Engineer — Microsoft</span>
                            <span className="text-[3.5px] text-gray-400">2018–2021</span>
                          </div>
                          <div className="text-[3.5px] text-gray-500 leading-[1.4] mt-0.5">• Developed REST APIs serving 2M+ daily requests<br/>• Implemented CI/CD pipelines reducing deploy time by 60%</div>
                        </div>
                      </div>
                      {/* Skills */}
                      <div>
                        <div className="text-[5px] font-bold uppercase tracking-wider mb-0.5" style={{ color: tmpl.accentColor, borderBottom: `0.5px solid ${tmpl.accentColor}40` }}>Skills</div>
                        <div className="flex flex-wrap gap-0.5">
                          {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'SQL'].map(s => (
                            <span key={s} className="px-1 py-[1px] text-[3.5px] rounded" style={{ background: `${tmpl.accentColor}12`, color: tmpl.accentColor }}>{s}</span>
                          ))}
                        </div>
                      </div>
                      {/* Education */}
                      <div>
                        <div className="text-[5px] font-bold uppercase tracking-wider mb-0.5" style={{ color: tmpl.accentColor, borderBottom: `0.5px solid ${tmpl.accentColor}40` }}>Education</div>
                        <div className="flex justify-between">
                          <span className="text-[4px] font-semibold text-gray-800">B.Tech Computer Science — IIT Delhi</span>
                          <span className="text-[3.5px] text-gray-400">2014–2018</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  {tmpl.badge && (
                    <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{
                      background: badgeColors[tmpl.badge]?.bg || '#f3f4f6',
                      color: badgeColors[tmpl.badge]?.text || '#374151',
                    }}>
                      {tmpl.badge}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="rounded-xl shadow-elevated">
                        Use Template
                        <ArrowRight className="w-3 h-3 ml-1.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ background: tmpl.accentColor }} />
                    <h3 className="font-semibold text-sm text-foreground">{tmpl.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{tmpl.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Templates;
