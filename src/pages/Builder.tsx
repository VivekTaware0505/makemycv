import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Layout, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData, defaultResumeData } from "@/types/resume";
import { calculateATSScore } from "@/lib/ats";
import ResumeForm from "@/components/builder/ResumeForm";
import ResumePreview from "@/components/builder/ResumePreview";
import ATSScore from "@/components/builder/ATSScore";
import PaymentModal from "@/components/builder/PaymentModal";

const Builder = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<"classic" | "modern">("classic");

  const { score, suggestions } = useMemo(() => calculateATSScore(data), [data]);

  const handleDownload = async (format: "pdf" | "word") => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    if (format === "pdf") {
      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf()
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
      // Word export: create simple HTML-based .doc
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="h-16 border-b border-border bg-background/80 backdrop-blur-lg flex items-center px-6 gap-4 sticky top-0 z-30">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex-1 text-center">
          <span className="text-sm font-semibold text-foreground">Resume Builder</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={template === "classic" ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => setTemplate("classic")}
          >
            <Layout className="w-3 h-3" />
            Classic
          </Button>
          <Button
            variant={template === "modern" ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => setTemplate("modern")}
          >
            <LayoutTemplate className="w-3 h-3" />
            Modern
          </Button>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Left: Form */}
        <div className="w-full lg:w-[45%] border-r border-border">
          <ResumeForm data={data} onChange={setData} />
        </div>

        {/* Right: Preview + ATS + Download */}
        <div className="w-full lg:w-[55%] bg-secondary/30">
          <div className="p-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <ATSScore score={score} suggestions={suggestions} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-border overflow-hidden shadow-card"
            >
              <ResumePreview data={data} template={template} showWatermark={true} />
            </motion.div>

            <PaymentModal data={data} onDownload={handleDownload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
