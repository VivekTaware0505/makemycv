import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, FileQuestion, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExamQuestion, getSubject, universities } from "@/data/exam";
import { downloadExamPdf } from "@/lib/examPdf";

const ExamSubject = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = useMemo(() => getSubject(subjectId || ""), [subjectId]);

  const [uni, setUni] = useState(universities[0].id);
  const [open, setOpen] = useState<number | null>(0);
  const [extra, setExtra] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-muted-foreground">This subject is not available yet.</p>
        <Button onClick={() => navigate("/exam-prep")}>Back to Exam Prep</Button>
      </div>
    );
  }

  const questions = [...subject.questions, ...extra];
  const university = universities.find((u) => u.id === uni)!;

  const handleDownload = async (kind: "questions" | "answers" | "model") => {
    setBusy(kind);
    try {
      await downloadExamPdf({
        subject,
        questions: kind === "model" ? questions.slice(0, 6) : questions,
        withAnswers: kind === "answers",
        university: `${university.name} — ${university.pattern}`,
        modelPaper: kind === "model",
      });
      toast({ title: "PDF downloaded", description: "Check your downloads folder." });
    } catch {
      toast({ title: "Download failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const generateMore = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("career-ai", {
        body: {
          task: "exam-answer",
          branch: subject.branches[0],
          year: subject.year,
          subject: subject.name,
          university: university.name,
          existing: questions.map((q) => q.q),
          count: 5,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const incoming: ExamQuestion[] = Array.isArray(data?.questions) ? data.questions : [];
      if (!incoming.length) throw new Error("No questions returned");
      setExtra((prev) => [...prev, ...incoming]);
      toast({ title: `${incoming.length} more questions added`, description: "They are included in your PDF downloads." });
    } catch (err) {
      toast({
        title: "Could not generate questions",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-12">
      <Helmet>
        <title>{`${subject.name} Important Questions - MakeMyCV`}</title>
        <meta
          name="description"
          content={`Important questions with detailed answers for ${subject.name} (Year ${subject.year}). Free questions-only and questions-with-answers PDF download.`}
        />
        <link rel="canonical" href={`https://makemycv.co.in/exam-prep/${subject.id}`} />
        <meta property="og:title" content={`${subject.name} Important Questions - MakeMyCV`} />
        <meta property="og:url" content={`https://makemycv.co.in/exam-prep/${subject.id}`} />
      </Helmet>

      <header className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/exam-prep")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All subjects</span>
          </Button>
          <span className="text-sm font-semibold truncate">{subject.name}</span>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
          Year {subject.year} · Semester {subject.sem}
          {subject.code ? ` · ${subject.code}` : ""}
        </p>
        <h1 className="font-display uppercase text-2xl sm:text-4xl leading-tight mt-2 mb-3">{subject.name}</h1>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {subject.units.map((u) => (
            <span key={u} className="px-2.5 py-1 rounded-full bg-secondary text-[11px] font-medium">
              {u}
            </span>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">University paper pattern</label>
            <select
              value={uni}
              onChange={(e) => setUni(e.target.value)}
              className="mt-1.5 w-full h-11 rounded-xl bg-background border border-border px-3 text-sm"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-muted-foreground mt-1.5">{university.pattern}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-2">
            <Button
              className="h-12 rounded-xl font-semibold"
              disabled={busy !== null}
              onClick={() => handleDownload("answers")}
            >
              {busy === "answers" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Questions + Answers
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl font-semibold"
              disabled={busy !== null}
              onClick={() => handleDownload("questions")}
            >
              {busy === "questions" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileQuestion className="w-4 h-4 mr-2" />}
              Questions only
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl font-semibold"
              disabled={busy !== null}
              onClick={() => handleDownload("model")}
            >
              {busy === "model" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Dummy paper
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 space-y-3">
        {questions.map((q, i) => (
          <div key={`${q.q}-${i}`} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              className="w-full text-left p-4 flex items-start gap-3"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-xs font-bold text-primary mt-0.5">Q{i + 1}</span>
              <span className="flex-1">
                <span className="block text-sm font-semibold leading-snug">{q.q}</span>
                <span className="block text-[11px] uppercase tracking-widest text-muted-foreground mt-1.5">
                  {q.marks} marks{q.topic ? ` · ${q.topic}` : ""}
                  {q.repeats ? ` · asked ${q.repeats} times` : ""}
                </span>
              </span>
            </button>
            {open === i && (
              <div className="px-4 pb-4 pl-10 border-t border-border/60 pt-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mb-2">Model answer</p>
                {q.a
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean)
                  .map((line, j) => (
                    <p
                      key={j}
                      className={`text-sm leading-relaxed text-muted-foreground ${line.startsWith("-") ? "pl-3" : ""} mb-1.5`}
                    >
                      {line.startsWith("-") ? `• ${line.slice(1).trim()}` : line}
                    </p>
                  ))}
              </div>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full h-12 rounded-xl font-semibold border-dashed"
          onClick={generateMore}
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2 text-primary" />}
          Generate 5 more questions with answers
        </Button>
      </section>
    </div>
  );
};

export default ExamSubject;