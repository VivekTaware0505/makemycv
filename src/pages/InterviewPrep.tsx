import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, MessageSquare, BookOpen, Lightbulb, CheckCircle2, Lock, ShieldCheck, FileText, Building2, Hash, Stamp, EyeOff, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { supabase } from "@/integrations/supabase/client";
import { interviewRoles, questionTagColors, type InterviewQuestion } from "@/data/interviewQuestions";
import { extraQuestionsByRole } from "@/data/interviewQuestionsExtra";
import { companyQuestionsByRole } from "@/data/interviewQuestionsCompany";

const InterviewPrep = () => {
  const [activeRoleId, setActiveRoleId] = useState(interviewRoles[0].id);
  const [extra, setExtra] = useState<Record<string, InterviewQuestion[]>>({});
  const [loading, setLoading] = useState(false);

  const activeRole = useMemo(
    () => interviewRoles.find((r) => r.id === activeRoleId)!,
    [activeRoleId]
  );
  const baseQuestions = useMemo(
    () => [
      ...activeRole.questions,
      ...(extraQuestionsByRole[activeRoleId] || []),
      ...(companyQuestionsByRole[activeRoleId] || []),
    ],
    [activeRole, activeRoleId]
  );
  const allQuestions = useMemo(
    () => [...baseQuestions, ...(extra[activeRoleId] || [])],
    [baseQuestions, extra, activeRoleId]
  );

  const generateMore = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("interview-questions", {
        body: {
          role: activeRole.label,
          existingQuestions: allQuestions.map((x) => x.q),
          count: 5,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const newQs: InterviewQuestion[] = (data as any).questions || [];
      if (!newQs.length) {
        toast.error("No questions generated. Try again.");
      } else {
        setExtra((prev) => ({
          ...prev,
          [activeRoleId]: [...(prev[activeRoleId] || []), ...newQs],
        }));
        toast.success(`Added ${newQs.length} AI-generated questions`);
      }
    } catch (e: any) {
      toast.error(e?.message || "Could not generate more questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Interview Prep - Role-Specific Questions | MakeMyCV</title>
        <meta
          name="description"
          content="Practice role-specific interview questions with model answers. Software Engineer, Data Analyst, Doctor, MBA, Teacher and more. AI-powered generation."
        />
        <link rel="canonical" href="https://makemycv.lovable.app/interview-prep" />
        <meta property="og:title" content="Interview Prep - MakeMyCV" />
      </Helmet>
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Classified backdrop */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 22px)",
            color: "hsl(var(--foreground))",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 relative">
          {/* MNC-style confidential document header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-[11px] font-semibold tracking-[0.2em] text-red-700 dark:text-red-400 mb-4 uppercase">
              <Lock className="w-3 h-3" />
              Top Secret · Interview Playbook · {interviewRoles.length} Roles
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Insider <span className="text-gradient-brand">interview intel</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Real questions sourced from Amazon, Google, TCS, Infosys, Deloitte and more — declassified, with deep-research answers, STAR breakdowns and hiring-manager tips.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified from real interviews</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="inline-flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-primary" /> 20+ hiring companies</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="inline-flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-amber-600" /> STAR-method ready</span>
            </div>
          </motion.div>

          {/* Role selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {interviewRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRoleId(role.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  activeRoleId === role.id
                    ? "gradient-brand text-primary-foreground border-transparent shadow-card"
                    : "bg-card text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                <span className="text-base leading-none">{role.icon}</span>
                {role.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoleId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* Confidential document header card */}
                <div className="relative mb-6 rounded-2xl border-2 border-dashed border-red-600/30 bg-card overflow-hidden shadow-elevated">
                  <div className="absolute inset-x-0 top-0 h-1 gradient-brand" />
                  {/* Red classified stamp */}
                  <div className="absolute -right-6 top-6 rotate-12 select-none pointer-events-none">
                    <div className="border-[3px] border-red-600/70 text-red-600/80 px-3 py-1 text-[10px] font-black tracking-[0.35em] rounded-sm">
                      CLASSIFIED
                    </div>
                  </div>
                  <div className="px-5 pt-5 pb-4 border-b border-border/60 bg-gradient-to-br from-muted/40 to-transparent">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3 flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5"><Lock className="w-3 h-3" /> Confidential — For Candidate Use</span>
                      <span className="inline-flex items-center gap-1.5"><Hash className="w-3 h-3" /> DOC-{activeRoleId.toUpperCase().slice(0,6)}-2026</span>
                    </div>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 flex-wrap">
                          <span className="text-3xl">{activeRole.icon}</span>
                          {activeRole.label}
                          <span className="text-muted-foreground font-normal text-base md:text-lg">— Interview Dossier</span>
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">{activeRole.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            {baseQuestions.length} curated questions
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Verified by hiring managers
                          </span>
                          {(extra[activeRoleId]?.length ?? 0) > 0 && (
                            <span className="flex items-center gap-1.5 text-primary">
                              <Sparkles className="w-3.5 h-3.5" />
                              {extra[activeRoleId].length} AI-generated
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={generateMore}
                        disabled={loading}
                        className="rounded-xl gradient-brand text-primary-foreground shadow-card hover:shadow-elevated"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating…
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate 5 more with AI
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {allQuestions.map((item, i) => {
                    const isAi = i >= baseQuestions.length;
                    const companyMatch = item.q.match(/^([A-Z][A-Za-z&\/ ]{1,20}):\s*/);
                    const company = companyMatch ? companyMatch[1] : null;
                    const questionText = company ? item.q.slice(companyMatch![0].length) : item.q;
                    return (
                      <AccordionItem
                        key={`${activeRoleId}-${i}`}
                        value={`q-${i}`}
                        className="relative border border-border rounded-xl bg-card px-5 shadow-card data-[state=open]:shadow-elevated data-[state=open]:border-primary/40 transition-all overflow-hidden"
                      >
                        {/* left classified spine */}
                        <span className="absolute left-0 top-0 bottom-0 w-1 gradient-brand opacity-0 data-[state=open]:opacity-100" />
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-start gap-3 text-left flex-1 pr-2">
                            <span className="mt-0.5 flex items-center justify-center w-9 h-8 rounded-md gradient-brand text-primary-foreground text-[11px] font-bold font-mono shrink-0 shadow-sm">
                              Q{String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span
                                  className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border ${questionTagColors[item.tag]}`}
                                >
                                  {item.tag}
                                </span>
                                {company && (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border border-red-600/25 bg-red-600/5 text-red-700 dark:text-red-400 flex items-center gap-1">
                                    <Building2 className="w-2.5 h-2.5" />
                                    Asked at {company}
                                  </span>
                                )}
                                {isAi && (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border border-primary/20 bg-primary/5 text-primary flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" />
                                    AI
                                  </span>
                                )}
                                {(item.detailedAnswer || item.tips?.length) && (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border border-emerald-500/25 bg-emerald-500/5 text-emerald-600 flex items-center gap-1">
                                    <ScrollText className="w-2.5 h-2.5" /> Deep Research
                                  </span>
                                )}
                              </div>
                              <p className="text-[15px] md:text-lg font-semibold text-foreground leading-snug">
                                {questionText}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 pt-2">
                          <div className="pl-11 space-y-5">
                            {/* Classification banner */}
                            <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/70 border-y border-dashed border-border py-1">
                              <span className="flex items-center gap-1.5"><EyeOff className="w-3 h-3" /> Declassified for Candidate</span>
                              <span>REF · {activeRoleId.slice(0,3).toUpperCase()}-{String(i + 1).padStart(3, "0")}</span>
                            </div>

                            <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-500/5 pl-4 pr-4 py-4">
                              <div className="flex items-center gap-2 mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Model Answer · Recruiter-Ready
                              </div>
                              <p className="text-[15px] text-foreground leading-[1.75]">{item.a}</p>
                            </div>

                            {item.detailedAnswer && (
                              <div className="rounded-lg border border-primary/20 bg-primary/[0.04] p-5">
                                <div className="flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  Deep-Research Breakdown · STAR Framework
                                </div>
                                <div className="text-[15px] text-foreground/95 leading-[1.8] whitespace-pre-wrap [&>*+*]:mt-3">
                                  {item.detailedAnswer}
                                </div>
                              </div>
                            )}

                            {item.tips && item.tips.length > 0 && (
                              <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-5">
                                <div className="flex items-center gap-2 mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-500">
                                  <Lightbulb className="w-3.5 h-3.5" />
                                  Insider Tips · What Interviewers Look For
                                </div>
                                <ul className="space-y-2.5">
                                  {item.tips.map((tip, ti) => (
                                    <li key={ti} className="flex items-start gap-2.5 text-[14.5px] text-foreground/90 leading-[1.7]">
                                      <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-1 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/70 flex-wrap gap-2">
                              <span>© MakeMyCV — Classified Interview Playbook · Do Not Redistribute</span>
                              <span>Page {i + 1} / {allQuestions.length}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InterviewPrep;