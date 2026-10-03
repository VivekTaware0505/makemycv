import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Copy, Download, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import JourneyToolLayout from "@/components/journey/JourneyToolLayout";
import { loadResume, markStageDone } from "@/lib/journey";
import { toast } from "@/hooks/use-toast";

const CoverLetter = () => {
  const resume = useMemo(loadResume, []);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [achievement, setAchievement] = useState("");
  const [letter, setLetter] = useState("");

  const generate = () => {
    const skills = resume.skills || "relevant professional skills";
    const result = `Dear Hiring Manager,\n\nI am applying for the ${role || "open position"} at ${company || "your organization"}. My background in ${skills} and my practical experience make me well suited to contribute from day one.\n\n${achievement || "Throughout my education and experience, I have taken ownership of meaningful work, collaborated effectively, and delivered dependable results."}\n\nI would welcome the opportunity to discuss how my experience can support ${company || "your team"}. Thank you for your time and consideration.\n\nSincerely,\n${resume.name || "Your Name"}`;
    setLetter(result);
    markStageDone("cover-letter");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(letter);
    toast({ title: "Cover letter copied" });
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([letter], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${role || "cover-letter"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <JourneyToolLayout eyebrow="Step 2 of 6" title="Cover Letter" description="Create a focused letter from your saved resume and the role you want.">
      <Helmet><title>Cover Letter Builder - MakeMyCV</title><meta name="description" content="Create and download a tailored cover letter from your resume details." /></Helmet>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="space-y-4 border-t border-border pt-5">
          <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" aria-label="Company name" />
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Job title" aria-label="Job title" />
          <Textarea value={achievement} onChange={(e) => setAchievement(e.target.value)} placeholder="One achievement relevant to this role" className="min-h-32" />
          <Button onClick={generate} className="w-full gap-2"><WandSparkles className="h-4 w-4" /> Create letter</Button>
        </section>
        <section className="border-t border-border pt-5">
          <Textarea value={letter} onChange={(e) => setLetter(e.target.value)} placeholder="Your editable cover letter appears here." className="min-h-[420px] leading-relaxed" />
          <div className="mt-3 flex gap-2">
            <Button variant="outline" onClick={copy} disabled={!letter} className="gap-2"><Copy className="h-4 w-4" /> Copy</Button>
            <Button variant="outline" onClick={download} disabled={!letter} className="gap-2"><Download className="h-4 w-4" /> Download</Button>
          </div>
        </section>
      </div>
    </JourneyToolLayout>
  );
};

export default CoverLetter;