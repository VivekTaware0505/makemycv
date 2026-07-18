import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData, defaultResumeData } from "@/types/resume";
import { TemplateId, templates } from "@/types/templates";
import { calculateATSScore } from "@/lib/ats";
import ResumeForm from "@/components/builder/ResumeForm";
import ResumePreview from "@/components/builder/ResumePreview";
import ATSScore from "@/components/builder/ATSScore";
import DownloadBar from "@/components/builder/DownloadBar";

const Builder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTemplate = (searchParams.get("template") as TemplateId) || "classic";

  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<TemplateId>(initialTemplate);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  const { score, suggestions } = useMemo(() => calculateATSScore(data), [data]);

  const handleDownload = async (format: "pdf" | "word") => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      throw new Error("Resume preview is not ready yet. Please try again.");
    }

    if (format === "pdf") {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: `${data.name || "resume"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    } else {
      const htmlContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"><title>Resume</title></head>
        <body>${element.innerHTML}</body></html>
      `;
      const blob = new Blob([htmlContent], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name || "resume"}.doc`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const currentTemplate = templates.find((t) => t.id === template);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Resume Builder - MakeMyCV</title>
        <meta name="description" content="Build your professional resume with ATS-optimized templates. Free PDF and Word downloads, real-time preview." />
        <link rel="canonical" href="https://makemycv.lovable.app/builder" />
        <meta property="og:title" content="Resume Builder - MakeMyCV" />
        <meta property="og:url" content="https://makemycv.lovable.app/builder" />
      </Helmet>
      {/* Header */}
      <div className="h-16 border-b border-border bg-background/80 backdrop-blur-lg flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
        <div className="flex-1 text-center">
          <span className="text-sm font-semibold text-foreground">MakeMyCV.com Builder</span>
        </div>

        {/* Template selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[55%] scrollbar-hide">
          {templates.slice(0, 8).map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                template === t.id
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.accentColor }} />
              <span className="hidden md:inline">{t.name.split(' ')[0]}</span>
            </button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground whitespace-nowrap"
            onClick={() => navigate("/templates")}
          >
            All {templates.length} →
          </Button>
        </div>
      </div>

      {/* Split layout */}
      {/* Mobile tab switcher */}
      <div className="lg:hidden sticky top-16 z-20 flex items-center gap-2 p-3 bg-background border-b border-border">
        <button
          onClick={() => setMobileView("edit")}
          className={`flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl text-sm font-semibold transition-all ${
            mobileView === "edit" ? "gradient-brand text-primary-foreground shadow-card" : "bg-secondary text-muted-foreground"
          }`}
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl text-sm font-semibold transition-all ${
            mobileView === "preview" ? "gradient-brand text-primary-foreground shadow-card" : "bg-secondary text-muted-foreground"
          }`}
        >
          <Eye className="w-4 h-4" /> Preview
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: Form */}
        <div className={`w-full lg:w-[45%] lg:border-r border-border ${mobileView === "edit" ? "block" : "hidden lg:block"}`}>
          <ResumeForm data={data} onChange={setData} />
        </div>

        {/* Right: Preview + ATS + Download */}
        <div className={`w-full lg:w-[55%] bg-secondary/30 flex-col ${mobileView === "preview" ? "flex" : "hidden lg:flex"}`}>
          <div className="flex-1 p-4 lg:p-6 space-y-4 lg:max-h-[calc(100vh-4rem-5rem)] lg:overflow-y-auto">
            {currentTemplate && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: currentTemplate.accentColor }} />
                <span className="font-medium text-foreground">{currentTemplate.name}</span>
                <span>·</span>
                <span>{currentTemplate.description}</span>
              </div>
            )}

            <ATSScore score={score} suggestions={suggestions} />

            <motion.div
              key={template}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-border overflow-hidden shadow-lg"
            >
              <ResumePreview data={data} template={template} />
            </motion.div>
          </div>

          {/* Sticky download bar */}
          <div className="sticky bottom-0 p-3 lg:p-4 bg-background/95 backdrop-blur-md border-t border-border" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
            <DownloadBar data={data} template={template} onDownload={handleDownload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
