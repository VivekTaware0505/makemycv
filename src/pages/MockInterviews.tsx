import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import JourneyToolLayout from "@/components/journey/JourneyToolLayout";
import { interviewRoles } from "@/data/interviewQuestions";
import { markStageDone } from "@/lib/journey";

const MockInterviews = () => {
  const [roleId, setRoleId] = useState(interviewRoles[0].id);
  const [index, setIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const role = useMemo(() => interviewRoles.find((item) => item.id === roleId) ?? interviewRoles[0], [roleId]);
  const question = role.questions[index % role.questions.length];

  const next = () => {
    setIndex((value) => value + 1);
    setShowGuide(false);
    if (index + 1 >= role.questions.length) markStageDone("mock-interview");
  };

  return (
    <JourneyToolLayout eyebrow="Step 4 of 6" title="Mock Interviews" description="Practise answering aloud, then compare your response with a strong answer guide.">
      <Helmet><title>Mock Interview Practice - MakeMyCV</title><meta name="description" content="Practise role-specific mock interview questions with answer guidance." /></Helmet>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {interviewRoles.map((item) => <Button key={item.id} variant={roleId === item.id ? "default" : "outline"} size="sm" onClick={() => { setRoleId(item.id); setIndex(0); setShowGuide(false); }} className="shrink-0">{item.label}</Button>)}
      </div>
      <section className="border-y border-border py-8">
        <p className="text-xs font-bold uppercase text-primary">Question {index % role.questions.length + 1} of {role.questions.length}</p>
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-snug">{question.q}</h2>
        <p className="mt-4 text-sm text-muted-foreground">Answer aloud before revealing the guide. Aim for 60–90 seconds and use a specific example.</p>
        {showGuide && <div className="mt-6 max-w-3xl border-l-4 border-primary bg-secondary p-5"><p className="text-xs font-bold uppercase text-primary">Answer guide</p><p className="mt-2 leading-relaxed text-muted-foreground">{question.detailedAnswer || question.a}</p></div>}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowGuide((value) => !value)} className="gap-2"><Eye className="h-4 w-4" /> {showGuide ? "Hide guide" : "Reveal guide"}</Button>
          <Button onClick={next} className="gap-2">Next question <ArrowRight className="h-4 w-4" /></Button>
          <Button variant="ghost" onClick={() => { setIndex(0); setShowGuide(false); }} aria-label="Restart interview"><RotateCcw className="h-4 w-4" /></Button>
        </div>
      </section>
    </JourneyToolLayout>
  );
};

export default MockInterviews;