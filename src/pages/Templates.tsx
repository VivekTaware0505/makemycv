import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Briefcase, Code, Landmark, HeartPulse, Megaphone, Wrench, Palette, LayoutGrid, Crown, Scale, GraduationCap, ArrowRight, Star, Mail, Phone, Linkedin, MapPin } from "lucide-react";
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

// Layout variants per template so cards feel like unique originals
const layoutVariantFor = (id: string): "classic" | "sidebar" | "split" | "banded" => {
  if (["executive", "consulting", "banking", "legal"].includes(id)) return "split";
  if (["it-developer", "creative", "engineering", "government"].includes(id)) return "sidebar";
  if (["modern", "marketing", "healthcare"].includes(id)) return "banded";
  return "classic";
};

// Field-appropriate demo persona per template
const demoFor = (id: string) => {
  const map: Record<string, { name: string; role: string; skills: string[]; company1: string; company2: string; edu: string }> = {
    "it-developer":  { name: "ARJUN MEHTA",     role: "Senior Software Engineer",  skills: ["React","Node.js","AWS","Docker","Python","SQL"], company1: "Senior Engineer — Google",       company2: "SDE II — Amazon",         edu: "B.Tech CSE — IIT Bombay" },
    "banking":       { name: "PRIYA SHARMA",    role: "Investment Banking Analyst",skills: ["Valuation","M&A","Excel","VBA","Bloomberg","IFRS"], company1: "Associate — Goldman Sachs",    company2: "Analyst — JP Morgan",     edu: "MBA Finance — IIM Ahmedabad" },
    "healthcare":    { name: "DR. RAHUL VERMA", role: "Consultant Cardiologist",   skills: ["ECG","Echo","Cath Lab","ACLS","Research","Patient Care"], company1: "Consultant — Apollo Hospitals", company2: "Registrar — AIIMS Delhi", edu: "MD Cardiology — AIIMS" },
    "marketing":     { name: "NEHA KAPOOR",     role: "Marketing Manager",         skills: ["SEO","Google Ads","Analytics","Brand","CRM","Content"], company1: "Manager — Unilever",           company2: "Lead — Nykaa",            edu: "MBA Marketing — XLRI" },
    "engineering":   { name: "VIKRAM SINGH",    role: "Mechanical Engineer",       skills: ["AutoCAD","SolidWorks","ANSYS","Six Sigma","PLC","GD&T"], company1: "Engineer — L&T",               company2: "Trainee — Tata Motors",   edu: "B.E. Mechanical — VJTI" },
    "creative":      { name: "ANANYA GUPTA",    role: "Senior UI/UX Designer",     skills: ["Figma","Prototyping","Design Systems","Motion","Research"], company1: "Sr Designer — Swiggy",      company2: "Designer — Zomato",       edu: "B.Des — NID Ahmedabad" },
    "executive":     { name: "RAJESH IYER",     role: "Chief Executive Officer",   skills: ["P&L","Strategy","M&A","Leadership","Board Relations"], company1: "CEO — Infosys BPM",            company2: "COO — Wipro",             edu: "MBA — Harvard Business School" },
    "legal":         { name: "MEERA JOSHI",     role: "Corporate Counsel",         skills: ["Contracts","Compliance","IP Law","Litigation","M&A"], company1: "Sr Counsel — Nishith Desai",   company2: "Associate — AZB",         edu: "LLM — NLSIU Bangalore" },
    "academic":      { name: "DR. KARAN NAIR",  role: "Assistant Professor",       skills: ["Research","Teaching","Publications","Peer Review"],       company1: "Asst Prof — IIT Madras",        company2: "Post-doc — Stanford",     edu: "Ph.D. Physics — MIT" },
    "government":    { name: "ADITYA RAO",      role: "IAS Officer",               skills: ["Public Policy","Governance","Budgeting","Administration"], company1: "SDM — Govt of Maharashtra",   company2: "Asst Collector — GoI",    edu: "BA Economics — DU · UPSC AIR 42" },
    "consulting":    { name: "SANJANA REDDY",   role: "Management Consultant",     skills: ["Strategy","Financial Modeling","PowerPoint","SQL","Tableau"], company1: "Consultant — McKinsey",    company2: "Analyst — BCG",           edu: "MBA — ISB Hyderabad" },
    "classic":       { name: "JOHN ANDERSON",   role: "Business Development Lead", skills: ["Sales","Negotiation","CRM","Strategy","Client Success"], company1: "BD Lead — Microsoft",         company2: "Manager — Salesforce",    edu: "MBA — SP Jain" },
    "modern":        { name: "AKASH PATEL",     role: "Product Manager",           skills: ["Roadmapping","Analytics","A/B Testing","SQL","Figma"],  company1: "PM — Flipkart",                company2: "APM — PhonePe",           edu: "B.Tech — BITS Pilani" },
    "minimal":       { name: "ISHAAN KHANNA",   role: "Full Stack Developer",       skills: ["TypeScript","Next.js","GraphQL","AWS","MongoDB"],       company1: "Dev — Razorpay",               company2: "Intern — Zerodha",        edu: "B.Tech IT — NIT Trichy" },
  };
  return map[id] || map["classic"];
};

// Realistic resume mini-preview with layout variants
const TemplatePreview = ({ tmpl }: { tmpl: (typeof templates)[number] }) => {
  const variant = layoutVariantFor(tmpl.id);
  const demo = demoFor(tmpl.id);
  const accent = tmpl.accentColor;
  const isDarkHeader = tmpl.headerBg !== "#ffffff";

  const Header = (
    <div className="px-3 py-2.5" style={{ background: isDarkHeader ? tmpl.headerBg : "#fff", borderBottom: isDarkHeader ? "none" : `1.5px solid ${accent}` }}>
      <div style={{ color: isDarkHeader ? "#fff" : "#0f172a" }}>
        <div className="text-[9px] font-bold tracking-[0.12em] leading-none">{demo.name}</div>
        <div className="text-[5.5px] font-medium mt-0.5" style={{ color: isDarkHeader ? "#fff" : accent, opacity: isDarkHeader ? 0.9 : 1 }}>
          {demo.role}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1 text-[4px] opacity-70">
          <span>✉ {demo.name.split(" ")[0].toLowerCase()}@email.com</span>
          <span>· +91 98765 43210</span>
          <span>· Mumbai, IN</span>
          <span>· in/{demo.name.split(" ")[0].toLowerCase()}</span>
        </div>
      </div>
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="text-[5px] font-bold uppercase tracking-[0.15em] mb-0.5 pb-0.5" style={{ color: accent, borderBottom: `0.5px solid ${accent}30` }}>
      {children}
    </div>
  );

  const Summary = (
    <div>
      <SectionTitle>Professional Summary</SectionTitle>
      <div className="text-[4px] text-gray-600 leading-[1.5]">
        Accomplished {demo.role.toLowerCase()} with 8+ years driving measurable business impact. Track record of leading high-performing teams and shipping strategic initiatives that scale.
      </div>
    </div>
  );

  const Experience = (
    <div>
      <SectionTitle>Work Experience</SectionTitle>
      <div className="mb-1">
        <div className="flex justify-between items-baseline">
          <span className="text-[4.5px] font-semibold text-gray-800">{demo.company1}</span>
          <span className="text-[3.5px] text-gray-400">2021–Present</span>
        </div>
        <div className="text-[3.5px] text-gray-500 leading-[1.5] mt-0.5">
          • Led cross-functional team of 12 delivering platform serving 2M+ users<br />
          • Grew revenue by 40% YoY through strategic partnerships and optimizations<br />
          • Mentored 6 juniors; introduced OKR framework across the org
        </div>
      </div>
      <div>
        <div className="flex justify-between items-baseline">
          <span className="text-[4.5px] font-semibold text-gray-800">{demo.company2}</span>
          <span className="text-[3.5px] text-gray-400">2018–2021</span>
        </div>
        <div className="text-[3.5px] text-gray-500 leading-[1.5] mt-0.5">
          • Spearheaded flagship product from 0→1 with $2M annual revenue<br />
          • Reduced operational costs by 32% through process automation
        </div>
      </div>
    </div>
  );

  const Skills = (
    <div>
      <SectionTitle>Core Skills</SectionTitle>
      <div className="flex flex-wrap gap-0.5">
        {demo.skills.map((s) => (
          <span key={s} className="px-1 py-[1px] text-[3.5px] rounded" style={{ background: `${accent}12`, color: accent }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );

  const Education = (
    <div>
      <SectionTitle>Education</SectionTitle>
      <div className="flex justify-between items-baseline">
        <span className="text-[4px] font-semibold text-gray-800">{demo.edu}</span>
        <span className="text-[3.5px] text-gray-400">2014–2018</span>
      </div>
      <div className="text-[3.5px] text-gray-500 mt-0.5">CGPA 9.1/10 · Dean's List · Merit Scholar</div>
    </div>
  );

  const Certs = (
    <div>
      <SectionTitle>Certifications</SectionTitle>
      <div className="text-[3.5px] text-gray-600 leading-[1.6]">
        • AWS Solutions Architect (2023)<br />
        • PMP® — Project Management Institute<br />
        • Six Sigma Green Belt
      </div>
    </div>
  );

  // --- Sidebar variant (left dark panel) ---
  if (variant === "sidebar") {
    return (
      <div className="absolute inset-3 rounded-lg overflow-hidden border border-border/50 shadow-sm flex" style={{ background: "#fff" }}>
        <div className="w-[38%] p-2.5 flex flex-col gap-2" style={{ background: tmpl.headerBg }}>
          <div style={{ color: "#fff" }}>
            <div className="text-[8px] font-bold tracking-wide leading-tight">{demo.name}</div>
            <div className="text-[4.5px] mt-0.5 opacity-80">{demo.role}</div>
          </div>
          <div className="text-[3.5px] opacity-80 leading-[1.6]" style={{ color: "#fff" }}>
            <div className="font-bold text-[4px] uppercase tracking-wider mb-0.5" style={{ color: accent }}>Contact</div>
            <div>{demo.name.split(" ")[0].toLowerCase()}@email.com</div>
            <div>+91 98765 43210</div>
            <div>Mumbai, India</div>
          </div>
          <div className="text-[3.5px] leading-[1.6]" style={{ color: "#fff" }}>
            <div className="font-bold text-[4px] uppercase tracking-wider mb-0.5" style={{ color: accent }}>Skills</div>
            {demo.skills.slice(0, 5).map((s) => (
              <div key={s} className="opacity-85">• {s}</div>
            ))}
          </div>
          <div className="text-[3.5px] leading-[1.6]" style={{ color: "#fff" }}>
            <div className="font-bold text-[4px] uppercase tracking-wider mb-0.5" style={{ color: accent }}>Education</div>
            <div className="opacity-85">{demo.edu}</div>
          </div>
        </div>
        <div className="flex-1 px-2.5 py-2 space-y-1.5">
          {Summary}
          {Experience}
          {Certs}
        </div>
      </div>
    );
  }

  // --- Split variant (accent left rail with name) ---
  if (variant === "split") {
    return (
      <div className="absolute inset-3 rounded-lg overflow-hidden border border-border/50 shadow-sm" style={{ background: "#fff" }}>
        <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: tmpl.headerBg }}>
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[7px] font-bold" style={{ borderColor: accent, color: accent, background: "rgba(255,255,255,0.08)" }}>
            {demo.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div style={{ color: "#fff" }}>
            <div className="text-[8px] font-bold tracking-wide leading-none">{demo.name}</div>
            <div className="text-[5px] mt-0.5" style={{ color: accent }}>{demo.role}</div>
          </div>
          <div className="ml-auto text-[3.5px] text-right opacity-80" style={{ color: "#fff" }}>
            <div>{demo.name.split(" ")[0].toLowerCase()}@email.com</div>
            <div>+91 98765 43210 · Mumbai</div>
          </div>
        </div>
        <div className="px-3 py-2 space-y-1.5">
          {Summary}
          {Experience}
          <div className="grid grid-cols-2 gap-2">
            {Skills}
            {Education}
          </div>
        </div>
      </div>
    );
  }

  // --- Banded variant (colored full header) ---
  if (variant === "banded") {
    return (
      <div className="absolute inset-3 rounded-lg overflow-hidden border border-border/50 shadow-sm" style={{ background: "#fff" }}>
        {Header}
        <div className="px-3 py-2 space-y-1.5">
          {Summary}
          {Experience}
          {Skills}
          {Education}
        </div>
      </div>
    );
  }

  // --- Classic (default) ---
  return (
    <div className="absolute inset-3 rounded-lg overflow-hidden border border-border/50 shadow-sm" style={{ background: "#fff" }}>
      {Header}
      <div className="px-3 py-2 space-y-1.5">
        {Summary}
        {Experience}
        {Skills}
        {Education}
      </div>
    </div>
  );
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
      <Helmet>
        <title>Resume Templates - MakeMyCV</title>
        <meta name="description" content="Browse 14+ industry-specific, ATS-optimized resume templates. Professional designs for every career. Free to use." />
        <link rel="canonical" href="https://makemycv.lovable.app/templates" />
        <meta property="og:title" content="Resume Templates - MakeMyCV" />
        <meta property="og:url" content="https://makemycv.lovable.app/templates" />
      </Helmet>
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
                  <TemplatePreview tmpl={tmpl} />

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
                    <div className="ml-auto flex items-center gap-0.5">
                      {[0,1,2,3,4].map(i => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
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
