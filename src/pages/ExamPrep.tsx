import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, FileText, Flame, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { branches, searchSubjects, subjectsFor, trendingSubjects, yearsFor, BranchId } from "@/data/exam";

const ExamPrep = () => {
  const navigate = useNavigate();
  const [branch, setBranch] = useState<BranchId>("first-year");
  const [year, setYear] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const availableYears = useMemo(() => yearsFor(branch), [branch]);
  const subjects = useMemo(() => subjectsFor(branch, year ?? undefined), [branch, year]);
  const results = useMemo(() => searchSubjects(query), [query]);
  const trending = useMemo(() => trendingSubjects(), []);
  const list = query ? results : subjects;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <Helmet>
        <title>Engineering Important Questions & Answers PDF - MakeMyCV</title>
        <meta
          name="description"
          content="Branch-wise and year-wise important questions for engineering exams with detailed answers. Download questions-only or questions-with-answers PDFs free."
        />
        <link rel="canonical" href="https://makemycv.co.in/exam-prep" />
        <meta property="og:title" content="Engineering Important Questions & Answers PDF - MakeMyCV" />
        <meta property="og:url" content="https://makemycv.co.in/exam-prep" />
      </Helmet>

      <header className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <span className="text-sm font-semibold">Exam Prep</span>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5 text-primary" /> Branch-wise · Year-wise · Subject-wise
          </div>
          <h1 className="font-display uppercase text-3xl sm:text-5xl leading-[0.95] mb-4">
            Engineering <span className="text-primary">Important</span> Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Exam-ready questions with full model answers for every branch and every year — plus dummy question
            papers. Download only the questions to test yourself, or the answer version to study from.
          </p>
        </motion.div>

        <div className="relative max-w-xl mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a subject, unit or question…"
            className="pl-9 h-12 rounded-xl"
          />
        </div>
      </section>

      {!query && (
        <section className="container mx-auto px-4 pb-6">
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
            <Flame className="w-4 h-4 text-primary" /> Trending in exam season
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {trending.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/exam-prep/${s.id}`)}
                className="flex-shrink-0 px-4 py-2 rounded-xl border border-border bg-card text-xs font-medium hover:border-primary/60 transition-colors"
              >
                {s.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {!query && (
        <section className="container mx-auto px-4 pb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Choose your branch</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setBranch(b.id);
                  setYear(null);
                }}
                className={`text-left p-3 rounded-xl border transition-all ${
                  branch === b.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="text-xs font-bold">{b.short}</div>
                <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{b.name}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setYear(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                year === null ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground"
              }`}
            >
              All years
            </button>
            {availableYears.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  year === y ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground"
                }`}
              >
                Year {y}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-6">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No subject here yet for this filter. More branches and subjects are being added — try another year or
            search for a subject name.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {list.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/exam-prep/${s.id}`)}
                className="text-left p-4 rounded-2xl border border-border bg-card hover:border-primary/60 hover:shadow-card transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Year {s.year} · Sem {s.sem}
                  </span>
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-semibold leading-snug">{s.name}</h2>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{s.units.join(" · ")}</p>
                <p className="text-[11px] text-primary font-medium mt-2">
                  {s.questions.length} important questions with answers
                </p>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExamPrep;