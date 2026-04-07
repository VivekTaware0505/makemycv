import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, TrendingUp, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ATSResult {
  score: number;
  sections: { label: string; score: number; max: number; tips: string[] }[];
}

function analyzeText(text: string): ATSResult {
  const lower = text.toLowerCase();
  const sections: ATSResult["sections"] = [];

  // Contact info
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /[\+]?[\d\s\-()]{7,}/.test(text);
  const hasLinkedin = lower.includes("linkedin");
  const contactScore = (hasEmail ? 4 : 0) + (hasPhone ? 3 : 0) + (hasLinkedin ? 3 : 0);
  const contactTips: string[] = [];
  if (!hasEmail) contactTips.push("Add a professional email address");
  if (!hasPhone) contactTips.push("Include your phone number");
  if (!hasLinkedin) contactTips.push("Add your LinkedIn profile URL");
  sections.push({ label: "Contact Information", score: contactScore, max: 10, tips: contactTips });

  // Summary / Objective
  const hasSummary = /summary|objective|profile|about/i.test(text);
  const summaryScore = hasSummary ? 10 : 0;
  sections.push({
    label: "Professional Summary",
    score: summaryScore,
    max: 10,
    tips: hasSummary ? [] : ["Add a professional summary or objective section"],
  });

  // Experience
  const expKeywords = ["experience", "work history", "employment", "responsibilities", "managed", "developed", "led", "created", "implemented"];
  const expMatches = expKeywords.filter((k) => lower.includes(k)).length;
  const expScore = Math.min(Math.round((expMatches / 4) * 25), 25);
  const expTips: string[] = [];
  if (expScore < 15) expTips.push("Use strong action verbs like 'Managed', 'Developed', 'Led'");
  if (!lower.includes("experience")) expTips.push("Clearly label your work experience section");
  sections.push({ label: "Work Experience", score: expScore, max: 25, tips: expTips });

  // Education
  const eduKeywords = ["education", "degree", "bachelor", "master", "university", "college", "b.tech", "b.sc", "m.tech", "mba", "phd"];
  const eduMatches = eduKeywords.filter((k) => lower.includes(k)).length;
  const eduScore = Math.min(Math.round((eduMatches / 3) * 10), 10);
  sections.push({
    label: "Education",
    score: eduScore,
    max: 10,
    tips: eduScore < 7 ? ["Include your degree, institution, and graduation year"] : [],
  });

  // Skills
  const skillKeywords = ["skills", "proficient", "expertise", "technologies", "tools", "languages", "frameworks"];
  const skillMatches = skillKeywords.filter((k) => lower.includes(k)).length;
  const skillScore = Math.min(Math.round((skillMatches / 3) * 15), 15);
  const skillTips: string[] = [];
  if (skillScore < 10) skillTips.push("List specific technical and soft skills relevant to your target role");
  if (!lower.includes("skills")) skillTips.push("Add a dedicated Skills section");
  sections.push({ label: "Skills", score: skillScore, max: 15, tips: skillTips });

  // Formatting & Keywords
  const wordCount = text.split(/\s+/).length;
  const hasQuantifiables = /\d+%|\$\d+|\d+ years|\d+ projects/i.test(text);
  const hasCerts = /certif|license|award|honor/i.test(text);
  let fmtScore = 0;
  const fmtTips: string[] = [];
  if (wordCount > 150) fmtScore += 5; else fmtTips.push("Your resume seems too short. Aim for 300-700 words.");
  if (wordCount < 1200) fmtScore += 3; else fmtTips.push("Your resume may be too long. Keep it concise.");
  if (hasQuantifiables) fmtScore += 4; else fmtTips.push("Add quantifiable achievements (e.g., 'Increased revenue by 30%')");
  if (hasCerts) fmtScore += 3; else fmtTips.push("Add certifications or awards if you have any");
  sections.push({ label: "Formatting & Impact", score: Math.min(fmtScore, 15), max: 15, tips: fmtTips });

  // Projects
  const hasProjects = /projects?|portfolio/i.test(text);
  const projScore = hasProjects ? 15 : 0;
  sections.push({
    label: "Projects",
    score: projScore,
    max: 15,
    tips: hasProjects ? [] : ["Add a Projects section to showcase your hands-on work"],
  });

  const totalScore = sections.reduce((s, sec) => s + sec.score, 0);

  return { score: Math.min(totalScore, 100), sections };
}

const ATSChecker = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState<ATSResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setResult(null);
    setAnalyzing(true);

    let extracted = "";

    if (f.type === "text/plain") {
      extracted = await f.text();
    } else {
      const reader = new FileReader();
      extracted = await new Promise<string>((resolve) => {
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const cleaned = content.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s{3,}/g, " ");
          resolve(cleaned);
        };
        reader.readAsText(f);
      });
    }

    setText(extracted);

    await new Promise((r) => setTimeout(r, 1500));

    const analysis = analyzeText(extracted);
    setResult(analysis);
    setAnalyzing(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const reset = () => {
    setFile(null);
    setText("");
    setResult(null);
    setAnalyzing(false);
  };

  const scoreColor = (score: number) =>
    score >= 70 ? "text-emerald-500" : score >= 40 ? "text-amber-500" : "text-red-500";

  const scoreBg = (score: number) =>
    score >= 70 ? "bg-emerald-500" : score >= 40 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 border-b border-border bg-background/80 backdrop-blur-lg flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
        <div className="flex-1 text-center">
          <span className="text-sm font-semibold text-foreground">ATS Score Checker</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/builder")} className="gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Build Resume
        </Button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            Free ATS Analysis
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Check Your Resume's ATS Score
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Upload your resume to get an instant ATS compatibility score with actionable suggestions to improve your chances.
          </p>
        </motion.div>

        {!result && !analyzing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Drop your resume here or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">Supports PDF, DOC, DOCX, TXT files</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </label>
          </motion.div>
        )}

        {analyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4 py-10">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <p className="font-semibold text-foreground">Analyzing {file?.name}...</p>
            <Progress value={65} className="max-w-xs mx-auto h-2" />
          </motion.div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <svg width="128" height="128" className="-rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
                        <motion.circle
                          cx="64" cy="64" r="56"
                          stroke={result.score >= 70 ? "#22c55e" : result.score >= 40 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 56}
                          initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 56 - (result.score / 100) * 2 * Math.PI * 56 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-bold ${scoreColor(result.score)}`}>{result.score}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">/ 100</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left space-y-2">
                      <h2 className="text-xl font-bold text-foreground">
                        {result.score >= 70 ? "Great Resume!" : result.score >= 40 ? "Good Start, Needs Work" : "Needs Significant Improvement"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {result.score >= 70
                          ? "Your resume is well-optimized for ATS systems. Keep it up!"
                          : "Follow the suggestions below to improve your ATS score and get more interview calls."}
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" onClick={reset} className="gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5" />
                          Check Another
                        </Button>
                        <Button size="sm" onClick={() => navigate("/builder")} className="gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Build ATS-Friendly Resume
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Detailed Breakdown</h3>
                {result.sections.map((sec) => {
                  const pct = Math.round((sec.score / sec.max) * 100);
                  return (
                    <Card key={sec.label}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{sec.label}</span>
                          <span className={`text-sm font-bold ${scoreColor(pct)}`}>
                            {sec.score}/{sec.max}
                          </span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${scoreBg(pct)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                        {sec.tips.length > 0 && (
                          <div className="space-y-1 pt-1">
                            {sec.tips.map((tip, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <AlertTriangle className="w-3 h-3 mt-0.5 text-amber-500 flex-shrink-0" />
                                {tip}
                              </div>
                            ))}
                          </div>
                        )}
                        {sec.tips.length === 0 && (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                            <CheckCircle className="w-3 h-3" />
                            Looks good!
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ATSChecker;
