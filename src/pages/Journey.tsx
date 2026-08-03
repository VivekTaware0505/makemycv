import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProgress, stages } from "@/lib/journey";

const ready = new Set(["/builder", "/ats-checker", "/interview-prep"]);

const Journey = () => {
  const navigate = useNavigate();
  const done = new Set(getProgress());

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-12">
      <Helmet>
        <title>Your Hiring Journey - MakeMyCV</title>
        <meta
          name="description"
          content="Follow a step-by-step hiring journey: resume, ATS score, AI improvements, cover letter, LinkedIn, interview prep, job matching, tracking and offer."
        />
        <link rel="canonical" href="https://makemycv.co.in/journey" />
        <meta property="og:title" content="Your Hiring Journey - MakeMyCV" />
        <meta property="og:url" content="https://makemycv.co.in/journey" />
      </Helmet>

      <header className="border-b border-border bg-card/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <span className="text-sm font-semibold">Your Journey</span>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <h1 className="font-display uppercase text-3xl sm:text-5xl leading-[0.95] mb-4">
          From Resume To <span className="text-primary">Offer Letter</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
          Nine steps, in order. Finish one, move to the next — we help at every stage until you are hired.
        </p>

        <ol className="space-y-3">
          {stages.map((stage) => {
            const live = ready.has(stage.path);
            const complete = done.has(stage.id);
            return (
              <li
                key={stage.id}
                className={`rounded-2xl border p-4 flex items-start gap-4 ${
                  live ? "border-border bg-card" : "border-dashed border-border bg-card/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold ${
                    complete ? "gradient-emerald text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  {complete ? <CheckCircle2 className="w-5 h-5" /> : stage.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold">{stage.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{stage.blurb}</p>
                </div>
                {live ? (
                  <Button size="sm" className="rounded-lg font-semibold flex-shrink-0" onClick={() => navigate(stage.path)}>
                    {stage.cta}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                ) : (
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" /> Coming next
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

export default Journey;