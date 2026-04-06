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
                {/* Preview mockup */}
                <div className="aspect-[3/4] relative overflow-hidden bg-secondary/30">
                  <div className="absolute inset-3 rounded-lg overflow-hidden border border-border/50 shadow-sm" style={{ background: '#fff' }}>
                    {/* Header bar */}
                    <div className="h-16 flex items-center justify-center" style={{ background: tmpl.headerBg }}>
                      <div className="text-center">
                        <div className="w-20 h-2 rounded-full mx-auto mb-1" style={{ background: 'rgba(255,255,255,0.8)' }} />
                        <div className="w-14 h-1.5 rounded-full mx-auto" style={{ background: 'rgba(255,255,255,0.4)' }} />
                      </div>
                    </div>
                    {/* Content lines */}
                    <div className="p-3 space-y-2">
                      <div className="w-12 h-1.5 rounded-full" style={{ background: tmpl.accentColor }} />
                      <div className="space-y-1">
                        <div className="w-full h-1 rounded-full bg-border" />
                        <div className="w-4/5 h-1 rounded-full bg-border" />
                        <div className="w-3/5 h-1 rounded-full bg-border" />
                      </div>
                      <div className="w-12 h-1.5 rounded-full mt-2" style={{ background: tmpl.accentColor }} />
                      <div className="flex gap-1 flex-wrap">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-3 rounded px-2" style={{ background: `${tmpl.accentColor}15`, width: `${20 + Math.random() * 20}%` }} />
                        ))}
                      </div>
                      <div className="w-12 h-1.5 rounded-full mt-2" style={{ background: tmpl.accentColor }} />
                      <div className="space-y-1">
                        <div className="w-full h-1 rounded-full bg-border" />
                        <div className="w-5/6 h-1 rounded-full bg-border" />
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
