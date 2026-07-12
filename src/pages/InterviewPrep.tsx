import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, MessageSquare, BookOpen, Lightbulb, CheckCircle2 } from "lucide-react";
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
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gradient-brand-soft border border-primary/20 text-xs font-medium text-primary mb-4">
              <Sparkles className="w-3 h-3" />
              Interview Prep · {interviewRoles.length} Roles
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Ace your <span className="text-gradient-brand">next interview</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Role-specific questions with model answers. Generate more instantly with AI.
            </p>
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
                <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <span className="text-3xl">{activeRole.icon}</span>
                      {activeRole.label}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">{activeRole.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {baseQuestions.length} curated
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

                <Accordion type="single" collapsible className="space-y-3">
                  {allQuestions.map((item, i) => {
                    const isAi = i >= baseQuestions.length;
                    return (
                      <AccordionItem
                        key={`${activeRoleId}-${i}`}
                        value={`q-${i}`}
                        className="border border-border rounded-xl bg-card px-5 shadow-card data-[state=open]:shadow-card-hover transition-shadow"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-start gap-3 text-left flex-1 pr-2">
                            <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md gradient-brand-soft text-primary text-xs font-bold shrink-0">
                              {i + 1}
                            </span>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span
                                  className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border ${questionTagColors[item.tag]}`}
                                >
                                  {item.tag}
                                </span>
                                {isAi && (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border border-primary/20 bg-primary/5 text-primary flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" />
                                    AI
                                  </span>
                                )}
                                {(item.detailedAnswer || item.tips?.length) && (
                                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border border-emerald-500/20 bg-emerald-500/5 text-emerald-600">
                                    In-depth
                                  </span>
                                )}
                              </div>
                              <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                                {item.q}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 pt-1">
                          <div className="pl-9 space-y-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Quick answer
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                            </div>

                            {item.detailedAnswer && (
                              <div className="rounded-lg border border-border bg-muted/30 p-4">
                                <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  Detailed explanation
                                </div>
                                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                  {item.detailedAnswer}
                                </p>
                              </div>
                            )}

                            {item.tips && item.tips.length > 0 && (
                              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                                <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wide text-amber-600">
                                  <Lightbulb className="w-3.5 h-3.5" />
                                  Pro tips & suggestions
                                </div>
                                <ul className="space-y-1.5">
                                  {item.tips.map((tip, ti) => (
                                    <li key={ti} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                                      <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
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