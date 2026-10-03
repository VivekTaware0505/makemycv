import type { ReactNode } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

const JourneyToolLayout = ({ eyebrow, title, description, children }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-28 md:pb-12">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center gap-3 px-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/journey")} className="gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Hiring Journey
          </Button>
        </div>
      </header>
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-primary">
            <CheckCircle2 className="h-4 w-4" /> {eyebrow}
          </p>
          <h1 className="font-display text-3xl uppercase leading-none sm:text-5xl">{title}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
        </div>
        {children}
      </main>
    </div>
  );
};

export default JourneyToolLayout;