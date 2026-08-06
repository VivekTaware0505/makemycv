import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Check, FileText, Flame, GraduationCap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  branches,
  branchesForStream,
  searchSubjects,
  streams,
  subjectsFor,
  subjectsForSem,
  semestersFor,
  trendingSubjects,
  universities,
  yearsFor,
  BranchId,
  StreamId,
} from "@/data/exam";
import { StreamBackdrop } from "@/data/exam/streamMedia";
import { getSavedUniversity, saveUniversity } from "@/lib/examPrefs";

const ExamPrep = () => {
  const navigate = useNavigate();
  const [uni, setUni] = useState<string | null>(getSavedUniversity());
  const [uniQuery, setUniQuery] = useState("");
  const [stream, setStream] = useState<StreamId | null>(null);
  const [branch, setBranch] = useState<BranchId | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [sem, setSem] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const university = universities.find((u) => u.id === uni) ?? null;
  const uniList = useMemo(() => {
    const q = uniQuery.trim().toLowerCase();
    return q ? universities.filter((u) => `${u.name} ${u.short}`.toLowerCase().includes(q)) : universities;
  }, [uniQuery]);

  const availableStreams = useMemo(
    () => (university ? streams.filter((s) => university.streams.includes(s.id)) : streams),
    [university],
  );
  const streamBranches = useMemo(() => (stream ? branchesForStream(stream) : []), [stream]);

  const availableYears = useMemo(() => (branch ? yearsFor(branch) : []), [branch]);
  const availableSems = useMemo(() => (branch ? semestersFor(branch) : []), [branch]);
  const subjects = useMemo(
    () => (!branch ? [] : sem ? subjectsForSem(branch, sem) : subjectsFor(branch, year ?? undefined)),
    [branch, year, sem],
  );
  const results = useMemo(() => searchSubjects(query), [query]);
  const trending = useMemo(() => trendingSubjects(), []);
  const list = query ? results : subjects;

  const pickUniversity = (id: string) => {
    setUni(id);
    saveUniversity(id);
    setStream(null);
    setBranch(null);
    setYear(null);
    setSem(null);
  };

  const branchLabel = branches.find((b) => b.id === branch)?.name;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <Helmet>
        <title>University Wise Important Questions & Notes PDF - MakeMyCV</title>
        <meta
          name="description"
          content="Pick your university, then your stream — Engineering, BCA/MCA, MBA, MBBS, BAMS, BHMS, Nursing and Agriculture. Important questions, deep answers and unit-wise notes PDF, free."
        />
        <link rel="canonical" href="https://makemycv.co.in/exam-prep" />
        <meta property="og:title" content="University Wise Important Questions & Notes PDF - MakeMyCV" />
        <meta property="og:url" content="https://makemycv.co.in/exam-prep" />
      </Helmet>

      <header className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <span className="text-sm font-semibold">Exam Prep</span>
          {university && (
            <button
              onClick={() => setUni(null)}
              className="ml-auto text-[11px] font-semibold text-primary underline underline-offset-4"
            >
              {university.short} · change university
            </button>
          )}
        </div>
      </header>

      <section className="container mx-auto px-4 pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5 text-primary" /> University-wise · Stream-wise · Subject-wise
          </div>
          <h1 className="font-display uppercase text-3xl sm:text-5xl leading-[0.95] mb-4">
            <span className="text-primary">University Wise</span> Questions, Answers & Notes
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Choose your university first — every question, model answer and note then follows that exact paper
            pattern. Engineering, BCA/BCS/MCA/MCS, MBA, MBBS, BAMS, BHMS, B.Sc. Nursing and B.Sc. Agriculture,
            all years and semesters.
          </p>
        </motion.div>
      </section>

      {/* Step 1 — University */}
      <section className="container mx-auto px-4 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold grid place-items-center">1</span>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Select your university</p>
        </div>

        {university ? (
          <div className="rounded-2xl border border-primary/50 bg-primary/5 p-4 flex items-start gap-3">
            <Check className="w-4 h-4 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{university.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{university.pattern}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setUni(null)}>
              Change
            </Button>
          </div>
        ) : (
          <>
            <div className="relative max-w-xl mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={uniQuery}
                onChange={(e) => setUniQuery(e.target.value)}
                placeholder="Search your university (SPPU, DBATU, MUHS, MPKV…)"
                className="pl-9 h-12 rounded-xl"
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {uniList.map((u) => (
                <button
                  key={u.id}
                  onClick={() => pickUniversity(u.id)}
                  className="text-left p-3.5 rounded-xl border border-border bg-card hover:border-primary/60 hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold">{u.short}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-1">{u.name}</p>
                  <p className="text-[10px] text-primary mt-1.5">{u.pattern}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Step 2 — Stream */}
      {university && (
        <section className="container mx-auto px-4 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold grid place-items-center">2</span>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Choose your stream</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableStreams.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setStream(s.id);
                  setBranch(null);
                  setYear(null);
                  setSem(null);
                }}
                className={`relative overflow-hidden text-left p-4 rounded-2xl border transition-all ${
                  stream === s.id ? "border-primary shadow-card" : "border-border hover:border-primary/50"
                } bg-card`}
              >
                <StreamBackdrop stream={s.id} />
                <div className="relative">
                  <p className="text-sm font-bold">{s.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{s.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 3 — Branch + year/sem */}
      {university && stream && (
        <section className="container mx-auto px-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold grid place-items-center">3</span>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Choose your course / branch</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {streamBranches.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setBranch(b.id);
                  setYear(null);
                  setSem(null);
                }}
                className={`text-left p-3 rounded-xl border transition-all ${
                  branch === b.id ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="text-xs font-bold">{b.short}</div>
                <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{b.name}</div>
              </button>
            ))}
          </div>

          {branch && (
            <>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => {
                    setYear(null);
                    setSem(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    year === null && sem === null ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  All years
                </button>
                {availableYears.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      setYear(y);
                      setSem(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      year === y && sem === null ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    Year {y}
                  </button>
                ))}
              </div>

              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-5 mb-2">Or pick a semester</p>
              <div className="flex flex-wrap gap-2">
                {availableSems.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSem(s);
                      setYear(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      sem === s ? "border-primary bg-primary/10" : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    Sem {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Search anywhere */}
      <section className="container mx-auto px-4 pt-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Or search any subject, unit or question…"
            className="pl-9 h-12 rounded-xl"
          />
        </div>
      </section>

      {!query && !branch && (
        <section className="container mx-auto px-4 pt-6">
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

      <section className="container mx-auto px-4 py-6">
        {branchLabel && !query && (
          <p className="text-xs text-muted-foreground mb-3">
            {branchLabel} · {list.length} subjects{university ? ` · ${university.short} pattern` : ""}
          </p>
        )}
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            {branch || query
              ? "No subject here yet for this filter. Try another year, semester or search a subject name."
              : "Select your university, stream and course above to see every subject with questions, answers and notes."}
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
                    Year {s.year} · Sem {(s.year - 1) * 2 + s.sem}
                  </span>
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-semibold leading-snug">{s.name}</h2>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{s.units.join(" · ")}</p>
                <p className="text-[11px] text-primary font-medium mt-2">Questions + answers + deep notes</p>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExamPrep;
